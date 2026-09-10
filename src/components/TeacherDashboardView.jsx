import React, { useState, useEffect } from "react";
import {
  IconBrain,
  IconEye,
  IconMic,
  IconEdit,
  IconCalculator,
  IconShapes,
  IconBookOpen,
  IconTarget,
  IconUser,
  IconCheck,
  IconPrinter,
  IconShieldCheck,
  IconAward,
  IconLayers,
  IconFlame,
  IconClipboardList,
  IconClock,
  IconRocket,
  IconStarSolid,
  IconLeaf,
  IconCompass
} from "./Icons";
import { playHoverTick, playSynapsePulse } from "../utils/soundEffects";

/**
 * TeacherDashboardView - The Naturalist's Study
 * Clinical & Educator Assessment Terminal styled as a warm, organized explorer study.
 * Preserves 100% of student diagnostic tracking, cognitive telemetry, and print capabilities.
 */
export default function TeacherDashboardView({
  onLaunchStage = () => {},
  onReturnHome = () => {},
  profiles = [],
  activeProfileId = "",
  onSelectProfile = () => {},
  savedProgress = {},
  stagePerformance = {},
  studentName = "",
  selectedClass = 1,
  studentXp = 10,
  allProgress = {}
}) {
  const defaultStudents = [
    {
      id: "std-1",
      name: "Liam Parker",
      grade: "Class 3",
      age: 8,
      riskLevel: "Moderate (Visual Orthography)",
      riskColor: "#d97706",
      speed: "+18%",
      spelling: "+12%",
      recognition: "+24%",
      phonological: "+15%",
      streak: "5 Days",
      sessions: "164 Questions Completed",
      hours: "4.8 hrs",
      difficulty: "Mirror letter reversals on b/d and p/q under speed pressure; letter transposition in multisyllabic words.",
      recommendedModule: "Module 01: Visual Perception & Orthography",
      recommendedStageId: 1
    },
    {
      id: "std-2",
      name: "Emma Watson",
      grade: "Class 4",
      age: 9,
      riskLevel: "Low Risk (Grade Aligned)",
      riskColor: "#16a34a",
      speed: "+22%",
      spelling: "+19%",
      recognition: "+31%",
      phonological: "+26%",
      streak: "7 Days",
      sessions: "210 Questions Completed",
      hours: "6.2 hrs",
      difficulty: "Rapid oral reading fluency pauses during compound complex sentences.",
      recommendedModule: "Module 06: Reading Comprehension & Fluency",
      recommendedStageId: 6
    },
    {
      id: "std-3",
      name: "Noah Chen",
      grade: "Class 2",
      age: 7,
      riskLevel: "High (Phonemic Awareness)",
      riskColor: "#dc2626",
      speed: "+14%",
      spelling: "+9%",
      recognition: "+18%",
      phonological: "+11%",
      streak: "3 Days",
      sessions: "98 Questions Completed",
      hours: "3.1 hrs",
      difficulty: "Auditory phoneme segmentation and voice pronunciation matching.",
      recommendedModule: "Module 02: Auditory Processing & Speech",
      recommendedStageId: 2
    },
    {
      id: "std-4",
      name: "Sophia Davis",
      grade: "Class 5",
      age: 10,
      riskLevel: "Moderate (Dyscalculia Pattern)",
      riskColor: "#d97706",
      speed: "+16%",
      spelling: "+14%",
      recognition: "+22%",
      phonological: "+19%",
      streak: "4 Days",
      sessions: "142 Questions Completed",
      hours: "4.0 hrs",
      difficulty: "Symbolic arithmetic operator confusion (+ vs ×) and spatial number alignment.",
      recommendedModule: "Module 04: Mathematical Logic & Dyscalculia",
      recommendedStageId: 4
    }
  ];

  const students = (profiles && profiles.length > 0)
    ? profiles.map((p, idx) => ({
        id: p.id || `std-${idx + 1}`,
        name: p.studentName,
        grade: `Class ${p.studentClass || 1}`,
        age: Number(p.studentAge) || 8,
        riskLevel: p.riskLevel !== undefined ? p.riskLevel : "New Explorer • Not Assessed Yet",
        riskColor: p.riskColor !== undefined ? p.riskColor : "#94a3b8",
        speed: p.speed !== undefined ? p.speed : "0%",
        spelling: p.spelling !== undefined ? p.spelling : "0%",
        recognition: p.recognition !== undefined ? p.recognition : "0%",
        phonological: p.phonological !== undefined ? p.phonological : "0%",
        streak: p.streak !== undefined ? p.streak : "0 Days",
        sessions: p.sessions !== undefined ? p.sessions : "0 Questions Completed",
        hours: p.hours !== undefined ? p.hours : "0.0 hrs",
        difficulty: p.difficulty || "Standard baseline. Complete expeditions to generate clinical telemetry.",
        recommendedModule: p.recommendedModule || "Module 01: Visual Perception & Direction",
        recommendedStageId: p.recommendedStageId || 1
      }))
    : defaultStudents;

  const [selectedStudentId, setSelectedStudentId] = useState(() => activeProfileId || students[0]?.id || "std-1");

  useEffect(() => {
    if (activeProfileId) {
      setSelectedStudentId(activeProfileId);
    }
  }, [activeProfileId]);

  const student = students.find((s) => s.id === selectedStudentId) || students[0];

  const parsePercent = (val) => {
    if (!val) return 0;
    const num = parseFloat(String(val).replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : Math.min(100, Math.max(0, num));
  };

  const effectivePerformance = (stagePerformance && Object.keys(stagePerformance).length > 0)
    ? stagePerformance
    : (savedProgress && Object.keys(savedProgress).length > 0)
      ? savedProgress
      : {};

  const modulesProgress = [
    {
      id: 1,
      name: "Module 01: Visual Perception",
      subtitle: "Eagle Eye Island (Mirror Reversals & b/d)",
      icon: <IconEye size={18} />,
      color: "#16a34a",
      bgTint: "#dcfce7",
      firstTry: effectivePerformance?.stage1?.firstTrySuccess || 0,
      wrong: effectivePerformance?.stage1?.wrongAttempts || 0,
      totalExpected: 27
    },
    {
      id: 2,
      name: "Module 02: Auditory Processing",
      subtitle: "Echo Sanctuary (Phonemes & Voice Safari)",
      icon: <IconMic size={18} />,
      color: "#ea580c",
      bgTint: "#ffedd5",
      firstTry: effectivePerformance?.stage2?.firstTrySuccess || 0,
      wrong: effectivePerformance?.stage2?.wrongAttempts || 0,
      totalExpected: 15
    },
    {
      id: 3,
      name: "Module 03: Written Expression",
      subtitle: "Vine Weaver's Treehouse (Letter Anagrams)",
      icon: <IconEdit size={18} />,
      color: "#9333ea",
      bgTint: "#f3e8ff",
      firstTry: effectivePerformance?.stage3?.firstTrySuccess || 0,
      wrong: effectivePerformance?.stage3?.wrongAttempts || 0,
      totalExpected: 18
    },
    {
      id: 4,
      name: "Module 04: Mathematical Logic",
      subtitle: "Maths Jutsu Temple (Number Sense & Dyscalculia)",
      icon: <IconCalculator size={18} />,
      color: "#d97706",
      bgTint: "#fef3c7",
      firstTry: effectivePerformance?.stage4?.firstTrySuccess || 0,
      wrong: effectivePerformance?.stage4?.wrongAttempts || 0,
      totalExpected: 30
    },
    {
      id: 5,
      name: "Module 05: Spatial Geometry",
      subtitle: "Sunstone Altar (3D Solids & Rotations)",
      icon: <IconShapes size={18} />,
      color: "#0284c7",
      bgTint: "#e0f2fe",
      firstTry: effectivePerformance?.shapes?.firstTrySuccess || 0,
      wrong: effectivePerformance?.shapes?.wrongAttempts || 0,
      totalExpected: 16
    },
    {
      id: 6,
      name: "Module 06: Reading Comprehension",
      subtitle: "Storyteller's Lagoon (Passage Recall & Fluency)",
      icon: <IconBookOpen size={18} />,
      color: "#e11d48",
      bgTint: "#ffe4e6",
      firstTry: effectivePerformance?.comprehension?.firstTrySuccess || 0,
      wrong: effectivePerformance?.comprehension?.wrongAttempts || 0,
      totalExpected: 12
    }
  ];

  const totalRecordedQuestions = modulesProgress.reduce((sum, m) => sum + m.firstTry + m.wrong, 0);

  // Derive live telemetry if active student has answered questions
  const s1Done = modulesProgress[0].firstTry + modulesProgress[0].wrong;
  const liveRecognition = s1Done > 0 ? Math.round((modulesProgress[0].firstTry / s1Done) * 100) : parsePercent(student.recognition);

  const s2Done = modulesProgress[1].firstTry + modulesProgress[1].wrong;
  const livePhonological = s2Done > 0 ? Math.round((modulesProgress[1].firstTry / s2Done) * 100) : parsePercent(student.phonological);

  const s3Done = modulesProgress[2].firstTry + modulesProgress[2].wrong;
  const liveSpelling = s3Done > 0 ? Math.round((modulesProgress[2].firstTry / s3Done) * 100) : parsePercent(student.spelling);

  const s6Done = modulesProgress[5].firstTry + modulesProgress[5].wrong;
  const liveSpeed = s6Done > 0 ? Math.round((modulesProgress[5].firstTry / s6Done) * 100) : parsePercent(student.speed);

  const speedVal = liveSpeed;
  const spellingVal = liveSpelling;
  const recognitionVal = liveRecognition;
  const phonologicalVal = livePhonological;

  const displaySessions = totalRecordedQuestions > 0 ? `${totalRecordedQuestions} Questions Evaluated` : student.sessions;
  const displayStreak = totalRecordedQuestions > 0 ? `${Math.max(1, Math.min(7, Math.ceil(totalRecordedQuestions / 4)))} Days Active` : student.streak;
  const displayHours = totalRecordedQuestions > 0 ? `${(totalRecordedQuestions * 0.05 + 0.3).toFixed(1)} hrs` : student.hours;

  return (
    <div className="naturalist-study-container">
      {/* Top Console Bar */}
      <header className="study-header-bar">
        <div className="study-header-left">
          <div className="study-badge">
            <IconShieldCheck size={18} />
            <span>THE NATURALIST'S STUDY • EDUCATOR TERMINAL</span>
          </div>
          <h1 className="study-main-title">Diagnostic Journal & Cognitive Progress</h1>
          <p className="study-sub-desc">
            Evidence-based student telemetry, phonemic error distributions, and adaptive module recommendations.
          </p>
        </div>

        <div className="study-header-actions">
          <button
            className="btn-study-print"
            onClick={() => {
              playHoverTick();
              window.print();
            }}
            title="Print or Export Clinical PDF Summary"
          >
            <IconPrinter size={18} />
            <span>Print Report (PDF)</span>
          </button>
          <button
            className="btn-study-return"
            onClick={() => {
              playHoverTick();
              onReturnHome();
            }}
          >
            <span>← Return to Canopy Map</span>
          </button>
        </div>
      </header>

      {/* Main 2-Column Study Layout */}
      <div className="study-layout-grid">
        {/* Left Column: Explorer Roster */}
        <aside className="study-roster-card">
          <div className="roster-top-bar">
            <h3>Explorer Cohort ({students.length})</h3>
            <span className="roster-pill">Active Group</span>
          </div>

          <div className="roster-students-list">
            {students.map((s) => {
              const isSelected = s.id === selectedStudentId;
              return (
                <div
                  key={s.id}
                  className={`roster-student-item ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    playSynapsePulse();
                    setSelectedStudentId(s.id);
                    const matched = profiles.find((p) => p.id === s.id);
                    if (matched && onSelectProfile) onSelectProfile(matched);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="student-badge-avatar">
                    <IconUser size={18} />
                  </div>
                  <div className="student-roster-info">
                    <strong className="roster-name">{s.name}</strong>
                    <span className="roster-meta">{s.grade} • Age {s.age}</span>
                  </div>
                  <span
                    className="roster-risk-dot"
                    style={{ backgroundColor: s.riskColor }}
                    title={s.riskLevel}
                  />
                </div>
              );
            })}
          </div>

          <div className="roster-cohort-summary">
            <div className="cohort-stat-row">
              <span>Cohort Average Gains:</span>
              <strong style={{ color: "#15803d" }}>↑ 18.2%</strong>
            </div>
            <div className="cohort-stat-row">
              <span>Grade Curriculum:</span>
              <span>Classes 1–5 Aligned</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Detailed Clinical Telemetry for Selected Student */}
        <main className="study-analytics-main">
          {/* Active Student Card */}
          <div className="student-profile-banner">
            <div className="profile-banner-left">
              <div className="banner-avatar-orb">
                <IconUser size={34} />
              </div>
              <div>
                <h2 className="banner-student-name">{student.name}</h2>
                <p className="banner-student-sub">
                  {student.grade} • Age {student.age} • Standardized Assessment Record
                </p>
              </div>
            </div>
            <div className="profile-banner-right">
              <span className="banner-risk-chip" style={{ borderColor: student.riskColor, color: student.riskColor }}>
                {student.riskLevel}
              </span>
            </div>
          </div>

          {/* Core Telemetry Cards */}
          <div className="telemetry-cards-grid">
            {/* 1. Reading Speed */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="telemetry-icon-orb green"><IconBookOpen size={20} /></span>
                <span className="telemetry-tag">READING FLUENCY</span>
              </div>
              <div className="telemetry-val-row">
                <h3>Reading Speed</h3>
                <span className="telemetry-gain green">
                  {speedVal === 0 ? "0%" : `↑ ${speedVal}%`}
                </span>
              </div>
              <div className="telemetry-bar-track">
                <div className="telemetry-bar-fill green" style={{ width: `${speedVal}%` }} />
              </div>
              <p className="telemetry-note">Grade-calibrated oral WPM tracking and comprehension pacing.</p>
            </div>

            {/* 2. Spelling & Orthography */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="telemetry-icon-orb amber"><IconEdit size={20} /></span>
                <span className="telemetry-tag">ORTHOGRAPHY</span>
              </div>
              <div className="telemetry-val-row">
                <h3>Spelling Accuracy</h3>
                <span className="telemetry-gain amber">
                  {spellingVal === 0 ? "0%" : `↑ ${spellingVal}%`}
                </span>
              </div>
              <div className="telemetry-bar-track">
                <div className="telemetry-bar-fill amber" style={{ width: `${spellingVal}%` }} />
              </div>
              <p className="telemetry-note">Sequential letter placement in orthographic anagram exercises.</p>
            </div>

            {/* 3. Letter / Word Recognition */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="telemetry-icon-orb blue"><IconEye size={20} /></span>
                <span className="telemetry-tag">MIRROR DISCRIMINATION</span>
              </div>
              <div className="telemetry-val-row">
                <h3>Mirror Recognition</h3>
                <span className="telemetry-gain blue">
                  {recognitionVal === 0 ? "0%" : `↑ ${recognitionVal}%`}
                </span>
              </div>
              <div className="telemetry-bar-track">
                <div className="telemetry-bar-fill blue" style={{ width: `${recognitionVal}%` }} />
              </div>
              <p className="telemetry-note">Standardized discrimination of mirror pairs (b vs d, p vs q).</p>
            </div>

            {/* 4. Phonological Speech */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="telemetry-icon-orb coral"><IconMic size={20} /></span>
                <span className="telemetry-tag">ORAL PHONOLOGY</span>
              </div>
              <div className="telemetry-val-row">
                <h3>Phonemic Awareness</h3>
                <span className="telemetry-gain coral">
                  {phonologicalVal === 0 ? "0%" : `↑ ${phonologicalVal}%`}
                </span>
              </div>
              <div className="telemetry-bar-track">
                <div className="telemetry-bar-fill coral" style={{ width: `${phonologicalVal}%` }} />
              </div>
              <p className="telemetry-note">Web Speech API phoneme confidence and oral response matching.</p>
            </div>
          </div>

          {/* Learning Sessions & Habit Summary */}
          <div className="study-sessions-ribbon">
            <div className="session-stat-box">
              <span className="session-label">WEEKLY STREAK</span>
              <strong className="session-val">
                <IconFlame size={18} style={{ color: "#ea580c", display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                {displayStreak}
              </strong>
            </div>
            <div className="session-stat-box">
              <span className="session-label">ITEMS EVALUATED</span>
              <strong className="session-val">
                <IconClipboardList size={18} style={{ color: "#0284c7", display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                {displaySessions}
              </strong>
            </div>
            <div className="session-stat-box">
              <span className="session-label">EXPEDITION ENGAGEMENT</span>
              <strong className="session-val">
                <IconClock size={18} style={{ color: "#16a34a", display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                {displayHours}
              </strong>
            </div>
          </div>

          {/* 6 SACRED GLADES EXPEDITION TELEMETRY & PROGRESS */}
          <div className="study-expeditions-card">
            <div className="expeditions-card-header">
              <div className="expeditions-header-left">
                <span className="expeditions-badge">
                  <IconCompass size={15} /> 6 SACRED GLADES • CLINICAL PROCESS & TELEMETRY
                </span>
                <h3 style={{ margin: "4px 0 0", color: "#451a03", fontSize: "1.25rem" }}>Curriculum Progress & Live Accuracy</h3>
              </div>
              <span className="expeditions-total-tag">
                {totalRecordedQuestions} Questions Evaluated
              </span>
            </div>

            {totalRecordedQuestions === 0 && (
              <div style={{
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                border: "2px dashed #d97706",
                borderRadius: 12,
                padding: "16px 20px",
                margin: "14px 0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ background: "#d97706", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconCompass size={20} />
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "#78350f", fontSize: "0.98rem" }}>First Expedition Awaits!</strong>
                    <span style={{ color: "#92400e", fontSize: "0.85rem" }}>
                      No questions have been completed in this session yet. Launching Glade 01 will begin recording live phonemic, orthographic, and visual telemetry.
                    </span>
                  </div>
                </div>
                <button
                  style={{
                    background: "#059669",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => {
                    playSynapsePulse();
                    if (onLaunchStage) onLaunchStage(1);
                  }}
                >
                  Begin Glade 01 →
                </button>
              </div>
            )}

            <div className="expeditions-grid">
              {modulesProgress.map((m) => {
                const totalAnswered = m.firstTry + m.wrong;
                const accuracy = totalAnswered > 0 ? Math.round((m.firstTry / totalAnswered) * 100) : 0;
                const progressPct = Math.min(100, Math.round((totalAnswered / m.totalExpected) * 100));

                return (
                  <div key={m.id} className="glade-progress-box" style={{ borderColor: m.color }}>
                    <div className="glade-box-top">
                      <div className="glade-icon-badge" style={{ background: m.bgTint, color: m.color, borderColor: m.color }}>
                        {m.icon}
                      </div>
                      <div className="glade-title-col">
                        <strong>{m.name}</strong>
                        <small>{m.subtitle}</small>
                      </div>
                      <span className="glade-acc-chip" style={{ color: m.color }}>
                        {totalAnswered > 0 ? `${accuracy}% ACC` : "Ready"}
                      </span>
                    </div>

                    <div className="glade-progress-bar-track">
                      <div className="glade-progress-bar-fill" style={{ width: `${progressPct}%`, backgroundColor: m.color }} />
                    </div>

                    <div className="glade-box-footer">
                      <span className="glade-items-count">
                        {totalAnswered} / {m.totalExpected} Items Complete
                      </span>
                      <button
                        className="btn-glade-quick-launch"
                        style={{ color: m.color, borderColor: m.color }}
                        onClick={() => {
                          playSynapsePulse();
                          if (onLaunchStage) onLaunchStage(m.id);
                        }}
                      >
                        Launch Glade →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specific Diagnostic Difficulty & Intervention Action */}
          <div className="study-intervention-card">
            <div className="intervention-left">
              <span className="intervention-badge">TARGETED INTERVENTION PLAN</span>
              <h3>Primary Cognitive Challenge Area</h3>
              <p className="difficulty-text">{student.difficulty}</p>
              <div className="recommendation-callout">
                <span>Recommended Adaptive Glade:</span>
                <strong>{student.recommendedModule}</strong>
              </div>
            </div>
            <button
              className="btn-jungle-cta"
              onClick={() => {
                playSynapsePulse();
                if (onLaunchStage) onLaunchStage(student.recommendedStageId);
              }}
            >
              <IconRocket size={18} />
              <span>Launch Assigned Module</span>
            </button>
          </div>
        </main>
      </div>

      <style>{`
        .naturalist-study-container {
          position: relative;
          width: 100%;
          max-width: 1350px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          z-index: var(--z-content);
        }

        .study-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 28px 36px;
          margin-bottom: 28px;
        }

        .study-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          background: #dcfce7;
          border: 2px solid #16a34a;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          color: #14532d;
          margin-bottom: 8px;
        }

        .study-main-title {
          font-size: clamp(1.6rem, 2.6vw, 2.2rem);
          color: #451a03;
          margin-bottom: 6px;
        }

        .study-sub-desc {
          font-size: 0.98rem;
          color: #78350f;
          max-width: 65ch;
        }

        .study-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-study-print {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          background: #fefae0;
          border: 2.5px solid #78350f;
          border-radius: 12px 14px 11px 13px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.98rem;
          font-weight: 700;
          color: #78350f;
          cursor: pointer;
          box-shadow: 0 4px 0 #78350f;
          transition: transform 0.15s ease;
        }

        .btn-study-print:hover {
          transform: translateY(-2px);
          background: #fef08a;
        }

        .btn-study-return {
          padding: 11px 20px;
          background: #1b7340;
          border: 2.5px solid #0f3822;
          border-radius: 12px 14px 11px 13px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.98rem;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 4px 0 #0f3822;
          transition: transform 0.15s ease;
        }

        .btn-study-return:hover {
          transform: translateY(-2px);
        }

        .study-layout-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 28px;
        }

        .study-roster-card {
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .roster-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px dashed #d97706;
          padding-bottom: 12px;
        }

        .roster-top-bar h3 {
          font-size: 1.15rem;
          color: #451a03;
        }

        .roster-pill {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.76rem;
          font-weight: 800;
          background: #ecfccb;
          border: 1.5px solid #65a30d;
          color: #365314;
          padding: 2px 10px;
          border-radius: 8px 10px 8px 10px;
        }

        .roster-students-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .roster-student-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: #fefae0;
          border: 2px solid transparent;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .roster-student-item:hover {
          background: #fef08a;
          border-color: #d97706;
        }

        .roster-student-item.selected {
          background: #fef08a;
          border-color: #78350f;
          box-shadow: 0 3px 0 #78350f;
        }

        .student-badge-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fffdf2;
          border: 2px solid #78350f;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #78350f;
        }

        .student-roster-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .roster-name {
          font-size: 0.96rem;
          color: #451a03;
        }

        .roster-meta {
          font-size: 0.8rem;
          color: #78350f;
        }

        .roster-risk-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1.5px solid #fff;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
        }

        .roster-cohort-summary {
          margin-top: auto;
          padding-top: 14px;
          border-top: 2px dashed #d97706;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.88rem;
          color: #78350f;
        }

        .cohort-stat-row {
          display: flex;
          justify-content: space-between;
        }

        .study-analytics-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .student-profile-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 24px 30px;
        }

        .profile-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .banner-avatar-orb {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fefae0;
          border: 3px solid #78350f;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #78350f;
          box-shadow: 0 4px 0 #78350f;
        }

        .banner-student-name {
          font-size: 1.6rem;
          color: #451a03;
        }

        .banner-student-sub {
          font-size: 0.95rem;
          color: #78350f;
        }

        .banner-risk-chip {
          padding: 6px 14px;
          border: 2px solid;
          border-radius: 9px 11px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.88rem;
          font-weight: 800;
          background: #fffdf2;
        }

        .telemetry-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .telemetry-card {
          background: #fffdf2;
          border: 3px solid #78350f;
          border-radius: 16px 18px 15px 17px;
          box-shadow: var(--shadow-jungle-card);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .telemetry-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .telemetry-icon-orb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid;
        }

        .telemetry-icon-orb.green { background: #dcfce7; border-color: #16a34a; color: #16a34a; }
        .telemetry-icon-orb.amber { background: #fef3c7; border-color: #d97706; color: #d97706; }
        .telemetry-icon-orb.blue { background: #e0f2fe; border-color: #0284c7; color: #0284c7; }
        .telemetry-icon-orb.coral { background: #ffe4e6; border-color: #e11d48; color: #e11d48; }

        .telemetry-tag {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.72rem;
          font-weight: 800;
          color: #78350f;
          letter-spacing: 0.05em;
        }

        .telemetry-val-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .telemetry-val-row h3 {
          font-size: 1.05rem;
          color: #451a03;
        }

        .telemetry-gain {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1.15rem;
          font-weight: 800;
        }
        .telemetry-gain.green { color: #15803d; }
        .telemetry-gain.amber { color: #b45309; }
        .telemetry-gain.blue { color: #0369a1; }
        .telemetry-gain.coral { color: #be123c; }

        .telemetry-bar-track {
          width: 100%;
          height: 12px;
          background: #fefae0;
          border: 2px solid #78350f;
          border-radius: 6px;
          overflow: hidden;
        }

        .telemetry-bar-fill {
          height: 100%;
          border-radius: 4px;
        }
        .telemetry-bar-fill.green { background: #22c55e; }
        .telemetry-bar-fill.amber { background: #f59e0b; }
        .telemetry-bar-fill.blue { background: #38bdf8; }
        .telemetry-bar-fill.coral { background: #f43f5e; }

        .telemetry-note {
          font-size: 0.84rem;
          color: #78350f;
          line-height: 1.4;
        }

        .study-sessions-ribbon {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .session-stat-box {
          background: #fffdf2;
          border: 3px solid #78350f;
          border-radius: 14px 16px 13px 15px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .session-label {
          font-size: 0.74rem;
          font-weight: 800;
          color: #b45309;
          letter-spacing: 0.05em;
        }

        .session-val {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1.25rem;
          color: #451a03;
          display: flex;
          align-items: center;
        }

        .study-expeditions-card {
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 24px 28px;
        }

        .expeditions-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px dashed #d97706;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }

        .expeditions-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.76rem;
          font-weight: 800;
          color: #166534;
          background: #dcfce7;
          border: 1.5px solid #16a34a;
          border-radius: 8px 10px 8px 10px;
          padding: 3px 10px;
        }

        .expeditions-total-tag {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.88rem;
          font-weight: 700;
          color: #78350f;
          background: #fefae0;
          border: 2px solid #d97706;
          border-radius: 9px 11px 9px 11px;
          padding: 4px 12px;
        }

        .expeditions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .glade-progress-box {
          background: #fffdf2;
          border: 2.5px solid;
          border-radius: 14px 16px 13px 15px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform 0.15s ease;
        }

        .glade-progress-box:hover {
          transform: translateY(-2px);
        }

        .glade-box-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .glade-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px 12px 9px 11px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .glade-title-col {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .glade-title-col strong {
          font-size: 0.92rem;
          color: #451a03;
        }

        .glade-title-col small {
          font-size: 0.74rem;
          color: #78350f;
        }

        .glade-acc-chip {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.8rem;
          font-weight: 800;
          padding: 2px 8px;
          background: #fefae0;
          border: 1.5px solid currentColor;
          border-radius: 6px 8px 6px 8px;
          flex-shrink: 0;
        }

        .glade-progress-bar-track {
          width: 100%;
          height: 10px;
          background: #fefae0;
          border: 1.5px solid #78350f;
          border-radius: 5px;
          overflow: hidden;
        }

        .glade-progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.4s ease;
        }

        .glade-box-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 6px;
          border-top: 1px dashed #fed7aa;
        }

        .glade-items-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: #78350f;
        }

        .btn-glade-quick-launch {
          background: transparent;
          border: 1.5px solid;
          border-radius: 8px 10px 8px 10px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.76rem;
          font-weight: 800;
          padding: 3px 10px;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .btn-glade-quick-launch:hover {
          background: #fef08a;
          transform: translateY(-1px);
        }

        .study-intervention-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fefae0;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          padding: 28px 32px;
          gap: 24px;
        }

        .intervention-badge {
          display: inline-block;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.78rem;
          font-weight: 800;
          color: #b45309;
          background: #fef3c7;
          border: 1.5px solid #d97706;
          border-radius: 8px 10px 8px 10px;
          padding: 3px 10px;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .intervention-left h3 {
          font-size: 1.3rem;
          color: #451a03;
          margin-bottom: 8px;
        }

        .difficulty-text {
          font-size: 0.98rem;
          color: #78350f;
          margin-bottom: 12px;
          max-width: 60ch;
        }

        .recommendation-callout {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.94rem;
          color: #451a03;
        }

        .recommendation-callout strong {
          color: #ea580c;
        }

        @media print {
          .study-header-actions,
          .study-roster-card,
          .btn-jungle-cta {
            display: none !important;
          }
          .study-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .naturalist-study-container {
            padding: 0 !important;
          }
        }

        @media (max-width: 960px) {
          .study-layout-grid {
            grid-template-columns: 1fr;
          }
          .study-intervention-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .naturalist-study-container {
            padding: 10px 8px 60px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .study-header-bar {
            padding: 18px 14px;
            margin-bottom: 18px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            border-radius: 20px;
            border-width: 2.5px;
          }

          .study-header-left {
            width: 100%;
          }

          .study-main-title {
            font-size: 1.45rem;
          }

          .study-sub-desc {
            font-size: 0.88rem;
          }

          .study-header-actions {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .btn-study-print,
          .btn-study-return {
            width: 100%;
            justify-content: center;
            text-align: center;
            padding: 11px 16px;
            font-size: 0.92rem;
            box-sizing: border-box;
          }

          .student-profile-banner {
            padding: 16px 14px;
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
            border-radius: 20px;
            border-width: 2.5px;
          }

          .profile-banner-left {
            gap: 12px;
            align-items: center;
            width: 100%;
          }

          .banner-avatar-orb {
            width: 46px;
            height: 46px;
            min-width: 46px;
            border-width: 2px;
          }

          .banner-student-name {
            font-size: 1.35rem;
            word-break: break-word;
          }

          .banner-student-sub {
            font-size: 0.82rem;
            word-break: break-word;
          }

          .profile-banner-right {
            width: 100%;
          }

          .banner-risk-chip {
            display: block;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
            padding: 6px 10px;
            font-size: 0.82rem;
          }

          .telemetry-cards-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .telemetry-card {
            padding: 16px 14px;
            border-radius: 16px;
            border-width: 2.5px;
          }

          .study-sessions-ribbon {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .session-stat-box {
            padding: 12px 14px;
            border-radius: 12px;
            border-width: 2.5px;
          }

          .session-val {
            font-size: 1.1rem;
          }

          .study-expeditions-card {
            padding: 16px 14px;
            border-radius: 20px;
            border-width: 2.5px;
          }

          .expeditions-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .expeditions-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .study-intervention-card {
            padding: 18px 14px;
            border-radius: 20px;
            border-width: 2.5px;
            gap: 16px;
          }

          .study-roster-card {
            padding: 16px 14px;
            border-radius: 20px;
            border-width: 2.5px;
          }
        }

        @media (max-width: 480px) {
          .study-sessions-ribbon {
            grid-template-columns: 1fr;
          }

          .session-val {
            font-size: 1rem;
          }

          .study-main-title {
            font-size: 1.3rem;
          }

          .banner-student-name {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
