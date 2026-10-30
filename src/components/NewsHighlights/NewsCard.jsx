import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';

/* className defaults to the carousel sizing; the News page passes "h-full" for its grid */
const NewsCard = ({ article, index, className = 'snap-start shrink-0 w-[320px] md:w-[360px]' }) => {
  const { pathname } = useLocation();
  return (
  <ScrollReveal delay={index * 0.08} className={className}>
    <Link
      to={`/news/${article.slug}`}
      state={{ from: pathname }}
      className="group flex flex-col h-full bg-white border border-transparent hover:border-gold/10 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
    >
      {/* Image Thumbnail */}
      <div className="relative h-52 md:h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        {/* Gold Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-gold text-white text-[10px] tracking-[0.2em] uppercase font-sans font-semibold shadow-lg shadow-gold/20">
            {article.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-8">
        {/* Date */}
        <div className="flex items-center gap-2 text-warm-gray/70 text-xs mb-3">
          <Calendar size={12} />
          <span>{article.date}</span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-lg md:text-xl uppercase tracking-wide text-dark mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-warm-gray text-sm leading-relaxed line-clamp-3 mb-6">
          {article.excerpt}
        </p>

        {/* Read more — pinned to the bottom so it lines up across cards */}
        <span className="mt-auto inline-flex items-center gap-2 text-gold text-[12px] tracking-[0.18em] uppercase font-sans font-semibold group-hover:gap-3 transition-all duration-300">
          Read More <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  </ScrollReveal>
  );
};

export default NewsCard;
