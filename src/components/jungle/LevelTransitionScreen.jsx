import React from "react";
import UniversalAppHeader from "../UniversalAppHeader";
import SpatialBackground3D from "../3d/SpatialBackground3D";
import ParticleFX from "../3d/ParticleFX";
import {
  IconMirror,
  IconParrot,
  IconMonkey,
  IconMartialJutsu,
  IconSunAltar,
  IconLagoonLotus,
  IconArrowRight,
  IconChevronLeft,
  IconStarSolid,
  IconShieldCheck,
  IconCompass,
  IconAward
} from "../Icons";
import { playHoverTick, playSynapsePulse } from "../../utils/soundEffects";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * GLADE_CONFIGS - Metadata for all 6 Cognitive Glades
 */
export const GLADE_CONFIGS = {
  stage1: {
    id: "stage1",
    key: "stage1",
    stageNumber: 1,
    number: "01",
    name: "Eagle Eye Island",
    title: "Visual Perception & Direction",
    subtitle: "Letter Reversals (b vs d, p vs q) & Visual Orientation",
    description: "Sharpen your eagle vision! Compare symmetrical glyphs, spot mirror letter reversals, and navigate hidden directional paths in the canopy grove.",
    badge: "27 Diagnostic Tasks • 3 Difficulty Levels",
    companionName: "Baron the Scout Eagle",
    companionRole: "Scouts mirror reversals and guides directional focus.",
    color: "#16a34a",
    borderColor: "#15803d",
    bgTint: "#dcfce7",
    icon: <IconMirror size={34} />
  },
  stage2: {
    id: "stage2",
    key: "stage2",
    stageNumber: 2,
    number: "02",
    name: "Echo Sanctuary",
    title: "Auditory Processing & Speech",
    subtitle: "Phonemic Awareness & Oral Voice Fluency",
    description: "Listen to the rhythms of the rainforest! Speak secret jungle phonemes aloud into the crystal microphone to evaluate oral pronunciation timing and confidence.",
    badge: "Web Speech API • Real-Time Voice Matching",
    companionName: "Rio the Echo Parrot",
    companionRole: "Listens to your speech cadence and provides cheerful voice encouragement.",
    color: "#ea580c",
    borderColor: "#c2410c",
    bgTint: "#ffedd5",
    icon: <IconParrot size={34} />
  },
  stage3: {
    id: "stage3",
    key: "stage3",
    stageNumber: 3,
    number: "03",
    name: "Vine Weaver's Treehouse",
    subtitle: "Written Expression & Memory",
    description: "Climb into the treetop anagram workshop! Untangle scrambled letter vines into magical words to build strong orthographic memory and spelling confidence.",
    badge: "Tactile Anagram Reconstruction • 18 Word Items",
    companionName: "Pip the Capuchin Monkey",
    companionRole: "Holds loose vine letters and provides clue tiles when needed.",
    color: "#9333ea",
    borderColor: "#7e22ce",
    bgTint: "#f3e8ff",
    icon: <IconMonkey size={34} />
  },
  stage4: {
    id: "stage4",
    key: "stage4",
    stageNumber: 4,
    number: "04",
    name: "Maths Jutsu Temple",
    subtitle: "Mathematical Logic & Reasoning",
    description: "Train in the ancient bamboo dojo! Master counting rods, number sense, and arithmetic logic calibrated specifically to support learners with dyscalculia.",
    badge: "Quantitative Logic & Dyscalculia Screening",
    companionName: "Master Koji the Red Panda",
    companionRole: "Breaks down complex multi-digit numbers into manageable steps.",
    color: "#d97706",
    borderColor: "#b45309",
    bgTint: "#fef3c7",
    icon: <IconMartialJutsu size={34} />
  },
  stage5: {
    id: "shapes",
    key: "shapes",
    stageNumber: 5,
    number: "05",
    name: "Sunstone Altar",
    subtitle: "Spatial Geometry & 3D Solids",
    description: "Spin and explore ancient sunlit solid crystals! Inspect 3D cubes, prisms, and pyramids from all angles to decode spatial alignments and count planar facets.",
    badge: "Interactive 3D Three.js Altar • Spatial Rotation",
    companionName: "Sol the Sun Chameleon",
    companionRole: "Changes color with each facet you rotate and inspect.",
    color: "#0284c7",
    borderColor: "#0369a1",
    bgTint: "#e0f2fe",
    icon: <IconSunAltar size={34} />
  },
  stage6: {
    id: "comprehension",
    key: "comprehension",
    stageNumber: 6,
    number: "06",
    name: "Storyteller's Lagoon",
    subtitle: "Reading Comprehension",
    description: "Dive into enchanted river stories! Follow calm, guided reading pacing, absorb story details, and solve reading comprehension quests tailored to your class level.",
    badge: "Class-Calibrated Passages • Semantic Recall",
    companionName: "Luna the River Otter",
    companionRole: "Highlights key story anchors and offers thoughtful hints without spoiling.",
    color: "#e11d48",
    borderColor: "#be123c",
    bgTint: "#ffe4e6",
    icon: <IconLagoonLotus size={34} />
  }
};

/**
 * LevelTransitionScreen
 * Dynamically reflects the specific level selected by the user.
 * Displays level name, pedagogical context, assigned animal companion, and calibrated difficulty.
 */
export default function LevelTransitionScreen({
  gladeKey = "stage1",
  onEnterGlade = () => {},
  onReturnToTrail = () => {},
  studentName = "",
  studentPhoto = "",
  selectedClass = 1,
  profiles = [],
  onSelectProfile = () => {},
  onNewProfile = null,
  studentXp = 10,
  authUser = null,
  onOpenLogin = () => {},
  onSignOut = () => {},
  spatialPulse = 0,
  pulseType = "neutral",
  fxTrigger = 0,
  fxScore = 0,
  fxCombo = 0
}) {
  const { t } = useLanguage();
  const glade = GLADE_CONFIGS[gladeKey] || GLADE_CONFIGS.stage1;

  return (
    <div className="app">
      <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
      <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />

      <UniversalAppHeader
        currentScreen="stages"
        onNavigate={(target) => {
          if (target === "home") onReturnToTrail();
          else onReturnToTrail();
        }}
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

      <div className="page" style={{ maxWidth: "860px", margin: "0 auto", padding: "20px 20px 80px" }}>
        {/* Navigation Bar */}
        <div className="top-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <button
            className="back-button"
            onClick={() => {
              playHoverTick();
              onReturnToTrail();
            }}
          >
            <IconChevronLeft size={16} />
            <span>{t("trailMapTitle", "Canopy Trail")}</span>
          </button>

          <div className="score-display">
            <IconStarSolid size={14} style={{ color: "#f59e0b" }} />
            <span>{studentXp} XP Stars</span>
          </div>
        </div>

        {/* Dynamic Level Transition Card */}
        <section
          className="stage-card"
          style={{
            background: "#fffdf2",
            border: `3.5px solid ${glade.borderColor}`,
            borderRadius: "16px 18px 15px 17px",
            boxShadow: `0 8px 0 ${glade.borderColor}, 0 20px 30px rgba(69, 26, 3, 0.12)`,
            padding: "36px 32px",
            textAlign: "center"
          }}
        >
          {/* Glade Number Tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: glade.bgTint, border: `2px solid ${glade.color}`, borderRadius: "10px 12px 10px 12px", padding: "4px 14px", marginBottom: "16px" }}>
            <span style={{ color: glade.color, fontWeight: "900", fontSize: "0.85rem", letterSpacing: "1px" }}>
              MODULE {glade.number} • EXPEDITION WAYPOINT
            </span>
          </div>

          {/* Large Emblem Crest */}
          <div
            style={{
              width: "78px",
              height: "78px",
              margin: "0 auto 16px",
              borderRadius: "16px 18px 15px 17px",
              backgroundColor: glade.bgTint,
              border: `3px solid ${glade.borderColor}`,
              boxShadow: `0 4px 0 ${glade.borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: glade.color
            }}
          >
            {glade.icon}
          </div>

          {/* Dynamic Glade Title */}
          <h1
            style={{
              fontFamily: "var(--font-display, 'Outfit', sans-serif)",
              color: "#451a03",
              fontSize: "2.3rem",
              fontWeight: "900",
              margin: "0 0 8px"
            }}
          >
            {glade.name}
          </h1>

          {/* Dynamic Subtitle */}
          <h3
            style={{
              fontFamily: "var(--font-display, 'Outfit', sans-serif)",
              color: glade.color,
              fontSize: "1.15rem",
              fontWeight: "800",
              margin: "0 0 16px"
            }}
          >
            {glade.title} • {glade.subtitle}
          </h3>

          {/* Contextual Description */}
          <p
            style={{
              color: "#78350f",
              fontSize: "1.05rem",
              lineHeight: "1.6",
              maxWidth: "680px",
              margin: "0 auto 24px"
            }}
          >
            {glade.description}
          </p>

          {/* Glade Details Banner */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              background: "#faf5eb",
              border: "2px dashed #d6d3c7",
              borderRadius: "12px 14px 12px 14px",
              padding: "16px 20px",
              marginBottom: "28px",
              textAlign: "left"
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#854d0e", textTransform: "uppercase" }}>
                Explorer Calibration
              </span>
              <div style={{ color: "#451a03", fontWeight: "700", fontSize: "0.95rem", marginTop: "2px" }}>
                Class {selectedClass} Curriculum • Standard Pacing
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#854d0e", textTransform: "uppercase" }}>
                Assigned Animal Guide
              </span>
              <div style={{ color: glade.color, fontWeight: "800", fontSize: "0.95rem", marginTop: "2px" }}>
                {glade.companionName}
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#854d0e", textTransform: "uppercase" }}>
                Clinical Diagnostic Metric
              </span>
              <div style={{ color: "#451a03", fontWeight: "700", fontSize: "0.95rem", marginTop: "2px" }}>
                {glade.badge}
              </div>
            </div>
          </div>

          {/* Action Button Row */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="save-button"
              style={{
                backgroundColor: glade.color,
                borderColor: glade.borderColor,
                boxShadow: `0 4px 0 ${glade.borderColor}`,
                fontSize: "1.08rem",
                padding: "14px 32px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px"
              }}
              onClick={() => {
                playSynapsePulse();
                onEnterGlade();
              }}
            >
              <span>Enter {glade.name}</span>
              <IconArrowRight size={18} />
            </button>

            <button
              className="secondary-button"
              style={{
                fontSize: "1rem",
                padding: "14px 24px"
              }}
              onClick={() => {
                playHoverTick();
                onReturnToTrail();
              }}
            >
              Return to Trail Map
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
