import { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/audio';
import { triggerConfettiBurst, triggerGrandFireworks } from '../../utils/confetti';
import { Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';

const FOOD_EMOJIS = ['🍕', '🍔', '🍟', '🍩', '🧁', '🍨', '🍜'];

export default function CatchFoodGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gameOver, setGameOver] = useState(false);
  const [plateX, setPlateX] = useState(50); // percentage 0 - 100
  const [foodItems, setFoodItems] = useState([]);

  const gameAreaRef = useRef(null);
  const requestRef = useRef(null);
  const plateXRef = useRef(50);

  // Sync ref
  useEffect(() => {
    plateXRef.current = plateX;
  }, [plateX]);

  // Start / Reset Game
  const startGame = () => {
    sound.playPop();
    setScore(0);
    setTimeLeft(25);
    setGameOver(false);
    setFoodItems([]);
    setIsPlaying(true);
  };

  // Keyboard controls
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setPlateX((prev) => Math.max(8, prev - 6));
      } else if (e.key === 'ArrowRight') {
        setPlateX((prev) => Math.min(92, prev + 6));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Mouse / Touch movement on game area
  const handlePointerMove = (e) => {
    if (!isPlaying || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPlateX(Math.max(8, Math.min(92, x)));
  };

  // Game loop: spawn & drop items, check collision
  useEffect(() => {
    if (!isPlaying) return;

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setGameOver(true);
          triggerGrandFireworks(3000);
          sound.playChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Food spawning & physics loop
    let lastSpawn = Date.now();

    const loop = () => {
      const now = Date.now();

      // Spawn item every 600ms
      if (now - lastSpawn > 550) {
        lastSpawn = now;
        const newItem = {
          id: Math.random(),
          emoji: FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)],
          x: Math.random() * 80 + 10, // 10% to 90%
          y: 0,
          speed: 1.2 + Math.random() * 1.0,
        };
        setFoodItems((prev) => [...prev, newItem]);
      }

      // Update positions and check collisions
      setFoodItems((prev) => {
        const nextItems = [];
        const currentPlate = plateXRef.current;

        for (const item of prev) {
          const newY = item.y + item.speed;

          // Check if item reached plate level (y between 82 and 94)
          if (newY >= 82 && newY <= 94) {
            // Check horizontal overlap with plate (width ~18%)
            if (Math.abs(item.x - currentPlate) < 12) {
              sound.playPop();
              setScore((s) => s + 10);
              continue; // Caught! Don't add to nextItems
            }
          }

          // If dropped past bottom without catch
          if (newY < 100) {
            nextItems.push({ ...item, y: newY });
          }
        }
        return nextItems;
      });

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      clearInterval(timer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-vishwa-babypink text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-vishwa-blush text-vishwa-deeprose text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5 text-vishwa-hotpink" />
        Vishu&apos;s Mini-Game
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vishwa-deeprose mb-1">
        Catch The Food! 🍕🎮
      </h3>
      <p className="font-sans text-xs sm:text-sm text-vishwa-deeprose/75 mb-6">
        Move the pink plate using your mouse, touch, or arrow keys to catch falling treats!
      </p>

      {/* Game Stage Area */}
      <div
        ref={gameAreaRef}
        onPointerMove={handlePointerMove}
        className="relative w-full h-[360px] bg-gradient-to-b from-vishwa-cream via-vishwa-blush/30 to-[#FFEBF2] rounded-2xl border-2 border-dashed border-vishwa-babypink overflow-hidden select-none cursor-ew-resize"
      >
        {/* Score & Timer Header */}
        <div className="absolute top-3 inset-x-4 flex justify-between items-center z-10 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-pink-200 text-xs font-bold text-vishwa-deeprose shadow-sm">
            Score: <span className="text-vishwa-hotpink text-sm ml-1 font-mono">{score}</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-pink-200 text-xs font-bold text-vishwa-deeprose shadow-sm">
            Time: <span className="text-vishwa-hotpink text-sm ml-1 font-mono">{timeLeft}s</span>
          </div>
        </div>

        {/* Falling Food Emojis */}
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="absolute text-3xl pointer-events-none transform -translate-x-1/2"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Vishu's Catching Plate */}
        <div
          className="absolute bottom-4 pointer-events-none transform -translate-x-1/2 transition-transform duration-75"
          style={{ left: `${plateX}%` }}
        >
          <div className="w-24 h-7 bg-gradient-to-r from-vishwa-rose via-vishwa-hotpink to-vishwa-deeprose rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white text-xs font-bold">
            🍽️ Vishu
          </div>
        </div>

        {/* Start / Game Over Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20">
            <span className="text-5xl mb-3 animate-bounce">🍕</span>
            <h4 className="font-serif text-xl font-bold text-vishwa-deeprose mb-2">
              Ready to feed the Expression Queen?
            </h4>
            <p className="text-xs text-[#4A1525]/75 max-w-xs mb-4">
              Catch as many pizzas, burgers, and cupcakes as you can in 25 seconds!
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-sm font-bold shadow-pink-glow hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4" />
              Start Game!
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 animate-scale-up">
            <Trophy className="w-12 h-12 text-yellow-500 mb-2 animate-bounce" />
            <h4 className="font-serif text-2xl font-black text-vishwa-deeprose mb-1">
              Foodie Championship Complete! 🏆
            </h4>
            <p className="font-mono text-3xl font-extrabold text-vishwa-hotpink mb-2">
              {score} Points!
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#4A1525] max-w-sm mb-4">
              {score >= 120
                ? "👑 Result: Certified Foodie Legend! Harsh owes you 10 pizzas and a lifetime supply of desserts!"
                : "🍕 Result: Pro Foodie! Not bad Vishu, you definitely earned yourself a midnight food treat!"}
            </p>
            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-sm font-bold shadow-pink-glow hover:scale-105 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

