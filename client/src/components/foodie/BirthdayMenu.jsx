import { CONTENT } from '../../config/content';
import { Utensils, Sparkles, Heart } from 'lucide-react';

export default function BirthdayMenu() {
  const { menu } = CONTENT.foodie;

  return (
    <div className="w-full max-w-3xl mx-auto my-12 bg-white/95 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-vishwa-babypink relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-vishwa-hotpink rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-vishwa-hotpink rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-vishwa-hotpink rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-vishwa-hotpink rounded-br-3xl pointer-events-none" />

      {/* Menu Header */}
      <div className="text-center mb-8 pb-6 border-b border-pink-100">
        <span className="font-sans text-xs uppercase tracking-widest text-vishwa-hotpink font-bold block mb-1">
          ★ FIVE-STAR SISTER DINING EXPERIENCE ★
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-vishwa-deeprose tracking-tight">
          Vishu&apos;s Grand Birthday Menu 🍽️
        </h3>
        <p className="font-script text-2xl text-vishwa-rose mt-1">
          Special Chef Edition • Curated with 100% Love by Harsh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {/* Starters */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🥗</span>
            <h4 className="font-serif text-lg font-bold text-vishwa-deeprose uppercase tracking-wide">
              Starters
            </h4>
          </div>
          <div className="space-y-4">
            {menu.starters.map((item, i) => (
              <div key={i} className="group border-b border-pink-50 pb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans font-semibold text-sm text-[#4A1525] group-hover:text-vishwa-hotpink transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-vishwa-hotpink ml-2">
                    {item.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-vishwa-deeprose/70 mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mains */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🍕</span>
            <h4 className="font-serif text-lg font-bold text-vishwa-deeprose uppercase tracking-wide">
              Main Course
            </h4>
          </div>
          <div className="space-y-4">
            {menu.mains.map((item, i) => (
              <div key={i} className="group border-b border-pink-50 pb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans font-semibold text-sm text-[#4A1525] group-hover:text-vishwa-hotpink transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-vishwa-hotpink ml-2">
                    {item.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-vishwa-deeprose/70 mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desserts */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎂</span>
            <h4 className="font-serif text-lg font-bold text-vishwa-deeprose uppercase tracking-wide">
              Desserts
            </h4>
          </div>
          <div className="space-y-4">
            {menu.desserts.map((item, i) => (
              <div key={i} className="group border-b border-pink-50 pb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans font-semibold text-sm text-[#4A1525] group-hover:text-vishwa-hotpink transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-vishwa-hotpink ml-2">
                    {item.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-vishwa-deeprose/70 mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Drinks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🧋</span>
            <h4 className="font-serif text-lg font-bold text-vishwa-deeprose uppercase tracking-wide">
              Special Drinks
            </h4>
          </div>
          <div className="space-y-4">
            {menu.drinks.map((item, i) => (
              <div key={i} className="group border-b border-pink-50 pb-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans font-semibold text-sm text-[#4A1525] group-hover:text-vishwa-hotpink transition-colors">
                    {item.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-vishwa-hotpink ml-2">
                    {item.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-vishwa-deeprose/70 mt-0.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 pt-4 border-t border-pink-100 text-center font-sans text-xs text-vishwa-deeprose/80 font-medium">
        💡 Note: All items are 100% tax-free, calorie-free, and sponsored with love by your brother Harsh! 💖
      </div>
    </div>
  );
}

