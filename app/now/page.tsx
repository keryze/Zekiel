import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { OutwardArrow } from '@/components/icons';
import { pageMetadata } from '@/lib/metadata';
export const metadata: Metadata = pageMetadata('Now', 'A small window into current interests: real-time graphics, procedural systems, AI agents, and long-term thinking.', '/now');
const directions = [
  { title: 'Understanding the frame', description: 'Real-time rendering in Unreal Engine. Looking beneath the final image at geometry, lighting, sampling, and performance.', link: '/work/ue5-rendering-experiments', label: 'Rendering studies' },
  { title: 'Thinking in rules', description: 'Procedural environments and Houdini systems. Exploring how a small set of constraints can create useful, controllable variation.', link: '/notes/houdini/procedural-thinking', label: 'Procedural notes' },
  { title: 'Building with agents', description: 'Codex, goal-driven workflows, and AI-assisted tools. Paying attention to verification, recovery, and the quality of the final artifact.', link: '/notes/ai/codex-agent-harness', label: 'Agent workflows' },
  { title: 'Keeping a longer horizon', description: 'Reading, long-term investing, and better personal systems. Making room for ideas to compound—and for time away from the screen.', link: '/reading', label: 'The reading shelf' },
];
export default function Now() {
  return <div className="container page narrow-page"><PageIntro eyebrow="A SMALL WINDOW INTO THE PRESENT" title="Now, and next." description="The directions I’m interested in exploring. A quieter page, meant to change as attention moves." /><p className="now-update mono">INITIAL EDITION / <time dateTime="2026-10-07">OCTOBER 2026</time></p><div className="now-directions">{directions.map((direction, i) => <section key={direction.title}><span className="mono section-counter">0{i + 1}</span><h2>{direction.title}</h2><p>{direction.description}</p><Link href={direction.link} className="text-link">{direction.label}<OutwardArrow size={16} /></Link></section>)}</div><aside className="now-footnote"><p>This first edition is based on the interests supplied for this site. Update it with what you’re actually working on, and change the date when you do.</p><span className="mono">NO FEED. NO SCHEDULE. JUST A SNAPSHOT.</span></aside></div>;
}
