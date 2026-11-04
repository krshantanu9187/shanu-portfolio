import { profile } from '../data/portfolio'
import Frame from './Frame'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import SplitHeading from './SplitHeading'

export default function Contact() {
  return (
    <Reveal id="contact" className="my-20">
      <Frame className="relative isolate bg-brand px-6 py-14 text-white sm:px-12 sm:py-16">
        <span aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <span className="absolute -right-24 -top-28 block size-[460px] animate-drift-1 rounded-full bg-[radial-gradient(circle,#5DCFA9_0%,transparent_65%)] opacity-40" />
        </span>
        <p className="m-0 mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">Available now</p>
        <SplitHeading
          text="Let's build your next store."
          className="m-0 mb-4 text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
        />
        <p className="max-w-[34em] text-white/75">
          Freelancing with D2C brands, and open to senior or lead Shopify roles. Based in {profile.location}, happy to work remote.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Magnetic dark variant="primary" href={`mailto:${profile.email}`}>Email me</Magnetic>
          <Magnetic dark href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</Magnetic>
          <Magnetic dark href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</Magnetic>
          <Magnetic dark href={profile.github} target="_blank" rel="noopener">GitHub</Magnetic>
        </div>
      </Frame>
    </Reveal>
  )
}
