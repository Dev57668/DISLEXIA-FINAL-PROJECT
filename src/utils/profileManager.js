// =========================================================================
// DYSLEXIAQUEST: MULTI-PROFILE PERSISTENT STORAGE MANAGER
// Ensures all student profiles created by users are saved in localStorage
// and remain accessible across all screens and sessions.
// =========================================================================

const PROFILES_STORAGE_KEY = "dyslexia_student_profiles_list";
const ACTIVE_PROFILE_KEY = "dyslexia_student_profile";

export const DEFAULT_PROFILES = [
  {
    id: "profile_guest_explorer",
    studentName: "Junior Explorer",
    studentAge: "7",
    studentClass: "1",
    schoolName: "Canopy Academy",
    parentName: "Guardian",
    parentPhone: "",
    parentEmail: "",
    studentPhoto: "",
    audioData: "",
    createdAt: "2026-09-01T10:00:00.000Z",
    riskLevel: "New Explorer • Not Assessed Yet",
    riskColor: "#94a3b8",
    speed: "0%",
    spelling: "0%",
    recognition: "0%",
    phonological: "0%",
    streak: "0 Days",
    sessions: "0 Questions Completed",
    hours: "0.0 hrs",
    xp: 10,
    difficulty: "Calibrated for Class 1 introductory reading and cognitive assessment.",
    recommendedModule: "Module 01: Visual Perception & Orthography",
    recommendedStageId: 1
  }
];

const LEGACY_DEMO_IDS = [
  "profile_liam_parker",
  "profile_emma_watson",
  "profile_noah_chen",
  "profile_sophia_davis"
];

/**
 * Retrieve all profiles saved in localStorage.
 * Filters out legacy demo placeholder students so only genuine user profiles appear.
 */
export function getAllProfiles() {
  try {
    const rawList = localStorage.getItem(PROFILES_STORAGE_KEY);
    let profiles = rawList ? JSON.parse(rawList) : null;

    if (Array.isArray(profiles)) {
      // Clean out any legacy demo profiles that may be cached locally
      profiles = profiles.filter((p) => !LEGACY_DEMO_IDS.includes(p.id));
    }

    if (!Array.isArray(profiles) || profiles.length === 0) {
      profiles = [...DEFAULT_PROFILES];

      // Check if user had a single profile stored previously
      const legacyRaw = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (legacyRaw) {
        try {
          const legacy = JSON.parse(legacyRaw);
          if (legacy && legacy.studentName && !LEGACY_DEMO_IDS.includes(legacy.id)) {
            const exists = profiles.some(
              (p) => p.studentName.toLowerCase() === legacy.studentName.toLowerCase()
            );
            if (!exists) {
              profiles.unshift({
                id: legacy.id || `profile_${Date.now()}`,
                ...legacy,
                createdAt: legacy.savedAt || new Date().toISOString()
              });
            }
          }
        } catch (e) {
          console.warn("Could not parse legacy single profile:", e);
        }
      }

      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    }

    // Sanitize any custom profiles that had the old fake placeholder telemetry
    let modified = false;
    profiles.forEach((p) => {
      const isDefault = DEFAULT_PROFILES.some((d) => d.id === p.id);
      if (!isDefault) {
        if (
          p.speed === "+12%" ||
          p.spelling === "+10%" ||
          p.recognition === "+15%" ||
          p.phonological === "+8%" ||
          p.riskLevel === "Assessment in Progress" ||
          p.streak === "1 Day" ||
          p.sessions === "Session Initiated" ||
          p.speed === undefined
        ) {
          p.speed = "0%";
          p.spelling = "0%";
          p.recognition = "0%";
          p.phonological = "0%";
          p.streak = "0 Days";
          p.sessions = "0 Questions Completed";
          p.hours = "0.0 hrs";
          p.riskLevel = "New Explorer • Not Assessed Yet";
          p.riskColor = "#94a3b8";
          p.xp = (p.xp !== undefined && p.xp > 0) ? p.xp : 10;
          p.stars = (p.stars !== undefined && p.stars > 0) ? p.stars : 10;
          p.totalXp = (p.totalXp !== undefined && p.totalXp > 0) ? p.totalXp : 10;
          modified = true;
        }
      }
    });

    if (modified) {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
      const activeRaw = localStorage.getItem(ACTIVE_PROFILE_KEY);
      if (activeRaw) {
        try {
          const activeObj = JSON.parse(activeRaw);
          const updatedActive = profiles.find((p) => p.id === activeObj.id);
          if (updatedActive) {
            localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(updatedActive));
          }
        } catch {}
      }
    }

    return profiles;
  } catch (err) {
    console.error("Error loading profiles from localStorage:", err);
    return [...DEFAULT_PROFILES];
  }
}

/**
 * Get the currently active profile.
 */
export function getActiveProfile() {
  try {
    const rawActive = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (rawActive) {
      const parsed = JSON.parse(rawActive);
      if (parsed && parsed.studentName) return parsed;
    }
  } catch (err) {
    console.warn("Could not read active profile:", err);
  }

  const all = getAllProfiles();
  if (all.length > 0) {
    setActiveProfile(all[0].id);
    return all[0];
  }
  return null;
}

export const getActiveStudent = getActiveProfile;

export const getProfilePerformanceKey = (profileId) =>
  profileId ? `dyslexiaQuestPerformance_${profileId}` : "dyslexiaQuestPerformance";

export const getProfileProgressKey = (profileId) =>
  profileId ? `dyslexiaQuestProgress_${profileId}` : "dyslexiaQuestProgress";

export const getProfileScoresKey = (profileId) =>
  profileId ? `dyslexiaQuestScores_${profileId}` : "dyslexiaQuestScores";

export const createEmptyStagePerformance = () => ({
  stage1: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 },
  stage2: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 },
  stage3: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 },
  stage4: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 },
  shapes: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 },
  comprehension: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 }
});

export const createInitialScores = () => ({
  stage1: 10,
  stage2: 10,
  stage3: 10,
  stage4: 10,
  shapes: 10,
  comprehension: 10,
  totalXp: 10
});

/**
 * Save or update a student profile in the persistent multi-profile list.
 * Also sets it as the active profile.
 */
export function saveProfile(profileData) {
  try {
    const profiles = getAllProfiles();
    const id = profileData.id || `profile_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const now = new Date().toISOString();

    const fullProfile = {
      ...profileData,
      id,
      updatedAt: now,
      createdAt: profileData.createdAt || now,
      // Starting new profile: reset everything with 10 XP Stars and 0 performance
      xp: profileData.xp !== undefined ? profileData.xp : 10,
      stars: profileData.stars !== undefined ? profileData.stars : 10,
      totalXp: profileData.totalXp !== undefined ? profileData.totalXp : 10,
      speed: profileData.speed !== undefined ? profileData.speed : "0%",
      spelling: profileData.spelling !== undefined ? profileData.spelling : "0%",
      recognition: profileData.recognition !== undefined ? profileData.recognition : "0%",
      phonological: profileData.phonological !== undefined ? profileData.phonological : "0%",
      streak: profileData.streak !== undefined ? profileData.streak : "0 Days",
      sessions: profileData.sessions !== undefined ? profileData.sessions : "0 Questions Completed",
      hours: profileData.hours !== undefined ? profileData.hours : "0.0 hrs",
      riskLevel: profileData.riskLevel || "New Explorer • Not Assessed Yet",
      riskColor: profileData.riskColor || "#94a3b8",
      difficulty: profileData.difficulty || "Standard baseline. Complete expeditions to generate clinical telemetry.",
      recommendedModule: profileData.recommendedModule || "Module 01: Visual Perception & Direction",
      recommendedStageId: profileData.recommendedStageId || 1
    };

    const existingIndex = profiles.findIndex((p) => p.id === id);
    if (existingIndex >= 0) {
      profiles[existingIndex] = fullProfile;
    } else {
      profiles.unshift(fullProfile);
    }

    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(fullProfile));

    // Ensure isolated storage records exist for this profile
    const perfKey = getProfilePerformanceKey(id);
    if (!localStorage.getItem(perfKey)) {
      localStorage.setItem(perfKey, JSON.stringify(createEmptyStagePerformance()));
    }
    const scoresKey = getProfileScoresKey(id);
    if (!localStorage.getItem(scoresKey)) {
      localStorage.setItem(scoresKey, JSON.stringify(createInitialScores()));
    }

    return { active: fullProfile, all: profiles };
  } catch (err) {
    console.error("Error saving profile to persistent store:", err);
    return { active: profileData, all: getAllProfiles() };
  }
}

/**
 * Switch active profile by ID.
 */
export function setActiveProfile(profileId) {
  try {
    const profiles = getAllProfiles();
    const target = profiles.find((p) => p.id === profileId);
    if (target) {
      localStorage.setItem(ACTIVE_PROFILE_KEY, JSON.stringify(target));
      return target;
    }
  } catch (err) {
    console.error("Error setting active profile:", err);
  }
  return null;
}

/**
 * Delete a profile by ID.
 */
export function deleteProfile(profileId) {
  try {
    let profiles = getAllProfiles();
    profiles = profiles.filter((p) => p.id !== profileId);
    if (profiles.length === 0) {
      profiles = [...DEFAULT_PROFILES];
    }
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));

    const active = getActiveProfile();
    if (active && active.id === profileId) {
      setActiveProfile(profiles[0].id);
    }

    return profiles;
  } catch (err) {
    console.error("Error deleting profile:", err);
    return getAllProfiles();
  }
}
