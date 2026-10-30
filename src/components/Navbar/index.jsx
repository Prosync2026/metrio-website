import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetrioLogo from '../MetrioLogo';
import NavGroup from './NavGroup';
import MobileMenu from './MobileMenu';
import { leftLinks, rightLinks } from '../../data/navigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  /* Every page opens on a dark hero: white links and logo until scrolled */
  const overHero = !scrolled && !mobileOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-metrio flex items-center h-28 lg:h-[96px]">
        {/* Mobile: left spacer to balance hamburger — keeps logo truly centered */}
        <div className="lg:hidden w-10 shrink-0" />

        {/* Left Nav Links (desktop) — flex-1 + justify-end so logo stays centered */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-end">
          <NavGroup
            links={leftLinks}
            light={overHero}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </div>

        {/* Centered Logo — flex-1 on mobile to fill middle, fixed padding on desktop */}
        <div className="flex-1 lg:flex-none flex justify-center">
          <Link to="/" className="relative z-10 shrink-0 lg:px-10">
            <MetrioLogo variant={overHero ? 'light' : 'dark'} size="md" />
          </Link>
        </div>

        {/* Right Nav Links (desktop) — flex-1 + justify-start so logo stays centered */}
        <div className="hidden lg:flex lg:flex-1 items-center justify-start">
          <NavGroup
            links={rightLinks}
            light={overHero}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden shrink-0 z-[60] p-2 transition-colors ${overHero ? 'text-white' : 'text-dark'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
};

export default Navbar;
