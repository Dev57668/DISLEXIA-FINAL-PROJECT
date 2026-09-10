import React, { useState, useRef, useEffect } from "react";
import {
  IconBrain,
  IconUser,
  IconVolume,
  IconVolumeOff,
  IconCheck,
  IconChevronRight,
  IconCompass,
  IconCamp,
  IconMap,
  IconBackpack,
  IconOwl,
  IconStarSolid,
  IconLeaf,
  IconLogout,
  IconShieldCheck
} from "./Icons";
import {
  toggleSound,
  isSoundEnabled,
  playHoverTick,
  playSynapsePulse
} from "../utils/soundEffects";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * UniversalAppHeader - Canopy Expedition Navigation Bar
 * Hand-drawn bamboo & warm wood aesthetic with brass pins and tactile buttons.
 */
export default function UniversalAppHeader({
  currentScreen = "home",
  onNavigate = () => {},
  studentName = "",
  studentPhoto = "",
  selectedClass = 1,
  profiles = [],
  onSelectProfile = () => {},
  onNewProfile = null,
  studentXp = 10,
  authUser = null,
  onOpenLogin = () => {},
  onSignOut = () => {}
}) {
  const { t } = useLanguage();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [dyslexicFont, setDyslexicFont] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync with global audio events across screens and components
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
      document.body.classList.add("dyslexic-font-active");
      document.documentElement.style.setProperty("--font-body", "'OpenDyslexic', 'Lexend', sans-serif");
      document.documentElement.style.setProperty("--sans", "'OpenDyslexic', 'Lexend', sans-serif");
    } else {
      document.body.classList.remove("dyslexic-font-active");
      document.documentElement.style.setProperty("--font-body", "'Lexend', 'Nunito', sans-serif");
      document.documentElement.style.setProperty("--sans", "'Lexend', 'Nunito', sans-serif");
    }
  };

  const navItems = [
    { id: "home", label: t("navCamp", "Camp & Map"), shortLabel: t("navCampShort", "Camp"), icon: <IconCamp size={18} /> },
    { id: "stages", label: t("navExpeditions", "6 Expeditions"), shortLabel: t("navExpeditionsShort", "Stages"), icon: <IconMap size={18} /> },
    { id: "profile", label: t("navPassport", "Explorer Passport"), shortLabel: t("navPassportShort", "Passport"), icon: <IconBackpack size={18} /> },
    { id: "teacher", label: t("navJournal", "Guide Journal"), shortLabel: t("navJournalShort", "Journal"), icon: <IconOwl size={18} /> }
  ];

  const currentProfile = profiles.find((p) => p.studentName && p.studentName === studentName) || null;
  const effectivePhoto = studentPhoto || currentProfile?.studentPhoto || authUser?.photoURL || "";

  // The active DyslexiaQuest student profile is the primary source of truth for explorer identity
  const activeDisplayName =
    studentName ||
    authUser?.displayName ||
    (authUser?.email ? authUser.email.split("@")[0] : t("juniorExplorer", "Junior Explorer"));

  return (
    <header className="jungle-canopy-header">
      {/* Brand Compass Logo */}
      <div
        className="jungle-header-brand"
        onClick={() => {
          playSynapsePulse();
          onNavigate("home");
        }}
        role="button"
        tabIndex={0}
        title="Return to Canopy Expedition Map"
      >
        <div className="jungle-brand-orb">
          <IconCompass size={22} className="brand-icon-svg" />
        </div>
        <div className="jungle-brand-text">
          <span className="jungle-brand-title">{t("brandTitle", "DyslexiaQuest")}</span>
          <span className="jungle-brand-sub">{t("brandSub", "Canopy Adventure & Learning")}</span>
        </div>
      </div>

      {/* Center Navigation Badges */}
      <nav className="jungle-nav-tray" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id ||
            (item.id === "stages" && ["stage1", "stage2", "stage3", "stage4", "shapes", "comprehension", "levelReport", "stage1Report", "stage2Report", "stage3Report", "stage4Report", "shapesReport", "comprehensionReport"].includes(currentScreen));
          return (
            <button
              key={item.id}
              className={`jungle-nav-badge ${isActive ? "active" : ""}`}
              onClick={() => {
                playHoverTick();
                onNavigate(item.id);
              }}
            >
              <span className="badge-icon">{item.icon}</span>
              <span className="badge-label badge-label-full">{item.label}</span>
              <span className="badge-label badge-label-short">{item.shortLabel}</span>
              {isActive && <span className="badge-active-leaf"><IconLeaf size={10} /></span>}
            </button>
          );
        })}
      </nav>

      {/* Right Controls & Passport Badge */}
      <div className="jungle-header-actions">
        {/* Auth & Explorer Profile Group */}
        <div className="header-auth-group">
          {/* Student Passport Badge & Dropdown */}
          <div className="jungle-profile-dropdown-container" ref={dropdownRef}>
            <div
              className={`jungle-passport-badge ${profileDropdownOpen ? "open" : ""}`}
              onClick={() => {
                playHoverTick();
                setProfileDropdownOpen((prev) => !prev);
              }}
              title="Click to view and switch explorer passports"
            >
              {effectivePhoto ? (
                <img
                  src={effectivePhoto}
                  alt={activeDisplayName}
                  className="passport-avatar-photo"
                />
              ) : activeDisplayName ? (
                <span className="passport-avatar-initial" aria-hidden="true">
                  {activeDisplayName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="passport-avatar">
                  <IconBackpack size={16} />
                </span>
              )}
              <div className="passport-info">
                <strong className="passport-name">
                  {activeDisplayName}
                </strong>
                <span className="passport-grade">
                  {t("classLabel", "Class")} {selectedClass || 1} • <IconStarSolid size={12} style={{ display: "inline-block", verticalAlign: "middle", color: "#f59e0b" }} /> {studentXp || 10} XP ▾
                </span>
              </div>
            </div>

            {profileDropdownOpen && (
              <div className="jungle-passport-menu">
                {authUser ? (
                  <div className="passport-menu-user-card">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="passport-menu-user-badge">
                        <IconShieldCheck size={14} />
                        <span>Verified Explorer</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "#166534", background: "#dcfce7", padding: "2px 8px", borderRadius: 6, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                        Cloud Synced
                      </span>
                    </div>
                    <div className="passport-menu-email">{authUser.email}</div>
                  </div>
                ) : (
                  <div className="passport-menu-user-card" style={{ background: "#fef3c7", borderColor: "#fde68a" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="passport-menu-user-badge" style={{ color: "#92400e" }}>
                        <IconCompass size={14} />
                        <span>Guest Explorer Mode</span>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "#92400e", background: "#fef08a", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>
                        Local Storage
                      </span>
                    </div>
                    <div className="passport-menu-email" style={{ color: "#78350f" }}>Progress saved on this device. Sign in anytime to sync across devices.</div>
                  </div>
                )}

                <div className="passport-menu-header">
                  <span>{t("passportsTitle", "EXPLORER PASSPORTS")} ({profiles.length})</span>
                  <button
                    className="passport-btn-add"
                    onClick={() => {
                      playSynapsePulse();
                      setProfileDropdownOpen(false);
                      if (onNewProfile) onNewProfile();
                      else onNavigate("profile");
                    }}
                  >
                    {t("newPassport", "+ New")}
                  </button>
                </div>

                <div className="passport-profiles-list">
                  {profiles.map((p) => {
                    const isCurrent = p.studentName === studentName;
                    return (
                      <div
                        key={p.id}
                        className={`passport-profile-item ${isCurrent ? "active" : ""}`}
                        onClick={() => {
                          playSynapsePulse();
                          onSelectProfile(p);
                          setProfileDropdownOpen(false);
                        }}
                      >
                        <div className="passport-item-avatar">
                          {p.studentPhoto ? (
                            <img src={p.studentPhoto} alt={p.studentName} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                          ) : p.studentName ? (
                            <span>{p.studentName.charAt(0).toUpperCase()}</span>
                          ) : (
                            <IconUser size={16} />
                          )}
                        </div>
                        <div className="passport-item-info">
                          <strong>{p.studentName}</strong>
                          <small>Class {p.studentClass || 1} • Age {p.studentAge || "—"} • ⭐ {p.xp || 10} XP</small>
                        </div>
                        {isCurrent && (
                          <span className="passport-check-mark">
                            <IconCheck size={16} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Optional multi-profile guidance tip */}
                <div className="passport-menu-tip">
                  <IconBackpack size={14} style={{ flexShrink: 0, color: "#d97706" }} />
                  <span>Want to add another explorer? You can create additional profiles here.</span>
                </div>

                <div className="passport-menu-footer">
                  <button
                    className="passport-all-btn"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onNavigate("profile");
                    }}
                  >
                    <span>{t("managePassports", "Manage All Passports")}</span>
                    <IconChevronRight size={14} />
                  </button>
                  {authUser ? (
                    <button
                      className="passport-menu-signout-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        playHoverTick();
                        onSignOut();
                      }}
                      title="Sign out of your explorer account"
                    >
                      <IconLogout size={14} />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <button
                      className="passport-menu-signin-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        playSynapsePulse();
                        onOpenLogin();
                      }}
                    >
                      <IconCompass size={14} />
                      <span>Sign In to Sync</span>
                    </button>
                  )}
                </div>

                {/* Passport Dropdown Legal Navigation */}
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px 6px",
                  fontSize: "0.75rem",
                  color: "#92400e",
                  borderTop: "1px dashed rgba(180, 83, 9, 0.25)"
                }}>
                  <button
                    style={{ background: "none", border: "none", color: "#b45309", cursor: "pointer", textDecoration: "underline", font: "inherit", padding: 0 }}
                    onClick={() => { setProfileDropdownOpen(false); onNavigate("privacy"); }}
                  >
                    Privacy Policy
                  </button>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <button
                    style={{ background: "none", border: "none", color: "#b45309", cursor: "pointer", textDecoration: "underline", font: "inherit", padding: 0 }}
                    onClick={() => { setProfileDropdownOpen(false); onNavigate("terms"); }}
                  >
                    Terms & Conditions
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Firebase Authentication: Sign In (when guest/logged out) or Sign Out (when logged in) */}
          {authUser ? (
            <button
              className="auth-signout-btn"
              onClick={() => {
                playHoverTick();
                onSignOut();
              }}
              title={`Signed in as ${authUser.email}. Click to sign out.`}
              aria-label="Sign Out"
            >
              <IconLogout size={13} />
              <span className="signout-text">Sign Out</span>
            </button>
          ) : (
            <button
              className="jungle-header-signin-btn"
              onClick={() => {
                playSynapsePulse();
                onOpenLogin();
              }}
              title="Sign in to save your progress and access it on any device"
              aria-label="Sign In to DyslexiaQuest"
            >
              <span className="jungle-header-signin-icon">
                <IconCompass size={17} />
              </span>
              <span className="jungle-header-signin-text">Sign In</span>
            </button>
          )}
        </div>

        {/* Global Settings & Preferences Group */}
        <div className="header-settings-group">
          {/* 10-Language Selector Dropdown */}
          <LanguageSelector />

          {/* Dyslexic Font Switcher Button */}
          <button
            className={`jungle-utility-btn ${dyslexicFont ? "active-dyslexic" : ""}`}
            onClick={handleFontToggle}
            title={dyslexicFont ? "Font: OpenDyslexic (Active)" : "Font: Lexend Reading Font"}
            aria-label="Toggle Dyslexia-Optimized Font"
          >
            <span className="util-icon">Aa</span>
            <span className="util-text">{dyslexicFont ? t("fontDyslexic", "Dyslexic") : t("fontStandard", "Standard")}</span>
          </button>

          {/* Global Audio FX / Mute Toggle */}
          <button
            className={`jungle-utility-btn sound-btn ${soundOn ? "active-sound" : "muted-sound"}`}
            onClick={handleSoundToggle}
            title={soundOn ? "Mute audio" : "Unmute audio"}
            aria-label={soundOn ? "Mute audio" : "Unmute audio"}
          >
            {soundOn ? <IconVolume size={20} /> : <IconVolumeOff size={20} />}
          </button>
        </div>
      </div>

      <style>{`
        .jungle-canopy-header {
          position: sticky;
          top: 14px;
          margin: 0 16px 20px;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          background: #fffdf2;
          border: 3.5px solid #78350f;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 0 6px 0 #78350f, 0 12px 24px rgba(69, 26, 3, 0.15);
          backdrop-filter: blur(8px);
          box-sizing: border-box;
          max-width: calc(100% - 32px);
          width: auto;
        }

        .jungle-header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .jungle-brand-orb {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(145deg, #fef08a 0%, #f59e0b 100%);
          border: 2.5px solid #78350f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          box-shadow: 0 3px 0 #78350f;
          transition: transform 0.2s ease;
        }

        .jungle-header-brand:hover .jungle-brand-orb {
          transform: rotate(18deg) scale(1.08);
        }

        .jungle-brand-text {
          display: flex;
          flex-direction: column;
        }

        .jungle-brand-title {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 800;
          color: #451a03;
          line-height: 1.1;
        }

        .brand-highlight {
          color: #ea580c;
        }

        .jungle-brand-sub {
          font-size: 0.78rem;
          font-weight: 700;
          color: #1b7340;
          letter-spacing: 0.02em;
        }

        .jungle-nav-tray {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f7fee7;
          padding: 4px 8px;
          border: 2.5px solid #65a30d;
          border-radius: 14px 12px 15px 12px;
          box-shadow: inset 0 2px 4px rgba(77, 124, 15, 0.15);
        }

        .jungle-nav-badge {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: transparent;
          border: 2px solid transparent;
          border-radius: 10px 12px 9px 11px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.94rem;
          font-weight: 700;
          color: #78350f;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .jungle-nav-badge:hover {
          background: rgba(254, 240, 138, 0.6);
          border-color: #d97706;
          color: #451a03;
          transform: translateY(-1px);
        }

        .jungle-nav-badge.active {
          background: linear-gradient(180deg, #1b7340 0%, #14532d 100%);
          border-color: #0f3822;
          color: #ffffff;
          box-shadow: 0 3px 0 #0f3822;
        }

        .badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge-label {
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .badge-label-short {
          display: none;
        }

        .badge-label-full {
          display: inline;
        }

        .badge-active-leaf {
          display: flex;
          align-items: center;
          color: #84cc16;
          margin-left: 2px;
        }

        .jungle-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-auth-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-settings-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .jungle-passport-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: #fefae0;
          border: 2.5px solid #78350f;
          border-radius: 12px 14px 11px 13px;
          cursor: pointer;
          box-shadow: 0 3px 0 #78350f;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .jungle-passport-badge:hover,
        .jungle-passport-badge.open {
          transform: translateY(-2px);
          background: #fef08a;
          box-shadow: 0 4px 0 #78350f;
        }

        .passport-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #92400e;
        }

        .passport-info {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .passport-name {
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.92rem;
          font-weight: 700;
          color: #451a03;
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .passport-grade {
          font-size: 0.74rem;
          font-weight: 700;
          color: #b45309;
        }

        .jungle-passport-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 290px;
          background: #fffdf2;
          border: 3px solid #78350f;
          border-radius: 16px 18px 15px 17px;
          box-shadow: 0 10px 25px rgba(69, 26, 3, 0.25);
          padding: 14px;
          z-index: 100;
        }

        .passport-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.82rem;
          font-weight: 700;
          color: #78350f;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1.5px dashed #d97706;
        }

        .passport-btn-add {
          padding: 3px 10px;
          background: #22c55e;
          color: #fff;
          border: 2px solid #15803d;
          border-radius: 8px 10px 8px 10px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
        }

        .passport-profiles-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 200px;
          overflow-y: auto;
        }

        .passport-profile-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .passport-profile-item:hover {
          background: #fef08a;
        }

        .passport-profile-item.active {
          background: #fefae0;
          border: 1.5px solid #d97706;
        }

        .passport-item-info strong {
          display: block;
          font-size: 0.92rem;
          color: #451a03;
        }

        .passport-item-info small {
          color: #78350f;
          font-size: 0.76rem;
        }

        .passport-check-mark {
          margin-left: auto;
          color: #16a34a;
        }

        .passport-menu-tip {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fefce8;
          border: 1px dashed #d97706;
          border-radius: 8px;
          padding: 6px 9px;
          margin-top: 8px;
          font-size: 0.74rem;
          color: #78350f;
          line-height: 1.35;
        }

        .passport-menu-footer {
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid #fed7aa;
        }

        .passport-all-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          background: none;
          border: none;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.86rem;
          font-weight: 700;
          color: #ea580c;
          cursor: pointer;
        }

        .jungle-utility-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          background: #fefae0;
          border: 2.5px solid #78350f;
          border-radius: 11px 13px 10px 12px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.88rem;
          font-weight: 700;
          color: #78350f;
          cursor: pointer;
          box-shadow: 0 3px 0 #78350f;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .jungle-utility-btn:hover {
          transform: translateY(-2px);
          background: #fef08a;
        }

        .jungle-utility-btn.active-dyslexic {
          background: #f59e0b;
          color: #ffffff;
          border-color: #92400e;
        }

        .jungle-utility-btn.sound-btn {
          padding: 7px 10px;
        }

        .jungle-utility-btn.active-sound {
          color: #15803d;
        }

        @media (max-width: 1380px) and (min-width: 1181px) {
          .jungle-canopy-header {
            padding: 8px 12px;
            gap: 8px;
          }

          .badge-label-full {
            display: none !important;
          }

          .badge-label-short {
            display: inline !important;
          }

          .jungle-nav-tray {
            gap: 4px;
            padding: 3px 6px;
          }

          .jungle-nav-badge {
            padding: 6px 10px;
            font-size: 0.86rem;
            gap: 4px;
          }

          .jungle-header-actions {
            gap: 6px;
          }

          .header-auth-group {
            gap: 6px;
          }

          .header-settings-group {
            gap: 4px;
          }

          .passport-name {
            max-width: 95px;
          }

          .jungle-passport-badge {
            padding: 5px 8px;
          }

          .jungle-header-signin-btn {
            padding: 6px 12px;
            font-size: 0.88rem;
          }
        }

        @media (max-width: 1180px) {
          .jungle-canopy-header {
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 8px 10px;
            padding: 8px 14px;
            margin: 0 10px 16px;
            box-sizing: border-box;
            max-width: calc(100% - 20px);
          }

          .badge-label-full {
            display: inline !important;
          }

          .badge-label-short {
            display: none !important;
          }

          .jungle-nav-tray {
            order: 3;
            width: 100%;
            justify-content: center;
            margin-top: 4px;
          }

          .badge-label {
            font-size: 0.88rem;
          }
        }

        @media (max-width: 768px) {
          .jungle-canopy-header {
            margin: 0 4px 10px;
            padding: 6px 8px;
            border-radius: 16px;
            border-width: 2.5px;
            box-shadow: 0 4px 0 #78350f;
            gap: 6px;
            box-sizing: border-box;
            max-width: calc(100% - 8px);
            align-items: center;
          }

          .jungle-header-brand {
            gap: 6px;
            flex-shrink: 0;
          }

          .jungle-brand-orb {
            width: 32px;
            height: 32px;
            min-width: 32px;
            border-width: 2px;
            font-size: 16px;
          }

          .jungle-brand-title {
            font-size: 1.05rem;
            white-space: nowrap;
          }

          .jungle-brand-sub {
            display: none;
          }

          .jungle-header-actions {
            gap: 5px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-shrink: 0;
          }

          .header-auth-group {
            gap: 4px;
            display: flex;
            align-items: center;
          }

          .header-settings-group {
            gap: 3px;
            display: flex;
            align-items: center;
          }

          .jungle-passport-badge {
            padding: 3px 6px;
            gap: 4px;
            border-radius: 8px;
            border-width: 2px;
            height: 32px;
            box-sizing: border-box;
          }

          .passport-avatar {
            display: flex;
            align-items: center;
          }

          .passport-avatar-initial,
          .passport-avatar-photo {
            width: 24px;
            height: 24px;
            font-size: 0.75rem;
          }

          .jungle-header-signin-btn {
            padding: 4px 10px;
            font-size: 0.82rem;
            height: 32px;
            border-radius: 8px;
            gap: 5px;
          }

          .auth-signout-btn {
            padding: 4px 8px;
            height: 32px;
            border-radius: 8px;
            box-sizing: border-box;
          }

          .auth-signout-btn .signout-text {
            display: none;
          }

          .passport-name {
            font-size: 0.76rem;
            max-width: 55px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .passport-grade {
            display: none;
          }

          .jungle-utility-btn {
            padding: 3px 6px;
            height: 32px;
            min-width: 32px;
            font-size: 0.78rem;
            border-radius: 8px;
            border-width: 2px;
            justify-content: center;
            box-sizing: border-box;
          }

          .jungle-utility-btn .util-text {
            display: none;
          }

          .jungle-utility-btn.sound-btn {
            padding: 3px 5px;
            min-width: 30px;
          }

          .jungle-passport-menu {
            right: 0;
            left: auto;
            max-width: calc(100vw - 20px);
            width: 270px;
          }

          .jungle-nav-tray {
            order: 3;
            width: 100%;
            display: flex;
            justify-content: space-around;
            gap: 4px;
            padding: 4px 2px;
            margin-top: 4px;
            box-sizing: border-box;
            border-radius: 12px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .jungle-nav-tray::-webkit-scrollbar {
            display: none;
          }

          .jungle-nav-badge {
            flex: 1 1 0;
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px 2px;
            gap: 2px;
            font-size: 0.72rem;
            border-radius: 8px;
            white-space: nowrap;
            text-align: center;
            border-width: 1.5px;
          }

          .badge-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .badge-label-full {
            display: none !important;
          }

          .badge-label-short {
            display: block !important;
            font-size: 0.72rem;
            font-weight: 700;
            line-height: 1.1;
          }

          .badge-active-leaf {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .jungle-canopy-header {
            margin: 0 2px 8px;
            padding: 5px 6px;
            border-radius: 14px;
            gap: 4px;
            max-width: calc(100% - 4px);
          }

          .jungle-brand-orb {
            width: 28px;
            height: 28px;
            min-width: 28px;
            font-size: 14px;
          }

          .jungle-brand-title {
            font-size: 0.94rem;
          }

          .jungle-header-actions {
            gap: 3px;
          }

          .jungle-passport-badge {
            padding: 2px 4px;
            height: 30px;
          }

          .passport-name {
            max-width: 42px;
            font-size: 0.7rem;
          }

          .jungle-utility-btn {
            padding: 2px 5px;
            height: 30px;
            min-width: 30px;
          }

          .jungle-nav-badge {
            padding: 4px 1px;
            font-size: 0.68rem;
          }

          .badge-label-short {
            font-size: 0.68rem;
          }
        }
      `}</style>
    </header>
  );
}
