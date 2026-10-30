/* Resolves a file in public/ against the deploy base, so the same build works
   at a domain root (base "/") and under a subpath such as /metrio-website/.
   Vite rewrites paths in index.html and CSS itself; JS strings need this. */
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '');
