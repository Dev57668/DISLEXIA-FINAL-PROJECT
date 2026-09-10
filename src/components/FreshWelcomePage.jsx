import React, { useState, useEffect } from "react";
import UniversalAppHeader from "./UniversalAppHeader";
import HolographicWorldCenterpiece from "./3d/HolographicWorldCenterpiece";
import Card3D from "./3d/Card3D";
import TeacherDashboardView from "./TeacherDashboardView";
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
  IconLayers,
  IconChevronRight,
  IconShieldCheck,
  IconAward,
  IconStar,
  IconVolume,
  IconVolumeOff,
  IconCheck,
  IconClipboardList,
  IconCross,
  IconSparkles
} from "./Icons";
import {
  playHoverTick,
  playSynapsePulse,
  toggleSound,
  isSoundEnabled
} from "../utils/soundEffects";

export default function FreshWelcomePage({
  onStartLearning = () => {},
  onTakeScreening = () => {},
  onLaunchStage = () => {},
  onNavigate = () => {},
  studentName = "",
  selectedClass = 1,
  profiles = [],
  onSelectProfile = () => {},
  onDeleteProfile = () => {}
}) {
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showProfilesModal, setShowProfilesModal] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(true);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [focusGuide, setFocusGuide] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    const handleAudioSync = (e) => {
      if (e?.detail?.enabled !== undefined) {
        setSoundOn(e.detail.enabled);
      } else {
        setSoundOn(isSoundEnabled());
      }
    };
    window.addEventListener("dyslexiaquest-audio-toggle", handleAudioSync);
    return () => window.removeEventListener("dyslexiaquest-audio-toggle", handleAudioSync);
  }, []);

  // 7 Core Cognitive Domains (Calm, Sophisticated Aesthetic)
  const learningWorlds = [
    {
      id: "world-1",
      number: "01",
      title: "Letter / Word Recognition",
      subtitle: "Orthographic Mapping & Identification",
      icon: <IconEye size={24} />,
      color: "#2dd4bf",
      stageId: 1,
      tag: "27 Visual Items",
      description: "Automated discrimination of letter features, baseline glyph shapes, and rapid word-form recognition."
    },
    {
      id: "world-2",
      number: "02",
      title: "Reading Speed & Fluency",
      subtitle: "Timed Oral & Silent Passage Pacing",
      icon: <IconBookOpen size={24} />,
      color: "#818cf8",
      stageId: 6,
      tag: "Class 1–5 Aligned",
      description: "Word-per-minute pacing, passage comprehension recall, and contextual sentence tracking."
    },
    {
      id: "world-3",
      number: "03",
      title: "Letter Confusion & Inversion",
      subtitle: "Mirror Pair Disambiguation (b/d/p/q)",
      icon: <IconShapes size={24} />,
      color: "#f87171",
      stageId: 1,
      tag: "Rotational Symmetry",
      description: "Standardized detection and 3D spatial correction of persistent mirror reversals and inversions."
    },
    {
      id: "world-4",
      number: "04",
      title: "Spelling Mastery",
      subtitle: "Phoneme-Grapheme Anagrams",
      icon: <IconEdit size={24} />,
      color: "#c084fc",
      stageId: 3,
      tag: "Word Reconstruction",
      description: "Sequential letter placement, lexical memory retrieval, and transposition error correction."
    },
    {
      id: "world-5",
      number: "05",
      title: "Phonological Awareness",
      subtitle: "Speech Recognition & Sound Segmentation",
      icon: <IconMic size={24} />,
      color: "#e2b170",
      stageId: 2,
      tag: "Browser Voice Engine",
      description: "Real-time speech analysis, syllable isolation, rhyming pairs, and phonemic awareness."
    },
    {
      id: "world-6",
      number: "06",
      title: "Working Memory Exercises",
      subtitle: "Sequential & Spatial Digit Recall",
      icon: <IconCalculator size={24} />,
      color: "#34d399",
      stageId: 4,
      tag: "Cognitive Load Buffer",
      description: "Multi-tier arithmetic operations, digit span retention, and dyscalculia screening."
    },
    {
      id: "world-7",
      number: "07",
      title: "Visual & 3D Spatial Processing",
      subtitle: "Mental Rotation & Form Reasoning",
      icon: <IconLayers size={24} />,
      color: "#38bdf8",
      stageId: 5,
      tag: "Interactive 3D Viewport",
      description: "360° rotational solid geometry inspection (cubes, cylinders, pyramids, prisms) to test spatial logic."
    }
  ];

  const handleFontToggle = () => {
    playHoverTick();
    setDyslexicFont((prev) => !prev);
    if (!dyslexicFont) {
      document.documentElement.style.setProperty("--sans", "'Lexend', sans-serif");
    } else {
      document.documentElement.style.setProperty("--sans", "'Plus Jakarta Sans', sans-serif");
    }
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playSynapsePulse();
  };

  const handleFocusGuideToggle = () => {
    playHoverTick();
    setFocusGuide((prev) => !prev);
  };

  const handleTextSizeToggle = () => {
    playHoverTick();
    setLargeText((prev) => !prev);
    if (!largeText) {
      document.documentElement.style.fontSize = "18px";
    } else {
      document.documentElement.style.fontSize = "16px";
    }
  };

  return (
    <div className={`fresh-welcome-root ${focusGuide ? "focus-guide-active" : ""}`}>
      {/* Reading Focus Line Overlay (if enabled) */}
      {focusGuide && <div className="reading-focus-line" />}

      {/* Universal Header with multi-profile switcher */}
      <UniversalAppHeader
        currentScreen="home"
        onNavigate={(screen) => {
          if (screen === "teacher") setShowTeacherModal(true);
          else onNavigate(screen);
        }}
        studentName={studentName}
        selectedClass={selectedClass}
        profiles={profiles}
        onSelectProfile={onSelectProfile}
      />

      <main className="fresh-welcome-main">
        {/* ===================================================================
            HERO SECTION: CENTERPIECE + PROJECT NAME + PRIMARY CTAs + ACCESSIBILITY
            =================================================================== */}
        <section className="fresh-hero-section">
          <div className="fresh-hero-grid">
            {/* Left Content Column */}
            <div className="hero-text-col">
              <div className="hero-meta-eyebrow">
                <span className="live-pulse-dot" />
                <span className="eyebrow-text">CLINICAL COGNITIVE ARCHITECTURE</span>
              </div>

              <h1 className="hero-brand-title">
                Dyslexia<span className="title-glow">Quest</span>
              </h1>

              <p className="hero-tagline-text">
                Evidence-based visual learning, orthographic memory, and 3D spatial reasoning calibrated for dyslexic minds.
              </p>

              {/* Primary Buttons: Refined, Tactile, High-End */}
              <div className="hero-cta-buttons-row">
                <button
                  className="btn-start-learning"
                  onClick={() => {
                    playSynapsePulse();
                    onStartLearning();
                  }}
                >
                  <span className="cta-icon"><IconSparkles size={18} /></span>
                  <div className="cta-text">
                    <strong>Start Learning</strong>
                    <small>Explore 7 Cognitive Worlds</small>
                  </div>
                </button>

                <button
                  className="btn-take-screening"
                  onClick={() => {
                    playSynapsePulse();
                    onTakeScreening();
                  }}
                >
                  <span className="cta-icon"><IconClipboardList size={18} /></span>
                  <div className="cta-text">
                    <strong>Take Dyslexia Screening</strong>
                    <small>Standardized Diagnostic Assessment</small>
                  </div>
                </button>

                <button
                  className="btn-teacher-portal"
                  onClick={() => {
                    playHoverTick();
                    setShowTeacherModal(true);
                  }}
                >
                  <span className="cta-icon"><IconTarget size={18} /></span>
                  <div className="cta-text">
                    <strong>Teacher Dashboard</strong>
                    <small>Real-time Student Telemetry</small>
                  </div>
                </button>
              </div>

              {/* Small Accessibility Controls Toolstrip */}
              <div className="accessibility-toolstrip">
                <span className="access-label">ACCESSIBILITY:</span>

                <button
                  className={`access-btn ${dyslexicFont ? "active" : ""}`}
                  onClick={handleFontToggle}
                  title="Toggle Dyslexia-Optimized Font (Lexend)"
                >
                  <span className="access-btn-icon"><IconBookOpen size={14} /></span>
                  <span>{dyslexicFont ? "Lexend" : "Standard"}</span>
                </button>

                <button
                  className={`access-btn ${soundOn ? "active" : ""}`}
                  onClick={handleSoundToggle}
                  title="Toggle Audio Feedback & Synth"
                >
                  <span className="access-btn-icon">{soundOn ? <IconVolume size={14} /> : <IconVolumeOff size={14} />}</span>
                  <span>{soundOn ? "Audio On" : "Muted"}</span>
                </button>

                <button
                  className={`access-btn ${focusGuide ? "active" : ""}`}
                  onClick={handleFocusGuideToggle}
                  title="Toggle Reading Focus Guide Line"
                >
                  <span className="access-btn-icon"><IconTarget size={14} /></span>
                  <span>Focus Guide</span>
                </button>

                <button
                  className={`access-btn ${largeText ? "active" : ""}`}
                  onClick={handleTextSizeToggle}
                  title="Toggle Larger Text Scale"
                >
                  <span className="access-btn-icon">Aa</span>
                  <span>{largeText ? "110%" : "100%"}</span>
                </button>
              </div>

              {/* Persistent Profile Ribbon & Switcher */}
              <div className="hero-status-ribbon">
                <div className="ribbon-avatar">
                  <IconUser size={18} />
                </div>
                <div className="ribbon-details">
                  <span>ACTIVE STUDENT:</span>
                  <strong>{studentName || "Guest Student"} • Class {selectedClass || 1}</strong>
                </div>
                <div className="ribbon-actions-group">
                  <button
                    className="ribbon-switch-btn"
                    onClick={() => {
                      playHoverTick();
                      setShowProfilesModal(true);
                    }}
                    title="Switch active student profile"
                  >
                    <span>Switch Profile ({profiles.length})</span>
                    <span className="arrow-down">▾</span>
                  </button>
                  <button
                    className="ribbon-edit-btn"
                    onClick={() => onNavigate("profile")}
                    title="Setup or manage profiles"
                  >
                    + New Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Right 3D Viewport: Large 3D Animated Centerpiece */}
            <div className="hero-3d-centerpiece-col">
              <HolographicWorldCenterpiece
                onSelectDomain={(domain) => onLaunchStage(1)}
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            THE 7 CORE LEARNING WORLDS (World Option Style)
            =================================================================== */}
        <section className="learning-worlds-section">
          <div className="section-title-bar">
            <div>
              <span className="eyebrow-accent">CURRICULUM UNIVERSE</span>
              <h2 className="section-main-title">7 Core Learning Domains</h2>
              <p className="section-subtext">
                Select any realm below to enter interactive diagnostic exercises calibrated to your grade level.
              </p>
            </div>
            <button
              className="btn-view-all-stages"
              onClick={() => {
                playHoverTick();
                onStartLearning();
              }}
            >
              <span>Explore Realm Grid</span>
              <IconChevronRight size={16} />
            </button>
          </div>

          <div className="worlds-grid">
            {learningWorlds.map((world) => (
              <Card3D
                key={world.id}
                className="world-domain-card"
                onClick={() => {
                  playSynapsePulse();
                  onLaunchStage(world.stageId);
                }}
              >
                <div className="world-card-header">
                  <div
                    className="world-icon-badge"
                    style={{
                      backgroundColor: `${world.color}12`,
                      borderColor: `${world.color}35`,
                      color: world.color
                    }}
                  >
                    {world.icon}
                  </div>
                  <span className="world-num-tag">DOMAIN {world.number}</span>
                </div>

                <h3 className="world-card-title">{world.title}</h3>
                <h4 className="world-card-subtitle" style={{ color: world.color }}>
                  {world.subtitle}
                </h4>

                <p className="world-card-desc">{world.description}</p>

                <div className="world-card-footer">
                  <span className="world-tag-pill">{world.tag}</span>
                  <button
                    className="world-enter-btn"
                    style={{ borderColor: `${world.color}55` }}
                  >
                    <span>Enter World</span>
                    <IconChevronRight size={14} />
                  </button>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* ===================================================================
            TEACHER DASHBOARD INTEGRATED PREVIEW
            =================================================================== */}
        <section className="teacher-dashboard-preview-section">
          <div className="preview-header-row">
            <div>
              <div className="preview-badge">
                <IconShieldCheck size={16} />
                <span>TEACHER & CLINICIAN TELEMETRY</span>
              </div>
              <h2 className="preview-title">Student Progress & Diagnostic Telemetry</h2>
              <p className="preview-subtitle">
                Comprehensive tracking across screening results, weekly improvements, and areas of difficulty.
              </p>
            </div>
            <button
              className="btn-open-full-dashboard"
              onClick={() => {
                playSynapsePulse();
                setShowTeacherModal(true);
              }}
            >
              <span>Open Full Teacher Dashboard</span>
              <IconChevronRight size={16} />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="preview-metrics-grid">
            <div className="metric-tile">
              <span className="metric-icon-orb"><IconBookOpen size={20} /></span>
              <div className="metric-info">
                <span className="metric-label">READING SPEED</span>
                <strong className="metric-gain" style={{ color: "#2dd4bf" }}>↑ 18%</strong>
                <small className="metric-sub">From 82 to 98 words/min</small>
              </div>
            </div>

            <div className="metric-tile">
              <span className="metric-icon-orb"><IconEdit size={20} /></span>
              <div className="metric-info">
                <span className="metric-label">SPELLING</span>
                <strong className="metric-gain" style={{ color: "#c084fc" }}>↑ 12%</strong>
                <small className="metric-sub">Anagram reconstruction</small>
              </div>
            </div>

            <div className="metric-tile">
              <span className="metric-icon-orb"><IconEye size={20} /></span>
              <div className="metric-info">
                <span className="metric-label">WORD RECOGNITION</span>
                <strong className="metric-gain" style={{ color: "#34d399" }}>↑ 24%</strong>
                <small className="metric-sub">Rapid visual identification</small>
              </div>
            </div>

            <div className="metric-tile">
              <span className="metric-icon-orb"><IconMic size={20} /></span>
              <div className="metric-info">
                <span className="metric-label">PHONOLOGICAL AWARENESS</span>
                <strong className="metric-gain" style={{ color: "#e2b170" }}>↑ 15%</strong>
                <small className="metric-sub">Auditory phoneme isolation</small>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Persistent Multi-Profile Switcher Modal */}
      {showProfilesModal && (
        <div className="profiles-modal-overlay">
          <div className="profiles-modal-dialog">
            <div className="profiles-modal-header">
              <div className="profiles-header-info">
                <div className="profiles-modal-badge">
                  <IconUser size={15} />
                  <span>STUDENT ROSTER</span>
                </div>
                <h2>Saved Student Profiles ({profiles.length})</h2>
                <p>Select any student to switch active cognitive difficulty, speech profile, and progress records.</p>
              </div>
              <button
                className="btn-close-modal"
                onClick={() => setShowProfilesModal(false)}
                title="Close dialog"
              >
                <IconCross size={16} />
              </button>
            </div>

            <div className="profiles-grid-list">
              {profiles.map((p) => {
                const isSelected = p.studentName === studentName;
                return (
                  <div
                    key={p.id}
                    className={`profile-card-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      playSynapsePulse();
                      onSelectProfile(p);
                      setShowProfilesModal(false);
                    }}
                  >
                    <div className="profile-card-top">
                      <div className="profile-avatar-box">
                        <IconUser size={20} />
                      </div>
                      <div className="profile-card-meta">
                        <h3>{p.studentName}</h3>
                        <span>Class {p.studentClass || 1} • Age {p.studentAge || "—"}</span>
                      </div>
                      {isSelected && (
                        <span className="active-pill-badge" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <IconCheck size={12} /> Active
                        </span>
                      )}
                    </div>

                    <div className="profile-card-stats">
                      <div className="p-stat">
                        <small>Reading</small>
                        <strong style={{ color: "#2dd4bf" }}>{p.speed || "+18%"}</strong>
                      </div>
                      <div className="p-stat">
                        <small>Spelling</small>
                        <strong style={{ color: "#c084fc" }}>{p.spelling || "+12%"}</strong>
                      </div>
                      <div className="p-stat">
                        <small>Words</small>
                        <strong style={{ color: "#34d399" }}>{p.recognition || "+24%"}</strong>
                      </div>
                    </div>

                    <div className="profile-card-actions">
                      <button
                        className={`btn-select-profile ${isSelected ? "is-active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          playSynapsePulse();
                          onSelectProfile(p);
                          setShowProfilesModal(false);
                        }}
                      >
                        {isSelected ? "Active Profile" : "Select Student"}
                      </button>
                      {profiles.length > 1 && (
                        <button
                          className="btn-delete-profile"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Remove profile for ${p.studentName}?`)) {
                              onDeleteProfile(p.id);
                            }
                          }}
                          title="Delete profile"
                        >
                          <IconCross size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="profiles-modal-footer">
              <button
                className="btn-create-fresh-profile"
                onClick={() => {
                  playSynapsePulse();
                  setShowProfilesModal(false);
                  onNavigate("profile");
                }}
              >
                <span>+ Create New Student Profile</span>
                <IconChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Dashboard Full Modal Overlay */}
      {showTeacherModal && (
        <div className="teacher-modal-overlay">
          <div className="teacher-modal-dialog">
            <TeacherDashboardView
              onLaunchStage={(stageId) => {
                setShowTeacherModal(false);
                onLaunchStage(stageId);
              }}
              onReturnHome={() => setShowTeacherModal(false)}
              profiles={profiles}
              onSelectProfile={onSelectProfile}
            />
          </div>
        </div>
      )}

      <footer className="fresh-site-footer">
        <div className="footer-content">
          <div className="footer-left">
            <IconBrain size={22} />
            <span>DyslexiaQuest • Clinical Cognitive Architecture</span>
          </div>
          <p className="footer-right">
            Calibrated for neuro-divergent empowerment, spatial reasoning, and orthographic fluency.
          </p>
        </div>
      </footer>
    </div>
  );
}
