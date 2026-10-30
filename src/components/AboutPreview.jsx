import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ui/ScrollReveal';

const AboutPreview = () => {
  return (
    <section id="about" className="bg-white relative overflow-hidden">
      {/* ─── Story Section ─── */}
      <div className="py-20 md:py-28">
        <div className="container-metrio flex flex-col items-center">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-6">
              Established since 1993
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-10">
              <span className="text-gold">About</span>{' '}
              <span className="text-dark">Metrio Group</span>
            </h2>
            <p className="text-gold text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed italic font-light mb-8">
              Three Decades of Delivery. One Standard Throughout.
            </p>
          </ScrollReveal>

          <ScrollReveal className="max-w-4xl mx-auto text-center relative">
            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-dark mb-8">
              From Contractor to Group
            </h3>
            <p className="text-warm-gray text-base md:text-lg leading-[1.9] mb-6">
              Metrio Group is a Malaysian construction and property group with five core businesses — Property Development, Retail Management, Construction Engineering, Aluminium Formwork System and Digital Construction Solution.
            </p>
            <div className="relative">
              <p className="text-warm-gray text-base md:text-lg leading-[1.9]">
                Founded in 1993 by Mr Chuah Chew Hai, Metrio Group began as a construction contractor in Northern Malaysia — built on craftsmanship, discipline and an uncompromising standard of work. Over three decades, that foundation grew into something larger...
              </p>
              {/* Fade-out gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="mt-8">
              <Link
                to="/about-us"
                className="group btn-primary"
              >
                Read More
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
