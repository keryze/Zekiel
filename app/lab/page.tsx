import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, SampleNotice } from '@/components/page-intro';
import { FilterCollection } from '@/components/filter-collection';
import { experiments } from '@/data/lab';
import { pageMetadata } from '@/lib/metadata';
import { OutwardArrow } from '@/components/icons';
export const metadata: Metadata = pageMetadata(
  'Lab',
  'A working bench for shaders, procedural algorithms, rendering tests, and agent workflows.',
  '/lab',
);
export default function Lab() {
  return (
    <div className="container page">
      <PageIntro
        eyebrow="02 / EXPERIMENTS & OPEN QUESTIONS"
        title="The working bench."
        description="Smaller than a project. More useful than a passing thought. A place to test a mechanism, follow a question, and leave a trail."
        aside="PROCESS > POLISH"
      />
      <div className="lab-definition">
        <span className="mono">LAB ≠ PORTFOLIO</span>
        <p>
          The work section collects finished artifacts. This space keeps the experiments,
          prototypes, and questions that lead there.
        </p>
      </div>
      <FilterCollection
        label="Filter experiments"
        categories={['Rendering', 'Procedural', 'AI / Coding']}
        className="lab-list"
        items={experiments.map((item) => ({
          id: item.id,
          category: item.category,
          content: (
            <Link href={item.href} className="lab-row">
              <span className="mono lab-id">{item.id}</span>
              <div>
                <p className="eyebrow mono">{item.category}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="lab-tags mono">{item.tags.join(' / ')}</div>
              </div>
              <span className="lab-status mono">{item.status}</span>
              <OutwardArrow />
            </Link>
          ),
        }))}
      />
      <SampleNotice>
        These are sample experiment entries. Each links to a sample breakdown or research note; no
        prototype download is implied.
      </SampleNotice>
    </div>
  );
}
