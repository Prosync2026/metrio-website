import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Home, Store, HardHat, Layers, Cpu } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import ValuesSection from '../components/ValuesSection';
import { asset } from '../utils/asset';

/* ─── Anchor definitions for sticky sub-nav ─── */
const anchors = [
  { id: 'who-are-we', label: 'Who Are We' },
  { id: 'our-foundation', label: 'Our Foundation' },
  { id: 'our-values', label: 'Our Values' },
  { id: 'corporate-structure', label: 'Corporate Structure' },

];

/* ─── Our Foundation · Purpose / Vision / Mission ─── */
const foundation = [
  {
    number: '01',
    title: 'Our Purpose',
    body: 'To be a business that matters — serving as a force for good, enriching the lives of our employees, their families and the communities we build for.',
    image: asset('/images/projects/residency-cendana.jpg'),
    imageAlt: 'A completed Metrio Group home at dusk',
  },
  {
    number: '02',
    title: 'Our Vision',
    body: "To be Malaysia's most trusted and preferred development business partner, excelling in project quality and exceeding client expectations through advanced digitalization.",
    image: asset('/images/businesses/bim-landscape.jpg'),
    imageAlt: 'Digital building information model of a development',
  },
  {
    number: '03',
    title: 'Our Mission',
    bullets: [
      'Deliver exceptional quality of works to all stakeholders.',
      'Create new value solutions through digitalization.',
      'Cultivate our ASAS values throughout the organisation.',
    ],
    image: asset('/images/synergy.jpg'),
    imageAlt: 'Metrio Group site team working together on a structural pour',
  },
];

/* ─── Corporate Structure divisions ─── */
const divisions = [
  { name: 'Property Development', subsidiary: 'Metrio Development', slug: 'property-development', icon: Home },
  { name: 'Retail Management', subsidiary: 'MetrioPlace', slug: 'retail-management', icon: Store },
  { name: 'Construction Engineering', subsidiary: 'Alunan Asas', slug: 'construction-engineering', icon: HardHat },
  { name: 'Aluminium Formwork System', subsidiary: 'Myform', slug: 'aluminium-formwork-system', icon: Layers },
  { name: 'Digital Construction Solution', subsidiary: 'Prosync', slug: 'digital-construction', icon: Cpu },
];

/* ─── Sticky Sub-Nav ─── */
const SubNav = ({ activeAnchor }) => {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky top-[96px] z-30 bg-white/95 backdrop-blur-sm border-b border-black/5 hidden lg:block">
      <div className="container-metrio">
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
          {anchors.map((a) => (
            <button
              key={a.id}
              onClick={() => handleClick(a.id)}
              className={`px-5 py-4 text-[11px] tracking-[0.15em] uppercase font-sans font-medium whitespace-nowrap
                transition-all duration-300 border-b-2 cursor-pointer ${
                activeAnchor === a.id
                  ? 'text-forest border-gold'
                  : 'text-dark/40 border-transparent hover:text-dark/70 hover:border-gold/30'
              }`}
            >
              {a.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const AboutUsPage = () => {
  const [activeAnchor, setActiveAnchor] = useState(anchors[0].id);

  /* SEO meta */
  useEffect(() => {
    document.title = 'About Us | Metrio Group';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Learn about Metrio Group's story, foundation, values and corporate structure — a Malaysian construction and property group built on three decades of delivery."
      );
    }
  }, []);

  /* Intersection Observer for active anchor tracking */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    anchors.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${asset('/images/hero/vortex-bp-hero.jpg')})` }}
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
              Established since 1993
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5">
              About Metrio Group
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              Three Decades of Delivery. One Standard Throughout.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Sticky Sub-Nav ─── */}
      <SubNav activeAnchor={activeAnchor} />

      {/* ═══════════════════════════════════════════
          ANCHOR 1 — Who Are We
      ═══════════════════════════════════════════ */}
      <section id="who-are-we" className="py-20 md:py-28 bg-white scroll-mt-36">
        <div className="container-metrio max-w-4xl">
          <ScrollReveal>
            <p className="text-gold text-[12px] tracking-[0.25em] uppercase font-sans font-medium mb-6">
              Who Are We
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-10">
              <span className="text-gold">Thirty Years</span>{' '}
              <span className="text-dark">in the Making</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-warm-gray text-base md:text-lg leading-[1.9]">
              <p>
                Founded in 1993 by Mr Chuah Chew Hai, Metrio Group began as a construction contractor
                in Northern Malaysia — built on craftsmanship, discipline and an uncompromising standard
                of work. Over three decades, that foundation grew into something larger: a fully
                integrated group that develops, builds, manages and innovates across the property and
                construction industry.
              </p>
              <p>
                Today, Metrio Group is more than a contractor. We are a developer, an operator, a
                builder and a technology partner — and we are growing towards our vision of becoming
                Malaysia's most trusted and preferred development business partner, excelling in
                quality and advancing through digitalization.
              </p>
              <p>
                From landed homes and retail destinations to high-rise construction, digital systems
                and formwork solutions — three decades on from where we started, the businesses have
                grown, but the standard that built this group has not: deliver it well, or don't
                deliver it at all.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANCHOR 2 — Our Foundation
      ═══════════════════════════════════════════ */}
      <section id="our-foundation" className="py-20 md:py-28 bg-linen scroll-mt-36">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-5">
              What Drives Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
              <span className="text-gold">Our</span>{' '}
              <span className="text-dark">Foundation</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {foundation.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08} className="h-full">
                <article
                  className="group relative flex h-full min-h-[420px] lg:min-h-[460px] flex-col
                    overflow-hidden rounded-3xl shadow-lg shadow-dark/5
                    transition-shadow duration-500 hover:shadow-xl hover:shadow-dark/15"
                >
                  {/* Full-cover background photo */}
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover
                      transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark gradient keeps the copy legible over any photograph */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b
                      from-slate-950/80 via-slate-950/60 to-slate-950/90"
                  />

                  {/* Content sits above the image + overlay */}
                  <div className="relative z-10 flex flex-1 flex-col p-7 md:p-8">
                    {/* Number indicator + thin rule */}
                    <p className="font-display text-3xl md:text-4xl font-semibold leading-none tracking-tight text-white">
                      {item.number}
                      <span className="text-gold-light">.</span>
                    </p>
                    <div className="mt-5 border-t border-white/20" />

                    <div className="pt-6">
                      <h3 className="font-display text-lg uppercase tracking-wide text-white mb-4">
                        {item.title}
                      </h3>

                      {item.bullets ? (
                        <ul className="text-slate-200 text-sm leading-relaxed space-y-3">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2 items-start">
                              <span className="text-gold-light mt-1">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-200 text-sm leading-relaxed">{item.body}</p>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANCHOR 3 — Our Values (ASAS)
      ═══════════════════════════════════════════ */}
      <section id="our-values" className="py-20 md:py-28 bg-white scroll-mt-36">
        <div className="container-metrio">
          <ValuesSection />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ANCHOR 4 — Corporate Structure
      ═══════════════════════════════════════════ */}
      <section id="corporate-structure" className="py-20 md:py-28 bg-linen scroll-mt-36">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-5">
              How We're Organised
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
              <span className="text-gold">Corporate</span>{' '}
              <span className="text-dark">Structure</span>
            </h2>
          </ScrollReveal>

          {/* Org chart visual */}
          <div className="max-w-5xl mx-auto">
            {/* Parent: Metrio Group */}
            <ScrollReveal>
              <div className="bg-dark text-white p-8 md:p-10 text-center rounded-3xl shadow-lg shadow-dark/15">
                <Building2 size={32} className="text-gold mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight mb-2">
                  Metrio Group
                </h3>
                <p className="text-white/50 text-sm tracking-[0.15em] uppercase">
                  Parent Company
                </p>
              </div>
            </ScrollReveal>

            {/* Drop from the parent card down to the spine.
               Desktop drops from the centre; below lg it drops into the left
               spine instead, since the cards stack rather than spread out. */}
            <div className="relative h-10">
              <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gold/40" />
              <div className="lg:hidden absolute top-0 left-4 w-px h-full bg-gold/40" />
            </div>

            {/* Spine + a drop into each card, on the same grid as the cards */}
            <div className="hidden lg:grid grid-cols-5 gap-4">
              {divisions.map((div, i) => (
                <div key={div.slug} className="relative h-10">
                  {i !== 0 && (
                    <div className="absolute top-0 -left-2 right-1/2 h-px bg-gold/35" />
                  )}
                  {i !== divisions.length - 1 && (
                    <div className="absolute top-0 left-1/2 -right-2 h-px bg-gold/35" />
                  )}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gold/35" />
                </div>
              ))}
            </div>

            {/* Division cards */}
            <div className="relative">
              {/* Left spine — carries the hierarchy where the cards stack */}
              <div className="lg:hidden absolute left-4 top-0 bottom-0 w-px bg-gold/30" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 pl-12 lg:pl-0">
              {divisions.map((div, i) => {
                const Icon = div.icon;
                return (
                <ScrollReveal key={div.slug} delay={i * 0.06} className="h-full">
                  <div className="relative bg-white p-6 md:p-8 text-center h-full flex flex-col rounded-2xl border border-black/5 shadow-sm hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 group">
                    {/* Branch from the left spine into this card, below lg */}
                    <div className="lg:hidden absolute top-1/2 -left-8 w-8 h-px bg-gold/30" />
                    {/* Division mark — gives the five cards something to tell them apart at a glance */}
                    <div className="flex justify-center mb-4">
                      <span
                        className="w-11 h-11 rounded-full bg-gold/10 text-gold flex items-center justify-center
                          group-hover:bg-gold group-hover:text-white transition-colors duration-300"
                      >
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                    </div>
                    <h4 className="font-display text-sm md:text-base uppercase tracking-wide text-dark mb-2 leading-tight">
                      {div.name}
                    </h4>
                    <p className="text-gold text-[11px] tracking-[0.15em] uppercase font-sans font-medium mb-5">
                      {div.subsidiary}
                    </p>
                    {/* mt-auto pins this to the card floor so all five align */}
                    <Link
                      to={`/businesses/${div.slug}`}
                      state={{ from: '/about-us' }}
                      className="self-center mt-auto text-[11px] tracking-[0.12em] uppercase font-sans font-medium
                        border border-black/10 rounded-lg px-4 py-2 hover:border-gold/30 hover:text-gold
                        transition-all duration-300 cursor-pointer"
                    >
                      View More
                    </Link>
                  </div>
                </ScrollReveal>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </section>

      
          </div>
  );
};

export default AboutUsPage;
