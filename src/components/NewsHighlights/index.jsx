import { useState, useRef } from 'react';
import NewsSidebar from './NewsSidebar';
import NewsCard from './NewsCard';
import { articles } from '../../data/news';
import { asset } from '../../utils/asset';

const BACKGROUND_IMAGE = asset('/images/hero/news-bg.jpg');

const NewsHighlights = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (dir) => {
    if (!scrollRef.current) return;
    const next = dir === 'left' ? Math.max(0, activeIndex - 1) : Math.min(articles.length - 1, activeIndex + 1);
    setActiveIndex(next);
    const cards = scrollRef.current.children;
    if (cards[next]) cards[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <section id="media" className="relative py-20 md:py-28 overflow-hidden bg-linen">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      />
      {/* Cream wash — the headline, body copy and cards are all dark-on-light,
         so the photo has to sit well back or it competes with them. */}
      <div className="absolute inset-0 bg-linen/90" />

      <div className="container-metrio relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — Sticky Title Column */}
          <NewsSidebar
            activeIndex={activeIndex}
            totalCount={articles.length}
            onNavigate={scrollTo}
          />

          {/* Right — Scrollable News Cards Grid */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            >
              {articles.map((article, i) => (
                <NewsCard key={article.title} article={article} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHighlights;
