
import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  type: 'star' | 'nebula' | 'galaxy';
  color: string;
  opacity: number;
  twinkle: number;
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

    // Resolve brand tokens once to avoid Canvas not parsing CSS var() in gradients
    const rootStyle = getComputedStyle(document.documentElement);
    const brand = (rootStyle.getPropertyValue("--brand").trim() || "268 85% 70%");
    const brand2 = (rootStyle.getPropertyValue("--brand-2").trim() || "320 83% 66%");

    const STAR_COUNT = Math.min(800, Math.floor((width * height) / 3000));

    const initStars = () => {
      const stars: Star[] = [];
      const colors = [
        `hsl(${brand} / 0.9)`,
        `hsl(${brand2} / 0.8)`,
        'hsl(210 100% 80%)', // Blue
        'hsl(270 100% 85%)', // Purple  
        'hsl(300 80% 80%)', // Pink
        'hsl(60 100% 90%)', // Yellow
        'hsl(0 0% 95%)', // White
      ];
      
      for (let i = 0; i < STAR_COUNT; i++) {
        const rand = Math.random();
        let type: 'star' | 'nebula' | 'galaxy';
        
        if (rand < 0.85) type = 'star';
        else if (rand < 0.97) type = 'nebula';
        else type = 'galaxy';
        
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2,
          type,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.7 + 0.3,
          twinkle: Math.random() * 0.02 + 0.01,
        });
      }
      starsRef.current = stars;
    };

    // Call initStars after brand variables are defined
    initStars();

    window.addEventListener("resize", onResize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Multiple cosmic gradients for galaxy effect
      const centerGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, 0,
        width * 0.5, height * 0.4, Math.max(width, height) * 0.6
      );
      centerGrad.addColorStop(0, `hsl(${brand} / 0.15)`);
      centerGrad.addColorStop(0.3, `hsl(${brand2} / 0.1)`);
      centerGrad.addColorStop(0.7, 'hsl(270 50% 20% / 0.05)');
      centerGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, width, height);

      // Secondary nebula clouds
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.2, height * 0.7, 0,
        width * 0.2, height * 0.7, Math.max(width, height) * 0.4
      );
      nebulaGrad.addColorStop(0, 'hsl(300 80% 60% / 0.08)');
      nebulaGrad.addColorStop(0.5, 'hsl(210 90% 70% / 0.05)');
      nebulaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      for (const s of starsRef.current) {
        // Update twinkling
        s.opacity = Math.sin(Date.now() * s.twinkle) * 0.3 + 0.7;
        
        if (s.type === 'star') {
          const size = s.z * 1.5;
          ctx.fillStyle = s.color.replace('0.9)', `${s.opacity})`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Distant stars twinkling
          if (Math.random() < 0.008) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = s.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else if (s.type === 'nebula') {
          const size = s.z * 8 + 5;
          const nebulaGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size);
          nebulaGrad.addColorStop(0, s.color.replace('0.8)', `${s.opacity * 0.3})`));
          nebulaGrad.addColorStop(0.6, s.color.replace('0.8)', `${s.opacity * 0.1})`));
          nebulaGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = nebulaGrad;
          ctx.fillRect(s.x - size, s.y - size, size * 2, size * 2);
        } else if (s.type === 'galaxy') {
          const size = s.z * 12 + 8;
          // Draw spiral galaxy
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(Date.now() * 0.00001);
          
          const galaxyGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
          galaxyGrad.addColorStop(0, s.color.replace('0.8)', `${s.opacity * 0.6})`));
          galaxyGrad.addColorStop(0.3, s.color.replace('0.8)', `${s.opacity * 0.2})`));
          galaxyGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = galaxyGrad;
          
          // Create spiral arms
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

        // Slow cosmic drift
        s.x += (0.05 + s.z * 0.1);
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
        "absolute inset-0 -z-10 h-full w-full " +
        (className ?? "")
      }
      aria-hidden="true"
    />
  );
};

export default Starfield;
