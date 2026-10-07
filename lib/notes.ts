import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Note } from '@/types/content';
const root = path.join(process.cwd(), 'content', 'notes');
export function getNotes(): Note[] {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((directory) => {
      return fs
        .readdirSync(path.join(root, directory.name))
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
          const { data, content } = matter(
            fs.readFileSync(path.join(root, directory.name, file), 'utf8'),
          );
          const slug = file.replace(/\.mdx$/, '');
          if (
            typeof data.title !== 'string' ||
            typeof data.description !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))
          ) {
            throw new Error(`Invalid note frontmatter: ${directory.name}/${file}`);
          }
          if (
            !Array.isArray(data.tags) ||
            !data.tags.every((tag) => typeof tag === 'string') ||
            typeof data.sample !== 'boolean'
          ) {
            throw new Error(
              `A note needs string tags and an explicit sample boolean: ${directory.name}/${file}`,
            );
          }
          return {
            slug,
            category: directory.name,
            title: data.title,
            description: data.description,
            date: String(data.date),
            tags: data.tags,
            sample: data.sample,
            readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
            source: content,
            href: `/notes/${directory.name}/${slug}`,
          };
        });
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function getNote(category: string, slug: string) {
  return getNotes().find((note) => note.category === category && note.slug === slug);
}
