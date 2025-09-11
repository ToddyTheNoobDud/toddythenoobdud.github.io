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

    const STAR_COUNT = Math.min(1200, Math.floor((width * height) / 2000));

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

        if (rand < 0.92) type = "star";
        else if (rand < 0.98) type = "nebula";
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

      // Subtle deep space background
      const deepSpaceGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      deepSpaceGrad.addColorStop(0, "hsl(230 25% 2% / 0.15)");
      deepSpaceGrad.addColorStop(0.4, "hsl(240 20% 4% / 0.1)");
      deepSpaceGrad.addColorStop(0.8, "hsl(250 15% 2% / 0.05)");
      deepSpaceGrad.addColorStop(1, "transparent");
      ctx.fillStyle = deepSpaceGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle galaxy core
      const coreGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.4
      );
      coreGrad.addColorStop(0, `hsl(${brand} / 0.08)`);
      coreGrad.addColorStop(0.2, `hsl(${brand2} / 0.06)`);
      coreGrad.addColorStop(0.5, "hsl(270 60% 30% / 0.04)");
      coreGrad.addColorStop(0.8, "hsl(300 40% 20% / 0.02)");
      coreGrad.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebulas
      const nebulaGrad1 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.8,
        0,
        width * 0.15,
        height * 0.8,
        Math.max(width, height) * 0.3
      );
      nebulaGrad1.addColorStop(0, "hsl(300 90% 70% / 0.12)");
      nebulaGrad1.addColorStop(0.6, "hsl(210 80% 60% / 0.08)");
      nebulaGrad1.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad1;
      ctx.fillRect(0, 0, width, height);

      const nebulaGrad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        0,
        width * 0.8,
        height * 0.2,
        Math.max(width, height) * 0.25
      );
      nebulaGrad2.addColorStop(0, "hsl(180 70% 80% / 0.1)");
      nebulaGrad2.addColorStop(0.5, "hsl(200 60% 70% / 0.06)");
      nebulaGrad2.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad2;
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

          // Subtle glow (only if z large or rare chance) but respect low alpha
          if (s.z > 0.6 || Math.random() < 0.01) {
            ctx.shadowBlur = 8 * s.z;
            ctx.shadowColor = withAlpha(s.color, Math.min(0.25, s.opacity * 2));
            ctx.beginPath();
            ctx.arc(s.x, s.y, size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Faint cross for larger stars
          if (s.z > 0.7) {
            ctx.globalAlpha = Math.min(0.7, s.opacity * 0.6);
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(s.x - size * 3, s.y);
            ctx.lineTo(s.x + size * 3, s.y);
            ctx.moveTo(s.x, s.y - size * 3);
            ctx.lineTo(s.x, s.y + size * 3);
            ctx.stroke();
          }
          ctx.restore();
        } else if (s.type === "nebula") {
          const size = s.z * 8 + 5;
          const nebulaGrad = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            size
          );
          nebulaGrad.addColorStop(0, withAlpha(s.color, s.opacity * 0.35));
          nebulaGrad.addColorStop(0.6, withAlpha(s.color, s.opacity * 0.12));
          nebulaGrad.addColorStop(1, "transparent");
          ctx.fillStyle = nebulaGrad;
          ctx.fillRect(s.x - size, s.y - size, size * 2, size * 2);
        } else if (s.type === "galaxy") {
          const size = s.z * 12 + 8;
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(Date.now() * 0.00001);

          const galaxyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
          galaxyGrad.addColorStop(0, withAlpha(s.color, s.opacity * 0.6));
          galaxyGrad.addColorStop(0.3, withAlpha(s.color, s.opacity * 0.18));
          galaxyGrad.addColorStop(1, "transparent");
          ctx.fillStyle = galaxyGrad;

          for (let i = 0; i < 3; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI * 2) / 3);
            ctx.scale(1, 0.3);
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
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
