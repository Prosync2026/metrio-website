import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { asset } from './asset';

/* Canonical origin for search engines and social previews. Every page points
   here, whichever address (github.io or a preview) it is actually served from. */
export const SITE_URL = 'https://metrio.com.my';
const DEFAULT_IMAGE = '/images/og-default.jpg';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/* Absolute URL for an image: imported assets and asset() paths already carry
   the base path, so strip it and rebuild against SITE_URL. */
const absoluteImage = (src) => {
  if (/^https?:\/\//.test(src)) return src;
  const base = import.meta.env.BASE_URL;
  const path = src.startsWith(base) ? src.slice(base.length) : src.replace(/^\//, '');
  return `${SITE_URL}/${path}`;
};

/* Sets title, description, canonical and Open Graph / Twitter tags for the
   current route. The build-time prerender captures the result into each
   page's static HTML, so crawlers and link previews see it without running JS. */
const useSeo = ({ title, description, image = asset(DEFAULT_IMAGE) }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!title) return;
    const url = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    const imageUrl = absoluteImage(image);

    document.title = title;
    setMeta('name', 'description', description);
    setCanonical(url);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
  }, [title, description, image, pathname]);
};

export default useSeo;
