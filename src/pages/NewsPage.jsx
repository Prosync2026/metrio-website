import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import NewsCard from '../components/NewsHighlights/NewsCard';
import { articles } from '../data/news';
import { asset } from '../utils/asset';
import useSeo from '../utils/useSeo';

const NewsPage = () => {
  useSeo({
    title: 'News | Metrio Group',
    description: 'The latest news and updates from across Metrio Group — property development, construction, retail and digital innovation.',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${asset('/images/hero/news-bg.jpg')})` }}
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
              Metrio Group · Stay Informed
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5">
              News
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              The latest updates from across our businesses, projects, and community initiatives.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── All Articles ─── */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-[12px] tracking-[0.25em] uppercase text-warm-gray font-sans font-medium mb-5">
              Latest Updates
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight">
              <span className="text-gold">All</span>{' '}
              <span className="text-dark">News</span>
            </h2>
          </ScrollReveal>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {articles.map((article, i) => (
                <NewsCard key={article.slug} article={article} index={i} className="h-full" />
              ))}
            </div>
          ) : (
            <p className="text-center text-warm-gray text-lg">No news articles yet.</p>
          )}
        </div>
      </section>

      {/* ─── Footer nav ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-metrio">
          <ScrollReveal className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-secondary">
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
