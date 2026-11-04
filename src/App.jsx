import AskAI from './components/AskAI'
import Builds from './components/Builds'
import Contact from './components/Contact'
import Cursor from './components/Cursor'
import Education from './components/Education'
import Experience from './components/ExperienceRail'
import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ScrollProgress from './components/ScrollProgress'
import Skills from './components/Skills'
import Stores from './components/Stores'
import { profile } from './data/portfolio'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Header />
      <Hero />
      <Marquee />
      <main className="mx-auto max-w-[1120px] px-6">
        <AskAI />
        <Builds />
        <Stores />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-2 border-t border-line px-6 py-8 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </footer>
    </>
  )
}
