import { CONTENT } from '../../config/content';
import FoodieScene from './FoodieScene';
import FoodGallery from './FoodGallery';
import BirthdayMenu from './BirthdayMenu';
import CatchFoodGame from './CatchFoodGame';
import { Sparkles, Utensils } from 'lucide-react';

export default function FoodieUniverse() {
  const { headline, subheadline, items } = CONTENT.foodie;

  return (
    <section id="foodie" className="relative w-full py-24 bg-gradient-to-b from-vishwa-cream via-vishwa-blush/25 to-white overflow-hidden">
      {/* 3D Floating Food Background */}
      <FoodieScene />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
            <Utensils className="w-3.5 h-3.5 text-vishwa-hotpink" />
            Dedicated to Her Ultimate Love
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-4">
            {headline}
          </h2>
          <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80 max-w-xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Favorite Food Chips / Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto mb-16">
          {items.map((item, i) => (
            <div
              key={i}
              className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-sm border border-pink-200/80 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="text-left">
                <p className="font-sans text-xs font-bold text-vishwa-deeprose">
                  {item.name}
                </p>
                <p className="font-sans text-[10px] text-vishwa-deeprose/70">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vishu's Official Food Gallery (All 16 Photos, 3 Modes, Pinned Horizontal Reel) */}
        <FoodGallery />

        {/* Fancy Restaurant Style Birthday Menu */}
        <BirthdayMenu />

        {/* Interactive Mini-Game */}
        <CatchFoodGame />
      </div>
    </section>
  );
}

