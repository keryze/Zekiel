import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { projects } from '../data/projects';
import { getNotes } from '../lib/notes';
const base = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const errors: string[] = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => errors.push(error.message));
page.on('console', msg => { if (msg.type() === 'error' && !page.url().includes('/does-not-exist/')) errors.push(msg.text()); });
const routes = ['/', '/work', '/lab', '/notes', '/about', '/now', '/reading', ...projects.map(p => `/work/${p.slug}`), ...getNotes().map(n => n.href)];
fs.mkdirSync('verification', { recursive: true });
try {
  const links = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(`${base}${route}/`.replace(/(?<!:)\/{2,}/g, '/'), { waitUntil: 'networkidle' });
    assert.equal(response?.status(), 200, `HTTP status: ${route}`);
    assert.equal(await page.locator('h1').count(), 1, `One h1: ${route}`);
    assert.ok(await page.locator('meta[name="description"]').getAttribute('content'), `Description: ${route}`);
    assert.ok(await page.locator('link[rel="canonical"]').getAttribute('href'), `Canonical: ${route}`);
    const imageFailures = await page.locator('img').evaluateAll(images => images.filter(img => !(img as HTMLImageElement).complete || (img as HTMLImageElement).naturalWidth === 0).map(img => img.getAttribute('src')));
    assert.deepEqual(imageFailures, [], `Images: ${route}`);
    for (const href of await page.locator('a[href]').evaluateAll(as => as.map(a => (a as HTMLAnchorElement).href))) {
      if (href.startsWith(base) && !href.includes('#')) links.add(href);
    }
    console.log(`PASS desktop ${route}`);
  }
  await page.goto(`${base}/work/`);
  await page.getByRole('button', { name: 'Houdini' }).click();
  assert.equal(await page.locator('.project-card').count(), projects.filter(p => p.category === 'Houdini').length);
  assert.ok(await page.getByRole('button', { name: 'Houdini' }).getAttribute('aria-pressed') === 'true');
  await page.getByRole('button', { name: /^All/ }).click();
  assert.equal(await page.locator('.project-card').count(), projects.length);
  await page.goto(`${base}/notes/`);
  await page.getByRole('button', { name: 'ai 1', exact: true }).click();
  assert.equal(await page.locator('.note-row').count(), 1);
  await page.goto(`${base}/lab/`);
  await page.getByRole('button', { name: /^Rendering/ }).click();
  assert.equal(await page.locator('.lab-row').count(), 2);
  await page.goto(`${base}/`);
  await page.getByRole('button', { name: 'Search the site' }).click();
  await page.getByRole('searchbox').fill('snow');
  for (let i = 0; i < 8; i++) await page.keyboard.press('Tab');
  assert.ok(await page.locator('dialog').evaluate(dialog => dialog.contains(document.activeElement)), 'Search traps keyboard focus');
  assert.equal(await page.locator('.search-result').count(), 1);
  await page.keyboard.press('Escape');
  await page.locator('dialog').waitFor({ state: 'hidden' });
  assert.equal(await page.locator('dialog[open]').count(), 0);
  assert.ok(await page.getByRole('button', { name: 'Search the site' }).evaluate(button => button === document.activeElement), 'Search restores trigger focus');
  await page.keyboard.press('Control+k');
  await page.locator('dialog').waitFor({ state: 'visible' });
  assert.equal(await page.locator('dialog[open]').count(), 1);
  await page.getByRole('searchbox').fill('no-such-content-xyz');
  assert.ok(await page.getByText('No results. Try').isVisible());
  await page.getByRole('button', { name: 'Close search' }).click();
  await page.screenshot({ path: 'verification/home-desktop.png', fullPage: true });
  for (const route of ['/work', '/notes/unreal/nanite-displacement', '/about']) {
    await page.goto(`${base}${route}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `verification/${route.replaceAll('/', '-').slice(1)}-desktop.png`, fullPage: true });
  }
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of routes) {
      await page.goto(`${base}${route}/`.replace(/(?<!:)\/{2,}/g, '/'), { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, `Horizontal overflow at ${width}px: ${route}`);
    }
    console.log(`PASS responsive ${width}px: ${routes.length} routes`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/`);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('link', { name: 'Work', exact: true }).click();
  await page.waitForURL('**/work/');
  assert.match(page.url(), /\/work\/$/);
  assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
  await page.goto(`${base}/`);
  await page.screenshot({ path: 'verification/home-mobile.png', fullPage: true });
  await page.goto(`${base}/notes/houdini/procedural-thinking/`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.prose table').count(), 1);
  await page.screenshot({ path: 'verification/note-mobile.png', fullPage: true });
  for (const href of links) {
    const response = await context.request.get(href);
    assert.equal(response.status(), 200, `Internal link: ${href}`);
  }
  const missing = await context.request.get(`${base}/does-not-exist/`);
  assert.equal(missing.status(), 404, 'Missing route returns HTTP 404');
  await page.goto(`${base}/does-not-exist/`);
  assert.ok(await page.getByRole('heading', { name: 'Nothing grows here. Yet.' }).isVisible());
  assert.deepEqual(errors, [], 'No browser console or runtime errors');
  console.log(`PASS interactions, MDX, 404, ${links.size} internal links, no console errors`);
} finally { await browser.close(); }
