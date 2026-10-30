import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const BusinessCard = ({ biz, index }) => {
  const { pathname } = useLocation();
  return (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: index * 0.07, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <Link to={`/businesses/${biz.slug}`} state={{ from: pathname }} className="block">
      <div className="relative group cursor-pointer overflow-hidden aspect-[3/5]">
        {/* Full-cover background image — scales on hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${biz.image})` }}
        />

        {/* Taller dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-40% to-transparent" />
        {/* Extra darkness on hover for contrast */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 lg:p-5 flex flex-col items-start">
          {/* Subsidiary label */}
          <span className="text-white/70 text-[10px] lg:text-[9px] tracking-[0.15em] uppercase font-sans mb-1.5">
            {biz.subsidiary}
          </span>

          {/* Business title — responsive sizing for 5-col grid */}
          <h3 className="font-display text-lg md:text-xl lg:text-[1.1rem] xl:text-xl text-white uppercase tracking-wide leading-tight mb-3 md:mb-4">
            {biz.name}
          </h3>

          {/* VIEW button */}
          <span className="inline-flex items-center px-4 py-2 lg:px-3 lg:py-1.5 xl:px-5 xl:py-2 text-[10px] lg:text-[9px] xl:text-[10px] tracking-[0.18em] uppercase font-sans font-semibold text-white border border-white/50 opacity-70 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-400">
            View
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
  );
};

export default BusinessCard;

