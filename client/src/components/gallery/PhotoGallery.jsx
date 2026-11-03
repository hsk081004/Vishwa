import { useState } from 'react';
import { CONTENT } from '../../config/content';
import TiltCard from './TiltCard';
import HorizontalScroll from './HorizontalScroll';
import ScrapbookBoard from './ScrapbookBoard';
import FilmStrip from './FilmStrip';
import Lightbox from './Lightbox';
import { Camera, Sparkles, LayoutGrid, Film } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('polaroid'); // 'polaroid' | 'scrapbook' | 'filmstrip'

  const handleTabChange = (tab) => {
    sound.playPop();
    setActiveTab(tab);
  };

  return (
    <section id="gallery" className="relative w-full py-24 bg-gradient-to-b from-vishwa-cream via-white to-vishwa-cream overflow-hidden">
      {/* Lightbox Modal */}
      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vishwa-blush border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
          <Camera className="w-3.5 h-3.5 text-vishwa-hotpink" />
          The Star of the Show 📸
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-4">
          All 15 Faces of Expression Queen 💖
        </h2>
        <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80 max-w-xl mx-auto">
          From full golden laughs to dramatic pouts, every single memory is preserved here in its original uncropped beauty!
        </p>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8">
          <button
            onClick={() => handleTabChange('polaroid')}
            className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'polaroid'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 inline mr-1.5" />
            All 15 Polaroids (Natural Ratio)
          </button>

          <button
            onClick={() => handleTabChange('scrapbook')}
            className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'scrapbook'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            Draggable Scrapbook
          </button>

          <button
            onClick={() => handleTabChange('filmstrip')}
            className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'filmstrip'
                ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-pink-glow'
                : 'bg-white text-vishwa-deeprose border border-pink-200 hover:bg-vishwa-blush'
            }`}
          >
            <Film className="w-3.5 h-3.5 inline mr-1.5" />
            Photo-Booth Strip
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {activeTab === 'polaroid' && (
          /* Responsive Masonry (columns-1 to columns-4) — Preserves 100% of Natural Height with Zero Cropping */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 my-8">
            {CONTENT.photos.map((photo) => (
              <TiltCard
                key={photo.id}
                photo={photo}
                onSelect={(p) => setSelectedPhoto(p)}
              />
            ))}
          </div>
        )}

        {activeTab === 'scrapbook' && (
          <ScrapbookBoard onSelectPhoto={(p) => setSelectedPhoto(p)} />
        )}

        {activeTab === 'filmstrip' && (
          <FilmStrip onSelectPhoto={(p) => setSelectedPhoto(p)} />
        )}
      </div>

      {/* Pinned Horizontal Scrub Gallery */}
      <div className="mt-16">
        <HorizontalScroll onSelectPhoto={(p) => setSelectedPhoto(p)} />
      </div>
    </section>
  );
}
