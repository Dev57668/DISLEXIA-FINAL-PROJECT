import React, { useState, useRef, useEffect } from "react";
import { playSynapsePulse } from "../../utils/soundEffects";

/**
 * PipMonkey - Secondary Companion Mascot
 * "Pip the Vine Monkey" - Hand-drawn storybook character perching on a mossy branch.
 * Features cursor-tracking interactive pupils, idle breathing, and joyful wave animation.
 */
export default function PipMonkey({ size = "small", onPipClick = null }) {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const [isWaving, setIsWaving] = useState(false);

  // Subtle natural cursor eye tracking (matching guide animals)
  useEffect(() => {
    let animId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.4;
      targetX = (e.clientX - centerX) / 16;
      targetY = (e.clientY - centerY) / 16;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      // Safe pupil boundary clamp within sclera
      const clampX = Math.max(-3.2, Math.min(3.2, currentX));
      const clampY = Math.max(-3.0, Math.min(3.0, currentY));

      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
        rightPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
      }
      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("pointermove", onPointerMove);
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    playSynapsePulse();
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 900);
    if (onPipClick) onPipClick();
  };

  const scale = size === "large" ? "140px" : size === "medium" ? "115px" : "90px";

  return (
    <div
      ref={containerRef}
      className={`pip-monkey-rig ${isWaving ? "waving" : ""}`}
      style={{
        position: "relative",
        width: scale,
        height: `calc(${scale} * 1.15)`,
        cursor: "pointer",
        userSelect: "none"
      }}
      onClick={handleClick}
      title="Pip the Vine Monkey (Click to Wave!)"
    >
      <svg
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* Subtle Ground Shadow */}
        <ellipse cx="70" cy="152" rx="38" ry="7" fill="#451a03" opacity="0.18" />

        {/* Mossy Jungle Branch Perch */}
        <path
          d="M16 148 Q 70 141 124 148"
          stroke="#5c3815"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Vine Wrapping Branch */}
        <path
          d="M32 149 Q 36 143 42 148 Q 48 152 54 147"
          stroke="#15803d"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="26" cy="144" rx="7" ry="3.5" fill="#22c55e" stroke="#14532d" strokeWidth="1" transform="rotate(-20 26 144)" />
        <ellipse cx="116" cy="144" rx="7" ry="3.5" fill="#22c55e" stroke="#14532d" strokeWidth="1" transform="rotate(25 116 144)" />

        {/* Curly Prehensile Tail */}
        <path
          d="M84 124 C 108 132, 122 108, 108 94 C 98 84, 88 92, 92 100"
          stroke="#451a03"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M84 124 C 108 132, 122 108, 108 94 C 98 84, 88 92, 92 100"
          stroke="#854d0e"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Plump Monkey Body */}
        <ellipse cx="70" cy="112" rx="25" ry="29" fill="#854d0e" stroke="#451a03" strokeWidth="3" />
        <ellipse cx="70" cy="115" rx="16" ry="20" fill="#fef3c7" />

        {/* Little Perching Feet */}
        <ellipse cx="54" cy="144" rx="7" ry="5" fill="#854d0e" stroke="#451a03" strokeWidth="2" />
        <ellipse cx="86" cy="144" rx="7" ry="5" fill="#854d0e" stroke="#451a03" strokeWidth="2" />

        {/* Monkey Arms holding Golden Weaver Scroll */}
        <g id="pip-arms">
          <path d="M48 104 C 42 118, 52 132, 60 130" stroke="#854d0e" strokeWidth="5" strokeLinecap="round" />
          <path d="M92 104 C 98 118, 88 132, 80 130" stroke="#854d0e" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="60" cy="130" rx="4.5" ry="4" fill="#fef3c7" stroke="#451a03" strokeWidth="1.5" />
          <ellipse cx="80" cy="130" rx="4.5" ry="4" fill="#fef3c7" stroke="#451a03" strokeWidth="1.5" />
          <rect x="62" y="125" width="16" height="9" rx="4" fill="#facc15" stroke="#a16207" strokeWidth="1.8" />
          <line x1="66" y1="129" x2="74" y2="129" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Storybook Monkey Head */}
        <g id="pip-head">
          <circle cx="34" cy="62" r="14" fill="#854d0e" stroke="#451a03" strokeWidth="2.8" />
          <circle cx="34" cy="62" r="8" fill="#fde68a" />
          <circle cx="106" cy="62" r="14" fill="#854d0e" stroke="#451a03" strokeWidth="2.8" />
          <circle cx="106" cy="62" r="8" fill="#fde68a" />

          <ellipse cx="70" cy="65" rx="34" ry="29" fill="#854d0e" stroke="#451a03" strokeWidth="3" />

          <path
            d="M48 54 C 40 54, 42 70, 70 87 C 98 70, 100 54, 92 54 C 82 54, 76 61, 70 63 C 64 61, 58 54, 48 54 Z"
            fill="#fef3c7"
            stroke="#451a03"
            strokeWidth="2.2"
          />

          {/* Sclera */}
          <ellipse cx="57" cy="65" rx="8" ry="10" fill="#ffffff" stroke="#451a03" strokeWidth="2" />
          <ellipse cx="83" cy="65" rx="8" ry="10" fill="#ffffff" stroke="#451a03" strokeWidth="2" />

          {/* Left pupil with cursor follower */}
          <g ref={leftPupilRef}>
            <ellipse cx="57" cy="65" rx="4.5" ry="6" fill="#854d0e" />
            <circle cx="57" cy="65" r="3" fill="#1e1b4b" />
            <circle cx="55.5" cy="62.5" r="1.3" fill="#ffffff" />
          </g>

          {/* Right pupil with cursor follower */}
          <g ref={rightPupilRef}>
            <ellipse cx="83" cy="65" rx="4.5" ry="6" fill="#854d0e" />
            <circle cx="83" cy="65" r="3" fill="#1e1b4b" />
            <circle cx="81.5" cy="62.5" r="1.3" fill="#ffffff" />
          </g>

          <ellipse cx="70" cy="73" rx="2.5" ry="1.8" fill="#451a03" />

          <circle cx="49" cy="74" r="4" fill="#fb7185" opacity="0.65" />
          <circle cx="91" cy="74" r="4" fill="#fb7185" opacity="0.65" />

          <path d="M64 78 Q 70 83 76 78" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />

          <path d="M62 38 Q 70 32 78 38" stroke="#15803d" strokeWidth="3.2" strokeLinecap="round" />
          <ellipse cx="70" cy="34" rx="5" ry="2.8" fill="#22c55e" stroke="#14532d" strokeWidth="1" transform="rotate(-15 70 34)" />
        </g>
      </svg>

      <style>{`
        .pip-monkey-rig {
          animation: pipBreathe 3.5s ease-in-out infinite alternate;
        }
        @keyframes pipBreathe {
          0% { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }
        .pip-monkey-rig.waving {
          animation: pipJoy 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes pipJoy {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.08) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
