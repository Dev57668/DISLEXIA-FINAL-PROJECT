import React, { useState } from "react";
import JungleEnvironment from "./jungle/JungleEnvironment";
import {
  IconShieldCheck,
  IconCompass,
  IconArrowRight,
  IconCheck,
  IconUser,
  IconLock,
  IconBookOpen,
  IconAward,
  IconCross,
} from "./Icons";
import { playHoverTick, playSynapsePulse } from "../utils/soundEffects";

/**
 * LegalDocuments - Privacy Policy & Terms and Conditions
 * Hand-drawn storybook parchment aesthetic matching DyslexiaQuest theme.
 * Strictly reflects actual data practices: Firebase Auth, Firestore progress, local preferences.
 */
export default function LegalDocuments({
  initialType = "privacy", // "privacy" | "terms"
  initialTab,
  onClose,
  onBack,
  onReturnHome,
  onNavigate,
}) {
  const [activeTab, setActiveTab] = useState(() => initialTab || initialType || "privacy");

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    else if (initialType) setActiveTab(initialType);
  }, [initialTab, initialType]);

  const handleReturn = () => {
    playSynapsePulse();
    if (onBack) onBack();
    if (onClose) onClose();
    if (onReturnHome) onReturnHome();
    if (onNavigate) onNavigate("home");
    // Ensure URL hash reflects returning home
    window.location.hash = "home";
  };

  return (
    <div className="legal-viewport-wrapper">
      <JungleEnvironment />

      <div className="legal-main-container">
        <div className="legal-parchment-card">
          {/* Top Bar Navigation */}
          <div className="legal-top-bar">
            <button
              type="button"
              className="legal-back-btn"
              onClick={handleReturn}
              title="Return to Expedition Basecamp"
            >
              ← Back to Adventure
            </button>

            {/* Tab Switcher */}
            <div className="legal-tab-pills" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "privacy"}
                className={`legal-tab-pill ${activeTab === "privacy" ? "active" : ""}`}
                onClick={() => {
                  playHoverTick();
                  setActiveTab("privacy");
                  window.location.hash = "privacy";
                }}
              >
                <IconShieldCheck size={16} />
                <span>Privacy Policy</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "terms"}
                className={`legal-tab-pill ${activeTab === "terms" ? "active" : ""}`}
                onClick={() => {
                  playHoverTick();
                  setActiveTab("terms");
                  window.location.hash = "terms";
                }}
              >
                <IconBookOpen size={16} />
                <span>Terms & Conditions</span>
              </button>
            </div>

            <button
              type="button"
              className="legal-close-circle"
              onClick={handleReturn}
              aria-label="Close"
              title="Close and Return to Expedition"
            >
              <IconCross size={16} />
            </button>
          </div>

          <div className="legal-card-divider" />

          {/* PRIVACY POLICY CONTENT */}
          {activeTab === "privacy" && (
            <div className="legal-document-content">
              <div className="legal-header-block">
                <div className="legal-icon-orb">
                  <IconShieldCheck size={32} />
                </div>
                <h1 className="legal-title">DyslexiaQuest Privacy Policy</h1>
                <p className="legal-subtitle">
                  Last Updated: September 2026 • Educational Hackathon Edition
                </p>
              </div>

              {/* Highlight summary card */}
              <div className="legal-highlight-box">
                <IconCheck size={20} className="highlight-icon" />
                <p>
                  <strong>Explorer Privacy First:</strong> DyslexiaQuest is designed for young learners, educators, and parents. We do not sell student data, we do not show advertisements, and we do not use third-party tracking or analytics scripts.
                </p>
              </div>

              <section className="legal-section">
                <h2>1. About DyslexiaQuest</h2>
                <p>
                  DyslexiaQuest is an educational adventure web application built to support children and students with dyslexic traits through gamified cognitive screening, visual-orthographic reinforcement, phonological training, and multisensory exercises.
                </p>
              </section>

              <section className="legal-section">
                <h2>2. Information We Collect & Store</h2>
                <p>
                  We believe in minimal data collection. We only store information necessary to provide game functionality, save progress, and synchronize scores across sessions:
                </p>

                <div className="legal-data-grid">
                  <div className="legal-data-item">
                    <div className="data-item-header">
                      <IconLock size={18} />
                      <strong>Account Credentials</strong>
                    </div>
                    <p>
                      If you optionally register an explorer account, we store your email address and an encrypted password via Google Firebase Authentication. You can also explore the entire application anonymously via <em>Guest Explorer</em> mode with no account or email required.
                    </p>
                  </div>

                  <div className="legal-data-item">
                    <div className="data-item-header">
                      <IconUser size={18} />
                      <strong>Explorer Profiles</strong>
                    </div>
                    <p>
                      Explorer nicknames (display names), class/grade levels, and optional ages you provide to personalize adventures.
                    </p>
                  </div>

                  <div className="legal-data-item">
                    <div className="data-item-header">
                      <IconAward size={18} />
                      <strong>Game Progress & Telemetry</strong>
                    </div>
                    <p>
                      Star ratings earned across the 6 Sacred Glades, XP scores, completion milestones, and accuracy counts. For signed-in users, progress is stored in Google Firebase Firestore to enable cross-device progress sharing. For Guest Explorers, all progress is stored locally in your browser.
                    </p>
                  </div>

                  <div className="legal-data-item">
                    <div className="data-item-header">
                      <IconCompass size={18} />
                      <strong>Local Preferences</strong>
                    </div>
                    <p>
                      Accessibility preferences—such as the OpenDyslexic font toggle, language selection (10 languages), and global audio mute state—are stored exclusively on your device via browser <code>localStorage</code>.
                    </p>
                  </div>
                </div>
              </section>

              <section className="legal-section">
                <h2>3. What We Do NOT Collect</h2>
                <ul className="legal-checklist">
                  <li><strong>No Third-Party Advertising:</strong> We never display external ads or integrate ad-tech networks.</li>
                  <li><strong>No Behavioral Tracking:</strong> We do not use third-party analytics trackers, tracking pixels, or cross-site monitoring.</li>
                  <li><strong>No Location or Biometric Data:</strong> We do not request or track GPS coordinates or facial/voice biometrics.</li>
                  <li><strong>No Selling of Data:</strong> We never sell, rent, or trade student or family information.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Children's Privacy (COPPA & Family Safety)</h2>
                <p>
                  DyslexiaQuest is crafted with child privacy as a foundational principle:
                </p>
                <ul>
                  <li><strong>No forced registration:</strong> Children can access all 6 Glades and play without providing an email address or real name through <em>Guest Explorer</em> mode.</li>
                  <li><strong>Educator & Parent oversight:</strong> Parents and teachers can manage student profiles locally or create a shared family/classroom login.</li>
                  <li><strong>Account deletion:</strong> Users may request profile or account deletion at any time.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>5. Data Security</h2>
                <p>
                  Authentication and cloud data synchronization are safeguarded using industry-standard TLS encryption provided by Google Firebase infrastructure. Local device progress is stored securely within your browser's private storage sandbox.
                </p>
              </section>

              <section className="legal-section">
                <h2>6. Contact Us</h2>
                <p>
                  If you have questions about our privacy practices or wish to submit feedback regarding DyslexiaQuest, please reach out to our hackathon development team at <code>privacy@dyslexiaquest.org</code>.
                </p>
              </section>
            </div>
          )}

          {/* TERMS & CONDITIONS CONTENT */}
          {activeTab === "terms" && (
            <div className="legal-document-content">
              <div className="legal-header-block">
                <div className="legal-icon-orb amber">
                  <IconBookOpen size={32} />
                </div>
                <h1 className="legal-title">DyslexiaQuest Terms & Conditions</h1>
                <p className="legal-subtitle">
                  Last Updated: September 2026 • Educational Hackathon Edition
                </p>
              </div>

              {/* Medical Notice Box */}
              <div className="legal-highlight-box warning">
                <IconCompass size={20} className="highlight-icon" />
                <p>
                  <strong>Educational Prototype Notice:</strong> DyslexiaQuest is an interactive educational learning game and preliminary screening prototype. It is <strong>not a medical diagnosis</strong> and is not intended to replace formal evaluation by a certified neuropsychologist or speech-language pathologist.
                </p>
              </div>

              <section className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By launching and exploring DyslexiaQuest ("the Application"), you agree to these Terms & Conditions. If you are under the age of majority in your jurisdiction, please review these terms with a parent, guardian, or educator.
                </p>
              </section>

              <section className="legal-section">
                <h2>2. Educational Nature & Purpose</h2>
                <p>
                  DyslexiaQuest was created as an educational game prototype for hackathon demonstration and learning reinforcement. Its mini-games, visual discrimination challenges, anagrams, and auditory phoneme exercises are designed for developmental enrichment and dyslexia screening exploration.
                </p>
              </section>

              <section className="legal-section">
                <h2>3. Acceptable Use</h2>
                <p>
                  You agree to use DyslexiaQuest solely for personal, educational, non-commercial learning and classroom enrichment. You agree not to attempt to disrupt or tamper with game state, reverse engineer backend infrastructure, or overload the application.
                </p>
              </section>

              <section className="legal-section">
                <h2>4. Explorer Accounts & Guest Mode</h2>
                <p>
                  You may choose to play as a Guest Explorer with no account registration required. If you choose to register an email account for cross-device progress saving, you are responsible for maintaining the confidentiality of your password.
                </p>
              </section>

              <section className="legal-section">
                <h2>5. Intellectual Property</h2>
                <p>
                  All illustrations, storybook jungle visual assets, animal companion characters (Ollie the Guide Owl, Baron the Scout Eagle, Rio the Echo Parrot, Pip the Vine Monkey, Koji the Math Panda, Sol the Chameleon, Luna the Otter), audio soundscapes, game logic, and code are proprietary assets created for DyslexiaQuest.
                </p>
              </section>

              <section className="legal-section">
                <h2>6. Availability & Prototype Status</h2>
                <p>
                  As an active hackathon educational project, DyslexiaQuest is provided on an "as-is" and "as-available" basis. We strive to provide reliable performance, but features, stage levels, and user experiences may be enhanced or updated over time.
                </p>
              </section>

              <section className="legal-section">
                <h2>7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, the developers and contributors of DyslexiaQuest shall not be liable for any indirect, incidental, or consequential damages resulting from your access to or use of the application.
                </p>
              </section>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="legal-card-footer">
            <button
              type="button"
              className="legal-confirm-btn"
              onClick={handleReturn}
            >
              <span>Return to Adventure</span>
              <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .legal-viewport-wrapper {
          position: fixed;
          inset: 0;
          z-index: 1000;
          overflow-y: auto;
          background: #0f172a;
          padding: 24px 16px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          box-sizing: border-box;
        }

        .legal-main-container {
          position: relative;
          z-index: 10;
          max-width: 860px;
          width: 100%;
          margin: 20px auto;
        }

        .legal-parchment-card {
          background: #fffdf2;
          border: 4px solid #78350f;
          border-radius: 28px 18px 26px 20px / 20px 26px 18px 28px;
          box-shadow: 0 10px 0 #78350f, 0 20px 40px rgba(69, 26, 3, 0.35);
          padding: 36px 40px;
          box-sizing: border-box;
          color: #451a03;
        }

        .legal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 20px;
        }

        .legal-back-btn {
          background: #fef3c7;
          border: 2px solid #b45309;
          border-radius: 12px;
          padding: 7px 14px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-weight: 800;
          font-size: 0.88rem;
          color: #78350f;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .legal-back-btn:hover {
          transform: translateY(-2px);
          background: #fde68a;
        }

        .legal-tab-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fef08a;
          padding: 4px;
          border: 2px solid #b45309;
          border-radius: 14px;
        }

        .legal-tab-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.86rem;
          font-weight: 800;
          color: #78350f;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .legal-tab-pill.active {
          background: #15803d;
          color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .legal-close-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fef3c7;
          border: 2px solid #b45309;
          color: #78350f;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .legal-close-circle:hover {
          transform: scale(1.08);
          background: #fee2e2;
          color: #991b1b;
        }

        .legal-card-divider {
          height: 3px;
          background: repeating-linear-gradient(90deg, #b45309, #b45309 8px, transparent 8px, transparent 14px);
          margin-bottom: 28px;
          opacity: 0.6;
        }

        .legal-document-content {
          line-height: 1.65;
          font-size: 0.96rem;
          color: #451a03;
        }

        .legal-header-block {
          text-align: center;
          margin-bottom: 24px;
        }

        .legal-icon-orb {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #dcfce7;
          border: 3px solid #16a34a;
          color: #15803d;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          box-shadow: 0 4px 0 #15803d;
        }

        .legal-icon-orb.amber {
          background: #fef3c7;
          border-color: #d97706;
          color: #b45309;
          box-shadow: 0 4px 0 #b45309;
        }

        .legal-title {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1.8rem;
          font-weight: 800;
          color: #451a03;
          margin: 0 0 6px;
        }

        .legal-subtitle {
          font-size: 0.85rem;
          font-weight: 700;
          color: #92400e;
          margin: 0;
        }

        .legal-highlight-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          background: #ecfdf5;
          border: 2px solid #10b981;
          border-radius: 14px;
          margin-bottom: 26px;
          font-size: 0.92rem;
          line-height: 1.5;
          color: #065f46;
        }

        .legal-highlight-box.warning {
          background: #fffbeb;
          border-color: #f59e0b;
          color: #92400e;
        }

        .highlight-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .legal-section {
          margin-bottom: 24px;
        }

        .legal-section h2 {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1.15rem;
          font-weight: 800;
          color: #78350f;
          margin: 0 0 8px;
          border-bottom: 1.5px solid #fed7aa;
          padding-bottom: 4px;
        }

        .legal-section p {
          margin: 0 0 10px;
        }

        .legal-data-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 12px;
        }

        .legal-data-item {
          background: #fefce8;
          border: 1.5px solid #ca8a04;
          border-radius: 12px;
          padding: 12px 14px;
        }

        .data-item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #854d0e;
          font-size: 0.94rem;
          margin-bottom: 6px;
        }

        .legal-data-item p {
          font-size: 0.85rem;
          margin: 0;
          color: #582a0a;
          line-height: 1.45;
        }

        .legal-checklist {
          list-style: none;
          padding: 0;
          margin: 8px 0;
        }

        .legal-checklist li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 8px;
          font-size: 0.92rem;
        }

        .legal-checklist li::before {
          content: "✔";
          position: absolute;
          left: 0;
          color: #16a34a;
          font-weight: 900;
        }

        .legal-card-footer {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 2px solid #fed7aa;
          text-align: center;
        }

        .legal-confirm-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
          color: #ffffff;
          border: 2.5px solid #14532d;
          border-radius: 14px;
          padding: 12px 28px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 0 #14532d;
          transition: transform 0.15s ease;
        }

        .legal-confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 #14532d;
        }

        @media (max-width: 640px) {
          .legal-parchment-card {
            padding: 24px 18px;
            border-radius: 20px;
          }

          .legal-data-grid {
            grid-template-columns: 1fr;
          }

          .legal-top-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .legal-tab-pills {
            justify-content: center;
          }

          .legal-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
