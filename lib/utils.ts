import { site } from '@/site.config';
export const assetPath = (path: string) => `${site.basePath}${path}`;
export const absoluteUrl = (path: string) => `${site.url}${site.basePath}${path === '/' ? '/' : `${path.replace(/\/$/, '')}/`}`;
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
