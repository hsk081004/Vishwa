import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../../config/content';
import { sound } from '../../utils/audio';

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const cakeFillRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Play chime
        sound.playChime();

        // Exit curtain reveal animation using GSAP
        const tl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut'
        });
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-b from-vishwa-white via-vishwa-cream to-vishwa-blush text-center select-none overflow-hidden"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-vishwa-babypink/30 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-vishwa-rose/20 blur-3xl animate-pulse-glow delay-1000" />

      <div ref={textRef} className="relative z-10 flex flex-col items-center px-6">
        {/* SVG Cake / Heart that fills up */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_25px_rgba(255,77,141,0.3)]">
            <defs>
              <linearGradient id="loaderPinkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="#FF4D8D" />
                <stop offset="60%" stop-color="#FF8FB1" />
                <stop offset="100%" stop-color="#FFC2D6" />
              </linearGradient>
              <clipPath id="cakeClip">
                {/* Heart / Cake silhouette */}
                <path d="M50,85 C25,65 10,48 10,32 C10,18 20,10 32,10 C41,10 47,15 50,22 C53,15 59,10 68,10 C80,10 90,18 90,32 C90,48 75,65 50,85 Z" />
              </clipPath>
            </defs>

            {/* Background Heart Outline */}
            <path
              d="M50,85 C25,65 10,48 10,32 C10,18 20,10 32,10 C41,10 47,15 50,22 C53,15 59,10 68,10 C80,10 90,18 90,32 C90,48 75,65 50,85 Z"
              fill="#FFE4EC"
              stroke="#FF8FB1"
              strokeWidth="2"
            />

            {/* Filling Liquid Level */}
            <g clipPath="url(#cakeClip)">
              <rect
                x="0"
                y={100 - progress}
                width="100"
                height={progress}
                fill="url(#loaderPinkGradient)"
                className="transition-all duration-75 ease-out"
              />
              {/* Wave surface shimmer */}
              <circle
                cx="50"
                cy={100 - progress}
                r="30"
                fill="#FFFFFF"
                opacity="0.3"
                className="animate-pulse"
              />
            </g>

            {/* Candle or Sparkle in center */}
            <text x="50" y="52" fontSize="24" textAnchor="middle" dominantBaseline="middle" className="select-none">
              🎂
            </text>
          </svg>

          {/* Floating Sparkles around loader */}
          <span className="absolute -top-2 -right-2 text-xl animate-bounce">✨</span>
          <span className="absolute -bottom-2 -left-2 text-xl animate-bounce delay-300">💖</span>
        </div>

        {/* Counter Percentage */}
        <div className="font-serif text-4xl sm:text-5xl font-black text-vishwa-deeprose mb-3 tracking-tight">
          {progress}<span className="text-2xl text-vishwa-hotpink">%</span>
        </div>

        {/* Cinematic Title & Tagline */}
        <h2 className="font-serif text-xl sm:text-2xl text-vishwa-deeprose font-bold mb-2">
          Preparing something special for {CONTENT.person.name}... 🎂
        </h2>

        <p className="font-sans text-xs sm:text-sm text-vishwa-deeprose/70 max-w-sm tracking-wide font-medium">
          Loading 10,000 expressions, unlimited pizzas &amp; endless sister love...
        </p>

        {/* Mini progress track bar */}
        <div className="w-56 h-1.5 bg-vishwa-blush rounded-full mt-6 overflow-hidden border border-vishwa-babypink/50">
          <div
            className="h-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

