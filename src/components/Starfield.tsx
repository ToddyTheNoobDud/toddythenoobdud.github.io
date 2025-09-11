import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  type: "star" | "nebula" | "galaxy";
  color: string;
  baseOpacity: number; // new: base opacity (very low)
  opacity: number;
  twinkle: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const withAlpha = (color: string, alpha: number) => {
  const a = Math.max(0, Math.min(1, alpha)).toFixed(3);
  if (color.includes("/")) {
    return color.replace(/\/\s*[\d.]+\)/, `/ ${a})`);
  }
  return color.replace(/\)$/, ` / ${a})`);
};

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

    // Resolve brand tokens once to avoid Canvas not parsing CSS var() in gradients
    const rootStyle = getComputedStyle(document.documentElement);
    const brand = rootStyle.getPropertyValue("--brand").trim() || "268 85% 70%";
    const brand2 =
      rootStyle.getPropertyValue("--brand-2").trim() || "320 83% 66%";

    const STAR_COUNT = Math.min(400, Math.floor((width * height) / 8000));

    const initStars = () => {
      const stars: Star[] = [];
      const colors = [
        `hsl(${brand} / 0.9)`,
        `hsl(${brand2} / 0.8)`,
        "hsl(210 100% 80%)", // Blue
        "hsl(270 100% 85%)", // Purple
        "hsl(300 80% 80%)", // Pink
        "hsl(60 100% 90%)", // Yellow
        "hsl(0 0% 95%)", // White
        "hsl(180 80% 85%)", // Cyan
        "hsl(30 100% 85%)", // Orange
      ];

      for (let i = 0; i < STAR_COUNT; i++) {
        // Only stars for minimal performance
        const type: "star" = "star";

        // Simple opacity for stars only
        const baseOpacity = Math.random() * 0.06 + 0.02; // ~0.02 - 0.08

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseOpacity,
          opacity: baseOpacity,
          twinkle: Math.random() * 0.008 + 0.002, // smaller twinkle amplitude
        });
      }
      starsRef.current = stars;
    };

    initStars();

    window.addEventListener("resize", onResize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Minimal background - no heavy gradients
      ctx.fillStyle = "hsl(230 25% 2% / 0.02)";
      ctx.fillRect(0, 0, width, height);

      for (const s of starsRef.current) {
        // Update twinkling based on baseOpacity (keeps overall low brightness)
        const time = Date.now();
        s.opacity =
          Math.max(0.01, s.baseOpacity + Math.sin(time * s.twinkle) * s.baseOpacity * 0.6);

        // Simple star rendering only
        if (s.type === "star") {
          const size = Math.max(0.5, s.z * 1.5);
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Minimal drift
        s.x += 0.02 + s.z * 0.05;

        if (s.x > width + 20) {
          s.x = -20;
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
        "fixed inset-0 z-0 h-full w-full pointer-events-none " +
        (className ?? "")
      }
      aria-hidden="true"
      style={{ background: "transparent" }}
    />
  );
};

export default Starfield;
