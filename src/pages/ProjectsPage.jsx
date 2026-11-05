import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import RegionTabs from '../components/ProjectMap/RegionTabs';
import MapPanel from '../components/ProjectMap/MapPanel';
import ProjectCard from '../components/ProjectMap/ProjectCard';
import { regions } from '../data/projects';
import { asset } from '../utils/asset';
import useSeo from '../utils/useSeo';

/* ─── Helpers ─── */
const isOnGoing = (status) => status !== 'Completed';

/* Only show Northern & Central in the on-going view — Reference is completed work */
const regionsFor = (mode) =>
  mode === 'on-going'
    ? Object.fromEntries(Object.entries(regions).filter(([key]) => key !== 'reference'))
    : regions;

/* Keep the region if the view shows it, otherwise fall back to the first one it does */
const pickRegion = (mode, key) => {
  const available = regionsFor(mode);
  return available[key] ? key : Object.keys(available)[0] || 'northern';
};

const ProjectsPage = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get('view') === 'completed' ? 'completed' : 'on-going';
  const regionParam = regions[searchParams.get('region')] ? searchParams.get('region') : 'northern';

  const [viewMode, setViewMode] = useState(viewParam);
  const [activeRegion, setActiveRegion] = useState(() => pickRegion(viewParam, regionParam));
  const [activeProject, setActiveProject] = useState(null);

  /* Switching view closes the open card and leaves a region the new view doesn't show */
  const changeView = (mode, regionKey = activeRegion) => {
    setViewMode(mode);
    setActiveRegion(pickRegion(mode, regionKey));
    setActiveProject(null);
  };

  /* Follow ?view= / ?region= when a nav link changes them while already on this page.
     Adjusted during render rather than in an effect, so there's no extra render pass. */
  const paramKey = `${viewParam}|${regionParam}`;
  const [syncedParams, setSyncedParams] = useState(paramKey);
  if (syncedParams !== paramKey) {
    setSyncedParams(paramKey);
    changeView(viewParam, regionParam);
  }
  const listRef = useRef(null);
  const prevActiveRef = useRef(null);

  /* Clicking a map pin scrolls the card list (not the page) to that project */
  useEffect(() => {
    const prev = prevActiveRef.current;
    prevActiveRef.current = activeProject;
    const list = listRef.current;
    if (activeProject === null || !list) return;
    const card = list.children[activeProject];
    if (!card) return;
    let top = card.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop - 4;
    // A previously open card above is about to collapse — aim for where this card will end up
    if (prev !== null && prev < activeProject) {
      const closing = list.children[prev]?.querySelector('[data-card-expand]');
      if (closing) top -= closing.offsetHeight;
    }
    list.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    // Cards near the end can't reach the top until the image finishes expanding — settle once it has
    const settle = setTimeout(() => {
      const offset = card.getBoundingClientRect().top - list.getBoundingClientRect().top - 4;
      if (Math.abs(offset) > 2) list.scrollTo({ top: list.scrollTop + offset, behavior: 'smooth' });
    }, 400);
    return () => clearTimeout(settle);
  }, [activeProject]);

  useSeo({
    title: 'Projects | Metrio Group',
    description: "Explore Metrio Group's on-going and completed property and commercial development projects across Northern and Central Malaysia.",
  });

  const displayRegions = useMemo(() => regionsFor(viewMode), [viewMode]);

  const region = displayRegions[activeRegion] || Object.values(displayRegions)[0];

  /* Filter projects by view mode */
  const filteredProjects = useMemo(() => {
    if (!region) return [];
    return region.projects.filter((p) =>
      viewMode === 'on-going' ? isOnGoing(p.status) : !isOnGoing(p.status)
    );
  }, [region, viewMode]);

  /* Region with filtered projects for map */
  const filteredRegion = useMemo(
    () => ({ ...region, projects: filteredProjects }),
    [region, filteredProjects]
  );

  const handleRegionChange = (key) => {
    setActiveRegion(key);
    setActiveProject(null);
  };

  return (
    <div className="min-h-screen bg-linen">
      {/* ─── Page Header with Background Image ─── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset('/images/hero/cover-3.jpg')})` }}
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/30" />

        <div className="relative z-10 container-metrio pt-44 pb-24 md:pt-48 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-[12px] tracking-[0.15em] uppercase font-sans font-semibold transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] mb-4 text-white">
              All Projects
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
              Explore every development in our portfolio — from active listings to completed
              landmarks and our construction track record.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── On-Going / Completed Toggle ─── */}
      <div className="container-metrio -mt-6 relative z-10 mb-6">
        <div className="inline-flex bg-white shadow-lg overflow-hidden">
          <button
            onClick={() => changeView('on-going')}
            className={`px-8 py-4 text-[12px] tracking-[0.15em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer ${
              viewMode === 'on-going'
                ? 'bg-forest text-white'
                : 'bg-white text-dark/50 hover:text-dark hover:bg-cream/50'
            }`}
          >
            On-Going
          </button>
          <button
            onClick={() => changeView('completed')}
            className={`px-8 py-4 text-[12px] tracking-[0.15em] uppercase font-sans font-semibold transition-all duration-300 cursor-pointer ${
              viewMode === 'completed'
                ? 'bg-forest text-white'
                : 'bg-white text-dark/50 hover:text-dark hover:bg-cream/50'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* ─── Region Tabs ─── */}
      <div className="container-metrio mb-4">
        <RegionTabs
          regions={displayRegions}
          activeRegion={activeRegion}
          onSelect={handleRegionChange}
        />
      </div>

      {/* ─── Reference Projects Description ─── */}
      {activeRegion === 'reference' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-metrio text-center mb-6 max-w-3xl mx-auto"
        >
          <p className="text-warm-gray text-sm md:text-base leading-relaxed italic">
            Metrio Group's construction experience spans high-rise developments across Malaysia.
            The projects below represent our capability and track record in delivering large-scale,
            complex builds to the highest standard.
          </p>
        </motion.div>
      )}

      {/* ─── Project Count ─── */}
      <div className="container-metrio mb-8">
        <p className="text-warm-gray text-sm">
          Showing <span className="text-dark font-medium">{filteredProjects.length}</span>{' '}
          {viewMode === 'on-going' ? 'on-going' : 'completed'} projects
        </p>
      </div>

      {/* ─── Map + Project Cards ─── */}
      <div className="container-metrio pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 lg:h-[600px]"
          >
            {/* Map */}
            <MapPanel
              region={filteredRegion}
              activeProject={activeProject}
              onSelectProject={setActiveProject}
              heightClass="h-[400px] lg:h-[600px]"
            />

            {/* Project Cards — scroll inside the fixed-height row */}
            <div ref={listRef} className="lg:col-span-3 space-y-5 max-h-[520px] lg:max-h-none lg:h-full overflow-y-auto overscroll-contain p-1 pr-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p, i) => (
                  <ProjectCard
                    key={p.name}
                    project={p}
                    index={i}
                    isActive={activeProject === i}
                    onToggle={() => setActiveProject(activeProject === i ? null : i)}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-12 text-center"
                >
                  <p className="text-warm-gray text-sm mb-4">
                    No {viewMode === 'on-going' ? 'on-going' : 'completed'} projects in this region.
                  </p>
                  <button
                    onClick={() => changeView(viewMode === 'on-going' ? 'completed' : 'on-going')}
                    className="text-gold hover:text-gold-dark text-[12px] tracking-[0.12em] uppercase font-sans font-medium cursor-pointer transition-colors"
                  >
                    View {viewMode === 'on-going' ? 'Completed' : 'On-Going'} Projects
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
