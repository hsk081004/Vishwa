import { useState, useRef } from 'react';
import { CONTENT } from '../../config/content';
import { sound } from '../../utils/audio';
import { triggerConfettiBurst } from '../../utils/confetti';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles, Heart } from 'lucide-react';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    sound.playPop();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    sound.playPop();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    sound.playSparkle();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <section id="video-reel" className="relative w-full py-24 bg-gradient-to-b from-vishwa-cream via-[#FFF5F8] to-vishwa-cream overflow-hidden">
      {/* Background Soft Pink Blooms */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-vishwa-babypink/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
          <Film className="w-3.5 h-3.5 text-vishwa-hotpink" />
          {CONTENT.video.badge}
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-2">
          {CONTENT.video.title}
        </h2>

        <p className="font-script text-2xl sm:text-3xl text-vishwa-hotpink mb-4">
          {CONTENT.video.subtitle}
        </p>

        <p className="font-sans text-xs sm:text-sm text-vishwa-deeprose/80 max-w-lg mx-auto mb-10">
          {CONTENT.video.caption}
        </p>

        {/* Cinematic Vintage Frame (Natural Aspect Ratio — Zero Cropping!) */}
        <div className="relative max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border-2 border-vishwa-babypink group">
          {/* Decorative Corner Washi Tapes */}
          <div className="absolute -top-3 left-8 w-16 h-5 bg-[#FFC2D6]/85 rounded-sm shadow-sm -rotate-3 pointer-events-none" />
          <div className="absolute -top-3 right-8 w-16 h-5 bg-[#FF8FB1]/85 rounded-sm shadow-sm rotate-3 pointer-events-none" />

          {/* Video Container (Preserves Native Video Ratio Without Any Cropping) */}
          <div className="relative rounded-2xl overflow-hidden bg-black/90 shadow-inner flex items-center justify-center">
            <video
              ref={videoRef}
              src={CONTENT.video.src}
              playsInline
              loop
              muted={isMuted}
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full max-h-[75vh] object-contain rounded-2xl cursor-pointer"
            />

            {/* Play / Pause Big Center Button Overlay */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white flex items-center justify-center shadow-pink-glow transform hover:scale-110 active:scale-95 transition-transform">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </div>
            )}

            {/* In-Video Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-between opacity-90 transition-opacity">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
                  title={isMuted ? "Unmute Audio" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Under-Video Note / Stamp */}
          <div className="mt-4 flex items-center justify-between text-left px-2">
            <div>
              <span className="font-mono text-[10px] text-vishwa-hotpink font-bold uppercase tracking-wider block">
                {CONTENT.video.date} • LIVE FOOTAGE 🎬
              </span>
              <p className="font-serif text-sm font-bold text-vishwa-deeprose">
                Expression Queen Living Her Best Life
              </p>
            </div>
            <div className="text-2xl animate-bounce">
              👑
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

