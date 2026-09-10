import React from "react";
import JungleEnvironment from "./jungle/JungleEnvironment";
import { IconCompass, IconMap, IconOwl, IconArrowRight } from "./Icons";
import { playSynapsePulse, playHoverTick } from "../utils/soundEffects";

/**
 * NotFoundScreen - Storybook 404 Page
 * "Lost in the Canopy!"
 * Child-friendly, magical jungle world theme with a clear path back to Basecamp.
 */
export default function NotFoundScreen({
  onReturnHome,
  onBackHome,
  onClose,
  onExploreStages,
  onNavigate,
}) {
  const handleHome = () => {
    playSynapsePulse();
    if (onReturnHome) onReturnHome();
    if (onBackHome) onBackHome();
    if (onClose) onClose();
    if (onNavigate) onNavigate("home");
    window.location.hash = "home";
  };

  const handleStages = () => {
    playHoverTick();
    if (onExploreStages) onExploreStages();
    if (onNavigate) onNavigate("stages");
    window.location.hash = "stages";
  };

  return (
    <div className="notfound-viewport-wrapper">
      <JungleEnvironment />

      <div className="notfound-main-container">
        <div className="notfound-parchment-plaque">
          {/* Guide Mascot Orb */}
          <div className="notfound-mascot-badge">
            <IconOwl size={42} />
          </div>

          <span className="notfound-eyebrow-pill">Canopy Expedition Alert</span>

          <h1 className="notfound-code-title">404</h1>
          <h2 className="notfound-heading">Lost in the Canopy!</h2>

          <p className="notfound-narrative">
            The jungle trail you are searching for seems to have vanished into the tropical vines and morning mist. Even the wisest explorers take an unexpected detour sometimes!
          </p>

          <div className="notfound-compass-card">
            <div className="compass-card-icon">
              <IconCompass size={24} />
            </div>
            <div className="compass-card-text">
              <strong>Ollie's Navigation Advice</strong>
              <small>Follow your compass back to Expedition Basecamp to resume your adventure.</small>
            </div>
          </div>

          <div className="notfound-actions-group">
            <button
              type="button"
              className="notfound-primary-btn"
              onClick={handleHome}
            >
              <IconCompass size={18} />
              <span>Return to Basecamp (Home)</span>
              <IconArrowRight size={16} />
            </button>

            <button
              type="button"
              className="notfound-secondary-btn"
              onClick={handleStages}
            >
              <IconMap size={18} />
              <span>View 6 Expeditions</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .notfound-viewport-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          box-sizing: border-box;
          position: relative;
        }

        .notfound-main-container {
          position: relative;
          z-index: 10;
          max-width: 580px;
          width: 100%;
        }

        .notfound-parchment-plaque {
          background: #fffdf2;
          border: 4px solid #78350f;
          border-radius: 28px 18px 26px 20px / 20px 26px 18px 28px;
          box-shadow: 0 10px 0 #78350f, 0 20px 36px rgba(69, 26, 3, 0.35);
          padding: 40px 36px;
          text-align: center;
          box-sizing: border-box;
        }

        .notfound-mascot-badge {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: linear-gradient(145deg, #fef08a 0%, #f59e0b 100%);
          border: 3px solid #78350f;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #78350f;
          box-shadow: 0 4px 0 #78350f;
          animation: notFoundFloat 3s ease-in-out infinite alternate;
        }

        @keyframes notFoundFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }

        .notfound-eyebrow-pill {
          display: inline-block;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: #fef08a;
          color: #92400e;
          border: 1.5px solid #d97706;
          border-radius: 20px;
          padding: 3px 12px;
          margin-bottom: 8px;
        }

        .notfound-code-title {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 3.6rem;
          font-weight: 900;
          color: #ea580c;
          line-height: 1;
          margin: 4px 0 6px;
          text-shadow: 0 2px 0 #78350f;
        }

        .notfound-heading {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1.65rem;
          font-weight: 800;
          color: #451a03;
          margin: 0 0 12px;
        }

        .notfound-narrative {
          font-size: 0.96rem;
          color: #78350f;
          line-height: 1.55;
          margin: 0 0 20px;
        }

        .notfound-compass-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fefae0;
          border: 2px dashed #b45309;
          border-radius: 14px;
          padding: 12px 16px;
          text-align: left;
          margin-bottom: 24px;
        }

        .compass-card-icon {
          color: #b45309;
          flex-shrink: 0;
        }

        .compass-card-text strong {
          display: block;
          font-size: 0.9rem;
          color: #451a03;
        }

        .compass-card-text small {
          font-size: 0.78rem;
          color: #78350f;
        }

        .notfound-actions-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .notfound-primary-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
          color: #ffffff;
          border: 2.5px solid #14532d;
          border-radius: 14px;
          padding: 13px 20px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 0 #14532d;
          transition: transform 0.15s ease;
        }

        .notfound-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 #14532d;
        }

        .notfound-secondary-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #fef3c7;
          color: #78350f;
          border: 2px solid #b45309;
          border-radius: 12px;
          padding: 11px 18px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.92rem;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .notfound-secondary-btn:hover {
          transform: translateY(-2px);
          background: #fde68a;
        }

        @media (max-width: 480px) {
          .notfound-parchment-plaque {
            padding: 28px 20px;
          }

          .notfound-code-title {
            font-size: 3rem;
          }

          .notfound-heading {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
