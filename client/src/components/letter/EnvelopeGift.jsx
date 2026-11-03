import { useState, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../../config/content';
import { sound } from '../../utils/audio';
import { triggerConfettiBurst, triggerHeartBurst } from '../../utils/confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

export default function EnvelopeGift() {
  const [isOpen, setIsOpen] = useState(false);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const sealRef = useRef(null);
  const letterRef = useRef(null);
  const letterContentRef = useRef(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Audio effects: pop + paper rustle + sparkles
    sound.playPop();
    setTimeout(() => sound.playPaperRustle(), 150);
    setTimeout(() => sound.playSparkle(), 600);

    // Confetti burst
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      triggerHeartBurst(x, y);
      setTimeout(() => triggerConfettiBurst(x, y), 350);
    }

    // GSAP Animation Sequence
    const tl = gsap.timeline();

    // 1. Break wax seal (scale down and fade out)
    tl.to(sealRef.current, {
      scale: 1.3,
      rotate: 15,
      duration: 0.15,
      ease: 'power1.out'
    })
    .to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: 'back.in(2)'
    })
    // 2. Open top flap (rotateX 180deg)
    .to(flapRef.current, {
      rotateX: 180,
      duration: 0.6,
      ease: 'power2.inOut',
      transformOrigin: 'top center'
    }, '-=0.1')
    // 3. Slide letter up from inside envelope
    .to(letterRef.current, {
      y: -180,
      zIndex: 25,
      duration: 0.8,
      ease: 'power3.out'
    })
    // 4. Expand letter to full reading view
    .to(letterRef.current, {
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.75)'
    })
    // 5. Fade in letter content smoothly
    .fromTo(letterContentRef.current?.children || [],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
  };

  const handleClose = () => {
    if (!isOpen) return;
    sound.playPaperRustle();

    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false)
    });

    tl.to(letterContentRef.current?.children || [], {
      opacity: 0,
      y: 10,
      duration: 0.25
    })
    .to(letterRef.current, {
      y: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in'
    })
    .to(flapRef.current, {
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    .to(sealRef.current, {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'back.out(2)'
    });
  };

  return (
    <section
      id="letter-section"
      className="relative w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-vishwa-cream via-vishwa-blush/40 to-vishwa-cream overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-vishwa-babypink/30 blur-3xl pointer-events-none -top-10 -right-20" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-vishwa-rose/20 blur-3xl pointer-events-none -bottom-10 -left-20" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-vishwa-babypink shadow-sm text-xs font-semibold text-vishwa-deeprose uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-vishwa-hotpink" />
          A Special Letter For You
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-vishwa-deeprose tracking-tight mb-3">
          To My Sister From Another Mother 💖
        </h2>
        <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80 font-normal">
          {isOpen
            ? "Read every word, it came straight from the heart!"
            : "Click the heart seal to break it open and read your letter 💌"}
        </p>
      </div>

      {/* Envelope Container */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope (Interactive) */
          <div
            ref={envelopeRef}
            onClick={handleOpen}
            className="group relative w-full aspect-[16/11] max-w-md bg-gradient-to-br from-[#FFF5F8] to-[#FFD8E6] rounded-2xl shadow-2xl border-2 border-vishwa-babypink cursor-pointer hover:shadow-pink-glow transition-all duration-500 overflow-hidden perspective-1000"
          >
            {/* Top Flap */}
            <div
              ref={flapRef}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FFE4EC] to-[#FFC2D6] origin-top border-b border-pink-300 shadow-md flex items-end justify-center pb-2 z-20"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
            />

            {/* Envelope Bottom Folds */}
            <div
              className="absolute bottom-0 left-0 w-full h-3/4 bg-[#FFF8FA] z-10"
              style={{ clipPath: 'polygon(0% 100%, 100% 100%, 50% 25%)' }}
            />
            <div
              className="absolute bottom-0 left-0 w-1/2 h-full bg-[#FFEBF2] z-10 opacity-70"
              style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-1/2 h-full bg-[#FFDDEB] z-10 opacity-70"
              style={{ clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)' }}
            />

            {/* Front Letter Hint inside */}
            <div className="absolute inset-x-8 top-12 bottom-6 bg-white rounded-lg shadow-inner flex flex-col items-center justify-center p-6 text-center z-0">
              <span className="font-script text-2xl text-vishwa-rose">Vishwa</span>
              <span className="text-xs text-vishwa-deeprose/50 font-sans mt-1">Tap to Open</span>
            </div>

            {/* Wax Seal in Center */}
            <div
              ref={sealRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 wax-seal w-16 h-16 rounded-full flex items-center justify-center cursor-pointer group-hover:scale-110 active:scale-95 transition-transform"
            >
              <Heart className="w-8 h-8 text-white fill-white drop-shadow-md animate-pulse" />
            </div>

            {/* Interactive hint tag */}
            <div className="absolute bottom-3 inset-x-0 text-center z-30 pointer-events-none">
              <span className="inline-block text-[11px] font-sans font-bold tracking-widest uppercase text-vishwa-deeprose/70 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                ✉️ Break Wax Seal
              </span>
            </div>
          </div>
        ) : (
          /* Unfolded Full Letter Card */
          <div
            ref={letterRef}
            className="w-full bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-vishwa-babypink text-left relative transition-all duration-300"
          >
            {/* Vintage Postmark / Stamp */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <div className="border border-dashed border-vishwa-rose px-3 py-1 rounded text-center">
                <span className="text-[10px] font-bold text-vishwa-deeprose uppercase tracking-widest block">
                  7TH NOV
                </span>
                <span className="text-[9px] text-vishwa-hotpink font-mono block">
                  SPECIAL AIRMAIL
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-vishwa-blush flex items-center justify-center text-lg border border-vishwa-babypink">
                💌
              </div>
            </div>

            {/* Letter Content */}
            <div ref={letterContentRef} className="space-y-5 pt-4">
              {/* Salutation */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vishwa-deeprose tracking-tight">
                {CONTENT.letter.salutation}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-[#4A1525] leading-relaxed">
                {CONTENT.letter.paragraphs.map((para, idx) => (
                  <p key={idx} className="tracking-wide">
                    {para}
                  </p>
                ))}
              </div>

              {/* Closing */}
              <div className="pt-4 border-t border-pink-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="font-sans text-xs sm:text-sm text-vishwa-deeprose/80 italic mb-1">
                    {CONTENT.letter.closing}
                  </p>
                  <p className="font-script text-3xl sm:text-4xl text-vishwa-hotpink">
                    {CONTENT.letter.signoff}
                  </p>
                </div>

                {/* Re-fold Button */}
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vishwa-blush text-vishwa-deeprose font-sans text-xs font-semibold hover:bg-vishwa-babypink transition-colors self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Re-fold Letter
                </button>
              </div>

              {/* Post Script */}
              {CONTENT.letter.pS && (
                <div className="p-3.5 rounded-xl bg-vishwa-cream border border-pink-200/60 font-sans text-xs sm:text-sm text-vishwa-deeprose/90 font-medium">
                  {CONTENT.letter.pS}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

