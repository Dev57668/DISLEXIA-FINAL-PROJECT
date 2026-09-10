import React, { useEffect, useState } from "react";

export default function ParticleFX({ trigger = 0, score = 100, combo = 1 }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setActive(true);

    const timer = setTimeout(() => {
      setActive(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "badgeFloatUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}
    >
      <div
        style={{
          background: "#0f172a",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          color: "#38bdf8",
          fontWeight: 700,
          fontSize: "1.15rem",
          padding: "8px 20px",
          borderRadius: "999px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.25)",
          letterSpacing: "0.02em"
        }}
      >
        +{score} XP
      </div>

      {combo > 1 && (
        <div
          style={{
            color: "#fbbf24",
            fontWeight: 700,
            fontSize: "0.85rem",
            marginTop: "6px",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}
        >
          {combo}x Streak
        </div>
      )}
    </div>
  );
}