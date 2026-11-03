import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto prompt or start on first user interaction
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        sound.startBGM();
        setIsPlaying(true);
      }
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);

  const handleToggleMusic = () => {
    sound.playPop();
    const active = sound.toggleBGM();
    setIsPlaying(active);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playPop();
  };

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
      <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-3 shadow-lg border border-pink-200/60 bg-white/80">
        {/* Animated wave / visualizer */}
        <button
          onClick={handleToggleMusic}
          className="flex items-center gap-2 text-xs font-semibold text-vishwa-deeprose hover:text-vishwa-hotpink transition-colors focus:outline-none"
          title={isPlaying ? "Pause Birthday Piano BGM" : "Play Birthday Piano BGM"}
        >
          <div className="w-6 h-6 rounded-full bg-vishwa-blush flex items-center justify-center text-vishwa-hotpink">
            <Music className="w-3.5 h-3.5" />
          </div>

          <span className="hidden sm:inline font-sans text-xs tracking-wide">
            {isPlaying ? "Birthday Melody" : "Play Melody"}
          </span>

          {isPlaying && (
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-3 bg-vishwa-hotpink animate-pulse" />
              <span className="w-0.5 h-2 bg-vishwa-rose animate-bounce" />
              <span className="w-0.5 h-3.5 bg-vishwa-hotpink animate-pulse" />
            </div>
          )}
        </button>

        <div className="w-[1px] h-4 bg-pink-200" />

        {/* Mute/Unmute */}
        <button
          onClick={handleToggleMute}
          className="text-vishwa-deeprose/70 hover:text-vishwa-hotpink transition-colors p-1"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-vishwa-hotpink" />}
        </button>
      </div>
    </div>
  );
}

