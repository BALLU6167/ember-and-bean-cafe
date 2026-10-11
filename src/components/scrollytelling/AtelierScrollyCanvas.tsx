import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FRAME_PATHS } from '../../data/framesManifest';

interface AtelierScrollyCanvasProps {
  progress: number; // 0 to 1
  onLoadProgress?: (pct: number) => void;
  hideProgressIndicator?: boolean;
}

export const AtelierScrollyCanvas: React.FC<AtelierScrollyCanvasProps> = ({
  progress,
  onLoadProgress,
  hideProgressIndicator = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hasFirstFrame, setHasFirstFrame] = useState<boolean>(false);

  const totalFrames = FRAME_PATHS.length; // 192 frames

  // Update target frame from scroll progress (0 to 1)
  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, progress));
    const target = Math.min(totalFrames - 1, Math.floor(clamped * (totalFrames - 1)));
    targetFrameRef.current = target;
  }, [progress, totalFrames]);

  // High-performance canvas frame renderer
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Clear canvas for pristine, crisp frame rendering
    ctx.clearRect(0, 0, width, height);

    // 3. Find closest loaded frame if target frame isn't completed yet
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

    // 4. Render video frame in full-bleed cover mode (Bright, vibrant & edge-to-edge)
    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      // Full-bleed cover scaling to completely fill viewport brightly
      const scale = Math.max(width / imgW, height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;

      // On 9:16 portrait mobile, frame the appetizing burger & onion rings gracefully
      const isPortrait = height > width;
      const drawX = isPortrait ? (width - drawW) * 0.72 : (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Render frame at full 100% brightness
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    ctx.restore();
  }, [totalFrames]);

  // Buttery requestAnimationFrame lerp loop
  useEffect(() => {
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.18; // Smooth liquid dampening
        const frameToDraw = Math.round(currentFrameRef.current);
        renderFrame(frameToDraw);
      } else if (Math.round(current) !== target) {
        currentFrameRef.current = target;
        renderFrame(target);
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
  }, [renderFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Preload frames eagerly with priority on first frames
  useEffect(() => {
    let isMounted = true;
    imagesRef.current = new Array(totalFrames).fill(null);

    // 1. Immediately load frame 0 for zero-latency initial view
    const firstImg = new Image();
    firstImg.src = FRAME_PATHS[0];
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      setHasFirstFrame(true);
      renderFrame(0);
    };

    // 2. Load remaining frames with progress notification
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
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#060504] pointer-events-none z-0">
      {/* Background soft volcanic glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(229, 138, 43, 0.035) 0%, rgba(198, 161, 91, 0.02) 40%, transparent 80%)',
        }}
      />

      {/* Main Hardware-Accelerated Canvas (High contrast & vibrant saturation matching Image 2) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10 transition-opacity duration-700"
        style={{
          opacity: hasFirstFrame ? 1 : 0,
          filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
        }}
      />

      {/* Optional minimal progress indicator */}
      {!hideProgressIndicator && progressPercent < 90 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-[#0C0A09]/80 backdrop-blur-md border border-[#C6A15B]/20 text-[#E8E3D9]/60 text-[10px] font-mono tracking-widest uppercase shadow-2xl">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E58A2B] animate-pulse" />
          <span>Calibrating Mastercraft Sequence</span>
          <span className="text-[#F5F2EB] font-bold">{progressPercent}%</span>
        </div>
      )}
    </div>
  );
};
