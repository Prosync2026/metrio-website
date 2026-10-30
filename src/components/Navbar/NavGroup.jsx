import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Renders an <a> for hash hrefs (#about) or a <Link> for route paths (/projects) */
const NavLink = ({ href, className, children }) => {
  if (href.startsWith('/')) {
    return <Link to={href} className={className}>{children}</Link>;
  }
  return <a href={href} className={className}>{children}</a>;
};

const NavGroup = ({ links, light, activeDropdown, setActiveDropdown }) => (
  <div className="flex items-center gap-6">
    {links.map((link) => (
      <div
        key={link.label}
        className="relative"
        onMouseEnter={() => link.children && setActiveDropdown(link.label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <NavLink
          href={link.href}
          className={`flex items-center gap-1.5 px-3 py-3 text-[13px] font-bold tracking-[0.12em] uppercase transition-colors duration-300 text-center ${
            light
              ? `text-white/90 hover:text-gold-light [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] ${activeDropdown === link.label ? 'text-gold-light' : ''}`
              : `text-dark/70 hover:text-forest ${activeDropdown === link.label ? 'text-forest' : ''}`
          }`}
        >
          {link.label}
          {link.children && (
            <ChevronDown
              size={12}
              className={`transition-transform duration-200 ${
                activeDropdown === link.label ? 'rotate-180' : ''
              }`}
            />
          )}
        </NavLink>

        {/* Dropdown */}
        <AnimatePresence>
          {link.children && activeDropdown === link.label && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 mt-0 min-w-[260px] bg-white shadow-xl shadow-black/8 overflow-hidden z-50"
            >
              {/* Gold top accent line */}
              <div className="h-[2px] bg-gradient-to-r from-gold to-gold-light" />
              <div className="py-4">
                {link.children.map((child) => (
                  <NavLink
                    key={child.label}
                    href={child.href}
                    className="flex items-center gap-3 px-7 py-3.5 text-[13px] tracking-[0.1em] uppercase text-dark/60 hover:text-forest hover:bg-cream/50 transition-all duration-200"
                  >
                    {child.label}
                    {child.tag && (
                      <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white bg-red-600 rounded-sm -rotate-12 shadow-md ml-1 whitespace-nowrap animate-pulse">
                        {child.tag}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))}
  </div>
);

export default NavGroup;

