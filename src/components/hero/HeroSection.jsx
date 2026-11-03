import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../../config/content';
import HeroScene from './HeroScene';
import { sound } from '../../utils/audio';
import { triggerConfettiBurst } from '../../utils/confetti';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

export default function HeroSection({ onCakeClick }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const badgeRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const emojisRef = useRef([]);

  const headlineText = `Happy Birthday, ${CONTENT.person.name}! 🎉`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation on headline lines
      const lines = headlineRef.current?.querySelectorAll('.char-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(lines, 
          {
            opacity: 0,
            y: 45,
            scale: 0.92
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.2,
            duration: 1.1,
            ease: 'back.out(1.6)',
            delay: 0.2
          }
        );
      }

      // Staggered reveal of badge, subtitle & scroll prompt
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo(subheadRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power2.out' }
      );

      gsap.fromTo(scrollPromptRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.4, ease: 'power2.out' }
      );

      // Floating wobble on stickers
      emojisRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          y: '+=15',
          rotation: index % 2 === 0 ? '+=8' : '-=8',
          duration: 2.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEmojiClick = (e, emoji) => {
    sound.playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerConfettiBurst(x, y);

    gsap.fromTo(e.currentTarget,
      { scale: 1.5, rotate: 20 },
      { scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1.5, 0.3)' }
    );
  };

  const scrollToNext = () => {
    sound.playPop();
    const nextSection = document.getElementById('letter-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stickers = [
    { emoji: "🎂", top: "18%", left: "10%" },
    { emoji: "💖", top: "25%", right: "12%" },
    { emoji: "🍰", top: "65%", left: "14%" },
    { emoji: "🍕", top: "70%", right: "15%" },
    { emoji: "✨", top: "35%", left: "5%" },
    { emoji: "🎀", top: "42%", right: "7%" },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden pt-20 pb-12 px-4 select-none"
    >
      {/* 3D Background Canvas */}
      <HeroScene />

      {/* Soft Vignette and Lighting */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/10 to-vishwa-cream/70 pointer-events-none" />

      {/* Floating Interactive Emoji Stickers */}
      {stickers.map((s, idx) => (
        <div
          key={idx}
          ref={(el) => (emojisRef.current[idx] = el)}
          onClick={(e) => handleEmojiClick(e, s.emoji)}
          className="absolute z-10 cursor-pointer hidden md:flex items-center justify-center p-3 text-3xl select-none transition-transform hover:scale-135 filter drop-shadow-[0_8px_16px_rgba(255,77,141,0.35)]"
          style={{ top: s.top, left: s.left, right: s.right }}
          title="Click me for a surprise!"
        >
          {s.emoji}
        </div>
      ))}

      {/* Top Tag / Pill */}
      <div ref={badgeRef} className="relative z-10 mt-6 sm:mt-10">
        <div className="glass-panel px-5 py-2 rounded-full inline-flex items-center gap-2.5 shadow-pink-soft border border-pink-200/80 bg-white/80">
          <span className="text-vishwa-hotpink text-sm">💖</span>
          <span className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase text-vishwa-deeprose">
            From Harsh • For Expression Queen Vishu 🤗🥺
          </span>
          <Sparkles className="w-3.5 h-3.5 text-vishwa-hotpink animate-pulse" />
        </div>
      </div>

      {/* Hero Central Typography */}
      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center mt-6 mb-auto">
        {/* SplitText Headline */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-vishwa-deeprose tracking-tight drop-shadow-[0_4px_20px_rgba(255,143,177,0.35)] leading-tight mb-4"
        >
          <span className="block">Happy Birthday,</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-vishwa-hotpink via-vishwa-rose to-vishwa-deeprose whitespace-nowrap">
            {CONTENT.person.name}! 💖
          </span>
        </h1>

        {/* Subtitle */}
        <div ref={subheadRef} className="flex flex-col items-center gap-2">
          <p className="font-sans text-base sm:text-xl md:text-2xl text-vishwa-deeprose/90 font-medium tracking-wide max-w-2xl leading-relaxed">
            {CONTENT.person.tagline}
          </p>

          <p className="font-script text-2xl sm:text-3xl text-vishwa-hotpink mt-1">
            Happy 7th November, Meri Pyaari Sister! 🌸
          </p>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div ref={scrollPromptRef} className="relative z-10 flex flex-col items-center">
        <button
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-2 text-vishwa-deeprose font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase hover:text-vishwa-hotpink transition-colors focus:outline-none"
        >
          <span className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-pink-200 shadow-sm group-hover:shadow-pink-glow transition-all">
            Scroll to open your surprise ↓
          </span>
          <div className="w-9 h-9 rounded-full bg-white/90 border border-vishwa-babypink flex items-center justify-center text-vishwa-hotpink group-hover:translate-y-1 transition-transform shadow-md">
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
