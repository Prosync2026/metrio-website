import ScrollReveal from '../ui/ScrollReveal';
import BusinessCard from './BusinessCard';
import { businesses } from '../../data/businesses';

const BusinessGrid = () => {
  return (
    <section id="businesses" className="py-20 md:py-28 bg-linen">
      <div className="container-metrio">
        {/* Heading */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-6">
            Metrio Group operates across diverse industries
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight">
            <span className="text-gold">Our</span>{' '}
            <span className="text-dark">Businesses</span>
          </h2>
        </ScrollReveal>

        {/* Vertical Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
          {businesses.map((biz, i) => (
            <BusinessCard key={biz.slug} biz={biz} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessGrid;
