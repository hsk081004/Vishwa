import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../../config/content';
import { Heart, Sparkles, Milestone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MemoriesTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const heartPinRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw vertical SVG line progress on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      // Staggered reveal for timeline milestone cards
      const cards = gsap.utils.toArray('.timeline-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            y: 30,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="relative w-full py-24 bg-gradient-to-b from-white via-vishwa-cream to-vishwa-blush/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vishwa-blush border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
            <Milestone className="w-3.5 h-3.5 text-vishwa-hotpink" />
            Our Unforgettable Journey
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-4">
            The Sister Story Timeline 📖💖
          </h2>
          <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80">
            How two complete strangers ended up with the strongest sibling bond and thousands of hilarious memories.
          </p>
        </div>

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-1 bg-pink-100/90 rounded-full" />

          {/* Animated Glowing Active Line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-vishwa-rose via-vishwa-hotpink to-vishwa-deeprose rounded-full shadow-[0_0_10px_rgba(255,77,141,0.6)]"
          />

          {/* Milestone Cards */}
          <div className="space-y-12 sm:space-y-16">
            {CONTENT.timeline.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`timeline-card relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Card Content Box */}
                  <div className="w-full sm:w-[45%] pl-12 sm:pl-0">
                    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-pink-200/90 shadow-xl hover:shadow-pink-soft transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-vishwa-hotpink bg-vishwa-blush px-3 py-1 rounded-full">
                          {milestone.year}
                        </span>
                        <span className="text-2xl">{milestone.icon}</span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-vishwa-deeprose mb-1">
                        {milestone.title}
                      </h3>

                      <p className="font-script text-xl text-vishwa-rose mb-3">
                        {milestone.subtitle}
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-[#4A1525]/80 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node / Heart Pin */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 sm:top-1/2 sm:-translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border-2 border-vishwa-hotpink shadow-pink-soft flex items-center justify-center text-vishwa-hotpink">
                    <Heart className="w-4 h-4 fill-vishwa-hotpink" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden sm:block sm:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

