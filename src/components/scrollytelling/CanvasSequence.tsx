import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FRAME_PATHS } from '../../data/framesManifest';

interface CanvasSequenceProps {
  progress: number; // 0 to 1
  autoPlay?: boolean;
  onLoadProgress?: (pct: number) => void;
}

export const CanvasSequence: React.FC<CanvasSequenceProps> = ({
  progress,
  autoPlay = false,
  onLoadProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const autoPlayFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hasFirstFrame, setHasFirstFrame] = useState<boolean>(false);

  const totalFrames = FRAME_PATHS.length;

  // Target frame based on scroll progress
  useEffect(() => {
    if (!autoPlay) {
      const clamped = Math.max(0, Math.min(1, progress));
      const target = Math.min(totalFrames - 1, Math.floor(clamped * (totalFrames - 1)));
      targetFrameRef.current = target;
    }
  }, [progress, totalFrames, autoPlay]);

  // Render function
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Deep charcoal/indigo void background gradient
    const radialBg = ctx.createRadialGradient(
      width / 2, height / 2, 40,
      width / 2, height / 2, Math.max(width, height) * 0.7
    );
    radialBg.addColorStop(0, '#060a1a'); // Soft desaturated indigo glow
    radialBg.addColorStop(0.45, '#050711');
    radialBg.addColorStop(1, '#050505'); // Pure volcanic charcoal edge
    ctx.fillStyle = radialBg;
    ctx.fillRect(0, 0, width, height);

    // Find closest loaded frame if requested frame isn't loaded yet
    const safeIdx = Math.max(0, Math.min(totalFrames - 1, frameIndex));
    let img = imagesRef.current[safeIdx];
    if (!img || !img.complete) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = imagesRef.current[safeIdx - offset];
        if (prev && prev.complete) {
          img = prev;
          break;
        }
        const next = imagesRef.current[safeIdx + offset];
        if (next && next.complete) {
          img = next;
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Responsive scale to fill void comfortably
      const isMobile = width < 768;
      const baseScale = Math.min(width / imgW, height / imgH);
      const scaleMultiplier = isMobile ? 1.05 : 1.18;
      const drawW = imgW * baseScale * scaleMultiplier;
      const drawH = imgH * baseScale * scaleMultiplier;

      const drawX = (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      // Draw product shot
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Seamless edge-vignette to ensure 100% borderless void blending
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(drawW, drawH) * 0.32,
        width / 2, height / 2, Math.max(width, height) * 0.58
      );
      vignette.addColorStop(0, 'rgba(5, 5, 5, 0)');
      vignette.addColorStop(0.7, 'rgba(5, 5, 5, 0.3)');
      vignette.addColorStop(1, 'rgba(5, 5, 5, 0.95)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.restore();
  }, [totalFrames]);

  // Smooth playback loop
  useEffect(() => {
    let isRunning = true;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!isRunning) return;

      if (autoPlay) {
        // Auto play mode at ~24fps
        const delta = currentTime - lastTime;
        if (delta > 40) { // ~25fps
          autoPlayFrameRef.current = (autoPlayFrameRef.current + 1) % totalFrames;
          renderFrame(autoPlayFrameRef.current);
          lastTime = currentTime;
        }
      } else {
        // Scroll-driven lerp mode
        const target = targetFrameRef.current;
        const current = currentFrameRef.current;
        const diff = target - current;

        if (Math.abs(diff) > 0.05) {
          currentFrameRef.current += diff * 0.22;
          const frameToDraw = Math.round(currentFrameRef.current);
          renderFrame(frameToDraw);
        } else if (Math.round(current) !== target) {
          currentFrameRef.current = target;
          renderFrame(target);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame, autoPlay, totalFrames]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Preload frames
  useEffect(() => {
    let isMounted = true;
    imagesRef.current = new Array(totalFrames).fill(null);

    // Immediately load frame 0 for zero-latency initial hero view
    const firstImg = new Image();
    firstImg.src = FRAME_PATHS[0];
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      setHasFirstFrame(true);
      renderFrame(0);
    };

    let count = 0;
    FRAME_PATHS.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[idx] = img;
        count++;
        setLoadedCount(count);
        if (onLoadProgress) {
          onLoadProgress(Math.round((count / totalFrames) * 100));
        }
        if (idx === 0) {
          renderFrame(0);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
      };
    });

    return () => {
      isMounted = false;
    };
  }, [totalFrames, onLoadProgress, renderFrame]);

  const progressPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#050505] pointer-events-none z-0">
      {/* Background ultra-subtle atmospheric radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 80, 255, 0.04) 0%, rgba(0, 214, 255, 0.02) 40%, transparent 80%)',
        }}
      />

      {/* Main Persistent Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10 transition-opacity duration-700"
        style={{ opacity: hasFirstFrame ? 1 : 0 }}
      />

      {/* Luxury Minimalist Loading Pill */}
      {progressPercent < 90 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/50 text-[11px] font-mono tracking-widest uppercase">
          <div className="w-2 h-2 rounded-full bg-origin-cyan animate-pulse" />
          <span>Calibrating Molecular Sequence</span>
          <span className="text-white/80 font-bold">{progressPercent}%</span>
        </div>
      )}
    </div>
  );
};
