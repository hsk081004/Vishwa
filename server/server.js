import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security and middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow 3D canvas, inline data URIs and audio
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Rate limiting for posting wishes
const wishLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 wishes per windowMs
  message: { error: 'Too many wishes sent from this IP, please try again in a bit!' }
});

const WISHES_FILE = path.join(__dirname, 'data', 'wishes.json');

// Helper to read wishes
const getWishes = () => {
  try {
    if (!fs.existsSync(WISHES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(WISHES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading wishes:', err);
    return [];
  }
};

// Helper to save wishes
const saveWishes = (wishes) => {
  try {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving wishes:', err);
    return false;
  }
};

// API: Get all wishes
app.get('/api/wishes', (req, res) => {
  const wishes = getWishes();
  res.json({ success: true, count: wishes.length, data: wishes });
});

// API: Post a new wish
app.post('/api/wishes', wishLimiter, (req, res) => {
  const { name, message, relation = 'Friend 🌸', avatar = '💖', color = '#FFE4EC' } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Please enter your name!' });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Please enter your wish!' });
  }

  // Sanitization & bounds
  const cleanName = name.trim().slice(0, 50);
  const cleanRelation = String(relation).trim().slice(0, 40);
  const cleanMessage = message.trim().slice(0, 500);
  const cleanAvatar = Array.from(String(avatar || '💖'))[0] || '💖';
  const cleanColor = ['#FFE4EC', '#FFF0F5', '#FFC2D6', '#FFF8FA', '#FFFFFF'].includes(color)
    ? color
    : '#FFE4EC';

  const newWish = {
    id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: cleanName,
    relation: cleanRelation,
    message: cleanMessage,
    avatar: cleanAvatar,
    color: cleanColor,
    likes: 1,
    timestamp: new Date().toISOString()
  };

  const wishes = getWishes();
  wishes.unshift(newWish);
  saveWishes(wishes);

  res.status(201).json({ success: true, data: newWish });
});

// API: Like a wish
app.post('/api/wishes/:id/like', (req, res) => {
  const { id } = req.params;
  const wishes = getWishes();
  const wish = wishes.find(w => w.id === id);

  if (!wish) {
    return res.status(404).json({ success: false, error: 'Wish not found' });
  }

  wish.likes = (wish.likes || 0) + 1;
  saveWishes(wishes);

  res.json({ success: true, likes: wish.likes });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), birthdayGirl: 'Vishwa' });
});

// Serve frontend in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🎂 Vishwa Birthday Server running on http://localhost:${PORT}`);
});
