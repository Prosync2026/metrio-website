import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import JobCard from './JobCard';
import { openings } from '../../data/careers';

const CareersPreview = () => (
  <section id="careers" className="py-28 md:py-36 bg-linen">
    <div className="container-metrio">
      <ScrollReveal className="text-center mb-14 md:mb-20">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
          <span className="text-gold">Join</span>{' '}
          <span className="text-dark">Our Team</span>
        </h2>
        <p className="text-warm-gray text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
          Be part of a dynamic team shaping Malaysia's landscape across property, construction, retail, and technology.
        </p>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto space-y-4">
        {openings.slice(0, 3).map((job, i) => (
          <JobCard key={job.title} job={job} index={i} />
        ))}
      </div>

      {openings.length > 3 && (
        <ScrollReveal delay={0.3} className="text-center mt-12">
          <Link
            to="/careers"
            className="btn-primary group"
          >
            View All Openings
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      )}
    </div>
  </section>
);

export default CareersPreview;

