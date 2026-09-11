import React from "react";
import PipMonkey from "./PipMonkey";
import BaronEagle from "./companions/BaronEagle";
import RioParrot from "./companions/RioParrot";
import KojiPanda from "./companions/KojiPanda";
import SolChameleon from "./companions/SolChameleon";
import LunaOtter from "./companions/LunaOtter";
import { IconChevronRight, IconStar, IconMap, IconStarSolid } from "../Icons";
import { playHoverTick, playSynapsePulse } from "../../utils/soundEffects";
import { useLanguage } from "../../i18n/LanguageContext";

function renderGladeCompanion(index) {
  switch (index) {
    case 0:
      return <BaronEagle size="small" />;
    case 1:
      return <RioParrot size="small" />;
    case 2:
      return <PipMonkey size="small" />;
    case 3:
      return <KojiPanda size="small" />;
    case 4:
      return <SolChameleon size="small" />;
    case 5:
      return <LunaOtter size="small" />;
    default:
      return null;
  }
}

/**
 * QuestTrailMap - Winding Illustrated Canopy Adventure Trail
 * Renders the 6 Expedition Glades connected by an illustrated winding trail.
 */
export default function QuestTrailMap({
  modules = [],
  onLaunchModule = () => {},
  savedProgress = {}
}) {
  const { t } = useLanguage();

  return (
    <div className="quest-trail-map-wrapper">
      {/* Trail Section Header */}
      <div className="trail-section-header">
        <div className="trail-badge-tag">
          <IconMap size={16} />
          <span>{t("trailMapTitle", "THE CANOPY EXPEDITION TRAIL")}</span>
        </div>
        <h2 className="trail-headline">{t("heroTitleHighlight", "The 6 Sacred Glades of Lexis")}</h2>
        <p className="trail-sub-text">
          {t("trailMapSubtitle", "Follow the winding jungle trail to strengthen reading fluency, untangle mirror letters, speak secret phonemes, and solve 3D geometry mysteries.")}
        </p>
      </div>

      {/* Interactive Trail Map Grid */}
      <div className="trail-stations-layout">
        {modules.map((mod, index) => {
          const isEven = index % 2 === 0;
          // Calculate stars earned dynamically based on real student performance
          let starsEarned = 0;
          const stageKeys = ["stage1", "stage2", "stage3", "stage4", "shapes", "comprehension"];
          const currentStageKey = stageKeys[index];
          const perf = savedProgress?.[currentStageKey];
          if (perf) {
            const totalDone = (perf.firstTrySuccess || 0) + (perf.wrongAttempts || 0);
            if (totalDone > 0) {
              const accuracy = (perf.firstTrySuccess || 0) / totalDone;
              if (accuracy >= 0.8) starsEarned = 3;
              else if (accuracy >= 0.5) starsEarned = 2;
              else starsEarned = 1;
            }
          }

          return (
            <div
              key={mod.id}
              className={`trail-node-card ${isEven ? "align-alt" : ""}`}
              style={{ borderColor: mod.color }}
              onClick={() => {
                playSynapsePulse();
                if (mod.launch) mod.launch();
              }}
              role="button"
              tabIndex={0}
            >
              {/* Native Animal Companion Perched on each Glade Plaque */}
              <div
                className={`trail-companion-hanger companion-glade-${index + 1}`}
                onClick={(e) => {
                  // Allow clicking companion for sound and playful animation
                  e.stopPropagation();
                  playHoverTick();
                }}
              >
                {renderGladeCompanion(index)}
              </div>

              {/* Station Plaque Top Bar */}
              <div className="node-plaque-header">
                <div
                  className="node-icon-crest"
                  style={{ backgroundColor: mod.bgTint, borderColor: mod.color, color: mod.color }}
                >
                  <span className="crest-symbol">{mod.icon}</span>
                </div>
                <div className="node-indexing">
                  <span className="station-pill" style={{ color: mod.color, borderColor: mod.color }}>
                    MODULE {mod.number}
                  </span>
                  <div className="station-stars">
                    {Array.from({ length: 3 }).map((_, sIdx) => (
                      <span
                        key={sIdx}
                        className={`star-icon ${sIdx < starsEarned ? "earned" : "locked"}`}
                      >
                        <IconStarSolid size={14} style={{ display: "inline-block", verticalAlign: "middle" }} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Station Title & Subtitle */}
              <h3 className="node-station-name">{mod.name}</h3>
              <h4 className="node-station-subtitle" style={{ color: mod.color }}>
                {mod.title}
              </h4>
              <p className="node-station-detail">{mod.subtitle}</p>
              <p className="node-station-desc">{mod.description}</p>

              {/* Station Action Footer */}
              <div className="node-plaque-footer">
                <span className="node-badge-tag">{mod.badge}</span>
                <button
                  className="btn-node-enter"
                  style={{ background: mod.color, borderColor: "#451a03" }}
                  title={
                    mod.actionLabel ||
                    (mod.number === "01" || mod.id === "mod-1" ? "Explore Island →" :
                     mod.number === "02" || mod.id === "mod-2" ? "Enter Sanctuary →" :
                     mod.number === "03" || mod.id === "mod-3" ? "Enter Treehouse →" :
                     mod.number === "04" || mod.id === "mod-4" ? "Enter Temple →" :
                     mod.number === "05" || mod.id === "mod-5" ? "Enter Altar →" :
                     mod.number === "06" || mod.id === "mod-6" ? "Enter Lagoon →" : "Enter Glade →")
                  }
                >
                  <span>
                    {mod.actionLabel ||
                      (mod.number === "01" || mod.id === "mod-1" ? "Explore Island →" :
                       mod.number === "02" || mod.id === "mod-2" ? "Enter Sanctuary →" :
                       mod.number === "03" || mod.id === "mod-3" ? "Enter Treehouse →" :
                       mod.number === "04" || mod.id === "mod-4" ? "Enter Temple →" :
                       mod.number === "05" || mod.id === "mod-5" ? "Enter Altar →" :
                       mod.number === "06" || mod.id === "mod-6" ? "Enter Lagoon →" : "Enter Glade →")}
                  </span>
                </button>
              </div>

              {/* Storybook Wood Plaque Screws / Brass Pins */}
              <div className="pin pin-tl" />
              <div className="pin pin-tr" />
              <div className="pin pin-bl" />
              <div className="pin pin-br" />
            </div>
          );
        })}
      </div>

      <style>{`
        .quest-trail-map-wrapper {
          position: relative;
          width: 100%;
          margin: 40px 0 60px;
        }

        .trail-section-header {
          text-align: center;
          margin-bottom: 38px;
        }

        .trail-badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 16px;
          background: #dcfce7;
          border: 2px solid #16a34a;
          border-radius: 9px 11px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.86rem;
          font-weight: 800;
          color: #14532d;
          margin-bottom: 12px;
          box-shadow: 0 3px 0 #16a34a;
        }

        .trail-headline {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
          color: #451a03;
          margin-bottom: 10px;
        }

        .trail-sub-text {
          font-size: clamp(1.02rem, 1.3vw, 1.15rem);
          color: #78350f;
          max-width: 65ch;
          margin: 0 auto;
          line-height: 1.6;
        }

        .trail-stations-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 28px;
          position: relative;
        }

        .trail-node-card {
          position: relative;
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: 28px 18px 26px 20px / 20px 26px 18px 28px;
          box-shadow: 0 8px 0 #78350f, 0 14px 24px rgba(69, 26, 3, 0.14);
          padding: 28px 26px;
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.2s ease;
          overflow: visible;
        }

        .trail-node-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 14px 0 #78350f, 0 20px 32px rgba(69, 26, 3, 0.22);
        }

        /* Centered mascot perching on top wooden frame without blocking GLADE labels or stars */
        .trail-companion-hanger {
          position: absolute;
          top: -66px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          pointer-events: auto;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .trail-node-card:hover .trail-companion-hanger {
          transform: translateX(-50%) translateY(-5px) scale(1.06);
        }

        /* Fine-tuned perched placement for each glade companion */
        .companion-glade-1 {
          top: -70px;
        }

        .companion-glade-2 {
          top: -70px;
        }

        .companion-glade-3 {
          top: -66px;
        }

        .companion-glade-4 {
          top: -68px;
        }

        .companion-glade-5 {
          top: -66px;
        }

        .companion-glade-6 {
          top: -66px;
        }

        @media (max-width: 640px) {
          .trail-node-card {
            margin-top: 40px;
          }

          .trail-companion-hanger {
            transform: translateX(-50%) scale(0.85);
            transform-origin: bottom center;
            top: -56px;
          }

          .trail-node-card:hover .trail-companion-hanger {
            transform: translateX(-50%) translateY(-3px) scale(0.9);
          }
        }

        .node-plaque-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .node-icon-crest {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 3px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 4px 0 rgba(69, 26, 3, 0.15);
          transition: transform 0.2s ease;
        }

        .trail-node-card:hover .node-icon-crest {
          transform: scale(1.12) rotate(6deg);
        }

        .node-indexing {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .station-pill {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.8rem;
          font-weight: 800;
          background: #fefae0;
          border: 2px solid;
          border-radius: 8px 10px 8px 10px;
          padding: 3px 12px;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.08);
        }

        .station-stars {
          display: flex;
          gap: 2px;
        }

        .star-icon {
          font-size: 14px;
        }

        .star-icon.locked {
          opacity: 0.3;
          filter: grayscale(1);
        }

        .node-station-name {
          font-family: var(--font-display);
          font-size: 1.45rem;
          color: #451a03;
          line-height: 1.2;
          margin-top: 4px;
        }

        .node-station-subtitle {
          font-family: var(--font-display);
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .node-station-detail {
          font-size: 0.92rem;
          font-weight: 700;
          color: #78350f;
        }

        .node-station-desc {
          font-size: 0.92rem;
          color: #78350f;
          line-height: 1.5;
          flex-grow: 1;
        }

        .node-plaque-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 2px dashed #fed7aa;
          margin-top: 6px;
        }

        .node-badge-tag {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          color: #78350f;
          background: #fefae0;
          border: 1.5px solid #d97706;
          border-radius: 8px;
          padding: 4px 10px;
        }

        .btn-node-enter {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          color: #ffffff;
          border: 2.5px solid #451a03;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.94rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 3px 0 #451a03;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .btn-node-enter:hover {
          transform: scale(1.06);
        }

        /* Brass Screws / Pins */
        .pin {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d97706;
          border: 1.5px solid #78350f;
          box-shadow: inset 0 1px 1px #fef08a;
        }
        .pin-tl { top: 8px; left: 8px; }
        .pin-tr { top: 8px; right: 8px; }
        .pin-bl { bottom: 8px; left: 8px; }
        .pin-br { bottom: 8px; right: 8px; }
      `}</style>
    </div>
  );
}
