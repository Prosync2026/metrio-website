# Metrio Group website

Corporate website for Metrio Group, a Malaysian group covering property development, construction, retail management, aluminium formwork and digital construction.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP and Leaflet.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # production build in dist/
npm run preview   # serve dist/ locally
```

Copy `.env.example` to `.env.local` to set optional keys (see comments in that file).

## Deployment

Every push to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

- **github.io address:** works as is; the workflow builds with base `/metrio-website/`.
- **Custom domain:** set it under *Settings → Pages → Custom domain* and add the DNS records GitHub shows. The next deploy builds with base `/`.
- **Map tiles (optional):** add a `VITE_CARTO_API_KEY` repository secret. The key ends up in the public bundle, so restrict it by domain in the CARTO dashboard.

Images in `public/` referenced from JavaScript must go through `asset('/images/...')` (`src/utils/asset.js`) so they resolve under either base path.
