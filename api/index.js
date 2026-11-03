import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for Vercel serverless environment
let wishesStore = [
  {
    "id": "wish-1",
    "name": "Harsh",
    "relation": "Brother / Crime Partner 🤝",
    "message": "Happy Birthday to my favourite sister from another mother! 🎉 May this year bring you endless plates of momos, pizzas, and dessert. Never stop giving those 10,000 dramatic expressions per minute! Love you to the moon and back Vishu! 💖",
    "avatar": "👑",
    "color": "#FFE4EC",
    "likes": 25,
    "timestamp": "2026-11-07T00:01:00Z"
  },
  {
    "id": "wish-2",
    "name": "The Foodie Squad",
    "relation": "Midnight Snack Crew 🍕",
    "message": "To the girl who can finish a large pizza alone and still ask 'kuch meetha hai kya?' 🍫😂 Happy Birthday Vishu! Keep shining, keep eating, and keep blessing our feeds!",
    "avatar": "🍕",
    "color": "#FFF0F5",
    "likes": 19,
    "timestamp": "2026-11-07T00:15:00Z"
  },
  {
    "id": "wish-3",
    "name": "Aarav & Team",
    "relation": "Forever Gang 🌸",
    "message": "Happiest Birthday Expression Queen! 🥺🤗 You bring so much sunshine, laughter, and drama into all our lives. Stay pure, stay cute, and eat lots of cake today!",
    "avatar": "✨",
    "color": "#FFC2D6",
    "likes": 16,
    "timestamp": "2026-11-07T00:30:00Z"
  },
  {
    "id": "wish-4",
    "name": "Riya",
    "relation": "Bestie 🎀",
    "message": "Vishu babeeeee! Happy 7th November! May your year be as sweet as cupcakes and as vibrant as your smile. We need a massive party treat soon! 🧁💖",
    "avatar": "🎀",
    "color": "#FFE4EC",
    "likes": 13,
    "timestamp": "2026-11-07T01:00:00Z"
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), birthdayGirl: 'Vishwa' });
});

app.get('/api/wishes', (req, res) => {
  res.json({ success: true, count: wishesStore.length, data: wishesStore });
});

app.post('/api/wishes', (req, res) => {
  const { name, message, relation = 'Friend 🌸', avatar = '💖', color = '#FFE4EC' } = req.body;
  if (!name || !message) {
    return res.status(400).json({ success: false, error: 'Name and message required' });
  }

  const cleanAvatar = Array.from(String(avatar || '💖'))[0] || '💖';
  const newWish = {
    id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim().slice(0, 50),
    relation: String(relation).trim().slice(0, 40),
    message: String(message).trim().slice(0, 500),
    avatar: cleanAvatar,
    color,
    likes: 1,
    timestamp: new Date().toISOString()
  };

  wishesStore.unshift(newWish);
  res.status(201).json({ success: true, data: newWish });
});

app.post('/api/wishes/:id/like', (req, res) => {
  const wish = wishesStore.find(w => w.id === req.params.id);
  if (!wish) {
    return res.status(404).json({ success: false, error: 'Wish not found' });
  }
  wish.likes = (wish.likes || 0) + 1;
  res.json({ success: true, likes: wish.likes });
});

export default app;
