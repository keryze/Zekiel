import type { Metadata } from 'next';
import { site } from '@/site.config';
import { absoluteUrl, assetPath } from '@/lib/utils';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  article?: { date: string; tags: string[] },
): Metadata {
  const image = {
    url: `${site.url}${assetPath('/images/og.png')}`,
    width: 1200,
    height: 630,
    alt: `${site.alias} — Art, through systems.`,
  };
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.alias,
      images: [image],
      ...(article
        ? { type: 'article', publishedTime: article.date, tags: article.tags }
        : { type: 'website' }),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}
