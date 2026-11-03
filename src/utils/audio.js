// Procedural Web Audio API sound generator
// Zero external audio files required — 100% reliable, zero latency, offline-ready

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingBgm = false;
    this.bgmTimer = null;
    this.melodyNoteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingBgm) {
      this.stopBGM();
    }
    return this.isMuted;
  }

  // Soft envelope note player
  playTone(freq, type = 'sine', duration = 0.4, startTime = 0, gainLevel = 0.15) {
    if (this.isMuted) return;
    this.init();

    const now = this.ctx.currentTime + startTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Smooth ADSR envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Sound Effect: Cute Pop (for buttons, hover, cards)
  playPop() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Sound Effect: Sparkle / Magic Shimmer
  playSparkle() {
    if (this.isMuted) return;
    this.init();
    const notes = [587.33, 739.99, 880, 1174.66, 1479.98, 1760]; // D-maj sparkle
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.45, idx * 0.05, 0.08);
    });
  }

  // Sound Effect: Letter paper rustle / unfolding
  playPaperRustle() {
    if (this.isMuted) return;
    this.init();
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.25);
  }

  // Sound Effect: Candle Extinguished / Gentle Blow
  playBlow() {
    if (this.isMuted) return;
    this.init();
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.5);
  }

  // Sound Effect: Success Chime
  playChime() {
    if (this.isMuted) return;
    this.playTone(523.25, 'sine', 0.3, 0, 0.12); // C5
    this.playTone(659.25, 'sine', 0.35, 0.08, 0.12); // E5
    this.playTone(783.99, 'sine', 0.45, 0.16, 0.14); // G5
    this.playTone(1046.50, 'sine', 0.6, 0.24, 0.15); // C6
  }

  // Background Music: Soft Lofi / Music Box Birthday Melody
  startBGM() {
    if (this.isPlayingBgm) return;
    this.init();
    this.isPlayingBgm = true;

    // Frequencies for "Happy Birthday" (Key of C)
    // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const melody = [
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.6 }, { f: 261.63, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 1.1 }, // Happy Birthday to you
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.6 }, { f: 261.63, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.1 }, // Happy Birthday to you
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 523.25, d: 0.6 }, { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 329.63, d: 0.6 }, { f: 293.66, d: 1.1 }, // Happy Birthday dear Vishu
      { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.25 }, { f: 440.00, d: 0.6 }, { f: 349.23, d: 0.6 }, { f: 392.00, d: 0.6 }, { f: 349.23, d: 1.4 }  // Happy Birthday to you
    ];

    let noteIdx = 0;

    const playNext = () => {
      if (!this.isPlayingBgm || this.isMuted) return;

      const note = melody[noteIdx];
      // Music box soft sine chime + octave harmonic
      this.playTone(note.f, 'sine', note.d * 1.5, 0, 0.08);
      this.playTone(note.f * 2, 'triangle', note.d * 1.2, 0, 0.03);

      // Soft bass harmony on phrase starts
      if (noteIdx % 6 === 0) {
        this.playTone(note.f / 2, 'sine', 1.8, 0, 0.07);
      }

      noteIdx = (noteIdx + 1) % melody.length;
      const delay = (note.d * 750) + (noteIdx === 0 ? 1800 : 80);
      this.bgmTimer = setTimeout(playNext, delay);
    };

    playNext();
  }

  stopBGM() {
    this.isPlayingBgm = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  toggleBGM() {
    if (this.isPlayingBgm) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }
}

export const sound = new SoundEngine();

