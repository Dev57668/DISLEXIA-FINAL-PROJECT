import React, { useRef, useState, useEffect } from "react";
import { playHoverTick, playSynapsePulse } from "../../../utils/soundEffects";
import { IconBookOpen } from "../../Icons";

/**
 * LunaOtter - Original Animal Companion for Module 6 (Storyteller's Lagoon)
 * "Luna the River Otter"
 * Features:
 * - Floating cheerfully on a lagoon water lily pad holding a story scroll
 * - Eyes follow cursor with clamped pupil tracking
 * - Idle water floating bob, whisker twitch, and breathing
 * - Interactive click: celebratory splash and joyful spin
 * - Non-intrusive contextual hint balloon for reading comprehension recall
 */
export default function LunaOtter({
  hint = "",
  onCompanionClick = null,
  size = "medium"
}) {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const headRef = useRef(null);
  const [isSplashing, setIsSplashing] = useState(false);

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
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      const clampX = Math.max(-5, Math.min(5, currentX));
      const clampY = Math.max(-4, Math.min(4, currentY));

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
    setIsSplashing(true);
    setTimeout(() => setIsSplashing(false), 900);
    if (onCompanionClick) onCompanionClick();
  };

  const scale = size === "small" ? "105px" : size === "large" ? "170px" : "135px";

  return (
    <div
      ref={containerRef}
      className={`luna-otter-rig ${isSplashing ? "splashing" : ""}`}
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
            border: "2.5px solid #e11d48",
            borderRadius: "14px 16px 16px 4px",
            padding: "8px 12px",
            boxShadow: "0 6px 0 #be123c, 0 8px 18px rgba(0,0,0,0.12)",
            fontSize: "0.82rem",
            fontWeight: "700",
            color: "#9f1239",
            lineHeight: 1.35
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px", color: "#e11d48", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <IconBookOpen size={13} />
            <span>Luna's Story Clue</span>
          </div>
          <p style={{ margin: 0 }}>{hint}</p>
        </div>
      )}

      {/* Interactive Luna Otter SVG */}
      <div
        onClick={handleClick}
        style={{ cursor: "pointer", width: "100%", height: "auto" }}
        title="Luna the Story Otter (Click for encouragement!)"
      >
        <svg
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          {/* Water Ripples & Lily Pad */}
          <ellipse cx="70" cy="148" rx="46" ry="10" fill="#0284c7" opacity="0.25" />
          <ellipse cx="70" cy="146" rx="40" ry="8" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
          {/* Lily Pad Notch */}
          <path d="M70 146 L 108 142 L 102 150 Z" fill="#38bdf8" opacity="0.35" />

          {/* Floating Otter Body */}
          <ellipse cx="70" cy="116" rx="26" ry="28" fill="#78350f" stroke="#451a03" strokeWidth="3" />
          <ellipse cx="70" cy="120" rx="16" ry="18" fill="#fef3c7" />

          {/* Paws holding Storybook Scroll */}
          <g id="luna-paws">
            <ellipse cx="50" cy="120" rx="6" ry="4" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
            <ellipse cx="90" cy="120" rx="6" ry="4" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
            {/* Rolled Ancient Scroll */}
            <rect x="46" y="122" width="48" height="12" rx="3" fill="#fefae0" stroke="#ca8a04" strokeWidth="2" />
            <line x1="52" y1="126" x2="88" y2="126" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="2 3" />
            <line x1="52" y1="130" x2="82" y2="130" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="2 3" />
          </g>

          {/* Head */}
          <g id="luna-head" ref={headRef}>
            {/* Small Rounded Otter Ears */}
            <circle cx="36" cy="55" r="9" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="36" cy="55" r="5" fill="#fef3c7" />
            <circle cx="104" cy="55" r="9" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="104" cy="55" r="5" fill="#fef3c7" />

            {/* Head Base */}
            <ellipse cx="70" cy="65" rx="36" ry="32" fill="#78350f" stroke="#451a03" strokeWidth="3" />

            {/* Light Cream Muzzle */}
            <ellipse cx="70" cy="74" rx="20" ry="15" fill="#fef3c7" />

            {/* Big Expressive Eyes */}
            <ellipse cx="53" cy="60" rx="8.5" ry="11" fill="#ffffff" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="87" cy="60" rx="8.5" ry="11" fill="#ffffff" stroke="#451a03" strokeWidth="2" />

            {/* Tracking Pupils */}
            <g id="luna-left-pupil" ref={leftPupilRef}>
              <ellipse cx="53" cy="60" rx="4.5" ry="6" fill="#451a03" />
              <circle cx="53" cy="60" r="3" fill="#0f172a" />
              <circle cx="51.5" cy="57.5" r="1.3" fill="#ffffff" />
            </g>
            <g id="luna-right-pupil" ref={rightPupilRef}>
              <ellipse cx="87" cy="60" rx="4.5" ry="6" fill="#451a03" />
              <circle cx="87" cy="60" r="3" fill="#0f172a" />
              <circle cx="85.5" cy="57.5" r="1.3" fill="#ffffff" />
            </g>

            {/* Rosy Cheeks */}
            <circle cx="46" cy="73" r="4.5" fill="#fb7185" opacity="0.65" />
            <circle cx="94" cy="73" r="4.5" fill="#fb7185" opacity="0.65" />

            {/* Button Nose & Smile */}
            <polygon points="66 69 74 69 70 74" fill="#0f172a" />
            <path d="M70 74 L 70 78" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <path d="M64 78 Q 70 82 76 78" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Whiskers */}
            <line x1="42" y1="74" x2="30" y2="72" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="42" y1="77" x2="28" y2="78" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="98" y1="74" x2="110" y2="72" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="98" y1="77" x2="112" y2="78" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />

            {/* Water Lily Blossom in Hair */}
            <circle cx="40" cy="45" r="5" fill="#f43f5e" />
            <circle cx="36" cy="42" r="4" fill="#fb7185" />
            <circle cx="44" cy="42" r="4" fill="#fb7185" />
            <circle cx="40" cy="45" r="2" fill="#facc15" />
          </g>
        </svg>
      </div>

      <style>{`
        .luna-otter-rig {
          animation: lunaFloat 3.8s ease-in-out infinite alternate;
        }
        @keyframes lunaFloat {
          0% { transform: translateY(0) rotate(-1deg); }
          100% { transform: translateY(-6px) rotate(1.5deg); }
        }
        .luna-otter-rig.splashing {
          animation: lunaSplash 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes lunaSplash {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.08) rotate(-4deg); }
        }
      `}</style>
    </div>
  );
}
