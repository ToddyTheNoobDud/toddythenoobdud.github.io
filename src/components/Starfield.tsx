import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

const Starfield: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const STAR_COUNT = Math.min(400, Math.floor((width * height) / 6000));

    const initStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2,
        });
      }
      starsRef.current = stars;
    };

    initStars();

    // Resolve brand tokens once to avoid Canvas not parsing CSS var() in gradients
    const rootStyle = getComputedStyle(document.documentElement);
    const brand = (rootStyle.getPropertyValue("--brand").trim() || "268 85% 58%");
    const brand2 = (rootStyle.getPropertyValue("--brand-2").trim() || "320 83% 54%");

    window.addEventListener("resize", onResize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Subtle gradient glow using design tokens
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * -0.2,
        0,
        width * 0.5,
        height * 0.2,
        Math.max(width, height)
      );
      grad.addColorStop(0, `hsl(${brand} / 0.12)`);
      grad.addColorStop(1, `transparent`);
      // Background is already from page; we just add a faint hue overlay
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const s of starsRef.current) {
        const size = s.z * 1.5;
        ctx.fillStyle = `hsl(${brand2} / ${0.6 * s.z})` as unknown as string;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();

        // motion
        s.x += (0.15 + s.z * 0.35);
        if (s.x > width + 2) {
          s.x = -2;
          s.y = Math.random() * height;
          s.z = Math.random() * 0.8 + 0.2;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    if (!prefersReducedMotion()) {
      draw();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        "absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--brand)/0.08),transparent_60%),radial-gradient(800px_400px_at_80%_10%,hsl(var(--brand-2)/0.08),transparent_60%)] " +
        (className ?? "")
      }
      aria-hidden="true"
    />
  );
};

export default Starfield;
