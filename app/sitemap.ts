import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { getNotes } from '@/lib/notes';
import { absoluteUrl } from '@/lib/utils';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/work', '/lab', '/notes', '/about', '/now', '/reading'].map(path => ({ url: absoluteUrl(path) })),
    ...projects.map(project => ({ url: absoluteUrl(`/work/${project.slug}`) })),
    ...getNotes().map(note => ({ url: absoluteUrl(note.href), lastModified: new Date(`${note.date}T00:00:00Z`) })),
  ];
}
