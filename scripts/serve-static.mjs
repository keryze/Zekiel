/** Local production preview: serves the export and its real custom 404 page. */
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('out');
const port = Number(process.env.PORT || 3000);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (basePath) {
      if (pathname !== basePath && !pathname.startsWith(`${basePath}/`)) throw new Error('Outside mount');
      pathname = pathname.slice(basePath.length) || '/';
    }
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== root) throw new Error('Outside export');
    const stat = await fs.stat(file);
    if (stat.isDirectory()) file = path.join(file, 'index.html');
    const body = await fs.readFile(file);
    const extension = path.extname(file);
    const compressed = /\bgzip\b/.test(req.headers['accept-encoding'] || '') && ['.html', '.css', '.js', '.json', '.txt', '.xml', '.svg'].includes(extension);
    res.writeHead(200, {
      'Content-Type': mime[extension] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': pathname.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : extension === '.html' ? 'no-cache' : 'public, max-age=3600',
      'Vary': 'Accept-Encoding',
      ...(compressed ? { 'Content-Encoding': 'gzip' } : {}),
    });
    res.end(req.method === 'HEAD' ? undefined : compressed ? gzipSync(body) : body);
  } catch {
    const body = await fs.readFile(path.join(root, '404.html')).catch(() => 'Not found. Run npm run build first.');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  }
});
server.listen(port, '0.0.0.0', () => console.log(`Static preview listening on port ${port}${basePath || '/'}`));
