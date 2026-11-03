import { CONTENT } from '../../config/content';

export default function FilmStrip({
  onSelectPhoto,
  photos = CONTENT.photos,
  headerTitle = "PHOTO-BOOTH MEMORIES • 07.11",
  mainTitle = "EXPRESSION QUEEN ✨",
  footerText = "Forever Vishu & Harsh 💖"
}) {
  // Take 5 photos for the vintage filmstrip
  const boothPhotos = photos.slice(0, 5);

  return (
    <div className="w-full max-w-md mx-auto my-16 select-none">
      <div className="bg-[#2A0E18] p-4 sm:p-6 rounded-3xl shadow-2xl border-4 border-[#3D1424] relative">
        {/* Sprocket Holes Left */}
        <div className="absolute left-2.5 top-10 bottom-10 flex flex-col justify-between pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 bg-white/30 rounded-sm" />
          ))}
        </div>

        {/* Sprocket Holes Right */}
        <div className="absolute right-2.5 top-10 bottom-10 flex flex-col justify-between pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 bg-white/30 rounded-sm" />
          ))}
        </div>

        {/* Top Header on Strip */}
        <div className="text-center pb-3 border-b border-white/20 mb-4 mx-4">
          <span className="font-mono text-[10px] text-pink-200 tracking-widest block uppercase">
            {headerTitle}
          </span>
          <span className="font-serif text-sm font-bold text-white tracking-wider block">
            {mainTitle}
          </span>
        </div>

        {/* Photo frames — UNTOUCHED ASPECT RATIO, ZERO CROPPING */}
        <div className="space-y-4 px-3">
          {boothPhotos.map((photo, i) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto && onSelectPhoto(photo)}
              className="group relative bg-[#1E0812] p-2.5 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-vishwa-hotpink transition-all"
            >
              <div className="max-h-72 rounded-xl overflow-hidden bg-vishwa-cream/10 p-1 flex items-center justify-center relative">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-auto max-h-68 object-contain rounded-lg group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 text-xs font-mono bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                  #{i + 1} • {photo.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strip Footer */}
        <div className="text-center pt-3 border-t border-white/20 mt-4 mx-4">
          <span className="font-script text-xl text-pink-300">
            {footerText}
          </span>
        </div>
      </div>
    </div>
  );
}
