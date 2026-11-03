import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VideoPopup from './components/VideoPopup';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BusinessPage from './pages/BusinessPage';
import CareersPage from './pages/CareersPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';

/* ─── Scroll handler ───
   - Back/forward (POP) → return to where the visitor left that page
   - If URL has a hash (#businesses), scroll to that section
   - Otherwise scroll to top (new page navigation)
*/
const savedScroll = new Map(); // history entry key → scrollY

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  /* Keep the current entry's scroll position up to date. The key lives in a
     ref that switches before we scroll the new page, so a scroll event from
     that jump can't overwrite the previous page's saved position. */
  const currentKey = useRef(key);
  useEffect(() => {
    const save = () => savedScroll.set(currentKey.current, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, []);

  useLayoutEffect(() => {
    currentKey.current = key;
    const saved = savedScroll.get(key);
    if (navType === 'POP' && saved !== undefined) {
      /* Jump straight back. Retry for a moment in case the page is still
         growing (images, lazy sections) and can't reach the position yet. */
      let tries = 0;
      let raf;
      const restore = () => {
        window.scrollTo({ top: saved, behavior: 'instant' });
        if (Math.abs(window.scrollY - saved) > 2 && tries++ < 60) raf = requestAnimationFrame(restore);
      };
      restore();
      return () => cancelAnimationFrame(raf);
    }

    if (hash) {
      /* Small delay so the target element is rendered first */
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    /* No hash — scroll to top for fresh page loads */
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key, navType]);

  return null;
};

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <VideoPopup />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/businesses/:slug" element={<BusinessPage />} />
            <Route path="/careers" element={<CareersPage />} />
            {/* /awards-achievements hidden for now (pages/AwardsPage.jsx kept); falls through to the redirect below */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/contact-us" element={<ContactPage />} />
            {/* Unknown URLs → home, same as an unknown business slug */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
