import React, { useEffect, useRef } from "react";
import JungleParallaxStage from "../jungle/JungleParallaxStage";

/**
 * SpatialBackground3D - Sunlit Daytime Jungle Atmosphere
 * Replaces the dark sci-fi background with the warm, sunny 2.5D jungle canopy.
 * Responds to pulseTrigger with warm golden and emerald sunlight flashes.
 */
export default function SpatialBackground3D({ pulseTrigger = 0, pulseType = "cyan" }) {
  const flashRef = useRef(null);

  // Soft celebratory flash on pulse trigger
  useEffect(() => {
    if (!pulseTrigger || !flashRef.current) return;
    const flashEl = flashRef.current;
    const color =
      pulseType === "emerald"
        ? "rgba(34, 197, 94, 0.22)"
        : pulseType === "amber"
        ? "rgba(245, 158, 11, 0.25)"
        : "rgba(254, 240, 138, 0.28)";

    flashEl.style.backgroundColor = color;
    flashEl.style.opacity = "1";

    const timer = setTimeout(() => {
      if (flashEl) {
        flashEl.style.opacity = "0";
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [pulseTrigger, pulseType]);

  return (
    <div
      className="jungle-spatial-bg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(circle at 85% 15%, #fef08a 0%, #ecfccb 35%, #f7fee7 70%)"
      }}
    >
      {/* 2.5D Sunlit Living Parallax Stage (Sunbeams, Canvas Spores, Hanging Foliage) */}
      <JungleParallaxStage />

      {/* Subtle Reaction Flash Overlay */}
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}