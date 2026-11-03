import { useEffect } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function Lightbox({ photo, onClose }) {
  useEffect(() => {
    if (photo) {
      sound.playSparkle();
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-vishwa-babypink overflow-hidden animate-scale-up"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-vishwa-deeprose hover:text-vishwa-hotpink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Frame — 100% UNTOUCHED ASPECT RATIO, ZERO CROPPING */}
        <div className="relative rounded-2xl overflow-hidden bg-vishwa-cream/60 flex items-center justify-center border border-pink-100 max-h-[75vh]">
          <img
            src={photo.src}
            alt={photo.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
          />
          {/* Sticker Overlay */}
          <div className="absolute top-4 left-4 text-3xl filter drop-shadow-md pointer-events-none">
            {photo.sticker}
          </div>
        </div>

        {/* Caption & Metadata */}
        <div className="mt-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-vishwa-blush text-vishwa-deeprose font-sans text-xs font-bold tracking-wider uppercase mb-1">
            {photo.tag} • {photo.date}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-vishwa-deeprose mb-1">
            {photo.title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#4A1525]/80 max-w-lg mx-auto">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
