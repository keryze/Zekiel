import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';
import { assetPath } from '@/lib/utils';
import { SampleNotice } from '@/components/page-intro';
import { OutwardArrow } from '@/components/icons';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? pageMetadata(project.title, project.description, `/work/${slug}`) : {};
}
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="container page project-detail">
      <Link href="/work" className="back-link mono">
        ← ALL WORK
      </Link>
      <div className="detail-header">
        <p className="eyebrow mono">
          {project.category} / {project.year}{' '}
          <span className="sample-tag">{project.status.toUpperCase()}</span>
        </p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
      <figure className="detail-image">
        <Image
          src={assetPath(project.image)}
          alt={project.imageAlt}
          width={1000}
          height={720}
          preload
          fetchPriority="high"
          sizes="(max-width: 1200px) 100vw, 1120px"
        />
        <figcaption className="mono">
          {project.imageCaption ||
            (project.status === 'Sample'
              ? 'CONCEPT DIAGRAM · PLACEHOLDER ARTWORK'
              : `${project.title} / PROJECT IMAGE`)}
        </figcaption>
      </figure>
      <div className="article-layout">
        <aside className="article-sidebar" aria-label="Project information">
          <p className="eyebrow mono">TOOLBOX</p>
          {project.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
          <p className="eyebrow mono sidebar-section">STATUS</p>
          <span>{project.status}</span>
          <Link href="/lab" className="text-link">
            Related explorations <OutwardArrow size={14} />
          </Link>
        </aside>
        <div className="prose">
          <p className="article-lead">{project.summary}</p>
          {project.sections.map((section, i) => (
            <section key={section.title}>
              <span className="section-counter mono">{String(i + 1).padStart(2, '0')}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          {project.status === 'Sample' && (
            <SampleNotice>
              Replace this study with your real work, images, measurements, code links, and lessons
              learned.
            </SampleNotice>
          )}
        </div>
      </div>
      <Link href={`/work/${next.slug}`} className="next-project">
        <span className="mono">NEXT STUDY</span>
        <h2>{next.title}</h2>
        <OutwardArrow size={28} />
      </Link>
    </article>
  );
}
