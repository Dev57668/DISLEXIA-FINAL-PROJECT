import React, { useState, useEffect } from "react";
import { playLetterFlip, playHoverTick, playSuccessChime } from "../../utils/soundEffects";
import { IconBookOpen, IconSparkles, IconShieldCheck, IconTarget, IconEye } from "../Icons";

export default function NeuroLensLab({ onLaunchAssessment }) {
  const [stabilized, setStabilized] = useState(false);
  const [driftIntensity, setDriftIntensity] = useState(65);
  const [mirrorFrequency, setMirrorFrequency] = useState(50);
  const [crowding, setCrowding] = useState(40);
  const [activeTab, setActiveTab] = useState("letters"); // "letters" | "passage"
  const [ticker, setTicker] = useState(0);

  // Dynamic animation ticker for simulated letter jitter
  useEffect(() => {
    if (stabilized || driftIntensity === 0) return;
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 1000);
    }, 120);
    return () => clearInterval(interval);
  }, [stabilized, driftIntensity]);

  const handleToggleStabilizer = () => {
    const next = !stabilized;
    setStabilized(next);
    if (next) {
      playSuccessChime();
    } else {
      playLetterFlip();
    }
  };

  // Helper to render letter with optional 3D perceptual dyslexia jitter
  const renderGlyph = (char, id) => {
    if (stabilized) {
      return (
        <span
          key={id}
          className="stabilized-char"
          style={{
            display: "inline-block",
            fontFamily: "'Lexend', sans-serif",
            fontWeight: 600,
            color: "#38bdf8",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          {char}
        </span>
      );
    }

    // Determine simulated mirror flip
    let displayChar = char;
    const shouldFlip = Math.sin(ticker * 0.3 + id * 1.7) * 100 < mirrorFrequency;
    if (shouldFlip) {
      if (char === "b") displayChar = "d";
      else if (char === "d") displayChar = "b";
      else if (char === "p") displayChar = "q";
      else if (char === "q") displayChar = "p";
      else if (char === "m") displayChar = "w";
      else if (char === "w") displayChar = "m";
    }

    // 3D rotation & jitter offset
    const factor = driftIntensity / 100;
    const rotX = Math.sin(ticker * 0.2 + id * 1.3) * 18 * factor;
    const rotY = Math.cos(ticker * 0.25 + id * 1.1) * 22 * factor;
    const transX = Math.sin(ticker * 0.15 + id * 2.1) * 3.5 * factor;
    const transY = Math.cos(ticker * 0.18 + id * 0.9) * 3.0 * factor;

    return (
      <span
        key={id}
        className="dyslexic-char"
        style={{
          display: "inline-block",
          transform: `perspective(400px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`,
          letterSpacing: `${(crowding / 20 - 1).toFixed(1)}px`,
          color: shouldFlip ? "#f43f5e" : "#f1f5f9",
          transition: "transform 0.1s linear, color 0.2s ease"
        }}
      >
        {displayChar}
      </span>
    );
  };

  const samplePassage = "Quick brown fox jumps over the playful lazy dogs while deep brain circuits map letters to spoken sounds.";
  const sampleLetters = ["b", "d", "p", "q", "m", "w", "e", "n", "u", "a", "s", "c"];

  return (
    <div className="neurolens-card">
      <div className="neurolens-header">
        <div className="neurolens-title-badge">
          <span className="badge-pulse"></span>
          <span>INTERACTIVE 3D NEURO-LENS LABORATORY</span>
        </div>
        <h3>Experience How The Dyslexic Brain Perceives Text</h3>
        <p>
          Dyslexia is not a lack of intelligence — it is a neuro-spatial difference in how the brain's visual cortex parses letter rotation, spacing, and phonemes. Use the controls below to experience it firsthand.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="neurolens-view-selector">
        <button
          className={`tab-btn ${activeTab === "letters" ? "active" : ""}`}
          onClick={() => {
            playHoverTick();
            setActiveTab("letters");
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><IconEye size={16} /> 3D Letter Symmetry Grid</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "passage" ? "active" : ""}`}
          onClick={() => {
            playHoverTick();
            setActiveTab("passage");
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><IconBookOpen size={16} /> Continuous Reading Simulation</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className={`neurolens-viewport ${stabilized ? "mode-stabilized" : "mode-simulated"}`}>
        {/* Focal reading guide line when stabilized */}
        {stabilized && <div className="focal-guide-line" />}

        {activeTab === "letters" ? (
          <div className="letters-interactive-grid">
            {sampleLetters.map((ch, idx) => (
              <div key={idx} className="letter-pod">
                {renderGlyph(ch, idx)}
                <div className="pod-label">{ch.toUpperCase()}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="passage-interactive-view">
            <p className="passage-text">
              {samplePassage.split("").map((ch, idx) => renderGlyph(ch, idx))}
            </p>
          </div>
        )}

        {/* State Banner */}
        <div className={`viewport-status ${stabilized ? "status-stabilized" : "status-simulated"}`}>
          {stabilized ? (
            <>
              <span className="status-icon"><IconSparkles size={16} /></span>
              <span><strong>DYSPRAXIA / DYSLEXIA STABILIZER ACTIVE:</strong> Weighted baselines, stabilized orthography & focal guidance.</span>
            </>
          ) : (
            <>
              <span className="status-icon"><IconTarget size={16} /></span>
              <span><strong>SIMULATION RUNNING:</strong> Spatial drift ({driftIntensity}%), mirror ambiguity ({mirrorFrequency}%), visual crowding ({crowding}%).</span>
            </>
          )}
        </div>
      </div>

      {/* Interactive Sliders & Toggles */}
      <div className="neurolens-controls-panel">
        <div className="stabilizer-action-box">
          <button
            className={`stabilizer-toggle-btn ${stabilized ? "btn-active" : ""}`}
            onClick={handleToggleStabilizer}
          >
            <span className="btn-icon">{stabilized ? <IconShieldCheck size={16} /> : <IconSparkles size={16} />}</span>
            <span>{stabilized ? "Disable Dyslexia Stabilizer" : "Engage Dyslexia-Friendly Stabilizer"}</span>
          </button>
          <span className="stabilizer-caption">
            {stabilized
              ? "Notice how the weighted bottoms of letters prevent 3D perceptual flipping."
              : "Click to see how tailored typography and guided pacing instantly anchor comprehension."}
          </span>
        </div>

        <div className="sliders-row">
          <div className="slider-item">
            <div className="slider-label">
              <span>3D Spatial Drift</span>
              <strong>{driftIntensity}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              disabled={stabilized}
              value={driftIntensity}
              onChange={(e) => {
                playHoverTick();
                setDriftIntensity(Number(e.target.value));
              }}
            />
          </div>

          <div className="slider-item">
            <div className="slider-label">
              <span>Mirror Flip Confusion (b/d/p/q)</span>
              <strong>{mirrorFrequency}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              disabled={stabilized}
              value={mirrorFrequency}
              onChange={(e) => {
                playHoverTick();
                setMirrorFrequency(Number(e.target.value));
              }}
            />
          </div>

          <div className="slider-item">
            <div className="slider-label">
              <span>Visual Crowding</span>
              <strong>{crowding}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              disabled={stabilized}
              value={crowding}
              onChange={(e) => {
                playHoverTick();
                setCrowding(Number(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}