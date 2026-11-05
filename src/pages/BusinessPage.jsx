import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import { businesses } from '../data/businesses';
import useBackLink from '../utils/useBackLink';
import useSeo from '../utils/useSeo';

const BusinessPage = () => {
  const { slug } = useParams();
  const biz = businesses.find((b) => b.slug === slug);
  /* Back to wherever the business was opened from (home grid or About Us) */
  const back = useBackLink({ '/': 'Back to Home', '/about-us': 'Back to About Us', default: 'Back to Home' });

  /* Scrolling is handled by ScrollManager in App */
  useSeo({ title: biz?.seo.title, description: biz?.seo.description, image: biz?.image });

  if (!biz) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${biz.image})` }}
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
              to="/#businesses"
              onClick={back.onClick}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[12px] tracking-[0.15em] uppercase font-sans font-semibold transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              {back.label}
            </Link>

            {/* Subsidiary label */}
            <p className="text-gold-light text-[13px] md:text-sm tracking-[0.25em] uppercase font-sans font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] mb-4">
              {biz.subsidiary} · A Metrio Group Company
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5">
              {biz.name}
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              {biz.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Description / Who We Are ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className={`container-metrio ${biz.logo ? 'max-w-6xl' : 'max-w-4xl'}`}>
          {/* Logo on the left, copy on the right (stacks on mobile) */}
          <ScrollReveal className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
            {/* Subsidiary logo (if provided) — logoClass sets a per-logo height */}
            {biz.logo && (
              <div className="shrink-0 md:w-1/3 flex md:justify-center">
                <img
                  src={biz.logo}
                  alt={`${biz.subsidiary} logo`}
                  className={`${biz.logoClass || 'h-16'} w-auto max-w-full object-contain`}
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-gold text-[12px] tracking-[0.25em] uppercase font-sans font-medium mb-6">
                Who We Are
              </p>
              <p className="text-warm-gray text-base md:text-lg leading-[1.9] whitespace-pre-line">
                {biz.whoWeAre}
              </p>
            </div>
          </ScrollReveal>

          {/* Feature image after Who We Are (if provided) */}
          {biz.whoWeAreImage && (
            <ScrollReveal delay={0.15}>
              <div className="mt-12 md:mt-16">
                <div className="overflow-hidden rounded-sm shadow-lg">
                  <img
                    src={biz.whoWeAreImage}
                    alt={biz.whoWeAreCaption || biz.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {biz.whoWeAreCaption && (
                  <p className="mt-4 text-warm-gray/70 text-sm md:text-base text-center italic leading-relaxed">
                    {biz.whoWeAreCaption}
                  </p>
                )}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-[12px] tracking-[0.25em] uppercase text-warm-gray font-sans font-medium mb-5">
              What We Do
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-tight">
              <span className="text-gold">{(biz.servicesLabel || 'Our Focus').split(' ')[0]}</span>{' '}
              <span className="text-slate-900">{(biz.servicesLabel || 'Our Focus').split(' ').slice(1).join(' ')}</span>
            </h2>
          </ScrollReveal>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              biz.services.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-6`}
          >
            {biz.services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08} className="h-full">
                <article
                  className="group flex h-full flex-col bg-white rounded-3xl p-4
                    border border-slate-100 shadow-sm
                    hover:shadow-lg hover:shadow-slate-900/5 transition-shadow duration-500"
                >
                  {/* Top featured image block */}
                  <div className="h-48 w-full rounded-2xl overflow-hidden relative">
                    <img
                      /* Falls back to the business hero image if a service has no image of its own */
                      src={service.image || biz.image}
                      alt={service.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                        transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-2 pb-2">
                    <h3 className="text-base lg:text-lg font-bold text-slate-900 mt-4 mb-2">
                      {service.title}
                    </h3>
                    <div className="border-b border-slate-100 pb-2 mb-3" />
                    <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured project · album + website overview ─── */}
      {biz.featuredProject && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container-metrio">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Album — second on mobile so the overview leads */}
              <ScrollReveal direction="right" className="order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {biz.featuredProject.album.map((img, i) => {
                    /* An odd count gets a full-width lead image so the rest still tile evenly */
                    const lead = biz.featuredProject.album.length % 2 === 1 && i === 0;
                    return (
                      <div
                        key={img.src}
                        className={`group relative overflow-hidden rounded-2xl ${
                          lead ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover
                            transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Website overview */}
              <div className="order-1 lg:order-2">
                <div className="lg:sticky lg:top-32">
                  <ScrollReveal direction="left">
                <p className="text-[12px] tracking-[0.25em] uppercase text-warm-gray font-sans font-medium mb-5">
                  Featured Development
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light uppercase tracking-tight text-dark mb-4">
                  {biz.featuredProject.name}
                </h2>
                <p className="text-gold text-base md:text-lg italic font-light mb-6">
                  {biz.featuredProject.tagline}
                </p>
                <p className="text-warm-gray text-base leading-relaxed mb-8">
                  {biz.featuredProject.overview}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-10">
                  {biz.featuredProject.facts.map((fact) => (
                    <div key={fact.label} className="border-t border-black/10 pt-3">
                      <dt className="text-[11px] tracking-[0.18em] uppercase text-warm-gray/70 font-sans font-medium mb-1">
                        {fact.label}
                      </dt>
                      <dd className="text-dark text-sm font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={biz.featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn-primary"
                >
                  {biz.featuredProject.ctaLabel}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Advantages (if any) ─── */}
      {biz.advantages.items.length > 0 && (
        <section className="relative py-20 md:py-28 overflow-hidden bg-linen">
          {/* Optional photo backdrop, washed back with the same cream at 90%
             that the homepage News Highlights section uses, so the type stays
             dark and the white cards keep their contrast. */}
          {biz.advantagesImage && (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${biz.advantagesImage})` }}
              />
              <div className="absolute inset-0 bg-linen/90" />
            </>
          )}

          <div className="container-metrio relative z-10">
            <ScrollReveal className="text-center mb-16 md:mb-20">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-6 text-dark">
                {biz.advantages.title}
              </h2>
              <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-warm-gray">
                {biz.advantages.description}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
              {biz.advantages.items.map((item, i) => (
                /* h-full on the wrapper too — ScrollReveal is the actual grid item */
                <ScrollReveal key={item.title} delay={i * 0.06} className="h-full">
                  <div className="h-full flex flex-col justify-between p-6 bg-white rounded-sm border border-black/5 hover:border-gold/20 hover:shadow-md hover:shadow-gold/5 transition-all duration-300">
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 size={20} className="text-forest shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h4 className="font-display text-base uppercase tracking-wide mb-2 text-dark">{item.title}</h4>
                        <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Advantages with no items — simple CTA-style banner ─── */}
      {biz.advantages.items.length === 0 && biz.advantages.description && (
        <section className="py-20 md:py-28 bg-linen">
          <div className="container-metrio max-w-3xl text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-6 text-dark">
                {biz.advantages.title}
              </h2>
              <p className="text-warm-gray text-base md:text-lg leading-relaxed">
                {biz.advantages.description}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-metrio max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-dark mb-6">
              {biz.cta.title}
            </h2>
            <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-10">
              {biz.cta.text}
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
                to="/#businesses"
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
    </div>
  );
};

export default BusinessPage;
