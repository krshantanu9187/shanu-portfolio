import { useCallback, useEffect, useRef, useState } from 'react'

const SpeechRecognition =
  typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

export const voiceInputSupported = () => Boolean(SpeechRecognition)

/** A sandboxed preview frame cannot be granted the microphone at all. */
export const inPreviewFrame = () => {
  try {
    return typeof window !== 'undefined' && window.self !== window.top
  } catch {
    return true
  }
}
export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window

/**
 * Microphone dictation through the browser's own speech recognition.
 * onResult fires with the final transcript when the person stops talking.
 */
export function useSpeechInput(onResult) {
  const [listening, setListening] = useState(false)
  const [partial, setPartial] = useState('')
  const [error, setError] = useState(null)
  const recognition = useRef(null)
  const latest = useRef(onResult)

  // Keep the callback current WITHOUT rebuilding the recogniser. Rebuilding it
  // is what used to cut people off: the caller's onResult changes identity on
  // every render, and tearing the recogniser down mid-sentence aborts it.
  useEffect(() => {
    latest.current = onResult
  }, [onResult])

  useEffect(() => {
    if (!SpeechRecognition) return
    const rec = new SpeechRecognition()
    rec.lang = 'en-IN'
    rec.interimResults = true
    // Stay open through the pauses people leave while thinking. We stop it
    // ourselves as soon as a final transcript arrives.
    rec.continuous = true
    rec.maxAlternatives = 1

    rec.onresult = (e) => {
      let interim = ''
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i]
        if (result.isFinal) final += result[0].transcript
        else interim += result[0].transcript
      }
      if (final.trim()) {
        setPartial('')
        try {
          rec.stop()
        } catch {
          /* already stopping */
        }
        latest.current(final.trim())
      } else {
        setPartial(interim)
      }
    }

    rec.onerror = (e) => {
      // 'aborted' is our own teardown, not something worth showing anyone.
      if (e.error === 'aborted') return
      setError(
        e.error === 'not-allowed' || e.error === 'service-not-allowed'
          ? inPreviewFrame()
            ? 'Voice input is blocked inside this preview frame. It works when the site runs on its own.'
            : 'Microphone access was blocked. Allow it in the address bar and try again.'
          : e.error === 'no-speech'
            ? "I didn't catch that — press the mic and speak again."
            : 'Could not hear that.'
      )
      setListening(false)
    }

    rec.onend = () => {
      setListening(false)
      setPartial('')
    }

    recognition.current = rec
    return () => {
      rec.onresult = rec.onerror = rec.onend = null
      try {
        rec.abort()
      } catch {
        /* already stopped */
      }
      recognition.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (!recognition.current) return
    setError(null)
    setPartial('')
    try {
      recognition.current.start()
      setListening(true)
    } catch {
      // start() throws if it is already running; ignore.
    }
  }, [])

  const stop = useCallback(() => {
    try {
      recognition.current?.stop()
    } catch {
      /* already stopped */
    }
    setListening(false)
  }, [])

  const toggle = useCallback(() => (listening ? stop() : start()), [listening, start, stop])

  return { listening, partial, error, start, stop, toggle }
}

/** Reads answers out loud with the browser's speech synthesis. */
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const voice = useRef(null)

  useEffect(() => {
    if (!speechSupported()) return
    // Prefer a measured British male voice — calm and formal, like a butler.
    const pick = () => {
      const voices = speechSynthesis.getVoices()
      const british = voices.filter((v) => /en[-_]GB/i.test(v.lang))
      voice.current =
        british.find((v) => /daniel|arthur|oliver|george|malcolm|uk english male|\bmale\b/i.test(v.name)) ||
        british[0] ||
        voices.find((v) => /en[-_]AU/i.test(v.lang)) ||
        voices.find((v) => /en[-_]IN/i.test(v.lang)) ||
        voices.find((v) => v.lang?.startsWith('en')) ||
        null
    }
    pick()
    speechSynthesis.addEventListener('voiceschanged', pick)
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', pick)
      speechSynthesis.cancel()
    }
  }, [])

  // Chrome silently stops a long utterance after roughly fifteen seconds, and
  // can leave a queue in a paused state. This nudges it while it should be
  // talking; resume() on something already speaking is a no-op.
  useEffect(() => {
    if (!speaking || !speechSupported()) return
    const id = setInterval(() => {
      if (speechSynthesis.speaking) speechSynthesis.resume()
    }, 5000)
    return () => clearInterval(id)
  }, [speaking])

  const speak = useCallback((text) => {
    if (!speechSupported() || !text) return
    speechSynthesis.cancel()

    // Queue the answer a sentence at a time, for the same fifteen-second limit:
    // several short utterances survive where one long one gets cut off.
    const clean = text.replace(/[—–]/g, ',')
    const chunks = (clean.match(/[^.!?]+[.!?]*/g) || [clean]).map((c) => c.trim()).filter(Boolean)

    let remaining = chunks.length
    chunks.forEach((chunk, i) => {
      const utterance = new SpeechSynthesisUtterance(chunk)
      if (voice.current) utterance.voice = voice.current
      // Unhurried and a touch low — it should sound composed, never chirpy.
      utterance.rate = 0.9
      utterance.pitch = 0.92
      utterance.volume = 0.95
      if (i === 0) utterance.onstart = () => setSpeaking(true)
      utterance.onend = utterance.onerror = () => {
        remaining -= 1
        if (remaining <= 0) setSpeaking(false)
      }
      speechSynthesis.speak(utterance)
    })
  }, [])

  const stop = useCallback(() => {
    if (speechSupported()) speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  return { speak, stop, speaking }
}
