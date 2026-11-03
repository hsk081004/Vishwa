import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTENT } from '../../config/content';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({
  onSelectPhoto,
  photos = CONTENT.photos,
  title = "Vishu's Highlights in Motion 🎞️",
  badge = "The Continuous Memory Reel"
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-vishwa-white via-vishwa-blush/30 to-vishwa-cream flex flex-col justify-center">
      {/* Track Title Header */}
      <div className="absolute top-10 left-8 sm:left-16 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-vishwa-hotpink" />
          {badge}
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-vishwa-deeprose">
          {title}
        </h3>
      </div>

      {/* Horizontally scrolling track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 pl-8 sm:pl-16 pr-32 select-none"
        style={{ width: 'fit-content' }}
      >
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => onSelectPhoto && onSelectPhoto(photo)}
            className="flex-shrink-0 w-72 sm:w-80 group cursor-pointer"
          >
            <div className="bg-white p-4 pb-6 rounded-3xl shadow-xl border border-pink-100/90 transition-all duration-300 group-hover:scale-105 group-hover:shadow-pink-soft">
              {/* Top Washi Sticker */}
              <div
                className="w-20 h-5 mx-auto -mt-6 mb-3 rounded-sm shadow-sm opacity-90"
                style={{
                  background: idx % 2 === 0 ? '#FFC2D6' : '#FFE4EC',
                  transform: `rotate(${photo.rotation}deg)`
                }}
              />

              {/* UNTOUCHED ASPECT RATIO — ZERO CROPPING */}
              <div className="relative h-72 rounded-2xl overflow-hidden bg-vishwa-cream/70 border border-pink-100 p-1 flex items-center justify-center">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 text-2xl filter drop-shadow">
                  {photo.sticker}
                </div>
              </div>

              <div className="mt-3.5 text-center">
                <span className="text-[10px] font-sans font-bold tracking-widest text-vishwa-hotpink uppercase">
                  {photo.date} • {photo.tag}
                </span>
                <h4 className="font-serif text-base font-bold text-vishwa-deeprose mt-0.5 truncate">
                  {photo.title}
                </h4>
                <p className="font-sans text-xs text-[#4A1525]/75 mt-1 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
