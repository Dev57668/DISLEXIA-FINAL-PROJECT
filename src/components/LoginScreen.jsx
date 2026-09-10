import React, { useState, useEffect } from "react";
import JungleEnvironment from "./jungle/JungleEnvironment";
import {
  signUpWithEmail,
  logInWithEmail,
  resetPassword,
  verifyResetCode,
  confirmReset,
  getFirebaseConfigStatus,
} from "../lib/firebase";
import {
  IconCompass,
  IconUser,
  IconShieldCheck,
  IconStar,
  IconAward,
  IconCheck,
  IconCross,
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconAlertTriangle,
  IconArrowRight,
} from "./Icons";
import { playSynapsePulse, playHoverTick } from "../utils/soundEffects";

function formatFirebaseError(err) {
  if (!err) return "An unknown error occurred.";
  const msg = err.message || String(err);
  if (msg.includes("auth/invalid-credential") || msg.includes("auth/wrong-password") || msg.includes("auth/user-not-found")) {
    return "Invalid email address or password. Please check your credentials and try again.";
  }
  if (msg.includes("auth/email-already-in-use")) {
    return "An explorer account already exists with this email. Please sign in instead.";
  }
  if (msg.includes("auth/weak-password")) {
    return "Password should be at least 6 characters long.";
  }
  if (msg.includes("auth/invalid-email")) {
    return "Please enter a valid email address format.";
  }
  if (msg.includes("auth/too-many-requests")) {
    return "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.";
  }
  if (msg.includes("auth/invalid-action-code") || msg.includes("auth/expired-action-code")) {
    return "This password reset link is invalid or has expired. Please request a fresh reset link.";
  }
  if (msg.includes("auth/network-request-failed") || msg.includes("Failed to fetch") || msg.includes("network error") || (typeof navigator !== "undefined" && !navigator.onLine)) {
    return "Expedition server unreachable. Please check your internet connection and try again.";
  }
  const clean = msg.replace("Firebase: ", "").replace(/\(auth\/[^)]+\)\.?/, "").trim();
  return clean || "Expedition authentication could not complete. Please try again.";
}

export default function LoginScreen({
  onLoginSuccess = () => {},
  onNeedsVerification = () => {},
  onContinueAsGuest = () => {},
  onClose = null,
}) {
  const configStatus = getFirebaseConfigStatus();

  // Modes: "signin" | "signup" | "reset" | "resetDispatched" | "setNewPassword" | "passwordResetComplete"
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // OOB Code / Action link state
  const [resetCode, setResetCode] = useState(null);
  const [codeVerifying, setCodeVerifying] = useState(false);
  const [codeError, setCodeError] = useState("");

  // Detect Firebase password reset action link on mount
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlMode = searchParams.get("mode");
      const oobCode = searchParams.get("oobCode");

      if (oobCode && (urlMode === "resetPassword" || !urlMode)) {
        setResetCode(oobCode);
        setMode("setNewPassword");
        setCodeVerifying(true);
        verifyResetCode(oobCode)
          .then((verifiedEmail) => {
            if (verifiedEmail) {
              setEmail(verifiedEmail);
            }
          })
          .catch((err) => {
            console.warn("Invalid or expired reset code:", err);
            setCodeError(
              "This password reset link is invalid or has expired. Please request a fresh reset link."
            );
          })
          .finally(() => {
            setCodeVerifying(false);
          });
      }
    } catch (e) {
      console.warn("Could not read URL search parameters:", e);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const user = await signUpWithEmail(email, password, displayName);
        playSynapsePulse();
        // New users must verify email: transition directly to verification screen
        onNeedsVerification(user);
      } else if (mode === "signin") {
        const user = await logInWithEmail(email, password);
        if (user.emailVerified) {
          playSynapsePulse();
          setSuccessMessage(`Welcome back, ${user.displayName || user.email}!`);
          setTimeout(() => {
            onLoginSuccess(user);
          }, 500);
        } else {
          // Unverified user: keep in verification flow
          playHoverTick();
          onNeedsVerification(user);
        }
      } else if (mode === "reset") {
        await resetPassword(email);
        playSynapsePulse();
        setMode("resetDispatched");
      } else if (mode === "setNewPassword") {
        if (!newPassword || newPassword.length < 6) {
          throw new Error("Password should be at least 6 characters long.");
        }
        if (newPassword !== confirmNewPassword) {
          throw new Error("Passwords do not match. Please re-enter your new password.");
        }
        if (!resetCode) {
          throw new Error("Missing reset code. Please request a new password reset link.");
        }

        await confirmReset(resetCode, newPassword);
        playSynapsePulse();

        // Clean up URL parameters safely without triggering reload
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch {}

        // Reset passwords from state
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setResetCode(null);
        setMode("passwordResetComplete");
      }
    } catch (err) {
      setErrorMessage(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-viewport-wrapper">
      {/* Hand-drawn living storybook scenery */}
      <JungleEnvironment />

      <div className="jungle-login-main-container">
        <div className="jungle-login-card">
          {/* Header Close button if rendered in modal context */}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "#fef3c7",
                border: "2px solid #ca8a04",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#78350f",
              }}
              title="Close"
              aria-label="Close"
            >
              <IconCross size={16} />
            </button>
          )}

          {/* BRAND HEADER */}
          <div className="login-brand-header">
            <div className="login-compass-orb">
              <IconCompass size={40} className="login-compass-svg" />
            </div>
            <div className="login-brand-copy">
              <span className="login-eyebrow-pill">Canopy Expedition Basecamp</span>
              <h1 className="login-brand-title">DyslexiaQuest</h1>
              <p className="login-brand-subtitle">
                {mode === "signup"
                  ? "Create your explorer account to save progress and sync XP"
                  : mode === "reset"
                  ? "Reset your explorer account password"
                  : mode === "resetDispatched"
                  ? "Expedition reset instructions dispatched"
                  : mode === "setNewPassword"
                  ? "Set a new secure password for your explorer account"
                  : mode === "passwordResetComplete"
                  ? "Password updated successfully"
                  : "Sign in with your email to resume your quest"}
              </p>
            </div>
          </div>

          <div className="login-card-divider" />

          {/* CONFIGURATION HELPER IF KEYS ARE MISSING */}
          {!configStatus.isConfigured && (
            <div className="login-config-alert-card">
              <div className="config-alert-title-row">
                <span className="config-alert-icon">
                  <IconAlertTriangle size={18} />
                </span>
                <span>Firebase Credentials Not Yet Configured</span>
              </div>
              <p className="config-alert-text">
                To enable live email authentication, create or update your <code>.env.local</code> file in the project root with your Firebase Web App credentials:
              </p>
              <div className="config-missing-vars-box">
                <div className="missing-vars-title">Missing Environment Variables:</div>
                <ul className="missing-vars-list">
                  {configStatus.missingVars.map((v) => (
                    <li key={v}><code>{v}</code></li>
                  ))}
                </ul>
              </div>
              <p className="config-alert-subtext">
                You can obtain these from your <strong>Firebase Console &rarr; Project Settings &rarr; General &rarr; Your apps &rarr; Web app</strong>. In the meantime, you can explore the entire app using Guest Explorer mode!
              </p>
            </div>
          )}

          {/* NOTIFICATION BANNERS */}
          {errorMessage && (
            <div className="login-banner banner-error">
              <IconAlertTriangle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="login-banner banner-success">
              <IconCheck size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* VIEW: PASSWORD RESET EMAIL DISPATCHED */}
          {mode === "resetDispatched" && (
            <div style={{ textAlign: "center", padding: "12px 6px" }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  background: "#fef08a",
                  border: "3px solid #ca8a04",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#854d0e",
                  boxShadow: "0 4px 0 #ca8a04",
                }}
              >
                <IconMail size={32} />
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display, 'Outfit', 'Nunito', sans-serif)",
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  color: "#451a03",
                  marginBottom: "8px",
                }}
              >
                Reset Link Dispatched!
              </h2>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#78350f",
                  lineHeight: 1.5,
                  maxWidth: "420px",
                  margin: "0 auto 20px",
                }}
              >
                We dispatched password reset instructions to{" "}
                <strong style={{ color: "#166534", wordBreak: "break-all" }}>{email}</strong>.
                Please check your inbox (and spam folder) and click the link to set your new password.
              </p>

              <button
                type="button"
                className="login-primary-action-btn"
                style={{ width: "100%", marginBottom: "14px" }}
                onClick={() => {
                  playSynapsePulse();
                  setErrorMessage("");
                  setSuccessMessage("");
                  setMode("signin");
                }}
              >
                <span>Continue to Sign In</span>
                <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </button>

              <button
                type="button"
                className="login-btn-edit-email"
                style={{ display: "inline-block", fontSize: "0.9rem" }}
                onClick={() => {
                  playHoverTick();
                  setErrorMessage("");
                  setMode("reset");
                }}
              >
                Didn't get the email? Send another link
              </button>
            </div>
          )}

          {/* VIEW: PASSWORD RESET COMPLETED SUCCESSFULLY */}
          {mode === "passwordResetComplete" && (
            <div style={{ textAlign: "center", padding: "12px 6px" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  border: "3px solid #16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#15803d",
                  boxShadow: "0 4px 0 #15803d",
                }}
              >
                <IconShieldCheck size={36} />
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display, 'Outfit', 'Nunito', sans-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#14532d",
                  marginBottom: "8px",
                }}
              >
                Password Changed Successfully!
              </h2>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#166534",
                  lineHeight: 1.5,
                  maxWidth: "420px",
                  margin: "0 auto 20px",
                }}
              >
                Your explorer password has been updated. Please sign in with your new password to resume your DyslexiaQuest adventure.
              </p>

              <button
                type="button"
                className="login-primary-action-btn"
                style={{ width: "100%", marginBottom: "12px" }}
                onClick={() => {
                  playSynapsePulse();
                  setPassword("");
                  setNewPassword("");
                  setConfirmNewPassword("");
                  setErrorMessage("");
                  setSuccessMessage("Password reset successfully! Please sign in with your new password.");
                  setMode("signin");
                }}
              >
                <span>Continue to Sign In</span>
                <IconArrowRight size={18} style={{ marginLeft: "8px" }} />
              </button>
            </div>
          )}

          {/* VIEW: VERIFYING ACTION LINK ERROR */}
          {mode === "setNewPassword" && codeError && (
            <div style={{ textAlign: "center", padding: "16px 8px" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  background: "#fee2e2",
                  border: "3px solid #dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#991b1b",
                  boxShadow: "0 4px 0 #b91c1c",
                }}
              >
                <IconAlertTriangle size={30} />
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display, 'Outfit', 'Nunito', sans-serif)",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "#991b1b",
                  marginBottom: "8px",
                }}
              >
                Reset Link Expired or Invalid
              </h2>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#7f1d1d",
                  lineHeight: 1.5,
                  maxWidth: "400px",
                  margin: "0 auto 22px",
                }}
              >
                {codeError}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  type="button"
                  className="login-primary-action-btn"
                  style={{ width: "100%" }}
                  onClick={() => {
                    playSynapsePulse();
                    setCodeError("");
                    setErrorMessage("");
                    setMode("reset");
                  }}
                >
                  Request Fresh Reset Link
                </button>

                <button
                  type="button"
                  className="login-btn-edit-email"
                  style={{ padding: "8px" }}
                  onClick={() => {
                    playHoverTick();
                    setCodeError("");
                    setErrorMessage("");
                    setMode("signin");
                  }}
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          )}

          {/* VIEW: VERIFYING ACTION LINK SPINNER */}
          {mode === "setNewPassword" && codeVerifying && (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div className="login-spinner-circle" style={{ width: 36, height: 36, margin: "0 auto 14px", borderWidth: 4 }} />
              <p style={{ fontWeight: 700, color: "#78350f" }}>
                Verifying your expedition reset link...
              </p>
            </div>
          )}

          {/* FORM FOR SIGNIN, SIGNUP, RESET, AND SET-NEW-PASSWORD */}
          {mode !== "resetDispatched" && mode !== "passwordResetComplete" && !(mode === "setNewPassword" && (codeVerifying || codeError)) && (
            <form onSubmit={handleSubmit} className="login-form-layout">
              {mode === "signup" && (
                <div className="login-input-field-group">
                  <label className="login-input-label" htmlFor="login-student-name">Explorer / Student Name</label>
                  <div className="login-input-row-box">
                    <span className="login-input-addon-box" aria-hidden="true">
                      <IconUser size={18} />
                    </span>
                    <input
                      id="login-student-name"
                      type="text"
                      required
                      placeholder="e.g. Leo the Navigator"
                      className="login-text-input-clean"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Email field (read-only in setNewPassword mode) */}
              <div className="login-input-field-group">
                <label className="login-input-label" htmlFor="login-email">
                  {mode === "setNewPassword" ? "Explorer Account" : "Email Address"}
                </label>
                <div className="login-input-row-box">
                  <span className="login-input-addon-box" aria-hidden="true">
                    <IconMail size={18} />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    readOnly={mode === "setNewPassword"}
                    placeholder="explorer@example.com"
                    className="login-text-input-clean"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={mode === "setNewPassword" ? { background: "#fef3c7", cursor: "not-allowed" } : undefined}
                  />
                </div>
              </div>

              {/* Password field for signin and signup */}
              {(mode === "signin" || mode === "signup") && (
                <div className="login-input-field-group">
                  <label className="login-input-label" htmlFor="login-password">Password</label>
                  <div className="login-input-row-box">
                    <span className="login-input-addon-box" aria-hidden="true">
                      <IconLock size={18} />
                    </span>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      placeholder="At least 6 characters"
                      className="login-text-input-clean"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="login-password-toggle-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title={showPassword ? "Hide password" : "Show password"}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* New Password fields for setNewPassword mode */}
              {mode === "setNewPassword" && (
                <>
                  <div className="login-input-field-group">
                    <label className="login-input-label" htmlFor="login-new-password">New Password</label>
                    <div className="login-input-row-box">
                      <span className="login-input-addon-box" aria-hidden="true">
                        <IconLock size={18} />
                      </span>
                      <input
                        id="login-new-password"
                        type={showNewPassword ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="At least 6 characters"
                        className="login-text-input-clean"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="login-password-toggle-btn"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        title={showNewPassword ? "Hide password" : "Show password"}
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="login-input-field-group">
                    <label className="login-input-label" htmlFor="login-confirm-password">Confirm New Password</label>
                    <div className="login-input-row-box">
                      <span className="login-input-addon-box" aria-hidden="true">
                        <IconLock size={18} />
                      </span>
                      <input
                        id="login-confirm-password"
                        type={showNewPassword ? "text" : "password"}
                        required
                        minLength={6}
                        placeholder="Re-enter your new password"
                        className="login-text-input-clean"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="login-primary-action-btn"
                disabled={loading}
                onClick={() => playHoverTick()}
              >
                {loading ? (
                  <>
                    <span className="login-spinner-circle" />
                    <span>Connecting to Canopy...</span>
                  </>
                ) : mode === "signup" ? (
                  "Create Explorer Account"
                ) : mode === "reset" ? (
                  "Send Password Reset Email"
                ) : mode === "setNewPassword" ? (
                  "Update Explorer Password"
                ) : (
                  "Sign In to DyslexiaQuest"
                )}
              </button>

              {/* TOGGLE MODES */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "18px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {mode === "signin" && (
                  <>
                    <button
                      type="button"
                      className="login-btn-edit-email"
                      onClick={() => {
                        setErrorMessage("");
                        setSuccessMessage("");
                        setMode("signup");
                      }}
                    >
                      New explorer? Create an account
                    </button>
                    <button
                      type="button"
                      className="login-btn-edit-email"
                      onClick={() => {
                        setErrorMessage("");
                        setSuccessMessage("");
                        setMode("reset");
                      }}
                    >
                      Forgot password?
                    </button>
                  </>
                )}

                {mode === "signup" && (
                  <button
                    type="button"
                    className="login-btn-edit-email"
                    onClick={() => {
                      setErrorMessage("");
                      setSuccessMessage("");
                      setMode("signin");
                    }}
                  >
                    Already have an account? Sign in
                  </button>
                )}

                {mode === "reset" && (
                  <button
                    type="button"
                    className="login-btn-edit-email"
                    onClick={() => {
                      setErrorMessage("");
                      setSuccessMessage("");
                      setMode("signin");
                    }}
                  >
                    Remember your password? Back to Sign In
                  </button>
                )}

                {mode === "setNewPassword" && (
                  <button
                    type="button"
                    className="login-btn-edit-email"
                    onClick={() => {
                      setErrorMessage("");
                      setSuccessMessage("");
                      setMode("signin");
                    }}
                  >
                    Back to Sign In
                  </button>
                )}
              </div>

              {/* GUEST EXPLORER ESCAPE HATCH */}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => {
                    playSynapsePulse();
                    onContinueAsGuest();
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#92400e",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: "6px 12px",
                  }}
                >
                  Continue as Guest Explorer (No login required)
                </button>
              </div>
            </form>
          )}

          {/* 3 STORYBOOK TRUST BADGES */}
          <div className="login-features-grid">
            <div className="login-feature-item">
              <div className="feature-icon-circle">
                <IconStar size={18} />
              </div>
              <div>
                <strong>XP & Badge Sync</strong>
                <small>Keep track of stars across sessions</small>
              </div>
            </div>

            <div className="login-feature-item">
              <div className="feature-icon-circle">
                <IconShieldCheck size={18} />
              </div>
              <div>
                <strong>COPPA & Privacy</strong>
                <small>Secure explorer authentication</small>
              </div>
            </div>

            <div className="login-feature-item">
              <div className="feature-icon-circle">
                <IconAward size={18} />
              </div>
              <div>
                <strong>Explorer Passport</strong>
                <small>Track dyslexia diagnosis progression</small>
              </div>
            </div>
          </div>

          {/* Legal Links Footer */}
          <div style={{
            marginTop: "18px",
            textAlign: "center",
            fontSize: "0.82rem",
            color: "#92400e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px"
          }}>
            <a
              href="#privacy"
              style={{ color: "#78350f", textDecoration: "underline", fontWeight: 500 }}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "privacy";
              }}
            >
              Privacy Policy
            </a>
            <span style={{ opacity: 0.5 }}>•</span>
            <a
              href="#terms"
              style={{ color: "#78350f", textDecoration: "underline", fontWeight: 500 }}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "terms";
              }}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
