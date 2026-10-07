import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/inter';
import '@fontsource/ibm-plex-mono/400.css';
import '@/styles/globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/site.config';
import { getNotes } from '@/lib/notes';
import { projects } from '@/data/projects';
import { absoluteUrl, assetPath } from '@/lib/utils';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.alias} — ${site.title}`, template: `%s — ${site.alias}` },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.alias,
    locale: 'en_US',
    title: `${site.alias} — ${site.title}`,
    description: site.description,
    images: [
      {
        url: assetPath('/images/og.png'),
        width: 1200,
        height: 630,
        alt: `${site.alias} — Art, through systems.`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.alias} — ${site.title}`,
    description: site.description,
    images: [assetPath('/images/og.png')],
  },
  icons: { icon: assetPath('/icon.svg') },
};
export const viewport: Viewport = {
  themeColor: '#111310',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchItems = [
    ...projects.map((p) => ({
      title: p.title,
      description: p.description,
      href: `/work/${p.slug}`,
      kind: `Work / ${p.category}`,
    })),
    ...getNotes().map((n) => ({
      title: n.title,
      description: `${n.description} ${n.tags.join(' ')}`,
      href: n.href,
      kind: `Note / ${n.category}`,
    })),
    ...[
      { title: 'Lab', description: 'Experiments and open questions.', href: '/lab', kind: 'Page' },
      { title: 'About', description: 'Artist, engineer, builder.', href: '/about', kind: 'Page' },
      {
        title: 'Now',
        description: 'Current interests and directions.',
        href: '/now',
        kind: 'Page',
      },
      {
        title: 'Reading',
        description: 'Books, mental models, and systems.',
        href: '/reading',
        kind: 'Page',
      },
    ],
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.alias,
    url: absoluteUrl('/'),
    description: site.description,
  };
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header searchItems={searchItems} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
