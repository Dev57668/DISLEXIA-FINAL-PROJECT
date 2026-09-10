import React, { useState, useEffect } from "react";
import { IconCompass, IconCheck } from "./Icons";

/**
 * OfflineBanner - Lightweight storybook connection awareness
 * Detects offline state, informs the user that local play continues safely,
 * and confirms when the internet connection is restored.
 */
export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(() => (typeof navigator !== "undefined" ? !navigator.onLine : false));
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline && !showReconnected) return null;

  return (
    <div
      className={`jungle-offline-toast ${showReconnected ? "reconnected" : "offline"}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon">
        {showReconnected ? <IconCheck size={16} /> : <IconCompass size={16} />}
      </div>
      <div className="toast-copy">
        {showReconnected ? (
          <strong>Connection Restored — Canopy Online!</strong>
        ) : (
          <span>
            <strong>Offline Explorer Mode:</strong> Playing locally. Cloud sync will resume when connection returns.
          </span>
        )}
      </div>

      <style>{`
        .jungle-offline-toast {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 20px;
          font-family: var(--font-display, 'Outfit', 'Nunito', sans-serif);
          font-size: 0.86rem;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
          animation: toastSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          max-width: calc(100vw - 32px);
          box-sizing: border-box;
        }

        @keyframes toastSlideUp {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .jungle-offline-toast.offline {
          background: #fef3c7;
          border: 2.5px solid #d97706;
          color: #78350f;
        }

        .jungle-offline-toast.offline .toast-icon {
          color: #b45309;
        }

        .jungle-offline-toast.reconnected {
          background: #dcfce7;
          border: 2.5px solid #16a34a;
          color: #14532d;
        }

        .jungle-offline-toast.reconnected .toast-icon {
          color: #15803d;
        }

        .toast-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-copy {
          line-height: 1.35;
        }
      `}</style>
    </div>
  );
}
