import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, [role="button"], .interactive, .polaroid-card');
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing loop
    let animId;
    const follow = () => {
      setTrailingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing Soft Halo */}
      <div
        className="pointer-events-none fixed z-[9998] transition-transform duration-75 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 2.2 : isClicked ? 0.8 : 1})`,
        }}
      >
        <div className="w-8 h-8 rounded-full bg-vishwa-hotpink/20 blur-sm border border-vishwa-hotpink/40" />
      </div>

      {/* Main Cursor Core (Cute Glowing Heart / Dot) */}
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-100 ease-out flex items-center justify-center text-xs"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.75 : isHovered ? 1.4 : 1})`,
        }}
      >
        <span className="drop-shadow-[0_0_8px_rgba(255,77,141,0.8)] filter">
          {isHovered ? '💖' : '✨'}
        </span>
      </div>
    </>
  );
}

