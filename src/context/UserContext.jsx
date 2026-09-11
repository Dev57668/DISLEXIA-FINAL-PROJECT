import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import {
  getActiveStudent,
  getAllProfiles,
  saveProfile,
  getProfileScoresKey,
  createInitialScores
} from "../utils/profileManager";
import { saveUserCloudProgress } from "../lib/firebase";

export const UserContext = createContext(null);

export function UserProvider({ children, authUser = null }) {
  const [activeProfile, setActiveProfile] = useState(() => getActiveStudent());
  const [profiles, setProfiles] = useState(() => getAllProfiles());

  const activeProfileRef = useRef(activeProfile);
  activeProfileRef.current = activeProfile;

  // Initialize cumulative XP from localStorage for the active profile
  const [totalXp, setTotalXpState] = useState(() => {
    try {
      const student = getActiveStudent();
      const storageKey = getProfileScoresKey(student?.id);
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.totalXp === "number" && !isNaN(parsed.totalXp)) {
          return parsed.totalXp;
        }
        // Fallback: take max of existing stage scores if totalXp wasn't recorded
        const maxStage = Math.max(
          parsed.stage1 || 10,
          parsed.stage2 || 10,
          parsed.stage3 || 10,
          parsed.stage4 || 10,
          parsed.shapes || 10,
          10
        );
        return maxStage;
      }
      if (typeof student?.xp === "number" && !isNaN(student.xp)) {
        return Math.max(10, student.xp);
      }
    } catch (e) {
      console.warn("Could not load initial XP in UserContext:", e);
    }
    return 10;
  });

  const totalXpRef = useRef(totalXp);
  totalXpRef.current = totalXp;

  // Helper to persist XP across localStorage and cloud
  const persistXpValue = useCallback((newXp, student = activeProfileRef.current) => {
    if (!student?.id) return;
    try {
      const key = getProfileScoresKey(student.id);
      let existing = {};
      try {
        const raw = localStorage.getItem(key);
        if (raw) existing = JSON.parse(raw);
      } catch {}

      const updatedScores = {
        ...createInitialScores(),
        ...existing,
        totalXp: newXp,
        stage1: Math.max(existing.stage1 || 10, newXp),
        stage2: Math.max(existing.stage2 || 10, newXp),
        stage3: Math.max(existing.stage3 || 10, newXp),
        stage4: Math.max(existing.stage4 || 10, newXp),
        shapes: Math.max(existing.shapes || 10, newXp),
      };

      localStorage.setItem(key, JSON.stringify(updatedScores));

      // Update profile in storage list
      saveProfile({
        ...student,
        xp: newXp
      });

      // Synchronize to Firestore cloud if logged in
      if (authUser?.uid) {
        saveUserCloudProgress(authUser.uid, {
          scores: updatedScores,
          activeProfile: {
            studentName: student.studentName || "Junior Explorer",
            studentClass: student.studentClass || "1",
            xp: newXp
          }
        });
      }
    } catch (err) {
      console.warn("Error persisting cumulative XP:", err);
    }
  }, [authUser]);

  // Award XP cumulatively (e.g. +3 on correct answer)
  const awardXp = useCallback((amount = 3) => {
    setTotalXpState((prev) => {
      const next = Math.max(0, (Number(prev) || 0) + amount);
      totalXpRef.current = next;
      persistXpValue(next);
      return next;
    });
  }, [persistXpValue]);

  // Spend XP (e.g. -5 on hint usage)
  const spendXp = useCallback((amount = 5) => {
    let success = false;
    setTotalXpState((prev) => {
      const current = Number(prev) || 0;
      if (current < amount) {
        success = false;
        return current;
      }
      success = true;
      const next = Math.max(0, current - amount);
      totalXpRef.current = next;
      persistXpValue(next);
      return next;
    });
    return success;
  }, [persistXpValue]);

  // Set explicit XP value (ensuring persistence)
  const setTotalXp = useCallback((newXp) => {
    const val = Math.max(0, Number(newXp) || 10);
    setTotalXpState(val);
    totalXpRef.current = val;
    persistXpValue(val);
  }, [persistXpValue]);

  // Listen to profile switches to reload the respective student's XP
  const switchProfile = useCallback((profile) => {
    if (!profile) return;
    setActiveProfile(profile);
    activeProfileRef.current = profile;
    try {
      const key = getProfileScoresKey(profile.id);
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        const xp = parsed.totalXp ?? parsed.stage1 ?? profile.xp ?? 10;
        setTotalXpState(Math.max(10, Number(xp) || 10));
        return;
      }
      setTotalXpState(Math.max(10, Number(profile.xp) || 10));
    } catch {
      setTotalXpState(10);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        totalXp,
        awardXp,
        spendXp,
        setTotalXp,
        activeProfile,
        profiles,
        switchProfile,
        refreshProfiles: () => setProfiles(getAllProfiles()),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  return ctx;
}

export const useUser = useUserContext;
export default UserContext;
