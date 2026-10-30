import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import RegionTabs from './RegionTabs';
import MapPanel from './MapPanel';
import ProjectCard from './ProjectCard';
import { regions } from '../../data/projects';

const ProjectMap = () => {
  const [activeRegion, setActiveRegion] = useState('northern');
  const [activeProject, setActiveProject] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const region = regions[activeRegion];

  const completedCount = useMemo(
    () => region.projects.filter((p) => p.status === 'Completed').length,
    [region]
  );
  const hasCompleted = completedCount > 0;

  /* Projects visible to both the card list and the map */
  const visibleProjects = useMemo(
    () =>
      showCompleted
        ? region.projects
        : region.projects.filter((p) => p.status !== 'Completed'),
    [region, showCompleted]
  );

  /* Region we pass to MapPanel – same shape but with filtered projects */
  const visibleRegion = useMemo(
    () => ({ ...region, projects: visibleProjects }),
    [region, visibleProjects]
  );

  const handleRegionChange = (key) => {
    setActiveRegion(key);
    setActiveProject(null);
    setShowCompleted(false);
  };

  const handleToggleCompleted = () => {
    setShowCompleted((prev) => !prev);
    setActiveProject(null);
  };

  return (
    <section id="projects" className="relative z-0 py-28 md:py-36 bg-linen">
      <div className="container-metrio">
        {/* Heading */}
        <ScrollReveal className="text-center mb-14 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
            <span className="text-gold">Our</span>{' '}
            <span className="text-dark">Projects</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover premium developments across Malaysia.
          </p>
        </ScrollReveal>

        {/* Region Tabs */}
        <RegionTabs
          regions={regions}
          activeRegion={activeRegion}
          onSelect={handleRegionChange}
        />

        {/* Reference Projects Description */}
        {activeRegion === 'reference' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 max-w-3xl mx-auto"
          >
            <p className="text-warm-gray text-sm md:text-base leading-relaxed italic">
              Metrio Group's construction experience spans high-rise developments across Malaysia.
              The projects below represent our capability and track record in delivering large-scale,
              complex builds to the highest standard.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12"
          >
            {/* Map */}
            <MapPanel
              region={visibleRegion}
              activeProject={activeProject}
              onSelectProject={setActiveProject}
            />

            {/* Project Cards */}
            <div className="lg:col-span-3 space-y-5">
              {visibleProjects.map((p, i) => (
                <ProjectCard
                  key={p.name}
                  project={p}
                  index={i}
                  isActive={activeProject === i}
                  onToggle={() => setActiveProject(activeProject === i ? null : i)}
                />
              ))}

              {/* Toggle completed projects */}
              {hasCompleted && (
                <motion.button
                  onClick={handleToggleCompleted}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full flex items-center justify-center gap-2 py-4 mt-2
                    text-[12px] tracking-[0.15em] uppercase font-sans font-medium
                    text-warm-gray hover:text-gold transition-colors duration-300
                    border border-dashed border-warm-gray/20 hover:border-gold/30
                    cursor-pointer bg-transparent"
                >
                  {showCompleted ? (
                    <>
                      <ChevronUp size={16} />
                      Hide Completed Projects
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show {completedCount} Completed Project{completedCount !== 1 ? 's' : ''}
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectMap;
