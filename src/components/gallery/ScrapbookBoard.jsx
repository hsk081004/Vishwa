import { useState, useRef } from 'react';
import { CONTENT } from '../../config/content';
import { sound } from '../../utils/audio';
import { Sparkles, Move, RotateCcw } from 'lucide-react';

export default function ScrapbookBoard({
  onSelectPhoto,
  photos = CONTENT.photos,
  boardTitle = "Memories of Vishu & Harsh ✨"
}) {
  // Take 6 photos for the scrapbook canvas
  const initialItems = [
    { ...photos[0], x: 40, y: 30, rot: -4, z: 1 },
    { ...photos[1 % photos.length], x: 340, y: 50, rot: 4, z: 2 },
    { ...photos[2 % photos.length], x: 620, y: 30, rot: -3, z: 3 },
    { ...photos[3 % photos.length], x: 80, y: 360, rot: 3, z: 4 },
    { ...photos[4 % photos.length], x: 380, y: 370, rot: -4, z: 5 },
    { ...photos[5 % photos.length], x: 670, y: 340, rot: 2, z: 6 },
  ];

  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const maxZRef = useRef(10);

  const handlePointerDown = (e, id) => {
    e.preventDefault();
    sound.playPop();
    setActiveId(id);
    maxZRef.current += 1;

    const currentItem = items.find(item => item.id === id);
    if (!currentItem) return;

    dragOffsetRef.current = {
      x: e.clientX - currentItem.x,
      y: e.clientY - currentItem.y
    };

    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, z: maxZRef.current } : item
    ));

    const handlePointerMove = (moveEvent) => {
      const newX = moveEvent.clientX - dragOffsetRef.current.x;
      const newY = moveEvent.clientY - dragOffsetRef.current.y;

      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, x: newX, y: newY } : item
      ));
    };

    const handlePointerUp = () => {
      setActiveId(null);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handleReset = () => {
    sound.playPaperRustle();
    setItems(initialItems);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-12">
      {/* Board Controls */}
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-vishwa-hotpink" />
          <span className="font-sans text-xs sm:text-sm font-semibold text-vishwa-deeprose">
            Interactive Scrapbook: Drag &amp; toss photos around! 📌
          </span>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm border border-pink-200 text-xs font-semibold text-vishwa-deeprose hover:bg-vishwa-blush transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Board
        </button>
      </div>

      {/* Cork/Scrapbook Canvas Area */}
      <div className="relative w-full h-[760px] sm:h-[720px] bg-gradient-to-br from-[#FFF8FA] via-[#FFEBF2] to-[#FFDDEB] rounded-3xl border-2 border-dashed border-vishwa-babypink shadow-inner overflow-hidden p-6 select-none">
        {/* Subtle grid pins texture */}
        <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

        {/* Floating stickers on board */}
        <span className="absolute top-8 left-1/2 -translate-x-1/2 font-script text-3xl sm:text-4xl text-vishwa-rose/60 pointer-events-none">
          {boardTitle}
        </span>

        {/* Draggable Photo Items — UNTOUCHED RATIO, ZERO CROPPING */}
        {items.map((item) => (
          <div
            key={item.id}
            onPointerDown={(e) => handlePointerDown(e, item.id)}
            onDoubleClick={() => onSelectPhoto && onSelectPhoto(item)}
            className={`absolute w-52 sm:w-60 bg-white p-3 pb-5 rounded-2xl shadow-xl cursor-grab active:cursor-grabbing border border-pink-100/90 transition-transform ${
              activeId === item.id ? 'scale-105 shadow-2xl ring-2 ring-vishwa-hotpink' : ''
            }`}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              zIndex: item.z,
              transform: `rotate(${item.rot}deg)`,
              touchAction: 'none'
            }}
          >
            {/* Cute Pin/Washi Tape at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#FF8FB1]/70 rounded-sm shadow-sm pointer-events-none" />

            {/* Photo content */}
            <div className="relative max-h-56 rounded-xl overflow-hidden bg-vishwa-cream p-1 border border-pink-100 flex items-center justify-center pointer-events-none">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto max-h-52 object-contain rounded-lg"
                draggable={false}
              />
              <div className="absolute bottom-2 right-2 text-xl">
                {item.sticker}
              </div>
            </div>

            {/* Title */}
            <div className="mt-2.5 text-center pointer-events-none">
              <p className="font-serif text-sm font-bold text-vishwa-deeprose truncate">
                {item.title}
              </p>
              <p className="font-script text-base text-vishwa-hotpink">
                {item.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
