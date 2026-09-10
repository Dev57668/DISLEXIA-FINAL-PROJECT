import React, { useRef, useState } from "react";
import { playHoverTick } from "../../utils/soundEffects";

export default function Card3D({
  children,
  className = "",
  maxTilt = 14,
  scale = 1.02,
  glare = true,
  onClick,
  style = {}
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    isHovered: false
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTransform({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.18,
      isHovered: true
    });
  };

  const handleMouseEnter = () => {
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      isHovered: false
    });
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        ...style
      }}
    >
      <div
        className="card-3d-inner"
        style={{
          transform: transform.isHovered
            ? `rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: transform.isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
          position: "relative",
          width: "100%",
          height: "100%"
        }}
      >
        {children}

        {glare && (
          <div
            className="card-3d-glare"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              borderRadius: "inherit",
              background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`,
              opacity: transform.glareOpacity,
              transition: "opacity 0.3s ease",
              mixBlendMode: "overlay",
              zIndex: 10
            }}
          />
        )}
      </div>
    </div>
  );
}