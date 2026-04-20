import { useEffect, useRef, useState } from "react";

interface ScrollFrameSequenceProps {
  frameCount: number;
  framePath: (i: number) => string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Canvas-based scroll-tied frame sequence (Apple AirPods style).
 * Preloads all frames, then draws the one matching scroll progress
 * within the parent scroll container.
 */
export const ScrollFrameSequence = ({
  frameCount,
  framePath,
  width = 1280,
  height = 720,
  className,
}: ScrollFrameSequenceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const [loaded, setLoaded] = useState(0);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = new Array(frameCount);

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i + 1);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        setLoaded(loadedCount);
        if (loadedCount === 1) drawFrame(0);
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    if (currentFrameRef.current === index) return;
    currentFrameRef.current = index;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // cover-fit
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight,
    );
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    ctx.drawImage(img, x, y, w, h);
  };

  // Resize canvas to viewport
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      currentFrameRef.current = -1;
      drawFrame(getFrameForScroll());
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFrameForScroll = () => {
    const container = containerRef.current;
    if (!container) return 0;
    const rect = container.getBoundingClientRect();
    const scrollable = container.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
    return Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
  };

  // Scroll listener (rAF throttled)
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => drawFrame(getFrameForScroll()));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  const progress = Math.round((loaded / frameCount) * 100);
  const ready = loaded === frameCount;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${frameCount * 4}px`, position: "relative" }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block h-full w-full"
        />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
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
