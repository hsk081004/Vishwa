import { useEffect } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function EasterEggModal({ isOpen, onClose, title, message, icon = '🎉' }) {
  useEffect(() => {
    if (isOpen) {
      sound.playSparkle();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-vishwa-hotpink shadow-2xl text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-vishwa-babypink/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-vishwa-rose/20 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-vishwa-deeprose/60 hover:text-vishwa-hotpink hover:bg-vishwa-blush rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-6xl mb-4 animate-bounce">{icon}</div>

        <h3 className="font-serif text-2xl font-bold text-vishwa-deeprose mb-3">
          {title}
        </h3>

        <p className="font-sans text-sm sm:text-base text-[#4A1525] leading-relaxed mb-6">
          {message}
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-semibold text-sm shadow-md hover:shadow-pink-glow transition-all active:scale-95"
        >
          Yayy! Keep Celebrating 💖
        </button>
      </div>
    </div>
  );
}

