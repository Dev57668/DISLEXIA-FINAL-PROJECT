import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * JungleMascot - "Ollie the Reading Owl"
 * Art Direction: Hand-drawn storybook character with a NOTICEABLY BIG HEAD and SMALL BODY.
 * Features:
 * - Real-time pupil tracking linked to cursor position via GSAP quickTo()
 * - Idle breathing loop and randomized blinking
 * - Dynamic speech bubble for guidance, hints, and celebration
 */
export default function JungleMascot({
  mood = "idle", // 'idle' | 'happy' | 'celebrate' | 'thinking'
  speechText = "",
  onMascotClick = null,
  size = "medium" // 'small' | 'medium' | 'large'
}) {
  const containerRef = useRef(null);
  const headRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const wingLeftRef = useRef(null);
  const wingRightRef = useRef(null);
  const speechBubbleRef = useRef(null);

  // GSAP Animation Rig
  useGSAP(() => {
    // 1. Idle Breathing & subtle head bob
    const breatheTween = gsap.to(containerRef.current, {
      y: -6,
      scaleY: 1.02,
      scaleX: 0.99,
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // 2. Randomized natural eye blinking
    const blinkTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3.8 });
    blinkTimeline.to([leftEyeRef.current, rightEyeRef.current], {
      scaleY: 0.08,
      transformOrigin: "center center",
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut"
    });

    // 3. High-performance Mouse Follower for Pupils (quickTo prevents re-renders)
    const xToLeft = gsap.quickTo(leftPupilRef.current, "x", { duration: 0.25, ease: "power2.out" });
    const yToLeft = gsap.quickTo(leftPupilRef.current, "y", { duration: 0.25, ease: "power2.out" });
    const xToRight = gsap.quickTo(rightPupilRef.current, "x", { duration: 0.25, ease: "power2.out" });
    const yToRight = gsap.quickTo(rightPupilRef.current, "y", { duration: 0.25, ease: "power2.out" });

    const onPointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.35; // head position

      const deltaX = (e.clientX - centerX) / 18;
      const deltaY = (e.clientY - centerY) / 18;

      // Clamp pupil movement within eye sockets
      const clampedX = gsap.utils.clamp(-6.5, 6.5, deltaX);
      const clampedY = gsap.utils.clamp(-5.5, 5.5, deltaY);

      xToLeft(clampedX);
      yToLeft(clampedY);
      xToRight(clampedX);
      yToRight(clampedY);
    };

    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      breatheTween.kill();
      blinkTimeline.kill();
    };
  }, { scope: containerRef });

  // Handle Mood Reactions
  useEffect(() => {
    if (!headRef.current || !wingLeftRef.current || !wingRightRef.current) return;

    if (mood === "celebrate") {
      // Joyful jump & fluttering wings
      gsap.timeline()
        .to(containerRef.current, { y: -24, duration: 0.3, ease: "power2.out" })
        .to([wingLeftRef.current, wingRightRef.current], {
          rotation: (i) => (i === 0 ? -35 : 35),
          duration: 0.15,
          repeat: 5,
          yoyo: true,
          transformOrigin: "top center"
        }, "<")
        .to(containerRef.current, { y: 0, duration: 0.4, ease: "bounce.out" });
    } else if (mood === "thinking") {
      // Thoughtful head tilt
      gsap.to(headRef.current, { rotation: 12, transformOrigin: "bottom center", duration: 0.5, ease: "power2.out" });
    } else {
      // Return to normal
      gsap.to(headRef.current, { rotation: 0, duration: 0.4, ease: "power1.out" });
    }
  }, [mood]);

  const scaleMap = {
    small: "140px",
    medium: "180px",
    large: "220px"
  };

  return (
    <div
      ref={containerRef}
      className="jungle-mascot-rig"
      style={{
        position: "relative",
        width: scaleMap[size] || "180px",
        height: scaleMap[size] || "180px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: onMascotClick ? "pointer" : "default",
        userSelect: "none"
      }}
      onClick={onMascotClick}
      title="Ollie the Explorer Owl"
    >
      {/* Hand-Drawn SVG Character Rig: Ollie the Owl */}
      <svg
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* ================= SMALL CUTE BODY & TALONS ================= */}
        {/* Perch Branch / Stone */}
        <g id="perch">
          <ellipse cx="100" cy="192" rx="55" ry="12" fill="#78350f" stroke="#451a03" strokeWidth="4" />
          <path d="M70 192 Q 100 188 130 192" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Little Yellow Talons */}
        <g id="talons">
          <ellipse cx="86" cy="186" rx="8" ry="5" fill="#f59e0b" stroke="#451a03" strokeWidth="2.5" />
          <ellipse cx="114" cy="186" rx="8" ry="5" fill="#f59e0b" stroke="#451a03" strokeWidth="2.5" />
        </g>

        {/* Small Teardrop Body with Feathers */}
        <g id="body">
          <path
            d="M72 130 C 65 170, 75 186, 100 186 C 125 186, 135 170, 128 130 Z"
            fill="#a16207"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Light Belly Feathers */}
          <path
            d="M82 145 C 80 172, 90 180, 100 180 C 110 180, 120 172, 118 145 Z"
            fill="#fef08a"
            stroke="#451a03"
            strokeWidth="2.5"
          />
          {/* Feather U-Marks */}
          <path d="M92 154 Q 96 159 100 154" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
          <path d="M102 154 Q 106 159 110 154" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
          <path d="M96 164 Q 100 169 104 164" stroke="#a16207" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Tiny Wings */}
        <g ref={wingLeftRef} id="wing-left">
          <path
            d="M70 135 C 55 145, 52 165, 68 172 C 75 168, 76 150, 73 135 Z"
            fill="#854d0e"
            stroke="#451a03"
            strokeWidth="3.5"
          />
        </g>
        <g ref={wingRightRef} id="wing-right">
          <path
            d="M130 135 C 145 145, 148 165, 132 172 C 125 168, 124 150, 127 135 Z"
            fill="#854d0e"
            stroke="#451a03"
            strokeWidth="3.5"
          />
        </g>

        {/* ================= NOTICEABLY BIG HEAD (MAIN CHARACTER FOCUS) ================= */}
        <g ref={headRef} id="big-head">
          {/* Ear Tufts (Feather Horns) */}
          <path
            d="M50 50 C 35 25, 45 15, 62 38 Z"
            fill="#854d0e"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M150 50 C 165 25, 155 15, 138 38 Z"
            fill="#854d0e"
            stroke="#451a03"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Huge Round Head Shape */}
          <ellipse
            cx="100"
            cy="84"
            rx="66"
            ry="60"
            fill="#ca8a04"
            stroke="#451a03"
            strokeWidth="4.5"
          />
          {/* Facial Disk (Lighter Fur) */}
          <ellipse cx="78" cy="85" rx="30" ry="34" fill="#fefae0" stroke="#451a03" strokeWidth="3" />
          <ellipse cx="122" cy="85" rx="30" ry="34" fill="#fefae0" stroke="#451a03" strokeWidth="3" />

          {/* Left Eye & Socket */}
          <g ref={leftEyeRef} id="left-eye">
            <circle cx="78" cy="85" r="21" fill="#ffffff" stroke="#451a03" strokeWidth="3.5" />
            {/* Iris & Pupil (Animated via GSAP quickTo) */}
            <g ref={leftPupilRef} id="left-pupil">
              <circle cx="78" cy="85" r="10.5" fill="#f97316" />
              <circle cx="78" cy="85" r="6.5" fill="#18181b" />
              {/* Highlight Glint */}
              <circle cx="75" cy="82" r="2.8" fill="#ffffff" />
            </g>
          </g>

          {/* Right Eye & Socket */}
          <g ref={rightEyeRef} id="right-eye">
            <circle cx="122" cy="85" r="21" fill="#ffffff" stroke="#451a03" strokeWidth="3.5" />
            {/* Iris & Pupil */}
            <g ref={rightPupilRef} id="right-pupil">
              <circle cx="122" cy="85" r="10.5" fill="#f97316" />
              <circle cx="122" cy="85" r="6.5" fill="#18181b" />
              {/* Highlight Glint */}
              <circle cx="119" cy="82" r="2.8" fill="#ffffff" />
            </g>
          </g>

          {/* Round Golden Spectacles */}
          <g id="spectacles">
            <circle cx="78" cy="85" r="24" stroke="#f59e0b" strokeWidth="3.8" fill="none" />
            <circle cx="122" cy="85" r="24" stroke="#f59e0b" strokeWidth="3.8" fill="none" />
            <path d="M102 85 Q 100 81 98 85" stroke="#f59e0b" strokeWidth="3.8" strokeLinecap="round" />
            {/* Glass Lens Reflection */}
            <path d="M66 75 L 75 68" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M110 75 L 119 68" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* Cute Orange Beak */}
          <g id="beak">
            <path
              d="M93 94 C 93 90, 107 90, 107 94 C 107 106, 93 106, 93 94 Z"
              fill="#f97316"
              stroke="#451a03"
              strokeWidth="3"
            />
          </g>

          {/* Cheerful Rosy Cheeks */}
          <ellipse cx="54" cy="98" rx="8" ry="5" fill="#f43f5e" opacity="0.45" />
          <ellipse cx="146" cy="98" rx="8" ry="5" fill="#f43f5e" opacity="0.45" />
        </g>
      </svg>

      {/* Speech / Guidance Bubble */}
      {speechText && (
        <div
          ref={speechBubbleRef}
          className="mascot-speech-bubble"
          style={{
            position: "absolute",
            top: "-38px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffffff",
            border: "3px solid #78350f",
            borderRadius: "18px 18px 18px 4px",
            padding: "8px 16px",
            boxShadow: "0 6px 14px rgba(69, 26, 3, 0.16)",
            fontSize: "0.92rem",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            color: "#451a03",
            whiteSpace: "normal",
            width: "max-content",
            maxWidth: "min(320px, 92vw)",
            lineHeight: "1.35",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            textAlign: "center",
            zIndex: 10
          }}
        >
          {speechText}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "22px",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "8px solid #78350f"
            }}
          />
        </div>
      )}
    </div>
  );
}
