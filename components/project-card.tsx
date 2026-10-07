import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/content';
import { assetPath } from '@/lib/utils';
import { OutwardArrow } from './icons';
export function ProjectCard({ project, index, heading = 'h3' }: { project: Project; index: number; heading?: 'h2' | 'h3' }) {
  const Heading = heading;
  return <Link href={`/work/${project.slug}`} className="project-card">
    <div className="project-image"><Image src={assetPath(project.image)} alt={project.imageAlt} width={1000} height={720} sizes="(max-width: 680px) 100vw, 50vw" /><span className="image-index mono">{String(index + 1).padStart(2, '0')} / STUDY</span><span className="image-open" aria-hidden="true"><OutwardArrow size={20} /></span></div>
    <div className="project-meta mono"><span>{project.category} / {project.year}</span><span className="sample-tag">{project.status.toUpperCase()}</span></div><div className="project-title"><Heading>{project.title}</Heading><OutwardArrow /></div><p>{project.description}</p><div className="project-stack mono">{project.stack.join(' / ')}</div>
  </Link>;
}
