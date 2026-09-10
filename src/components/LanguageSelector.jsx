import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { playHoverTick, playSynapsePulse } from "../utils/soundEffects";

export default function LanguageSelector({ className = "" }) {
  const { currentLanguage, setLanguage, languages, activeLanguageMeta } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    playHoverTick();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (code) => {
    playSynapsePulse();
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`lang-dropdown-wrapper ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className={`lang-trigger-btn ${isOpen ? "open" : ""}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Select Website Language"
      >
        <span className="lang-trigger-text lang-text-full">
          {activeLanguageMeta ? activeLanguageMeta.label : "English (EN)"}
        </span>
        <span className="lang-trigger-text lang-text-short">
          {activeLanguageMeta ? (activeLanguageMeta.code || "en").toUpperCase() : "EN"}
        </span>
        <span className="lang-trigger-arrow">▾</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="lang-menu" role="listbox" tabIndex={-1}>
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <div
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={`lang-menu-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(lang.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(lang.code);
                  }
                }}
              >
                <span className="lang-item-label">{lang.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .lang-dropdown-wrapper {
          position: relative;
          display: inline-block;
          font-family: 'Lexend', 'Noto Sans', 'Segoe UI', system-ui, sans-serif;
          z-index: 9999;
        }

        .lang-trigger-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-width: 145px;
          height: 38px;
          padding: 0 12px;
          background: #0f172a;
          color: #ffffff;
          border: 1.5px solid #2563eb;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.25);
          user-select: none;
        }

        .lang-trigger-btn:hover {
          background: #1e293b;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .lang-trigger-btn.open {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.35);
          background: #1e293b;
        }

        .lang-trigger-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.01em;
        }

        .lang-trigger-arrow {
          font-size: 0.75rem;
          color: #93c5fd;
          transition: transform 0.2s ease;
        }

        .lang-trigger-btn.open .lang-trigger-arrow {
          transform: rotate(180deg);
        }

        .lang-menu {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          min-width: 175px;
          background: #0b1329;
          border: 1.5px solid #1e3a8a;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
          padding: 4px 0;
          z-index: 10000;
          max-height: 380px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #0f172a;
          animation: langFadeIn 0.15s ease-out;
        }

        @keyframes langFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lang-menu::-webkit-scrollbar {
          width: 5px;
        }
        .lang-menu::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }

        .lang-menu-item {
          display: flex;
          align-items: center;
          padding: 8px 14px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #e2e8f0;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
          user-select: none;
          outline: none;
          text-align: left;
        }

        .lang-menu-item:hover {
          background: #1e293b;
          color: #ffffff;
        }

        .lang-menu-item.selected {
          background: #475569;
          color: #ffffff;
          font-weight: 700;
        }

        .lang-menu-item.selected:hover {
          background: #52637a;
        }

        .lang-item-label {
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .lang-text-short {
          display: none;
        }

        .lang-text-full {
          display: inline;
        }

        @media (max-width: 768px) {
          .lang-trigger-btn {
            min-width: auto;
            max-width: 72px;
            height: 32px;
            padding: 0 6px;
            font-size: 0.76rem;
            gap: 3px;
          }
          .lang-text-full {
            display: none;
          }
          .lang-text-short {
            display: inline;
            font-weight: 700;
          }
          .lang-menu {
            max-width: 200px;
            right: 0;
            left: auto;
          }
        }

        @media (max-width: 480px) {
          .lang-trigger-btn {
            max-width: 62px;
            padding: 0 4px;
            font-size: 0.72rem;
          }
          .lang-trigger-text {
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
}
