import { useState } from 'react';
import { CONTENT } from '../../config/content';
import TiltCard from '../gallery/TiltCard';
import HorizontalScroll from '../gallery/HorizontalScroll';
import ScrapbookBoard from '../gallery/ScrapbookBoard';
import FilmStrip from '../gallery/FilmStrip';
import Lightbox from '../gallery/Lightbox';
import { UtensilsCrossed, Sparkles, LayoutGrid, Film, MoveRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function FoodGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('polaroid'); // 'polaroid' | 'scrapbook' | 'filmstrip' | 'reel'

  const foodPhotos = CONTENT.foodie.photos;

  const handleTabChange = (tab) => {
    sound.playPop();
    setActiveTab(tab);
  };

  return (
    <div id="food-gallery-section" className="relative w-full my-20">
      {/* Lightbox Modal */}
      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {/* Food Gallery Header */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vishwa-blush border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-3">
          <UtensilsCrossed className="w-3.5 h-3.5 text-vishwa-hotpink" />
          Vishu&apos;s Official Food Gallery 🍕🍟
        </div>
        <h3 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-3">
          All 16 Cravings Of Our Expression Queen 🤤
        </h3>
        <p className="font-sans text-xs sm:text-base text-vishwa-deeprose/80 max-w-xl mx-auto">
          Every bite, every dessert, and every late-night feast! Preserved in full natural ratios with 3D tilt, scrapbook dragging, filmstrip reels, and GSAP smooth scrub!
        </p>

        {/* View Switcher Tabs (4 Interactive Gallery Modes) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 flex-wrap">
          <button
            onClick={() => handleTabChange('polaroid')}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'polaroid'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 inline mr-1.5" />
            All 16 Food Polaroids (Natural Ratio)
          </button>

          <button
            onClick={() => handleTabChange('reel')}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'reel'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <MoveRight className="w-3.5 h-3.5 inline mr-1.5" />
            Horizontal Food Reel
          </button>

          <button
            onClick={() => handleTabChange('scrapbook')}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'scrapbook'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            Draggable Food Scrapbook
          </button>

          <button
            onClick={() => handleTabChange('filmstrip')}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'filmstrip'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <Film className="w-3.5 h-3.5 inline mr-1.5" />
            Foodie-Booth Filmstrip
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {activeTab === 'polaroid' && (
          /* Multi-column Masonry — Zero Cropping, Pure Natural Dimensions */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 my-8">
            {foodPhotos.map((photo) => (
              <TiltCard
                key={photo.id}
                photo={photo}
                onSelect={(p) => setSelectedPhoto(p)}
              />
            ))}
          </div>
        )}

        {activeTab === 'reel' && (
          <div className="w-full my-6">
            <HorizontalScroll
              photos={foodPhotos}
              title="Vishu's Foodie Delights in Motion 🍕"
              badge="The Ultimate Food Reel 🤤"
              onSelectPhoto={(p) => setSelectedPhoto(p)}
            />
          </div>
        )}

        {activeTab === 'scrapbook' && (
          <div className="w-full">
            <ScrapbookBoard
              photos={foodPhotos}
              boardTitle="Vishu's Cravings Scrapboard 🍕🍔🍟"
              onSelectPhoto={(p) => setSelectedPhoto(p)}
            />
          </div>
        )}

        {activeTab === 'filmstrip' && (
          <div className="w-full">
            <FilmStrip
              photos={foodPhotos}
              headerTitle="FOODIE MEMORIES • 07.11"
              mainTitle="CRAVINGS QUEEN 🍕"
              footerText="Sponsored with Love by Harsh 💖"
              onSelectPhoto={(p) => setSelectedPhoto(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
