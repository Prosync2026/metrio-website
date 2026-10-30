import { ShieldCheck, Leaf, RefreshCw, Handshake } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

/* ─── ASAS Values ─── */
const values = [
  {
    letter: 'A',
    title: 'Accountability',
    icon: ShieldCheck,
    modifier: 'card-accountability',
    desc: 'We take full ownership of our projects from initial planning to final delivery. Our rigorous quality control and site verification ensure precision and reliability at every stage.',
  },
  {
    letter: 'S',
    title: 'Sustainability',
    icon: Leaf,
    modifier: 'card-sustainability',
    desc: 'We are committed to eco-friendly building practices and biophilic architecture. Our solutions prioritize energy efficiency, green materials, and long-term environmental stewardship.',
  },
  {
    letter: 'A',
    title: 'Adaptability',
    icon: RefreshCw,
    modifier: 'card-adaptability',
    desc: 'We embrace dynamic structural frameworks and modular design principles. Our approaches quickly pivot to meet evolving site conditions, client needs, and structural demands.',
  },
  {
    letter: 'S',
    title: 'Synergy',
    icon: Handshake,
    modifier: 'card-synergy',
    desc: 'We foster cross-functional collaboration across engineering and construction teams. By aligning expertise and shared goals, we deliver high-performance project outcomes.',
  },
];

/* Section heading + split-panel accordion — styles live in src/index.css (.values-accordion) */
const ValuesSection = () => (
  <>
    <ScrollReveal className="text-center mb-16 md:mb-20">
      <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-5">How We Work</p>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
        <span className="text-gold">Our Values</span>{' '}
        <span className="text-dark">— ASAS</span>
      </h2>
      <p className="text-warm-gray text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        Everything we do is guided by four core values that define how we work, how we lead and how
        we grow.
      </p>
    </ScrollReveal>

    <ScrollReveal delay={0.1}>
      <div className="values-accordion">
        {values.map((v) => (
          <div key={v.title} className={`value-card ${v.modifier}`} tabIndex={0}>
            <div className="value-card-strip">
              <v.icon size={30} strokeWidth={1.5} className="value-card-icon" />
              <span className="value-card-strip-title" aria-hidden="true">
                {v.title}
              </span>
            </div>

            <div className="value-card-panel">
              <div className="value-card-panel-inner">
                <p className="value-card-tag">Our Values</p>
                <h3>{v.title}</h3>
                <p className="value-card-desc">{v.desc}</p>
                <span className="value-card-watermark" aria-hidden="true">
                  {v.letter}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  </>
);

export default ValuesSection;
