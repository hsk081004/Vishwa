import confetti from 'canvas-confetti';

const PINK_PALETTE = ['#FFFFFF', '#FFE4EC', '#FFC2D6', '#FF8FB1', '#FF4D8D', '#C2185B', '#FFF0F5'];

// Single celebratory burst
export const triggerConfettiBurst = (x = 0.5, y = 0.6) => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x, y },
    colors: PINK_PALETTE,
    ticks: 250,
    gravity: 0.9,
    scalar: 1.1,
  });
};

// Extravagant fireworks show (for Grand Finale & Cake Blowout)
export const triggerGrandFireworks = (duration = 4000) => {
  const animationEnd = Date.now() + duration;
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.75 },
      colors: PINK_PALETTE,
      ticks: 200,
    });
    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.75 },
      colors: PINK_PALETTE,
      ticks: 200,
    });
  }, 250);
};

// Hearts and stars explosion
export const triggerHeartBurst = (x = 0.5, y = 0.5) => {
  // Use shapes if supported
  confetti({
    particleCount: 50,
    spread: 90,
    origin: { x, y },
    colors: ['#FF4D8D', '#FF8FB1', '#FFC2D6', '#FFFFFF'],
    shapes: ['circle'],
    scalar: 1.3,
  });
};

