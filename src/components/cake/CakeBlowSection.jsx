import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/audio';
import { triggerGrandFireworks, triggerHeartBurst } from '../../utils/confetti';
import { useMicBlow } from '../../hooks/useMicBlow';
import { Mic, Wind, Sparkles as SparklesIcon, RotateCcw } from 'lucide-react';
import RealisticCakeView from './RealisticCakeView';
import CanvasErrorBoundary from '../common/CanvasErrorBoundary';

// Helper to check WebGL availability
function checkWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

// 3D Cake with dynamic candle flame
function InteractiveCakeModel({ isLit }) {
  const cakeGroup = useRef();
  const flameGroup = useRef();
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (cakeGroup.current) {
      cakeGroup.current.rotation.y += delta * 0.2;
    }
    if (isLit && flameGroup.current) {
      const t = state.clock.getElapsedTime();
      const flicker = 1 + Math.sin(t * 22) * 0.2 + Math.cos(t * 31) * 0.15;
      flameGroup.current.scale.set(flicker, flicker * 1.3, flicker);
      if (lightRef.current) {
        lightRef.current.intensity = 2.2 + Math.sin(t * 18) * 0.5;
      }
    }
  });

  return (
    <group ref={cakeGroup} position={[0, -0.6, 0]}>
      {/* Tier 1 (Base) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.7, 36]} />
        <meshStandardMaterial color="#FFE4EC" roughness={0.3} />
      </mesh>
      {/* Frosting Border */}
      <mesh position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.48, 0.08, 16, 36]} />
        <meshStandardMaterial color="#FF8FB1" roughness={0.2} />
      </mesh>

      {/* Tier 2 (Middle) */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.7, 36]} />
        <meshStandardMaterial color="#FFF8FA" roughness={0.3} />
      </mesh>
      {/* Frosting Border */}
      <mesh position={[0, 1.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.08, 0.07, 16, 36]} />
        <meshStandardMaterial color="#FFC2D6" roughness={0.2} />
      </mesh>

      {/* Candle 1 (Center) */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
        <meshStandardMaterial color="#FF4D8D" roughness={0.2} />
      </mesh>
      {/* Wick */}
      <mesh position={[0, 1.83, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <meshBasicMaterial color="#222222" />
      </mesh>

      {/* Candle 2 (Left) */}
      <mesh position={[-0.45, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
        <meshStandardMaterial color="#FF8FB1" roughness={0.2} />
      </mesh>

      {/* Candle 3 (Right) */}
      <mesh position={[0.45, 1.45, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 16]} />
        <meshStandardMaterial color="#FFC2D6" roughness={0.2} />
      </mesh>

      {/* Glowing Flames (Shown if isLit) */}
      {isLit ? (
        <group ref={flameGroup}>
          {/* Center Flame */}
          <group position={[0, 1.95, 0]}>
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#FF9100" />
            </mesh>
            <pointLight ref={lightRef} color="#FF9E00" intensity={2.5} distance={5} />
          </group>
          {/* Left Flame */}
          <group position={[-0.45, 1.76, 0]}>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#FF9100" />
            </mesh>
          </group>
          {/* Right Flame */}
          <group position={[0.45, 1.76, 0]}>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#FF9100" />
            </mesh>
          </group>
        </group>
      ) : (
        /* Smoke puffs when blown */
        <group position={[0, 1.9, 0]}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#EEEEEE" transparent opacity={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function CakeBlowSection() {
  const [isLit, setIsLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);
  const [webGlSupported] = useState(() => checkWebGLSupport());
  const [webGlFailed, setWebGlFailed] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    // Default to 'realistic' on narrow screens or if WebGL is unavailable to prevent mobile context crash
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || !checkWebGLSupport())) {
      return 'realistic';
    }
    return '3d';
  });

  const handleBlowOut = () => {
    if (!isLit) return;
    setIsLit(false);
    setHasBlown(true);

    sound.playBlow();
    setTimeout(() => sound.playChime(), 300);
    triggerGrandFireworks(4500);
    triggerHeartBurst(0.5, 0.4);
  };

  const handleRelight = () => {
    sound.playSparkle();
    setIsLit(true);
    setHasBlown(false);
  };

  const { isListening, micSupported, errorMsg, startListening, stopListening } =
    useMicBlow(handleBlowOut);

  const show3D = viewMode === '3d' && webGlSupported && !webGlFailed;

  return (
    <section id="cake" className="relative w-full py-24 bg-gradient-to-b from-vishwa-blush/40 via-vishwa-cream to-white overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-vishwa-babypink/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
          <SparklesIcon className="w-3.5 h-3.5 text-vishwa-hotpink" />
          The Birthday Wish Moment
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-3">
          Blow The Candles, Vishu! 🎂✨
        </h2>
        <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80 max-w-md mx-auto mb-4">
          {hasBlown
            ? "Your wish is released into the universe! May all your dreams come true! 💖"
            : "Use your microphone to blow into your phone/mic, or click the blow button!"}
        </p>

        {/* View Mode Switcher (Allows switching between 3D and Ultra-Realistic Cake) */}
        {webGlSupported && !webGlFailed && (
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-pink-200/70 shadow-sm backdrop-blur-md mb-2">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === '3d'
                  ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-sm'
                  : 'text-vishwa-deeprose/70 hover:text-vishwa-deeprose'
              }`}
            >
              ✨ 3D Mode
            </button>
            <button
              type="button"
              onClick={() => setViewMode('realistic')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === 'realistic'
                  ? 'bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white shadow-sm'
                  : 'text-vishwa-deeprose/70 hover:text-vishwa-deeprose'
              }`}
            >
              🎂 Ultra-Realistic
            </button>
          </div>
        )}

        {/* Cake Container */}
        <div className="relative w-full h-[380px] sm:h-[440px] my-2 select-none flex items-center justify-center">
          {show3D ? (
            <CanvasErrorBoundary
              fallback={<RealisticCakeView isLit={isLit} onBlow={handleBlowOut} />}
            >
              <Canvas
                camera={{ position: [0, 1.2, 3.8], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
                onCreated={({ gl }) => {
                  gl.domElement.addEventListener('webglcontextlost', (e) => {
                    e.preventDefault();
                    console.warn('WebGL context lost in Cake section, falling back to realistic cake');
                    setWebGlFailed(true);
                    setViewMode('realistic');
                  });
                }}
              >
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 6, 4]} intensity={1.2} />
                <InteractiveCakeModel isLit={isLit} />
                <Sparkles count={35} scale={6} size={2} opacity={0.4} color="#FF8FB1" />
              </Canvas>
            </CanvasErrorBoundary>
          ) : (
            <RealisticCakeView isLit={isLit} onBlow={handleBlowOut} />
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
          {isLit ? (
            <>
              {/* Manual Tap Fallback */}
              <button
                onClick={handleBlowOut}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-sm font-bold shadow-pink-glow hover:scale-105 active:scale-95 transition-all"
              >
                <Wind className="w-4 h-4" />
                Blow Candles 🌬️
              </button>

              {/* Mic Detection Button */}
              {micSupported && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-sans text-sm font-semibold border transition-all ${
                    isListening
                      ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                      : 'bg-white text-vishwa-deeprose border-pink-200 hover:bg-vishwa-blush'
                  }`}
                >
                  {isListening ? (
                    <>
                      <Mic className="w-4 h-4 text-rose-500 animate-bounce" />
                      Listening for breath... Blow now!
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 text-vishwa-hotpink" />
                      Enable Microphone Blow 🎙️
                    </>
                  )}
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="glass-panel px-6 py-3 rounded-full border border-pink-200 text-sm font-bold text-vishwa-deeprose animate-bounce">
                🎉 Candles Extinguished! Make a Wish! ✨
              </div>
              <button
                onClick={handleRelight}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-vishwa-deeprose font-sans text-xs font-bold border border-pink-200 hover:bg-vishwa-blush shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Relight Candles 🕯️
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
