import React, { useState, useEffect, useRef, useCallback } from "react";
import PipMonkey from "./jungle/PipMonkey";
import {
  IconLightbulb,
  IconVolume,
  IconCheck,
  IconAward,
  IconStar,
  IconTarget,
  IconChevronRight
} from "./Icons";
import {
  playLetterFlip,
  playCorrectChime,
  playWrongBuzzer,
  playSynapsePulse,
  playHoverTick
} from "../utils/soundEffects";

export default function Module3Activity({
  classNumber = 1,
  levels = [],
  levelIndex = 0,
  exerciseIndex = 0,
  currentXp = 10,
  onAwardXp = () => {},
  onDeductXp = () => {},
  onRecordPerformance = () => {},
  onNextQuestion = () => {},
  onCompleteModule = () => {},
  onBackToStages = () => {}
}) {
  const currentLevel = levels[levelIndex] || levels[0];
  const currentExercise = currentLevel?.exercises?.[exerciseIndex] || currentLevel?.exercises?.[0];

  const [typedAnswer, setTypedAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [companionAlternativeNote, setCompanionAlternativeNote] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintUsedForQuestion, setHintUsedForQuestion] = useState(false);

  const inputRef = useRef(null);
  const hasAwardedXpRef = useRef(false);
  const isAdvancingRef = useRef(false);

  // Check if current exercise has multiple-choice options
  const isMultipleChoice = Boolean(
    Array.isArray(currentExercise?.options) &&
    currentExercise.options.length > 0 &&
    currentExercise.type !== "written"
  );

  // Total questions calculation
  const totalQuestions = levels.reduce(
    (sum, item) => sum + (item.exercises?.length || 0),
    0
  );

  const completedBefore =
    levels
      .slice(0, levelIndex)
      .reduce((sum, item) => sum + (item.exercises?.length || 0), 0) + exerciseIndex;

  const overallProgress = totalQuestions > 0
    ? Math.round(((completedBefore + (isCorrect ? 1 : 0)) / totalQuestions) * 100)
    : 0;

  // Auto-focus input and reset state on new question load
  useEffect(() => {
    setTypedAnswer("");
    setSelectedOption(null);
    setIsCorrect(false);
    setIsWrong(false);
    setFeedbackMessage("");
    setCompanionAlternativeNote("");
    setShowHint(false);
    setHintUsedForQuestion(false);
    hasAwardedXpRef.current = false;
    isAdvancingRef.current = false;

    // Smooth auto-focus for accessibility and keyboard flow on written questions
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [levelIndex, exerciseIndex, currentExercise?.id]);

  // Normalize answers for robust comparison (handles whitespace, casing, and punctuation)
  const normalizeText = (str) => {
    return String(str || "")
      .trim()
      .toLowerCase()
      .replace(/^[.,/#!$%^&*;:{}=\-_`~()]+|[.,/#!$%^&*;:{}=\-_`~()]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Check the learner's typed answer
  const handleCheckAnswer = useCallback(() => {
    if (!currentExercise || isCorrect || isAdvancingRef.current) return;

    const cleanInput = normalizeText(typedAnswer);
    if (!cleanInput) return;

    // Collect all accepted answers defined in question data
    const rawAccepted = Array.isArray(currentExercise.acceptedAnswers) && currentExercise.acceptedAnswers.length > 0
      ? currentExercise.acceptedAnswers
      : [currentExercise.answer];

    const normalizedAccepted = rawAccepted.map(a => normalizeText(a));

    const matched = normalizedAccepted.includes(cleanInput);

    if (matched) {
      setIsCorrect(true);
      setIsWrong(false);
      setFeedbackMessage("Correct! +3 XP");
      playCorrectChime();

      // Award XP exactly once
      if (!hasAwardedXpRef.current) {
        hasAwardedXpRef.current = true;
        onAwardXp(3);
        onRecordPerformance("stage3", true, currentExercise, typedAnswer);
      }

      // Check for alternative valid answers to display friendly companion feedback
      // Find valid alternatives that differ from what the user typed (ignoring single-letter duplicates if user typed full word)
      const validFullWordAlts = rawAccepted.filter((alt) => {
        const normAlt = normalizeText(alt);
        // Ensure it's not identical to what the user typed and has length > 1
        return normAlt !== cleanInput && normAlt.length > 1;
      });

      if (validFullWordAlts.length > 0) {
        const altWord = String(validFullWordAlts[0]).toUpperCase();
        setCompanionAlternativeNote(`Awesome! You can also make the word '${altWord}'.`);
      } else {
        setCompanionAlternativeNote("");
      }
    } else {
      setIsWrong(true);
      setFeedbackMessage("Not quite right. Try again!");
      playWrongBuzzer();
      onRecordPerformance("stage3", false, currentExercise, typedAnswer);
    }
  }, [currentExercise, isCorrect, typedAnswer, onAwardXp, onRecordPerformance]);

  // Handle choice selection for multiple-choice questions
  const handleSelectOption = useCallback((option) => {
    if (!currentExercise || isCorrect || isAdvancingRef.current) return;
    setSelectedOption(option);

    const cleanOption = normalizeText(option);
    const rawAccepted = Array.isArray(currentExercise.acceptedAnswers) && currentExercise.acceptedAnswers.length > 0
      ? currentExercise.acceptedAnswers
      : [currentExercise.answer];

    const normalizedAccepted = rawAccepted.map(a => normalizeText(a));
    const matched = option === currentExercise.answer || normalizedAccepted.includes(cleanOption);

    if (matched) {
      setIsCorrect(true);
      setIsWrong(false);
      setFeedbackMessage("Correct! +3 XP");
      playCorrectChime();

      if (!hasAwardedXpRef.current) {
        hasAwardedXpRef.current = true;
        onAwardXp(3);
        onRecordPerformance("stage3", true, currentExercise, option);
      }
    } else {
      setIsWrong(true);
      setFeedbackMessage("Not quite right. Try again!");
      playWrongBuzzer();
      onRecordPerformance("stage3", false, currentExercise, option);
    }
  }, [currentExercise, isCorrect, onAwardXp, onRecordPerformance]);

  // Advance to next question or complete module
  const handleAdvance = useCallback(() => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    playHoverTick();

    const isLastQuestionInLevel =
      exerciseIndex === (currentLevel?.exercises?.length || 0) - 1;
    const isLastLevel = levelIndex === levels.length - 1;

    if (isLastQuestionInLevel && isLastLevel) {
      onCompleteModule();
    } else {
      onNextQuestion();
    }
  }, [exerciseIndex, currentLevel, levelIndex, levels, onCompleteModule, onNextQuestion]);

  // Global keyboard listener: Enter advances when question is answered correctly
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Enter" && isCorrect) {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isCorrect, handleAdvance]);

  // Two-state Keyboard shortcut on input: Enter checks answer -> Enter advances
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isCorrect) {
        handleAdvance();
      } else if (typedAnswer.trim()) {
        handleCheckAnswer();
      }
    }
  };

  // Hint handling with XP check
  const handleRequestHint = () => {
    if (showHint) {
      setShowHint(false);
      return;
    }
    if (hintUsedForQuestion) {
      setShowHint(true);
      return;
    }
    if (currentXp < 5) {
      setFeedbackMessage(`You need at least 5 XP to unlock a hint. (Current: ${currentXp} XP)`);
      return;
    }

    const deducted = onDeductXp(5);
    if (deducted !== false) {
      setHintUsedForQuestion(true);
      setShowHint(true);
      playSynapsePulse();
    }
  };

  const handleReadHintAloud = () => {
    const hintText = currentExercise?.hint;
    if (hintText && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(hintText);
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const isLastQuestionOverall =
    levelIndex === levels.length - 1 &&
    exerciseIndex === (currentLevel?.exercises?.length || 0) - 1;

  return (
    <div className="page">
      {/* TOP BAR */}
        <div className="top-bar">
          <button
            type="button"
            className="back-button"
            onClick={onBackToStages}
            aria-label="Return to Stages"
          >
            ← Stages
          </button>

          <div className="score-display" aria-label={`Total score ${currentXp} XP`}>
            <span style={{ fontSize: "0.85em", opacity: 0.85, marginRight: "4px" }}>Total:</span>
            {currentXp} XP
          </div>
        </div>

        {/* STAGE CARD */}
        <section className="stage-card">
          <p className="eyebrow">
            Class {classNumber} • Module 03: Written Expression
          </p>

          <div className="current-level-display">
            <span className="current-level-pill">
              Level {levelIndex + 1} • {currentLevel?.difficulty || "Easy"}
            </span>
          </div>

          {/* PROGRESS BARS */}
          <div className="progress-area" style={{ marginTop: "15px" }}>
            <div className="progress-label">
              <span>Module 03 Progress</span>
              <span>{completedBefore + (isCorrect ? 1 : 0)} / {totalQuestions}</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${overallProgress}%`, transition: "width 0.3s ease" }}
              />
            </div>
            <p style={{ textAlign: "center", fontWeight: "700", marginTop: "6px", fontSize: "14px" }}>
              {overallProgress}% Completed
            </p>
          </div>

          {/* EXERCISE CARD */}
          <div className="exercise-card" style={{ marginTop: "24px" }}>
            <div className="exercise-header">
              <span className="exercise-type">Module 03: Written Expression</span>
              <span className="question-level-badge">
                Level {levelIndex + 1}
              </span>
              <span>
                Question {exerciseIndex + 1} / {currentLevel?.exercises?.length || 9}
              </span>
            </div>

            {/* QUESTION DISPLAY */}
            <h2 style={{ fontSize: "1.6rem", margin: "20px 0 10px", lineHeight: "1.4" }}>
              {currentExercise?.question || currentExercise?.prompt}
            </h2>

            {/* INTERACTION AREA: MULTIPLE CHOICE BUTTONS OR TYPED INPUT */}
            {isMultipleChoice ? (
              <div
                className="mc-options-area"
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  width: "100%"
                }}
              >
                {/* ANSWER OPTIONS GRID */}
                <div
                  className="answer-grid"
                  style={{
                    width: "100%",
                    maxWidth: "760px",
                    margin: "0 auto"
                  }}
                >
                  {currentExercise.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isThisOptionCorrect =
                      option === currentExercise.answer ||
                      normalizeText(option) === normalizeText(currentExercise.answer);

                    let buttonClass = "answer-button";
                    if (isSelected) {
                      buttonClass += isCorrect ? " correct" : " wrong";
                    } else if (isCorrect && isThisOptionCorrect) {
                      buttonClass += " correct";
                    }

                    return (
                      <button
                        key={`${idx}-${option}`}
                        type="button"
                        className={buttonClass}
                        disabled={isCorrect}
                        onClick={() => handleSelectOption(option)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* ADVANCE BUTTON FOR MULTIPLE CHOICE */}
                {isCorrect && (
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      marginTop: "12px"
                    }}
                  >
                    <button
                      type="button"
                      className="save-button next-button"
                      onClick={handleAdvance}
                      style={{
                        minWidth: "180px",
                        padding: "12px 28px",
                        fontSize: "1.05rem",
                        fontWeight: "700"
                      }}
                    >
                      {isLastQuestionOverall ? "Complete Module 3" : "Next Question →"}
                    </button>
                  </div>
                )}

                {isCorrect && (
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: "#64748b",
                      fontWeight: "500",
                      marginTop: "2px"
                    }}
                  >
                    Press <kbd style={{ padding: "2px 6px", background: "#e2e8f0", borderRadius: "4px", fontWeight: "700" }}>Enter ↵</kbd> or tap Next Question
                  </span>
                )}
              </div>
            ) : (
              <div
                className="typed-input-area"
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  width: "100%"
                }}
              >
                <div style={{ width: "100%", maxWidth: "520px" }}>
                  <label
                    htmlFor="module3-answer-input"
                    style={{
                      display: "block",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      marginBottom: "8px",
                      textAlign: "left",
                      color: "var(--text-muted, #475569)"
                    }}
                  >
                    Type your answer:
                  </label>
                  <input
                    id="module3-answer-input"
                    ref={inputRef}
                    type="text"
                    value={typedAnswer}
                    onChange={(e) => {
                      setTypedAnswer(e.target.value);
                      if (isWrong) setIsWrong(false);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your answer here..."
                    disabled={isCorrect}
                    aria-label="Type your answer"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      fontFamily: "var(--sans, inherit)",
                      borderRadius: "14px",
                      border: isCorrect
                        ? "2.5px solid #16a34a"
                        : isWrong
                        ? "2.5px solid #ef4444"
                        : "2px solid #cbd5e1",
                      background: isCorrect ? "#f0fdf4" : isWrong ? "#fef2f2" : "#ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      textAlign: "center",
                      letterSpacing: "1px",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* ACTION BUTTONS (CHECK ANSWER / NEXT QUESTION) */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                  {!isCorrect ? (
                    <button
                      type="button"
                      className="primary-button"
                      disabled={!typedAnswer.trim()}
                      onClick={handleCheckAnswer}
                      style={{
                        minWidth: "170px",
                        padding: "12px 24px",
                        fontSize: "1.05rem",
                        fontWeight: "700"
                      }}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="save-button next-button"
                      onClick={handleAdvance}
                      style={{
                        minWidth: "180px",
                        padding: "12px 28px",
                        fontSize: "1.05rem",
                        fontWeight: "700"
                      }}
                    >
                      {isLastQuestionOverall ? "Complete Module 3" : "Next Question →"}
                    </button>
                  )}

                  {isWrong && !isCorrect && (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        setTypedAnswer("");
                        setIsWrong(false);
                        setFeedbackMessage("");
                        if (inputRef.current) inputRef.current.focus();
                      }}
                    >
                      Try Again
                    </button>
                  )}
                </div>

                {/* HELPFUL KEYBOARD HINT */}
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#64748b",
                    fontWeight: "500",
                    marginTop: "-4px"
                  }}
                >
                  Press <kbd style={{ padding: "2px 6px", background: "#e2e8f0", borderRadius: "4px", fontWeight: "700" }}>Enter ↵</kbd> to {isCorrect ? "continue" : "check"}
                </span>
              </div>
            )}

            {/* FEEDBACK BANNERS */}
            {isCorrect && (
              <div
                className="feedback correct-feedback"
                style={{
                  marginTop: "18px",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "700"
                }}
              >
                {feedbackMessage}
              </div>
            )}

            {isWrong && !isCorrect && (
              <div
                className="feedback wrong-feedback"
                style={{
                  marginTop: "18px",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "600"
                }}
              >
                {feedbackMessage}
              </div>
            )}

            {/* PIP MONKEY COMPANION & HINT AREA */}
            <div className="companion-bottom-bar">
              <div
                className="companion-avatar-wrap"
                onClick={handleRequestHint}
                title="Click Pip the Capuchin Monkey for a hint!"
                style={{ cursor: "pointer" }}
              >
                <PipMonkey size="small" />
              </div>

              <div className="companion-dialogue-col">
                {/* 1. When the question is answered correctly: Pip shows companion praise or bonus observation */}
                {isCorrect ? (
                  <div
                    className="companion-dialogue-bubble"
                    style={{
                      background: "#f0fdf4",
                      border: "2px solid #86efac",
                      boxShadow: "0 4px 12px rgba(22, 101, 52, 0.08)",
                      width: "100%",
                      boxSizing: "border-box"
                    }}
                  >
                    <div
                      className="dialogue-header"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "700",
                        color: "#166534"
                      }}
                    >
                      {companionAlternativeNote ? (
                        <>
                          <IconStar size={16} />
                          <span className="companion-name-tag" style={{ color: "#166534" }}>
                            Pip's Bonus Observation
                          </span>
                        </>
                      ) : (
                        <>
                          <IconCheck size={16} />
                          <span className="companion-name-tag" style={{ color: "#166534" }}>
                            Pip's Treehouse Praise
                          </span>
                        </>
                      )}
                    </div>
                    <p
                      className="dialogue-message"
                      style={{
                        margin: "8px 0 0",
                        color: "#15803d",
                        fontWeight: "600",
                        fontSize: "1rem",
                        lineHeight: "1.55"
                      }}
                    >
                      {companionAlternativeNote
                        ? companionAlternativeNote
                        : "Awesome word weaving! Press Enter ↵ or tap Next Question to keep adventuring!"}
                    </p>
                  </div>
                ) : (
                  /* 2. When question is in progress: Pip offers hint button or displays spelling clue */
                  showHint ? (
                    <div
                      className="companion-dialogue-bubble"
                      style={{
                        width: "100%",
                        boxSizing: "border-box"
                      }}
                    >
                      <div
                        className="dialogue-header"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap"
                        }}
                      >
                        <span className="companion-name-tag">
                          <IconLightbulb size={16} /> Pip's Spelling Clue
                        </span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button
                            type="button"
                            className="shape-fact-audio-btn read-aloud-btn"
                            onClick={handleReadHintAloud}
                            style={{
                              fontSize: "0.82rem",
                              padding: "4px 10px",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                          >
                            <IconVolume size={14} /> Read Aloud
                          </button>
                          <button
                            type="button"
                            className="btn-dismiss-hint"
                            onClick={() => setShowHint(false)}
                          >
                            ✕ Hide
                          </button>
                        </div>
                      </div>
                      <p
                        className="dialogue-message"
                        style={{
                          marginTop: "8px",
                          fontSize: "1rem",
                          lineHeight: "1.55"
                        }}
                      >
                        {currentExercise?.hint || "Sound out each letter slowly to weave the word together!"}
                      </p>
                    </div>
                  ) : (
                    <div className="companion-idle-bar">
                      <button
                        type="button"
                        className="btn-request-hint"
                        onClick={handleRequestHint}
                        disabled={currentXp < 5 && !hintUsedForQuestion}
                      >
                        <IconLightbulb size={16} /> Need a Hint from Pip? (-5 XP)
                      </button>
                      <span className="companion-idle-subtext">
                        {currentXp < 5 && !hintUsedForQuestion
                          ? `You need at least 5 XP to use a hint. (Current: ${currentXp} XP)`
                          : "Pip is watching from the treehouse. Tap for a helpful spelling clue!"}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
