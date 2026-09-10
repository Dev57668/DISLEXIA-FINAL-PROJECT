import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Read Firebase environment variables from Vite
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || "").trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "").trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || "").trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "").trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "").trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || "").trim(),
};

/**
 * Diagnostic helper to detect if Firebase credentials are fully configured.
 */
export function getFirebaseConfigStatus() {
  const isKeySet = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "your-firebase-api-key" &&
    !firebaseConfig.apiKey.includes("your-")
  );

  const isProjectIdSet = Boolean(
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== "your-project-id" &&
    !firebaseConfig.projectId.includes("your-")
  );

  const missingVars = [];
  if (!isKeySet) missingVars.push("VITE_FIREBASE_API_KEY");
  if (!isProjectIdSet) missingVars.push("VITE_FIREBASE_PROJECT_ID");
  if (!firebaseConfig.authDomain || firebaseConfig.authDomain.includes("your-")) {
    missingVars.push("VITE_FIREBASE_AUTH_DOMAIN");
  }
  if (!firebaseConfig.appId || firebaseConfig.appId.includes("your-")) {
    missingVars.push("VITE_FIREBASE_APP_ID");
  }

  const isConfigured = isKeySet && isProjectIdSet && missingVars.length === 0;

  return {
    isConfigured,
    missingVars,
    message: isConfigured
      ? "Firebase credentials are fully configured."
      : `Missing Firebase credentials in .env.local: ${missingVars.join(", ")}`,
  };
}

export const isFirebaseConfigured = getFirebaseConfigStatus().isConfigured;

// Initialize Firebase safely
let firebaseApp = null;
let firebaseAuth = null;

try {
  if (getApps().length > 0) {
    firebaseApp = getApps()[0];
  } else if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("your-")) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    // Fallback dummy initialization with valid-shaped keys to avoid runtime reference errors
    firebaseApp = initializeApp({
      apiKey: "dummy-api-key-for-initialization",
      authDomain: "dummy.firebaseapp.com",
      projectId: "dummy-project",
      storageBucket: "dummy.appspot.com",
      messagingSenderId: "1234567890",
      appId: "1:1234567890:web:dummy",
    });
  }
  firebaseAuth = getAuth(firebaseApp);
} catch (e) {
  console.warn("Firebase initialization deferred: waiting for valid credentials in .env.local", e);
}

export const auth = firebaseAuth;

// Initialize Firestore safely
let firestoreDb = null;
try {
  if (firebaseApp) {
    firestoreDb = getFirestore(firebaseApp);
  }
} catch (e) {
  console.warn("Firestore initialization deferred: waiting for valid credentials in .env.local", e);
}

export const db = firestoreDb;

/**
 * Load user's cloud progress from Firestore under users/{userId}.
 * Returns null if no cloud document exists or if Firestore is offline/unconfigured.
 */
export async function loadUserCloudProgress(userId) {
  if (!firestoreDb || !userId) return null;
  try {
    const userRef = doc(firestoreDb, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn("Could not load cloud progress from Firestore (using local storage fallback):", err);
    return null;
  }
}

/**
 * Persist user's progress to Firestore under users/{userId}.
 * Merges scores, stagePerformance, activeProfile, and profiles.
 */
export async function saveUserCloudProgress(userId, progressData) {
  if (!firestoreDb || !userId || !progressData) return false;
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    // Offline mode: safely fallback without network timeout
    return false;
  }
  try {
    const userRef = doc(firestoreDb, "users", userId);
    const payload = {
      ...progressData,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn("Could not save progress to Firestore (saved to local storage):", err);
    return false;
  }
}

/**
 * Send Firebase email verification to the specified user or current user.
 * Verification confirms the email in Firebase without automatically launching or transferring
 * the game session to the device that opened the link.
 */
export async function sendVerificationEmail(targetUser = auth?.currentUser) {
  if (!targetUser) {
    throw new Error("No explorer session found to verify. Please sign in with your email first.");
  }
  return await sendEmailVerification(targetUser);
}

/**
 * Reload the current Firebase user record and return whether emailVerified is true.
 */
export async function checkEmailVerified(targetUser = auth?.currentUser) {
  if (!targetUser) return false;
  try {
    await targetUser.reload();
    return Boolean(targetUser.emailVerified);
  } catch (e) {
    console.warn("Failed to reload user verification status:", e);
    return Boolean(targetUser.emailVerified);
  }
}

/**
 * Register a new user with email and password, and dispatch verification email.
 */
export async function signUpWithEmail(email, password, displayName = "") {
  const status = getFirebaseConfigStatus();
  if (!status.isConfigured) {
    throw new Error(
      `Firebase is not yet configured. Please add your credentials to .env.local: ${status.missingVars.join(", ")}`
    );
  }

  const cleanEmail = String(email || "").trim().toLowerCase();
  const res = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  if (displayName && res.user) {
    try {
      await updateProfile(res.user, { displayName: displayName.trim() });
    } catch {
      // Profile display name update is secondary
    }
  }

  // Pre-seed an initial user profile in Firestore
  try {
    if (res.user?.uid) {
      await saveUserCloudProgress(res.user.uid, {
        displayName: displayName.trim(),
        email: cleanEmail,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.warn("Initial user doc save deferred:", e);
  }

  // Immediately send Firebase verification email
  try {
    await sendEmailVerification(res.user);
  } catch (e) {
    console.warn("Could not dispatch initial verification email:", e);
  }

  return res.user;
}

/**
 * Sign in existing user with email and password.
 */
export async function logInWithEmail(email, password) {
  const status = getFirebaseConfigStatus();
  if (!status.isConfigured) {
    throw new Error(
      `Firebase is not yet configured. Please add your credentials to .env.local: ${status.missingVars.join(", ")}`
    );
  }

  const cleanEmail = String(email || "").trim().toLowerCase();
  const res = await signInWithEmailAndPassword(auth, cleanEmail, password);
  if (res.user) {
    try {
      await res.user.reload();
    } catch (e) {
      console.warn("User reload failed during login:", e);
    }
  }
  return res.user;
}

/**
 * Sign out current user.
 */
export async function logOut() {
  if (!auth) return;
  return await firebaseSignOut(auth);
}

/**
 * Send password reset email.
 */
export async function resetPassword(email) {
  const status = getFirebaseConfigStatus();
  if (!status.isConfigured) {
    throw new Error(
      `Firebase is not yet configured. Please add your credentials to .env.local: ${status.missingVars.join(", ")}`
    );
  }

  const cleanEmail = String(email || "").trim().toLowerCase();
  return await sendPasswordResetEmail(auth, cleanEmail);
}

/**
 * Verify a password reset action code (oobCode).
 * Returns the explorer email address associated with the code if valid.
 */
export async function verifyResetCode(oobCode) {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  return await verifyPasswordResetCode(auth, oobCode);
}

/**
 * Confirm password reset using the action code (oobCode) and new password.
 */
export async function confirmReset(oobCode, newPassword) {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  return await confirmPasswordReset(auth, oobCode, newPassword);
}

/**
 * Subscribe to authentication state changes (logged in, logged out).
 */
export function subscribeToAuth(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
