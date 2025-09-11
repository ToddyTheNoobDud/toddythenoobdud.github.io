import React, { useEffect, useRef } from "react";

const HeartbeatEffect: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

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
    };

    window.addEventListener("resize", onResize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const time = Date.now() * 0.0003; // Much slower timing

      // Very slow breathing cycle - 16 seconds total
      const breathCycle = time % 16;
      let intensity: number;

      if (breathCycle < 4) {
        // Fade in to purple (4 seconds)
        intensity = breathCycle / 4; // 0 to 1
      } else if (breathCycle < 8) {
        // Stay purple (4 seconds)
        intensity = 1;
      } else if (breathCycle < 12) {
        // Fade out to dark (4 seconds)
        intensity = 1 - (breathCycle - 8) / 4; // 1 to 0
      } else {
        // Stay dark (4 seconds)
        intensity = 0;
      }

      // Smooth the transitions with easing
      intensity = intensity * intensity * (3 - 2 * intensity);

      // Multiple gradients for better spread
      const gradients = [
        { x: width * 0.2, y: height * 0.3, radius: Math.max(width, height) * 0.4 },
        { x: width * 0.8, y: height * 0.7, radius: Math.max(width, height) * 0.5 },
        { x: width * 0.5, y: height * 0.1, radius: Math.max(width, height) * 0.3 },
        { x: width * 0.1, y: height * 0.8, radius: Math.max(width, height) * 0.35 },
        { x: width * 0.9, y: height * 0.2, radius: Math.max(width, height) * 0.3 }
      ];

      // Draw multiple overlapping gradients for better coverage
      gradients.forEach((grad, index) => {
        const gradient = ctx.createRadialGradient(
          grad.x,
          grad.y,
          0,
          grad.x,
          grad.y,
          grad.radius
        );

        // Very subtle purple breathing effect
        const purpleIntensity = intensity * 0.08; // Much more subtle
        const darkIntensity = intensity * 0.04;

        gradient.addColorStop(0, `hsl(${280 + index * 10} 50% 45% / ${purpleIntensity})`);
        gradient.addColorStop(0.3, `hsl(${290 + index * 8} 45% 35% / ${purpleIntensity * 0.7})`);
        gradient.addColorStop(0.6, `hsl(${270 + index * 5} 35% 25% / ${darkIntensity})`);
        gradient.addColorStop(0.8, `hsl(${260 + index * 3} 25% 18% / ${darkIntensity * 0.5})`);
        gradient.addColorStop(1, "transparent");

        ctx.globalCompositeOperation = 'multiply'; // Blend mode for subtle background effect
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={
        "fixed inset-0 z-10 h-full w-full pointer-events-none " +
        (className ?? "")
      }
      aria-hidden="true"
      style={{ background: "transparent" }}
    />
  );
};

export default HeartbeatEffect;
