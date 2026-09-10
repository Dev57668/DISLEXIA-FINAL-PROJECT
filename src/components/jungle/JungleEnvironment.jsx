import React, { useEffect, useRef } from "react";

/**
 * JungleEnvironment - Layered Hand-Drawn Daytime Jungle Scenery
 * 
 * Layers:
 * 1. Sunny Sky Dome with warm radial sunburst & drifting clouds
 * 2. Distant misty canopy mountain ridges & soaring silhouettes
 * 3. Midground ancient banyan trees & flowering jungle vines
 * 4. Fluttering tropical morpho butterflies & subtle sun spores
 * 5. Foreground framing palm fronds & monstera leaves with gentle breeze sway
 * 
 * NOTE: Strict compliance with design brief - ZERO mouse parallax.
 * Motion is coordinated, calm, and performance-optimized.
 */
export default function JungleEnvironment() {
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

    // 36 gentle golden & emerald jungle spores
    const spores = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.38 + 0.18,
      phase: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.4) * 0.35,
      speedY: -Math.random() * 0.38 - 0.18,
      hue: Math.random() > 0.6 ? 46 : Math.random() > 0.3 ? 82 : 135
    }));

    let time = 0;
    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < spores.length; i++) {
        const s = spores[i];
        s.x += s.speedX + Math.sin(time + s.phase) * 0.25;
        s.y += s.speedY;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        const pulse = s.baseAlpha + Math.sin(time * 2 + s.phase) * 0.15;
        const alpha = Math.max(0.08, Math.min(0.7, pulse));

        ctx.beginPath();
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 2.6);
        grad.addColorStop(0, `hsla(${s.hue}, 95%, 65%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(${s.hue}, 90%, 55%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${s.hue}, 90%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(s.x, s.y, s.radius * 2.6, 0, Math.PI * 2);
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
    <div className="jungle-world-scenery" aria-hidden="true">
      {/* 1. SKY DOME: Warm sunny tropical sky with radial sunburst */}
      <div className="sky-dome">
        <div className="sun-core" />
        <div className="sun-radiance" />

        {/* Drifting Hand-Drawn Fluffy Clouds */}
        <div className="clouds-track">
          <div className="storybook-cloud cloud-1" />
          <div className="storybook-cloud cloud-2" />
          <div className="storybook-cloud cloud-3" />
        </div>

        {/* Soft filtered sunbeams / god-rays */}
        <div className="sun-god-rays">
          <div className="god-ray ray-1" />
          <div className="god-ray ray-2" />
          <div className="god-ray ray-3" />
        </div>

        {/* Gliding Bird Silhouettes in light formation */}
        <div className="sky-birds">
          <div className="bird-silhouette bird-1">
            <svg viewBox="0 0 32 14" width="28" height="12" fill="none">
              <path d="M0 10 Q 8 0 16 7 Q 24 0 32 10" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <div className="bird-silhouette bird-2">
            <svg viewBox="0 0 32 14" width="22" height="10" fill="none">
              <path d="M0 10 Q 8 0 16 7 Q 24 0 32 10" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
            </svg>
          </div>
          <div className="bird-silhouette bird-3">
            <svg viewBox="0 0 32 14" width="18" height="8" fill="none">
              <path d="M0 10 Q 8 0 16 7 Q 24 0 32 10" stroke="#78350f" strokeWidth="2" strokeLinecap="round" opacity="0.28" />
            </svg>
          </div>
        </div>

        {/* Hanging Upper Canopy Vines with gentle breeze sway */}
        <div className="hanging-canopy-vines">
          <svg viewBox="0 0 1200 90" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }} fill="none">
            <path d="M0 0 Q 300 70 600 18 T 1200 24" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
            <path d="M0 0 Q 300 70 600 18 T 1200 24" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
            <g className="vine-leaf leaf-a">
              <path d="M220 44 C 200 62, 210 84, 228 80 C 242 75, 238 52, 220 44 Z" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
            </g>
            <g className="vine-leaf leaf-b">
              <path d="M480 28 C 462 46, 470 68, 488 64 C 502 59, 498 36, 480 28 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            </g>
            <g className="vine-leaf leaf-c">
              <path d="M780 20 C 762 38, 770 60, 788 56 C 802 51, 798 28, 780 20 Z" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
            </g>
            <g className="vine-leaf leaf-d">
              <path d="M980 24 C 962 42, 970 65, 988 60 C 1002 55, 998 32, 980 24 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* 2. DISTANT JUNGLE RIDGES: Misty mountains & layered canopy silhouette */}
      <div className="distant-canopy-ridge">
        <svg viewBox="0 0 1440 280" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }} fill="none">
          {/* Farthest Mountain Ridge (Pale Sage Misty Green) */}
          <path
            d="M0 160 Q 200 90 400 130 T 800 100 T 1200 120 T 1440 150 L 1440 280 L 0 280 Z"
            fill="#d9f99d"
            opacity="0.6"
          />
          {/* Middle Canopy Ridge (Soft Jade Green) */}
          <path
            d="M0 190 Q 250 140 500 170 T 950 150 T 1440 180 L 1440 280 L 0 280 Z"
            fill="#a3e635"
            opacity="0.75"
          />
          {/* Near Canopy Tree Tops (Lush Jungle Green with bumpy hand-drawn silhouettes) */}
          <path
            d="M0 220 
               C 50 195, 90 200, 130 220 
               C 180 185, 230 190, 280 220 
               C 340 180, 400 185, 460 225 
               C 520 190, 580 195, 640 225 
               C 700 180, 760 185, 820 220 
               C 890 185, 950 190, 1010 225 
               C 1080 180, 1140 185, 1200 220 
               C 1270 190, 1340 195, 1440 225 
               L 1440 280 L 0 280 Z"
            fill="#4ade80"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* 3. LIGHTWEIGHT CANVAS SPORES */}
      <canvas ref={canvasRef} className="spores-layer" />

      {/* 4. FLUTTERING ILLUSTRATED TROPICAL BUTTERFLIES */}
      <div className="jungle-butterflies" aria-hidden="true">
        {/* Blue Morpho Butterfly */}
        <div className="illustrated-butterfly butterfly-blue">
          <svg viewBox="0 0 70 54" fill="none" className="butterfly-svg">
            {/* Left Forewing & Hindwing */}
            <g className="wing wing-left">
              <path
                d="M35 24 C 28 10, 10 2, 2 12 C -3 20, 8 32, 24 30 C 14 36, 12 48, 22 52 C 30 54, 34 44, 35 34 Z"
                fill="url(#blueMorphoGrad)"
                stroke="#0f172a"
                strokeWidth="1.8"
              />
              <path d="M6 14 C 16 18, 26 24, 34 26" stroke="#e0f2fe" strokeWidth="1" opacity="0.75" />
              <path d="M14 26 C 22 28, 28 32, 33 34" stroke="#e0f2fe" strokeWidth="0.8" opacity="0.6" />
              {/* White edge spots */}
              <circle cx="5" cy="12" r="1.2" fill="#ffffff" />
              <circle cx="8" cy="8" r="1.2" fill="#ffffff" />
              <circle cx="14" cy="5" r="1.2" fill="#ffffff" />
              <circle cx="20" cy="4" r="1.2" fill="#ffffff" />
            </g>
            {/* Right Forewing & Hindwing */}
            <g className="wing wing-right">
              <path
                d="M35 24 C 42 10, 60 2, 68 12 C 73 20, 62 32, 46 30 C 56 36, 58 48, 48 52 C 40 54, 36 44, 35 34 Z"
                fill="url(#blueMorphoGrad)"
                stroke="#0f172a"
                strokeWidth="1.8"
              />
              <path d="M64 14 C 54 18, 44 24, 36 26" stroke="#e0f2fe" strokeWidth="1" opacity="0.75" />
              <path d="M56 26 C 48 28, 42 32, 37 34" stroke="#e0f2fe" strokeWidth="0.8" opacity="0.6" />
              {/* White edge spots */}
              <circle cx="65" cy="12" r="1.2" fill="#ffffff" />
              <circle cx="62" cy="8" r="1.2" fill="#ffffff" />
              <circle cx="56" cy="5" r="1.2" fill="#ffffff" />
              <circle cx="50" cy="4" r="1.2" fill="#ffffff" />
            </g>
            {/* Slender Segmented Body & Antennae */}
            <path d="M35 16 L 35 44" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="35" cy="14" r="2.2" fill="#0f172a" />
            <path d="M34 13 C 30 7, 24 6, 22 8" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M36 13 C 40 7, 46 6, 48 8" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
            <defs>
              <linearGradient id="blueMorphoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="45%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Golden Sunset Swallowtail Butterfly */}
        <div className="illustrated-butterfly butterfly-gold">
          <svg viewBox="0 0 68 56" fill="none" className="butterfly-svg">
            <g className="wing wing-left">
              <path
                d="M34 25 C 26 10, 8 2, 2 13 C -3 22, 10 32, 24 30 C 14 36, 10 46, 16 52 C 20 56, 24 54, 26 44 L 28 54 L 32 40 Z"
                fill="url(#goldSwallowGrad)"
                stroke="#451a03"
                strokeWidth="1.6"
              />
              <path d="M8 15 C 16 20, 24 24, 33 26" stroke="#451a03" strokeWidth="1.4" opacity="0.8" />
              <path d="M14 26 C 22 28, 28 32, 33 34" stroke="#451a03" strokeWidth="1" opacity="0.6" />
              <circle cx="20" cy="46" r="1.6" fill="#38bdf8" />
            </g>
            <g className="wing wing-right">
              <path
                d="M34 25 C 42 10, 60 2, 66 13 C 71 22, 58 32, 44 30 C 54 36, 58 46, 52 52 C 48 56, 44 54, 42 44 L 40 54 L 36 40 Z"
                fill="url(#goldSwallowGrad)"
                stroke="#451a03"
                strokeWidth="1.6"
              />
              <path d="M60 15 C 52 20, 44 24, 35 26" stroke="#451a03" strokeWidth="1.4" opacity="0.8" />
              <path d="M54 26 C 46 28, 40 32, 35 34" stroke="#451a03" strokeWidth="1" opacity="0.6" />
              <circle cx="48" cy="46" r="1.6" fill="#38bdf8" />
            </g>
            <path d="M34 18 L 34 42" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
            <circle cx="34" cy="15" r="2" fill="#451a03" />
            <path d="M33 14 C 29 8, 23 7, 21 9" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M35 14 C 39 8, 45 7, 47 9" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
            <defs>
              <linearGradient id="goldSwallowGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="85%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Emerald Meadow Swallowtail Butterfly */}
        <div className="illustrated-butterfly butterfly-emerald">
          <svg viewBox="0 0 68 54" fill="none" className="butterfly-svg">
            <g className="wing wing-left">
              <path
                d="M34 24 C 26 10, 8 2, 2 12 C -3 20, 8 32, 24 30 C 14 36, 12 48, 22 52 C 30 54, 34 44, 34 34 Z"
                fill="url(#emeraldSwallowGrad)"
                stroke="#064e3b"
                strokeWidth="1.6"
              />
              <path d="M6 14 C 16 18, 26 24, 33 26" stroke="#a7f3d0" strokeWidth="1" opacity="0.8" />
              <circle cx="16" cy="44" r="1.4" fill="#fef08a" />
            </g>
            <g className="wing wing-right">
              <path
                d="M34 24 C 42 10, 60 2, 66 12 C 71 20, 60 32, 44 30 C 54 36, 56 48, 46 52 C 38 54, 34 44, 34 34 Z"
                fill="url(#emeraldSwallowGrad)"
                stroke="#064e3b"
                strokeWidth="1.6"
              />
              <path d="M62 14 C 52 18, 42 24, 35 26" stroke="#a7f3d0" strokeWidth="1" opacity="0.8" />
              <circle cx="52" cy="44" r="1.4" fill="#fef08a" />
            </g>
            <path d="M34 16 L 34 44" stroke="#064e3b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="34" cy="14" r="2" fill="#064e3b" />
            <path d="M33 13 C 29 7, 23 6, 21 8" stroke="#064e3b" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M35 13 C 39 7, 45 6, 47 8" stroke="#064e3b" strokeWidth="1.2" strokeLinecap="round" />
            <defs>
              <linearGradient id="emeraldSwallowGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Gentle Drifting Jungle Leaves */}
      <div className="drifting-leaves-layer" aria-hidden="true">
        <div className="drifting-leaf leaf-1">
          <svg viewBox="0 0 24 16" width="22" height="14" fill="none">
            <path d="M2 8 C 6 2, 18 2, 22 8 C 18 14, 6 14, 2 8 Z" fill="#65a30d" opacity="0.7" />
            <path d="M2 8 L 22 8" stroke="#365314" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
        <div className="drifting-leaf leaf-2">
          <svg viewBox="0 0 24 16" width="18" height="12" fill="none">
            <path d="M2 8 C 6 2, 18 2, 22 8 C 18 14, 6 14, 2 8 Z" fill="#84cc16" opacity="0.65" />
            <path d="M2 8 L 22 8" stroke="#365314" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
        <div className="drifting-leaf leaf-3">
          <svg viewBox="0 0 24 16" width="20" height="13" fill="none">
            <path d="M2 8 C 6 2, 18 2, 22 8 C 18 14, 6 14, 2 8 Z" fill="#eab308" opacity="0.7" />
            <path d="M2 8 L 22 8" stroke="#854d0e" strokeWidth="1" opacity="0.55" />
          </svg>
        </div>
      </div>

      {/* 5. FOREGROUND LUSH TROPICAL VEGETATION: Complete Botanical Leaves & Flowers */}
      <div className="foreground-foliage-left">
        <svg viewBox="0 0 360 420" fill="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Main Arched Jungle Vine */}
          <path d="M-20 80 C 60 110, 160 210, 200 370" stroke="#78350f" strokeWidth="14" strokeLinecap="round" />
          <path d="M-20 80 C 60 110, 160 210, 200 370" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />

          {/* Curling Vine Tendril */}
          <path d="M120 180 C 160 170, 180 200, 160 220 C 140 230, 130 210, 145 195" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Fully Illustrated Monstera Deliciosa Leaf */}
          <g transform="translate(60, 60) rotate(18)">
            {/* Petiole / Leaf Stem connecting to Vine */}
            <path d="M10 8 L -15 35" stroke="#166534" strokeWidth="6" strokeLinecap="round" />
            {/* Complete Monstera Blade with Natural Fenestration Lobes */}
            <path
              d="M10 8 C 45 -40, 140 -35, 195 25 C 215 50, 205 95, 175 135 C 135 170, 65 145, 18 85 C 10 70, 6 35, 10 8 Z"
              fill="#16a34a"
              stroke="#14532d"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Central Midrib */}
            <path d="M10 8 Q 110 50 185 130" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
            {/* Natural Fenestrations / Cutout Slits */}
            <ellipse cx="65" cy="18" rx="14" ry="5" fill="#ecfccb" opacity="0.9" transform="rotate(-30 65 18)" />
            <ellipse cx="115" cy="30" rx="18" ry="6" fill="#ecfccb" opacity="0.9" transform="rotate(-15 115 30)" />
            <ellipse cx="155" cy="65" rx="16" ry="6" fill="#ecfccb" opacity="0.9" transform="rotate(15 155 65)" />
            <ellipse cx="80" cy="75" rx="15" ry="5" fill="#ecfccb" opacity="0.9" transform="rotate(35 80 75)" />
            <ellipse cx="120" cy="100" rx="16" ry="5.5" fill="#ecfccb" opacity="0.9" transform="rotate(45 120 100)" />
            {/* Lateral Veins */}
            <path d="M40 22 Q 70 8 100 2" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M80 40 Q 120 30 160 28" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M110 65 Q 150 68 180 75" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 35 Q 70 65 85 95" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M90 60 Q 110 95 125 120" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Tropical Palm Frond Cluster */}
          <g transform="translate(10, 200) rotate(-8)">
            <path d="M0 0 L 220 50" stroke="#14532d" strokeWidth="5" strokeLinecap="round" />
            {/* Individual Palm Leaflets */}
            <path d="M30 7 Q 60 -30 90 -20 Q 55 12 30 7" fill="#22c55e" stroke="#15803d" strokeWidth="1.8" />
            <path d="M60 14 Q 100 -25 130 -12 Q 90 20 60 14" fill="#16a34a" stroke="#14532d" strokeWidth="1.8" />
            <path d="M100 23 Q 145 -18 175 -2 Q 130 28 100 23" fill="#22c55e" stroke="#15803d" strokeWidth="1.8" />
            <path d="M140 32 Q 185 -5 210 12 Q 170 36 140 32" fill="#16a34a" stroke="#14532d" strokeWidth="1.8" />
            <path d="M40 9 Q 65 45 95 40 Q 65 20 40 9" fill="#15803d" stroke="#14532d" strokeWidth="1.8" />
            <path d="M80 18 Q 115 55 145 46 Q 105 28 80 18" fill="#22c55e" stroke="#15803d" strokeWidth="1.8" />
            <path d="M120 28 Q 160 62 185 52 Q 145 34 120 28" fill="#16a34a" stroke="#14532d" strokeWidth="1.8" />
          </g>

          {/* Complete Blooming Hibiscus Blossom */}
          <g transform="translate(185, 275) rotate(12)">
            {/* 5 Layered Petals */}
            <path d="M0 0 C -25 -20, -35 15, -15 30 C -5 20, 0 10, 0 0" fill="#f43f5e" stroke="#9f1239" strokeWidth="2.5" />
            <path d="M0 0 C -20 -35, 15 -40, 25 -20 C 18 -10, 10 0, 0 0" fill="#fb7185" stroke="#9f1239" strokeWidth="2.5" />
            <path d="M0 0 C 15 -35, 45 -15, 38 10 C 25 8, 12 0, 0 0" fill="#f43f5e" stroke="#9f1239" strokeWidth="2.5" />
            <path d="M0 0 C 35 5, 35 40, 15 42 C 8 30, 0 15, 0 0" fill="#fb7185" stroke="#9f1239" strokeWidth="2.5" />
            <path d="M0 0 C 5 35, -20 45, -28 25 C -18 15, -8 5, 0 0" fill="#e11d48" stroke="#9f1239" strokeWidth="2.5" />
            {/* Golden Stamen & Pollen Tip */}
            <path d="M0 0 Q 15 -18 28 -32" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="-32" r="3.5" fill="#facc15" stroke="#a16207" strokeWidth="1.2" />
            <circle cx="24" cy="-28" r="2" fill="#facc15" />
            <circle cx="21" cy="-22" r="1.8" fill="#facc15" />
            <circle cx="0" cy="0" r="4.5" fill="#881337" />
          </g>
        </svg>
      </div>

      <div className="foreground-foliage-right">
        <svg viewBox="0 0 380 430" fill="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Main Arched Jungle Vine */}
          <path d="M390 60 C 290 100, 180 220, 140 380" stroke="#78350f" strokeWidth="15" strokeLinecap="round" />
          <path d="M390 60 C 290 100, 180 220, 140 380" stroke="#b45309" strokeWidth="7" strokeLinecap="round" />

          {/* Curled Tendril */}
          <path d="M230 180 C 190 190, 180 220, 205 235 C 225 240, 240 220, 220 205" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Fully Illustrated Sunlit Banana Leaf */}
          <g transform="translate(130, 45) rotate(-24)">
            {/* Leaf Stem connecting to Vine */}
            <path d="M0 0 L -25 30" stroke="#4d7c0f" strokeWidth="6" strokeLinecap="round" />
            {/* Full Banana Leaf Blade with Realistic Natural Slits */}
            <path
              d="M0 0 C 80 -65, 220 -45, 260 55 C 240 75, 230 70, 220 85 C 190 115, 175 105, 155 125 C 100 135, 45 95, 0 0 Z"
              fill="#84cc16"
              stroke="#15803d"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Arched Central Rachis */}
            <path d="M0 0 Q 120 18 255 58" stroke="#4d7c0f" strokeWidth="5.5" strokeLinecap="round" />
            {/* Fine Parallel Lateral Leaf Veining */}
            <path d="M35 5 L 65 -25" stroke="#4d7c0f" strokeWidth="2.5" opacity="0.85" />
            <path d="M65 12 L 105 -22" stroke="#4d7c0f" strokeWidth="2.5" opacity="0.85" />
            <path d="M100 18 L 150 -15" stroke="#4d7c0f" strokeWidth="2.5" opacity="0.85" />
            <path d="M140 28 L 195 -5" stroke="#4d7c0f" strokeWidth="2.5" opacity="0.85" />
            <path d="M185 40 L 235 15" stroke="#4d7c0f" strokeWidth="2.5" opacity="0.85" />
            {/* Lower Lateral Veins */}
            <path d="M40 7 L 60 45" stroke="#65a30d" strokeWidth="2.5" opacity="0.85" />
            <path d="M80 15 L 110 65" stroke="#65a30d" strokeWidth="2.5" opacity="0.85" />
            <path d="M125 24 L 160 85" stroke="#65a30d" strokeWidth="2.5" opacity="0.85" />
            <path d="M170 35 L 205 98" stroke="#65a30d" strokeWidth="2.5" opacity="0.85" />
          </g>

          {/* Secondary Heart-Shaped Tropical Pothos Leaf */}
          <g transform="translate(260, 160) rotate(35)">
            <path
              d="M0 0 C 25 -30, 65 -20, 75 10 C 65 40, 20 45, 0 0 Z"
              fill="#22c55e"
              stroke="#14532d"
              strokeWidth="3"
            />
            <path d="M0 0 Q 38 8 72 10" stroke="#15803d" strokeWidth="2.5" />
          </g>

          {/* Hanging Blooming Tropical Orchid Cluster */}
          <g transform="translate(175, 230) rotate(-15)">
            <path d="M0 -30 Q -10 10 5 60" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
            {/* Top Orchid */}
            <g transform="translate(-8, -5)">
              <ellipse cx="0" cy="10" rx="9" ry="14" fill="#ec4899" stroke="#831843" strokeWidth="2.2" />
              <ellipse cx="-10" cy="5" rx="8" ry="12" fill="#f472b6" stroke="#831843" strokeWidth="2.2" />
              <ellipse cx="10" cy="5" rx="8" ry="12" fill="#f472b6" stroke="#831843" strokeWidth="2.2" />
              <circle cx="0" cy="5" r="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            </g>
            {/* Bottom Orchid */}
            <g transform="translate(6, 40) rotate(18)">
              <ellipse cx="0" cy="10" rx="8" ry="13" fill="#f43f5e" stroke="#881337" strokeWidth="2.2" />
              <ellipse cx="-9" cy="4" rx="7" ry="11" fill="#fb7185" stroke="#881337" strokeWidth="2.2" />
              <ellipse cx="9" cy="4" rx="7" ry="11" fill="#fb7185" stroke="#881337" strokeWidth="2.2" />
              <circle cx="0" cy="4" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            </g>
          </g>
        </svg>
      </div>

      <style>{`
        .jungle-world-scenery {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* 1. SKY DOME & SUN */
        .sky-dome {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 55%;
          background: linear-gradient(180deg, #bae6fd 0%, #e0f2fe 50%, #f7fee7 100%);
        }

        .sun-core {
          position: absolute;
          top: 40px;
          right: 120px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, #fef08a 60%, #f59e0b 100%);
          box-shadow: 0 0 50px rgba(245, 158, 11, 0.6), 0 0 100px rgba(254, 240, 138, 0.45);
          animation: sunPulse 6s ease-in-out infinite alternate;
        }

        .sun-radiance {
          position: absolute;
          top: -80px;
          right: 0px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, rgba(254, 240, 138, 0.1) 50%, transparent 75%);
          pointer-events: none;
        }

        @keyframes sunPulse {
          0% { transform: scale(0.96); filter: brightness(1); }
          100% { transform: scale(1.04); filter: brightness(1.1); }
        }

        /* STORYBOOK CLOUDS */
        .clouds-track {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .storybook-cloud {
          position: absolute;
          background: #ffffff;
          border-radius: 999px;
          box-shadow: 0 8px 16px rgba(186, 230, 253, 0.4);
          opacity: 0.88;
        }

        .storybook-cloud::before,
        .storybook-cloud::after {
          content: "";
          position: absolute;
          background: inherit;
          border-radius: 50%;
        }

        .cloud-1 {
          top: 60px;
          left: -180px;
          width: 140px;
          height: 45px;
          animation: cloudDrift 55s linear infinite;
        }
        .cloud-1::before {
          width: 55px;
          height: 55px;
          top: -26px;
          left: 20px;
        }
        .cloud-1::after {
          width: 70px;
          height: 70px;
          top: -36px;
          left: 55px;
        }

        .cloud-2 {
          top: 140px;
          left: -240px;
          width: 190px;
          height: 55px;
          animation: cloudDrift 75s linear infinite 18s;
          opacity: 0.75;
        }
        .cloud-2::before {
          width: 75px;
          height: 75px;
          top: -38px;
          left: 30px;
        }
        .cloud-2::after {
          width: 90px;
          height: 90px;
          top: -46px;
          left: 80px;
        }

        .cloud-3 {
          top: 30px;
          left: -200px;
          width: 160px;
          height: 48px;
          animation: cloudDrift 62s linear infinite 35s;
          opacity: 0.65;
        }
        .cloud-3::before {
          width: 60px;
          height: 60px;
          top: -30px;
          left: 25px;
        }
        .cloud-3::after {
          width: 75px;
          height: 75px;
          top: -40px;
          left: 65px;
        }

        @keyframes cloudDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 350px)); }
        }

        /* GLIDING BIRDS */
        .sky-birds {
          position: absolute;
          top: 90px;
          width: 100%;
        }
        .bird-1 {
          position: absolute;
          left: -50px;
          top: 0;
          animation: birdFly 32s linear infinite 5s;
        }
        .bird-2 {
          position: absolute;
          left: -80px;
          top: 35px;
          animation: birdFly 35s linear infinite 14s;
        }

        @keyframes birdFly {
          0% { transform: translate(0, 0); }
          50% { transform: translate(60vw, 25px); }
          100% { transform: translate(calc(100vw + 100px), 0); }
        }

        /* 2. DISTANT RIDGE */
        .distant-canopy-ridge {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 280px;
        }

        /* 3. SPORES CANVAS */
        .spores-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* 4. ILLUSTRATED TROPICAL BUTTERFLIES */
        .jungle-butterflies {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 15;
        }

        .illustrated-butterfly {
          position: absolute;
          width: 60px;
          height: 48px;
          perspective: 600px;
          filter: drop-shadow(0 6px 12px rgba(15, 23, 42, 0.18));
        }

        .butterfly-blue {
          top: 32%;
          left: 18%;
          animation: butterflyFlightPath1 24s ease-in-out infinite;
        }

        .butterfly-gold {
          top: 46%;
          right: 20%;
          animation: butterflyFlightPath2 28s ease-in-out infinite 6s;
        }

        .butterfly-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .wing-left {
          transform-origin: 35px 26px;
          animation: wingFlapLeft 0.18s ease-in-out infinite alternate;
        }

        .wing-right {
          transform-origin: 35px 26px;
          animation: wingFlapRight 0.18s ease-in-out infinite alternate;
        }

        @keyframes wingFlapLeft {
          0% { transform: rotateY(0deg) scaleX(1); }
          100% { transform: rotateY(70deg) scaleX(0.2); }
        }

        @keyframes wingFlapRight {
          0% { transform: rotateY(0deg) scaleX(1); }
          100% { transform: rotateY(-70deg) scaleX(0.2); }
        }

        @keyframes butterflyFlightPath1 {
          0% { transform: translate(0, 0) rotate(8deg); }
          25% { transform: translate(90px, -55px) rotate(-14deg); }
          50% { transform: translate(190px, 35px) rotate(16deg); }
          75% { transform: translate(95px, 80px) rotate(-6deg); }
          100% { transform: translate(0, 0) rotate(8deg); }
        }

        @keyframes butterflyFlightPath2 {
          0% { transform: translate(0, 0) rotate(-10deg); }
          30% { transform: translate(-85px, 60px) rotate(15deg); }
          60% { transform: translate(-170px, -35px) rotate(-18deg); }
          85% { transform: translate(-65px, -70px) rotate(10deg); }
          100% { transform: translate(0, 0) rotate(-10deg); }
        }

        /* 5. FOREGROUND CORNER FOLIAGE */
        .foreground-foliage-left {
          position: fixed;
          bottom: -40px;
          left: -40px;
          width: 320px;
          height: 380px;
          z-index: 30;
          transform-origin: bottom left;
          animation: foliageSwayLeft 7s ease-in-out infinite alternate;
        }

        .foreground-foliage-right {
          position: fixed;
          bottom: -40px;
          right: -40px;
          width: 340px;
          height: 390px;
          z-index: 30;
          transform-origin: bottom right;
          animation: foliageSwayRight 8s ease-in-out infinite alternate;
        }

        @keyframes foliageSwayLeft {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(2.8deg); }
        }

        @keyframes foliageSwayRight {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-2.5deg); }
        }

        /* SUN GOD RAYS */
        .sun-god-rays {
          position: absolute;
          top: -20px;
          right: 40px;
          width: 550px;
          height: 550px;
          pointer-events: none;
          overflow: hidden;
          opacity: 0.6;
          mix-blend-mode: soft-light;
        }

        .god-ray {
          position: absolute;
          top: 0;
          right: 90px;
          height: 650px;
          transform-origin: top right;
          background: linear-gradient(180deg, rgba(254, 240, 138, 0.45) 0%, rgba(254, 240, 138, 0.12) 60%, transparent 100%);
          border-radius: 999px;
        }

        .ray-1 {
          width: 80px;
          transform: rotate(-35deg);
          animation: rayShimmer1 10s ease-in-out infinite alternate;
        }

        .ray-2 {
          width: 120px;
          transform: rotate(-48deg);
          animation: rayShimmer2 12s ease-in-out infinite alternate 2s;
        }

        .ray-3 {
          width: 65px;
          transform: rotate(-60deg);
          animation: rayShimmer1 14s ease-in-out infinite alternate 4s;
        }

        @keyframes rayShimmer1 {
          0% { opacity: 0.35; transform: rotate(-35deg) scaleX(0.95); }
          100% { opacity: 0.7; transform: rotate(-33deg) scaleX(1.1); }
        }

        @keyframes rayShimmer2 {
          0% { opacity: 0.4; transform: rotate(-48deg) scaleX(1.05); }
          100% { opacity: 0.75; transform: rotate(-50deg) scaleX(0.9); }
        }

        /* HANGING CANOPY VINES */
        .hanging-canopy-vines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          pointer-events: none;
          z-index: 5;
          opacity: 0.8;
          transform-origin: top center;
          animation: vineSway 11s ease-in-out infinite alternate;
        }

        @keyframes vineSway {
          0% { transform: rotate(0deg) translateY(0); }
          100% { transform: rotate(0.6deg) translateY(2px); }
        }

        /* 3RD BUTTERFLY */
        .butterfly-emerald {
          top: 56%;
          left: 30%;
          animation: butterflyFlightPath3 26s ease-in-out infinite 3s;
        }

        @keyframes butterflyFlightPath3 {
          0% { transform: translate(0, 0) rotate(5deg); }
          25% { transform: translate(-100px, -40px) rotate(-12deg); }
          50% { transform: translate(-50px, 60px) rotate(14deg); }
          75% { transform: translate(90px, 15px) rotate(-8deg); }
          100% { transform: translate(0, 0) rotate(5deg); }
        }

        /* DRIFTING LEAVES */
        .drifting-leaves-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 4;
        }

        .drifting-leaf {
          position: absolute;
        }

        .leaf-1 {
          top: -20px;
          left: 12%;
          animation: leafFall1 24s linear infinite 2s;
        }

        .leaf-2 {
          top: -20px;
          left: 68%;
          animation: leafFall2 28s linear infinite 9s;
        }

        .leaf-3 {
          top: -20px;
          left: 38%;
          animation: leafFall1 32s linear infinite 16s;
        }

        @keyframes leafFall1 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.75; }
          90% { opacity: 0.75; }
          100% { transform: translate(110px, 100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes leafFall2 {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translate(-90px, 100vh) rotate(-320deg); opacity: 0; }
        }

        /* REDUCED MOTION SUPPORT */
        @media (prefers-reduced-motion: reduce) {
          .sun-core,
          .cloud-1, .cloud-2, .cloud-3,
          .bird-1, .bird-2, .bird-3,
          .illustrated-butterfly,
          .foreground-foliage-left,
          .foreground-foliage-right,
          .hanging-canopy-vines,
          .drifting-leaf,
          .god-ray {
            animation: none !important;
            transform: none !important;
          }
        }

        @media (max-width: 768px) {
          .foreground-foliage-left,
          .foreground-foliage-right {
            width: 220px;
            height: 260px;
          }
        }
      `}</style>
    </div>
  );
}
