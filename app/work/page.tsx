import type { Metadata } from 'next';
import { PageIntro, SampleNotice } from '@/components/page-intro';
import { ProjectCard } from '@/components/project-card';
import { FilterCollection } from '@/components/filter-collection';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';
export const metadata: Metadata = pageMetadata(
  'Work',
  'Procedural worlds, rendering studies, and AI workflows. A technical art portfolio designed for detailed breakdowns.',
  '/work',
);
export default function Work() {
  return (
    <div className="container page">
      <PageIntro
        eyebrow="01 / SELECTED WORK"
        title="Built to understand."
        description="Projects and studies in real-time graphics, procedural systems, and AI-assisted creation."
        aside="ART × ENGINEERING"
      />
      <FilterCollection
        label="Filter projects by category"
        categories={['Unreal Engine', 'Houdini', 'AI / Coding']}
        className="project-grid"
        items={projects.map((project, index) => ({
          id: project.slug,
          category: project.category,
          content: <ProjectCard project={project} index={index} heading="h2" />,
        }))}
      />
      <SampleNotice />
    </div>
  );
}
