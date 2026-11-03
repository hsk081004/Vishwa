import { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import { triggerConfettiBurst, triggerHeartBurst } from '../../utils/confetti';
import { CONTENT } from '../../config/content';
import { MessageSquareHeart, Heart, Send, Sparkles, Plus } from 'lucide-react';

const PASTEL_COLORS = ['#FFE4EC', '#FFF0F5', '#FFC2D6', '#FFF8FA', '#FFFFFF'];
const AVATAR_OPTIONS = ['💖', '🍕', '🌸', '👑', '🎂', '🧁', '✨', '🥺', '🤗'];
const STORAGE_KEY = 'vishwa_birthday_wishes_v3';

export default function WishesWall() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('💖');
  const [color, setColor] = useState('#FFE4EC');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load wishes from localStorage or fall back to default pre-seeded wishes
  useEffect(() => {
    try {
      // Clean up old keys if present
      localStorage.removeItem('vishwa_birthday_wishes_v1');
      localStorage.removeItem('vishwa_birthday_wishes_v2');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any unwanted card ids or names
          const filtered = parsed.filter(
            (w) => w.id !== 'wish-3' && w.id !== 'wish-4' && w.name !== 'Aarav & Team' && w.name !== 'Riya'
          );
          setWishes(filtered);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          setLoading(false);
          return;
        }
      }
      // If nothing saved, initialize with pre-seeded wishes
      const initial = CONTENT.initialWishes || [];
      setWishes(initial);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch (err) {
      console.warn('Could not read from localStorage, using defaults:', err);
      setWishes(CONTENT.initialWishes || []);
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit new wish (frontend-only, persists in localStorage)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please fill in both your name and your wish!');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const newWish = {
        id: `wish-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: name.trim(),
        relation: relation.trim() || 'Friend 🌸',
        message: message.trim(),
        avatar,
        color,
        likes: 0,
        timestamp: new Date().toISOString(),
      };

      sound.playChime();
      triggerConfettiBurst(0.5, 0.5);

      setWishes((prev) => {
        const updated = [newWish, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (storageErr) {
          console.warn('Failed to save wish to localStorage:', storageErr);
        }
        return updated;
      });

      setShowModal(false);
      setName('');
      setRelation('');
      setMessage('');
    } catch (err) {
      setError('Failed to post wish. Please try again!');
    } finally {
      setSubmitting(false);
    }
  };

  // Like a wish (persists in localStorage)
  const handleLike = (e, id) => {
    e.stopPropagation();
    sound.playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );

    setWishes((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Failed to save like to localStorage:', err);
      }
      return updated;
    });
  };

  return (
    <section id="wishes" className="relative w-full py-24 bg-gradient-to-b from-vishwa-blush/30 via-white to-vishwa-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vishwa-blush border border-vishwa-babypink shadow-sm text-xs font-bold text-vishwa-deeprose uppercase tracking-wider mb-4">
            <MessageSquareHeart className="w-3.5 h-3.5 text-vishwa-hotpink" />
            Birthday Wishes Board
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-vishwa-deeprose tracking-tight mb-4">
            Notes of Love for Vishu 💌
          </h2>
          <p className="font-sans text-sm sm:text-base text-vishwa-deeprose/80 mb-6">
            Leave your warmest blessings, funny roasts, or heartfelt love for our Expression Queen!
          </p>

          <button
            onClick={() => {
              sound.playPop();
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-sm font-bold shadow-pink-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            Post Your Birthday Wish 💖
          </button>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="relative p-6 rounded-3xl shadow-lg border border-pink-200/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group select-none"
              style={{ backgroundColor: wish.color || '#FFE4EC' }}
            >
              {/* Top Pin Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/70 rounded-sm shadow-sm opacity-90" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{wish.avatar || '💖'}</span>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-vishwa-deeprose leading-tight">
                        {wish.name}
                      </h4>
                      <span className="font-sans text-[11px] text-[#4A1525]/60 font-medium">
                        {wish.relation}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#4A1525] leading-relaxed tracking-wide mb-6">
                  {wish.message}
                </p>
              </div>

              {/* Bottom Like Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-pink-200/50">
                <span className="font-mono text-[10px] text-vishwa-deeprose/50">
                  {wish.timestamp ? new Date(wish.timestamp).toLocaleDateString() : '7th Nov'}
                </span>

                <button
                  onClick={(e) => handleLike(e, wish.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-vishwa-hotpink text-xs font-bold shadow-sm transition-all active:scale-90"
                >
                  <Heart className="w-3.5 h-3.5 fill-vishwa-hotpink" />
                  <span>{wish.likes || 1}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leave a Wish Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-vishwa-babypink">
            <h3 className="font-serif text-2xl font-bold text-vishwa-deeprose mb-1 text-center">
              Write a Wish for Vishwa 💖
            </h3>
            <p className="font-sans text-xs text-vishwa-deeprose/70 mb-6 text-center">
              Your message will appear on her official birthday wishes wall!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-bold text-vishwa-deeprose uppercase mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harsh / Simran / Rahul"
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-vishwa-hotpink text-sm bg-vishwa-cream/40"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-vishwa-deeprose uppercase mb-1">
                  Relationship / Nickname
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Brother / Food Partner / Best Friend"
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-vishwa-hotpink text-sm bg-vishwa-cream/40"
                />
              </div>

              {/* Emoji Avatar selector */}
              <div>
                <label className="block font-sans text-xs font-bold text-vishwa-deeprose uppercase mb-1">
                  Pick an Avatar
                </label>
                <div className="flex gap-2">
                  {AVATAR_OPTIONS.map((em) => (
                    <button
                      type="button"
                      key={em}
                      onClick={() => setAvatar(em)}
                      className={`text-xl p-1.5 rounded-lg transition-transform ${
                        avatar === em ? 'scale-125 bg-vishwa-blush shadow-sm ring-2 ring-vishwa-hotpink' : 'hover:scale-110'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-vishwa-deeprose uppercase mb-1">
                  Your Birthday Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Happy Birthday Vishu! May your day be filled with happiness and endless food..."
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-vishwa-hotpink text-sm bg-vishwa-cream/40"
                />
              </div>

              {error && (
                <p className="text-xs text-rose-500 font-semibold">{error}</p>
              )}

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-full font-sans text-xs font-semibold text-vishwa-deeprose hover:bg-vishwa-blush"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-vishwa-rose to-vishwa-hotpink text-white font-sans text-xs font-bold shadow-pink-glow hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Posting...' : 'Post Wish 💖'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

