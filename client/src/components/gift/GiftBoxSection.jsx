import { useState, useRef } from 'react';
import gsap from 'gsap';
import { CONTENT } from '../../config/content';
import { sound } from '../../utils/audio';
import { triggerConfettiBurst, triggerGrandFireworks } from '../../utils/confetti';
import { Gift, Sparkles, CheckCircle2, Ticket } from 'lucide-react';

export default function GiftBoxSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [claimedCards, setClaimedCards] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const boxLidRef = useRef(null);
  const boxBaseRef = useRef(null);

  const handleOpenBox = () => {
    if (isOpen) return;

    sound.playPop();
    setTimeout(() => sound.playSparkle(), 300);
    triggerGrandFireworks(3000);

    // Animate lid flying off
    gsap.to(boxLidRef.current, {
      y: -140,
      rotateZ: -25,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)',
      onComplete: () => {
        setIsOpen(true);
      }
    });
  };

  const toggleFlip = (id) => {
    sound.playPop();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleClaim = (e, id) => {
    e.stopPropagation();
    sound.playChime();
    triggerConfettiBurst(0.5, 0.5);
    setClaimedCards(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <section id="gifts" className="relative w-full py-24 bg-gradient-to-b from-white via-vishwa-cream to-vishwa-blush/40 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vishwa-babypink/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vishwa-blush border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
            <Gift className="w-3.5 h-3.5 text-vishwa-hotpink" />
            Special Sister Privileges
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-4">
            The Interactive Gift Box 🎁
          </h2>
          <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80">
            {isOpen
              ? "Your VIP Sister Vouchers are ready! Click each card to flip and claim them 💖"
              : "Tap the luxury gift box to untie the ribbon and see what's inside!"}
          </p>
        </div>

        {/* 3D Gift Box Animation Area */}
        {!isOpen && (
          <div className="flex flex-col items-center justify-center my-12">
            <div
              onClick={handleOpenBox}
              className="group relative cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
            >
              {/* Box Lid */}
              <div
                ref={boxLidRef}
                className="relative z-20 w-44 sm:w-52 h-14 bg-gradient-to-r from-vishwa-rose via-vishwa-hotpink to-vishwa-deeprose rounded-2xl shadow-xl flex items-center justify-center border-2 border-white/80"
              >
                {/* Ribbon Bow on top */}
                <div className="absolute -top-7 text-4xl animate-bounce">
                  🎀
                </div>
                {/* Vertical Ribbon */}
                <div className="w-6 h-full bg-white/70 shadow-sm" />
              </div>

              {/* Box Base */}
              <div
                ref={boxBaseRef}
                className="relative z-10 w-40 sm:w-48 h-36 bg-gradient-to-b from-[#FF8FB1] to-[#C2185B] rounded-b-3xl shadow-2xl flex items-center justify-center border-2 border-white/80 -mt-2 mx-auto overflow-hidden"
              >
                <div className="w-6 h-full bg-white/70 shadow-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-script text-2xl text-white drop-shadow">
                    For Vishu
                  </span>
                </div>
              </div>

              {/* Pulsing Hint Tag */}
              <div className="mt-6">
                <span className="inline-block font-sans text-xs font-bold tracking-widest uppercase text-vishwa-deeprose bg-white/90 px-4 py-1.5 rounded-full shadow-md border border-pink-200 group-hover:shadow-pink-glow transition-all">
                  ✨ Click to Open Gift Box!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Unveiled Gift Cards Grid */}
        {isOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-8 text-left">
            {CONTENT.coupons.map((coupon) => {
              const isFlipped = flippedCards[coupon.id];
              const isClaimed = claimedCards[coupon.id];

              return (
                <div
                  key={coupon.id}
                  onClick={() => toggleFlip(coupon.id)}
                  className="group relative h-72 sm:h-80 perspective-1000 cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-3xl p-6 shadow-xl border-2 border-pink-200/80 flex flex-col justify-between hover:shadow-pink-soft transition-all">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-4xl">{coupon.icon}</span>
                          <span className="inline-block px-3 py-1 rounded-full bg-vishwa-blush text-vishwa-deeprose font-sans text-[10px] font-bold tracking-wider uppercase">
                            {coupon.tag}
                          </span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-vishwa-deeprose mb-2">
                          {coupon.title}
                        </h4>
                        <p className="font-sans text-xs text-[#4A1525]/80 leading-relaxed">
                          {coupon.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-pink-100 flex justify-between items-center">
                        <span className="font-mono text-xs text-vishwa-hotpink font-bold">
                          Tap to Flip ↻
                        </span>
                        {isClaimed && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Claimed!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Back of Card (Redemption details & Claim button) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#FFE4EC] to-[#FFC2D6] rounded-3xl p-6 shadow-xl border-2 border-vishwa-hotpink flex flex-col justify-between text-center">
                      <div>
                        <Ticket className="w-8 h-8 text-vishwa-deeprose mx-auto mb-2" />
                        <h4 className="font-serif text-lg font-bold text-vishwa-deeprose mb-1">
                          Official Sister Voucher
                        </h4>
                        <p className="text-[11px] text-[#4A1525]/70 mb-4">
                          Redeemable with Harsh at any time!
                        </p>

                        <div className="bg-white/80 p-2.5 rounded-xl border border-pink-300 font-mono text-xs font-bold text-vishwa-deeprose tracking-widest select-all">
                          {coupon.code}
                        </div>
                      </div>

                      <div>
                        {isClaimed ? (
                          <div className="bg-emerald-100 text-emerald-700 font-sans text-xs font-bold py-2 rounded-full border border-emerald-300">
                            ✓ Claimed with Love! 💖
                          </div>
                        ) : (
                          <button
                            onClick={(e) => handleClaim(e, coupon.id)}
                            className="w-full py-2.5 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-xs font-bold shadow-md hover:shadow-pink-glow transition-all"
                          >
                            Claim Coupon Now 💖
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

