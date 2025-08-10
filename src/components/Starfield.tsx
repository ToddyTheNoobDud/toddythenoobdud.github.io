
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

    const STAR_COUNT = Math.min(500, Math.floor((width * height) / 5000));

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
    const brand = (rootStyle.getPropertyValue("--brand").trim() || "268 85% 70%");
    const brand2 = (rootStyle.getPropertyValue("--brand-2").trim() || "320 83% 66%");

    window.addEventListener("resize", onResize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Centered gradient glow using design tokens
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, `hsl(${brand} / 0.2)`);
      grad.addColorStop(0.5, `hsl(${brand2} / 0.1)`);
      grad.addColorStop(1, `transparent`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const s of starsRef.current) {
        const size = s.z * 2;
        const alpha = 0.7 + s.z * 0.3;
        ctx.fillStyle = `hsl(${brand2} / ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add twinkling effect
        if (Math.random() < 0.01) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${brand} / 0.8)`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Slow motion for centered feel
        s.x += (0.1 + s.z * 0.2);
        s.y += Math.sin(Date.now() * 0.0001 + s.x * 0.01) * 0.1;
        
        if (s.x > width + 5) {
          s.x = -5;
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
        "absolute inset-0 -z-10 h-full w-full " +
        (className ?? "")
      }
      aria-hidden="true"
    />
  );
};

export default Starfield;
