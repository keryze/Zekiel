import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getNotes, getNote } from '@/lib/notes';
import { absoluteUrl, assetPath, formatDate } from '@/lib/utils';
import { headingId } from '@/lib/headings';
import { pageMetadata } from '@/lib/metadata';
import { SampleNotice } from '@/components/page-intro';
export const dynamicParams = false;
export function generateStaticParams() { return getNotes().map(note => ({ category: note.category, slug: note.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const note = getNote(category, slug);
  return note ? pageMetadata(note.title, note.description, note.href, { date: note.date, tags: note.tags }) : {};
}
export default async function NoteDetail({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const note = getNote(category, slug);
  if (!note) notFound();
  const headings = [...note.source.matchAll(/^## (.+)$/gm)].map(match => match[1]);
  const { content } = await compileMDX({ source: note.source, options: { mdxOptions: { remarkPlugins: [remarkGfm] } }, components: {
    h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
    a: ({ href, children, ...props }) => <a href={href?.startsWith('/') ? assetPath(href) : href} {...props} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>,
    img: ({ src, alt, width, height }) => typeof src === 'string' ? <Image src={src.startsWith('/') ? assetPath(src) : src} alt={alt || ''} width={Number(width) || 1200} height={Number(height) || 800} sizes="(max-width: 760px) 100vw, 720px" /> : null,
    table: ({ children }) => <div className="table-scroll"><table>{children}</table></div>,
  } });
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: note.title, description: note.description, datePublished: note.date, mainEntityOfPage: absoluteUrl(note.href) };
  return <article className="container page note-detail"><Link href="/notes" className="back-link mono">← ALL NOTES</Link><header className="detail-header"><p className="eyebrow mono">{note.category} / {note.readingMinutes} MIN READ {note.sample && <span className="sample-tag">SAMPLE</span>}</p><h1>{note.title}</h1><p>{note.description}</p><div className="article-date mono"><time dateTime={note.date}>{formatDate(note.date)}</time><span>{note.tags.join(' / ')}</span></div></header><div className="article-layout"><aside className="article-sidebar note-toc" aria-label="Note contents"><p className="eyebrow mono">IN THIS NOTE</p><nav aria-label="Table of contents">{headings.map(heading => <a key={heading} href={`#${headingId(heading)}`}>{heading}</a>)}</nav><p className="sidebar-caption">A garden note can change.<br />The questions are part of the record.</p></aside><div className="prose">{note.sample && <SampleNotice>This is a sample note to demonstrate the content system. Replace it with your own research and observations.</SampleNotice>}{content}<div className="article-end"><span className="brand-mark">z.</span><span className="mono">END OF NOTE / KEEP EXPLORING</span></div></div></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /></article>;
}
