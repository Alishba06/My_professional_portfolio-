/**
 * Sound Management & Procedural Cyber Audio Engine
 * Source: specs/001-immersive-ai-portfolio/spec.md (US1) & tasks.md (T023)
 * Uses Web Audio API to procedurally generate ambient hum and futuristic sweeps
 * without external audio asset dependencies.
 */

class CyberAudioEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private muted = false;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public playAmbience(): void {
    if (this.isPlaying) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.04, ctx.currentTime);

      // Low harmonic drone (subtle cyber resonance)
      this.osc1 = ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      // Gentle sub-harmonic
      this.osc2 = ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 note

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
    } catch {
      // Audio autoplay policy or browser restriction fallback
    }
  }

  public playChime(): void {
    const ctx = this.initContext();
    if (!ctx || this.muted) return;

    try {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(440, ctx.currentTime);
      chimeOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.6);

      chimeGain.gain.setValueAtTime(0.06, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);

      chimeOsc.start();
      chimeOsc.stop(ctx.currentTime + 0.85);
    } catch {
      // Ignore audio failure
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.04, this.ctx.currentTime);
    }
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public stop(): void {
    if (!this.isPlaying) return;
    try {
      this.osc1?.stop();
      this.osc2?.stop();
      this.osc1?.disconnect();
      this.osc2?.disconnect();
      this.isPlaying = false;
    } catch {
      // Clean cleanup
    }
  }
}

export const cyberAudio = new CyberAudioEngine();
