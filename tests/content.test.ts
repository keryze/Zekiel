import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { projects } from '../data/projects';
import { experiments } from '../data/lab';
import { getNotes, getNote } from '../lib/notes';
import { headingId } from '../lib/headings';
import { absoluteUrl, assetPath } from '../lib/utils';
import { site } from '../site.config';
const notes = getNotes();
test('projects have unique valid slugs, actual assets, and technical breakdowns', () => {
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    assert.ok(fs.existsSync(path.join(process.cwd(), 'public', p.image)));
    assert.ok(p.imageAlt.length > 20);
    assert.ok(p.sections.length >= 4);
    assert.ok(p.stack.length > 0);
    assert.match(p.year, /^\d{4}$/);
  }
});
test('notes are auto-discovered with valid metadata and distinct routes', () => {
  assert.ok(notes.length > 0);
  assert.equal(new Set(notes.map((n) => n.href)).size, notes.length);
  for (const n of notes) {
    assert.ok(!Number.isNaN(Date.parse(n.date)));
    assert.equal(getNote(n.category, n.slug)?.title, n.title);
    assert.ok(n.source.length > 100);
    assert.ok(n.readingMinutes > 0);
    assert.match(n.href, /^\/notes\/[a-z0-9-]+\/[a-z0-9-]+$/);
  }
  assert.equal(getNote('../', 'missing'), undefined);
});
test('sample work is explicitly labeled in its data', () => {
  for (const p of projects.filter((p) => p.status === 'Sample')) assert.match(p.summary, /sample/i);
  for (const n of notes.filter((n) => n.sample)) assert.match(n.source, /sample/i);
});
test('all lab links point to existing content', () => {
  const routes = new Set([...projects.map((p) => `/work/${p.slug}`), ...notes.map((n) => n.href)]);
  for (const experiment of experiments) assert.ok(routes.has(experiment.href), experiment.href);
});
test('MDX compiles every real note, including GFM and code blocks', async () => {
  for (const note of notes) {
    const result = await compileMDX({
      source: note.source,
      options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    });
    assert.ok(result.content);
  }
});
test('table-of-contents headings have unique non-empty anchors', () => {
  for (const note of notes) {
    const ids = [...note.source.matchAll(/^## (.+)$/gm)].map((match) => headingId(match[1]));
    assert.ok(ids.every(Boolean));
    assert.equal(new Set(ids).size, ids.length);
  }
});
test('production URLs include the deployment subpath exactly once', () => {
  assert.equal(absoluteUrl('/notes'), `${site.url}${site.basePath}/notes/`);
  assert.equal(absoluteUrl('/'), `${site.url}${site.basePath}/`);
  assert.equal(assetPath('/images/snow.svg'), `${site.basePath}/images/snow.svg`);
});

test('heading anchors support Chinese and English notes', () => {
  assert.equal(headingId('理解 Nanite 的机制'), '理解-nanite-的机制');
  assert.equal(headingId('Light / Surface / Time'), 'light-surface-time');
});
