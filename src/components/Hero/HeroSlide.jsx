import { motion } from 'framer-motion';

const HeroSlide = ({ slide }) => (
  <>
    {/* Subtitle line */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="font-sans text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase mb-8 md:mb-10 text-dark/50 font-light"
    >
      {slide.titleTop} Today
    </motion.p>

    {/* Main headline */}
    <h1 className="font-display uppercase leading-[0.95] tracking-tight">
      {/* Accent word */}
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="block text-gold text-7xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-semibold mb-2 md:mb-4"
      >
        {slide.titleAccent}
      </motion.span>
      {/* Bottom word */}
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="block text-dark text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-bold"
      >
        {slide.titleBottom}
      </motion.span>
    </h1>

    {/* CTA Button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="mt-12 md:mt-16"
    >
      <a
        href="#projects"
        className="btn-primary hover:-translate-y-0.5"
      >
        Register Interest
      </a>
    </motion.div>
  </>
);

export default HeroSlide;
