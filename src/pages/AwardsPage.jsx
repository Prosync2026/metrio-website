import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Trophy, Star } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import { asset } from '../utils/asset';

/* 📌 Placeholder award items — content to be populated by Allison */
const placeholderAwards = [
  { title: 'Award Placeholder 1', year: '—', category: 'Recognition', icon: Award },
  { title: 'Award Placeholder 2', year: '—', category: 'Certification', icon: Trophy },
  { title: 'Award Placeholder 3', year: '—', category: 'Achievement', icon: Star },
  { title: 'Award Placeholder 4', year: '—', category: 'Recognition', icon: Award },
  { title: 'Award Placeholder 5', year: '—', category: 'Certification', icon: Trophy },
  { title: 'Award Placeholder 6', year: '—', category: 'Achievement', icon: Star },
];

const AwardsPage = () => {
  /* SEO meta */
  useEffect(() => {
    document.title = 'Achievements | Metrio Group';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Metrio Group's track record of industry recognition, certifications and achievements across property, construction and innovation."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${asset('/images/hero/slide-2.png')})` }}
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/30" />

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
              <ArrowLeft size={14} />
              Back to Home
            </Link>

            <p className="text-gold-light text-[13px] md:text-sm tracking-[0.25em] uppercase font-sans font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] mb-4">
              Metrio Group · Recognition
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5">
              Achievements
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              Our track record of industry recognition, certifications and achievements across
              property, construction and innovation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Awards Grid (Placeholder) ─── */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-5">
              Excellence Recognised
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
              <span className="text-gold">Awards</span>{' '}
              <span className="text-dark">& Recognition</span>
            </h2>
          </ScrollReveal>

          {/* 📌 Placeholder grid — designer to create award card layout, Allison to populate content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {placeholderAwards.map((award, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-white p-8 md:p-10 text-center h-full border border-transparent hover:border-gold/10 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 group">
                  <award.icon
                    size={36}
                    className="text-gold/30 mx-auto mb-6 group-hover:text-gold/60 transition-colors"
                    strokeWidth={1.5}
                  />
                  <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium mb-3">
                    {award.category} · {award.year}
                  </p>
                  <h3 className="font-display text-lg uppercase tracking-wide text-dark/40 mb-2">
                    {award.title}
                  </h3>
                  <p className="text-warm-gray/40 text-sm italic">Content to be added</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;
