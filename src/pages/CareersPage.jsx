import { Briefcase, MapPin, Clock, ArrowRight, Search } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import ApplyDialog from '../components/Careers/ApplyDialog';
import { openings } from '../data/careers';
import { asset } from '../utils/asset';
import useSeo from '../utils/useSeo';

const JobCard = ({ job, index, onApply }) => (
  <ScrollReveal delay={index * 0.06}>
    <button
      type="button"
      onClick={() => onApply(job)}
      aria-label={`Apply for ${job.title}`}
      className="group block w-full text-left bg-white hover:shadow-md p-7 md:p-8 border border-transparent hover:border-gold/15 transition-all cursor-pointer focus-visible:outline-none focus-visible:border-gold/40"
    >
      <div className="flex items-center justify-between gap-6">
        <div>
          <h4 className="font-display text-lg md:text-xl text-dark mb-3 group-hover:text-forest transition-colors">
            {job.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-warm-gray">
            <span className="flex items-center gap-2">
              <Briefcase size={14} className="text-gold" />{job.dept}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-gold" />{job.location}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-gold" />{job.type}
            </span>
          </div>
        </div>
        <div className="shrink-0 w-12 h-12 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold transition-all">
          <ArrowRight size={18} className="text-warm-gray group-hover:text-white transition-colors" />
        </div>
      </div>
    </button>
  </ScrollReveal>
);

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [applyingFor, setApplyingFor] = useState(null);
  const closeApply = useCallback(() => setApplyingFor(null), []);

  useSeo({
    title: 'Careers | Metrio Group',
    description:
      'Join Metrio Group. Explore open positions across property development, construction, retail and digital construction in Penang and the Klang Valley.',
  });

  const filteredOpenings = openings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* ─── Hero Header (same pattern as BusinessPage) ─── */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${asset('/images/hero/careers-header.jpg')})` }}
        />

        {/* Top gradient: white → transparent so navbar stays readable */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 to-transparent z-[1]" />

        {/* Dark overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/30" />



        {/* Content */}
        <div className="relative z-10 container-metrio pt-44 pb-32 md:pt-48 md:pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12px] tracking-[0.15em] uppercase font-sans font-semibold transition-colors mb-8"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to Home
            </Link>

            {/* Label */}
            <p className="text-gold-light text-[13px] md:text-sm tracking-[0.25em] uppercase font-sans font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] mb-4">
              Metrio Group · We're Hiring
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5">
              Career Opportunities
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              Join our growing team and build a meaningful career across property, construction, retail, and technology.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Job Listings */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-metrio">
          {/* Search & Count */}
          <ScrollReveal className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-warm-gray text-sm tracking-[0.1em] uppercase">
                <span className="text-dark font-bold">{filteredOpenings.length}</span>{' '}
                {filteredOpenings.length === 1 ? 'position' : 'positions'} available
              </p>
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray/60" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-black/5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold/30 transition-colors"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Listings */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredOpenings.length > 0 ? (
              filteredOpenings.map((job, i) => (
                <JobCard key={job.title} job={job} index={i} onApply={setApplyingFor} />
              ))
            ) : (
              <ScrollReveal className="text-center py-16">
                <p className="text-warm-gray text-lg">No positions match your search.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-sm text-gold hover:text-forest tracking-[0.1em] uppercase transition-colors"
                >
                  Clear search
                </button>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      <ApplyDialog job={applyingFor} onClose={closeApply} />
    </>
  );
};

export default CareersPage;
