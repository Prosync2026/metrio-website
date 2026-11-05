import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import { articles } from '../data/news';
import useBackLink from '../utils/useBackLink';
import useSeo from '../utils/useSeo';

const NewsDetail = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  /* Back to wherever the article was opened from (home or News page) */
  const back = useBackLink({ '/': 'Back to Home', '/news': 'Back to News', default: 'Back to Home' });

  useSeo({
    title: article && (article.metaTitle || `${article.title} | Metrio Group`),
    description: article && (article.metaDescription || article.excerpt),
    image: article?.image,
  });

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gold text-[12px] tracking-[0.25em] uppercase font-sans font-medium mb-5">
          Article Not Found
        </p>
        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-dark mb-6">
          This story has moved on
        </h1>
        <p className="text-warm-gray text-base md:text-lg leading-relaxed max-w-md mb-10">
          The article you are looking for is no longer available. Browse our latest
          updates instead.
        </p>
        <Link
          to="/#media"
          onClick={back.onClick}
          className="inline-flex items-center gap-2 px-8 py-4 text-[13px] tracking-[0.18em] uppercase font-sans font-medium
            text-dark/60 hover:text-dark border border-black/10 hover:border-black/20 transition-all duration-300 rounded-sm"
        >
          <ArrowLeft size={14} />
          {back.label}
        </Link>
      </div>
    );
  }

  /* Split the body on blank lines so paragraphs get real spacing */
  const paragraphs = article.content.split(/\n\s*\n/).filter(Boolean);
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${article.image})` }}
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
              to="/#media"
              onClick={back.onClick}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12px] tracking-[0.15em] uppercase font-sans font-semibold transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              {back.label}
            </Link>

            {/* Category · Date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <p className="text-gold-light text-[13px] md:text-sm tracking-[0.25em] uppercase font-sans font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                {article.category}
              </p>
              <span className="text-white/30">·</span>
              <p className="inline-flex items-center gap-2 text-white/70 text-[12px] tracking-[0.15em] uppercase font-sans font-medium">
                <Calendar size={12} />
                {article.date}
              </p>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5 max-w-4xl">
              {article.title}
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              {article.excerpt}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Article Body ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-metrio max-w-4xl">
          <ScrollReveal>
            <p className="text-gold text-[12px] tracking-[0.25em] uppercase font-sans font-medium mb-6">
              The Story
            </p>
            <div className="text-warm-gray text-base md:text-lg leading-[1.9]">
              {paragraphs.map((para, i) => (
                <p key={i} className="mb-7 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Related News ─── */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-linen">
          <div className="container-metrio">
            <ScrollReveal className="text-center mb-16 md:mb-20">
              <p className="text-[12px] tracking-[0.25em] uppercase text-warm-gray font-sans font-medium mb-5">
                Keep Reading
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
                <span className="text-gold">More</span>{' '}
                <span className="text-dark">Updates</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((item, i) => (
                <ScrollReveal key={item.slug} delay={i * 0.08}>
                  <Link
                    to={`/news/${item.slug}`}
                    className="group flex flex-col h-full bg-white border border-transparent hover:border-gold/10 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-gold text-white text-[10px] tracking-[0.2em] uppercase font-sans font-semibold shadow-lg shadow-gold/20">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-8">
                      <div className="flex items-center gap-2 text-warm-gray/70 text-xs mb-3">
                        <Calendar size={12} />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-display text-lg md:text-xl uppercase tracking-wide text-dark mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-warm-gray text-sm leading-relaxed line-clamp-3 mb-6">
                        {item.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 text-gold text-[12px] tracking-[0.18em] uppercase font-sans font-semibold group-hover:gap-3 transition-all duration-300">
                        Read More <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-metrio max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-dark mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-10">
              From property development to digital construction, Metrio Group is ready
              to partner on your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact-us"
                className="group btn-primary"
              >
                Contact Us
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/#media"
                onClick={back.onClick}
                className="btn-secondary"
              >
                <ArrowLeft size={14} />
                {back.label}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Footer attribution ─── */}
      <div className="bg-linen py-6 text-center">
        <p className="text-warm-gray/50 text-[11px] tracking-[0.2em] uppercase font-sans">
          Metrio Group · www.metrio.com.my
        </p>
      </div>
    </div>
  );
};

export default NewsDetail;
