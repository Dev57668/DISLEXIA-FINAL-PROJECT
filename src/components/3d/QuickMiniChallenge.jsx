import React, { useState } from "react";
import { playSuccessChime, playLetterFlip, playHoverTick, playDiagnosticFanfare } from "../../utils/soundEffects";
import { IconCheck, IconLightbulb, IconTrophy, IconRocket, IconRefresh } from "../Icons";

export default function QuickMiniChallenge({ onStartFullQuest }) {
  const challenges = [
    {
      id: 1,
      target: "b",
      prompt: "Select the correctly oriented letter 'b' (not mirrored or rotated):",
      options: [
        { label: "d", correct: false, reason: "Mirrored horizontally" },
        { label: "b", correct: true, reason: "Correct Standard 'b'!" },
        { label: "p", correct: false, reason: "Flipped vertically" },
        { label: "q", correct: false, reason: "Inverted diagonal mirror" }
      ]
    },
    {
      id: 2,
      target: "p",
      prompt: "Find the true letter 'p' amongst its inverted twins:",
      options: [
        { label: "q", correct: false, reason: "Mirrored horizontally" },
        { label: "d", correct: false, reason: "Inverted vertically" },
        { label: "p", correct: true, reason: "Spot-on! Clean visual recognition!" },
        { label: "b", correct: false, reason: "Rotated 180 degrees" }
      ]
    },
    {
      id: 3,
      target: "E",
      prompt: "Identify the standard forward-facing capital letter 'E':",
      options: [
        { label: "3", correct: false, reason: "Number 3 / mirrored E" },
        { label: "E", correct: true, reason: "Perception precision confirmed!" },
        { label: "Ш", correct: false, reason: "Cyrillic Sha / 90° rotation" },
        { label: "ⱻ", correct: false, reason: "Turned Small Capital E" }
      ]
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const currentChallenge = challenges[stepIndex];

  const handleSelect = (opt, index) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(index);

    if (opt.correct) {
      playSuccessChime();
      setScore((s) => s + 100);
      setFeedback({ success: true, text: `Correct! ${opt.reason}` });
    } else {
      playLetterFlip();
      setFeedback({ success: false, text: `Notice the orientation: ${opt.reason}` });
    }

    setTimeout(() => {
      if (stepIndex + 1 < challenges.length) {
        setStepIndex((idx) => idx + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setIsCompleted(true);
        playDiagnosticFanfare();
      }
    }, 1200);
  };

  const handleRestart = () => {
    playHoverTick();
    setStepIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
    setFeedback(null);
  };

  return (
    <div className="mini-challenge-card">
      <div className="mini-challenge-header">
        <div className="mini-badge">
          <span className="mini-badge-dot"></span>
          <span>LIVE 3D PERCEPTION MINI-CHALLENGE</span>
        </div>
        <div className="mini-score-counter">
          SCORE: <strong>{score} XP</strong>
        </div>
      </div>

      {!isCompleted ? (
        <div className="mini-challenge-body">
          <div className="mini-step-indicator">
            Round {stepIndex + 1} of {challenges.length}
          </div>

          <h4 className="mini-prompt">{currentChallenge.prompt}</h4>

          <div className="mini-options-grid">
            {currentChallenge.options.map((opt, i) => {
              let btnClass = "mini-glyph-btn";
              if (selectedOption !== null) {
                if (opt.correct) btnClass += " correct-pick";
                else if (selectedOption === i) btnClass += " wrong-pick";
              }

              return (
                <button
                  key={i}
                  className={btnClass}
                  onClick={() => handleSelect(opt, i)}
                  disabled={selectedOption !== null}
                  onMouseEnter={playHoverTick}
                >
                  <span className="glyph-3d-symbol">{opt.label}</span>
                  <span className="glyph-3d-shadow"></span>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`mini-feedback-banner ${feedback.success ? "success" : "warning"}`}>
              <span>{feedback.success ? <IconCheck size={16} /> : <IconLightbulb size={16} />}</span>
              <span>{feedback.text}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="mini-challenge-complete">
          <div className="complete-trophy-ring">
            <span className="trophy-emoji"><IconTrophy size={36} /></span>
          </div>
          <h3>Perception Assessment Calibrated!</h3>
          <p className="complete-score-summary">
            Final Score: <strong>{score} / 300 XP</strong>
          </p>
          <p className="complete-note">
            Your spatial orientation and rapid recognition demonstrate keen cognitive aptitude. Take the comprehensive diagnostic assessment to map your phonological, visual, and numerical mastery across all 6 specialized clinical modules.
          </p>

          <div className="complete-actions">
            <button
              className="btn-launch-quest-primary"
              onClick={onStartFullQuest}
            >
              <span><IconRocket size={16} /></span>
              <span>Initialize Student Assessment</span>
            </button>
            <button className="btn-retry-secondary" onClick={handleRestart}>
              <span><IconRefresh size={16} /></span>
              <span>Try Challenge Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}