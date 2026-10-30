import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

const stats = [
  { category: 'Experience', prefix: '', target: 30, suffix: '', label: 'Years of Excellence' },
  { category: 'Delivery', prefix: '', target: 5000, suffix: '', label: 'Units Delivered' },
  { category: 'Portfolio', prefix: 'RM ', target: 2, suffix: 'B', label: 'Gross Development Value' },
  { category: 'Workforce', prefix: '', target: 1500, suffix: '', label: 'Team Members' },
];

/* Counts 0 → target once the card scrolls into view (easeOutCubic). */
const useCountUp = (target, active, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    /* Reduced motion still lands on the final figure — it just skips the ramp. */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = reduced ? 1 : Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
};

const StatCard = ({ stat, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(stat.target, isInView);

  return (
    <ScrollReveal delay={delay} className="h-full">
      <div
        ref={ref}
        className="flex h-full flex-col justify-between rounded-2xl bg-white p-5 md:p-7 lg:p-8
          transition-colors duration-300 hover:bg-cream-dark"
      >
        <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-gray">
          {stat.category}
        </p>

        <div className="mt-6 border-t border-dark/10 pt-5 md:pt-6">
          <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none tracking-tight text-dark">
            {stat.prefix}
            {count.toLocaleString('en-US')}
            {stat.suffix}
            <span className="text-gold">+</span>
          </div>
          <p className="mt-3 text-xs md:text-sm leading-snug text-warm-gray">{stat.label}</p>
        </div>
      </div>
    </ScrollReveal>
  );
};

const StatsBar = () => (
  <section className="bg-linen pt-20 md:pt-28">
    <div className="container-metrio">
      {/* 2x2 on phones and tablets, a single row of four from lg up */}
      <div className="grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.category} stat={stat} delay={index * 0.1} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
