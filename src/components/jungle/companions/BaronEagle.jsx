import React, { useRef, useState, useEffect } from "react";
import { playHoverTick, playSynapsePulse } from "../../../utils/soundEffects";
import { IconLightbulb, IconEye } from "../../Icons";

/**
 * BaronEagle - Original Animal Companion for Module 1 (Eagle Eye Island)
 * "Baron the Scout Eagle"
 * Features:
 * - Eyes follow cursor with clamped pupil and head tilt tracking
 * - Idle breathing, blinking, and feather ruffle
 * - Interactive click: wings flutter and cheerful chirp
 * - Contextual hint callout balloon without blocking questions
 */
export default function BaronEagle({
  hint = "",
  hintActive = false,
  onCompanionClick = null,
  size = "medium"
}) {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const headRef = useRef(null);
  const [isCheering, setIsCheering] = useState(false);
  const [showHintBubble, setShowHintBubble] = useState(true);

  // Mouse / Pointer follower for pupils and subtle head tilt
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
      targetX = (e.clientX - centerX) / 16;
      targetY = (e.clientY - centerY) / 16;
    };

    const updateLoop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const clampX = Math.max(-5.5, Math.min(5.5, currentX));
      const clampY = Math.max(-4.5, Math.min(4.5, currentY));

      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
        rightPupilRef.current.setAttribute("transform", `translate(${clampX}, ${clampY})`);
      }
      if (headRef.current) {
        headRef.current.setAttribute("transform", `rotate(${clampX * 0.8} 70 65)`);
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
    setIsCheering(true);
    setTimeout(() => setIsCheering(false), 800);
    if (onCompanionClick) onCompanionClick();
  };

  const scale = size === "small" ? "105px" : size === "large" ? "170px" : "135px";

  return (
    <div
      ref={containerRef}
      className={`baron-eagle-rig ${isCheering ? "cheering" : ""}`}
      style={{
        position: "relative",
        width: scale,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none"
      }}
    >
      {/* Contextual Hint Speech Bubble */}
      {hint && showHintBubble && (
        <div
          className="companion-speech-bubble"
          style={{
            position: "absolute",
            bottom: "100%",
            marginBottom: "8px",
            zIndex: 30,
            maxWidth: "230px",
            background: "#fffdf0",
            border: "2.5px solid #16a34a",
            borderRadius: "14px 16px 16px 4px",
            padding: "8px 12px",
            boxShadow: "0 6px 0 #15803d, 0 8px 18px rgba(0,0,0,0.12)",
            fontSize: "0.82rem",
            fontWeight: "700",
            color: "#14532d",
            lineHeight: 1.35,
            animation: "bubblePopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px", color: "#16a34a", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <IconEye size={13} />
            <span>Baron's Scout Tip</span>
          </div>
          <p style={{ margin: 0 }}>{hint}</p>
        </div>
      )}

      {/* Interactive Baron SVG Character */}
      <div
        onClick={handleClick}
        style={{ cursor: "pointer", width: "100%", height: "auto" }}
        title="Baron the Scout Eagle (Click for encouragement!)"
      >
        <svg
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          {/* Subtle Shadow */}
          <ellipse cx="70" cy="152" rx="38" ry="7" fill="#451a03" opacity="0.18" />

          {/* Eagle Tail Feathers */}
          <path d="M56 128 L 70 148 L 84 128 Z" fill="#ffffff" stroke="#78350f" strokeWidth="2.5" />

          {/* Eagle Body */}
          <ellipse cx="70" cy="112" rx="28" ry="32" fill="#78350f" stroke="#451a03" strokeWidth="3" />
          <ellipse cx="70" cy="116" rx="19" ry="22" fill="#fef3c7" />

          {/* Wings */}
          <g id="wings">
            <path
              className="baron-wing-left"
              d="M44 94 C 20 102, 16 124, 38 136 C 46 124, 48 108, 44 94 Z"
              fill="#92400e"
              stroke="#451a03"
              strokeWidth="2.5"
            />
            <path
              className="baron-wing-right"
              d="M96 94 C 120 102, 124 124, 102 136 C 94 124, 92 108, 96 94 Z"
              fill="#92400e"
              stroke="#451a03"
              strokeWidth="2.5"
            />
          </g>

          {/* Perching Talons */}
          <g id="talons" fill="#f59e0b" stroke="#78350f" strokeWidth="2">
            <ellipse cx="58" cy="144" rx="6" ry="4" />
            <ellipse cx="82" cy="144" rx="6" ry="4" />
          </g>

          {/* Head Group (tilts with mouse) */}
          <g id="baron-head" ref={headRef}>
            {/* White Eagle Crown Feathers */}
            <path
              d="M34 65 C 34 32, 50 18, 70 18 C 90 18, 106 32, 106 65 C 106 82, 92 88, 70 88 C 48 88, 34 82, 34 65 Z"
              fill="#ffffff"
              stroke="#451a03"
              strokeWidth="3"
            />
            {/* Feather Tuft on Top */}
            <path d="M68 18 C 64 6, 76 6, 72 18" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />

            {/* Aviator Scout Goggles on Forehead */}
            <rect x="42" y="32" width="24" height="15" rx="5" fill="#ca8a04" stroke="#78350f" strokeWidth="2.5" />
            <rect x="45" y="35" width="18" height="9" rx="3" fill="#38bdf8" opacity="0.8" />
            <rect x="74" y="32" width="24" height="15" rx="5" fill="#ca8a04" stroke="#78350f" strokeWidth="2.5" />
            <rect x="77" y="35" width="18" height="9" rx="3" fill="#38bdf8" opacity="0.8" />
            <line x1="66" y1="39" x2="74" y2="39" stroke="#78350f" strokeWidth="2.5" />

            {/* Big Alert Eyes */}
            <ellipse cx="53" cy="58" rx="10" ry="12" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />
            <ellipse cx="87" cy="58" rx="10" ry="12" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />

            {/* Tracking Pupils */}
            <g id="left-pupil" ref={leftPupilRef}>
              <ellipse cx="53" cy="58" rx="5.5" ry="6.5" fill="#15803d" />
              <circle cx="53" cy="58" r="3.5" fill="#0f172a" />
              <circle cx="51.5" cy="55.5" r="1.5" fill="#ffffff" />
            </g>
            <g id="right-pupil" ref={rightPupilRef}>
              <ellipse cx="87" cy="58" rx="5.5" ry="6.5" fill="#15803d" />
              <circle cx="87" cy="58" r="3.5" fill="#0f172a" />
              <circle cx="85.5" cy="55.5" r="1.5" fill="#ffffff" />
            </g>

            {/* Sharp Golden Beak */}
            <path
              d="M62 67 C 62 67, 70 63, 78 67 C 78 78, 73 88, 70 88 C 67 88, 62 78, 62 67 Z"
              fill="#f59e0b"
              stroke="#78350f"
              strokeWidth="2.5"
            />
            {/* Beak highlight */}
            <path d="M68 67 Q 70 76 68 82" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <style>{`
        .baron-eagle-rig {
          animation: baronBreathe 3.4s ease-in-out infinite alternate;
        }
        @keyframes baronBreathe {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        .baron-eagle-rig.cheering {
          animation: baronCheer 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes baronCheer {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.08) rotate(3deg); }
        }
        @keyframes bubblePopIn {
          0% { opacity: 0; transform: translateY(6px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
