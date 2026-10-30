import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  href,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-xl';

  const variants = {
    primary:
      'bg-slate-900 text-white shadow-sm hover:bg-amber-600 hover:shadow-md',
    outline:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900',
    'outline-light':
      'border-2 border-white/40 text-white hover:bg-white/10 hover:border-white',
    ghost:
      'text-slate-700 hover:text-amber-600 bg-transparent',
    'ghost-light':
      'text-white/80 hover:text-white bg-transparent',
    forest:
      'bg-slate-900 text-white shadow-sm hover:bg-amber-600 hover:shadow-md',
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs uppercase',
    md: 'px-7 py-3 text-sm uppercase',
    lg: 'px-9 py-4 text-sm uppercase',
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${
    sizes[size] || sizes.md
  } ${className}`;

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight
          size={size === 'sm' ? 14 : 16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`group ${classes}`}
        {...props}
      >
        {content}
      </Component>
    </motion.div>
  );
};

export default Button;
