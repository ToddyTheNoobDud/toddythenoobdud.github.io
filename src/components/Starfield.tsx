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
        const rand = Math.random();
        let type: "star" | "nebula" | "galaxy";

        if (rand < 0.96) type = "star";
        else if (rand < 0.99) type = "nebula";
        else type = "galaxy";

        // Ultra-low base opacity for subtle cosmic background
        const baseOpacity =
          (type === "star"
            ? Math.random() * 0.05 + 0.01 // stars: ~0.01 - 0.06
            : type === "nebula"
            ? Math.random() * 0.03 + 0.005 // nebula: ~0.005 - 0.035
            : Math.random() * 0.02 + 0.005) // galaxy: ~0.005 - 0.025
        ;

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

      // Simple cosmic background - reduced complexity
      const deepSpaceGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.6
      );
      deepSpaceGrad.addColorStop(0, "hsl(230 25% 2% / 0.08)");
      deepSpaceGrad.addColorStop(0.8, "hsl(240 20% 3% / 0.04)");
      deepSpaceGrad.addColorStop(1, "transparent");
      ctx.fillStyle = deepSpaceGrad;
      ctx.fillRect(0, 0, width, height);

      for (const s of starsRef.current) {
        // Update twinkling based on baseOpacity (keeps overall low brightness)
        const time = Date.now();
        s.opacity =
          Math.max(0.01, s.baseOpacity + Math.sin(time * s.twinkle) * s.baseOpacity * 0.6);

        if (s.type === "star") {
          const size = Math.max(0.5, s.z * 2); // star size
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
          ctx.fill();

          // Simplified glow for performance
          if (s.z > 0.7 && Math.random() < 0.005) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = withAlpha(s.color, Math.min(0.15, s.opacity));
            ctx.beginPath();
            ctx.arc(s.x, s.y, size * 1.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
          ctx.restore();
        } else if (s.type === "nebula") {
          // Simplified nebula
          const size = s.z * 6 + 3;
          const nebulaGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size);
          nebulaGrad.addColorStop(0, withAlpha(s.color, s.opacity * 0.2));
          nebulaGrad.addColorStop(1, "transparent");
          ctx.fillStyle = nebulaGrad;
          ctx.fillRect(s.x - size, s.y - size, size * 2, size * 2);
        } else if (s.type === "galaxy") {
          // Simplified galaxy
          const size = s.z * 8 + 4;
          ctx.save();
          ctx.translate(s.x, s.y);
          
          const galaxyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
          galaxyGrad.addColorStop(0, withAlpha(s.color, s.opacity * 0.3));
          galaxyGrad.addColorStop(1, "transparent");
          ctx.fillStyle = galaxyGrad;
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Slow drift
        s.x += 0.05 + s.z * 0.1;
        s.y += Math.sin(Date.now() * 0.00008 + s.x * 0.008) * 0.05;

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
