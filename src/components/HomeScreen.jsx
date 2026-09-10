import React, { useState } from "react";
import UniversalAppHeader from "./UniversalAppHeader";
import JungleEnvironment from "./jungle/JungleEnvironment";
import JungleMascot from "./jungle/JungleMascot";
import QuestTrailMap from "./jungle/QuestTrailMap";
import {
  IconBrain,
  IconEye,
  IconMic,
  IconEdit,
  IconCalculator,
  IconShapes,
  IconBookOpen,
  IconTarget,
  IconShieldCheck,
  IconStar,
  IconAward,
  IconMirror,
  IconParrot,
  IconMonkey,
  IconMartialJutsu,
  IconSunAltar,
  IconLagoonLotus,
  IconCompass,
  IconSparkles,
  IconLeaf,
  IconMap,
  IconBackpack,
  IconOwl,
  IconCheck,
  IconPencil,
  IconStarSolid
} from "./Icons";
import { playHoverTick, playSynapsePulse } from "../utils/soundEffects";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * HomeScreen - The Lost Canopy of Lexis Flagship Experience
 * An immersive, sunny hand-drawn 2.5D children's adventure game connecting all 6 assessment modules.
 */
export default function HomeScreen({
  onStartProfile,
  onEnterStages,
  onLaunchStage1,
  onLaunchStage2,
  onLaunchStage3,
  onLaunchStage4,
  onLaunchStage5,
  onLaunchStage6,
  onNavigate,
  studentName = "",
  studentPhoto = "",
  selectedClass = 1,
  savedProgress = {},
  profiles = [],
  onSelectProfile = () => {},
  onNewProfile = null,
  studentXp = 10,
  authUser = null,
  onOpenLogin = () => {},
  onSignOut = () => {}
}) {
  const { t } = useLanguage();
  const [mascotMood, setMascotMood] = useState("idle");

  const modules = [
    {
      id: "mod-1",
      number: "01",
      name: t("mod1Name", "Eagle Eye Island"),
      title: t("mod1Title", "Visual Perception & Direction"),
      subtitle: t("mod1Subtitle", "Letter Reversals (b vs d) & Symmetry"),
      icon: <IconMirror size={26} />,
      color: "#16a34a",
      bgTint: "#dcfce7",
      launch: onLaunchStage1,
      badge: t("mod1Badge", "27 Items • 3 Levels"),
      description: t("mod1Desc", "Spot mirror reversals and find the hidden directional glyphs in the sacred canopy grove."),
      actionLabel: "Explore Island →"
    },
    {
      id: "mod-2",
      number: "02",
      name: t("mod2Name", "Echo Sanctuary"),
      title: t("mod2Title", "Auditory Processing & Speech"),
      subtitle: t("mod2Subtitle", "Phonemic Awareness & Oral Voice Fluency"),
      icon: <IconParrot size={26} />,
      color: "#ea580c",
      bgTint: "#ffedd5",
      launch: onLaunchStage2,
      badge: t("mod2Badge", "Microphone Active"),
      description: t("mod2Desc", "Speak the secret jungle words aloud into the parrot's crystal to evaluate oral phoneme timing."),
      actionLabel: "Enter Sanctuary →"
    },
    {
      id: "mod-3",
      number: "03",
      name: t("mod3Name", "Vine Weaver's Treehouse"),
      title: t("mod3Title", "Written Expression & Memory"),
      subtitle: t("mod3Subtitle", "Orthographic Anagram Reconstruction"),
      icon: <IconMonkey size={26} />,
      color: "#9333ea",
      bgTint: "#f3e8ff",
      launch: onLaunchStage3,
      badge: t("mod3Badge", "Tactile Anagrams"),
      description: t("mod3Desc", "Untangle scrambled letter vines to form magical words and exercise visual working memory."),
      actionLabel: "Enter Treehouse →"
    },
    {
      id: "mod-4",
      number: "04",
      name: t("mod4Name", "Maths Jutsu Temple"),
      title: t("mod4Title", "Mathematical Logic & Reasoning"),
      subtitle: t("mod4Subtitle", "Dyscalculia Screening & Arithmetic"),
      icon: <IconMartialJutsu size={26} />,
      color: "#d97706",
      bgTint: "#fef3c7",
      launch: onLaunchStage4,
      badge: t("mod4Badge", "Quantitative Logic"),
      description: t("mod4Desc", "Master bamboo counting rods, number sense, and multi-tier mental arithmetic challenges."),
      actionLabel: "Enter Temple →"
    },
    {
      id: "mod-5",
      number: "05",
      name: t("mod5Name", "Sunstone Altar"),
      title: t("mod5Title", "Spatial Geometry & 3D Solids"),
      subtitle: t("mod5Subtitle", "3D Form Rotation & Structural Reasoning"),
      icon: <IconSunAltar size={26} />,
      color: "#0284c7",
      bgTint: "#e0f2fe",
      launch: onLaunchStage5,
      badge: t("mod5Badge", "Tactile 3D Altar"),
      description: t("mod5Desc", "Spin ancient sunlit solid crystals (cubes, prisms, pyramids) to decode geometric alignments."),
      actionLabel: "Enter Altar →"
    },
    {
      id: "mod-6",
      number: "06",
      name: t("mod6Name", "Storyteller's Lagoon"),
      title: t("mod6Title", "Reading Comprehension"),
      subtitle: t("mod6Subtitle", "Passage Fluency & Semantic Recall"),
      icon: <IconLagoonLotus size={26} />,
      color: "#e11d48",
      bgTint: "#ffe4e6",
      launch: onLaunchStage6,
      badge: `${t("classLabel", "Class")} ${selectedClass || 1} ${t("calibratedFor", "Calibrated")}`,
      description: t("mod6Desc", "Dive into enchanted jungle stories, pace your oral reading speed, and answer comprehension quests."),
      actionLabel: "Enter Lagoon →"
    }
  ];

  return (
    <div className="jungle-app-wrapper">
      {/* Hand-Drawn Layered Daytime Jungle Scenery: Sky, Clouds, Birds, Ridges, Butterflies & Palms */}
      <JungleEnvironment />

      {/* Canopy Navigation Header with Compass, Font Switcher & Student Passport */}
      <UniversalAppHeader
        currentScreen="home"
        onNavigate={onNavigate}
        studentName={studentName}
        studentPhoto={studentPhoto}
        selectedClass={selectedClass}
        profiles={profiles}
        onSelectProfile={onSelectProfile}
        onNewProfile={onNewProfile}
        studentXp={studentXp}
        authUser={authUser}
        onOpenLogin={onOpenLogin}
        onSignOut={onSignOut}
      />

      <main className="quest-trail-container">
        {/* ========================================================
            HERO EXPEDITION CANOPY BOARD
           ======================================================== */}
        <section className="jungle-hero-board">
          <div className="hero-board-left">
            <div className="hero-pill-tag">
              <span className="pill-leaf"><IconLeaf size={14} /></span>
              <span>{t("heroTag", "THE LOST CANOPY OF LEXIS • COGNITIVE ADVENTURE")}</span>
            </div>

            <h1 className="hero-title" spellCheck={false}>
              {t("heroTitlePrefix", "Ready for the")}{" "}
              <span className="highlight-text" spellCheck={false}>{t("heroTitleHighlight", "Jungle Quest?")}</span>
            </h1>

            <p className="hero-lead">
              {t("heroLead", "Step into a magical hand-drawn storybook canopy where fun adventure games evaluate and strengthen reading fluency, letter orientation (b vs d), phonological speech, and 3D spatial reasoning!")}
            </p>

            {/* Integrated Optional Sign-In Invitation Strip */}
            {!authUser && (
              <div className="hero-sync-invite-strip" role="note">
                <span className="sync-invite-icon" aria-hidden="true">
                  <IconCompass size={18} />
                </span>
                <span className="sync-invite-text">
                  Continue as a guest, or sign in to save and sync your progress.
                </span>
                <button
                  type="button"
                  className="sync-invite-action-btn"
                  onClick={() => {
                    playSynapsePulse();
                    onOpenLogin();
                  }}
                  title="Sign in or create an explorer account (optional)"
                >
                  Sign In &rarr;
                </button>
              </div>
            )}

            {/* Chunky Action Buttons */}
            <div className="hero-btn-row">
              <button
                className="btn-jungle-cta"
                onClick={() => {
                  playSynapsePulse();
                  setMascotMood("celebrate");
                  if (onLaunchStage1) onLaunchStage1();
                }}
              >
                <span><IconMap size={16} /></span>
                <span>{t("btnStartExpedition", "Begin Module 01 Expedition")}</span>
              </button>

              <button
                className="btn-jungle-secondary"
                onClick={() => {
                  playHoverTick();
                  setMascotMood("happy");
                  if (onEnterStages) onEnterStages();
                }}
              >
                <span><IconSparkles size={16} /></span>
                <span>{t("btnExploreGlades", "Explore All 6 Glades")}</span>
              </button>
            </div>

            {/* Explorer Passport Chest */}
            <div className="explorer-chest-bar">
              <div className="chest-icon"><IconBackpack size={26} /></div>
              <div className="chest-details">
                <span className="chest-label">{t("currentExplorerLabel", "CURRENT EXPLORER:")}</span>
                <strong className="chest-student-name">
                  {studentName || t("guestExplorer", "Junior Explorer (Guest)")}
                </strong>
                <span className="chest-grade-tag">
                  {t("calibratedFor", "Calibrated for")} <strong>{t("classLabel", "Class")} {selectedClass || 1}</strong> • <IconStarSolid size={14} style={{ display: "inline-block", verticalAlign: "middle", color: "#f59e0b" }} /> <strong>{studentXp || 10} XP Stars</strong>
                </span>
                <span className="chest-add-tip">
                  Want to add another explorer? You can create additional profiles here anytime.
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  className="btn-jungle-wood"
                  style={{ background: "#22c55e", color: "#fff", borderColor: "#15803d" }}
                  onClick={() => {
                    playSynapsePulse();
                    if (onNewProfile) onNewProfile();
                    else if (onStartProfile) onStartProfile();
                    else onNavigate("profile");
                  }}
                  title="Start a brand new explorer profile reset with 10 XP Stars and 0 performance"
                >
                  <span>+ New Explorer</span>
                </button>
                <button
                  className="btn-jungle-wood"
                  onClick={() => {
                    playHoverTick();
                    onNavigate("profile");
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>{t("btnEditPassport", "Edit Passport")} <IconPencil size={14} /></span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Board Right: Interactive Ollie Mascot Rig */}
          <div className="hero-board-right">
            <div className="companion-nest-card">
              <div className="nest-header">
                <span className="nest-status-dot" />
                <span className="nest-title">{t("mascotTitle", "OLLIE THE EXPEDITION GUIDE")}</span>
              </div>

              <div className="nest-mascot-stage">
                <JungleMascot
                  mood={mascotMood}
                  speechText={
                    mascotMood === "celebrate"
                      ? t("mascotCelebrate", "Hooray! Adventure awaits!")
                      : mascotMood === "happy"
                      ? t("mascotHappy", "You've got this, Explorer!")
                      : t("mascotIdle", "I follow your cursor! Click me!")
                  }
                  onMascotClick={() => {
                    playHoverTick();
                    setMascotMood((prev) => (prev === "idle" ? "happy" : prev === "happy" ? "celebrate" : "idle"));
                  }}
                  size="large"
                />
              </div>

              <div className="nest-footer">
                <p>
                  <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: "6px" }}><IconOwl size={18} /></span>
                  {t("mascotNote", "Move your mouse around! My eyes follow your cursor. Click me anytime for cheerful encouragement!")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            THE WINDING CANOPY QUEST TRAIL MAP
           ======================================================== */}
        <QuestTrailMap
          modules={modules}
          onLaunchModule={(mod) => {
            if (mod.launch) mod.launch();
          }}
          savedProgress={savedProgress}
        />

        {/* ========================================================
            CLINICAL DIAGNOSTIC METHODOLOGY TABLET
           ======================================================== */}
        <section className="jungle-methodology-tablet">
          <div className="tablet-left">
            <div className="tablet-badge">
              <IconShieldCheck size={20} />
              <span>{t("clinicalEngine", "CLINICAL DIAGNOSTIC ENGINE")}</span>
            </div>
            <h2>{t("evidenceBasedTitle", "Evidence-Based Cognitive Assessment")}</h2>
            <p>
              {t("evidenceBasedDesc", "As your child explores the jungle glades, DyslexiaQuest captures multi-factor clinical telemetry: orthographic mirror confusion rates (b vs d), speech recognition confidence, 3D rotational spatial accuracy, and arithmetic timing.")}
            </p>
            <div className="tablet-features-list">
              <div className="tablet-feature-item">
                <span className="feature-check"><IconCheck size={14} /></span>
                <span>{t("feat1", "Standardized mirror letter reversal error index (b/d/p/q)")}</span>
              </div>
              <div className="tablet-feature-item">
                <span className="feature-check"><IconCheck size={14} /></span>
                <span>{t("feat2", "Real-time voice phoneme analysis via Web Speech API")}</span>
              </div>
              <div className="tablet-feature-item">
                <span className="feature-check"><IconCheck size={14} /></span>
                <span>{t("feat3", "Printable diagnostic summaries calibrated for schools & clinicians")}</span>
              </div>
            </div>
            <button
              className="btn-jungle-wood"
              onClick={() => {
                playHoverTick();
                onNavigate("analysis");
              }}
              style={{ marginTop: "20px" }}
            >
              <IconTarget size={18} />
              <span>{t("btnOpenDiagnostic", "Open Student Diagnostic Dashboard →")}</span>
            </button>
          </div>

          <div className="tablet-right">
            <div className="wood-report-card">
              <div className="wood-report-header">
                <IconAward size={22} />
                <span>{t("metricsPreview", "EXPEDITION METRICS PREVIEW")}</span>
              </div>
              <div className="wood-report-row">
                <span>{t("visualOrthography", "Visual Orthography:")}</span>
                <strong style={{ color: "#16a34a" }}>94% Accuracy</strong>
              </div>
              <div className="wood-report-row">
                <span>{t("phoneticSpeech", "Phonetic Speech:")}</span>
                <strong style={{ color: "#ea580c" }}>{t("gradeAligned", "Grade Aligned")}</strong>
              </div>
              <div className="wood-report-row">
                <span>{t("spatialSolids", "Spatial 3D Solids:")}</span>
                <strong style={{ color: "#0284c7" }}>{t("advanced", "Advanced")}</strong>
              </div>
              <div className="wood-report-row">
                <span>{t("dyscalculiaRisk", "Dyscalculia Risk:")}</span>
                <strong style={{ color: "#d97706" }}>{t("lowNormal", "Low / Normal")}</strong>
              </div>
              <div className="wood-report-status">
                <IconLeaf size={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
                {t("allReady", "ALL 6 EXPEDITIONS READY")}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Storybook Jungle Footer */}
      <footer className="jungle-site-footer">
        <div className="footer-content">
          <div className="footer-brand-lockup">
            <IconCompass size={22} style={{ color: "#f59e0b", display: "inline-block", verticalAlign: "middle" }} />
          </div>
          <p className="footer-tagline">
            {t("footerTagline", "Engineered with love for dyslexic minds, visual-orthographic reinforcement, and inclusive learning.")}
          </p>
          <div className="footer-legal-links">
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => {
                playHoverTick();
                if (onNavigate) onNavigate("privacy");
              }}
            >
              Privacy Policy
            </button>
            <span className="footer-legal-dot" aria-hidden="true">•</span>
            <button
              type="button"
              className="footer-legal-btn"
              onClick={() => {
                playHoverTick();
                if (onNavigate) onNavigate("terms");
              }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>

      <style>{`
        .jungle-hero-board {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 32px;
          align-items: center;
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 40px;
          margin-bottom: 48px;
          position: relative;
        }

        .hero-pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          background: #ecfccb;
          border: 2px solid #65a30d;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.86rem;
          font-weight: 700;
          color: #365314;
          margin-bottom: 16px;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          color: #451a03;
          margin-bottom: 16px;
          line-height: 1.15;
        }

        .highlight-text {
          color: #ea580c;
          text-decoration: none;
        }

        .hero-sync-invite-strip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(254, 252, 232, 0.95);
          border: 2px solid #ca8a04;
          border-radius: 14px;
          padding: 8px 16px;
          margin-bottom: 22px;
          box-shadow: 0 3px 0 #b45309, 0 6px 14px rgba(180, 83, 9, 0.1);
          color: #78350f;
          font-size: 0.92rem;
          font-weight: 700;
          max-width: 100%;
          box-sizing: border-box;
          flex-wrap: wrap;
        }

        .sync-invite-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fef3c7;
          border: 1.5px solid #d97706;
          color: #b45309;
          flex-shrink: 0;
        }

        .sync-invite-text {
          flex: 1;
          min-width: 200px;
          line-height: 1.35;
          color: #78350f;
        }

        .sync-invite-action-btn {
          background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
          border: 1.5px solid #14532d;
          color: #ffffff;
          border-radius: 10px;
          padding: 5px 14px;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 2px 0 #14532d;
          transition: transform 0.12s ease, background 0.12s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .sync-invite-action-btn:hover {
          background: #15803d;
          transform: translateY(-1px);
        }

        .sync-invite-action-btn:active {
          transform: translateY(1px);
          box-shadow: none;
        }

        .hero-lead {
          font-size: var(--text-body-large);
          color: #78350f;
          margin-bottom: 24px;
          max-width: 58ch;
        }

        .hero-btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
        }

        .explorer-chest-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          background: #fefae0;
          border: 2.5px dashed #b45309;
          border-radius: 20px;
        }

        .chest-icon {
          font-size: 32px;
        }

        .chest-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .chest-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: #b45309;
          letter-spacing: 0.05em;
        }

        .chest-student-name {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: #451a03;
        }

        .chest-grade-tag {
          font-size: 0.82rem;
          color: #78350f;
        }

        .chest-add-tip {
          display: block;
          font-size: 0.76rem;
          color: #92400e;
          font-style: italic;
          margin-top: 3px;
        }

        .companion-nest-card {
          background: #fefae0;
          border: 3px solid #78350f;
          border-radius: 24px;
          padding: 20px 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 6px 0 #78350f;
          position: relative;
        }

        .nest-header {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #78350f;
          background: rgba(254, 243, 199, 0.95);
          border: 1.5px solid #d97706;
          border-radius: 999px;
          padding: 5px 14px;
          margin-bottom: 8px;
          box-shadow: 0 2px 0 #b45309;
        }

        .nest-status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px #22c55e;
        }

        .nest-mascot-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 40px;
          padding-bottom: 8px;
          position: relative;
          width: 100%;
        }

        .nest-footer {
          width: 100%;
          border-top: 1.5px dashed #d97706;
          padding-top: 10px;
          margin-top: 6px;
        }

        .nest-footer p {
          font-size: 0.84rem;
          color: #78350f;
          text-align: center;
          line-height: 1.45;
          margin: 0;
        }

        .jungle-methodology-tablet {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 32px;
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: var(--radius-hand-card);
          box-shadow: var(--shadow-jungle-card);
          padding: 36px;
          margin-bottom: 56px;
        }

        .tablet-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          color: #15803d;
          background: #dcfce7;
          padding: 4px 12px;
          border-radius: 8px 10px 8px 10px;
          border: 2px solid #16a34a;
          margin-bottom: 12px;
        }

        .tablet-left h2 {
          font-size: var(--text-h2);
          color: #451a03;
          margin-bottom: 12px;
        }

        .tablet-left p {
          color: #78350f;
          font-size: 1.02rem;
          margin-bottom: 16px;
        }

        .tablet-features-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tablet-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: #451a03;
        }

        .feature-check {
          color: #16a34a;
          font-weight: 900;
        }

        .wood-report-card {
          background: #fefae0;
          border: 3px solid #78350f;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 4px 0 #78350f;
        }

        .wood-report-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 800;
          color: #78350f;
          border-bottom: 1.5px dashed #d97706;
          padding-bottom: 8px;
        }

        .wood-report-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #451a03;
        }

        .wood-report-status {
          margin-top: 8px;
          padding: 8px;
          text-align: center;
          background: #dcfce7;
          border: 2px solid #16a34a;
          border-radius: 10px;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 800;
          color: #15803d;
        }

        .jungle-site-footer {
          padding: 30px 20px;
          text-align: center;
          border-top: 3px dashed #78350f;
          background: #fefae0;
          margin-top: auto;
        }

        .footer-brand-lockup {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 800;
          color: #451a03;
          margin-bottom: 6px;
        }

        .footer-tagline {
          font-size: 0.88rem;
          color: #78350f;
          margin-bottom: 12px;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 8px;
        }

        .footer-legal-btn {
          background: none;
          border: none;
          padding: 4px 8px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.82rem;
          font-weight: 700;
          color: #b45309;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.15s ease;
        }

        .footer-legal-btn:hover {
          color: #78350f;
        }

        .footer-legal-dot {
          color: #d97706;
          font-size: 0.8rem;
        }

        @media (max-width: 1024px) {
          .jungle-hero-board {
            grid-template-columns: 1fr;
          }
          .jungle-methodology-tablet {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .jungle-hero-board {
            padding: 20px 16px;
            margin-bottom: 24px;
            border-radius: 20px;
            border-width: 2.5px;
            gap: 20px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-lead {
            font-size: 0.95rem;
          }

          .hero-btn-row {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .btn-jungle-cta,
          .btn-jungle-secondary {
            width: 100%;
            justify-content: center;
          }

          .explorer-chest-bar {
            flex-direction: column;
            align-items: flex-start;
            padding: 12px 14px;
            gap: 10px;
          }

          .jungle-methodology-tablet {
            padding: 20px 16px;
            border-radius: 20px;
            border-width: 2.5px;
            gap: 20px;
          }

          .tablet-wood-report {
            padding: 18px 16px;
            border-radius: 16px;
          }

          .jungle-site-footer {
            margin-top: 40px;
            padding: 30px 16px 50px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-pill-tag {
            font-size: 0.76rem;
            padding: 4px 10px;
          }

          .chest-val {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
