import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollFrameSequenceProps {
  frameCount: number;
  framePath: (i: number) => string;
  width?: number;
  height?: number;
  className?: string;
  preloadRange?: number; // How many frames to preload on each side
}

export const ScrollFrameSequence = ({
  frameCount,
  framePath,
  width = 1280,
  height = 720,
  className,
  preloadRange = 30, // Preload 30 frames before/after current
}: ScrollFrameSequenceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(-1);
  const preloadRangeRef = useRef(preloadRange);
  const [loadedCount, setLoadedCount] = useState(0);
  const loadingQueueRef = useRef<Set<number>>(new Set());
  const rafScrollRef = useRef<number>(0);
  const rafDrawRef = useRef<number>(0);

  // Calculate scroll height based on frame count (more natural scrolling)
  const scrollHeight = frameCount * 8; // 8px per frame ≈ 4824px for 603 frames

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current.get(index);

    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    if (currentFrameRef.current === index) return;

    currentFrameRef.current = index;

    // Use requestAnimationFrame for smooth drawing
    if (rafDrawRef.current) cancelAnimationFrame(rafDrawRef.current);

    rafDrawRef.current = requestAnimationFrame(() => {
      const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false for performance
      if (!ctx) return;

      // Preserve canvas size without clearing (drawImage overwrites)
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight,
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    });
  }, []);

  // Load a specific frame with priority
  const loadFrame = useCallback(
    (index: number) => {
      if (index < 0 || index >= frameCount) return;
      if (imagesRef.current.has(index)) return;
      if (loadingQueueRef.current.has(index)) return;

      loadingQueueRef.current.add(index);
      const img = new Image();
      img.decoding = "async"; // Hint for browser

      img.onload = () => {
        loadingQueueRef.current.delete(index);
        imagesRef.current.set(index, img);
        setLoadedCount((prev) => prev + 1);

        // If this is the current frame, draw it
        if (index === currentFrameRef.current) {
          drawFrame(index);
        }
      };

      img.onerror = () => {
        loadingQueueRef.current.delete(index);
        console.warn(`Failed to load frame ${index}`);
      };

      img.src = framePath(index + 1);
    },
    [frameCount, framePath, drawFrame],
  );

  // Preload frames around target index
  const preloadRangeAround = useCallback(
    (targetIndex: number) => {
      const currentPreloadRange = preloadRangeRef.current;
      const start = Math.max(0, targetIndex - currentPreloadRange);
      const end = Math.min(frameCount - 1, targetIndex + currentPreloadRange);

      // Load closest frames first
      for (let i = 0; i <= currentPreloadRange; i++) {
        loadFrame(targetIndex + i);
        loadFrame(targetIndex - i);
      }

      // Then load remaining in range
      for (let i = start; i <= end; i++) {
        if (!imagesRef.current.has(i) && !loadingQueueRef.current.has(i)) {
          loadFrame(i);
        }
      }
    },
    [frameCount, loadFrame],
  );

  const getFrameForScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const scrollable = container.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(progress * (frameCount - 1)),
    );

    return frameIndex;
  }, [frameCount]);

  // Scroll handler with preloading
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      rafScrollRef.current = requestAnimationFrame(() => {
        const frameIndex = getFrameForScroll();

        if (frameIndex !== currentFrameRef.current) {
          drawFrame(frameIndex);
          preloadRangeAround(frameIndex);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafScrollRef.current) cancelAnimationFrame(rafScrollRef.current);
    };
  }, [getFrameForScroll, drawFrame, preloadRangeAround]);

  // Initial load: load first frame and preload around it
  useEffect(() => {
    preloadRangeRef.current = preloadRange;
  }, [preloadRange]);

  // Initial load: load first frame and preload around it
  useEffect(() => {
    // Load first frame immediately
    loadFrame(0);
    preloadRangeAround(0);

    // Gradually load rest in background
    const currentPreloadRange = preloadRangeRef.current;
    const loadRemaining = () => {
      for (
        let i = currentPreloadRange;
        i < frameCount;
        i += currentPreloadRange * 2
      ) {
        setTimeout(() => {
          for (
            let j = i;
            j < Math.min(i + currentPreloadRange, frameCount);
            j++
          ) {
            if (!imagesRef.current.has(j) && !loadingQueueRef.current.has(j)) {
              loadFrame(j);
            }
          }
        }, 100);
      }
    };

    // Start background loading after initial frames are loaded
    const timeout = setTimeout(loadRemaining, 2000);

    return () => clearTimeout(timeout);
  }, [frameCount, loadFrame, preloadRangeAround]);

  // Canvas resize handler (optimized)
  useEffect(() => {
    let resizeTimeout: number;

    const resize = () => {
      // Debounce resize
      if (resizeTimeout) clearTimeout(resizeTimeout);

      resizeTimeout = window.setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5x for performance
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        // Redraw current frame
        if (currentFrameRef.current !== -1) {
          drawFrame(currentFrameRef.current);
        }
      }, 150);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [drawFrame]);

  const progress = Math.round((loadedCount / frameCount) * 100);
  const ready = loadedCount >= Math.min(frameCount, preloadRange * 3); // Show UI once enough frames loaded

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${scrollHeight}px`, position: "relative" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block h-full w-full object-cover"
          style={{ willChange: "transform" }} // GPU acceleration hint
        />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none">
            <div className="flex flex-col items-center gap-3">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Loading {progress}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
