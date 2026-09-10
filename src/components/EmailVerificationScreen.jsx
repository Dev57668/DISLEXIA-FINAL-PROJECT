import React, { useState, useEffect, useRef } from "react";
import JungleEnvironment from "./jungle/JungleEnvironment";
import {
  checkEmailVerified,
  sendVerificationEmail,
  logOut,
} from "../lib/firebase";
import {
  IconCompass,
  IconMail,
  IconCheck,
  IconAlertTriangle,
  IconSmartphone,
  IconLaptop,
  IconClock,
  IconLogout,
} from "./Icons";
import { playSynapsePulse, playHoverTick } from "../utils/soundEffects";

function formatVerificationError(err) {
  if (!err) return "An unexpected error occurred.";
  const msg = err.message || String(err);
  if (msg.includes("auth/too-many-requests")) {
    return "Too many requests. Please wait a short while before requesting another email.";
  }
  if (msg.includes("auth/user-token-expired") || msg.includes("auth/user-disabled")) {
    return "This session has expired. Please sign in again.";
  }
  return msg.replace("Firebase: ", "").replace(/\(auth\/[^)]+\)\.?/, "").trim();
}

export default function EmailVerificationScreen({
  user,
  onVerificationSuccess = () => {},
  onSignOut = () => {},
}) {
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);

  const isMountedRef = useRef(true);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 60-Second Resend Cooldown Countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Periodic Auto-Polling (every 3.5 seconds) to check if the user verified on another device (e.g. mobile phone)
  useEffect(() => {
    if (isSuccess || hasTriggeredRef.current) return;

    const pollInterval = setInterval(async () => {
      if (!isMountedRef.current || hasTriggeredRef.current) return;
      try {
        const verified = await checkEmailVerified(user);
        if (verified && isMountedRef.current && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setIsSuccess(true);
          playSynapsePulse();
          clearInterval(pollInterval);
          setTimeout(() => {
            if (isMountedRef.current) {
              onVerificationSuccess(user);
            }
          }, 800);
        }
      } catch {
        // Polling errors silently handled
      }
    }, 3500);

    return () => clearInterval(pollInterval);
  }, [user, isSuccess, onVerificationSuccess]);

  // Manual Check Verification Action
  const handleManualCheck = async () => {
    playHoverTick();
    setErrorMessage("");
    setInfoMessage("");
    setChecking(true);

    try {
      const verified = await checkEmailVerified(user);
      if (!isMountedRef.current) return;

      if (verified) {
        hasTriggeredRef.current = true;
        setIsSuccess(true);
        playSynapsePulse();
        setTimeout(() => {
          if (isMountedRef.current) {
            onVerificationSuccess(user);
          }
        }, 800);
      } else {
        setErrorMessage(
          "We haven't detected your verification yet. Please ensure you tapped the link in the email, or wait a few seconds and check again."
        );
      }
    } catch (err) {
      if (isMountedRef.current) {
        setErrorMessage(formatVerificationError(err));
      }
    } finally {
      if (isMountedRef.current) {
        setChecking(false);
      }
    }
  };

  // Resend Verification Email Action
  const handleResendEmail = async () => {
    if (resendCooldown > 0 || resending) return;
    playHoverTick();
    setErrorMessage("");
    setInfoMessage("");
    setResending(true);

    try {
      await sendVerificationEmail(user);
      if (isMountedRef.current) {
        setResendCooldown(60);
        setInfoMessage("A fresh verification email has been dispatched. Please check your inbox and spam folder.");
        playSynapsePulse();
      }
    } catch (err) {
      if (isMountedRef.current) {
        setErrorMessage(formatVerificationError(err));
      }
    } finally {
      if (isMountedRef.current) {
        setResending(false);
      }
    }
  };

  // Sign out / Change Account
  const handleSignOutClick = async () => {
    playHoverTick();
    try {
      await logOut();
    } catch {
      // Ignore
    }
    onSignOut();
  };

  const targetEmail = user?.email || "your registered email";

  return (
    <div className="login-viewport-wrapper">
      {/* Hand-drawn living storybook scenery */}
      <JungleEnvironment />

      <div className="jungle-login-main-container">
        <div className="jungle-login-card" style={{ maxWidth: 680 }}>
          {/* BRAND HEADER */}
          <div className="login-brand-header">
            <div className="login-compass-orb">
              <IconCompass size={40} className="login-compass-svg" />
            </div>
            <div className="login-brand-copy">
              <span className="login-eyebrow-pill">Account Security Checkpoint</span>
              <h1 className="login-brand-title">Verify Your Explorer Email</h1>
              <p className="login-brand-subtitle">
                One quick step before entering the Lost Canopy of Lexis
              </p>
            </div>
          </div>

          <div className="login-card-divider" />

          {/* SUCCESS BANNER */}
          {isSuccess && (
            <div className="login-banner banner-success">
              <IconCheck size={20} />
              <span>Email verified successfully! Preparing your expedition...</span>
            </div>
          )}

          {/* ERROR BANNER */}
          {errorMessage && (
            <div className="login-banner banner-error">
              <IconAlertTriangle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* INFO BANNER */}
          {infoMessage && (
            <div className="login-banner banner-success">
              <IconMail size={20} />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* MAIN VERIFICATION MESSAGE */}
          <div
            style={{
              background: "#fffdf0",
              border: "2px solid #ca8a04",
              borderRadius: "18px",
              padding: "20px 24px",
              marginBottom: "22px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#fef3c7",
                  border: "1.5px solid #d97706",
                  color: "#92400e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconMail size={18} />
              </div>
              <strong style={{ fontSize: "1.05rem", color: "#451a03" }}>
                Verification link dispatched to:
              </strong>
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#166534",
                background: "#ecfdf5",
                border: "1.5px solid #86efac",
                borderRadius: "10px",
                padding: "8px 14px",
                wordBreak: "break-all",
                marginBottom: "10px",
              }}
            >
              {targetEmail}
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#78350f", lineHeight: "1.4" }}>
              Please check your inbox (and junk or spam folders) for an email from DyslexiaQuest / Firebase. Click the verification link to confirm your account.
            </p>
          </div>

          {/* TWO-DEVICE EXPLANATION CARD */}
          <div
            style={{
              background: "#f8fafc",
              border: "1.5px solid #cbd5e1",
              borderRadius: "16px",
              padding: "16px 20px",
              marginBottom: "24px",
            }}
          >
            <strong style={{ display: "block", fontSize: "0.9rem", color: "#1e293b", marginBottom: "10px" }}>
              How Verification Works Across Devices:
            </strong>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ color: "#0284c7", marginTop: "2px", flexShrink: 0 }}>
                  <IconSmartphone size={18} />
                </div>
                <div style={{ fontSize: "0.84rem", color: "#334155", lineHeight: "1.4" }}>
                  <strong>Verify on phone or tablet:</strong> You can open your email and tap the verification link on your phone. The link confirms your email in Firebase without opening DyslexiaQuest on your mobile browser.
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ color: "#16a34a", marginTop: "2px", flexShrink: 0 }}>
                  <IconLaptop size={18} />
                </div>
                <div style={{ fontSize: "0.84rem", color: "#334155", lineHeight: "1.4" }}>
                  <strong>Continue on this laptop:</strong> Keep this screen open. As soon as you tap the link on your phone, this laptop will automatically detect your verified status and unlock your adventure!
                </div>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              type="button"
              className="login-primary-action-btn"
              disabled={checking || isSuccess}
              onClick={handleManualCheck}
            >
              {checking ? (
                <>
                  <span className="login-spinner-circle" />
                  <span>Checking Verification Status...</span>
                </>
              ) : isSuccess ? (
                <>
                  <IconCheck size={20} />
                  <span>Verified! Redirecting...</span>
                </>
              ) : (
                "I've Verified My Email (Check Status)"
              )}
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "6px",
              }}
            >
              <button
                type="button"
                className="login-btn-edit-email"
                disabled={resendCooldown > 0 || resending}
                onClick={handleResendEmail}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  opacity: resendCooldown > 0 ? 0.6 : 1,
                  cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                }}
              >
                {resendCooldown > 0 ? <IconClock size={16} /> : <IconMail size={16} />}
                <span>
                  {resending
                    ? "Sending email..."
                    : resendCooldown > 0
                    ? `Resend email in ${resendCooldown}s`
                    : "Resend Verification Email"}
                </span>
              </button>

              <button
                type="button"
                className="login-btn-edit-email"
                onClick={handleSignOutClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#b91c1c",
                }}
              >
                <IconLogout size={14} />
                <span>Sign in with another account</span>
              </button>
            </div>
          </div>

          {/* AUTO-POLLING STATUS BADGE */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "16px",
              borderTop: "1px dashed #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "0.82rem",
              color: "#64748b",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.2)",
              }}
            />
            <span>Listening for verification confirmation in background...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
