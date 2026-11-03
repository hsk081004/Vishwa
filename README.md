# 🎂 Vishwa's Million-Dollar Birthday Website 💖
> *A cinematic, award-winning, Awwwards-level interactive birthday experience for Vishwa (ft. Vishu / Expression Queen 🤗🥺) from her brother Harsh.*

---

## ✨ Overview
A high-performance, single-page, frontend-only interactive web experience built with **React 18 + Vite**, **Three.js / React Three Fiber**, **GSAP (ScrollTrigger)**, and **Tailwind CSS**.

- **No backend or Express server required!** 100% static, lightning fast, and ready for instant **Vercel** deployment with zero configuration.
- **Strict Luxury Palette**: Soft Whites (`#FFFFFF`, `#FFF8FA`), Blushes (`#FFE4EC`), Baby Pinks (`#FFC2D6`), Rose (`#FF8FB1`), Hot Pink (`#FF4D8D`), and Deep Velvet Rose (`#C2185B`).
- **Aspect Ratio Integrity**: All 15 original photos and video are presented with zero cropping in dynamic responsive masonry and interactive galleries.

---

## 🌟 Interactive Features & Website Flow

1. **Preloader & Curtain Reveal**: Smooth percentage counter with filling heart/cake SVG and curtain wipe.
2. **3D Hero Scene**: Floating glossy pink balloons, drifting petals, 3D hearts, central birthday cake, SplitText animated typography, and bouncy floating emojis.
3. **Interactive Opening Letter**: 3D wax heart seal that cracks on tap/drag, unfolds a heartfelt letter from Harsh, and triggers a confetti burst.
4. **Cinematic Video Showcase**: Dedicated player frame highlighting Vishwa's expressions in motion (`vishwa.mp4`).
5. **Multi-Mode Photo Gallery (15 Real Photos)**:
   - Dynamic zero-crop masonry grid
   - 3D Holographic Tilt Cards with interactive glare
   - Horizontal Scroll Reel pinned with GSAP
   - Draggable Scrapbook Board with inertia physics
   - Vintage Photo-Booth Filmstrip
   - Fullscreen Lightbox with keyboard navigation
6. **Foodie Universe 🍕🍔🍰**:
   - 3D orbiting food galaxy (pizza, burger, donut, cupcake, boba)
   - 16-Item Food Gallery with polaroids, reels, scrapbook, and filmstrip
   - Luxury 5-Star Sister Restaurant Menu
   - Interactive "Catch The Food!" mini-game with live score and high-score saving
7. **Interactive Gift Box 🎁**: Tap to blow off the 3D lid with confetti; contains 5 flip coupons with unique redemption codes and claim stamps.
8. **Cake Moment & Candle Blowing 🎂**: 3D tiered cake with real Web Audio microphone breath detection to blow out the candles (plus tap fallback), smoke wisps, and confetti.
9. **Memories Timeline**: Drawn SVG heart path with interactive milestone cards.
10. **Wishes Wall 💌**: Interactive sticky-note bulletin board. Fully frontend-driven with `localStorage` persistence, like counters, avatar pickers, confetti, and pre-seeded wishes.
11. **Grand Finale 🎆**: Fullscreen fireworks cannons, replay scroll, and secret easter eggs (Konami code `↑ ↑ ↓ ↓ ← → ← → B A` and 5-click cake surprise).
12. **Procedural Audio Synthesizer**: 100% offline Web Audio API music-box background melody and sound effects (pop, sparkle, chime, paper rustle, candle blow).

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken static production bundle in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ☁️ Deploy to Vercel (1-Click Direct Deployment)

This repository is optimized as a **standalone frontend Vite application**. Vercel will automatically detect it upon import.

### Steps:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: standalone vite frontend for vishwa birthday"
   git push -u origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** -> **"Project"**.
   - Select your repository: **`hsk081004/Vishwa`**.

3. **Vercel Automatic Configuration**:
   Vercel automatically detects the project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click **"Deploy"**.
   - In less than 1 minute, your site will be live with a global HTTPS URL! 🎉

---

## 📁 Project Structure

```
Vishwa/
├── public/                 # Static assets (photos, media, sound assets)
│   ├── media/             # All 15 Vishwa photos + vishwa.mp4 + food images
│   ├── photo/             # Food images (food1 - food16)
│   └── photos/            # Photos & vector placeholders
├── src/
│   ├── components/
│   │   ├── cake/          # 3D Cake & Mic Candle Blowing
│   │   ├── common/        # Cursor, MusicPlayer, ProgressBar, EasterEggModal
│   │   ├── finale/        # Grand Finale Fireworks
│   │   ├── foodie/        # Foodie Universe, 3D Scene, Menu, CatchGame, FoodGallery
│   │   ├── gallery/       # Multi-mode Photo Gallery (Tilt, Reel, Scrapbook, Filmstrip, Lightbox)
│   │   ├── gift/          # 3D Gift Box & 5 Flip Coupons
│   │   ├── hero/          # 3D Hero Scene & Typography
│   │   ├── letter/        # 3D Wax Seal Opening Letter
│   │   ├── loader/        # Cinematic Preloader
│   │   ├── timeline/      # Memories Timeline
│   │   ├── video/         # Video Showcase Player
│   │   └── wishes/        # LocalStorage-backed Wishes Wall
│   ├── config/
│   │   └── content.js     # Single master config file for all text, photos & wishes
│   ├── hooks/             # Custom hooks (useMicBlow, useKonami)
│   ├── styles/            # Tailwind & CSS custom styles
│   ├── utils/             # Web Audio procedural sound synth & Canvas Confetti
│   ├── App.jsx            # Main App layout & Lenis smooth scrolling
│   └── main.jsx           # Vite entrypoint
├── index.html             # HTML entrypoint
├── package.json           # Frontend dependencies & scripts
├── tailwind.config.js     # Pink + White theme design tokens
├── vite.config.js         # Vite configuration with chunk splitting
├── vercel.json            # Vercel deployment configuration
└── README.md              # Project documentation
```

---

## 💖 Made with Love
Created by **Harsh** for **Vishwa** — Happy Birthday! 🎂✨
