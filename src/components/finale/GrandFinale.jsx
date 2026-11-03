import { useRef } from 'react';
import { CONTENT } from '../../config/content';
import { sound } from '../../utils/audio';
import { triggerGrandFireworks, triggerConfettiBurst } from '../../utils/confetti';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

export default function GrandFinale({ onSecretClick }) {
  const clickCountRef = useRef(0);

  const handleReplay = () => {
    sound.playChime();
    triggerGrandFireworks(3500);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeartClick = () => {
    sound.playPop();
    triggerConfettiBurst(0.5, 0.7);
    clickCountRef.current += 1;
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      if (onSecretClick) onSecretClick();
    }
  };

  return (
    <footer id="finale" className="relative w-full py-28 px-4 bg-gradient-to-b from-vishwa-cream via-vishwa-blush/60 to-[#FFD8E6] text-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-vishwa-babypink/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-vishwa-rose/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Heart Emblem */}
        <div
          onClick={handleHeartClick}
          className="cursor-pointer mb-6 transform hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_10px_20px_rgba(255,77,141,0.4)]"
          title="Click 5 times for a secret!"
        >
          <span className="text-6xl sm:text-7xl block animate-bounce">💖</span>
        </div>

        {/* Giant Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-vishwa-deeprose tracking-tight leading-tight mb-4 drop-shadow-[0_4px_15px_rgba(255,143,177,0.3)]">
          We Love You, {CONTENT.person.shortName}! 💖
        </h2>

        <p className="font-script text-3xl sm:text-4xl text-vishwa-hotpink mb-8">
          Happy Birthday, Meri Pyaari Sister!
        </p>

        <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80 max-w-lg mb-10 leading-relaxed font-medium">
          May your year be as extraordinary, sweet, and unforgettable as you are. Keep smiling, keep shining, and never ever stop giving those million-dollar expressions! 🥺🤗
        </p>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-sm font-bold shadow-pink-glow hover:scale-105 active:scale-95 transition-all mb-16"
        >
          <RotateCcw className="w-4 h-4" />
          Replay The Magic ↻
        </button>

        {/* Divider */}
        <div className="w-32 h-[1px] bg-pink-300/60 mb-8" />

        {/* Credits & Footer */}
        <div className="space-y-2">
          <p className="font-sans text-xs sm:text-sm font-semibold text-vishwa-deeprose">
            Crafted with all my heart by <span className="underline decoration-vishwa-hotpink underline-offset-4">{CONTENT.person.from}</span> 💖
          </p>
          <p className="font-sans text-[11px] text-vishwa-deeprose/60">
            Dedicated to Vishwa • 7th November • Sister from another mother forever
          </p>
        </div>
      </div>
    </footer>
  );
}

