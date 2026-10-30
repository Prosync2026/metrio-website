import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { isPopupOpen, onPopupClosed } from '../../utils/popupGate';
import heroClip from '../../assets/videos/hero-clip.mp4';
import heroPoster from '../../assets/images/hero-clip-poster.jpg';

gsap.registerPlugin(useGSAP, SplitText);

/* Background clip: October 2026 brand film, re-cut 2026-10-28 (HQ front,
   site-plan briefing, site crews, design office, aerials of finished homes), cropped to the top 860px of the 1080p source to
   drop the burned-in trilingual subtitles, audio stripped. Its short
   dip-to-black transitions are part of the edit. The poster is its first
   frame, shown while the clip loads and for reduced-motion visitors. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;


/* Type matches the "About Metrio Group" heading (AboutPreview): Open Sans
   regular, uppercase, tight tracking, first word gold — light variant here
   since it sits on video. Tracking is the END state of the intro drift. */
const TEXT_SHADOW = '[text-shadow:0_2px_20px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.35)]';

/* ── Cinematic intro (GSAP) ──
   Modelled on the "WE BUILD FUTURES." title card in the Labour Day tribute:
   text resolves out of a soft blur while its letter-spacing keeps drifting
   wider long after it is readable.

   The drift is NOT a letter-spacing tween — that re-lays out the page every
   frame. The final tracking is set in CSS; each letter starts pulled in
   toward its line's centre by translateX and eases back out, which is
   compositor-only. Blur sits on the parent so it's one filter per element, not
   one per letter.

   Timeline (seconds after the hero becomes visible):
   0.0  video eases out of a slow push (scale 1.12 -> 1 over 7s)
   0.3  kicker resolves and drifts wider (0.12em -> 0.25em)
   0.9  "Building" resolves and drifts wider (-0.07em -> -0.025em)
   1.3  "What Matters" resolves and drifts out to wide title tracking (0.06em -> 0.2em) */
const titleCard = (el, textEl, fromEm, toEm) => {
  const split = SplitText.create(textEl, { type: 'words,chars' });

  /* Words keep each word unbreakable on narrow screens; chars are what move.
     Pull each char toward the centre of its own visual line, so a headline
     that wraps on phones ("What / Matters") drifts around each line's middle */
  const gapPx = (toEm - fromEm) * parseFloat(getComputedStyle(textEl).fontSize);
  const lines = new Map();
  split.chars.forEach((ch) => {
    const top = Math.round(ch.getBoundingClientRect().top);
    if (!lines.has(top)) lines.set(top, []);
    lines.get(top).push(ch);
  });
  const startX = new Map();
  lines.forEach((chars) => {
    const mid = (chars.length - 1) / 2;
    chars.forEach((ch, i) => startX.set(ch, (mid - i) * gapPx));
  });

  return gsap
    .timeline({ onComplete: () => split.revert() })
    .fromTo(
      el,
      { autoAlpha: 0, filter: 'blur(12px)', willChange: 'opacity, filter' },
      { autoAlpha: 1, filter: 'blur(0px)', duration: 2.2, ease: 'sine.out', clearProps: 'filter,willChange' },
      0
    )
    .from(
      split.chars,
      { x: (i, ch) => startX.get(ch), duration: 4.5, ease: 'power2.out', force3D: true },
      0
    );
};

const Hero = () => {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const kickerRef = useRef(null);
  const buildingRef = useRef(null);
  const mattersRef = useRef(null);
  const [reduceMotion] = useState(prefersReducedMotion);
  /* Hold the intro while the welcome video popup covers the page */
  const [play, setPlay] = useState(() => !isPopupOpen());

  useEffect(() => {
    if (play) return;
    return onPopupClosed(() => setPlay(true));
  }, [play]);

  /* Parallax — writes the transform directly instead of re-rendering the
     hero on every scroll event */
  useGSAP(() => {
    if (reduceMotion) return;
    const setY = gsap.quickSetter(mediaRef.current, 'y', 'px');
    const onScroll = () => setY(window.scrollY * 0.3);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, { scope: heroRef });

  useGSAP(
    (context, contextSafe) => {
      const text = [kickerRef.current, buildingRef.current, mattersRef.current];

      if (reduceMotion) {
        gsap.fromTo(text, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 });
        return;
      }

      /* Hidden before first paint; stays hidden until the popup is gone */
      gsap.set(text, { autoAlpha: 0 });
      gsap.set(mediaRef.current, { scale: 1.12 });
      if (!play) return;

      /* Split only once the hero fonts are in, or char positions are measured
         against the fallback font */
      const run = contextSafe(() => {
        gsap
          .timeline()
          .to(mediaRef.current, { scale: 1, duration: 7, ease: 'power1.out', force3D: true }, 0)
          .add(titleCard(kickerRef.current, kickerRef.current, 0.12, 0.25), 0.3)
          .add(titleCard(buildingRef.current, buildingRef.current, -0.07, -0.025), 0.9)
          .add(titleCard(mattersRef.current, mattersRef.current, 0.06, 0.2), 1.3);
      });
      document.fonts.ready.then(run);
    },
    { dependencies: [play], scope: heroRef, revertOnUpdate: true }
  );

  return (
    <section ref={heroRef} id="hero" className="relative w-full min-h-screen overflow-hidden bg-white">
      {/* Background Video — slow push-out on reveal, parallax on scroll */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={reduceMotion ? undefined : heroClip}
          poster={heroPoster}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      {/* Even, light tint so the white type holds without a visible vignette */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Thin top shade for the white navbar links — no white wash */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Content — Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Kicker — same treatment as "Established since 1993" */}
          <p
            ref={kickerRef}
            className={`invisible font-sans text-sm md:text-base tracking-[0.25em] uppercase text-white/85 mb-6 md:mb-8 ${TEXT_SHADOW}`}
          >
            Enriching Lives
          </p>

          {/* Main Headline — same treatment as "About Metrio Group" */}
          <h1
            className={`font-display uppercase leading-[1.1] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] ${TEXT_SHADOW}`}
          >
            <span ref={buildingRef} className="invisible block tracking-[-0.025em] text-gold-light">
              Building
            </span>
            {/* Wide title tracking; pl matches it to cancel the trailing space
               letter-spacing leaves after the last letter, keeping it centred */}
            <span ref={mattersRef} className="invisible block tracking-[0.2em] pl-[0.2em] text-white">
              What Matters
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
