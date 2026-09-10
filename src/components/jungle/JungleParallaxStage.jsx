import React, { useEffect, useRef } from "react";

/**
 * JungleParallaxStage
 * Renders the multi-plane 2.5D daytime jungle atmosphere:
 * 1. Warm golden godrays
 * 2. 2D Canvas emitting golden pollen/sun-spores with gentle wind physics
 * 3. Hand-drawn SVG hanging vines and monsteras
 * Ultra-performant: Canvas loops bypass React renders; SVG foliage uses compositor transforms.
 */
export default function JungleParallaxStage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 28 glowing golden sun motes
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.25,
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.45) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // Drifting gently upward
      hue: Math.random() > 0.4 ? 48 : 84 // Gold or warm sun-lime
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.speedX + Math.sin(time + p.phase) * 0.3;
        p.y += p.speedY;

        // Wrap around viewport
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulsing glow alpha
        const glow = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.2;
        p.alpha = Math.max(0.1, Math.min(0.8, glow));

        // Draw soft spore mote
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 65%, ${p.alpha})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 95%, 60%, ${p.alpha * 0.5})`);
        grad.addColorStop(1, `hsla(${p.hue}, 95%, 60%, 0)`);

        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="jungle-ambient-stage" aria-hidden="true">
      {/* Sunbeam Light Shafts */}
      <div className="jungle-godray-shaft" />
      <div className="jungle-godray-shaft-secondary" />

      {/* Floating Golden Spores Canvas */}
      <canvas ref={canvasRef} className="jungle-spores-canvas" />

      {/* Hand-Drawn Illustrated Canopy Leaves: Top Left */}
      <div className="jungle-foliage-corner-tl">
        <svg viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {/* Main Branch Vine */}
          <path d="M-20 10 C 60 20, 140 70, 200 130" stroke="#451a03" strokeWidth="10" strokeLinecap="round" />
          <path d="M-20 10 C 60 20, 140 70, 200 130" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
          
          {/* Large Monstera Frond 1 */}
          <g transform="translate(100, 45) rotate(22)">
            <path
              d="M0 0 C 40 -35, 110 -25, 130 35 C 100 75, 45 60, 0 0 Z"
              fill="#22c55e"
              stroke="#0f3822"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Cutouts for monstera look */}
            <path d="M30 5 C 60 -5, 85 20, 30 15" fill="#f7fee7" stroke="#0f3822" strokeWidth="3" />
            <path d="M60 20 C 90 15, 110 40, 60 35" fill="#f7fee7" stroke="#0f3822" strokeWidth="3" />
            {/* Leaf Vein */}
            <path d="M0 0 Q 60 15 125 35" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Tropical Palm Frond 2 */}
          <g transform="translate(15, 75) rotate(-15)">
            <path
              d="M0 0 C 50 -40, 130 -20, 150 40 C 90 70, 30 45, 0 0 Z"
              fill="#38a169"
              stroke="#0f3822"
              strokeWidth="4"
            />
            <path d="M0 0 Q 75 10 145 38" stroke="#14532d" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Hanging Orchid Flower */}
          <g transform="translate(140, 120)">
            <ellipse cx="0" cy="8" rx="8" ry="12" fill="#ec4899" stroke="#831843" strokeWidth="2.5" />
            <ellipse cx="-8" cy="4" rx="7" ry="10" fill="#f472b6" stroke="#831843" strokeWidth="2.5" />
            <ellipse cx="8" cy="4" rx="7" ry="10" fill="#f472b6" stroke="#831843" strokeWidth="2.5" />
            <circle cx="0" cy="4" r="3.5" fill="#facc15" />
          </g>
        </svg>
      </div>

      {/* Hand-Drawn Illustrated Canopy Leaves: Top Right */}
      <div className="jungle-foliage-corner-tr">
        <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {/* Main Branch Vine */}
          <path d="M320 5 C 240 30, 160 85, 100 160" stroke="#451a03" strokeWidth="12" strokeLinecap="round" />
          <path d="M320 5 C 240 30, 160 85, 100 160" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />

          {/* Golden Sunlit Banana Leaf */}
          <g transform="translate(80, 50) rotate(-32)">
            <path
              d="M0 0 C 55 -45, 155 -35, 175 40 C 130 85, 45 60, 0 0 Z"
              fill="#84cc16"
              stroke="#0f3822"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path d="M0 0 Q 80 8 168 38" stroke="#4d7c0f" strokeWidth="4" strokeLinecap="round" />
            <path d="M40 5 L 60 -18" stroke="#4d7c0f" strokeWidth="2.5" />
            <path d="M80 15 L 110 -10" stroke="#4d7c0f" strokeWidth="2.5" />
            <path d="M115 25 L 145 5" stroke="#4d7c0f" strokeWidth="2.5" />
          </g>

          {/* Deep Forest Monstera Leaf */}
          <g transform="translate(130, 105) rotate(10)">
            <path
              d="M0 0 C 35 -30, 95 -20, 115 28 C 85 60, 30 45, 0 0 Z"
              fill="#16a34a"
              stroke="#0f3822"
              strokeWidth="3.5"
            />
            <path d="M25 4 C 50 -4, 70 16, 25 12" fill="#f7fee7" stroke="#0f3822" strokeWidth="2.5" />
            <path d="M0 0 Q 55 10 110 26" stroke="#14532d" strokeWidth="3" />
          </g>

          {/* Tropical Hanging Pod */}
          <g transform="translate(100, 165)">
            <path d="M0 0 Q -5 20 0 35 Q 5 20 0 0" fill="#f97316" stroke="#7c2d12" strokeWidth="2.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
