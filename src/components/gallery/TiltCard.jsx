import { useRef, useState } from 'react';
import { sound } from '../../utils/audio';

export default function TiltCard({ photo, onSelect, className = "" }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out'
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.35,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 10%, rgba(255,143,177,0.2) 60%, transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setGlareStyle({ opacity: 0, transition: 'opacity 0.5s ease-out' });
  };

  const handleClick = () => {
    sound.playPop();
    if (onSelect) onSelect(photo);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-white p-3.5 pb-5 rounded-3xl shadow-lg border border-pink-100/90 cursor-pointer select-none transition-shadow hover:shadow-2xl hover:border-vishwa-hotpink/50 break-inside-avoid mb-6 ${className}`}
      style={style}
    >
      {/* Washi Tape Accent */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm opacity-90 shadow-sm z-20 pointer-events-none"
        style={{
          background: 'rgba(255, 214, 226, 0.9)',
          transform: `translateX(-50%) rotate(${photo.rotation || -2}deg)`
        }}
      />

      {/* Holographic Glare Layer */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-10"
        style={glareStyle}
      />

      {/* Photo Frame — NATURAL RATIO, NO CROPPING */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-vishwa-cream p-1 border border-pink-100/70 flex items-center justify-center">
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full h-auto max-h-[520px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Sticker Badge in corner */}
        <div className="absolute bottom-3 right-3 text-2xl filter drop-shadow-md group-hover:scale-125 transition-transform pointer-events-none">
          {photo.sticker}
        </div>
      </div>

      {/* Polaroid Caption Area */}
      <div className="mt-3.5 px-1 text-center">
        <span className="text-[10px] font-sans font-bold tracking-widest text-vishwa-hotpink uppercase block">
          {photo.date} • {photo.tag}
        </span>
        <h4 className="font-serif text-base font-bold text-vishwa-deeprose truncate mt-0.5">
          {photo.title}
        </h4>
        <p className="font-sans text-xs text-[#4A1525]/75 mt-1 line-clamp-2 leading-relaxed">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}
