import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { OutwardArrow } from '@/components/icons';
import { site } from '@/site.config';
import { pageMetadata } from '@/lib/metadata';
export const metadata: Metadata = pageMetadata(
  'About',
  'Technical art, creative engineering, and a curiosity about how complex systems work.',
  '/about',
);
export default function About() {
  return (
    <div className="container page">
      <PageIntro
        eyebrow="04 / THE PERSON BEHIND THE SYSTEMS"
        title={'An artist’s eye.\nAn engineer’s curiosity.'}
        description="I’m interested in the space where visual craft meets technical understanding."
      />
      <div className="about-layout">
        <aside className="about-aside">
          <span className="about-symbol" aria-hidden="true">
            z<span className="accent">.</span>
          </span>
          <p className="mono">
            {site.alias.toUpperCase()}
            <br />
            TECHNICAL ARTIST
            <br />
            CREATIVE TECHNOLOGIST
          </p>
          {site.location && <p>{site.location}</p>}
          <div className="about-method mono">
            <span>OBSERVE</span>
            <span>↓</span>
            <span>MODEL</span>
            <span>↓</span>
            <span>BUILD</span>
            <span>↓</span>
            <span>TEST</span>
          </div>
        </aside>
        <div className="prose">
          <h2>Beyond the interface</h2>
          <p>
            I work across Unreal Engine, Houdini, and procedural creation. What keeps me interested
            is not just how to use a tool, but how the mechanism underneath it works.
          </p>
          <p>
            Rendering, geometry, materials, simulation: each is a different way to turn a model of
            the world into something you can see. I like the point where a visual problem becomes a
            mathematical one—and where a small piece of code opens a new artistic possibility.
          </p>
          <h2>Artist, engineer, builder</h2>
          <p>
            Technical art is where those roles overlap. It asks for visual judgment, a useful mental
            model, and the patience to investigate a result that doesn’t quite make sense yet.
          </p>
          <p>
            My interests include real-time graphics, procedural environments, character rendering,
            shader mathematics, and the design of practical creation pipelines.
          </p>
          <h2>AI as a working system</h2>
          <p>
            I’m exploring how coding agents can move from an intention to a finished artifact. Clear
            goals, sequential outcomes, verification, and recovery matter more to me than a
            convincing conversation.
          </p>
          <p>
            The interesting question is what an artist can build when the distance between an idea
            and a working tool gets smaller.
          </p>
          <h2>A wider field of view</h2>
          <p>
            Outside graphics, I’m drawn to investing, books, psychology, and systems thinking. I
            also value time away from a screen: travel, training, cycling, and swimming.
          </p>
          <p>
            Those interests belong here too. This site is a record of what I build, learn, and think
            about—not a list of credentials.
          </p>
          <div className="about-principle">
            <span className="eyebrow mono">A WORKING PRINCIPLE</span>
            <p>
              Build things.
              <br />
              Understand systems.
              <br />
              Think long term.
            </p>
          </div>
          <div className="about-links">
            <Link href="/now" className="text-link">
              What has my attention <OutwardArrow />
            </Link>
            <a href={site.github} className="text-link" target="_blank" rel="noreferrer">
              Find the source <OutwardArrow />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
