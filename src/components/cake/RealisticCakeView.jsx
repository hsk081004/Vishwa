import React from 'react';
import { Sparkles } from 'lucide-react';

export default function RealisticCakeView({ isLit, onBlow }) {
  return (
    <div
      onClick={onBlow}
      className="relative w-full max-w-[420px] h-[360px] sm:h-[400px] mx-auto flex flex-col items-center justify-end pb-8 cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02]"
      title={isLit ? "Click or blow to extinguish the candles!" : "Candles blown out!"}
    >
      {/* Candlelight Ambient Glow (when lit) */}
      {isLit && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-32 bg-amber-300/35 rounded-full blur-2xl pointer-events-none animate-pulse" />
      )}

      {/* --- CANDLES & FLAMES CONTAINER --- */}
      <div className="relative z-20 flex items-end justify-center gap-7 mb-[-6px]">
        {/* Left Candle */}
        <div className="relative flex flex-col items-center">
          {/* Flame / Smoke */}
          <div className="h-10 flex items-end justify-center">
            {isLit ? (
              <div className="candle-flame-anim flex flex-col items-center">
                <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
                  {/* Outer flame */}
                  <path
                    d="M11 0C11 0 0 14 0 22C0 28.6274 4.92487 34 11 34C17.0751 34 22 28.6274 22 22C22 14 11 0 11 0Z"
                    fill="url(#flame_outer_left)"
                  />
                  {/* Inner flame core */}
                  <path
                    d="M11 10C11 10 4 18 4 23C4 26.866 7.13401 30 11 30C14.866 30 18 26.866 18 23C18 18 11 10 11 10Z"
                    fill="url(#flame_inner_left)"
                  />
                  <defs>
                    <radialGradient id="flame_outer_left" cx="50%" cy="80%" r="70%">
                      <stop offset="0%" stopColor="#FFF176" />
                      <stop offset="60%" stopColor="#FF9800" />
                      <stop offset="100%" stopColor="#FF5722" />
                    </radialGradient>
                    <radialGradient id="flame_inner_left" cx="50%" cy="80%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="70%" stopColor="#FFF59D" />
                      <stop offset="100%" stopColor="#FFB74D" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="smoke-anim text-xs opacity-75 font-serif text-gray-400 select-none">
                <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="opacity-60">
                  <path
                    d="M9 26C7 20 12 16 9 10C6 4 12 2 9 0"
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* Wick */}
          <div className="w-[2px] h-2.5 bg-neutral-700" />
          {/* Candle Body */}
          <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 shadow-sm border border-pink-300/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_7px)]" />
          </div>
        </div>

        {/* Center Candle (Tallest) */}
        <div className="relative flex flex-col items-center">
          {/* Flame / Smoke */}
          <div className="h-12 flex items-end justify-center">
            {isLit ? (
              <div className="candle-flame-anim flex flex-col items-center">
                <svg width="26" height="38" viewBox="0 0 26 38" fill="none">
                  {/* Outer flame */}
                  <path
                    d="M13 0C13 0 0 16 0 25C0 32.1797 5.8203 38 13 38C20.1797 38 26 32.1797 26 25C26 16 13 0 13 0Z"
                    fill="url(#flame_outer_center)"
                  />
                  {/* Inner core */}
                  <path
                    d="M13 11C13 11 5 20 5 26C5 30.4183 8.58172 34 13 34C17.4183 34 21 30.4183 21 26C21 20 13 11 13 11Z"
                    fill="url(#flame_inner_center)"
                  />
                  <defs>
                    <radialGradient id="flame_outer_center" cx="50%" cy="80%" r="70%">
                      <stop offset="0%" stopColor="#FFF9C4" />
                      <stop offset="50%" stopColor="#FFB300" />
                      <stop offset="100%" stopColor="#E65100" />
                    </radialGradient>
                    <radialGradient id="flame_inner_center" cx="50%" cy="80%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#FFF59D" />
                      <stop offset="100%" stopColor="#FFA000" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="smoke-anim text-xs opacity-75 font-serif text-gray-400 select-none">
                <svg width="20" height="32" viewBox="0 0 20 32" fill="none" className="opacity-60">
                  <path
                    d="M10 30C7 22 14 18 10 11C6 4 14 2 10 0"
                    stroke="#9E9E9E"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* Wick */}
          <div className="w-[2px] h-3 bg-neutral-800" />
          {/* Candle Body */}
          <div className="w-4 h-16 rounded-t-sm bg-gradient-to-r from-rose-400 via-pink-200 to-rose-500 shadow-sm border border-rose-300/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.85)_4px,rgba(255,255,255,0.85)_8px)]" />
          </div>
        </div>

        {/* Right Candle */}
        <div className="relative flex flex-col items-center">
          {/* Flame / Smoke */}
          <div className="h-10 flex items-end justify-center">
            {isLit ? (
              <div className="candle-flame-anim flex flex-col items-center">
                <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
                  <path
                    d="M11 0C11 0 0 14 0 22C0 28.6274 4.92487 34 11 34C17.0751 34 22 28.6274 22 22C22 14 11 0 11 0Z"
                    fill="url(#flame_outer_right)"
                  />
                  <path
                    d="M11 10C11 10 4 18 4 23C4 26.866 7.13401 30 11 30C14.866 30 18 26.866 18 23C18 18 11 10 11 10Z"
                    fill="url(#flame_inner_right)"
                  />
                  <defs>
                    <radialGradient id="flame_outer_right" cx="50%" cy="80%" r="70%">
                      <stop offset="0%" stopColor="#FFF176" />
                      <stop offset="60%" stopColor="#FF9800" />
                      <stop offset="100%" stopColor="#FF5722" />
                    </radialGradient>
                    <radialGradient id="flame_inner_right" cx="50%" cy="80%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="70%" stopColor="#FFF59D" />
                      <stop offset="100%" stopColor="#FFB74D" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <div className="smoke-anim text-xs opacity-75 font-serif text-gray-400 select-none">
                <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="opacity-60">
                  <path
                    d="M9 26C11 20 6 16 9 10C12 4 6 2 9 0"
                    stroke="#9E9E9E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* Wick */}
          <div className="w-[2px] h-2.5 bg-neutral-700" />
          {/* Candle Body */}
          <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 shadow-sm border border-pink-300/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_7px)]" />
          </div>
        </div>
      </div>

      {/* --- TOP TIER (Tier 2) --- */}
      <div className="relative z-10 w-48 sm:w-56 h-20 rounded-2xl bg-gradient-to-b from-[#FFF5F8] via-[#FFE4EC] to-[#FFC2D6] shadow-md border border-pink-200/80 flex flex-col justify-between overflow-hidden">
        {/* Frosting Drip Top */}
        <div className="w-full flex items-center justify-between px-2 pt-1 opacity-90">
          <span className="text-[10px]">🌸</span>
          <span className="text-[10px]">✨</span>
          <span className="text-[10px]">🍓</span>
          <span className="text-[10px]">✨</span>
          <span className="text-[10px]">🌸</span>
        </div>

        {/* Strawberry Drip Swags */}
        <svg className="w-full h-4 text-vishwa-hotpink/80 fill-current" viewBox="0 0 200 20" preserveAspectRatio="none">
          <path d="M0,0 Q25,18 50,0 Q75,18 100,0 Q125,18 150,0 Q175,18 200,0 L200,4 L0,4 Z" />
        </svg>

        {/* Pearls Border Bottom */}
        <div className="w-full h-3 bg-white/70 border-t border-pink-200/50 flex items-center justify-around px-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-pink-300 shadow-sm" />
          ))}
        </div>
      </div>

      {/* --- BOTTOM TIER (Tier 1) --- */}
      <div className="relative z-0 w-64 sm:w-72 h-24 -mt-2 rounded-2xl bg-gradient-to-b from-[#FFE4EC] via-[#FFC2D6] to-[#FF8FB1] shadow-lg border border-pink-300/70 flex flex-col justify-between overflow-hidden">
        {/* Strawberry Glaze Top Rim */}
        <div className="w-full h-3 bg-gradient-to-r from-pink-100 via-white to-pink-100 flex items-center justify-around px-2 shadow-inner">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-vishwa-hotpink/70" />
          ))}
        </div>

        {/* Decorative Sister Inscription / Hearts */}
        <div className="w-full text-center font-serif text-xs font-bold text-vishwa-deeprose/90 tracking-wide flex items-center justify-center gap-1.5 py-1">
          <span>💖</span>
          <span>Happy Birthday Vishu</span>
          <span>💖</span>
        </div>

        {/* Cream Puffs Base */}
        <div className="w-full h-4 bg-white/90 border-t border-pink-300/40 flex items-center justify-around px-1 shadow-sm">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-white to-pink-100 shadow-sm border border-pink-200/50" />
          ))}
        </div>
      </div>

      {/* --- CAKE STAND / PEDESTAL --- */}
      <div className="relative z-[-1] w-72 sm:w-80 h-5 -mt-1 rounded-full bg-gradient-to-r from-slate-100 via-white to-slate-200 shadow-xl border border-pink-200/60 flex items-center justify-center">
        <div className="w-28 h-2 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-md shadow-sm" />
      </div>

      {/* Tap hint text */}
      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-pink-200/60 text-[11px] font-semibold text-vishwa-deeprose/80 shadow-sm backdrop-blur-sm group-hover:bg-white transition-all">
        <Sparkles className="w-3 h-3 text-vishwa-hotpink" />
        {isLit ? "Tap the cake to blow out candles! 🎂" : "Wish Made! Click 'Relight' below to blow again 💖"}
      </div>
    </div>
  );
}
