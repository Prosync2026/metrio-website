/* ─── Build-time prerender ───
   Run after `vite build`. Loads every route of the built site in headless
   Chrome and saves the rendered page as dist/<route>.html, which GitHub Pages
   serves at /<route> with a 200 status. Crawlers and link previews then get
   real content and per-page meta (set by useSeo) without running JS. The app
   still mounts with createRoot on load, so behaviour in the browser is unchanged.

   Also writes sitemap.xml, robots.txt and a noindex 404.html shell.
   Usage: BASE_PATH=/ node scripts/prerender.mjs
*/
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

const SITE_URL = 'https://metrio.com.my';
const DIST = path.resolve('dist');
const BASE = process.env.BASE_PATH || '/';
const PORT = 4179;

/* Routes come from App.jsx plus the slugs in the data files. The slugs are read
   as text because the data modules use import.meta.env, which Node lacks. */
const slugsIn = async (file) => {
  const src = await fs.readFile(file, 'utf8');
  return [...src.matchAll(/^\s{4}slug:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1]);
};

const routes = [
  '/',
  '/about-us',
  '/projects',
  '/careers',
  '/news',
  '/contact-us',
  ...(await slugsIn('src/data/businesses.js')).map((s) => `/businesses/${s}`),
  ...(await slugsIn('src/data/news.js')).map((s) => `/news/${s}`),
];

const outFile = (route) => path.join(DIST, route === '/' ? 'index.html' : `${route.slice(1)}.html`);

/* Keep the unrendered shell for unknown URLs (the app redirects them home) */
const shell = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
await fs.writeFile(
  path.join(DIST, '404.html'),
  shell.replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'),
);

const server = await preview({ base: BASE, preview: { port: PORT, strictPort: true } });
const browser = await puppeteer.launch({
  /* Ubuntu runners block Chrome's sandbox; the pages rendered are our own build */
  args: process.env.CI ? ['--no-sandbox'] : [],
});

let failed = 0;
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  /* Mark the welcome video as seen so it is not baked into every page */
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('metrio-tribute-video-seen', '1');
  });

  for (const route of routes) {
    const url = `http://localhost:${PORT}${BASE.replace(/\/$/, '')}${route}`;
    const res = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    /* useSeo writes the canonical once the route has rendered */
    const canonical = SITE_URL + (route === '/' ? '/' : route);
    try {
      await page.waitForFunction(
        (href) => document.querySelector('link[rel="canonical"]')?.href === href,
        { timeout: 15000 },
        canonical,
      );
    } catch {
      console.error(`✗ ${route}: canonical never became ${canonical} (status ${res?.status()})`);
      failed += 1;
      continue;
    }
    const html = `<!doctype html>\n${await page.evaluate(() => document.documentElement.outerHTML)}\n`;
    const file = outFile(route);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
    console.log(`✓ ${route} → ${path.relative(DIST, file)} (${await page.title()})`);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');
await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
await fs.writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`sitemap.xml: ${routes.length} URLs`);

if (failed) {
  console.error(`${failed} route(s) failed to prerender`);
  process.exit(1);
}
