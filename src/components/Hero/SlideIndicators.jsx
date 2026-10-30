import { motion } from 'framer-motion';

const SlideIndicators = ({ slides, current, onSelect }) => (
  <>
    {/* Dot indicators */}
    <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`transition-all duration-500 rounded-full ${
            index === current
              ? 'w-12 h-3 bg-gold shadow-lg shadow-gold/30'
              : 'w-3 h-3 bg-dark/20 hover:bg-dark/40'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-6 h-10 border-2 border-dark/20 rounded-full flex items-start justify-center p-1.5"
      >
        <motion.div className="w-1 h-2 bg-gold rounded-full" />
      </motion.div>
    </motion.div>
  </>
);

export default SlideIndicators;
