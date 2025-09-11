import React, { useEffect, useRef, useCallback, useMemo } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  color: string;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  size: number;
}

const MAX_STARS = 250;

const Starfield: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const lastFrameTimeRef = useRef<number>(Date.now());

  // Memoized color palette - subtle colors for eye comfort
  const colorPalette = useMemo(() => {
    if (typeof window === "undefined") return [];

    const root = getComputedStyle(document.documentElement);
    const brand = root.getPropertyValue("--brand").trim() || "268 45% 50%";
    const brand2 = root.getPropertyValue("--brand-2").trim() || "320 43% 46%";

    return [
      `hsl(${brand} / 0.7)`,
      `hsl(${brand2} / 0.6)`,
      "hsl(210 40% 55% / 0.6)",
      "hsl(270 35% 50% / 0.5)",
      "hsl(300 30% 45% / 0.5)",
      "hsl(180 35% 50% / 0.6)",
      "hsl(0 0% 70% / 0.4)",
      "hsl(240 30% 40% / 0.5)",
    ];
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    return typeof window !== "undefined" &&
           window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Create a single star
  const createStar = useCallback((width: number, height: number): Star => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.1,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      baseOpacity: Math.random() * 0.4 + 0.3,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinklePhase: Math.random() * Math.PI * 2,
      size: Math.random() * 1.2 + 0.3,
    };
  }, [colorPalette]);

  // Initialize star field
  const initStars = useCallback((width: number, height: number) => {
    if (width === 0 || height === 0) return;

    const area = width * height;
    const starCount = Math.min(MAX_STARS, Math.floor(area / 8000));

    starsRef.current = [];
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push(createStar(width, height));
    }
  }, [createStar]);

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
    lastFrameTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Add subtle background
    ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    const stars = starsRef.current;

    for (let i = stars.length - 1; i >= 0; i--) {
      const star = stars[i];

      // Update position
      star.x += star.vx * star.z * 60 * deltaTime;
      star.y += star.vy * star.z * 60 * deltaTime;

      // Wrap around edges
      if (star.x < -10) star.x = width + 10;
      if (star.x > width + 10) star.x = -10;
      if (star.y < -10) star.y = height + 10;
      if (star.y > height + 10) star.y = -10;

      // Calculate twinkle
      const twinkle = Math.sin(currentTime * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
      const opacity = star.baseOpacity * twinkle;

      // Draw star
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = star.color;

      const size = star.size * (0.8 + star.z * 0.4);

      // Main star
      ctx.beginPath();
      ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect (only for brighter stars)
      if (opacity > 0.3 && size > 0.5) {
        ctx.globalAlpha = opacity * 0.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cross effect for larger, brighter stars
      if (size > 1 && opacity > 0.35) {
        ctx.globalAlpha = opacity * 0.5;
        ctx.strokeStyle = star.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(star.x - size * 2.5, star.y);
        ctx.lineTo(star.x + size * 2.5, star.y);
        ctx.moveTo(star.x, star.y - size * 2.5);
        ctx.lineTo(star.x, star.y + size * 2.5);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(render);
  }, [prefersReducedMotion]);

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const setupCanvas = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      // Initialize stars
      initStars(width, height);
    };

    setupCanvas();

    // Start render loop
    if (!prefersReducedMotion) {
      render();
    }

    // Handle resize
    const handleResize = () => {
      setupCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [initStars, render, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 h-full w-full pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
      style={{
        background: "transparent"
      }}
    />
  );
};

export default Starfield;
