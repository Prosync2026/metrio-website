import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

const NewsSidebar = ({ activeIndex, totalCount, onNavigate }) => (
  <div className="lg:col-span-4">
    <div className="lg:sticky lg:top-36">
      <ScrollReveal>
        <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-6">
          Stay informed
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
          <span className="text-gold">News</span><br />
          <span className="text-dark">Highlights</span>
        </h2>
        <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-10 max-w-sm">
          The latest updates from across our businesses, projects, and community initiatives.
        </p>

        {/* Circular Navigation Arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('left')}
            disabled={activeIndex === 0}
            className="w-14 h-14 rounded-full border-2 border-dark/10 flex items-center justify-center text-dark/60 hover:border-gold hover:bg-gold hover:text-white disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-dark/60 disabled:hover:border-dark/10 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => onNavigate('right')}
            disabled={activeIndex >= totalCount - 1}
            className="w-14 h-14 rounded-full border-2 border-dark/10 flex items-center justify-center text-dark/60 hover:border-gold hover:bg-gold hover:text-white disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-dark/60 disabled:hover:border-dark/10 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
          {/* Index indicator */}
          <span className="text-sm text-warm-gray/60 ml-2 tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')}/{String(totalCount).padStart(2, '0')}
          </span>
        </div>

        {/* View all — links through to the full News page */}
        <Link to="/news" className="btn-primary group mt-10">
          View All News
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </ScrollReveal>
    </div>
  </div>
);

export default NewsSidebar;
