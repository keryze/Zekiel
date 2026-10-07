import fs from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { site } from '../site.config';
const escapeXml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!,
  );
const svg = (await fs.readFile('public/images/og.svg', 'utf8')).replace(
  'ZEKIEL / PERSONAL LAB',
  `${escapeXml(site.alias.toUpperCase())} / PERSONAL LAB`,
);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: 'public/images/og.png' });
  console.log('Created public/images/og.png (1200 × 630).');
} finally {
  await browser.close();
}
