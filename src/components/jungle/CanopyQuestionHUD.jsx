import React, { useState } from "react";
import JungleMascot from "./JungleMascot";
import { IconVolume, IconChevronLeft, IconLightbulb, IconLeaf } from "../Icons";
import { playHoverTick, playSynapsePulse, playSuccessChime } from "../../utils/soundEffects";

/**
 * CanopyQuestionHUD
 * Hand-drawn storybook question layout for DyslexiaQuest assessment modules.
 * Features:
 * - High-contrast, large dyslexia-friendly question prompt
 * - Interactive companion mascot (Ollie) with live hint dialog
 * - Bouncy tactile answer stones with instant pentatonic audio feedback
 * - Flowering vine progress meter
 */
export default function CanopyQuestionHUD({
  moduleTitle = "Module 01: Mirror Glyph Grove",
  currentQuestionIndex = 0,
  totalQuestions = 10,
  currentLevel = 1,
  questionPrompt = "",
  subPrompt = "",
  options = [],
  onSelectOption = () => {},
  onReturnToMap = () => {},
  hintText = "",
  onSpeakPrompt = null
}) {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [mascotMood, setMascotMood] = useState("idle");

  const handleOptionClick = (opt) => {
    setSelectedOpt(opt);
    playHoverTick();
    setMascotMood("thinking");
    onSelectOption(opt);
  };

  const progressPercent = totalQuestions > 0 ? Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100) : 0;

  return (
    <div className="canopy-question-container">
      {/* Top HUD Bar */}
      <div className="canopy-hud-bar">
        <button
          className="btn-hud-back"
          onClick={() => {
            playHoverTick();
            onReturnToMap();
          }}
          title="Return to Canopy Map"
        >
          <IconChevronLeft size={18} />
          <span>Camp Map</span>
        </button>

        <div className="hud-module-badge">
          <span className="badge-leaf"><IconLeaf size={14} /></span>
          <span className="badge-title">{moduleTitle}</span>
          <span className="badge-level">Level {currentLevel}</span>
        </div>

        <div className="hud-progress-box">
          <span className="progress-counter">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
          <div className="vine-progress-track">
            <div className="vine-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Main Question & Mascot Stage */}
      <div className="canopy-stage-layout">
        {/* Left Side: Question Board */}
        <div className="question-parchment-board">
          {/* Question Eyebrow / Helper */}
          <div className="question-header-row">
            <span className="question-tag">CANOPY DISCOVERY ITEM</span>
            {onSpeakPrompt && (
              <button
                className="btn-audio-speak"
                onClick={() => {
                  playSynapsePulse();
                  onSpeakPrompt();
                }}
                title="Click to hear question spoken aloud"
              >
                <IconVolume size={20} />
                <span>Hear Prompt</span>
              </button>
            )}
          </div>

          {/* Large Dyslexia-Optimized Question Text */}
          <h2 className="question-main-text">{questionPrompt}</h2>
          {subPrompt && <p className="question-sub-prompt">{subPrompt}</p>}

          {/* Tactile Answer Stones */}
          <div className="answer-stones-tray">
            {options.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              return (
                <button
                  key={idx}
                  className={`answer-stone ${isSelected ? "selected" : ""}`}
                  onClick={() => handleOptionClick(opt)}
                >
                  <span className="stone-text">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Hint Strip */}
          <div className="question-footer-bar">
            {hintText && (
              <button
                className="btn-jungle-hint"
                onClick={() => {
                  playHoverTick();
                  setShowHint((prev) => !prev);
                  setMascotMood("hint");
                }}
              >
                <IconLightbulb size={18} />
                <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
              </button>
            )}

            {showHint && hintText && (
              <div className="hint-speech-box">
                <span className="hint-bulb"><IconLightbulb size={16} /></span>
                <span className="hint-content">{hintText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Mascot Companion Rig */}
        <div className="canopy-companion-perch">
          <div className="perch-card">
            <JungleMascot
              mood={mascotMood}
              speechText={
                showHint
                  ? "Take your time! You've got this!"
                  : mascotMood === "thinking"
                  ? "Checking your answer..."
                  : "I'm watching your moves!"
              }
              onMascotClick={() => {
                playHoverTick();
                setMascotMood("happy");
              }}
              size="medium"
            />
            <span className="perch-label">Expedition Companion</span>
          </div>
        </div>
      </div>

      <style>{`
        .canopy-question-container {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 20px 80px;
          z-index: var(--z-content);
        }

        .canopy-hud-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fffdf2;
          border: 3px solid #78350f;
          border-radius: 14px 16px 13px 15px;
          padding: 8px 18px;
          box-shadow: 0 4px 0 #78350f;
          margin-bottom: 24px;
        }

        .btn-hud-back {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: #fefae0;
          border: 2px solid #78350f;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.88rem;
          font-weight: 700;
          color: #78350f;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .btn-hud-back:hover {
          transform: translateX(-3px);
          background: #fef08a;
        }

        .hud-module-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-weight: 800;
          font-size: 1.05rem;
          color: #451a03;
        }

        .badge-level {
          background: #dcfce7;
          border: 1.5px solid #16a34a;
          color: #15803d;
          font-size: 0.78rem;
          padding: 2px 8px;
          border-radius: 6px 8px 6px 8px;
        }

        .hud-progress-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .progress-counter {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-weight: 800;
          font-size: 0.9rem;
          color: #78350f;
        }

        .vine-progress-track {
          width: 140px;
          height: 14px;
          background: #fefae0;
          border: 2px solid #78350f;
          border-radius: 6px;
          overflow: hidden;
        }

        .vine-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #84cc16 0%, #22c55e 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .canopy-stage-layout {
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 24px;
          align-items: start;
        }

        .question-parchment-board {
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 36px;
        }

        .question-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .question-tag {
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 800;
          color: #b45309;
          letter-spacing: 0.05em;
        }

        .btn-audio-speak {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #ffedd5;
          border: 2px solid #ea580c;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.92rem;
          font-weight: 700;
          color: #9a3412;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .btn-audio-speak:hover {
          transform: scale(1.04);
          background: #fed7aa;
        }

        .question-main-text {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #451a03;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .question-sub-prompt {
          font-size: var(--text-body-large);
          color: #78350f;
          margin-bottom: 24px;
        }

        .answer-stones-tray {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 20px;
          margin: 32px 0 24px;
        }

        .answer-stone {
          min-height: 90px;
          padding: 16px 20px;
          background: #ffffff;
          border: 3.5px solid #78350f;
          border-radius: 20px;
          box-shadow: 0 6px 0 #78350f, 0 8px 16px rgba(69, 26, 3, 0.1);
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          color: #451a03;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .answer-stone:hover {
          transform: translateY(-4px);
          background: #fefae0;
          box-shadow: 0 10px 0 #78350f, 0 14px 22px rgba(69, 26, 3, 0.15);
          border-color: #1b7340;
        }

        .answer-stone:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0 #78350f;
        }

        .answer-stone.selected {
          background: #ecfccb;
          border-color: #65a30d;
          color: #365314;
        }

        .question-footer-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 2px dashed #fed7aa;
        }

        .btn-jungle-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #fefae0;
          border: 2px solid #d97706;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.9rem;
          font-weight: 700;
          color: #b45309;
          cursor: pointer;
        }

        .btn-jungle-hint:hover {
          background: #fef08a;
        }

        .hint-speech-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #fef08a;
          border: 2px solid #eab308;
          border-radius: 16px;
          font-size: 0.94rem;
          font-weight: 600;
          color: #713f12;
        }

        .canopy-companion-perch {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .perch-card {
          background: #fffdf2;
          border: 3px solid #78350f;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 6px 0 #78350f;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .perch-label {
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 700;
          color: #78350f;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .canopy-stage-layout {
            grid-template-columns: 1fr;
          }
          .canopy-companion-perch {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
