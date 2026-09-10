import React, { useRef, useState, useEffect } from "react";
import { playHoverTick, playSynapsePulse } from "../../../utils/soundEffects";
import { IconCalculator } from "../../Icons";

/**
 * KojiPanda - Original Animal Companion for Module 4 (Maths Jutsu Temple)
 * "Koji the Ninja Red Panda"
 * Features:
 * - Martial arts red panda with bamboo staff
 * - Eyes follow cursor with clamped pupil tracking
 * - Idle breathing, ear twitch, and bamboo staff tap
 * - Interactive click: playful ninja martial-arts salute
 * - Non-intrusive contextual hint balloon for math reasoning
 */
export default function KojiPanda({
  hint = "",
  onCompanionClick = null,
  size = "medium"
}) {
  const containerRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const headRef = useRef(null);
  const staffRef = useRef(null);
  const [isStriking, setIsStriking] = useState(false);

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
    setIsStriking(true);
    setTimeout(() => setIsStriking(false), 800);
    if (onCompanionClick) onCompanionClick();
  };

  const scale = size === "small" ? "105px" : size === "large" ? "170px" : "135px";

  return (
    <div
      ref={containerRef}
      className={`koji-panda-rig ${isStriking ? "striking" : ""}`}
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
            border: "2.5px solid #d97706",
            borderRadius: "14px 16px 16px 4px",
            padding: "8px 12px",
            boxShadow: "0 6px 0 #b45309, 0 8px 18px rgba(0,0,0,0.12)",
            fontSize: "0.82rem",
            fontWeight: "700",
            color: "#92400e",
            lineHeight: 1.35
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px", color: "#d97706", fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            <IconCalculator size={13} />
            <span>Koji's Jutsu Sense</span>
          </div>
          <p style={{ margin: 0 }}>{hint}</p>
        </div>
      )}

      {/* Interactive Koji Red Panda SVG */}
      <div
        onClick={handleClick}
        style={{ cursor: "pointer", width: "100%", height: "auto" }}
        title="Koji the Ninja Red Panda (Click for encouragement!)"
      >
        <svg
          viewBox="0 0 140 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          <ellipse cx="70" cy="152" rx="38" ry="7" fill="#451a03" opacity="0.18" />

          {/* Bushy Striped Red Panda Tail */}
          <path
            d="M85 130 C 115 132, 132 110, 126 86 C 122 72, 108 80, 104 96"
            stroke="#ea580c"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tail Stripes */}
          <path d="M124 94 L 115 97" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M126 108 L 115 111" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <path d="M118 122 L 108 123" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />

          {/* Body with Martial Arts Gi */}
          <ellipse cx="70" cy="114" rx="27" ry="29" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
          {/* Orange Fur Chest */}
          <path d="M58 98 Q 70 120 82 98 Z" fill="#ffffff" />
          {/* Black Belt with Gold Buckle */}
          <rect x="46" y="122" width="48" height="7" fill="#0f172a" rx="2" />
          <rect x="65" y="120" width="10" height="11" fill="#facc15" stroke="#a16207" strokeWidth="1.5" rx="2" />

          {/* Bamboo Counting Rod Staff */}
          <g id="bamboo-staff" ref={staffRef}>
            <line x1="28" y1="50" x2="38" y2="150" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
            <circle cx="30.5" cy="75" r="3.5" fill="#4d7c0f" />
            <circle cx="33" cy="100" r="3.5" fill="#4d7c0f" />
            <circle cx="35.5" cy="125" r="3.5" fill="#4d7c0f" />
            <path d="M26 48 Q 20 40 28 35" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Paws */}
          <ellipse cx="56" cy="142" rx="7" ry="4.5" fill="#0f172a" />
          <ellipse cx="84" cy="142" rx="7" ry="4.5" fill="#0f172a" />

          {/* Head */}
          <g id="koji-head" ref={headRef}>
            {/* Big Fuzzy Ears */}
            <path d="M32 46 C 26 28, 48 30, 52 44 Z" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />
            <path d="M36 44 C 32 34, 44 36, 48 44 Z" fill="#ea580c" />
            <path d="M108 46 C 114 28, 92 30, 88 44 Z" fill="#ffffff" stroke="#451a03" strokeWidth="2.5" />
            <path d="M104 44 C 108 34, 96 36, 92 44 Z" fill="#ea580c" />

            {/* Head Base */}
            <ellipse cx="70" cy="65" rx="36" ry="32" fill="#ea580c" stroke="#451a03" strokeWidth="3" />

            {/* White Whisker Cheeks */}
            <ellipse cx="46" cy="74" rx="14" ry="12" fill="#ffffff" />
            <ellipse cx="94" cy="74" rx="14" ry="12" fill="#ffffff" />

            {/* Red Panda Tear Mask Lines */}
            <path d="M48 64 Q 44 74 48 84" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            <path d="M92 64 Q 96 74 92 84" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="53" cy="62" rx="8.5" ry="11" fill="#ffffff" stroke="#451a03" strokeWidth="2" />
            <ellipse cx="87" cy="62" rx="8.5" ry="11" fill="#ffffff" stroke="#451a03" strokeWidth="2" />

            {/* Tracking Pupils */}
            <g id="koji-left-pupil" ref={leftPupilRef}>
              <ellipse cx="53" cy="62" rx="4.5" ry="6" fill="#b45309" />
              <circle cx="53" cy="62" r="3" fill="#1e1b4b" />
              <circle cx="51.5" cy="59.5" r="1.3" fill="#ffffff" />
            </g>
            <g id="koji-right-pupil" ref={rightPupilRef}>
              <ellipse cx="87" cy="62" rx="4.5" ry="6" fill="#b45309" />
              <circle cx="87" cy="62" r="3" fill="#1e1b4b" />
              <circle cx="85.5" cy="59.5" r="1.3" fill="#ffffff" />
            </g>

            {/* Nose & Cute Mouth */}
            <ellipse cx="70" cy="74" rx="3.5" ry="2.5" fill="#0f172a" />
            <path d="M66 79 Q 70 83 74 79" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Martial Arts Headband */}
            <path d="M34 50 Q 70 42 106 50" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
            <circle cx="70" cy="46" r="3.5" fill="#facc15" />
          </g>
        </svg>
      </div>

      <style>{`
        .koji-panda-rig {
          animation: kojiBreathe 3.6s ease-in-out infinite alternate;
        }
        @keyframes kojiBreathe {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        .koji-panda-rig.striking {
          animation: kojiStrike 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes kojiStrike {
          0%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-16px) scale(1.08) rotate(-4deg); }
          70% { transform: translateY(-6px) scale(1.03) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
