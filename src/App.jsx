import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CONTENT } from './config/content';
import { useKonami } from './hooks/useKonami';
import { triggerGrandFireworks, triggerConfettiBurst } from './utils/confetti';
import { sound } from './utils/audio';

import Cursor from './components/common/Cursor';
import ProgressBar from './components/common/ProgressBar';
import MusicPlayer from './components/common/MusicPlayer';
import EasterEggModal from './components/common/EasterEggModal';

import CinematicLoader from './components/loader/CinematicLoader';
import HeroSection from './components/hero/HeroSection';
import EnvelopeGift from './components/letter/EnvelopeGift';
import VideoSection from './components/video/VideoSection';
import PhotoGallery from './components/gallery/PhotoGallery';
import FoodieUniverse from './components/foodie/FoodieUniverse';
import GiftBoxSection from './components/gift/GiftBoxSection';
import CakeBlowSection from './components/cake/CakeBlowSection';
import MemoriesTimeline from './components/timeline/MemoriesTimeline';
import WishesWall from './components/wishes/WishesWall';
import GrandFinale from './components/finale/GrandFinale';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [easterEgg, setEasterEgg] = useState({ isOpen: false, title: '', message: '', icon: '🎉' });

  // Scroll restoration reset
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Konami Code Easter Egg
  useKonami(() => {
    sound.playChime();
    triggerGrandFireworks(4000);
    setEasterEgg({
      isOpen: true,
      title: "🍕 SECRET FOODIE CODE UNLOCKED! 🍕",
      message: CONTENT.easterEggs.konamiMessage,
      icon: "🍕"
    });
  });

  // Secret 5-click easter egg trigger
  const handleSecretClick = () => {
    sound.playSparkle();
    triggerConfettiBurst(0.5, 0.5);
    setEasterEgg({
      isOpen: true,
      title: "💖 Secret Sister Message From Harsh 💖",
      message: CONTENT.easterEggs.longPressMessage,
      icon: "💌"
    });
  };

  return (
    <div className="relative min-h-screen bg-vishwa-cream text-[#4A1525] selection:bg-vishwa-babypink selection:text-vishwa-deeprose overflow-x-hidden">
      {/* Custom Cursor */}
      <Cursor />

      {/* Scroll Progress Bar */}
      <ProgressBar />

      {/* Floating Music Controls */}
      <MusicPlayer />

      {/* Cinematic Loader */}
      {isLoading && (
        <CinematicLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEgg.isOpen}
        onClose={() => setEasterEgg(prev => ({ ...prev, isOpen: false }))}
        title={easterEgg.title}
        message={easterEgg.message}
        icon={easterEgg.icon}
      />

      {/* Main Content Flow */}
      <main className="relative w-full">
        <HeroSection />
        <EnvelopeGift />
        <VideoSection />
        <PhotoGallery />
        <FoodieUniverse />
        <GiftBoxSection />
        <CakeBlowSection />
        <MemoriesTimeline />
        <WishesWall />
        <GrandFinale onSecretClick={handleSecretClick} />
      </main>
    </div>
  );
}
