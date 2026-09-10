import React, { useRef, useState, useEffect } from "react";
import { playHoverTick, playSynapsePulse } from "../../../utils/soundEffects";
import { IconMic } from "../../Icons";

/**
 * RioParrot - Original Animal Companion for Module 2 (Echo Sanctuary)
 * "Rio the Echo Parrot"
 * Features:
 * - Real-time pupil and beak tracking following cursor coordinates
 * - Idle feather breathing, wing flutter, and crystal headphone glow
 * - Interactive click: cheerful head bob and chirp
 * - Non-intrusive contextual hint balloon for speech & phoneme exercises
 */
export default function RioParrot({
  hint = "",
  isListening = false,
  onCompanionClick = null,
  size = "medium"
}) {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const headRef = useRef(null);
  const beakRef = useRef(null);
  const [isTalking, setIsTalking] = useState(false);

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
      targetX = (e.clientX - centerX) / 15;
      targetY = (e.clientY - centerY) / 15;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      const clampX = Math.max(-5, Math.min(5, currentX));
      const clampY = Math.max(-4, Math.min(4, currentY));

      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
        rightPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
      }
      if (headRef.current) {
        headRef.current.setAttribute("transform", `rotate(${clampX * 0.9} 70 65)`);
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
    setIsTalking(true);
    setTimeout(() => setIsTalking(false), 900);
    if (onCompanionClick) onCompanionClick();
  };

  const scale = size === "small" ? "105px" : size === "large" ? "170px" : "135px";

  return (
    <div
      ref={containerRef}
      className={`rio-parrot-rig ${isListening ? "listening" : ""} ${isTalking ? "talking" : ""}`}
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
            border: "2.5px solid #ea580c",
            borderRadius: "14px 16px 16px 4px",
            padding: "8px 12px",
            boxShadow: "0 6px 0 #c2410c, 0 8px 18px rgba(0,0,0,0.12)",
            fontSize: "0.82rem",
            fontWeight: "700",
            color: "#9a3412",
            lineHeight: 1.35
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px", color: "#ea580c", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <IconMic size={13} />
            <span>Rio's Echo Tip</span>
          </div>
          <p style={{ margin: 0 }}>{hint}</p>
        </div>
      )}

      {/* Interactive Rio SVG */}
      <div
        onClick={handleClick}
        style={{ cursor: "pointer", width: "100%", height: "auto" }}
        title="Rio the Echo Parrot (Click for encouragement!)"
      >
        <svg
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          <ellipse cx="70" cy="152" rx="36" ry="7" fill="#451a03" opacity="0.18" />

          {/* Long Blue & Red Tail Feathers */}
          <path d="M64 125 L 56 156 L 68 135 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <path d="M72 125 L 70 158 L 76 135 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
          <path d="M76 125 L 84 156 L 78 135 Z" fill="#eab308" stroke="#a16207" strokeWidth="2" />

          {/* Plump Tropical Body */}
          <ellipse cx="70" cy="112" rx="27" ry="30" fill="#16a34a" stroke="#14532d" strokeWidth="3" />
          <ellipse cx="70" cy="116" rx="17" ry="20" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />

          {/* Wings with Layered Feathers */}
          <g id="rio-wings">
            <path
              d="M44 96 C 24 104, 20 125, 42 134 C 48 122, 48 108, 44 96 Z"
              fill="#0284c7"
              stroke="#0369a1"
              strokeWidth="2.5"
            />
            <path
              d="M96 96 C 116 104, 120 125, 98 134 C 92 122, 92 108, 96 96 Z"
              fill="#0284c7"
              stroke="#0369a1"
              strokeWidth="2.5"
            />
          </g>

          {/* Yellow Talons */}
          <ellipse cx="58" cy="143" rx="6" ry="4" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="82" cy="143" rx="6" ry="4" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />

          {/* Head & Feathers */}
          <g id="rio-head" ref={headRef}>
            {/* Scarlet Macaw Crown */}
            <ellipse cx="70" cy="62" rx="34" ry="32" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />

            {/* Tropical Feather Crest */}
            <path d="M68 28 C 60 12, 70 8, 70 28" fill="#eab308" stroke="#a16207" strokeWidth="2.5" />
            <path d="M72 29 C 82 14, 76 10, 72 29" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />

            {/* White Eye Patch */}
            <ellipse cx="53" cy="58" rx="12" ry="13" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <ellipse cx="87" cy="58" rx="12" ry="13" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Tracking Pupils */}
            <g id="rio-left-pupil" ref={leftPupilRef}>
              <ellipse cx="53" cy="58" rx="5" ry="6" fill="#0284c7" />
              <circle cx="53" cy="58" r="3" fill="#0f172a" />
              <circle cx="51.5" cy="56" r="1.2" fill="#ffffff" />
            </g>
            <g id="rio-right-pupil" ref={rightPupilRef}>
              <ellipse cx="87" cy="58" rx="5" ry="6" fill="#0284c7" />
              <circle cx="87" cy="58" r="3" fill="#0f172a" />
              <circle cx="85.5" cy="56" r="1.2" fill="#ffffff" />
            </g>

            {/* Curved Parrot Beak */}
            <path
              ref={beakRef}
              d="M62 67 C 62 67, 70 63, 78 67 C 82 78, 77 92, 70 94 C 63 92, 58 78, 62 67 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            {/* Lower Beak Tongue */}
            <path d="M66 84 Q 70 88 74 84" stroke="#f43f5e" strokeWidth="2" fill="#f43f5e" />

            {/* Crystal Headphones for Listening / Phonemic Echo */}
            <path d="M38 60 C 38 38, 102 38, 102 60" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <rect x="33" y="52" width="10" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <rect x="97" y="52" width="10" height="18" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <style>{`
        .rio-parrot-rig {
          animation: rioBreathe 3.2s ease-in-out infinite alternate;
        }
        @keyframes rioBreathe {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
        .rio-parrot-rig.talking {
          animation: rioTalk 0.9s ease-in-out;
        }
        @keyframes rioTalk {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-12px) rotate(-4deg); }
          50% { transform: translateY(-6px) rotate(4deg); }
          75% { transform: translateY(-10px) rotate(-2deg); }
        }
        .rio-parrot-rig.listening {
          filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.45));
        }
      `}</style>
    </div>
  );
}
