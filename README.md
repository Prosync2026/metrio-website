# Metrio Group website

Corporate website for Metrio Group, a Malaysian group covering property development, construction, retail management, aluminium formwork and digital construction.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP and Leaflet.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # production build in dist/
npm run prerender # render every route to static HTML + sitemap.xml, robots.txt (after build)
npm run preview   # serve dist/ locally
```

The first `npm run prerender` needs Chrome for Puppeteer: `npx puppeteer browsers install chrome`.

Copy `.env.example` to `.env.local` to set optional keys (see comments in that file).

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

- **github.io address:** works as is; the workflow builds with base `/metrio-website/`.
- **Custom domain:** set it under *Settings → Pages → Custom domain* and add the DNS records GitHub shows. The next deploy builds with base `/`.
- **Map tiles (optional):** add a `VITE_CARTO_API_KEY` repository secret. The key ends up in the public bundle, so restrict it by domain in the CARTO dashboard.

Images in `public/` referenced from JavaScript must go through `asset('/images/...')` (`src/utils/asset.js`) so they resolve under either base path.

## SEO

- **Per-page meta:** each page calls `useSeo({ title, description, image })` (`src/utils/useSeo.js`), which sets the title, description, canonical URL and Open Graph / Twitter tags. A new page needs this call.
- **Prerendering:** `scripts/prerender.mjs` loads every route in headless Chrome after the build and saves it as `dist/<route>.html`, so pages return 200 with their content and meta in the HTML. Routes are listed in the script, plus the `slug`s in `src/data/businesses.js` and `src/data/news.js`. Add a new top-level route to the list there too.
- **Sitemap:** `sitemap.xml` and `robots.txt` are generated from the same route list on every deploy.
- **Structured data:** the `Organization` JSON-LD (offices, phones, subsidiaries) is in `index.html`. Keep it in step with the Contact page.
- **Images:** keep photos under ~500 KB. Use WebP or JPEG at most 2000 px wide; keep PNG only for logos and cut-outs that need transparency.
