# 💖 Happy Birthday Vishwa! — Million-Dollar Cinematic Tribute

> **"Dedicated to Vishwa (ft. Vishu / Expression Queen 🤗🥺) — The sweetest foodie and sister from another mother. Crafted with love by Harsh."**

An award-winning (Awwwards-level), cinematic birthday experience featuring Three.js 3D graphics, butter-smooth GSAP animations, Web Audio sound design, interactive foodie games, microphone-enabled candle blowing, and a full-stack birthday wishes wall.

---

## 🎨 Design System: Pink & White Only
- **Primary White**: `#FFFFFF` | **Cream White**: `#FFF8FA`
- **Blush**: `#FFE4EC` | **Baby Pink**: `#FFC2D6`
- **Rose**: `#FF8FB1` | **Hot Pink Accent**: `#FF4D8D`
- **Deep Rose (Text Contrast)**: `#C2185B`
- **Typography**: Editorial Serif (`Playfair Display`), Romantic Script (`Great Vibes`), Geometric Clean Sans (`Plus Jakarta Sans`)

---

## 🚀 Website Flow & Key Features

### 0. 🎂 Cinematic Loader
- Pink-to-cream gradient with an SVG filling heart/cake and real-time percentage counter.
- Curtain-reveal transition powered by GSAP.

### 1. ✨ Hero Section (Three.js Scene)
- Fullscreen 3D scene with glossy pink and pearl balloons, 3D extruded hearts, floating rose petals, and a realistic 3D tiered birthday cake with a flickering candle flame.
- SplitText staggered typography: *"Happy Birthday, Vishwa! 💖"*
- Subtitle: *"7th November — the day the world got 1000x cuter, sweeter, and way more dramatic!"*
- Floating interactive emoji stickers that wobble and pop on click with confetti.

### 2. 💌 Opening Letter (Interactive 3D Envelope Gift)
- Realistic blush envelope with a wax heart seal.
- Click to break the wax seal with audio crackle; flap opens and the heartfelt brother-to-sister letter unfolds smoothly.
- Can be re-folded and re-opened at any time.

### 3. 📸 Photo Gallery (3 Creative Modes)
- **Polaroid Wall**: 3D tilt-on-hover cards with realistic holographic glare, drop shadows, washi tape, and cute stickers.
- **Draggable Scrapbook**: Interactive cork canvas where Vishwa can drag, toss, and arrange photos with physics inertia.
- **Photo-Booth Strip**: Retro vintage photo-strip with sprocket holes, timestamps, and captions.
- **Pinned Horizontal Scrub**: Silky smooth horizontal scroll reel pinned on scroll.
- **Fullscreen Lightbox**: Zoom view with custom tags and captions.

### 4. 🍽️ Foodie Universe (Dedicated to Her Love for Food)
- **3D Food Galaxy**: 3D procedural Donuts with sprinkles, Juicy Burgers, Pizza slices, Boba milk tea, and Cupcakes in orbital rotation.
- **Five-Star Sister Menu**: Luxury restaurant-style menu card (Starters: Hugs 🤗, Main: Endless Love 💖, Dessert: Cake 🎂, Drinks: Happiness 🧋).
- **"Catch the Food!" Mini-Game**: Move Vishwa's plate with mouse/touch or arrow keys to catch falling food items within 25 seconds for high scores and celebratory sister commentary!

### 5. 🎁 Interactive Gift Box
- 3D gift box with satin ribbon. Click to untie; the lid flies off with celebratory fireworks!
- 5 redeemable VIP Sister Coupons (*"Midnight Food Feast 🍕"*, *"Unlimited Venting Session 🤗"*, *"All-Expense Shopping Day 🛍️"*, *"Late Night Ice Cream Drive 🍦"*, *"Get Out Of Drama Free Card 🎟️"*).
- 3D flip card interaction with redemption codes and instant "Claimed with Love" stamp!

### 6. 🎂 Cake Moment (Blow The Candles)
- Realistic 3D birthday cake with lit candles.
- **Microphone breath detection**: Blow directly into your phone/laptop microphone using the Web Audio API to extinguish the flames!
- Friendly tap fallback (*"Blow Candles 🌬️"*) for instant interaction.
- Smoke wisps, celebratory fireworks, confetti explosion, and *"Make a wish, Vishu! ✨"*.
- Relight button to replay anytime.

### 7. 📖 Memories Timeline
- Vertical milestone timeline drawn on scroll with glowing pink path and heart pin.
- Chronicles key chapters (*"The Meeting of Destinies"*, *"The First Food Feud"*, *"Coronation of Expression Queen"*, *"Late Night Deep Rants"*).

### 8. 💌 Wishes Wall (Express Backend)
- Live interactive bulletin board with pastel sticky notes and real-time like counters.
- **REST API**:
  - `GET /api/wishes` — Fetches all wishes.
  - `POST /api/wishes` — Validates, rate-limits, and stores new wishes in `server/data/wishes.json`.
  - `POST /api/wishes/:id/like` — Increments wish heart reactions.

### 9. 🎆 Grand Finale & Easter Eggs
- Fullscreen fireworks and confetti.
- Giant *"We Love You, Vishu! 💖"* statement.
- **Replay The Magic ↻** button that chimes and scrolls back to top.
- **Easter Egg 1 (Konami Code)**: Press `↑ ↑ ↓ ↓ ← → ← → B A` on your keyboard for the *"Ultimate Foodie Explosion"*.
- **Easter Egg 2 (Secret Note)**: Click the floating heart emblem in the footer 5 times to reveal a private note from Harsh.

---

## 🛠️ Project Structure

```
/Vishwa/
├── package.json              # Root scripts (concurrently dev, build, start)
├── README.md                 # Complete documentation
├── server/
│   ├── package.json
│   ├── server.js             # Express REST API + Static production server
│   └── data/
│       └── wishes.json       # Persistent wishes database
└── client/
    ├── package.json
    ├── vite.config.js        # Vite config with manual chunk code-splitting
    ├── tailwind.config.js    # Pink + White design system tokens
    ├── public/
    │   └── photos/           # Photo assets (photo-1.svg through photo-8.svg)
    └── src/
        ├── config/
        │   └── content.js    # Master config (edit all text, photos, messages here!)
        ├── utils/
        │   ├── audio.js      # Procedural Web Audio API sound generator (100% offline)
        │   └── confetti.js   # Canvas confetti and firework cannons
        ├── hooks/
        │   ├── useMicBlow.js # Web Audio microphone breath detection
        │   └── useKonami.js  # Easter egg code detection
        └── components/
            ├── hero/         # Three.js 3D scene & typography
            ├── letter/       # 3D wax seal & unfolding letter
            ├── gallery/      # Polaroid wall, scrapbook & filmstrip
            ├── foodie/       # 3D foodie galaxy, menu & catch game
            ├── gift/         # 3D unboxing & coupon cards
            ├── cake/         # 3D cake blow & mic interaction
            ├── timeline/     # SVG drawn line & memories
            ├── wishes/       # Express REST API wishes board
            └── finale/       # Fireworks, credits & secret modal
```

---

## ⚡ Quick Start (Running Locally)

### 1. Install Dependencies
```bash
# In the root folder:
npm install
npm --prefix server install
npm --prefix client install
```

### 2. Run Development Mode (Client + Server together)
```bash
npm run dev
```
- Frontend runs at: `http://localhost:3000` (proxies `/api` to server)
- Backend runs at: `http://localhost:5000`

### 3. Production Build & Start
```bash
# Build the client into client/dist:
npm run build

# Start the full-stack server (serves build + API):
npm start
```
Open `http://localhost:5000` to experience the website!

---

## 📸 How to Customize Text & Photos

### 1. Editing Text & Details
All copy, messages, coupons, menu items, and timeline milestones are located in a single file:
👉 **`client/src/config/content.js`**

You can modify:
- Names, nicknames, and birthday date.
- The handwritten letter paragraphs from Harsh to Vishwa.
- Coupons and discount codes in the Gift Box.
- The 5-star restaurant menu items.
- Secret easter egg messages.

### 2. Replacing Placeholder Photos With Real Photos
1. Place your real photos in **`client/public/photos/`**:
   - `photo-1.jpg`, `photo-2.jpg`, etc.
2. Open **`client/src/config/content.js`** and update the `src` attributes:
   ```javascript
   {
     id: "photo-1",
     src: "/photos/photo-1.jpg", // update to your photo
     title: "The Golden Smile ✨",
     caption: "Your favorite memory caption here...",
     date: "7th November",
     sticker: "✨",
     tag: "Pure Cuteness"
   }
   ```
3. Run `npm run build` to package the updates.

---

## 🌐 Deployment Guide

### Deploying to Render (Recommended for Full-Stack)
1. Push your repository to GitHub.
2. Log in to [Render](https://render.com) and create a **New Web Service**.
3. Set the following settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm --prefix server install && npm --prefix client install && npm --prefix client run build`
   - **Start Command**: `node server/server.js`
4. Deploy! Render will build the Vite app and serve it directly with the Express REST API.

### Deploying to Railway
1. Create a new project on [Railway](https://railway.app).
2. Connect your GitHub repository.
3. In service settings, set:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Add environment variable `PORT=5000` (Railway injects `PORT` automatically).

### Deploying to Vercel
1. The frontend (`/client`) can be deployed to Vercel directly by selecting `client` as the Root Directory with Framework Preset **Vite**.

---

## 💖 Made for Vishwa with Love by Harsh
*Happy Birthday, Expression Queen! May your year be as radiant and joyful as you are.* 🎂🌸✨

