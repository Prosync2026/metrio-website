import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, Briefcase, Clock, Building2 } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';
import { openings } from '../data/careers';
import klOfficePhoto from '../assets/images/kl-office.jpg';
import { asset } from '../utils/asset';
import useSeo from '../utils/useSeo';

const offices = [
  {
    label: 'Northern Office',
    address: '22A, Jalan Perniagaan Vorteks 3, Pusat Perniagaan Vorteks,\n14100 Simpang Ampat, Penang.',
    phone: '+604-589 9887',
    phoneHref: 'tel:+6045899887',
    image: asset('/images/hero/vortex-bp-hero.jpg'),
  },
  {
    label: 'Central Office',
    address: 'No. 129 & No. 131, Jalan Kenari 23A, Bandar Puchong Jaya,\n47100 Puchong, Selangor Darul Ehsan.',
    phone: '+603-8075 0992',
    phoneHref: 'tel:+60380750992',
    image: klOfficePhoto,
  },
];

const ContactPage = () => {
  useSeo({
    title: 'Contact Us | Metrio Group',
    description: 'Get in touch with Metrio Group — Northern and Central Malaysia offices.',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${asset('/images/hero/contact-hero.jpg')})` }}
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
              Metrio Group · Get in Touch
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] text-white mb-5">
              Contact Us
            </h1>

            <p className="text-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light italic">
              Reach out to our Northern or Central Malaysia offices.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Office Addresses ─── */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-5">
              Our Offices
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
              <span className="text-gold">Find</span>{' '}
              <span className="text-dark">Us</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {offices.map((office, i) => (
              <ScrollReveal key={office.label} delay={i * 0.1}>
                <div className="group bg-white h-full overflow-hidden border border-transparent hover:border-gold/10 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500">
                  {/* Office photo (placeholder until one is provided) */}
                  <div className="aspect-[16/10] overflow-hidden bg-forest-dark/5">
                    {office.image ? (
                      <img
                        src={office.image}
                        alt={`Metrio Group ${office.label}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-forest/30">
                        <Building2 size={48} strokeWidth={1.25} />
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-10">
                    <p className="text-gold text-[11px] tracking-[0.2em] uppercase font-sans font-semibold mb-5">
                      {office.label}
                    </p>
                    <div className="flex items-start gap-3 text-warm-gray text-sm leading-relaxed mb-4">
                      <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                      <span className="whitespace-pre-line">{office.address}</span>
                    </div>
                    <a
                      href={office.phoneHref}
                      className="flex items-center gap-3 text-warm-gray text-sm hover:text-forest transition-colors"
                    >
                      <Phone size={14} className="text-gold" />
                      {office.phone}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Email */}
          <ScrollReveal delay={0.2} className="text-center mt-10">
            <a
              href="mailto:info@metrio.com.my"
              className="inline-flex items-center gap-3 text-warm-gray hover:text-forest transition-colors text-sm"
            >
              <Mail size={16} className="text-gold" />
              info@metrio.com.my
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Careers Section (embedded per user request) ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-metrio">
          <ScrollReveal className="text-center mb-14 md:mb-20">
            <p className="text-sm tracking-[0.25em] uppercase text-warm-gray mb-5">
              We're Hiring
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight mb-6">
              <span className="text-gold">Join</span>{' '}
              <span className="text-dark">Our Team</span>
            </h2>
            <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Be part of a dynamic team shaping Malaysia's landscape across property, construction,
              retail, and technology.
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {openings.slice(0, 3).map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 0.06}>
                <div className="group bg-linen hover:shadow-md p-7 md:p-8 border border-transparent hover:border-gold/15 transition-all">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <h4 className="font-display text-lg md:text-xl text-dark mb-3 group-hover:text-forest transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-warm-gray">
                        <span className="flex items-center gap-2">
                          <Briefcase size={14} className="text-gold" />{job.dept}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin size={14} className="text-gold" />{job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} className="text-gold" />{job.type}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 w-12 h-12 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold transition-all">
                      <ArrowRight size={18} className="text-warm-gray group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {openings.length > 3 && (
            <ScrollReveal delay={0.3} className="text-center mt-12">
              <Link
                to="/careers"
                className="btn-primary group"
              >
                View All Openings
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
