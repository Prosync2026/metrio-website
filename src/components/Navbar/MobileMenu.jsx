import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { allLinks } from '../../data/navigation';

/* Renders <a> for hash hrefs or <Link> for route paths */
const MobileNavLink = ({ href, className, onClick, children }) => {
  if (href.startsWith('/')) {
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  }
  return <a href={href} className={className} onClick={onClick}>{children}</a>;
};

const MobileMenu = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed inset-0 top-0 z-40 bg-white lg:hidden"
      >
        <div className="flex flex-col pt-28 px-8 pb-8 h-full overflow-y-auto">
          {allLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
            >
              <MobileNavLink
                href={link.href}
                onClick={onClose}
                className="block py-4 text-lg font-medium text-dark border-b border-black/5 hover:text-forest transition-colors uppercase tracking-wider"
              >
                {link.label}
              </MobileNavLink>
              {link.children && (
                <div className="pl-4 pb-2">
                  {link.children.map((child) => (
                    <MobileNavLink
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="flex items-center gap-2 py-2.5 text-sm text-warm-gray hover:text-forest transition-colors uppercase tracking-wider"
                    >
                      {child.label}
                      {child.tag && (
                        <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-white bg-red-600 rounded-sm -rotate-12 shadow-md whitespace-nowrap animate-pulse">
                          {child.tag}
                        </span>
                      )}
                    </MobileNavLink>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu;

