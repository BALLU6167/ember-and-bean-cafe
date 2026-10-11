// Ambient Sound Generator using Web Audio API (Generates warm vinyl crackle + soft sine drones)
class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private droneOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // Soft Warm Chord Drone (146.83 Hz = D3)
      this.droneOsc = this.ctx.createOscillator();
      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(146.83, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);

      this.droneOsc.connect(filter);
      filter.connect(this.gainNode);
      this.droneOsc.start();

      // Soft Vinyl Crackle Noise
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;
      this.noiseNode.connect(this.gainNode);
      this.noiseNode.start();

      this.isPlaying = true;
    } catch (err) {
      console.warn('Audio synthesis initialized with error:', err);
    }
  }

  public stop() {
    try {
      if (this.droneOsc) {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      }
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      }
      this.isPlaying = false;
    } catch (err) {
      console.warn('Error stopping ambient audio:', err);
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const spatialAudio = new SpatialAudioEngine();
