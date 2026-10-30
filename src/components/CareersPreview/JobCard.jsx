import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const JobCard = ({ job, index }) => (
  <ScrollReveal delay={index * 0.08}>
    <div className="group bg-white hover:shadow-md p-7 md:p-8 border border-transparent hover:border-gold/15 transition-all cursor-pointer">
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
    </div>
  </ScrollReveal>
);

export default JobCard;
