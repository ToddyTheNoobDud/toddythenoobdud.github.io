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

      const time = Date.now() * 0.002; // Slow heartbeat rhythm

      // Heartbeat pattern: quick double pulse, then pause
      const heartbeatCycle = time % 4; // 4 second cycle
      let intensity: number;

      if (heartbeatCycle < 0.2) {
        // First beat
        intensity = Math.sin(heartbeatCycle * Math.PI * 5) * 0.8 + 0.2;
      } else if (heartbeatCycle < 0.6) {
        // Brief pause
        intensity = 0.1;
      } else if (heartbeatCycle < 0.8) {
        // Second beat
        intensity = Math.sin((heartbeatCycle - 0.6) * Math.PI * 5) * 0.6 + 0.15;
      } else {
        // Long pause
        intensity = 0.05 + Math.sin(heartbeatCycle * Math.PI * 0.5) * 0.05;
      }

      // Center pulsing gradient
      const centerX = width * 0.5;
      const centerY = height * 0.4;
      const maxRadius = Math.max(width, height) * 0.6;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        maxRadius
      );

      // Purple heartbeat colors
      const purpleIntensity = intensity * 0.3;
      const darkIntensity = intensity * 0.15;

      gradient.addColorStop(0, `hsl(280 70% 60% / ${purpleIntensity})`);
      gradient.addColorStop(0.3, `hsl(290 60% 45% / ${purpleIntensity * 0.7})`);
      gradient.addColorStop(0.6, `hsl(260 40% 25% / ${darkIntensity})`);
      gradient.addColorStop(0.8, `hsl(240 30% 15% / ${darkIntensity * 0.5})`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

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