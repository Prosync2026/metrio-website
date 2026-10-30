   import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';
import MapPanel from './ProjectMap/MapPanel';
import ProjectCard from './ProjectMap/ProjectCard';
import { regions } from '../data/projects';

/* ─── Homepage preview: map + on-going projects (Northern only) + CTA ─── */
const ProjectPreview = () => {
  const [activeProject, setActiveProject] = useState(null);
  const region = regions.northern;

  /* Filter to active (non-completed) projects only */
  const activeProjects = useMemo(
    () => region?.projects?.filter((p) => p.status !== 'Completed') || [],
    [region]
  );

  /* Region object with only active projects for the map */
  const previewRegion = useMemo(
    () => ({ ...region, projects: activeProjects }),
    [region, activeProjects]
  );

  const totalProjects = useMemo(
    () => Object.values(regions).reduce((sum, r) => sum + r.projects.length, 0),
    []
  );

  return (
    <section id="projects" className="py-20 md:py-28 bg-linen">
      <div className="container-metrio">
        {/* Heading */}
        <ScrollReveal className="text-center mb-6 md:mb-10">
          <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-6">
            On-going Developments
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
            <span className="text-gold">Our</span>{' '}
            <span className="text-dark">Projects</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover premium developments across Malaysia.
          </p>
        </ScrollReveal>

        {/* Map + Project Cards (Northern Region only) */}
        {/* Fixed height on desktop so the section doesn't grow with the list —
            the map fills the left column and the cards scroll on the right. */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 lg:h-[600px]">
          {/* Map */}
          <MapPanel
            region={previewRegion}
            activeProject={activeProject}
            onSelectProject={setActiveProject}
            heightClass="h-[400px] lg:h-[600px]"
          />

          {/* Project Cards */}
          <div className="lg:col-span-3 space-y-5 max-h-[520px] lg:max-h-none lg:h-full overflow-y-auto overscroll-contain p-1 pr-3">
            {activeProjects.map((p, i) => (
              <ProjectCard
                key={p.name}
                project={p}
                index={i}
                isActive={activeProject === i}
                onToggle={() => setActiveProject(activeProject === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* View All Projects CTA */}
        <ScrollReveal className="text-center mt-8">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group btn-primary cursor-pointer"
            >
              View All {totalProjects} Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </Link>
          <p className="text-warm-gray/60 text-xs tracking-wider uppercase mt-4">
            Including completed &amp; reference projects
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectPreview;
