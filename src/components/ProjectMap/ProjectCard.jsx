import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index, isActive, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onToggle}
      className={`bg-white p-7 md:p-8 cursor-pointer transition-all border ${
        isActive
          ? 'border-gold/30 shadow-lg shadow-gold/10'
          : 'border-dark/10 shadow-sm hover:shadow-md hover:border-gold/20'
      }`}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h4 className="font-display text-xl md:text-2xl text-dark">{project.name}</h4>
            <span className={`px-3 py-1 text-[10px] tracking-wider uppercase font-sans font-medium ${
              project.status === 'Now Open'
                ? 'bg-green-100 text-green-700'
                : project.status === 'Selling Fast'
                ? 'bg-amber-100 text-amber-700'
                : project.status === 'Launch Soon'
                ? 'bg-blue-100 text-blue-700'
                : project.status === 'Completed'
                ? 'bg-forest/10 text-forest'
                : 'bg-gold/10 text-gold-dark'
            }`}>
              {project.status}
            </span>
          </div>
          <p className="font-sans text-warm-gray text-sm md:text-base">{project.type} · {project.location}</p>
        </div>
        <ArrowUpRight
          size={22}
          className={`shrink-0 mt-1 transition-all ${
            isActive ? 'text-gold' : 'text-warm-gray/40 -rotate-45'
          }`}
        />
      </div>

      {/* Expanded project image card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
            data-card-expand
          >
            <div className="mt-6 relative rounded-sm overflow-hidden aspect-[16/9] bg-cream-dark">
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {project.url && (
                     <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                       className="btn-primary"
                    >
                        View Project
                   </a>
                  )}
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-linen">
                  <p className="text-warm-gray/50 text-sm tracking-[0.15em] uppercase font-sans italic">
                    📌 Pending Image
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
