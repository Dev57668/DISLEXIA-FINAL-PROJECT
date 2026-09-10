import React, { useState, useEffect } from "react";
import NeuroScene from "./3d/NeuroScene";
import Card3D from "./3d/Card3D";
import NeuroLensLab from "./3d/NeuroLensLab";
import QuickMiniChallenge from "./3d/QuickMiniChallenge";
import {
  IconBrain,
  IconEye,
  IconMic,
  IconEdit,
  IconCalculator,
  IconShapes,
  IconBookOpen,
  IconUser,
  IconLayers,
  IconVolume,
  IconVolumeOff,
  IconChevronRight,
  IconPlay
} from "./Icons";
import {
  toggleSound,
  isSoundEnabled,
  playHoverTick,
  playSynapsePulse
} from "../utils/soundEffects";

export default function LandingPage({
  onStartProfile,
  onEnterStages,
  onLaunchStage1,
  onLaunchStage2,
  onLaunchStage3,
  onLaunchStage4,
  onLaunchStage5,
  onLaunchStage6,
  studentName = "",
  setStudentName = () => {},
  selectedClass = 1,
  setSelectedClass = () => {},
  savedProgress = {}
}) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [dyslexicFont, setDyslexicFont] = useState(true);
  const [localName, setLocalName] = useState(studentName);
  const [localClass, setLocalClass] = useState(selectedClass || 1);

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

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playSynapsePulse();
  };

  const handleFontToggle = () => {
    playHoverTick();
    setDyslexicFont((prev) => !prev);
    if (!dyslexicFont) {
      document.documentElement.style.setProperty("--sans", "'Lexend', sans-serif");
    } else {
      document.documentElement.style.setProperty("--sans", "'Plus Jakarta Sans', sans-serif");
    }
  };

  const scrollToSection = (id) => {
    playHoverTick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuickStart = (e) => {
    e.preventDefault();
    playSynapsePulse();
    if (setStudentName && localName) setStudentName(localName);
    if (setSelectedClass && localClass) setSelectedClass(Number(localClass));
    if (onEnterStages) onEnterStages();
  };

  const modules = [
    {
      id: "mod-1",
      number: "01",
      title: "Visual Perception",
      subtitle: "Mirror Discrimination & Tracking",
      icon: <IconEye size={22} />,
      color: "#38bdf8",
      launch: onLaunchStage1,
      progress: `${savedProgress?.stage1?.classes?.[String(localClass)]?.completedQuestions || 0} / 27 Questions`,
      description: "Detects mirror letter reversals (b vs d, p vs q) and visual tracking across 3 difficulty tiers."
    },
    {
      id: "mod-2",
      number: "02",
      title: "Auditory Speech",
      subtitle: "Phonemic Awareness & Voice",
      icon: <IconMic size={22} />,
      color: "#f43f5e",
      launch: onLaunchStage2,
      progress: "Voice Recognition Engine",
      description: "Tests rapid phoneme-to-symbol recognition and spoken syllable pronunciation."
    },
    {
      id: "mod-3",
      number: "03",
      title: "Spelling Mastery",
      subtitle: "Lexical & Word Memory",
      icon: <IconEdit size={22} />,
      color: "#a855f7",
      launch: onLaunchStage3,
      progress: "Adaptive Vocabulary",
      description: "Builds orthographic visual memory, syllable chunking, and morphology decoding."
    },
    {
      id: "mod-4",
      number: "04",
      title: "Math Jutsu",
      subtitle: "Dyscalculia & Number Sense",
      icon: <IconCalculator size={22} />,
      color: "#f59e0b",
      launch: onLaunchStage4,
      progress: `${savedProgress?.stage4?.classes?.[String(localClass)]?.completedQuestions || 0} / 30 Questions`,
      description: "Assesses subitizing speed, mental arithmetic, and number line spatial reasoning."
    },
    {
      id: "mod-5",
      number: "05",
      title: "3D Shapes",
      subtitle: "Mental Rotation & Geometry",
      icon: <IconShapes size={22} />,
      color: "#10b981",
      launch: onLaunchStage5,
      progress: `${savedProgress?.shapes?.classes?.[String(localClass)]?.completedQuestions || 0} / 16 Questions`,
      description: "Interactive 3D shape viewer with solid & wireframe models to count faces, vertices, and edges."
    },
    {
      id: "mod-6",
      number: "06",
      title: "Comprehension",
      subtitle: "Passage Reading & Fluency",
      icon: <IconBookOpen size={22} />,
      color: "#60a5fa",
      launch: onLaunchStage6,
      progress: "Tiers 1-8 Passage Bank",
      description: "Continuous reading passages with audio read-aloud support and contextual decoding questions."
    }
  ];

  return (
    <div className={`landing-root ${dyslexicFont ? "font-lexend" : "font-standard"}`}>
      {/* Precision Fixed Navbar */}
      <header className="navbar-minimal">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => scrollToSection("deck")}>
            <div className="brand-icon">
              <IconBrain size={22} />
            </div>
            <div className="brand-text">
              <span className="brand-title">DyslexiaQuest</span>
              <span className="brand-subtitle">COGNITIVE PLATFORM</span>
            </div>
          </div>

          <nav className="nav-links">
            <button className="nav-link active-link" onClick={() => scrollToSection("deck")}>
              Quest Deck
            </button>
            <button className="nav-link" onClick={() => scrollToSection("modules")}>
              Select Modules
            </button>
            <button className="nav-link" onClick={() => scrollToSection("neurolens")}>
              3D Perception Lab
            </button>
            <button className="nav-link" onClick={() => scrollToSection("challenge")}>
              Quick Check
            </button>
          </nav>

          <div className="nav-actions">
            <button
              className={`icon-btn ${soundOn ? "active" : ""}`}
              onClick={handleSoundToggle}
              title={soundOn ? "Mute audio" : "Enable audio"}
            >
              {soundOn ? <IconVolume size={16} /> : <IconVolumeOff size={16} />}
            </button>

            <button
              className={`pill-btn ${dyslexicFont ? "active" : ""}`}
              onClick={handleFontToggle}
              title="Toggle Dyslexia-Optimized Typography (Lexend)"
            >
              <span className="pill-font-tag">Aa</span>
              <span>{dyslexicFont ? "Lexend" : "Standard"}</span>
            </button>

            <button className="secondary-nav-btn" onClick={onStartProfile}>
              <IconUser size={15} />
              <span>Student Profile</span>
            </button>

            <button className="primary-btn" onClick={onEnterStages}>
              <span>All Modules</span>
              <IconChevronRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* QUEST COMMAND CENTER (HERO + QUICK LOGIN) */}
      <section id="deck" className="quest-deck-section">
        <div className="deck-grid">
          {/* Left Column: Quick Student Login / Start */}
          <div className="deck-login-col">
            <div className="deck-badge">
              <span className="badge-dot"></span>
              <span>STUDENT ONBOARDING & QUICK LAUNCH</span>
            </div>

            <h1 className="deck-title">Ready to Start Your Cognitive Quest?</h1>
            <p className="deck-desc">
              Initialize your profile below or pick any module to begin standardized visual perception, auditory, and 3D spatial exercises.
            </p>

            <form className="quick-login-card" onSubmit={handleQuickStart}>
              <div className="input-group">
                <label>Student Name</label>
                <input
                  type="text"
                  placeholder="Enter student name..."
                  value={localName}
                  onChange={(e) => {
                    setLocalName(e.target.value);
                    if (setStudentName) setStudentName(e.target.value);
                  }}
                />
              </div>

              <div className="input-row">
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Class / Grade</label>
                  <select
                    value={localClass}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setLocalClass(val);
                      if (setSelectedClass) setSelectedClass(val);
                    }}
                  >
                    <option value={1}>Class 1 (Grade 1)</option>
                    <option value={2}>Class 2 (Grade 2)</option>
                    <option value={3}>Class 3 (Grade 3)</option>
                    <option value={4}>Class 4 (Grade 4)</option>
                    <option value={5}>Class 5 (Grade 5)</option>
                  </select>
                </div>

                <div className="input-group" style={{ flex: 1 }}>
                  <label>Full Profile</label>
                  <button
                    type="button"
                    className="manage-profile-btn"
                    onClick={onStartProfile}
                  >
                    Edit Demographics
                  </button>
                </div>
              </div>

              <div className="login-actions">
                <button type="submit" className="deck-launch-btn">
                  <IconPlay size={16} />
                  <span>Enter Assessment Modules</span>
                </button>
                <button
                  type="button"
                  className="deck-direct-btn"
                  onClick={onLaunchStage1}
                >
                  <span>Play Module 01 Directly</span>
                  <IconChevronRight size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Interactive 3D Spatial Letters Canvas */}
          <div className="deck-3d-col">
            <div className="deck-3d-box">
              <NeuroScene />
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT MODULE LAUNCH GRID (WORKING SELECTION MODULE) */}
      <section id="modules" className="content-section">
        <div className="section-intro">
          <span className="section-label">CURRICULUM SELECTION</span>
          <h2 className="section-heading">Choose an Assessment Module</h2>
          <p className="section-subheading">
            Each module is fully interactive and calibrated for Class {localClass}. Click any module below to immediately launch its challenge.
          </p>
        </div>

        <div className="modules-grid">
          {modules.map((mod) => (
            <Card3D key={mod.id} className="module-item">
              <div className="module-inner">
                <div className="module-header">
                  <div
                    className="module-icon"
                    style={{ color: mod.color, borderColor: `${mod.color}33` }}
                  >
                    {mod.icon}
                  </div>
                  <span className="module-num" style={{ color: mod.color }}>
                    MODULE {mod.number}
                  </span>
                </div>

                <h3 className="module-title">{mod.title}</h3>
                <span className="module-subtitle">{mod.subtitle}</span>
                <p className="module-desc">{mod.description}</p>

                <div className="module-footer">
                  <span className="module-count">{mod.progress}</span>
                  <button
                    className="module-play-btn"
                    style={{ backgroundColor: mod.color }}
                    onClick={() => {
                      playSynapsePulse();
                      if (mod.launch) mod.launch();
                    }}
                  >
                    <IconPlay size={13} />
                    <span>PLAY NOW</span>
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* 3D NEURO-LENS LABORATORY */}
      <section id="neurolens" className="content-section">
        <div className="section-intro">
          <span className="section-label">PERCEPTION LAB</span>
          <h2 className="section-heading">Interactive Letter Orientation Simulator</h2>
          <p className="section-subheading">
            Experience how the dyslexic visual cortex processes 3D letter rotation, drift, and visual crowding — and test how weighted typography brings immediate stabilization.
          </p>
        </div>

        <NeuroLensLab onLaunchAssessment={onEnterStages} />
      </section>

      {/* RAPID 15S CHECK */}
      <section id="challenge" className="content-section">
        <div className="section-intro">
          <span className="section-label">QUICK EVALUATION</span>
          <h2 className="section-heading">15-Second Perception Check</h2>
          <p className="section-subheading">
            Test your visual-orthographic discrimination right now before initiating your full student profile.
          </p>
        </div>

        <QuickMiniChallenge onStartFullQuest={onEnterStages} />
      </section>

      {/* CLEAN FOOTER */}
      <footer className="footer-minimal">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-title">
              <IconBrain size={20} />
              <span>DyslexiaQuest</span>
            </div>
            <p className="footer-tagline">
              An evidence-based 3D cognitive diagnostic and learning platform for dyslexic, dyscalculic, and visual-spatial learners worldwide.
            </p>
          </div>

          <div className="footer-col">
            <h5>Navigation</h5>
            <button onClick={() => scrollToSection("deck")}>Quest Deck</button>
            <button onClick={() => scrollToSection("modules")}>Module Selection</button>
            <button onClick={() => scrollToSection("neurolens")}>3D Perception Lab</button>
            <button onClick={() => scrollToSection("challenge")}>Quick Check</button>
          </div>

          <div className="footer-col">
            <h5>Direct Play</h5>
            <button onClick={onLaunchStage1}>Module 01: Visual Perception</button>
            <button onClick={onLaunchStage2}>Module 02: Auditory Speech</button>
            <button onClick={onLaunchStage3}>Module 03: Spelling</button>
            <button onClick={onLaunchStage4}>Module 04: Math Jutsu</button>
            <button onClick={onLaunchStage5}>Module 05: 3D Shapes</button>
            <button onClick={onLaunchStage6}>Module 06: Comprehension</button>
          </div>

          <div className="footer-col">
            <h5>Account & Settings</h5>
            <button onClick={onStartProfile}>Student Profile</button>
            <button onClick={handleFontToggle}>Toggle Lexend Typography</button>
            <button onClick={handleSoundToggle}>Toggle Sound</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 DyslexiaQuest. Designed for all minds.</span>
          <span>Interactive 3D • Fully Working Web Application</span>
        </div>
      </footer>
    </div>
  );
}