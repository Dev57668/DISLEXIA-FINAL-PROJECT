import React, { useRef, useState, useEffect } from "react";
import { playHoverTick, playSynapsePulse } from "../../../utils/soundEffects";
import { IconShapes } from "../../Icons";

/**
 * SolChameleon - Original Animal Companion for Module 5 (Sunstone Altar)
 * "Sol the Sun Chameleon"
 * Features:
 * - Independent swiveling turret eyes that track cursor position
 * - Idle tail curl, throat puff, and color shimmer
 * - Interactive click: playful tongue flicker and color shift
 * - Non-intrusive contextual hint balloon for 3D shapes & geometry
 */
export default function SolChameleon({
  hint = "",
  onCompanionClick = null,
  size = "medium"
}) {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const headRef = useRef(null);
  const tongueRef = useRef(null);
  const [isColorShifting, setIsColorShifting] = useState(false);

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
      const centerY = rect.top + rect.height * 0.35;
      targetX = (e.clientX - centerX) / 14;
      targetY = (e.clientY - centerY) / 14;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      const clampX = Math.max(-6, Math.min(6, currentX));
      const clampY = Math.max(-5, Math.min(5, currentY));

      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
        // Chameleon independent eye effect: right eye slightly offset
        rightPupilRef.current.setAttribute("transform", `translate(${clampX * 0.85}, ${clampY * 1.1})`);
      }
      if (headRef.current) {
        headRef.current.setAttribute("transform", `rotate(${clampX * 0.75} 70 70)`);
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

  const handleClick = () => {
    playSynapsePulse();
    setIsColorShifting(true);
    setTimeout(() => setIsColorShifting(false), 900);
    if (onCompanionClick) onCompanionClick();
  };

  const scale = size === "small" ? "105px" : size === "large" ? "170px" : "135px";

  return (
    <div
      ref={containerRef}
      className={`sol-chameleon-rig ${isColorShifting ? "shifting" : ""}`}
      style={{
        position: "relative",
        width: scale,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none"
      }}
    >
      {/* Contextual Hint Balloon */}
      {hint && (
        <div
          className="companion-speech-bubble"
          style={{
            position: "absolute",
            bottom: "100%",
            marginBottom: "8px",
            zIndex: 30,
            maxWidth: "240px",
            background: "#fffdf0",
            border: "2.5px solid #0284c7",
            borderRadius: "14px 16px 16px 4px",
            padding: "8px 12px",
            boxShadow: "0 6px 0 #0369a1, 0 8px 18px rgba(0,0,0,0.12)",
            fontSize: "0.82rem",
            fontWeight: "700",
            color: "#075985",
            lineHeight: 1.35
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px", color: "#0284c7", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <IconShapes size={13} />
            <span>Sol's Spatial Hint</span>
          </div>
          <p style={{ margin: 0 }}>{hint}</p>
        </div>
      )}

      {/* Interactive Sol Chameleon SVG */}
      <div
        onClick={handleClick}
        style={{ cursor: "pointer", width: "100%", height: "auto" }}
        title="Sol the Sun Chameleon (Click for encouragement!)"
      >
        <svg
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          {/* Sunstone Altar Perch Pedestal */}
          <path d="M30 148 L 110 148 L 118 158 L 22 158 Z" fill="#78716c" stroke="#44403c" strokeWidth="2" />
          <rect x="36" y="140" width="68" height="8" rx="2" fill="#a8a29e" stroke="#57534e" strokeWidth="1.5" />

          {/* Spiral Curled Tail */}
          <path
            d="M96 122 C 122 120, 134 100, 126 84 C 118 68, 102 74, 104 88 C 106 98, 114 96, 112 90"
            stroke="#0ea5e9"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Chameleon Arched Body */}
          <path
            className="sol-body"
            d="M45 125 C 40 92, 90 85, 98 125 Z"
            fill="#0284c7"
            stroke="#0369a1"
            strokeWidth="3"
          />

          {/* Sunstone Gem on Back */}
          <polygon points="70 82 78 94 70 102 62 94" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />

          {/* Zygodactylous Feet gripping stone */}
          <path d="M48 138 Q 42 142 46 146" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />
          <path d="M54 138 Q 50 142 54 146" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />
          <path d="M86 138 Q 82 142 86 146" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />
          <path d="M92 138 Q 88 142 92 146" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />

          {/* Head & Turret Eyes */}
          <g id="sol-head" ref={headRef}>
            {/* Casque Crest */}
            <path
              d="M38 68 C 36 38, 70 42, 86 54 C 102 66, 94 92, 70 94 C 52 94, 40 86, 38 68 Z"
              fill="#0ea5e9"
              stroke="#0369a1"
              strokeWidth="3"
            />
            {/* Crown ridge dots */}
            <circle cx="50" cy="46" r="2.5" fill="#facc15" />
            <circle cx="58" cy="44" r="2.5" fill="#facc15" />
            <circle cx="66" cy="44" r="2.5" fill="#facc15" />
            <circle cx="74" cy="48" r="2.5" fill="#facc15" />

            {/* Left Turret Eye */}
            <circle cx="54" cy="68" r="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
            <circle cx="54" cy="68" r="10" fill="#38bdf8" />
            <g id="sol-left-pupil" ref={leftPupilRef}>
              <ellipse cx="54" cy="68" rx="4" ry="5.5" fill="#0f172a" />
              <circle cx="53" cy="66" r="1.3" fill="#ffffff" />
            </g>

            {/* Right Turret Eye */}
            <circle cx="86" cy="68" r="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
            <circle cx="86" cy="68" r="10" fill="#38bdf8" />
            <g id="sol-right-pupil" ref={rightPupilRef}>
              <ellipse cx="86" cy="68" rx="4" ry="5.5" fill="#0f172a" />
              <circle cx="85" cy="66" r="1.3" fill="#ffffff" />
            </g>

            {/* Snout & Smile */}
            <ellipse cx="70" cy="85" rx="3" ry="1.5" fill="#0369a1" />
            <path d="M64 88 Q 70 92 76 88" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Playful Tongue Flicker */}
            <g id="sol-tongue" ref={tongueRef} className="sol-tongue-group">
              <path d="M70 90 Q 75 104 68 114" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="68" cy="114" r="2.5" fill="#f43f5e" />
            </g>
          </g>
        </svg>
      </div>

      <style>{`
        .sol-chameleon-rig {
          animation: solBreathe 3.6s ease-in-out infinite alternate;
        }
        @keyframes solBreathe {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        .sol-chameleon-rig.shifting {
          animation: solShift 0.9s ease-in-out;
        }
        .sol-chameleon-rig.shifting .sol-body {
          fill: #10b981;
          stroke: #047857;
        }
        .sol-chameleon-rig.shifting #sol-head path {
          fill: #34d399;
        }
        @keyframes solShift {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-14px) scale(1.08) rotate(3deg); }
        }
        .sol-tongue-group {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .sol-chameleon-rig.shifting .sol-tongue-group {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
