import { useCallback, useEffect, useRef, useState } from 'react'
import { greeting, suggestions } from '../data/knowledge'
import { askAssistant } from '../lib/brain'
import { prefersReducedMotion } from '../hooks/useMotion'
import { inPreviewFrame, useSpeech, useSpeechInput, voiceInputSupported } from '../hooks/useVoice'
import Reveal from './Reveal'
import Section from './Section'

const MicIcon = ({ on }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    {on ? (
      <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" stroke="none" />
    ) : (
      <>
        <path d="M12 3.5a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0v-5a3 3 0 0 0-3-3Z" />
        <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
      </>
    )}
  </svg>
)

const SpeakerIcon = ({ on }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M4 9.5h3L11 6v12l-4-3.5H4Z" />
    {on ? <path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M15.5 9.5l4 5M19.5 9.5l-4 5" />}
  </svg>
)

/** How long to wait before the first character — longer answers "take more thought". */
const thinkingTime = (answer) => 500 + Math.min(1100, answer.length * 4) + Math.random() * 350

/** Per-character delay: quick inside words, a beat at punctuation. */
const charDelay = (ch) => {
  if (ch === '.' || ch === '?' || ch === '!') return 240 + Math.random() * 120
  if (ch === ',' || ch === ';' || ch === ':' || ch === '—') return 110 + Math.random() * 60
  if (ch === ' ') return 18 + Math.random() * 22
  return 9 + Math.random() * 20
}

export default function AskAI() {
  const [messages, setMessages] = useState([{ role: 'bot', text: greeting }])
  const [input, setInput] = useState('')
  const [phase, setPhase] = useState('idle') // idle | thinking | streaming
  const [voiceOn, setVoiceOn] = useState(false)
  const [micAvailable, setMicAvailable] = useState(false)
  const [framed, setFramed] = useState(false)
  const log = useRef(null)
  const timer = useRef(null)
  const pending = useRef(null) // the full answer while it streams in
  const { speak, stop: stopSpeaking, speaking } = useSpeech()

  // Mirrors of the state that `send` reads. Without these, `send` changes
  // identity on every streamed character, which used to rebuild the microphone
  // and cut the speaker off mid-question.
  const messagesRef = useRef(messages)
  const phaseRef = useRef(phase)
  const voiceRef = useRef(voiceOn)

  useEffect(() => {
    setMicAvailable(voiceInputSupported())
    setFramed(inPreviewFrame())
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])
  useEffect(() => {
    phaseRef.current = phase
  }, [phase])
  useEffect(() => {
    voiceRef.current = voiceOn
  }, [voiceOn])

  const busy = phase !== 'idle'

  /** Reveals the answer one character at a time. */
  const stream = useCallback((full) => {
    setMessages((m) => [...m, { role: 'bot', text: '', streaming: true }])
    pending.current = full
    let i = 0
    const step = () => {
      i += 1
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'bot', text: full.slice(0, i), streaming: i < full.length }
        return copy
      })
      if (i < full.length) {
        timer.current = setTimeout(step, charDelay(full[i - 1]))
      } else {
        pending.current = null
        setPhase('idle')
      }
    }
    setPhase('streaming')
    timer.current = setTimeout(step, 0)
  }, [])

  /** Skip the rest of the animation and show the whole answer. */
  const finishNow = useCallback(() => {
    clearTimeout(timer.current)
    const full = pending.current
    if (full) {
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { role: 'bot', text: full, streaming: false }
        return copy
      })
      pending.current = null
    }
    stopSpeaking()
    setPhase('idle')
  }, [stopSpeaking])

  const send = useCallback(
    async (question, { spoken = false } = {}) => {
      const text = question.trim()
      if (!text || phaseRef.current !== 'idle') return
      phaseRef.current = 'thinking'
      setInput('')
      setMessages((m) => [...m, { role: 'you', text }])
      setPhase('thinking')

      const history = messagesRef.current.slice(-6).map((m) => ({ role: m.role, text: m.text }))
      const answer = await askAssistant(text, history)

      if (voiceRef.current || spoken) speak(answer.text)
      if (prefersReducedMotion()) {
        setMessages((m) => [...m, { role: 'bot', text: answer.text }])
        setPhase('idle')
        return
      }
      timer.current = setTimeout(() => stream(answer.text), thinkingTime(answer.text))
    },
    [speak, stream]
  )

  const onHeard = useCallback((transcript) => send(transcript, { spoken: true }), [send])
  const mic = useSpeechInput(onHeard)

  // Keep the newest message in view as it grows.
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight
  }, [messages, phase])

  const toggleVoice = () => {
    if (voiceOn) stopSpeaking()
    setVoiceOn((v) => !v)
  }

  const status =
    phase === 'thinking' ? 'thinking' : phase === 'streaming' ? 'responding' : mic.listening ? 'listening' : speaking ? 'speaking' : 'ready'

  return (
    <Section
      id="ask"
      first
      number="01"
      title="Ask about me"
      intro="Neo is an assistant that answers questions about my work — what I build, what I've shipped, whether I'm free. Type, or press the mic and talk to him."
    >
      <Reveal className="relative isolate">
        {/* colour for the glass to pick up */}
        <div aria-hidden="true" className="aurora pointer-events-none absolute -inset-10 -z-10 blur-2xl" />

        <div className="glass overflow-hidden rounded-2xl">
          {/* status strip */}
          <div className="flex items-center justify-between gap-3 border-b border-white/50 px-5 py-3">
            <p className="m-0 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span
                className={`inline-block size-1.5 rounded-full ${
                  phase === 'idle' && !mic.listening ? 'animate-ping-soft bg-brand' : 'animate-pulse bg-brand'
                }`}
              />
              {status}
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Neo</span>
              <button
                type="button"
                onClick={toggleVoice}
                aria-pressed={voiceOn}
                aria-label={voiceOn ? 'Turn Neo\u2019s voice off' : 'Turn Neo\u2019s voice on'}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  voiceOn ? 'border-brand/40 bg-brand/10 text-brand' : 'border-white/60 bg-white/40 text-muted hover:text-ink'
                }`}
              >
                <SpeakerIcon on={voiceOn} />
                {voiceOn ? 'voice on' : 'voice off'}
              </button>
            </div>
          </div>

          {/* transcript */}
          <div ref={log} aria-live="polite" className="flex max-h-[440px] min-h-[280px] flex-col gap-4 overflow-y-auto px-5 py-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'you' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[46ch] rounded-xl px-4 py-3 text-[15px] leading-relaxed ${
                    m.role === 'you'
                      ? 'rounded-br-sm bg-brand text-on-brand shadow-sm'
                      : 'glass-inset rounded-bl-sm text-ink'
                  }`}
                >
                  {m.text}
                  {m.streaming && <span className="caret-blink" aria-hidden="true" />}
                </div>
              </div>
            ))}

            {phase === 'thinking' && (
              <div className="flex justify-start">
                <div className="glass-inset flex items-center gap-1.5 rounded-xl rounded-bl-sm px-4 py-4">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="size-1.5 animate-bounce rounded-full bg-brand/60"
                      style={{ animationDelay: `${d * 0.14}s`, animationDuration: '1s' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {mic.partial && (
              <div className="flex justify-end">
                <div className="max-w-[46ch] rounded-xl border border-dashed border-rule px-4 py-3 text-[15px] italic text-muted">
                  {mic.partial}
                </div>
              </div>
            )}
          </div>

          {/* suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-white/50 px-5 pt-4">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={busy}
                className="rounded-full border border-white/70 bg-white/40 px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-brand/40 hover:text-ink disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>

          {/* composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex flex-wrap items-center gap-2 px-5 py-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mic.listening ? 'Listening…' : phase === 'thinking' ? 'Thinking…' : 'Ask Neo about Shaan'}
              aria-label="Your question"
              className="min-w-0 flex-1 basis-full rounded-full border border-white/70 bg-white/55 px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-brand/50 sm:basis-auto"
            />
            {micAvailable && (
              <button
                type="button"
                onClick={mic.toggle}
                disabled={busy}
                aria-label={mic.listening ? 'Stop listening' : 'Ask by voice'}
                className={`grid size-12 shrink-0 place-items-center rounded-full border transition-colors disabled:opacity-40 ${
                  mic.listening
                    ? 'animate-ping-soft border-brand bg-brand text-on-brand'
                    : 'border-white/70 bg-white/50 text-muted hover:border-brand/40 hover:text-ink'
                }`}
              >
                <MicIcon on={mic.listening} />
              </button>
            )}
            {phase === 'streaming' ? (
              <button
                type="button"
                onClick={finishNow}
                className="ml-auto shrink-0 rounded-full border border-rule bg-white/60 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-brand sm:ml-0"
              >
                Skip
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim() || busy}
                className="ml-auto shrink-0 rounded-full border border-brand bg-brand px-6 py-3 text-[15px] font-medium text-on-brand transition-colors hover:bg-brand-bright disabled:opacity-40 sm:ml-0"
              >
                Ask
              </button>
            )}
          </form>

          <p className="m-0 px-5 pb-5 font-mono text-[11px] text-muted">
            {mic.error
              ? mic.error
              : !micAvailable
                ? 'Voice input needs Chrome, Edge or Safari. Typing works everywhere.'
                : framed
                  ? 'Answers come from a knowledge base about my work. The mic needs the site running on its own — a preview frame cannot be given it.'
                  : 'Answers come from a knowledge base about my work, so it only talks about that.'}
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
