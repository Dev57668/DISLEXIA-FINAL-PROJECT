import { getComprehensionLevelsForClass } from "./data/comprehensionBank";
import { CLASS_STAGE1_BANK } from "./data/stage1Bank";
import {
  CLASS1_STAGE2_BANK,
  CLASS2_STAGE2_BANK,
  CLASS3_STAGE2_BANK,
  CLASS4_STAGE2_BANK,
  CLASS5_STAGE2_BANK,
} from "./data/stage2Bank";
import {
  CLASS1_STAGE3_BANK,
  CLASS2_STAGE3_BANK,
  CLASS3_STAGE3_BANK,
  CLASS4_STAGE3_BANK,
  CLASS5_STAGE3_BANK,
} from "./data/stage3Bank";
import { mathQuestionBanks } from "./data/stage4Bank";
import { classShapesQuestionBank } from "./data/stage5Bank";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "./3d-website.css";
import "./jungle-theme.css";
import HomeScreen from "./components/HomeScreen";
import FreshWelcomePage from "./components/FreshWelcomePage";
import Module3Activity from "./components/Module3Activity";
import { useUserContext } from "./context/UserContext";

import TeacherDashboardView from "./components/TeacherDashboardView";
import LoginScreen from "./components/LoginScreen";
import EmailVerificationScreen from "./components/EmailVerificationScreen";
import LegalDocuments from "./components/LegalDocuments";
import NotFoundScreen from "./components/NotFoundScreen";
import OfflineBanner from "./components/OfflineBanner";
import { subscribeToAuth, logOut, loadUserCloudProgress, saveUserCloudProgress } from "./lib/firebase";
import {
  getAllProfiles,
  getActiveProfile,
  saveProfile as saveProfileToStore,
  setActiveProfile as setActiveProfileInStore,
  deleteProfile as deleteProfileFromStore,
  getProfilePerformanceKey,
  getProfileProgressKey,
  getProfileScoresKey,
  createEmptyStagePerformance,
  createInitialScores
} from "./utils/profileManager";
import UniversalAppHeader from "./components/UniversalAppHeader";
import { useLanguage } from "./i18n/LanguageContext";
import SpatialBackground3D from "./components/3d/SpatialBackground3D";
import ShapeViewer3D from "./components/3d/ShapeViewer3D";
import ParticleFX from "./components/3d/ParticleFX";
import { playSuccessChime, playLetterFlip } from "./utils/soundEffects";
import {
  IconBrain,
  IconEye,
  IconMic,
  IconEdit,
  IconCalculator,
  IconShapes,
  IconVolume,
  IconVolumeOff,
  IconPrinter,
  IconLightbulb,
  IconCheck,
  IconCross,
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconStar,
  IconAward,
  IconShieldCheck,
  IconTarget,
  IconBookOpen,
  IconPlay,
  IconRefresh,
  IconUser,
  IconLayers,
  IconGraduationCap,
  IconCompass,
  IconBackpack
} from "./components/Icons";
import BaronEagle from "./components/jungle/companions/BaronEagle";
import RioParrot from "./components/jungle/companions/RioParrot";
import PipMonkeyCompanion from "./components/jungle/companions/PipMonkeyCompanion";
import KojiPanda from "./components/jungle/companions/KojiPanda";
import SolChameleon from "./components/jungle/companions/SolChameleon";
import LunaOtter from "./components/jungle/companions/LunaOtter";
import LevelTransitionScreen, { GLADE_CONFIGS } from "./components/jungle/LevelTransitionScreen";

function renderCategoryIcon(key, size = 20) {
  switch (key) {
    case "eye":
    case "visual_dyslexia":
      return <IconEye size={size} />;
    case "mic":
    case "phonological_dyslexia":
      return <IconMic size={size} />;
    case "edit":
      return <IconEdit size={size} />;
    case "calculator":
    case "dyscalculia":
      return <IconCalculator size={size} />;
    case "shapes":
    case "spatial_geometry":
      return <IconShapes size={size} />;
    case "star":
    case "emergent_mastery":
      return <IconStar size={size} />;
    case "brain":
      return <IconBrain size={size} />;
    case "book":
      return <IconBookOpen size={size} />;
    case "target":
      return <IconTarget size={size} />;
    case "layers":
      return <IconLayers size={size} />;
    case "award":
      return <IconAward size={size} />;
    default:
      return <IconAward size={size} />;
  }
}

// mathQuestionBanks is imported from ./data/stage4Bank
/* =========================================================
   DYSLEXIA QUEST — CONSOLIDATED APP
   ========================================================= */
const createWavBlob = (samples, sampleRate) => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (offset, text) => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };

  const write16 = (offset, value) => {
    view.setUint16(offset, value, true);
  };

  const write32 = (offset, value) => {
    view.setUint32(offset, value, true);
  };

  writeString(0, "RIFF");
  write32(4, 36 + samples.length * 2);
  writeString(8, "WAVE");

  writeString(12, "fmt ");
  write32(16, 16);
  write16(20, 1);
  write16(22, 1);
  write32(24, sampleRate);
  write32(28, sampleRate * 2);
  write16(32, 2);
  write16(34, 16);

  writeString(36, "data");
  write32(40, samples.length * 2);

  let offset = 44;

  for (let i = 0; i < samples.length; i++) {
    let sample = samples[i];

    sample = Math.max(-1, Math.min(1, sample));

    const value =
      sample < 0
        ? sample * 0x8000
        : sample * 0x7fff;

    view.setInt16(offset, value, true);
    offset += 2;
  }

  return new Blob([buffer], {
    type: "audio/wav",
  });
};

/* =========================================================
   BLOB TO DATA URL
   DO NOT CHANGE - ORIGINAL AUDIO CODE
   ========================================================= */

const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
};
const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

/*
  Creates a completely fresh Stage 1 copy.
  - Questions are shuffled.
  - Answer options are shuffled.
  - The original stage1Levels data is never modified.
*/
const stage2Levels = [
  {
    id: 1,
    title: "WORDS",
    difficulty: "EASY",
    description: "READ SIMPLE WORDS ALOUD.",
    exercises: [
      {
        id: "s2w1",
        type: "word",
        text: "CAT",
      },
      {
        id: "s2w2",
        type: "word",
        text: "DOG",
      },
      {
        id: "s2w3",
        type: "word",
        text: "SUN",
      },
      {
        id: "s2w4",
        type: "word",
        text: "BOOK",
      },
      {
        id: "s2w5",
        type: "word",
        text: "TREE",
      },
      {
        id: "s2w6",
        type: "word",
        text: "FISH",
      },
      {
        id: "s2w7",
        type: "word",
        text: "BALL",
      },
      {
        id: "s2w8",
        type: "word",
        text: "HOUSE",
      },
      {
        id: "s2w9",
        type: "word",
        text: "SCHOOL",
      },
      {
        id: "s2w10",
        type: "word",
        text: "APPLE",
      },
    ],
  },

  {
    id: 2,
    title: "SENTENCES",
    difficulty: "MEDIUM",
    description: "READ SHORT SENTENCES ALOUD.",
    exercises: [
      {
        id: "s2s1",
        type: "sentence",
        text: "THE CAT IS BIG.",
      },
      {
        id: "s2s2",
        type: "sentence",
        text: "THE DOG CAN RUN.",
      },
      {
        id: "s2s3",
        type: "sentence",
        text: "I LIKE MY BOOK.",
      },
      {
        id: "s2s4",
        type: "sentence",
        text: "THE SUN IS HOT.",
      },
      {
        id: "s2s5",
        type: "sentence",
        text: "THE FISH CAN SWIM.",
      },
      {
        id: "s2s6",
        type: "sentence",
        text: "I SEE A RED BALL.",
      },
      {
        id: "s2s7",
        type: "sentence",
        text: "THE CAT SAT ON THE MAT.",
      },
      {
        id: "s2s8",
        type: "sentence",
        text: "I LIKE TO READ BOOKS.",
      },
      {
        id: "s2s9",
        type: "sentence",
        text: "THE BOY IS IN THE HOUSE.",
      },
      {
        id: "s2s10",
        type: "sentence",
        text: "THE GIRL HAS A BLUE BAG.",
      },
    ],
  },

  {
    id: 3,
    title: "PARAGRAPHS",
    difficulty: "DIFFICULT",
    description: "READ A SHORT PARAGRAPH ALOUD.",
    exercises: [
      {
        id: "s2p1",
        type: "paragraph",
        text:
          "THE CAT SAT ON THE MAT. IT WAS WARM AND SUNNY. THE CAT CLOSED ITS EYES AND RESTED.",
      },
      {
        id: "s2p2",
        type: "paragraph",
        text:
          "SAM HAS A LITTLE DOG. THE DOG LIKES TO RUN IN THE PARK. EVERY DAY, SAM TAKES THE DOG OUTSIDE.",
      },
      {
        id: "s2p3",
        type: "paragraph",
        text:
          "MIA LIKES TO READ BOOKS. SHE READS A LITTLE EVERY DAY. READING HELPS HER LEARN NEW WORDS.",
      },
      {
        id: "s2p4",
        type: "paragraph",
        text:
          "THE SUN WAS SHINING IN THE SKY. THE CHILDREN WENT OUTSIDE TO PLAY. THEY PLAYED WITH A BALL.",
      },
      {
        id: "s2p5",
        type: "paragraph",
        text:
          "TOM WENT TO SCHOOL IN THE MORNING. HE CARRIED HIS BLUE BAG. INSIDE HIS BAG WAS HIS FAVOURITE BOOK.",
      },
      {
        id: "s2p6",
        type: "paragraph",
        text:
          "ANNA LOVES TO DRAW PICTURES. SHE USES MANY COLOURS IN HER NOTEBOOK. AFTER SCHOOL, SHE SHOWS HER DRAWINGS TO HER FRIENDS.",
      },
      {
        id: "s2p7",
        type: "paragraph",
        text:
          "THE FAMILY WENT TO THE PARK ON SUNDAY. THEY PLAYED GAMES AND ATE LUNCH UNDER A BIG TREE. EVERYONE HAD A HAPPY DAY.",
      },
      {
        id: "s2p8",
        type: "paragraph",
        text:
          "RAHUL FOUND A SMALL KITE IN HIS ROOM. HE TOOK IT OUTSIDE AND WAITED FOR THE WIND. SOON THE KITE WAS FLYING HIGH IN THE SKY.",
      },
      {
        id: "s2p9",
        type: "paragraph",
        text:
          "MEENA WAKES UP EARLY EACH MORNING. SHE GETS READY FOR SCHOOL AND PACKS HER BOOKS. SHE ALWAYS CHECKS HER BAG BEFORE LEAVING HOME.",
      },
      {
        id: "s2p10",
        type: "paragraph",
        text:
          "READING CAN HELP CHILDREN LEARN NEW WORDS. WHEN WE READ SLOWLY AND CAREFULLY, WE CAN UNDERSTAND THE STORY BETTER AND REMEMBER MORE.",
      },
    ],
  },
];



// Stage 2 Question Banks are imported from ./data/stage2Bank

const getNormalizedClassNumber = (rawClass) => {
  if (typeof rawClass === "number" && rawClass >= 1 && rawClass <= 5) return rawClass;
  const match = String(rawClass || "").match(/[1-5]/);
  return match ? Number(match[0]) : 1;
};

const createShuffledStage2 = (classNumber = 1) => {
  const classKey = String(getNormalizedClassNumber(classNumber));

  const sourceLevels =
    classKey === "1"
      ? CLASS1_STAGE2_BANK
      : classKey === "2"
        ? CLASS2_STAGE2_BANK
        : classKey === "3"
          ? CLASS3_STAGE2_BANK
          : classKey === "4"
            ? CLASS4_STAGE2_BANK
            : CLASS5_STAGE2_BANK;

  return sourceLevels.map((level) => ({
    ...level,
    exercises: shuffleArray(
      level.exercises.map((ex, idx) => ({
        ...ex,
        id: ex.id || `c${classKey}-s2-l${level.id}-q${idx + 1}`,
        options: ex.options ? shuffleArray([...new Set(ex.options)]) : ex.options,
      }))
    ),
  }));
};

/* =========================================================
   NORMALISE SPEECH FOR COMPARISON
   ========================================================= */

const normaliseSpeech = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

/* =========================================================
   DIFFICULTY LABEL FORMATTER
   ========================================================= */

const formatDifficulty = (difficulty) => {
  if (!difficulty) return "Easy";
  const str = String(difficulty).trim().toLowerCase();
  if (str.includes("easy")) return "Easy";
  if (str.includes("med")) return "Medium";
  if (str.includes("hard") || str.includes("diffic")) return "Hard";
  if (str.includes("found")) return "Foundation";
  if (str.includes("basic")) return "Basic";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/* =========================================================
   READING MATCH SCORE
   ========================================================= */

const calculateReadingAccuracy = (
  expected,
  spoken
) => {
  const expectedWords =
    normaliseSpeech(expected)
      .split(" ")
      .filter(Boolean);

  const spokenWords =
    normaliseSpeech(spoken)
      .split(" ")
      .filter(Boolean);

  if (!expectedWords.length) {
    return 0;
  }

  let matches = 0;

  expectedWords.forEach(
    (word, index) => {
      if (
        spokenWords[index] === word
      ) {
        matches++;
      }
    }
  );

  return Math.round(
    (matches /
      expectedWords.length) *
    100
  );
};
const ALLOWED_CLASSES = ["1", "2", "3", "4", "5"];

const CLASS_INFO = {
  1: {
    name: "CLASS 1",
    difficulty: "FOUNDATION",
  },
  2: {
    name: "CLASS 2",
    difficulty: "BASIC",
  },
  3: {
    name: "CLASS 3",
    difficulty: "INTERMEDIATE",
  },
  4: {
    name: "CLASS 4",
    difficulty: "ADVANCED",
  },
  5: {
    name: "CLASS 5",
    difficulty: "HIGHER",
  },
};
/* =========================================================
   CLASS-WISE LEARNING QUESTION BANK
   CLASS 1 TO CLASS 5
   3 STAGES × 3 LEVELS × 10 QUESTIONS
   ========================================================= */


/* =========================================================
   CLASS-WISE STAGE 1 QUESTION BANK
   5 CLASSES × 3 LEVELS × 9 QUESTIONS = 135 QUESTIONS

   IMPORTANT:
   - STAGE 1 IS VISUAL ONLY.
   - NO QUESTION AUDIO / READ-ALOUD IS USED IN STAGE 1.
   - Difficulty increases from Level 1 → Level 3.
   ========================================================= */
// Stage 1 & Stage 3 Question Banks are imported from ./data/stage1Bank and ./data/stage3Bank

const getStage1LevelsForClass = (classNumber) => {
  const classKey = String(getNormalizedClassNumber(classNumber));
  const levels =
    CLASS_STAGE1_BANK[classKey] ||
    CLASS_STAGE1_BANK["1"];

  return levels.map((level) => ({
    ...level,
    exercises: shuffleArray(
      level.exercises.map((exercise, index) => ({
        ...exercise,
        id: exercise.id || `c${classKey}l${level.id}q${index + 1}`,
        options: shuffleArray([
          ...new Set(exercise.options || []),
        ]),
      }))
    ),
  }));
};

const createShuffledStage1 = (classNumber) => {
  return getStage1LevelsForClass(classNumber);
};

const getStage3LevelsForClass = (classNumber = 1) => {
  const classKey = getNormalizedClassNumber(classNumber);
  const sourceBank =
    classKey === 5
      ? CLASS5_STAGE3_BANK
      : classKey === 4
        ? CLASS4_STAGE3_BANK
        : classKey === 3
          ? CLASS3_STAGE3_BANK
          : classKey === 2
            ? CLASS2_STAGE3_BANK
            : CLASS1_STAGE3_BANK;

  return sourceBank.map((level) => ({
    ...level,
    exercises: shuffleArray(
      level.exercises.map((ex, idx) => ({
        ...ex,
        id: ex.id || `c${classKey}-s3-l${level.id}-q${idx + 1}`,
        options: ex.options ? shuffleArray([...new Set(ex.options)]) : ex.options,
      }))
    ),
  }));
};

const getStage4LevelsForClass = (classNumber) => {
  const classKey = getNormalizedClassNumber(classNumber);
  const classBank = mathQuestionBanks[classKey] || mathQuestionBanks[1];

  const levelConfigs = [
    { id: 1, title: "LEVEL 1", difficulty: "EASY", description: "SOLVE SIMPLE MATHS PROBLEMS." },
    { id: 2, title: "LEVEL 2", difficulty: "MEDIUM", description: "SOLVE INTERMEDIATE MATHS PROBLEMS." },
    { id: 3, title: "LEVEL 3", difficulty: "HARD", description: "SOLVE ADVANCED MATHS PROBLEMS." },
  ];

  return levelConfigs.map((cfg) => {
    const rawQuestions = classBank[cfg.id] || [];
    const questionsWithIds = rawQuestions.map((q, idx) => ({
      ...q,
      id: q.id || `c${classKey}-m-l${cfg.id}-q${idx + 1}`,
      options: shuffleArray([...(q.options || [])]),
    }));
    return {
      ...cfg,
      exercises: shuffleArray(questionsWithIds),
    };
  });
};

const createShuffledStage4 = (classNumber) => {
  return getStage4LevelsForClass(classNumber);
};

/* =========================================================
   SHAPES VECTOR ENGINE (SVG)
   ========================================================= */

const ShapeVisual = ({ shape, size = 90 }) => {
  const norm = String(shape || "").toLowerCase().trim();

  switch (norm) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))" }}>
          <defs>
            <linearGradient id="g-circle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#g-circle)" stroke="#1d4ed8" strokeWidth="4" />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3))" }}>
          <defs>
            <linearGradient id="g-square" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="70" height="70" rx="12" fill="url(#g-square)" stroke="#047857" strokeWidth="4" />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(245, 158, 11, 0.3))" }}>
          <defs>
            <linearGradient id="g-triangle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <polygon points="50,12 88,85 12,85" fill="url(#g-triangle)" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "rectangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(139, 92, 246, 0.3))" }}>
          <defs>
            <linearGradient id="g-rectangle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect x="10" y="24" width="80" height="52" rx="10" fill="url(#g-rectangle)" stroke="#6d28d9" strokeWidth="4" />
        </svg>
      );
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(234, 179, 8, 0.35))" }}>
          <defs>
            <linearGradient id="g-star" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" fill="url(#g-star)" stroke="#ca8a04" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );
    case "heart":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(236, 72, 153, 0.35))" }}>
          <defs>
            <linearGradient id="g-heart" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <path d="M50,82 C50,82 16,54 16,34 C16,20 28,12 39,18 C45,21 48,26 50,30 C52,26 55,21 61,18 C72,12 84,20 84,34 C84,54 50,82 50,82 Z" fill="url(#g-heart)" stroke="#be185d" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(6, 182, 212, 0.3))" }}>
          <defs>
            <linearGradient id="g-diamond" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <polygon points="50,10 88,50 50,90 12,50" fill="url(#g-diamond)" stroke="#0e7490" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "oval":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(99, 102, 241, 0.3))" }}>
          <defs>
            <linearGradient id="g-oval" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="42" ry="28" fill="url(#g-oval)" stroke="#4338ca" strokeWidth="4" />
        </svg>
      );
    case "pentagon":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(249, 115, 22, 0.3))" }}>
          <defs>
            <linearGradient id="g-pentagon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <polygon points="50,12 90,41 75,88 25,88 10,41" fill="url(#g-pentagon)" stroke="#c2410c" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(20, 184, 166, 0.3))" }}>
          <defs>
            <linearGradient id="g-hexagon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
          <polygon points="50,12 86,31 86,69 50,88 14,69 14,31" fill="url(#g-hexagon)" stroke="#0f766e" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "octagon":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 4px 6px rgba(239, 68, 68, 0.3))" }}>
          <defs>
            <linearGradient id="g-octagon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="url(#g-octagon)" stroke="#991b1b" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "cube":
      return <ShapeViewer3D shape="cube" color="#38bdf8" height={160} />;
    case "sphere":
      return <ShapeViewer3D shape="sphere" color="#818cf8" height={160} />;
    case "cylinder":
      return <ShapeViewer3D shape="cylinder" color="#f97316" height={160} />;
    case "cone":
      return <ShapeViewer3D shape="cone" color="#ec4899" height={160} />;
    case "pyramid":
      return <ShapeViewer3D shape="pyramid" color="#f59e0b" height={160} />;
    case "prism":
      return <ShapeViewer3D shape="prism" color="#10b981" height={160} />;
    default:
      return <IconShapes size={size} />;
  }
};

// classShapesQuestionBank is imported from ./data/stage5Bank

const getShapesLevelsForClass = (classNumber) => {
  const classKey = getNormalizedClassNumber(classNumber);
  const classBank = classShapesQuestionBank[classKey] || classShapesQuestionBank[1];

  const levelConfigs = [
    { id: 1, title: "LEVEL 1 — EASY", difficulty: "EASY", description: "EXPLORE AND IDENTIFY SHAPES." },
    { id: 2, title: "LEVEL 2 — MEDIUM", difficulty: "MEDIUM", description: "DISCOVER SIDES, CORNERS & REAL OBJECTS." },
  ];

  return levelConfigs.map((cfg) => {
    const rawQuestions = classBank[cfg.id] || [];
    const questionsWithIds = rawQuestions.map((q, idx) => ({
      ...q,
      id: q.id || `c${classKey}-sh-l${cfg.id}-q${idx + 1}`,
      options: shuffleArray([...(q.options || [])]),
    }));
    return {
      ...cfg,
      exercises: shuffleArray(questionsWithIds),
    };
  });
};

const createShuffledShapes = (classNumber) => {
  return getShapesLevelsForClass(classNumber);
};

const isValidPhoneNumber = (phone) => {
  return /^\d{10}$/.test(phone);
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
};


/* =======================================================
   DYSLEXIA DIAGNOSTIC ENGINE & CURATED RECOMMENDATIONS
   ======================================================= */

const DYSLEXIA_RECOMMENDATIONS = {
  visual_dyslexia: {
    typeId: "visual_dyslexia",
    name: "Visual / Surface Dyslexic Tendency",
    tag: "SURFACE & ORTHOGRAPHIC PROCESSING",
    badge: "eye",
    badgeColor: "#2563eb",
    bgColor: "#eff6ff",
    borderColor: "#93c5fd",
    strengths: [
      "Vivid three-dimensional spatial imagination",
      "Intuitive big-picture conceptual understanding",
      "Creative problem solving and holistic thinking"
    ],
    growthAreas: [
      "Letter orientation & directionality (reversing b/d, p/q)",
      "Visual orthographic word recognition (words with irregular spelling)",
      "Visual line tracking fatigue across crowded text"
    ],
    explanation:
      "Your child demonstrates strong spatial and conceptual thinking, but experienced hesitation or errors with visual letter orientation and shape symmetry. In surface/visual dyslexia, the brain naturally examines 2D letters as 3D objects, which can cause mirror reversals. Multi-sensory tactile tracing and visual anchor rules help lock in correct orientation.",
    videos: [
      {
        id: "v1",
        title: "How to Remember the Difference Between b and d",
        channel: "Nessy Learning",
        duration: "3 mins",
        description: "The famous 'bed' hand trick and animated story that permanently fixes b and d confusion for dyslexic kids.",
        url: "https://www.youtube.com/watch?v=WP1blvh1Z2Q",
        thumbnailColor: "#1e40af"
      },
      {
        id: "v2",
        title: "What is Dyslexia? (Animated Explanation)",
        channel: "TED-Ed",
        duration: "4 mins",
        description: "A fun, inspiring animation showing how dyslexic brains are uniquely wired for creativity and spatial gifts.",
        url: "https://www.youtube.com/watch?v=zafiGBrFkRM",
        thumbnailColor: "#b91c1c"
      },
      {
        id: "v3",
        title: "Visual Memory & Spelling Strategies for Dyslexia",
        channel: "BBC Teach",
        duration: "5 mins",
        description: "Animated mnemonic strategies to visualize word shapes and overcome letter flipping.",
        url: "https://www.youtube.com/watch?v=11r79zGwpQ4",
        thumbnailColor: "#047857"
      }
    ],
    exercises: [
      {
        title: "Sand & Shaving Cream Finger Tracing",
        icon: "edit",
        steps: [
          "Spread kinetic sand or shaving cream on a shallow baking tray.",
          "Have your child trace confusing letters (like 'b' and 'd') using their index finger while reciting the letter's sound aloud.",
          "Tactile sensory feedback permanently imprints correct letter motor patterns in the brain."
        ]
      },
      {
        title: "The 'BED' Two-Hand Visual Anchor",
        icon: "shapes",
        steps: [
          "Have your child make two fists with both thumbs pointing up.",
          "Bring the knuckles together: the left hand naturally forms the letter 'b', and the right forms 'd' (spelling B-E-D).",
          "Whenever unsure, making this quick hand gesture provides an instant physical anchor."
        ]
      },
      {
        title: "Colored Highlighting Ruler / Reading Window",
        icon: "eye",
        steps: [
          "Place a yellow or soft blue transparent reading strip over a line of text.",
          "This isolates one sentence at a time, preventing words from appearing to 'drift' or jump lines."
        ]
      }
    ],
    books: [
      "Hank Zipzer: The World's Greatest Underachiever by Henry Winkler",
      "Here's Hank: Bookmarks Are People Too! by Henry Winkler & Lin Oliver",
      "Percy Jackson & The Olympians: The Lightning Thief by Rick Riordan"
    ],
    accommodations: [
      "Use OpenDyslexic or Atkinson Hyperlegible fonts with generous line spacing (1.5x).",
      "Allow tactile tools and scrap paper for visual anchoring before answering.",
      "Praise creative and spatial problem-solving to protect learning confidence."
    ]
  },

  phonological_dyslexia: {
    typeId: "phonological_dyslexia",
    name: "Phonological / Auditory Dyslexic Tendency",
    tag: "PHONEMIC AWARENESS & SOUND BLENDING",
    badge: "mic",
    badgeColor: "#7c3aed",
    bgColor: "#f5f3ff",
    borderColor: "#c4b5fd",
    strengths: [
      "Rich listening vocabulary and verbal comprehension",
      "Expressive oral storytelling and discussions",
      "High emotional intelligence and empathy"
    ],
    growthAreas: [
      "Isolating middle vowel sounds (e.g. C_T, D_G)",
      "Blending individual phonemes into words smoothly",
      "Rhyming word family recognition and phonetic spelling"
    ],
    explanation:
      "The student demonstrates bright comprehension, but shows difficulty segmenting and blending individual speech sounds (phonemes) into written words. Phonological dyslexia is the most common form of reading difference. Using rhythmic clapping, physical syllable tapping, and multi-sensory sound-letter games accelerates phonetic mastery.",
    videos: [
      {
        id: "v4",
        title: "Phonics Blending Made Easy - Letters & Word Magic",
        channel: "Alphablocks Official (BBC)",
        duration: "5 mins",
        description: "Fun animated blocks hold hands to teach how phonemes combine into words step-by-step.",
        url: "https://www.youtube.com/watch?v=F3G8a9tF684",
        thumbnailColor: "#7c3aed"
      },
      {
        id: "v5",
        title: "Hairy Phonics - Magic E & Long Vowel Sounds",
        channel: "Nessy Learning",
        duration: "4 mins",
        description: "Hairy monsters show how the silent 'e' at the end makes the vowel say its own name.",
        url: "https://www.youtube.com/watch?v=b4O5u_V70oA",
        thumbnailColor: "#c026d3"
      },
      {
        id: "v6",
        title: "Rhyming Words for Kids - Fun Phonics Animation",
        channel: "Kids Academy",
        duration: "4 mins",
        description: "Animated cartoon lesson showing word families (cat/hat/bat, tree/bee) with audio cues.",
        url: "https://www.youtube.com/watch?v=cSPmAByNmR8",
        thumbnailColor: "#ea580c"
      }
    ],
    exercises: [
      {
        title: "Finger Tap & Blend (Orton-Gillingham)",
        icon: "mic",
        steps: [
          "Tap the thumb to the index finger for sound 1 (e.g., /c/), middle finger for sound 2 (/a/), and ring finger for sound 3 (/t/).",
          "Sweep all fingers across the palm in a smooth motion to say the complete word: 'CAT!'.",
          "Translating abstract sounds into physical finger motions builds automaticity."
        ]
      },
      {
        title: "Syllable Clapping & Stomping Rhythm Game",
        icon: "volume",
        steps: [
          "Say a word together aloud and clap hands or stomp feet on each beat (e.g., wa-ter-mel-on = 4 claps).",
          "Helps children feel where words break apart into smaller manageable chunks."
        ]
      },
      {
        title: "Mirror Mouth Watching",
        icon: "book",
        steps: [
          "Hold a pocket mirror and watch how the lips, teeth, and tongue move when pronouncing tricky sounds (like 'th', 'ch', 'sh', 'f').",
          "Seeing mouth shapes gives visual confirmation of phonetic differences."
        ]
      }
    ],
    books: [
      "Dog Man series by Dav Pilkey (high picture support, comic format)",
      "InvestiGators by John Patrick Green (full-color graphic novel)",
      "Frog and Toad Are Friends by Arnold Lobel"
    ],
    accommodations: [
      "Use text-to-speech audio read-aloud buttons whenever available.",
      "Break long reading tasks into short 5-minute sprints.",
      "Never ask the child to read unfamiliar text aloud unexpectedly in front of peers."
    ]
  },

  dyscalculia: {
    typeId: "dyscalculia",
    name: "Dyscalculia / Math Dyslexic Tendency",
    tag: "NUMBER SENSE & ARITHMETIC SEQUENCING",
    badge: "calculator",
    badgeColor: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
    strengths: [
      "Intuitive practical logic and spatial reasoning",
      "Good comprehension of cause-and-effect concepts",
      "Hands-on architectural and visual-artistic abilities"
    ],
    growthAreas: [
      "Rapid retrieval of addition/subtraction math facts",
      "Number sequence tracking (counting backwards, patterns)",
      "Distinguishing mathematical operator symbols (+, -, ×, ÷)"
    ],
    explanation:
      "The student demonstrates good conceptual reasoning, but struggles with automatic mental calculations and number sequence jumps. Math dyslexia (dyscalculia) affects how the brain stores and retrieves abstract numbers. Using physical objects, visual number lines, and color-coded symbols makes math tangible and stress-free.",
    videos: [
      {
        id: "v7",
        title: "How Addition & Grouping Works Step-by-Step",
        channel: "Numberblocks Official",
        duration: "5 mins",
        description: "Living number blocks stack and combine visually, making quantity relationships instantly clear.",
        url: "https://www.youtube.com/watch?v=t89r5F1i378",
        thumbnailColor: "#b45309"
      },
      {
        id: "v8",
        title: "Basic Addition & Subtraction Visualized",
        channel: "Math Antics",
        duration: "6 mins",
        description: "Humorous, clear animation demonstrating place value columns and regrouping with ease.",
        url: "https://www.youtube.com/watch?v=mAvuom42NyY",
        thumbnailColor: "#0284c7"
      },
      {
        id: "v9",
        title: "Skip Counting & Number Line Patterns",
        channel: "Khan Academy Kids",
        duration: "4 mins",
        description: "Friendly animal animations demonstrating jumps of 2s, 5s, and 10s on a colorful number line.",
        url: "https://www.youtube.com/watch?v=V96_Pa4Bw5A",
        thumbnailColor: "#15803d"
      }
    ],
    exercises: [
      {
        title: "The Living Floor Number Line",
        icon: "calculator",
        steps: [
          "Use painter's tape to make a number line 0 to 20 on the floor.",
          "For addition (e.g. 5 + 3), have the child stand on 5 and jump forward 3 steps to land on 8.",
          "For subtraction (8 - 3), jump backward. Physical movement anchors number magnitude."
        ]
      },
      {
        title: "Lego Brick Ten-Frames",
        icon: "shapes",
        steps: [
          "Use 2x4 Lego bricks or egg carton cups to group items in sets of 10.",
          "Counting in physical groups of ten demystifies place value and multi-digit math."
        ]
      },
      {
        title: "Color-Coded Operation Highlighting",
        icon: "target",
        steps: [
          "Highlight '+' in green (go forward) and '-' in red (stop/take away).",
          "Color-coding prevents operator confusion under timed or visual pressure."
        ]
      }
    ],
    books: [
      "Sir Cumference and the First Round Table by Cindy Neuschwander",
      "Bedtime Math: A Fun Excuse to Stay Up Late by Laura Overdeck",
      "The Boy Who Loved Math: The Improbable Life of Paul Erdös"
    ],
    accommodations: [
      "Provide access to a visual reference card with multiplication/number line grids.",
      "Allow using scratch paper, fingers, or tokens without penalty.",
      "Focus on understanding the concept rather than timed computational speed."
    ]
  },

  spatial_geometry: {
    typeId: "spatial_geometry",
    name: "Visual-Spatial & Directional Processing Profile",
    tag: "2D/3D GEOMETRY & DIRECTIONAL SENSE",
    badge: "shapes",
    badgeColor: "#059669",
    bgColor: "#ecfdf5",
    borderColor: "#a7f3d0",
    strengths: [
      "High natural curiosity about how objects are constructed",
      "Creative artistic and building talents",
      "Strong memory for real-world landmarks and places"
    ],
    growthAreas: [
      "Distinguishing 2D flat shapes vs 3D solid volumes",
      "Counting vertices, edges, and faces without losing track",
      "Left/right and rotational orientation"
    ],
    explanation:
      "The student is an imaginative, hands-on visual learner. They occasionally confuse terminology like faces, edges, and corners when looking at flat 2D drawings of 3D objects. Hands-on modeling with playdough, toothpicks, and real-world household items makes geometric concepts concrete.",
    videos: [
      {
        id: "v10",
        title: "Shapes Song & 3D Solids Adventure",
        channel: "StoryBots (Netflix Jr)",
        duration: "3 mins",
        description: "Catchy animated musical journey exploring cubes, spheres, cones, and cylinders in nature.",
        url: "https://www.youtube.com/watch?v=8bO_iA-R-Xg",
        thumbnailColor: "#059669"
      },
      {
        id: "v11",
        title: "2D & 3D Shapes Mystery - Faces, Edges & Corners",
        channel: "Scratch Garden",
        duration: "4 mins",
        description: "Funny cartoon characters demonstrate the difference between flat shapes and 3D solids.",
        url: "https://www.youtube.com/watch?v=guNdJ5MtX1A",
        thumbnailColor: "#d97706"
      },
      {
        id: "v12",
        title: "Why Are Wheels Round & Honeycombs Hexagonal?",
        channel: "SciShow Kids",
        duration: "5 mins",
        description: "Engaging science animation showing why geometry works the way it does in nature.",
        url: "https://www.youtube.com/watch?v=68M2q0L6W3U",
        thumbnailColor: "#2563eb"
      }
    ],
    exercises: [
      {
        title: "Toothpick & Playdough 3D Sculpting",
        icon: "shapes",
        steps: [
          "Roll small playdough balls for corners (vertices) and use toothpicks for straight edges.",
          "Assemble a cube, triangle pyramid, and rectangular prism.",
          "Holding and feeling the vertices and edges eliminates confusion on 2D tests."
        ]
      },
      {
        title: "Household Shape Detective Safari",
        icon: "eye",
        steps: [
          "Give the child a clipboard with shape silhouettes.",
          "Hunt around the kitchen or living room to find matching items: soup cans (cylinders), oranges (spheres), cereal boxes (rectangular prisms).",
          "Connecting geometry to real life builds instant confidence."
        ]
      },
      {
        title: "Origami Paper Net Folding",
        icon: "layers",
        steps: [
          "Cut a cross-shaped 6-square net out of paper.",
          "Have the child fold the sides up into an open cube.",
          "Teaches how 2D flat patterns become 3D solid objects."
        ]
      }
    ],
    books: [
      "The Greedy Triangle by Marilyn Burns",
      "Round Is a Tortilla: A Book of Shapes by Roseanne Greenfield Thong",
      "Shapes That Roll by Karen Nagel"
    ],
    accommodations: [
      "Provide physical 3D shape blocks during geometry learning.",
      "Allow the student to point and trace boundaries with a finger.",
      "Highlight differences between 2D flat shapes and 3D solids."
    ]
  },

  emergent_mastery: {
    typeId: "emergent_mastery",
    name: "Strong Cognitive Mastery & High Accuracy Profile",
    tag: "WELL-COMPENSATED / EMERGENT PROGRESS",
    badge: "star",
    badgeColor: "#ca8a04",
    bgColor: "#fefce8",
    borderColor: "#fde047",
    strengths: [
      "High accuracy and strong focus under challenge",
      "Fast self-correction without frustration",
      "Confidence across both visual and verbal tasks"
    ],
    growthAreas: [
      "Expanding advanced vocabulary and multi-clause sentences",
      "Building sustained reading endurance with longer chapter books",
      "Creative writing organization and speed"
    ],
    explanation:
      "The student performed exceptionally well in this stage with minimal errors, showing strong compensatory habits and solid grasp of the concepts. Continuing to provide engaging, multisensory reading and creative problem-solving will keep their enthusiasm and fluency growing.",
    videos: [
      {
        id: "v13",
        title: "How to Master Reading Comprehension & Fluency",
        channel: "BBC Bitesize",
        duration: "4 mins",
        description: "Tips and tricks for young readers to boost comprehension and read smoothly.",
        url: "https://www.youtube.com/watch?v=11r79zGwpQ4",
        thumbnailColor: "#ca8a04"
      },
      {
        id: "v14",
        title: "The Superpowers of the Dyslexic Mind",
        channel: "Made By Dyslexia",
        duration: "4 mins",
        description: "Inspiring animation featuring astronauts, architects, and storytellers with dyslexic thinking.",
        url: "https://www.youtube.com/watch?v=zafiGBrFkRM",
        thumbnailColor: "#2563eb"
      }
    ],
    exercises: [
      {
        title: "Paired 'Popcorn' Reading",
        icon: "star",
        steps: [
          "Take turns reading a sentence or paragraph aloud back and forth.",
          "Keep it lively, fun, and fast-paced to build natural prosody and expression."
        ]
      },
      {
        title: "Story Mapping & Comic Strip Creation",
        icon: "edit",
        steps: [
          "Draw 3 comic panels showing the beginning, middle, and end of a favorite story.",
          "Encourages synthesis and sequential planning without writing fatigue."
        ]
      }
    ],
    books: [
      "The Wild Robot by Peter Brown",
      "Zoey and Sassafras: Dragons and Marshmallows by Asia Citro",
      "Amulet (Graphic Novel Series) by Kazu Kibuishi"
    ],
    accommodations: [
      "Continue offering positive reinforcement and celebrate creative thinking.",
      "Offer graphic novels and illustrated chapter books to maintain joy in reading."
    ]
  }
};

const analyzeStagePerformance = (stageKey, performance, totalQuestions, studentClass) => {
  const safeTotal = Math.max(1, totalQuestions || 1);
  const wrongCount = performance?.wrongAttempts || 0;
  const firstTrySuccess = performance?.firstTrySuccess || Math.max(0, safeTotal - wrongCount);
  const hintsCount = performance?.hintsUsed || 0;
  const accuracy = Math.min(100, Math.max(0, Math.round((firstTrySuccess / safeTotal) * 100)));

  let profileKey = "emergent_mastery";
  let severity = "Mild / Typical Progress";

  if (accuracy >= 85 && wrongCount <= 1) {
    profileKey = "emergent_mastery";
    severity = "Strong Compensatory Mastery (Score: " + accuracy + "%)";
  } else if (stageKey === "stage1") {
    profileKey = "visual_dyslexia";
    severity = wrongCount >= 4 ? "Notable Visual Reversal / Orthographic Pattern" : "Mild Visual Reversal Tendency";
  } else if (stageKey === "stage2") {
    profileKey = "phonological_dyslexia";
    severity = wrongCount >= 3 ? "Notable Rapid Naming & Speech Blending Challenge" : "Mild Phonological Fluency Hesitation";
  } else if (stageKey === "stage3") {
    profileKey = "phonological_dyslexia";
    severity = wrongCount >= 4 ? "Notable Phonemic Spelling & Sequencing Pattern" : "Mild Phonics & Spelling Hesitation";
  } else if (stageKey === "stage4") {
    profileKey = "dyscalculia";
    severity = wrongCount >= 4 ? "Notable Arithmetic Sequencing / Symbol Confusion" : "Mild Mental Calculation Hesitation";
  } else if (stageKey === "comprehension") {
    profileKey = wrongCount >= 3 ? "phonological_dyslexia" : "emergent_mastery";
    severity = wrongCount >= 3 ? "Reading Comprehension & Orthographic Working Memory Fatigue" : "Well-Compensated Reading Synthesis";
  } else if (stageKey === "shapes") {
    profileKey = "spatial_geometry";
    severity = wrongCount >= 4 ? "Notable 2D/3D Spatial & Directional Challenge" : "Mild Geometric Differentiation Pattern";
  }

  const profile = DYSLEXIA_RECOMMENDATIONS[profileKey] || DYSLEXIA_RECOMMENDATIONS.emergent_mastery;

  return {
    stageKey,
    studentClass,
    totalQuestions: safeTotal,
    firstTrySuccess,
    wrongCount,
    hintsCount,
    accuracy,
    severity,
    profile,
    analyzedAt: new Date().toISOString()
  };
};

const StageComprehensiveAnalysis = ({
  stageKey,
  stageName,
  performance,
  totalQuestions,
  studentName,
  studentClass,
  score,
  onRestart,
  onNextStage,
  nextStageTitle
}) => {
  const analysis = analyzeStagePerformance(stageKey, performance, totalQuestions, studentClass);
  const { profile, accuracy, wrongCount, hintsCount, firstTrySuccess, severity } = analysis;

  const handleReadAnalysis = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${stageName} Diagnostic Analysis for ${studentName || "Student"}. Accuracy: ${accuracy} percent with ${wrongCount} incorrect attempts. Detected Profile: ${profile.name}. ${profile.explanation}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="diagnostic-container">
      {/* 1. TOP BANNER */}
      <div className="diagnostic-header-bar">
        <div>
          <span className="diagnostic-tag">Clinical & Educational Assessment</span>
          <h2 className="diagnostic-title">
            <IconBrain size={22} /> Comprehensive Performance & Cognitive Profile
          </h2>
          <p className="diagnostic-subtitle">
            Diagnostic insights, error frequency breakdown & personalized recommendations for <strong>{studentName || "Student"}</strong> (Class {studentClass})
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="shape-fact-audio-btn read-aloud-btn"
            onClick={handleReadAnalysis}
            title="Read Analysis Aloud"
          >
            <IconVolume size={14} /> Read Analysis
          </button>
          <button
            type="button"
            className="shape-fact-audio-btn print-hide"
            style={{ background: "#f8fafc", color: "#334155", borderColor: "#cbd5e1" }}
            onClick={handlePrint}
            title="Print or Save as PDF"
          >
            Print Report
          </button>
        </div>
      </div>

      {/* 2. PERFORMANCE METRICS ROW */}
      <div className="diagnostic-metrics-grid">
        <div className="metric-box">
          <div className="metric-icon"><IconTarget size={18} /></div>
          <div className="metric-val">{accuracy}%</div>
          <div className="metric-label">First-Try Accuracy</div>
        </div>

        <div className="metric-box">
          <div className="metric-icon"><IconCross size={18} /></div>
          <div className="metric-val">{wrongCount}</div>
          <div className="metric-label">Incorrect Attempts</div>
        </div>

        <div className="metric-box">
          <div className="metric-icon"><IconLightbulb size={18} /></div>
          <div className="metric-val">{hintsCount}</div>
          <div className="metric-label">Hints Used</div>
        </div>

        <div className="metric-box">
          <div className="metric-icon"><IconStar size={18} /></div>
          <div className="metric-val">{score} XP</div>
          <div className="metric-label">XP Earned</div>
        </div>
      </div>

      {/* 3. DYSLEXIA TENDENCY DIAGNOSTIC CARD */}
      <div
        className="diagnostic-profile-card"
        style={{
          background: profile.bgColor,
          borderColor: profile.borderColor,
        }}
      >
        <div className="profile-badge-row">
          <div className="profile-main-badge" style={{ background: profile.badgeColor }}>
            {renderCategoryIcon(profile.badge, 24)}
          </div>
          <div>
            <div className="profile-tag" style={{ color: profile.badgeColor }}>
              {profile.tag}
            </div>
            <h3 className="profile-name">{profile.name}</h3>
            <div className="profile-severity">
              Status: <strong>{severity}</strong>
            </div>
          </div>
        </div>

        <p className="profile-explanation">{profile.explanation}</p>

        <div className="profile-insights-columns">
          <div className="insight-box strengths-box">
            <h4 className="insight-title">
              Notable Cognitive Strengths
            </h4>
            <ul>
              {profile.strengths.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>

          <div className="insight-box growth-box">
            <h4 className="insight-title">
              Targeted Focus Areas
            </h4>
            <ul>
              {profile.growthAreas.map((ga, i) => (
                <li key={i}>{ga}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. RECOMMENDED YOUTUBE ANIMATION & LESSON VIDEOS */}
      <div className="diagnostic-section">
        <h3 className="section-heading">
          Recommended Visual & Video Lessons
        </h3>
        <p className="section-description">
          Curated animated lessons designed specifically for children with this cognitive profile:
        </p>
        <div className="video-recommendation-grid">
          {profile.videos.map((vid) => (
            <div key={vid.id} className="video-card">
              <div
                className="video-thumbnail-placeholder"
                style={{ background: vid.thumbnailColor }}
              >
                <span className="video-play-icon">▶</span>
                <span className="video-duration-pill">{vid.duration}</span>
              </div>
              <div className="video-info">
                <div className="video-channel-pill">{vid.channel}</div>
                <h4 className="video-title">{vid.title}</h4>
                <p className="video-desc">{vid.description}</p>
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-watch-link"
                >
                  Watch Lesson on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. MULTI-SENSORY READING & KINESTHETIC EXERCISES */}
      <div className="diagnostic-section">
        <h3 className="section-heading">
          Multisensory 3-Step Tactile Interventions
        </h3>
        <p className="section-description">
          Multi-sensory home & classroom activities to strengthen neurological pathways:
        </p>
        <div className="exercise-recommendation-grid">
          {profile.exercises.map((ex, i) => (
            <div key={i} className="exercise-card">
              <div className="exercise-icon">{renderCategoryIcon(ex.icon, 18)}</div>
              <h4 className="exercise-title">{ex.title}</h4>
              <ol className="exercise-steps">
                {ex.steps.map((step, sIdx) => (
                  <li key={sIdx}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* 6. READING SUGGESTIONS & ACCOMMODATIONS */}
      <div className="diagnostic-section">
        <div className="resources-two-column">
          <div className="resource-subcard">
            <h4 className="subcard-title"><IconBookOpen size={16} /> Recommended High-Readability Books</h4>
            <ul className="book-list">
              {profile.books.map((b, i) => (
                <li key={i} className="book-item">{b}</li>
              ))}
            </ul>
          </div>
          <div className="resource-subcard">
            <h4 className="subcard-title"><IconShieldCheck size={16} /> Classroom & Home Accommodations</h4>
            <ul className="accommodation-list">
              {profile.accommodations.map((acc, i) => (
                <li key={i} className="accommodation-item">{acc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 7. NAVIGATION ACTION BAR */}
      <div className="diagnostic-nav-bar print-hide">
        {onRestart && (
          <button
            type="button"
            className="secondary-button"
            onClick={onRestart}
          >
            Restart Assessment
          </button>
        )}
        {onNextStage && (
          <button
            type="button"
            className="save-button next-button"
            onClick={onNextStage}
          >
            {nextStageTitle || "CONTINUE TO NEXT STAGE →"}
          </button>
        )}
      </div>
    </div>
  );
};


function App() {
  const { t } = useLanguage();
  const userCtx = useUserContext();


  const getInitialActiveStudent = () => {
    try {
      return getActiveProfile();
    } catch {
      return null;
    }
  };
  const initialActiveStudent = getInitialActiveStudent();
  const initialClassNumber = getNormalizedClassNumber(initialActiveStudent?.studentClass || "1");

  const [allProfiles, setAllProfiles] = useState(() => {
    try {
      return getAllProfiles();
    } catch {
      return [];
    }
  });
  const [activeProfileId, setActiveProfileId] = useState(() => initialActiveStudent?.id || "");
  const activeProfileIdRef = useRef(initialActiveStudent?.id || "");
  useEffect(() => {
    activeProfileIdRef.current = activeProfileId;
  }, [activeProfileId]);

  const [studentName, setStudentName] = useState(() => initialActiveStudent?.studentName || "");
  const [studentAge, setStudentAge] = useState(() => initialActiveStudent?.studentAge || "");
  const [studentClass, setStudentClass] = useState(() => String(initialClassNumber));

  /* =======================================================
     FIREBASE AUTHENTICATION STATE & SUBSCRIPTION
     ======================================================= */
  const [authUser, setAuthUser] = useState(null);
  const [pendingVerificationUser, setPendingVerificationUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      if (user) {
        if (user.emailVerified) {
          setAuthUser(user);
          setPendingVerificationUser(null);
          if (user?.displayName) {
            setStudentName((prev) => prev || user.displayName);
          }

          // Cross-device progress restoration from Firestore
          loadUserCloudProgress(user.uid)
            .then((cloud) => {
              if (cloud) {
                // Restore scores
                if (cloud.scores) {
                  if (cloud.scores.stage1 !== undefined) setStageScore(cloud.scores.stage1);
                  if (cloud.scores.stage2 !== undefined) setStage2Score(cloud.scores.stage2);
                  if (cloud.scores.stage3 !== undefined) setStage3Score(cloud.scores.stage3);
                  if (cloud.scores.stage4 !== undefined) setStage4Score(cloud.scores.stage4);
                  if (cloud.scores.shapes !== undefined) setShapesScore(cloud.scores.shapes);
                  if (cloud.scores.comprehension !== undefined) setCompScore(cloud.scores.comprehension);
                  try {
                    const pId = activeProfileIdRef.current || user.uid;
                    localStorage.setItem(getProfileScoresKey(pId), JSON.stringify(cloud.scores));
                  } catch { }
                }

                // Restore clinical stagePerformance
                if (cloud.stagePerformance) {
                  setStagePerformance(cloud.stagePerformance);
                  try {
                    const pId = activeProfileIdRef.current || user.uid;
                    localStorage.setItem(getProfilePerformanceKey(pId), JSON.stringify(cloud.stagePerformance));
                  } catch { }
                }

                // Restore active profile
                if (cloud.activeProfile) {
                  if (cloud.activeProfile.studentName) setStudentName(cloud.activeProfile.studentName);
                  if (cloud.activeProfile.studentClass) setStudentClass(String(cloud.activeProfile.studentClass));
                  if (cloud.activeProfile.studentAge) setStudentAge(String(cloud.activeProfile.studentAge));
                }

                // Restore explorer profiles list
                if (cloud.profiles && Array.isArray(cloud.profiles) && cloud.profiles.length > 0) {
                  const legacyIds = ["profile_liam_parker", "profile_emma_watson", "profile_noah_chen", "profile_sophia_davis"];
                  const genuine = cloud.profiles.filter((p) => !legacyIds.includes(p.id));
                  const finalProfiles = genuine.length > 0 ? genuine : [
                    {
                      id: user.uid,
                      studentName: user.displayName || "Junior Explorer",
                      studentClass: cloud.activeProfile?.studentClass || studentClass || "1",
                      studentAge: cloud.activeProfile?.studentAge || studentAge || "",
                      xp: cloud.scores?.totalXp || 10,
                    }
                  ];
                  setAllProfiles(finalProfiles);
                  try {
                    localStorage.setItem("dyslexia_student_profiles_list", JSON.stringify(finalProfiles));
                  } catch { }
                }
              } else {
                // First-time user on this account: seed sensible defaults with EXACTLY ONE profile
                const initialProfile = {
                  id: user.uid,
                  studentName: user.displayName || "Junior Explorer",
                  studentClass: studentClass || "1",
                  studentAge: studentAge || "",
                  xp: 10,
                };
                setAllProfiles([initialProfile]);
                try {
                  localStorage.setItem("dyslexia_student_profiles_list", JSON.stringify([initialProfile]));
                  localStorage.setItem("dyslexia_student_profile", JSON.stringify(initialProfile));
                } catch { }
                saveUserCloudProgress(user.uid, {
                  displayName: user.displayName || "Junior Explorer",
                  email: user.email,
                  activeProfile: initialProfile,
                  scores: createInitialScores(),
                  stagePerformance: createEmptyStagePerformance(),
                  profiles: [initialProfile],
                });
              }
            })
            .catch((err) => {
              console.warn("Could not load cloud progress from Firestore:", err);
            });
        } else {
          setAuthUser(null);
          setPendingVerificationUser(user);
        }
      } else {
        setAuthUser(null);
        setPendingVerificationUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      setAuthUser(null);
      setPendingVerificationUser(null);
      setScreen("home");
    } catch (e) {
      console.error("Sign out error", e);
    }
  };

  const getActiveProgressKey = () => getProfileProgressKey(activeProfileIdRef.current);
  const getActivePerformanceKey = () => getProfilePerformanceKey(activeProfileIdRef.current);
  const getActiveScoresKey = () => getProfileScoresKey(activeProfileIdRef.current);

  const initialScores = (() => {
    try {
      const raw = localStorage.getItem(getProfileScoresKey(initialActiveStudent?.id));
      if (raw) return JSON.parse(raw);
    } catch { }
    return createInitialScores();
  })();

  /* =======================================================
     PERFORMANCE & DYSLEXIA DIAGNOSTIC TRACKING (PROFILE ISOLATED)
     ======================================================= */
  const [stagePerformance, setStagePerformance] = useState(() => {
    try {
      const raw = localStorage.getItem(getProfilePerformanceKey(initialActiveStudent?.id));
      if (raw) return JSON.parse(raw);
    } catch { }
    return createEmptyStagePerformance();
  });

  const questionMistakeTrackerRef = useRef({});

  const recordStagePerformance = (stageKey, isCorrect, exercise, answer) => {
    const currentProfileId = activeProfileIdRef.current;
    setStagePerformance((prev) => {
      const stageData = prev[stageKey] || { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 };
      const qId = exercise?.id || `${stageKey}_q_${Date.now()}`;

      let nextStageData;
      if (isCorrect) {
        const hadWrongBefore = Boolean(questionMistakeTrackerRef.current[qId]);
        nextStageData = {
          ...stageData,
          firstTrySuccess: hadWrongBefore ? stageData.firstTrySuccess : stageData.firstTrySuccess + 1,
        };
      } else {
        questionMistakeTrackerRef.current[qId] = true;
        nextStageData = {
          ...stageData,
          wrongAttempts: stageData.wrongAttempts + 1,
        };
      }

      const updated = {
        ...prev,
        [stageKey]: nextStageData,
      };

      try {
        localStorage.setItem(getProfilePerformanceKey(currentProfileId), JSON.stringify(updated));
      } catch { }

      if (authUser?.uid) {
        saveUserCloudProgress(authUser.uid, {
          stagePerformance: updated,
        });
      }

      // Update active profile telemetry in persistent store without affecting other profiles
      if (currentProfileId) {
        try {
          const profiles = getAllProfiles();
          const target = profiles.find((p) => p.id === currentProfileId);
          if (target) {
            let totalSuccess = 0;
            let totalWrong = 0;
            Object.values(updated).forEach((st) => {
              totalSuccess += (st.firstTrySuccess || 0);
              totalWrong += (st.wrongAttempts || 0);
            });
            const totalQuestions = totalSuccess + totalWrong;

            const s1Tot = (updated.stage1?.firstTrySuccess || 0) + (updated.stage1?.wrongAttempts || 0);
            const s1Acc = s1Tot > 0 ? Math.round(((updated.stage1?.firstTrySuccess || 0) / s1Tot) * 100) : 0;

            const s2Tot = (updated.stage2?.firstTrySuccess || 0) + (updated.stage2?.wrongAttempts || 0);
            const s2Acc = s2Tot > 0 ? Math.round(((updated.stage2?.firstTrySuccess || 0) / s2Tot) * 100) : 0;

            const s3Tot = (updated.stage3?.firstTrySuccess || 0) + (updated.stage3?.wrongAttempts || 0);
            const s3Acc = s3Tot > 0 ? Math.round(((updated.stage3?.firstTrySuccess || 0) / s3Tot) * 100) : 0;

            const s6Tot = (updated.comprehension?.firstTrySuccess || 0) + (updated.comprehension?.wrongAttempts || 0);
            const s6Acc = s6Tot > 0 ? Math.round(((updated.comprehension?.firstTrySuccess || 0) / s6Tot) * 100) : 0;

            target.sessions = `${totalQuestions} Questions Completed`;
            target.recognition = `${s1Acc}%`;
            target.phonological = `${s2Acc}%`;
            target.spelling = `${s3Acc}%`;
            target.speed = `${s6Acc}%`;
            if (totalQuestions > 0) {
              target.streak = "1 Day";
              target.hours = `${(totalQuestions * 0.05).toFixed(1)} hrs`;
              const overallAcc = Math.round((totalSuccess / totalQuestions) * 100);
              if (overallAcc >= 80) {
                target.riskLevel = "Low Risk (Grade Aligned)";
                target.riskColor = "#16a34a";
              } else if (overallAcc >= 55) {
                target.riskLevel = "Moderate (Assessment Active)";
                target.riskColor = "#d97706";
              } else {
                target.riskLevel = "Attention Advised (Intervention Active)";
                target.riskColor = "#dc2626";
              }
            }
            saveProfileToStore(target);
            setAllProfiles(getAllProfiles());
          }
        } catch (e) {
          console.error("Error updating profile telemetry:", e);
        }
      }

      return updated;
    });
  };

  const recordHintUsed = (stageKey) => {
    setStagePerformance((prev) => {
      const stageData = prev[stageKey] || { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 };
      const updated = {
        ...prev,
        [stageKey]: {
          ...stageData,
          hintsUsed: stageData.hintsUsed + 1,
        },
      };
      try {
        localStorage.setItem(getActivePerformanceKey(), JSON.stringify(updated));
      } catch { }

      if (authUser?.uid) {
        saveUserCloudProgress(authUser.uid, {
          stagePerformance: updated,
        });
      }
      return updated;
    });
  };

  const resetStagePerformance = (stageKey) => {
    setStagePerformance((prev) => {
      const updated = {
        ...prev,
        [stageKey]: { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 },
      };
      try {
        localStorage.setItem(getActivePerformanceKey(), JSON.stringify(updated));
      } catch { }
      return updated;
    });
    questionMistakeTrackerRef.current = {};
  };

  /* =======================================================
     STAGE 2 - READING STATES
     ======================================================= */

  const [stage2LevelIndex, setStage2LevelIndex] = useState(0);

  const [stage2ExerciseIndex, setStage2ExerciseIndex] = useState(0);

  const [stage2Message, setStage2Message] = useState("");

  const [stage2SpokenText, setStage2SpokenText] = useState("");

  const [stage2Accuracy, setStage2Accuracy] = useState(0);

  const [stage2Listening, setStage2Listening] = useState(false);
  const [stage2SpeechUnavailable, setStage2SpeechUnavailable] = useState(false);

  const [stage2Score, setStage2Score] = useState(() => initialScores.stage2 !== undefined ? initialScores.stage2 : 10);
  const [stage2CorrectCount, setStage2CorrectCount] = useState(0);
  const stage2AnsweredQuestionsRef = useRef(new Set());

  const stage2RecognitionRef = useRef(null);

  const [stage2Hint, setStage2Hint] = useState("");
  const [stage2HintUsed, setStage2HintUsed] = useState(false);
  const [selectedGladeKey, setSelectedGladeKey] = useState("stage1");

  const [playStage2Levels, setPlayStage2Levels] =
    useState(() => createShuffledStage2(initialClassNumber));
  /* =======================================================
 STAGE 3 — WRITING & UNDERSTANDING
 ======================================================= */

  const [stage3LevelIndex, setStage3LevelIndex] =
    useState(0);

  const [stage3ExerciseIndex, setStage3ExerciseIndex] =
    useState(0);
  const [playStage3Levels, setPlayStage3Levels] = useState(() => getStage3LevelsForClass(initialClassNumber));

  const [stage3Answer, setStage3Answer] =
    useState("");

  const [stage3Message, setStage3Message] =
    useState("");

  const [stage3Hint, setStage3Hint] =
    useState("");

  const [stage3HintUsed, setStage3HintUsed] =
    useState(false);

  const [stage3Score, setStage3Score] = useState(() => initialScores.stage3 !== undefined ? initialScores.stage3 : 10);

  /* =======================================================
     STAGE 4 — MATHS QUEST
     ======================================================= */
  const [stage4LevelIndex, setStage4LevelIndex] = useState(0);
  const [stage4ExerciseIndex, setStage4ExerciseIndex] = useState(0);
  const [playStage4Levels, setPlayStage4Levels] = useState(() => createShuffledStage4(initialClassNumber));
  const [stage4Answer, setStage4Answer] = useState("");
  const [stage4Message, setStage4Message] = useState("");
  const [stage4Hint, setStage4Hint] = useState("");
  const [stage4HintUsed, setStage4HintUsed] = useState(false);
  const [stage4EliminatedOptions, setStage4EliminatedOptions] = useState([]);
  const [stage4Score, setStage4Score] = useState(() => initialScores.stage4 !== undefined ? initialScores.stage4 : 10);

  /* =======================================================
     STAGE 5 — SHAPES QUEST
     ======================================================= */
  const [shapesLevelIndex, setShapesLevelIndex] = useState(0);
  const [shapesExerciseIndex, setShapesExerciseIndex] = useState(0);
  const [playShapesLevels, setPlayShapesLevels] = useState(() => createShuffledShapes(initialClassNumber));
  const [shapesAnswer, setShapesAnswer] = useState("");
  const [shapesMessage, setShapesMessage] = useState("");
  const [shapesHint, setShapesHint] = useState("");
  const [shapesHintUsed, setShapesHintUsed] = useState(false);
  const [shapesEliminatedOptions, setShapesEliminatedOptions] = useState([]);
  const [shapesScore, setShapesScore] = useState(() => initialScores.shapes !== undefined ? initialScores.shapes : 10);
  const [showShapeFact, setShowShapeFact] = useState(false);
  /* =======================================================
       MODULE 06 — READING COMPREHENSION STATE
       ======================================================= */
  const [compLevelIndex, setCompLevelIndex] = useState(0);
  const [compQuestionIndex, setCompQuestionIndex] = useState(0);
  const [playComprehensionLevels, setPlayComprehensionLevels] = useState(() => getComprehensionLevelsForClass(initialClassNumber));
  const [compAnswer, setCompAnswer] = useState("");
  const [compMessage, setCompMessage] = useState("");
  const [compHint, setCompHint] = useState("");
  const [compHintUsed, setCompHintUsed] = useState(false);
  const [compScore, setCompScore] = useState(() => initialScores.comprehension !== undefined ? initialScores.comprehension : 10);

  const [stage1ShowHint, setStage1ShowHint] = useState(false);
  const [stage2ShowHint, setStage2ShowHint] = useState(false);
  const [stage3ShowHint, setStage3ShowHint] = useState(false);
  const [stage4ShowHint, setStage4ShowHint] = useState(false);
  const [shapesShowHint, setShapesShowHint] = useState(false);
  const [compShowHint, setCompShowHint] = useState(false);

  /*
   HOME IS NOW THE FIRST PAGE
  */
  const getInitialScreen = () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("mode") === "resetPassword" || searchParams.get("oobCode")) {
        return "login";
      }
      const raw = window.location.hash.replace("#", "").trim();
      if (!raw) return "home";
      const h = raw.toLowerCase();
      if (h === "login" || h === "signin" || h === "signup" || h === "reset") return "login";
      if (h === "verifyemail" || h === "verify-email") return "verifyEmail";
      if (h === "privacy" || h === "privacypolicy" || h === "privacy-policy") return "privacy";
      if (h === "terms" || h === "termsconditions" || h === "terms-and-conditions" || h === "tos") return "terms";
      if (h === "teacher" || h === "journal" || h === "guide") return "teacher";
      if (h === "analysis") return "analysis";
      if (h === "leveltransition" || h === "levelTransition" || h === "transition") return "levelTransition";
      if (h === "echo" || h === "echosanctuary" || h === "echo-sanctuary" || h === "auditory" || h === "auditoryprocessing" || h === "stage2") {
        return "stage2";
      }
      if (h === "reading" || h === "reading-comprehension" || h === "storyteller" || h === "comprehension") {
        return "comprehension";
      }
      if (h === "visual" || h === "eagle-eye" || h === "eagle" || h === "stage1") return "stage1";
      if (h === "anagram" || h === "vineweaver" || h === "vine-weaver" || h === "stage3") return "stage3";
      if (h === "math" || h === "maths" || h === "maths-jutsu" || h === "stage4") return "stage4";
      if (h === "shapes" || h === "geometry" || h === "sunstone") return "shapes";
      if (h === "404" || h === "notfound" || h === "not-found") return "notFound";
      if ([
        "stages", "profile", "profileCreated", "analysis", "levelTransition",
        "stage1", "stage1Report",
        "stage2", "stage2Report",
        "stage3", "stage3Report",
        "stage4", "stage4Report",
        "shapes", "shapesReport",
        "comprehension", "comprehensionReport",
        "levelReport", "home", "privacy", "terms", "login", "teacher", "verifyEmail", "notFound"
      ].includes(raw)) {
        return raw;
      }
      return "notFound";
    } catch (e) { }
    return "home";
  };

  const [screen, setScreen] = useState(getInitialScreen);
  const isInternalNavRef = useRef(false);

  const [spatialPulse, setSpatialPulse] = useState(0);
  const [pulseType, setPulseType] = useState("cyan");
  const [fxTrigger, setFxTrigger] = useState(0);
  const [fxScore, setFxScore] = useState(3);
  const [fxCombo, setFxCombo] = useState(1);

  const trigger3DCelebration = (points = 3, isCorrect = true) => {
    if (isCorrect) {
      setSpatialPulse((p) => p + 1);
      setPulseType("emerald");
      setFxScore(points);
      setFxCombo((c) => Math.min(c + 1, 5));
      setFxTrigger((t) => t + 1);
      playSuccessChime();
    } else {
      setSpatialPulse((p) => p + 1);
      setPulseType("amber");
      setFxCombo(1);
      playLetterFlip();
    }
  };

  const persistScores = (overrides = {}) => {
    const currentId = activeProfileIdRef.current;
    if (!currentId) return;
    try {
      const existing = (() => {
        try {
          const r = localStorage.getItem(getProfileScoresKey(currentId));
          return r ? JSON.parse(r) : createInitialScores();
        } catch { return createInitialScores(); }
      })();
      const updated = {
        ...existing,
        stage1: stageScore,
        stage2: stage2Score,
        stage3: stage3Score,
        stage4: stage4Score,
        shapes: shapesScore,
        comprehension: compScore,
        ...overrides
      };
      localStorage.setItem(getProfileScoresKey(currentId), JSON.stringify(updated));

      // Synchronize scores and active profile to Firestore for cross-device persistence
      if (authUser?.uid) {
        saveUserCloudProgress(authUser.uid, {
          scores: updated,
          activeProfile: {
            studentName: studentName || authUser.displayName || "Junior Explorer",
            studentClass: studentClass || "1",
            studentAge: studentAge || "",
            xp: updated.stage1 || 10,
          },
        });
      }
    } catch { }
  };

  const selectedClass = getNormalizedClassNumber(studentClass);

  const classDifficulty = {
    1: "very-easy",
    2: "easy",
    3: "medium",
    4: "hard",
    5: "very-hard",
  }[selectedClass];

  const [schoolName, setSchoolName] =
    useState("");

  const [parentName, setParentName] =
    useState("");

  const [parentPhone, setParentPhone] =
    useState("");

  const [parentEmail, setParentEmail] =
    useState("");

  const [studentPhoto, setStudentPhoto] =
    useState("");

  const [saveMessage, setSaveMessage] =
    useState("");

  /* =======================================================
     AUDIO
     ORIGINAL AUDIO CODE - UNCHANGED
     ======================================================= */

  const [recording, setRecording] =
    useState(false);

  const recordingRef =
    useRef(false);

  const [audioURL, setAudioURL] =
    useState("");

  const [audioData, setAudioData] =
    useState("");

  const [audioError, setAudioError] =
    useState("");

  const audioContextRef =
    useRef(null);

  const microphoneRef =
    useRef(null);

  const processorRef =
    useRef(null);

  const analyserRef =
    useRef(null);

  const streamRef =
    useRef(null);

  const audioSamplesRef =
    useRef([]);

  /* =======================================================
     STAGE 1
     ======================================================= */

  const [levelIndex, setLevelIndex] =
    useState(0);

  const [exerciseIndex, setExerciseIndex] =
    useState(0);

  const [playStage1Levels, setPlayStage1Levels] =
    useState(() => createShuffledStage1(initialClassNumber));

  const syncStageLevelsForClass = (classNum) => {
    const norm = getNormalizedClassNumber(classNum);
    setPlayStage1Levels(createShuffledStage1(norm));
    setPlayStage2Levels(createShuffledStage2(norm));
    setPlayStage3Levels(getStage3LevelsForClass(norm));
    setPlayStage4Levels(createShuffledStage4(norm));
    setPlayShapesLevels(createShuffledShapes(norm));
    setPlayComprehensionLevels(getComprehensionLevelsForClass(norm));
  };

  useEffect(() => {
    syncStageLevelsForClass(selectedClass);
  }, [selectedClass]);

  const [stageAnswer, setStageAnswer] =
    useState("");

  const [stageMessage, setStageMessage] =
    useState("");

  // Hints are available only after an incorrect answer.
  // One hint can be used per question and costs 5 XP.
  const [stageHint, setStageHint] =
    useState("");

  const [hintUsed, setHintUsed] =
    useState(false);

  const [stageScore, setStageScore] =
    useState(() => initialScores.stage1 !== undefined ? initialScores.stage1 : 10);

  /*
    Number of questions answered in Stage 1.
    This is separate from score because even a wrong
    answer counts as a completed question.
  */

  const [completedQuestions, setCompletedQuestions] =
    useState(0);

  const [completedLevelNumber, setCompletedLevelNumber] =
    useState(0);

  // =========================================================
  // SAVED LEARNING PROGRESS
  // Every Stage 1 answer is saved immediately.
  // Progress is stored separately for each class.
  // 3 levels × 9 questions = 27 questions per class.
  // =========================================================

  const createEmptyClassProgress = () => ({
    completedQuestionIds: [],
    correctQuestionIds: [],
    completedQuestions: 0,
    // Student starts Stage 1 with 10 XP.
    xp: 10,
    totalQuestions: 27,
    stageCompleted: false,
    lastAnsweredQuestionId: "",
    savedAt: null,
  });

  const createEmptyStage4ClassProgress = () => ({
    completedQuestionIds: [],
    correctQuestionIds: [],
    completedQuestions: 0,
    completedLevels: [],
    xp: 10,
    totalQuestions: 30,
    stageCompleted: false,
    lastAnsweredQuestionId: "",
    savedAt: null,
  });

  const createEmptyComprehensionClassProgress = () => ({
    completedQuestions: 0,
    correctQuestionIds: [],
    completedQuestionIds: [],
    completedLevels: [],
    stageCompleted: false,
    xp: 10,
  });

  const createEmptyShapesClassProgress = () => ({
    completedQuestionIds: [],
    correctQuestionIds: [],
    completedQuestions: 0,
    completedLevels: [],
    xp: 10,
    totalQuestions: 16,
    stageCompleted: false,
    lastAnsweredQuestionId: "",
    savedAt: null,
  });

  const createEmptyLearningProgress = () => ({
    stage1: {
      classes: {
        1: createEmptyClassProgress(),
        2: createEmptyClassProgress(),
        3: createEmptyClassProgress(),
        4: createEmptyClassProgress(),
        5: createEmptyClassProgress(),
      },
    },
    stage4: {
      classes: {
        1: createEmptyStage4ClassProgress(),
        2: createEmptyStage4ClassProgress(),
        3: createEmptyStage4ClassProgress(),
        4: createEmptyStage4ClassProgress(),
        5: createEmptyStage4ClassProgress(),
      },
    },
    shapes: {
      classes: {
        1: createEmptyShapesClassProgress(),
        2: createEmptyShapesClassProgress(),
        3: createEmptyShapesClassProgress(),
        4: createEmptyShapesClassProgress(),
        5: createEmptyShapesClassProgress(),
      },
    },
    comprehension: {
      classes: {
        1: createEmptyComprehensionClassProgress(),
        2: createEmptyComprehensionClassProgress(),
        3: createEmptyComprehensionClassProgress(),
        4: createEmptyComprehensionClassProgress(),
        5: createEmptyComprehensionClassProgress(),
      },
    },
  });

  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(getProfileProgressKey(initialActiveStudent?.id));

      if (!saved) {
        return createEmptyLearningProgress();
      }

      const parsed = JSON.parse(saved);

      // Keep the new class-wise format.
      if (parsed?.stage1?.classes) {
        return parsed;
      }

      // Old progress format is intentionally not mixed with the new
      // class-wise question IDs because the old Stage 1 had 48 questions.
      const freshProgress = createEmptyLearningProgress();

      // Preserve Stage 2 if it already exists.
      if (parsed?.stage2) {
        freshProgress.stage2 = parsed.stage2;
      }

      return freshProgress;
    } catch (error) {
      console.error("Could not load saved progress:", error);
      return createEmptyLearningProgress();
    }
  });

  const getSavedStage1ClassProgress = (classNumber) => {
    const classKey = String(getNormalizedClassNumber(classNumber));

    return (
      savedProgress?.stage1?.classes?.[classKey] ||
      createEmptyClassProgress()
    );
  };

  const getSavedStage4ClassProgress = (classNumber) => {
    const classKey = String(getNormalizedClassNumber(classNumber));

    return (
      savedProgress?.stage4?.classes?.[classKey] ||
      createEmptyStage4ClassProgress()
    );
  };

  const getSavedComprehensionClassProgress = (classNumber) => {
    const classKey = String(getNormalizedClassNumber(classNumber));
    return (
      savedProgress?.comprehension?.classes?.[classKey] ||
      createEmptyComprehensionClassProgress()
    );
  };

  const saveComprehensionQuestionProgress = (
    classNumber,
    levelNumber,
    exercise,
    isCorrect,
    xpOverride = null
  ) => {
    const classKey = String(getNormalizedClassNumber(classNumber));
    const levels = getComprehensionLevelsForClass(classNumber);

    const rawSaved = localStorage.getItem(getActiveProgressKey());
    let previousProgress;
    try {
      previousProgress = rawSaved ? JSON.parse(rawSaved) : createEmptyLearningProgress();
    } catch {
      previousProgress = createEmptyLearningProgress();
    }

    if (!previousProgress.comprehension?.classes) {
      previousProgress = {
        ...previousProgress,
        comprehension: {
          classes: {
            1: createEmptyComprehensionClassProgress(),
            2: createEmptyComprehensionClassProgress(),
            3: createEmptyComprehensionClassProgress(),
            4: createEmptyComprehensionClassProgress(),
            5: createEmptyComprehensionClassProgress(),
          },
        },
      };
    }

    const previousClassProgress = {
      ...createEmptyComprehensionClassProgress(),
      ...(previousProgress.comprehension.classes[classKey] || {}),
    };

    const completedQuestionIds = new Set(previousClassProgress.completedQuestionIds || []);
    const correctQuestionIds = new Set(previousClassProgress.correctQuestionIds || []);

    completedQuestionIds.add(exercise.id);
    if (isCorrect) {
      correctQuestionIds.add(exercise.id);
    }

    const completedLevels = levels
      .filter((level) => level.questions.every((item) => completedQuestionIds.has(item.id)))
      .map((level) => level.id);

    const completedQuestions = completedQuestionIds.size;
    const updatedXP =
      xpOverride !== null
        ? Math.max(0, Number(xpOverride) || 0)
        : previousClassProgress.xp;

    const updatedClassProgress = {
      ...previousClassProgress,
      completedQuestionIds: Array.from(completedQuestionIds),
      correctQuestionIds: Array.from(correctQuestionIds),
      completedQuestions,
      completedLevels,
      stageCompleted: levels.length > 0 && completedLevels.length === levels.length,
      xp: updatedXP,
    };

    const updatedProgress = {
      ...previousProgress,
      comprehension: {
        ...previousProgress.comprehension,
        classes: {
          ...previousProgress.comprehension.classes,
          [classKey]: updatedClassProgress,
        },
      },
    };

    try {
      localStorage.setItem(getActiveProgressKey(), JSON.stringify(updatedProgress));
    } catch { }

    setSavedProgress(updatedProgress);
    setCompScore(updatedClassProgress.xp);
    persistScores({ comprehension: updatedClassProgress.xp });

    return updatedClassProgress;
  };

  const getSavedShapesClassProgress = (classNumber) => {
    const classKey = String(getNormalizedClassNumber(classNumber));

    return (
      savedProgress?.shapes?.classes?.[classKey] ||
      createEmptyShapesClassProgress()
    );
  };

  // =========================================================
  // SAVE EVERY STAGE 1 QUESTION IMMEDIATELY
  // =========================================================

  const saveStage1QuestionProgress = (
    classNumber,
    levelNumber,
    exercise,
    isCorrect,
    xpOverride = null
  ) => {
    const classKey = String(getNormalizedClassNumber(classNumber));
    const levels = getStage1LevelsForClass(classNumber);

    const rawSaved = localStorage.getItem(
      getActiveProgressKey()
    );

    let previousProgress;

    try {
      previousProgress = rawSaved
        ? JSON.parse(rawSaved)
        : createEmptyLearningProgress();
    } catch {
      previousProgress = createEmptyLearningProgress();
    }

    if (!previousProgress.stage1?.classes) {
      previousProgress = {
        ...createEmptyLearningProgress(),
        ...(previousProgress.stage2
          ? { stage2: previousProgress.stage2 }
          : {}),
      };
    }

    const previousClassProgress = {
      ...createEmptyClassProgress(),
      ...(previousProgress.stage1.classes[classKey] || {}),
    };

    const completedQuestionIds = new Set(
      previousClassProgress.completedQuestionIds || []
    );

    const correctQuestionIds = new Set(
      previousClassProgress.correctQuestionIds || []
    );

    // A question is saved as completed whether the child is right or wrong.
    completedQuestionIds.add(exercise.id);

    if (isCorrect) {
      correctQuestionIds.add(exercise.id);
    }

    const completedLevels = levels
      .filter((level) =>
        level.exercises.every((item) =>
          completedQuestionIds.has(item.id)
        )
      )
      .map((level) => level.id);

    const completedQuestions =
      completedQuestionIds.size;

    const updatedXP =
      xpOverride !== null
        ? Math.max(0, Number(xpOverride) || 0)
        : Number.isFinite(previousClassProgress.xp)
          ? previousClassProgress.xp
          : correctQuestionIds.size;

    const updatedClassProgress = {
      ...previousClassProgress,
      completedQuestionIds: Array.from(
        completedQuestionIds
      ),
      correctQuestionIds: Array.from(
        correctQuestionIds
      ),
      completedQuestions,
      completedLevels,
      totalQuestions: 27,
      stageCompleted:
        completedQuestions >= 27,
      xp: updatedXP,
      lastAnsweredQuestionId:
        exercise.id,
      lastAnsweredLevel:
        levelNumber,
      savedAt:
        new Date().toISOString(),
    };

    const updatedProgress = {
      ...previousProgress,
      stage1: {
        ...previousProgress.stage1,
        classes: {
          ...previousProgress.stage1.classes,
          [classKey]: updatedClassProgress,
        },
      },
    };

    localStorage.setItem(
      getActiveProgressKey(),
      JSON.stringify(updatedProgress)
    );

    setSavedProgress(updatedProgress);

    setCompletedQuestions(
      updatedClassProgress.completedQuestions
    );

    setStageScore(
      updatedClassProgress.xp
    );
    persistScores({ stage1: updatedClassProgress.xp });

    console.log(
      "Stage 1 question progress saved:",
      {
        class: classKey,
        level: levelNumber,
        question: exercise.id,
        completedQuestions:
          updatedClassProgress.completedQuestions,
        totalQuestions: 27,
      }
    );

    return updatedClassProgress;
  };

  // =========================================================
  // SAVE LEVEL PROGRESS
  // Kept as a separate helper for clarity.
  // Question progress itself is already saved immediately.
  // =========================================================

  const saveLevelProgress = (levelNumber) => {
    const classProgress =
      getSavedStage1ClassProgress(selectedClass);

    console.log(
      `Level ${levelNumber} progress already saved question-by-question.`,
      classProgress
    );

    return classProgress;
  };

  // =========================================================
  // SAVE STAGE 4 QUESTION PROGRESS
  // =========================================================

  const saveStage4QuestionProgress = (
    classNumber,
    levelNumber,
    exercise,
    isCorrect,
    xpOverride = null
  ) => {
    const classKey = String(getNormalizedClassNumber(classNumber));
    const levels = getStage4LevelsForClass(classNumber);

    const rawSaved = localStorage.getItem(getActiveProgressKey());

    let previousProgress;
    try {
      previousProgress = rawSaved ? JSON.parse(rawSaved) : createEmptyLearningProgress();
    } catch {
      previousProgress = createEmptyLearningProgress();
    }

    if (!previousProgress.stage4?.classes) {
      previousProgress = {
        ...previousProgress,
        stage4: {
          classes: {
            1: createEmptyStage4ClassProgress(),
            2: createEmptyStage4ClassProgress(),
            3: createEmptyStage4ClassProgress(),
            4: createEmptyStage4ClassProgress(),
            5: createEmptyStage4ClassProgress(),
          },
        },
      };
    }

    const previousClassProgress = {
      ...createEmptyStage4ClassProgress(),
      ...(previousProgress.stage4.classes[classKey] || {}),
    };

    const completedQuestionIds = new Set(previousClassProgress.completedQuestionIds || []);
    const correctQuestionIds = new Set(previousClassProgress.correctQuestionIds || []);

    completedQuestionIds.add(exercise.id);
    if (isCorrect) {
      correctQuestionIds.add(exercise.id);
    }

    const completedLevels = levels
      .filter((level) => level.exercises.every((item) => completedQuestionIds.has(item.id)))
      .map((level) => level.id);

    const completedQuestions = completedQuestionIds.size;
    const updatedXP =
      xpOverride !== null
        ? Math.max(0, Number(xpOverride) || 0)
        : previousClassProgress.xp;

    const updatedClassProgress = {
      ...previousClassProgress,
      completedQuestionIds: Array.from(completedQuestionIds),
      correctQuestionIds: Array.from(correctQuestionIds),
      completedQuestions,
      completedLevels,
      totalQuestions: 30,
      stageCompleted: completedQuestions >= 30,
      xp: updatedXP,
      lastAnsweredQuestionId: exercise.id,
      lastAnsweredLevel: levelNumber,
      savedAt: new Date().toISOString(),
    };

    const updatedProgress = {
      ...previousProgress,
      stage4: {
        ...previousProgress.stage4,
        classes: {
          ...previousProgress.stage4.classes,
          [classKey]: updatedClassProgress,
        },
      },
    };

    localStorage.setItem(getActiveProgressKey(), JSON.stringify(updatedProgress));
    setSavedProgress(updatedProgress);
    setStage4Score(updatedClassProgress.xp);
    persistScores({ stage4: updatedClassProgress.xp });

    return updatedClassProgress;
  };

  // =========================================================
  // SAVE STAGE 5 (SHAPES) QUESTION PROGRESS
  // =========================================================

  const saveShapesQuestionProgress = (
    classNumber,
    levelNumber,
    exercise,
    isCorrect,
    xpOverride = null
  ) => {
    const classKey = String(getNormalizedClassNumber(classNumber));
    const levels = getShapesLevelsForClass(classNumber);

    const rawSaved = localStorage.getItem(getActiveProgressKey());

    let previousProgress;
    try {
      previousProgress = rawSaved ? JSON.parse(rawSaved) : createEmptyLearningProgress();
    } catch {
      previousProgress = createEmptyLearningProgress();
    }

    if (!previousProgress.shapes?.classes) {
      previousProgress = {
        ...previousProgress,
        shapes: {
          classes: {
            1: createEmptyShapesClassProgress(),
            2: createEmptyShapesClassProgress(),
            3: createEmptyShapesClassProgress(),
            4: createEmptyShapesClassProgress(),
            5: createEmptyShapesClassProgress(),
          },
        },
      };
    }

    const previousClassProgress = {
      ...createEmptyShapesClassProgress(),
      ...(previousProgress.shapes.classes[classKey] || {}),
    };

    const completedQuestionIds = new Set(previousClassProgress.completedQuestionIds || []);
    const correctQuestionIds = new Set(previousClassProgress.correctQuestionIds || []);

    completedQuestionIds.add(exercise.id);
    if (isCorrect) {
      correctQuestionIds.add(exercise.id);
    }

    const completedLevels = levels
      .filter((level) => level.exercises.every((item) => completedQuestionIds.has(item.id)))
      .map((level) => level.id);

    const completedQuestions = completedQuestionIds.size;
    const updatedXP =
      xpOverride !== null
        ? Math.max(0, Number(xpOverride) || 0)
        : previousClassProgress.xp;

    const updatedClassProgress = {
      ...previousClassProgress,
      completedQuestionIds: Array.from(completedQuestionIds),
      correctQuestionIds: Array.from(correctQuestionIds),
      completedQuestions,
      completedLevels,
      totalQuestions: 16,
      stageCompleted: completedQuestions >= 16,
      xp: updatedXP,
      lastAnsweredQuestionId: exercise.id,
      lastAnsweredLevel: levelNumber,
      savedAt: new Date().toISOString(),
    };

    const updatedProgress = {
      ...previousProgress,
      shapes: {
        ...previousProgress.shapes,
        classes: {
          ...previousProgress.shapes.classes,
          [classKey]: updatedClassProgress,
        },
      },
    };

    localStorage.setItem(getActiveProgressKey(), JSON.stringify(updatedProgress));
    setSavedProgress(updatedProgress);
    setShapesScore(updatedClassProgress.xp);
    persistScores({ shapes: updatedClassProgress.xp });

    return updatedClassProgress;
  };

  /* =======================================================
     LOAD PROFILE
     ======================================================= */

  useEffect(() => {
    try {
      const loadedProfiles = getAllProfiles();
      setAllProfiles(loadedProfiles);

      const active = getActiveProfile();
      if (active) {
        const targetClass = getNormalizedClassNumber(active.studentClass || "1");
        setActiveProfileId(active.id || "");
        setStudentName(active.studentName || "");
        setStudentAge(active.studentAge || "");
        setStudentClass(String(targetClass));
        setSchoolName(active.schoolName || "");
        setParentName(active.parentName || "");
        setParentPhone(active.parentPhone || "");
        setParentEmail(active.parentEmail || "");
        setStudentPhoto(active.studentPhoto || "");
        if (active.audioData) {
          setAudioData(active.audioData);
          setAudioURL(active.audioData);
        }
        syncStageLevelsForClass(targetClass);
      }
    } catch (error) {
      console.error("Could not load saved profiles:", error);
    }
  }, []);

  const handleSelectProfile = (profile) => {
    if (!profile) return;
    const targetClass = getNormalizedClassNumber(profile.studentClass || "1");

    // Save previous active profile's data before switching
    const prevId = activeProfileIdRef.current;
    if (prevId && prevId !== profile.id) {
      try {
        localStorage.setItem(getProfilePerformanceKey(prevId), JSON.stringify(stagePerformance));
        localStorage.setItem(getProfileProgressKey(prevId), JSON.stringify(savedProgress));
        localStorage.setItem(getProfileScoresKey(prevId), JSON.stringify({
          stage1: stageScore,
          stage2: stage2Score,
          stage3: stage3Score,
          stage4: stage4Score,
          shapes: shapesScore,
          comprehension: compScore,
          totalXp: (profile.xp || 10)
        }));
      } catch (e) { }
    }

    activeProfileIdRef.current = profile.id;
    setActiveProfileInStore(profile.id);
    setActiveProfileId(profile.id);

    // Load isolated stage performance
    let targetPerf;
    try {
      const rawPerf = localStorage.getItem(getProfilePerformanceKey(profile.id));
      targetPerf = rawPerf ? JSON.parse(rawPerf) : createEmptyStagePerformance();
    } catch {
      targetPerf = createEmptyStagePerformance();
    }
    setStagePerformance(targetPerf);
    questionMistakeTrackerRef.current = {};

    // Load isolated saved progress
    let targetProg;
    try {
      const rawProg = localStorage.getItem(getProfileProgressKey(profile.id));
      targetProg = rawProg ? JSON.parse(rawProg) : createEmptyLearningProgress();
    } catch {
      targetProg = createEmptyLearningProgress();
    }
    setSavedProgress(targetProg);

    // Load isolated scores
    let targetScores;
    try {
      const rawScores = localStorage.getItem(getProfileScoresKey(profile.id));
      targetScores = rawScores ? JSON.parse(rawScores) : createInitialScores();
    } catch {
      targetScores = createInitialScores();
    }
    setStageScore(targetScores.stage1 !== undefined ? targetScores.stage1 : 10);
    setStage2Score(targetScores.stage2 !== undefined ? targetScores.stage2 : 10);
    setStage3Score(targetScores.stage3 !== undefined ? targetScores.stage3 : 10);
    setStage4Score(targetScores.stage4 !== undefined ? targetScores.stage4 : 10);
    setShapesScore(targetScores.shapes !== undefined ? targetScores.shapes : 10);
    setCompScore(targetScores.comprehension !== undefined ? targetScores.comprehension : 10);

    // Reset transient question indices and answers
    setLevelIndex(0);
    setExerciseIndex(0);
    setCompletedQuestions(0);
    setCompletedLevelNumber(0);
    setStageAnswer("");
    setStageMessage("");
    setStageHint("");
    setHintUsed(false);

    setStage2LevelIndex(0);
    setStage2ExerciseIndex(0);
    setStage2Message("");
    setStage2SpokenText("");
    setStage2Accuracy(0);
    setStage2Listening(false);

    setStage3LevelIndex(0);
    setStage3ExerciseIndex(0);
    setStage3Message("");
    setStage3Answer("");
    setStage3Hint("");
    setStage3HintUsed(false);

    setStage4LevelIndex(0);
    setStage4ExerciseIndex(0);
    setStage4Answer("");
    setStage4Message("");
    setStage4Hint("");
    setStage4HintUsed(false);
    setStage4EliminatedOptions([]);

    setShapesLevelIndex(0);
    setShapesExerciseIndex(0);
    setShapesAnswer("");
    setShapesMessage("");
    setShapesHint("");
    setShapesHintUsed(false);
    setShapesEliminatedOptions([]);
    setShowShapeFact(false);

    setCompLevelIndex(0);
    setCompQuestionIndex(0);
    setCompAnswer("");
    setCompMessage("");
    setCompHint("");
    setCompHintUsed(false);

    setStudentName(profile.studentName || "");
    setStudentAge(profile.studentAge || "");
    setStudentClass(String(targetClass));
    setSchoolName(profile.schoolName || "");
    setParentName(profile.parentName || "");
    setParentPhone(profile.parentPhone || "");
    setParentEmail(profile.parentEmail || "");
    setStudentPhoto(profile.studentPhoto || "");
    if (profile.audioData) {
      setAudioData(profile.audioData);
      setAudioURL(profile.audioData);
    } else {
      setAudioData(null);
      setAudioURL("");
    }
    setAllProfiles(getAllProfiles());
    syncStageLevelsForClass(targetClass);
  };

  const handleDeleteProfile = (profileId) => {
    const updated = deleteProfileFromStore(profileId);
    setAllProfiles(updated);
    const active = getActiveProfile();
    if (active) {
      handleSelectProfile(active);
    }
  };

  const handleCreateNewProfile = () => {
    activeProfileIdRef.current = "";
    setActiveProfileId("");
    setStudentName("");
    setStudentAge("");
    setStudentClass("1");
    setSchoolName("");
    setParentName("");
    setParentPhone("");
    setParentEmail("");
    setStudentPhoto("");
    setAudioData(null);
    setAudioURL("");

    // Starting a new profile: reset everything with 10 XP Stars and 0 performance
    setStagePerformance(createEmptyStagePerformance());
    setSavedProgress(createEmptyLearningProgress());
    questionMistakeTrackerRef.current = {};

    setStageScore(10);
    setStage2Score(10);
    setStage3Score(10);
    setStage4Score(10);
    setShapesScore(10);
    setCompScore(10);

    setLevelIndex(0);
    setExerciseIndex(0);
    setCompletedQuestions(0);
    setCompletedLevelNumber(0);
    setStageAnswer("");
    setStageMessage("");
    setStageHint("");
    setHintUsed(false);

    setStage2LevelIndex(0);
    setStage2ExerciseIndex(0);
    setStage2Message("");
    setStage2SpokenText("");
    setStage2Accuracy(0);
    setStage2Listening(false);

    setStage3LevelIndex(0);
    setStage3ExerciseIndex(0);
    setStage3Message("");
    setStage3Answer("");
    setStage3Hint("");
    setStage3HintUsed(false);

    setStage4LevelIndex(0);
    setStage4ExerciseIndex(0);
    setStage4Answer("");
    setStage4Message("");
    setStage4Hint("");
    setStage4HintUsed(false);
    setStage4EliminatedOptions([]);

    setShapesLevelIndex(0);
    setShapesExerciseIndex(0);
    setShapesAnswer("");
    setShapesMessage("");
    setShapesHint("");
    setShapesHintUsed(false);
    setShapesEliminatedOptions([]);
    setShowShapeFact(false);

    setCompLevelIndex(0);
    setCompQuestionIndex(0);
    setCompAnswer("");
    setCompMessage("");
    setCompHint("");
    setCompHintUsed(false);

    syncStageLevelsForClass(1);
    setScreen("profile");
  };

  /* =======================================================
     VOICE FEEDBACK
     ======================================================= */

  useEffect(() => {
    if (!stageMessage) {
      return;
    }

    if (
      !("speechSynthesis" in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const exercise =
      playStage1Levels[levelIndex]
        ?.exercises[exerciseIndex];

    if (!exercise) {
      return;
    }

    let text = "";

    if (
      stageMessage.includes(
        "Correct"
      )
    ) {
      text =
        "Correct answer! Great job!";
    } else if (
      stageMessage.includes("Incorrect") ||
      stageMessage.includes("Wrong")
    ) {
      text =
        "That's not quite right. Try again or use a hint!";
    } else {
      return;
    }

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(
      utterance
    );

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [
    stageMessage,
    levelIndex,
    exerciseIndex,
    playStage1Levels,
  ]);

  /* =======================================================
     STAGE QUESTION AUDIO
     This is separate from the original profile WAV recorder.
     Matching questions are spoken automatically and can be replayed.
     ======================================================= */

  const playQuestionAudio = (text) => {
    if (!text || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.rate = 0.75;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (screen !== "stage1") {
      return;
    }

    const exercise =
      playStage1Levels[levelIndex]
        ?.exercises[exerciseIndex];

    if (!exercise || exercise.type !== "matching") {
      return;
    }

    const spokenText =
      exercise.spoken ||
      exercise.left ||
      exercise.visual;

    if (!spokenText) {
      return;
    }

    const timer = setTimeout(() => {
      playQuestionAudio(spokenText);
    }, 250);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis?.cancel();
    };
  }, [
    screen,
    levelIndex,
    exerciseIndex,
    playStage1Levels,
  ]);

  /* =======================================================
     PHOTO
     ======================================================= */

  const handlePhotoUpload = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setSaveMessage(
        "PLEASE SELECT AN IMAGE FILE."
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setStudentPhoto(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  /* =======================================================
     START RECORDING
     ORIGINAL AUDIO CODE - UNCHANGED
     ======================================================= */

  const startRecording =
    async () => {
      try {
        setAudioError("");
        setSaveMessage("");

        if (
          !navigator.mediaDevices
            ?.getUserMedia
        ) {
          setAudioError(
            "Your browser does not support microphone recording."
          );

          return;
        }

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

        streamRef.current =
          stream;

        const AudioContextClass =
          window.AudioContext ||
          window.webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error(
            "Web Audio API is not supported."
          );
        }

        const audioContext =
          new AudioContextClass();

        audioContextRef.current =
          audioContext;

        if (
          audioContext.state ===
          "suspended"
        ) {
          await audioContext.resume();
        }

        const microphone =
          audioContext.createMediaStreamSource(
            stream
          );

        microphoneRef.current =
          microphone;

        const analyser =
          audioContext.createAnalyser();

        analyserRef.current =
          analyser;

        const processor =
          audioContext.createScriptProcessor(
            4096,
            1,
            1
          );

        processorRef.current =
          processor;

        audioSamplesRef.current =
          [];

        recordingRef.current =
          true;

        processor.onaudioprocess =
          (event) => {
            if (
              !recordingRef.current
            ) {
              return;
            }

            const input =
              event.inputBuffer.getChannelData(
                0
              );

            audioSamplesRef.current.push(
              new Float32Array(input)
            );

            const output =
              event.outputBuffer.getChannelData(
                0
              );

            output.fill(0);
          };

        microphone.connect(
          analyser
        );

        analyser.connect(
          processor
        );

        processor.connect(
          audioContext.destination
        );

        setRecording(true);

        console.log(
          "WAV recording started."
        );
      } catch (error) {
        console.error(
          "Microphone recording error:",
          error
        );

        recordingRef.current =
          false;

        setRecording(false);

        if (
          error.name ===
          "NotAllowedError"
        ) {
          setAudioError(
            "Microphone permission was denied. Please allow microphone access."
          );
        } else {
          setAudioError(
            "Could not start recording. Please try again."
          );
        }
      }
    };

  /* =======================================================
     STOP RECORDING
     ORIGINAL AUDIO CODE - UNCHANGED
     ======================================================= */

  const stopRecording =
    async () => {
      try {
        recordingRef.current =
          false;

        setRecording(false);

        const audioContext =
          audioContextRef.current;

        const microphone =
          microphoneRef.current;

        const processor =
          processorRef.current;

        const analyser =
          analyserRef.current;

        if (microphone) {
          try {
            microphone.disconnect();
          } catch { }
        }

        if (analyser) {
          try {
            analyser.disconnect();
          } catch { }
        }

        if (processor) {
          try {
            processor.disconnect();
          } catch { }
        }

        if (streamRef.current) {
          streamRef.current
            .getTracks()
            .forEach(
              (track) =>
                track.stop()
            );

          streamRef.current =
            null;
        }

        const samples =
          audioSamplesRef.current;

        if (!samples.length) {
          setAudioError(
            "No audio was recorded. Please try again."
          );

          return;
        }

        let totalLength = 0;

        samples.forEach(
          (sample) => {
            totalLength +=
              sample.length;
          }
        );

        const mergedSamples =
          new Float32Array(
            totalLength
          );

        let offset = 0;

        samples.forEach(
          (sample) => {
            mergedSamples.set(
              sample,
              offset
            );

            offset +=
              sample.length;
          }
        );

        const sampleRate =
          audioContext?.sampleRate ||
          44100;

        const wavBlob =
          createWavBlob(
            mergedSamples,
            sampleRate
          );

        const wavURL =
          URL.createObjectURL(
            wavBlob
          );

        setAudioURL(wavURL);

        const dataURL =
          await blobToDataURL(
            wavBlob
          );

        setAudioData(
          dataURL
        );

        setAudioError("");

        console.log(
          "WAV recording created successfully."
        );

        console.log(
          "Audio size:",
          wavBlob.size,
          "bytes"
        );

        audioSamplesRef.current =
          [];

        if (audioContext) {
          try {
            await audioContext.close();
          } catch { }
        }

        audioContextRef.current =
          null;

        microphoneRef.current =
          null;

        processorRef.current =
          null;

        analyserRef.current =
          null;
      } catch (error) {
        console.error(
          "Stop recording error:",
          error
        );

        setAudioError(
          "The recording could not be completed. Please try again."
        );

        recordingRef.current =
          false;

        setRecording(false);
      }
    };

  /* =======================================================
     REMOVE AUDIO
     ORIGINAL AUDIO CODE - UNCHANGED
     ======================================================= */

  const removeRecording =
    () => {
      recordingRef.current =
        false;

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach(
            (track) =>
              track.stop()
          );

        streamRef.current =
          null;
      }

      if (
        audioURL?.startsWith(
          "blob:"
        )
      ) {
        try {
          URL.revokeObjectURL(
            audioURL
          );
        } catch { }
      }

      setAudioURL("");
      setAudioData("");
      setAudioError("");

      audioSamplesRef.current =
        [];
    };

  /* =======================================================
     RECORD AGAIN
     ORIGINAL AUDIO CODE - UNCHANGED
     ======================================================= */

  const recordAgain =
    async () => {
      removeRecording();

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            150
          )
      );

      startRecording();
    };

  /* =======================================================
     SAVE PROFILE
     ======================================================= */

  const saveProfile =
    () => {
      if (
        !studentName.trim()
      ) {
        setSaveMessage(
          "PLEASE ENTER THE STUDENT'S NAME."
        );

        return;
      }

      if (!studentAge) {
        setSaveMessage(
          "PLEASE ENTER THE STUDENT'S AGE."
        );

        return;
      }
      const ageNumber = Number(studentAge);

      if (
        !studentAge ||
        !Number.isInteger(ageNumber) ||
        ageNumber < 4 ||
        ageNumber > 11
      ) {
        setSaveMessage(
          "INVALID AGE. AGE MUST BE BETWEEN 4 AND 11."
        );

        return;
      }
      if (
        !["1", "2", "3", "4", "5"].includes(studentClass)
      ) {
        setSaveMessage(
          "PLEASE SELECT A GRADE FROM 1 TO 5."
        );

        return;
      }

      if (
        !parentName.trim()
      ) {
        setSaveMessage(
          "PLEASE ENTER THE PARENT OR GUARDIAN'S NAME."
        );

        return;
      }
      if (!/^\d{10}$/.test(parentPhone)) {
        setSaveMessage(
          "INVALID PHONE NUMBER. ENTER EXACTLY 10 DIGITS."
        );

        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          parentEmail.trim()
        )
      ) {
        setSaveMessage(
          "INVALID EMAIL FORMAT. PLEASE ENTER A VALID EMAIL ADDRESS."
        );

        return;
      }

      const isNewProfile = !activeProfileId;
      const profile = {
        id: activeProfileId || `profile_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        studentName: studentName.trim(),
        studentAge,
        studentClass,
        schoolName,
        parentName,
        parentPhone,
        parentEmail,
        studentPhoto,
        audioData,
        xp: 10,
        stars: 10,
        totalXp: 10,
        speed: "0%",
        spelling: "0%",
        recognition: "0%",
        phonological: "0%",
        streak: "0 Days",
        sessions: "0 Questions Completed",
        hours: "0.0 hrs",
        riskLevel: "New Explorer • Not Assessed Yet",
        riskColor: "#94a3b8",
        difficulty: "Standard baseline. Complete expeditions to generate clinical telemetry.",
        recommendedModule: "Module 01: Visual Perception & Direction",
        recommendedStageId: 1,
        savedAt: new Date().toISOString(),
      };

      try {
        const { active, all } = saveProfileToStore(profile);
        activeProfileIdRef.current = active.id;
        setAllProfiles(all);
        setActiveProfileId(active.id);

        if (isNewProfile) {
          // New profile: reset everything with 10 XP Stars and 0 performance
          localStorage.setItem(getProfilePerformanceKey(active.id), JSON.stringify(createEmptyStagePerformance()));
          localStorage.setItem(getProfileProgressKey(active.id), JSON.stringify(createEmptyLearningProgress()));
          localStorage.setItem(getProfileScoresKey(active.id), JSON.stringify(createInitialScores()));
          setStagePerformance(createEmptyStagePerformance());
          setSavedProgress(createEmptyLearningProgress());
          setStageScore(10);
          setStage2Score(10);
          setStage3Score(10);
          setStage4Score(10);
          setShapesScore(10);
          setCompScore(10);
        }

        setSaveMessage(
          "STUDENT PROFILE SAVED SUCCESSFULLY!"
        );

        setTimeout(() => {
          setScreen(
            "profileCreated"
          );

          setSaveMessage("");
        }, 700);
      } catch (error) {
        console.error(
          "Profile save error:",
          error
        );

        setSaveMessage(
          "COULD NOT SAVE THE PROFILE. THE PHOTO OR RECORDING MAY BE TOO LARGE."
        );
      }
    };

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const startProfileCreation =
    () => {
      setSaveMessage("");
      handleCreateNewProfile();
    };

  const startAnalysis =
    () => {
      setScreen("analysis");
    };

  const enterStages =
    () => {
      setScreen("stages");
    };

  const renderAppHeader = (activeScreenKey = screen) => {
    const currentScreenXp = userCtx ? userCtx.totalXp : (() => {
      switch (screen) {
        case "stage2": return stage2Score;
        case "stage3": return stage3Score;
        case "stage4": return stage4Score;
        case "shapes": return shapesScore;
        case "comprehension": return compScore;
        default: return stageScore;
      }
    })();


    return (
      <UniversalAppHeader
        currentScreen={activeScreenKey}
        onNavigate={(target) => {
          if (target === "stages") enterStages();
          else if (target === "profile") startProfileCreation();
          else if (target === "home") setScreen("home");
          else if (target === "login") setScreen("login");
          else if (target === "teacher" || target === "journal") setScreen("teacher");
          else if (target === "echo" || target === "auditory" || target === "stage2") enterStageTwo();
          else if (target === "reading" || target === "comprehension") enterComprehensionStage();
          else if (target === "stage1") enterStageOne();
          else if (target === "stage3") enterStageThree();
          else if (target === "stage4") enterStageFour();
          else if (target === "shapes") enterShapesStage();
          else setScreen(target);
        }}
        studentName={studentName}
        studentPhoto={studentPhoto}
        selectedClass={selectedClass}
        profiles={allProfiles}
        onSelectProfile={handleSelectProfile}
        onNewProfile={handleCreateNewProfile}
        studentXp={currentScreenXp}
        authUser={authUser}
        onOpenLogin={() => setScreen("login")}
        onSignOut={handleSignOut}
      />
    );
  };

  const showGladeTransition = (gladeKey) => {
    window.speechSynthesis?.cancel();
    setSelectedGladeKey(gladeKey);
    setScreen("levelTransition");
  };

  const launchCurrentGlade = (gladeKey = selectedGladeKey) => {
    window.speechSynthesis?.cancel();
    switch (gladeKey) {
      case "stage1":
        enterStageOne();
        break;
      case "stage2":
      case "echo":
        enterStageTwo();
        break;
      case "stage3":
        enterStageThree();
        break;
      case "stage4":
        enterStageFour();
        break;
      case "shapes":
        enterShapesStage();
        break;
      case "comprehension":
      case "reading":
        enterComprehensionStage();
        break;
      default:
        enterStageOne();
    }
  };

  const enterStageOne = () => {
    // Stage 1 uses the student's selected class.
    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);

    // Create a fresh copy WITHOUT changing the question IDs.
    const freshLevels =
      createShuffledStage1(classNumber);

    setPlayStage1Levels(freshLevels);

    let storedProgress = null;
    let parsed = null;

    try {
      const saved =
        localStorage.getItem(
          getActiveProgressKey()
        );

      parsed =
        saved ? JSON.parse(saved) : null;

      storedProgress =
        parsed?.stage1?.classes?.[
        String(classNumber)
        ] || createEmptyClassProgress();
    } catch {
      storedProgress =
        createEmptyClassProgress();
    }

    // Give the student the 10 XP starting bonus only when this
    // class has no saved Stage 1 progress yet.
    if (
      !storedProgress.started &&
      !storedProgress.completedQuestions &&
      !(storedProgress.completedQuestionIds?.length)
    ) {
      storedProgress = {
        ...createEmptyClassProgress(),
        ...storedProgress,
        xp: 10,
        started: true,
        savedAt: new Date().toISOString(),
      };

      try {
        const progressToSave =
          parsed || createEmptyLearningProgress();

        progressToSave.stage1.classes[String(classNumber)] =
          storedProgress;

        localStorage.setItem(
          getActiveProgressKey(),
          JSON.stringify(progressToSave)
        );
        setSavedProgress(progressToSave);
      } catch (error) {
        console.error("Could not save starting XP:", error);
      }
    }

    // Resume from the first unanswered question.
    let resumeLevel = 0;
    let resumeQuestion = 0;
    let foundUnanswered = false;

    for (
      let level = 0;
      level < freshLevels.length;
      level++
    ) {
      for (
        let question = 0;
        question <
        freshLevels[level].exercises.length;
        question++
      ) {
        const questionId =
          freshLevels[level].exercises[
            question
          ].id;

        if (
          !storedProgress.completedQuestionIds?.includes(
            questionId
          )
        ) {
          resumeLevel = level;
          resumeQuestion = question;
          foundUnanswered = true;
          break;
        }
      }

      if (foundUnanswered) {
        break;
      }
    }

    // If all 27 are already complete, show the report.
    if (!foundUnanswered) {
      setLevelIndex(2);
      setExerciseIndex(8);
      setStageAnswer("");
      setStageMessage("");
      setStageHint("");
      setHintUsed(false);
      const currentCumulative = userCtx ? userCtx.totalXp : (
        Number.isFinite(storedProgress.xp) && storedProgress.xp > 0
          ? storedProgress.xp
          : (storedProgress.correctQuestionIds?.length ? storedProgress.correctQuestionIds.length * 3 : 10)
      );
      setStageScore(currentCumulative);
      setCompletedQuestions(
        storedProgress.completedQuestions || 27
      );
      setCompletedLevelNumber(3);
      setScreen("stage1Report");
      return;
    }

    setLevelIndex(resumeLevel);
    setExerciseIndex(resumeQuestion);
    setStageAnswer("");
    setStageMessage("");
    setStageHint("");
    setHintUsed(false);
    const currentCumulative = userCtx ? userCtx.totalXp : (
      Number.isFinite(storedProgress.xp) && storedProgress.xp > 0
        ? storedProgress.xp
        : (storedProgress.correctQuestionIds?.length ? storedProgress.correctQuestionIds.length * 3 : 10)
    );
    setStageScore(currentCumulative);

    setCompletedQuestions(
      storedProgress.completedQuestions || 0
    );
    setCompletedLevelNumber(
      storedProgress.completedLevels?.length || 0
    );

    setScreen("stage1");
  };

  /* =======================================================
     ENTER STAGE 2
     ======================================================= */

  const enterStageTwo = () => {
    window.speechSynthesis?.cancel();

    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);
    setPlayStage2Levels(createShuffledStage2(classNumber));

    const currentCumulative = userCtx ? userCtx.totalXp : (stageScore || 10);
    setStage2LevelIndex(0);
    setStage2ExerciseIndex(0);
    setStage2Message("");
    setStage2SpokenText("");
    setStage2Accuracy(0);
    setStage2Listening(false);
    setStage2Score(currentCumulative);
    setStage2CorrectCount(0);
    stage2AnsweredQuestionsRef.current = new Set();
    setStage2Hint("");
    setStage2HintUsed(false);
    setStage2ShowHint(false);
    resetStagePerformance("stage2");

    setScreen("stage2");
  };

  /* =======================================================
     ENTER STAGE 3
     ======================================================= */

  const enterStageThree = () => {
    window.speechSynthesis?.cancel();

    if (stage2RecognitionRef.current) {
      try {
        stage2RecognitionRef.current.stop();
      } catch { }
    }

    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);
    setPlayStage3Levels(getStage3LevelsForClass(classNumber));
    const currentCumulative = userCtx ? userCtx.totalXp : (stage2Score || stageScore || 10);
    setStage3LevelIndex(0);
    setStage3ExerciseIndex(0);
    setStage3Answer("");
    setStage3Message("");
    setStage3Hint("");
    setStage3HintUsed(false);
    setStage3ShowHint(false);
    setStage3Score(currentCumulative);
    resetStagePerformance("stage3");
    if (questionMistakeTrackerRef.current) {
      Object.keys(questionMistakeTrackerRef.current).forEach((k) => {
        if (k.startsWith("stage3") || k.startsWith("c")) {
          delete questionMistakeTrackerRef.current[k];
        }
      });
    }
    setScreen("stage3");
  };


  /* =======================================================
     STAGE 4 — MATHS QUEST HANDLERS
     ======================================================= */

  const enterStageFour = () => {
    window.speechSynthesis?.cancel();

    if (stage2RecognitionRef.current) {
      try {
        stage2RecognitionRef.current.stop();
      } catch { }
    }

    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);
    const levels = createShuffledStage4(classNumber);
    setPlayStage4Levels(levels);

    const classProgress = getSavedStage4ClassProgress(classNumber);

    let resumeLevel = 0;
    let resumeQuestion = 0;
    let foundUnanswered = false;

    for (let l = 0; l < levels.length; l++) {
      for (let q = 0; q < levels[l].exercises.length; q++) {
        if (!classProgress.completedQuestionIds?.includes(levels[l].exercises[q].id)) {
          resumeLevel = l;
          resumeQuestion = q;
          foundUnanswered = true;
          break;
        }
      }
      if (foundUnanswered) break;
    }

    const currentCumulative = userCtx ? userCtx.totalXp : (classProgress.xp > 0 ? classProgress.xp : 10);

    if (!foundUnanswered && (classProgress.completedQuestions >= 30 || classProgress.stageCompleted)) {
      setStage4LevelIndex(2);
      setStage4ExerciseIndex(levels[2].exercises.length - 1);
      setStage4Score(currentCumulative);
      setScreen("stage4Report");
      return;
    }

    setStage4LevelIndex(resumeLevel);
    setStage4ExerciseIndex(resumeQuestion);
    setStage4Answer("");
    setStage4Message("");
    setStage4Hint("");
    setStage4HintUsed(false);
    setStage4EliminatedOptions([]);
    setStage4Score(currentCumulative);
    setScreen("stage4");

  };

  const answerStageFourQuestion = (selectedOption) => {
    if (stage4Message && stage4Message.includes("Correct")) {
      return;
    }

    const currentLevel = playStage4Levels[stage4LevelIndex];
    const currentExercise = currentLevel?.exercises[stage4ExerciseIndex];
    if (!currentExercise) return;

    const isCorrect = selectedOption === currentExercise.answer;
    setStage4Answer(selectedOption);

    const classProgress = getSavedStage4ClassProgress(selectedClass);
    const alreadyCorrect = classProgress.correctQuestionIds?.includes(currentExercise.id);

    const nextXP = isCorrect && !alreadyCorrect ? stage4Score + 3 : stage4Score;
    setStage4Score(nextXP);
    if (isCorrect && !alreadyCorrect && userCtx) {
      userCtx.awardXp(3);
    }

    saveStage4QuestionProgress(selectedClass, currentLevel.id, currentExercise, isCorrect, nextXP);
    recordStagePerformance("stage4", isCorrect, currentExercise, selectedOption);

    if (isCorrect) {
      setStage4Message("Correct! +3 XP earned.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance("Correct answer! Great job!");
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    } else {
      setStage4Message("Incorrect. Try again or consult the hint.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance("That's not quite right. Try again or use a hint!");
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    }
  };

  const getMathHint = (exercise) => {
    if (exercise && exercise.hint) {
      return exercise.hint;
    }
    if (!exercise || !exercise.question) {
      return "Read the numbers carefully and break the question down step-by-step.";
    }
    const q = exercise.question;
    const qLower = q.toLowerCase();

    // Shape checks (if shapes appear in maths bank)
    const shapeMap = [
      { key: "round with no corners", hint: "A circle curves continuously with no corners or straight edges, like a coin." },
      { key: "3 sides", hint: "'Tri' means three! A triangle has 3 straight sides and 3 corners." },
      { key: "4 equal sides", hint: "A square has 4 sides that are all the exact same length." },
      { key: "night sky", hint: "Look for a star shape, which has 5 shiny points." },
      { key: "door or a book", hint: "A rectangle has 4 straight sides: two long sides and two short sides." },
      { key: "love and friendship", hint: "A heart shape has two rounded curves at the top and meets at a point at the bottom." },
      { key: "egg", hint: "An oval is curved like a circle, but gently elongated." },
      { key: "kite", hint: "A diamond (rhombus) is tilted on its corner like a kite in the breeze." },
      { key: "pizza", hint: "A whole uncut pizza is round like a circle." },
      { key: "watermelon", hint: "A wedge slice of watermelon has 3 straight edges meeting in a triangle." },
      { key: "screen", hint: "Phone, tablet, and TV screens are rectangular." },
      { key: "chessboard", hint: "A chessboard is perfectly square with 4 identical sides." },
      { key: "wheel", hint: "Wheels are circular so they can roll smoothly without bumping." },
      { key: "starfish", hint: "Starfish have 5 arms spreading out in a star shape." },
      { key: "storybook", hint: "Books have two long sides and two short sides: a rectangle." },
      { key: "strawberry", hint: "Strawberries narrow down to a point, resembling a heart." },
      { key: "sides does a triangle", hint: "'Tri' means 3! A triangle always has 3 sides." },
      { key: "corners does a square", hint: "A square has 4 corners (vertices), each forming a 90° right angle." },
      { key: "straight sides does a circle", hint: "A circle is a smooth continuous curve with 0 straight sides." },
      { key: "sides does a rectangle", hint: "Count the borders: 2 long + 2 short = 4 sides in total." },
      { key: "5 straight sides", hint: "'Penta' means five: a 5-sided shape is a pentagon." },
      { key: "stretched circle", hint: "An oval (ellipse) looks like a circle gently pulled outward." },
      { key: "slanted sides", hint: "A 4-sided shape with slanted equal sides is a diamond or rhombus." },
      { key: "6 straight sides", hint: "'Hexa' means six: a 6-sided polygon is a hexagon." },
      { key: "wall clock", hint: "Standard wall clocks are round circles so the hands can sweep around evenly." },
      { key: "brick", hint: "Bricks have two long sides and two short sides: a rectangle." },
      { key: "road hazard", hint: "Road warning signs use 3 pointed corners to make a triangle." },
      { key: "playing dice", hint: "A cube has 6 flat square faces (top, bottom, and 4 sides)." },
      { key: "honeybee", hint: "Bees build 6-sided hexagons because they pack together with zero wasted space." },
      { key: "rugby ball", hint: "A rugby ball is curved and elongated like an oval." },
      { key: "rhombus", hint: "A rhombus is a four-sided quadrilateral where all 4 sides are equal." },
      { key: "currency note", hint: "Paper currency notes are shaped like rectangles." },
      { key: "equal in length", hint: "In a regular square, all four sides have the exact same length." },
      { key: "equal and parallel", hint: "In a rectangle, opposite sides run parallel and have the same length." },
      { key: "equilateral", hint: "'Equi' means equal: an equilateral triangle has 3 equal sides." },
      { key: "corners does a pentagon", hint: "A pentagon has 5 sides and 5 corners." },
      { key: "sides does a hexagon", hint: "'Hex' means six: a hexagon has 6 straight sides." },
      { key: "outside edge of a circle", hint: "The distance around the outside curved edge of a circle is called its circumference." },
      { key: "circumference", hint: "The distance around the outside curved edge of a circle is called its circumference." },
      { key: "stop sign", hint: "'Octo' means 8: an 8-sided polygon is an octagon." },
      { key: "6 flat square faces", hint: "A 3D box with 6 square faces is a cube." },
      { key: "round like an orange", hint: "A 3D ball that is round from every direction is a sphere." },
      { key: "cylinder", hint: "A cylinder has two flat circular faces connected by a smooth curved tube." },
      { key: "drinking glass", hint: "A drinking glass has the 3D shape of a cylinder." },
      { key: "soda can", hint: "A soda can has the 3D shape of a cylinder." },
      { key: "ice-cream cone", hint: "A cone has a circular base that narrows up to a single point." },
      { key: "vertices) does a cube", hint: "4 corners on top and 4 corners on the bottom = 8 corners in a cube." },
      { key: "circular faces does a cylinder", hint: "A cylinder has 2 flat circular ends (top and bottom)." },
      { key: "stacked", hint: "Spheres roll off each other because they touch at only a single point." },
      { key: "triangular sides meeting at a point", hint: "A pyramid has sloping triangular sides meeting at a top apex." },
      { key: "two equal sides", hint: "An isosceles triangle has exactly two equal sides (legs)." },
      { key: "4-sided closed shape", hint: "'Quad' means four: any 4-sided closed shape is a quadrilateral." },
      { key: "center of a circle to its outer edge", hint: "A line from the center point to the outer edge is the radius." },
      { key: "two matching halves", hint: "A line of symmetry cuts a shape into two mirror-image halves." },
      { key: "all 3 angles inside any triangle", hint: "The three interior angles of any triangle always add up to 180 degrees." },
      { key: "opposite parallel sides", hint: "A 4-sided shape with both pairs of opposite sides parallel is a parallelogram." },
      { key: "triangles make up a hexagon", hint: "Six equilateral triangles fit together around a center point to form a hexagon." },
      { key: "edges does a cube have", hint: "4 top edges + 4 bottom edges + 4 vertical edges = 12 edges in a cube." },
      { key: "flatter at the", hint: "Earth's daily spin causes it to flatten slightly at the North and South Poles." },
      { key: "cross-section", hint: "Slicing horizontally through a cylinder creates a flat circle." },
      { key: "funnel", hint: "A funnel tapers down from wide to narrow in a conical shape (cone)." },
      { key: "square pyramid has a square base", hint: "One triangular wall rises from each of the 4 edges of the base: 4 triangular faces." },
      { key: "folds up into a 3d shape", hint: "A flat 2D pattern that folds into a 3D solid is called its net." },
      { key: "both roll smoothly and slide flat", hint: "A cylinder rolls on its curved body and slides on its flat circular face." },
      { key: "sphere have", hint: "A sphere has zero flat faces, zero edges, and zero corners (0)." },
      { key: "right angle", hint: "A perpendicular right angle forms a square corner measuring exactly 90 degrees." },
      { key: "right-angled triangle", hint: "Any triangle containing a 90° right angle is a right-angled triangle." },
      { key: "completely across a circle", hint: "A straight line crossing completely through the center from edge to edge is the diameter." },
      { key: "interior angles of a regular hexagon", hint: "Total interior angles equal (6 - 2) × 180° = 720°. Divided by 6 corners = 120 degrees each." },
      { key: "regular octagon with 5 cm", hint: "Perimeter is all 8 sides added: 8 sides × 5 cm = 40 cm." },
      { key: "regular pentagon have", hint: "'Penta' means five: a regular pentagon consists of 5 equal sides." },
      { key: "area of a rectangle", hint: "Area measures the flat space inside. Multiply Length by Width: Length × Width." },
      { key: "never cross", hint: "Lines that run side by side and never intersect are parallel lines." },
      { key: "cube with side length 3", hint: "Volume of a cube is side × side × side: 3 × 3 × 3 = 27 cm³." },
      { key: "maximum volume with minimum surface area", hint: "A sphere encloses the greatest volume inside the smallest surface area." },
      { key: "volume of a cylinder", hint: "Multiply the flat circular base area (πr²) by the Height of the cylinder." },
      { key: "volcanoes", hint: "Erupting lava and ash build up into a cone shape." },
      { key: "edges does a square pyramid", hint: "4 base edges + 4 sloping edges = 8 edges in a square pyramid." },
      { key: "graphene", hint: "Carbon atoms in graphene bond in a 6-sided hexagonal honeycomb lattice." },
      { key: "total surface area is 24", hint: "A cube has 6 identical square faces: divide 24 cm² by 6 = 4 cm²." },
      { key: "grain silos", hint: "Round cylindrical walls distribute outward grain pressure smoothly without corner stress." }
    ];

    for (let i = 0; i < shapeMap.length; i++) {
      if (qLower.includes(shapeMap[i].key)) {
        return shapeMap[i].hint;
      }
    }

    // Fractions arithmetic check (must run before integers)
    const fracMatch = q.match(/(\d+\/\d+)\s*([+\-*/])\s*(\d+\/\d+)/);
    if (fracMatch) {
      const op = fracMatch[2];
      if (op === "+") {
        return "Fraction Addition Strategy: When denominators are equal, keep the denominator and add the numerators. If different, find a common denominator first.";
      }
      if (op === "-") {
        return "Fraction Subtraction Strategy: When denominators are equal, keep the denominator and subtract the numerators.";
      }
    }

    // Decimals arithmetic check (must run before integers)
    const decMatch = q.match(/(\d+\.\d+)\s*([+\-*/])\s*(\d+\.\d+)/);
    if (decMatch) {
      const op = decMatch[2];
      if (op === "+") {
        return "Decimal Addition Strategy: Line up the decimal points vertically. Add column by column from right to left (hundredths, tenths, ones), carrying over when needed.";
      }
      if (op === "-") {
        return "Decimal Subtraction Strategy: Line up the decimal points vertically. Subtract column by column from right to left, borrowing from the left column when needed.";
      }
    }

    // Clean commas from multi-digit numbers for accurate pattern matching
    const cleanQ = q.replace(/,/g, '');

    // 1. Addition
    const addMatch = cleanQ.match(/(\d+)\s*\+\s*(\d+)/);
    if (addMatch) {
      const a = parseInt(addMatch[1], 10);
      const b = parseInt(addMatch[2], 10);
      const bigger = Math.max(a, b);
      const smaller = Math.min(a, b);
      if (bigger >= 100) {
        return "Column Addition Strategy: Line up digits by place value (ones, tens, hundreds, thousands). Add column-by-column from right to left, carrying over when a sum reaches 10 or more.";
      }
      return `Addition Strategy: Start at ${bigger} (the larger number) and count forward ${smaller} more steps, or add the units and tens columns.`;
    }

    // 2. Subtraction
    const subMatch = cleanQ.match(/(\d+)\s*-\s*(\d+)/);
    if (subMatch) {
      const a = parseInt(subMatch[1], 10);
      const b = parseInt(subMatch[2], 10);
      if (a >= 100) {
        return "Column Subtraction Strategy: Align numbers by place value. Subtract column by column from right to left, borrowing (regrouping) from the left column when a top digit is smaller than the bottom digit.";
      }
      return `Subtraction Strategy: Start with ${a} and take away ${b}, or ask: what number added to ${b} makes ${a}?`;
    }

    // 3. Multiplication
    const mulMatch = cleanQ.match(/(\d+)\s*[×*x]\s*(\d+)/);
    if (mulMatch) {
      const a = parseInt(mulMatch[1], 10);
      const b = parseInt(mulMatch[2], 10);
      if (a >= 20 || b >= 20) {
        return "Multiplication Strategy: Break large numbers into tens and ones (e.g. 45 × 12 = 45 × 10 + 45 × 2), or use vertical grid multiplication.";
      }
      return `Multiplication Strategy: Think of equal groups: ${a} groups of ${b}, or add ${a} repeated ${b} times.`;
    }

    // 4. Division
    const divMatch = cleanQ.match(/(\d+)\s*[÷/]\s*(\d+)/);
    if (divMatch) {
      const a = parseInt(divMatch[1], 10);
      const b = parseInt(divMatch[2], 10);
      return `Division Strategy: How many times does ${b} fit equally into ${a}? Think: ${b} × what = ${a}?`;
    }

    // 5. Sequence
    if (qLower.includes("comes after")) {
      const num = q.match(/\d+/);
      return num ? `Count forward by 1: start at ${num[0]} and take one step forward.` : "Count forward by 1 from the given number.";
    }
    if (qLower.includes("comes before")) {
      const num = q.match(/\d+/);
      return num ? `Count backward by 1: what number comes right before ${num[0]}?` : "Count backward by 1 from the given number.";
    }
    if (qLower.includes("complete:") || qLower.includes("comes next") || qLower.includes("pattern")) {
      return "Pattern Strategy: Look at the jump between neighboring numbers to find what is being added or multiplied each step.";
    }

    // 6. Comparison
    if (qLower.includes("greater") || qLower.includes("largest") || qLower.includes("biggest")) {
      return "Comparison Strategy: Compare the tens digit first; if they are the same, compare the ones digit to find the largest value.";
    }
    if (qLower.includes("smaller") || qLower.includes("smallest") || qLower.includes("least")) {
      return "Comparison Strategy: Look for the number with the smallest value, checking the highest place value first.";
    }

    // 7. Place Value
    if (qLower.includes("place value")) {
      return "Place Value Strategy: Look at where the digit sits: Units (1s), Tens (10s), Hundreds (100s), or Thousands (1000s).";
    }

    // 8. Fractions
    if (qLower.includes("half")) {
      return "Fraction Strategy: 'Half' means dividing the number into two equal parts (divide by 2).";
    }
    if (qLower.includes("quarter")) {
      return "Fraction Strategy: 'One quarter' (1/4) means dividing into four equal parts (divide by 4).";
    }
    if (qLower.includes("fraction")) {
      return "Fraction Strategy: The bottom number (denominator) is total equal parts; the top number (numerator) is parts counted.";
    }

    // 9. Percentages
    if (q.includes("%") || qLower.includes("percent")) {
      return "Percentage Strategy: Percent means 'out of 100'. 10% is dividing by 10, 25% is dividing by 4, and 50% is half.";
    }

    // 10. Geometry & Measurement inside Maths
    if (qLower.includes("perimeter")) {
      return "Perimeter Strategy: The perimeter is the total distance around the outside edge. Add the lengths of all sides together!";
    }
    if (qLower.includes("area")) {
      return "Area Strategy: Area is the flat surface covered inside. For a rectangle or square, multiply Length × Width.";
    }
    if (qLower.includes("volume")) {
      return "Volume Strategy: Volume measures 3D capacity. For a box or cube, multiply Length × Width × Height.";
    }
    if (qLower.includes("minute") && qLower.includes("hour")) {
      return "Time Strategy: Remember that there are 60 minutes in 1 whole hour.";
    }
    if (qLower.includes("hour") && qLower.includes("day")) {
      return "Time Strategy: There are 24 hours in one complete day.";
    }
    if (qLower.includes("centimetre") || qLower.includes("metre")) {
      return "Measurement Strategy: Remember: 1 metre (m) equals 100 centimetres (cm).";
    }
    if (qLower.includes("gram") || qLower.includes("kilogram")) {
      return "Measurement Strategy: Remember: 1 kilogram (kg) equals 1,000 grams (g).";
    }
    if (q.includes("₹") || qLower.includes("spend") || qLower.includes("cost") || qLower.includes("remain") || qLower.includes("left") || qLower.includes("pencil")) {
      return "Word Problem Strategy: Read the story: find what you start with, and whether items are being added, subtracted, or grouped.";
    }
    if (qLower.includes("average")) {
      return "Average Strategy: Add all the numbers together first, then divide that total by how many numbers there are.";
    }
    if (qLower.includes("factor")) {
      return "Factor Strategy: A factor is a whole number that divides into the target number evenly with no remainder.";
    }
    if (qLower.includes("double")) {
      return "Double Strategy: 'Double' means multiplying the number by 2 (or adding the number to itself).";
    }

    // 11. Language questions in Maths Bank
    if (qLower.includes("arrange")) {
      return "Spelling Strategy: Sound out the letters in order: first consonant sound, middle vowel sound, and ending sound.";
    }
    if (qLower.includes("makes sense")) {
      return "Sentence Strategy: Read each option aloud. A correct sentence has clear word order and makes complete sense.";
    }
    if (qLower.includes("rhymes")) {
      return "Rhyming Strategy: Listen for the ending vowel and consonant sound: words rhyme when their endings sound identical.";
    }
    if (qLower.includes("starts with") || qLower.includes("beginning sound")) {
      return "Phonics Strategy: Say the word aloud slowly and focus on the very first sound at the start of your mouth.";
    }
    if (qLower.includes("ends with")) {
      return "Phonics Strategy: Say the word aloud slowly and listen for the last sound at the end.";
    }
    if (qLower.includes("spelled correctly")) {
      return "Spelling Strategy: Sound out each syllable carefully and watch out for silent letters or tricky vowels.";
    }
    if (qLower.includes("long a") || qLower.includes("long e")) {
      return "Vowel Strategy: A long vowel says its own name (like 'ay' in cake or 'ee' in tree).";
    }
    if (qLower.includes("silent e")) {
      return "Phonics Strategy: Look for an 'e' at the end of the word that is quiet but changes the preceding vowel.";
    }
    if (qLower.includes("syllables")) {
      return "Syllable Strategy: Clap each beat in the word to count the syllables (like win-dow = 2 claps).";
    }
    if (qLower.includes("alphabetical order")) {
      return "Alphabet Strategy: Compare the first letter of each word to find which comes next in the A-Z alphabet.";
    }

    return "Read the numbers carefully, break the problem into simple steps, and check which option matches.";
  };

  const getStage3Hint = (exercise) => {
    if (!exercise) return "Look carefully at the letters and sound out the word.";
    const p = (exercise.prompt || exercise.question || "").toLowerCase();

    if (p.includes("comes after")) {
      const match = p.match(/after\s+([a-z])/i);
      const letter = match ? match[1].toUpperCase() : "the letter";
      return `Recite the alphabet: A, B, C, D... What letter comes right after ${letter}?`;
    }
    if (p.includes("comes before")) {
      const match = p.match(/before\s+([a-z])/i);
      const letter = match ? match[1].toUpperCase() : "the letter";
      return `Recite the alphabet: A, B, C, D... What letter comes right before ${letter}?`;
    }
    if (p.includes("complete") || p.includes("_")) {
      return "Sound out the word phonetically to see which vowel or letter makes a real, sensible word.";
    }
    if (p.includes("starts with") || p.includes("beginning sound")) {
      return "Say each word aloud slowly and listen to the very first sound at the start.";
    }
    if (p.includes("rhymes")) {
      return "Listen for words with the same ending sound (like cat and bat, or tree and bee).";
    }
    if (p.includes("spelled correctly")) {
      return "Read each option slowly and check each letter to see which one looks and sounds correctly spelled.";
    }
    if (p.includes("made from")) {
      return "Blend the letter sounds together from left to right to discover the word.";
    }
    if (p.includes("makes sense")) {
      return "Read each sentence aloud to check which one follows correct grammar and makes logical sense.";
    }
    if (p.includes("opposite")) {
      return "Think of the reverse meaning (for example: hot and cold, big and small).";
    }
    if (p.includes("noun")) {
      return "A noun is a naming word for a person, place, animal, or thing.";
    }
    if (p.includes("verb")) {
      return "A verb is an action word that tells what someone or something is doing.";
    }
    if (p.includes("adjective")) {
      return "An adjective is a describing word that tells us what something looks, feels, or behaves like.";
    }

    if (p.includes("comes next") || p.includes("comes after")) {
      return "Notice the sequence pattern and identify what follows logically.";
    }
    if (p.includes("cause") || p.includes("effect")) {
      return "Think about what caused the event to happen and what resulted from it.";
    }
    if (p.includes("odd") || p.includes("belong")) {
      return "Look at what group or category the words belong to and find the one that is different.";
    }
    if (p.includes("title")) {
      return "The best title sums up the main theme or topic of the whole passage.";
    }
    if (p.includes("conclusion")) {
      return "A conclusion is what we can logically decide based on what was read.";
    }
    if (p.includes("fact") || p.includes("opinion")) {
      return "A fact can be proven true, while an opinion expresses personal feelings or thoughts.";
    }
    if (p.includes("first") || p.includes("next") || p.includes("last")) {
      return "Think about the correct order of steps from beginning to end.";
    }
    if (p.includes("compare")) {
      return "Comparing means looking at what is similar and what is different.";
    }
    if (p.includes("infer")) {
      return "Inferring means using clues in the text to figure out something not stated directly.";
    }
    if (p.includes("punctuation")) {
      return "Punctuation marks show pauses, stops, and help make sentence meaning clear.";
    }

    return "Look carefully at the word, sound out each letter, and think about the meaning.";
  };

  const useStage3Hint = () => {
    if (stage3HintUsed) {
      setStage3ShowHint(true);
      return;
    }

    if (stage3Score < 5) {
      setStage3Message("You need at least 5 XP to use a hint.");
      setStage3ShowHint(false);
      return;
    }

    const level = stage3Bank[stage3LevelIndex];
    const exercise = level?.exercises?.[stage3ExerciseIndex];

    const newXP = Math.max(0, stage3Score - 5);
    setStage3Score(newXP);
    setStage3HintUsed(true);
    const hintText = getStage3Hint(exercise);
    setStage3Hint(hintText);
    setStage3ShowHint(true);
    setStage3Message("");
    recordHintUsed("stage3");
    persistScores({ stage3: newXP });
  };

  const useStageFourHint = () => {
    if (stage4HintUsed) {
      setStage4ShowHint(true);
      return;
    }

    if (stage4Score < 5) {
      setStage4Message("You need at least 5 XP to unlock a hint.");
      setStage4ShowHint(false);
      return;
    }

    const currentLevel = playStage4Levels[stage4LevelIndex];
    const currentExercise = currentLevel?.exercises[stage4ExerciseIndex];
    if (!currentExercise) return;

    const newXP = Math.max(0, stage4Score - 5);
    setStage4Score(newXP);
    if (userCtx) userCtx.spendXp(5);
    setStage4HintUsed(true);
    setStage4EliminatedOptions([]);
    const hintText = getMathHint(currentExercise);
    setStage4Hint(hintText);
    setStage4ShowHint(true);
    setStage4Message("");
    setStage4Answer("");

    saveStage4QuestionProgress(selectedClass, currentLevel.id, currentExercise, false, newXP);
    persistScores({ stage4: newXP });
    recordHintUsed("stage4");
  };

  const nextStageFourExercise = () => {
    window.speechSynthesis?.cancel();

    const currentLevel = playStage4Levels[stage4LevelIndex];
    if (!currentLevel) return;

    const isLastQuestionOfLevel = stage4ExerciseIndex === currentLevel.exercises.length - 1;

    if (!isLastQuestionOfLevel) {
      setStage4ExerciseIndex((prev) => prev + 1);
      setStage4Answer("");
      setStage4Message("");
      setStage4Hint("");
      setStage4HintUsed(false);
      setStage4EliminatedOptions([]);
      setStage4ShowHint(false);
      return;
    }

    if (stage4LevelIndex < playStage4Levels.length - 1) {
      setStage4LevelIndex((prev) => prev + 1);
      setStage4ExerciseIndex(0);
      setStage4Answer("");
      setStage4Message("");
      setStage4Hint("");
      setStage4HintUsed(false);
      setStage4EliminatedOptions([]);
      setStage4ShowHint(false);
      return;
    }

    // All 3 levels completed
    setScreen("stage4Report");
  };

  const restartStageFour = () => {
    const confirmed = window.confirm(
      `Restart Number Ninja Temple for Class ${selectedClass}? Your saved Maths progress for this class will be cleared.`
    );
    if (!confirmed) return;

    window.speechSynthesis?.cancel();

    const classKey = String(selectedClass);
    let currentProgress;
    try {
      currentProgress = JSON.parse(localStorage.getItem(getActiveProgressKey()) || "{}");
    } catch {
      currentProgress = createEmptyLearningProgress();
    }

    if (!currentProgress.stage4?.classes) {
      currentProgress.stage4 = { classes: {} };
    }

    currentProgress.stage4.classes[classKey] = {
      completedQuestionIds: [],
      correctQuestionIds: [],
      completedQuestions: 0,
      completedLevels: [],
      xp: 10,
      totalQuestions: 30,
      stageCompleted: false,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(getActiveProgressKey(), JSON.stringify(currentProgress));
    setSavedProgress(currentProgress);
    persistScores({ stage4: 10 });

    setPlayStage4Levels(createShuffledStage4(selectedClass));
    setStage4LevelIndex(0);
    setStage4ExerciseIndex(0);
    setStage4Answer("");
    setStage4Message("");
    setStage4Hint("");
    setStage4HintUsed(false);
    setStage4ShowHint(false);
    setStage4EliminatedOptions([]);
    setStage4Score(10);
    resetStagePerformance("stage4");
    setScreen("stage4");
  };

  /* =======================================================
     STAGE 5 — SHAPES QUEST HANDLERS
     ======================================================= */

  const enterShapesStage = () => {
    window.speechSynthesis?.cancel();

    if (stage2RecognitionRef.current) {
      try {
        stage2RecognitionRef.current.stop();
      } catch { }
    }

    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);
    const levels = createShuffledShapes(classNumber);
    setPlayShapesLevels(levels);

    const classProgress = getSavedShapesClassProgress(classNumber);

    let resumeLevel = 0;
    let resumeQuestion = 0;
    let foundUnanswered = false;

    for (let l = 0; l < levels.length; l++) {
      for (let q = 0; q < levels[l].exercises.length; q++) {
        if (!classProgress.completedQuestionIds?.includes(levels[l].exercises[q].id)) {
          resumeLevel = l;
          resumeQuestion = q;
          foundUnanswered = true;
          break;
        }
      }
      if (foundUnanswered) break;
    }

    const currentCumulative = userCtx ? userCtx.totalXp : (classProgress.xp > 0 ? classProgress.xp : 10);

    if (!foundUnanswered && (classProgress.completedQuestions >= 16 || classProgress.stageCompleted)) {
      setShapesLevelIndex(1);
      setShapesExerciseIndex(levels[1].exercises.length - 1);
      setShapesScore(currentCumulative);
      setScreen("shapesReport");
      return;
    }

    setShapesLevelIndex(resumeLevel);
    setShapesExerciseIndex(resumeQuestion);
    setShapesAnswer("");
    setShapesMessage("");
    setShapesHint("");
    setShapesHintUsed(false);
    setShapesEliminatedOptions([]);
    setShowShapeFact(false);
    setShapesScore(currentCumulative);
    setScreen("shapes");

  };

  const answerShapesQuestion = (selectedOption) => {
    if (shapesMessage && shapesMessage.includes("Correct")) {
      return;
    }

    const currentLevel = playShapesLevels[shapesLevelIndex];
    const currentExercise = currentLevel?.exercises[shapesExerciseIndex];
    if (!currentExercise) return;

    const isCorrect = selectedOption === currentExercise.answer;
    setShapesAnswer(selectedOption);

    const classProgress = getSavedShapesClassProgress(selectedClass);
    const alreadyCorrect = classProgress.correctQuestionIds?.includes(currentExercise.id);

    const nextXP = isCorrect && !alreadyCorrect ? shapesScore + 3 : shapesScore;
    setShapesScore(nextXP);
    if (isCorrect && !alreadyCorrect && userCtx) {
      userCtx.awardXp(3);
    }

    saveShapesQuestionProgress(selectedClass, currentLevel.id, currentExercise, isCorrect, nextXP);
    recordStagePerformance("shapes", isCorrect, currentExercise, selectedOption);

    // Show the fun shape fact upon answering
    setShowShapeFact(true);

    if (isCorrect) {
      setShapesMessage("Correct! +3 XP earned.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance("Correct answer! Great job!");
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    } else {
      setShapesMessage("Incorrect. Try again or consult the hint.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance("That's not quite right. Try again or check the shape fact!");
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    }
  };

  const useShapesHint = () => {
    if (shapesHintUsed) {
      setShapesShowHint(true);
      return;
    }

    if (shapesScore < 5) {
      setShapesMessage("You need at least 5 XP to unlock a hint.");
      setShapesShowHint(false);
      return;
    }

    const currentLevel = playShapesLevels[shapesLevelIndex];
    const currentExercise = currentLevel?.exercises[shapesExerciseIndex];
    if (!currentExercise) return;

    const newXP = Math.max(0, shapesScore - 5);
    setShapesScore(newXP);
    if (userCtx) userCtx.spendXp(5);
    setShapesHintUsed(true);
    setShapesEliminatedOptions([]);
    const hintText = currentExercise.hint || "Look at the shape's sides, corners, and real-world examples to find the answer.";
    setShapesHint(hintText);
    setShapesShowHint(true);
    setShapesMessage("");
    setShapesAnswer("");

    saveShapesQuestionProgress(selectedClass, currentLevel.id, currentExercise, false, newXP);
    persistScores({ shapes: newXP });
    recordHintUsed("shapes");
  };

  const nextShapesExercise = () => {
    window.speechSynthesis?.cancel();

    const currentLevel = playShapesLevels[shapesLevelIndex];
    if (!currentLevel) return;

    const isLastQuestionOfLevel = shapesExerciseIndex === currentLevel.exercises.length - 1;

    if (!isLastQuestionOfLevel) {
      setShapesExerciseIndex((prev) => prev + 1);
      setShapesAnswer("");
      setShapesMessage("");
      setShapesHint("");
      setShapesHintUsed(false);
      setShapesEliminatedOptions([]);
      setShowShapeFact(false);
      setShapesShowHint(false);
      return;
    }

    if (shapesLevelIndex < playShapesLevels.length - 1) {
      setShapesLevelIndex((prev) => prev + 1);
      setShapesExerciseIndex(0);
      setShapesAnswer("");
      setShapesMessage("");
      setShapesHint("");
      setShapesHintUsed(false);
      setShapesEliminatedOptions([]);
      setShowShapeFact(false);
      setShapesShowHint(false);
      return;
    }

    // Both levels completed
    setScreen("shapesReport");
  };

  /* =======================================================
       MODULE 06 — READING COMPREHENSION HANDLERS
       ======================================================= */

  const readPassageAloud = (textToRead) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(textToRead);
      utt.rate = 0.85;
      window.speechSynthesis.speak(utt);
    }
  };

  const readQuestionAloud = (textToRead) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(textToRead);
      utt.rate = 0.88;
      window.speechSynthesis.speak(utt);
    }
  };

  const enterComprehensionStage = () => {
    window.speechSynthesis?.cancel();

    if (stage2RecognitionRef.current) {
      try {
        stage2RecognitionRef.current.stop();
      } catch { }
    }

    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);
    const levels = getComprehensionLevelsForClass(classNumber);
    setPlayComprehensionLevels(levels);

    const classProgress = getSavedComprehensionClassProgress(classNumber);

    let resumeLevel = 0;
    let resumeQuestion = 0;
    let foundUnanswered = false;

    for (let l = 0; l < levels.length; l++) {
      for (let q = 0; q < levels[l].questions.length; q++) {
        if (!classProgress.completedQuestionIds?.includes(levels[l].questions[q].id)) {
          resumeLevel = l;
          resumeQuestion = q;
          foundUnanswered = true;
          break;
        }
      }
      if (foundUnanswered) break;
    }

    const totalQuestions = levels.reduce((sum, l) => sum + l.questions.length, 0);
    if (!foundUnanswered && (classProgress.completedQuestions >= totalQuestions || classProgress.stageCompleted)) {
      setCompLevelIndex(levels.length - 1);
      setCompQuestionIndex(levels[levels.length - 1].questions.length - 1);
      setCompScore(classProgress.xp > 0 ? classProgress.xp : 10);
      setScreen("comprehensionReport");
      return;
    }

    setCompLevelIndex(resumeLevel);
    setCompQuestionIndex(resumeQuestion);
    setCompAnswer("");
    setCompMessage("");
    setCompHint("");
    setCompHintUsed(false);
    setCompScore(classProgress.xp > 0 ? classProgress.xp : 10);
    setScreen("comprehension");
  };

  const answerComprehensionQuestion = (selectedOption) => {
    if (compMessage && compMessage.includes("Correct")) {
      return;
    }

    const currentLevel = playComprehensionLevels[compLevelIndex];
    const currentQuestion = currentLevel?.questions?.[compQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setCompAnswer(selectedOption);

    const classProgress = getSavedComprehensionClassProgress(selectedClass);
    const alreadyCorrect = classProgress.correctQuestionIds?.includes(currentQuestion.id);

    const nextXP = isCorrect && !alreadyCorrect ? compScore + 3 : compScore;
    setCompScore(nextXP);

    saveComprehensionQuestionProgress(selectedClass, currentLevel.id, currentQuestion, isCorrect, nextXP);
    recordStagePerformance("comprehension", isCorrect, currentQuestion, selectedOption);

    if (isCorrect) {
      setCompMessage("Correct! +3 XP earned.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance("Correct answer! Great job!");
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    } else {
      setCompMessage("Incorrect. Check the passage text or unlock the hint.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance("That's not quite right. Look back at the passage or consult the hint.");
        utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    }
  };

  const useComprehensionHint = () => {
    if (compHintUsed) {
      setCompShowHint(true);
      return;
    }

    if (compScore < 5) {
      setCompMessage("You need at least 5 XP to unlock a hint.");
      setCompShowHint(false);
      return;
    }

    const currentLevel = playComprehensionLevels[compLevelIndex];
    const currentQuestion = currentLevel?.questions?.[compQuestionIndex];
    if (!currentQuestion) return;

    const newXP = Math.max(0, compScore - 5);
    setCompScore(newXP);
    setCompHintUsed(true);
    const hintText = currentQuestion.hint || "Review the paragraph above to locate the clue for this question.";
    setCompHint(hintText);
    setCompShowHint(true);
    setCompMessage("");
    setCompAnswer("");

    saveComprehensionQuestionProgress(selectedClass, currentLevel.id, currentQuestion, false, newXP);
    persistScores({ comprehension: newXP });
    recordHintUsed("comprehension");
  };

  const nextComprehensionExercise = () => {
    window.speechSynthesis?.cancel();

    const currentLevel = playComprehensionLevels[compLevelIndex];
    if (!currentLevel) return;

    const isLastQuestionOfLevel = compQuestionIndex === currentLevel.questions.length - 1;

    if (!isLastQuestionOfLevel) {
      setCompQuestionIndex((prev) => prev + 1);
      setCompAnswer("");
      setCompMessage("");
      setCompHint("");
      setCompHintUsed(false);
      setCompShowHint(false);
      return;
    }

    if (compLevelIndex < playComprehensionLevels.length - 1) {
      setCompLevelIndex((prev) => prev + 1);
      setCompQuestionIndex(0);
      setCompAnswer("");
      setCompMessage("");
      setCompHint("");
      setCompHintUsed(false);
      setCompShowHint(false);
      return;
    }

    // Both levels completed
    setScreen("comprehensionReport");
  };

  const restartComprehensionStage = () => {
    const confirmed = window.confirm(
      `Restart Reading Comprehension for Class ${selectedClass}? Your saved comprehension progress for this class will be reset.`
    );
    if (!confirmed) return;

    window.speechSynthesis?.cancel();

    const classKey = String(selectedClass);
    let currentProgress;
    try {
      currentProgress = JSON.parse(localStorage.getItem(getActiveProgressKey()) || "{}");
    } catch {
      currentProgress = createEmptyLearningProgress();
    }

    if (!currentProgress.comprehension?.classes) {
      currentProgress.comprehension = { classes: {} };
    }

    currentProgress.comprehension.classes[classKey] = {
      completedQuestionIds: [],
      correctQuestionIds: [],
      completedQuestions: 0,
      completedLevels: [],
      xp: 10,
      stageCompleted: false,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(getActiveProgressKey(), JSON.stringify(currentProgress));
    setSavedProgress(currentProgress);
    persistScores({ comprehension: 10 });

    const levels = getComprehensionLevelsForClass(selectedClass);
    setPlayComprehensionLevels(levels);
    setCompLevelIndex(0);
    setCompQuestionIndex(0);
    setCompAnswer("");
    setCompMessage("");
    setCompHint("");
    setCompHintUsed(false);
    setCompScore(10);
    resetStagePerformance("comprehension");
    setScreen("comprehension");
  };

  const restartShapesStage = () => {
    const confirmed = window.confirm(
      `Restart Shapes Quest for Class ${selectedClass}? Your saved Shapes progress for this class will be cleared.`
    );
    if (!confirmed) return;

    window.speechSynthesis?.cancel();

    const classKey = String(selectedClass);
    let currentProgress;
    try {
      currentProgress = JSON.parse(localStorage.getItem(getActiveProgressKey()) || "{}");
    } catch {
      currentProgress = createEmptyLearningProgress();
    }

    if (!currentProgress.shapes?.classes) {
      currentProgress.shapes = { classes: {} };
    }

    currentProgress.shapes.classes[classKey] = {
      completedQuestionIds: [],
      correctQuestionIds: [],
      completedQuestions: 0,
      completedLevels: [],
      xp: 10,
      totalQuestions: 16,
      stageCompleted: false,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(getActiveProgressKey(), JSON.stringify(currentProgress));
    setSavedProgress(currentProgress);
    persistScores({ shapes: 10 });

    setPlayShapesLevels(createShuffledShapes(selectedClass));
    setShapesLevelIndex(0);
    setShapesExerciseIndex(0);
    setShapesAnswer("");
    setShapesMessage("");
    setShapesHint("");
    setShapesHintUsed(false);
    setShapesEliminatedOptions([]);
    setShowShapeFact(false);
    setShapesScore(10);
    resetStagePerformance("shapes");
    setScreen("shapes");
  };


  /* =======================================================
     PLAY MODEL READING
     ======================================================= */

  const playStage2Model = () => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    const exercise =
      playStage2Levels[
        stage2LevelIndex
      ]?.exercises[
      stage2ExerciseIndex
      ];

    if (!exercise) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        exercise.text
      );

    utterance.rate =
      exercise.type === "paragraph"
        ? 0.65
        : exercise.type === "sentence"
          ? 0.72
          : 0.78;

    utterance.pitch = 1.05;
    utterance.volume = 1;

    window.speechSynthesis.speak(
      utterance
    );
  };

  const getStage2Hint = (exercise) => {
    if (!exercise) return "Speak clearly into your microphone!";
    return exercise.hint || (exercise.text ? `Take a slow, deep breath. Break "${exercise.text}" into simple syllables and say each part clearly!` : "Speak clearly into your microphone!");
  };

  const useStage2Hint = () => {
    if (stage2HintUsed) {
      setStage2ShowHint(true);
      return;
    }

    if (stage2Score < 5) {
      setStage2Message("You need at least 5 XP to unlock a hint.");
      setStage2ShowHint(false);
      return;
    }

    const level = playStage2Levels[stage2LevelIndex];
    const exercise = level?.exercises?.[stage2ExerciseIndex];

    const newXP = Math.max(0, stage2Score - 5);
    setStage2Score(newXP);
    if (userCtx) userCtx.spendXp(5);
    setStage2HintUsed(true);
    const hintText = getStage2Hint(exercise);
    setStage2Hint(hintText);
    setStage2ShowHint(true);
    setStage2Message("");
    recordHintUsed("stage2");
    persistScores({ stage2: newXP });
  };

  /* =======================================================
     START PRONUNCIATION CHECK
     ======================================================= */

  const startPronunciationCheck = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStage2SpeechUnavailable(true);
      setStage2Message(
        "Microphone speech service is unavailable in this browser. Practice reading aloud and tap 'I Read It Aloud' below!"
      );
      return;
    }

    const exercise =
      playStage2Levels[
        stage2LevelIndex
      ]?.exercises[
      stage2ExerciseIndex
      ];

    if (!exercise) {
      return;
    }

    window.speechSynthesis?.cancel();

    if (stage2RecognitionRef.current) {
      try {
        stage2RecognitionRef.current.stop();
      } catch { }
    }

    const recognition =
      new SpeechRecognition();

    stage2RecognitionRef.current =
      recognition;

    recognition.lang = navigator.language || "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    setStage2Message(
      "Listening... Please speak clearly into the microphone."
    );

    setStage2SpokenText("");
    setStage2Accuracy(0);
    setStage2Listening(true);

    recognition.onresult = (event) => {
      let bestSpoken = "";
      let bestAccuracy = 0;
      const results = event.results?.[0];

      if (results) {
        for (let i = 0; i < results.length; i++) {
          const transcript = results[i]?.transcript || "";
          const acc = calculateReadingAccuracy(exercise.text, transcript);
          if (acc > bestAccuracy || i === 0) {
            bestAccuracy = acc;
            bestSpoken = transcript;
          }
        }
      }

      setStage2SpokenText(bestSpoken);
      setStage2Accuracy(bestAccuracy);
      setStage2Listening(false);

      if (bestAccuracy >= 70) {
        setStage2Message(
          "Accurate match! Your oral reading matched the target text."
        );
        const qKey = `${stage2LevelIndex}_${stage2ExerciseIndex}`;
        if (!stage2AnsweredQuestionsRef.current.has(qKey)) {
          stage2AnsweredQuestionsRef.current.add(qKey);
          setStage2CorrectCount((previous) => previous + 1);
        }
        setStage2Score((previous) => previous + 1);
        if (userCtx) userCtx.awardXp(1);
        recordStagePerformance("stage2", true, exercise, bestSpoken);
      } else {
        setStage2Message(
          "Good attempt! Practice speaking clearly, or tap 'I Read It Aloud' below to accept."
        );
        recordStagePerformance("stage2", false, exercise, bestSpoken);
      }
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setStage2Listening(false);

      switch (event.error) {
        case "not-allowed":
        case "service-not-allowed":
          setStage2SpeechUnavailable(true);
          setStage2Message(
            "Microphone permission is paused. Practice reading aloud and tap 'I Read It Aloud' below!"
          );
          break;

        case "audio-capture":
          setStage2SpeechUnavailable(true);
          setStage2Message(
            "Microphone not detected. Practice reading aloud and tap 'I Read It Aloud' below!"
          );
          break;

        case "no-speech":
          setStage2Message(
            "No audio detected. Please speak closer to the microphone or tap 'I Read It Aloud' below."
          );
          break;

        case "network":
          setStage2SpeechUnavailable(true);
          setStage2Message(
            "Live speech service is offline. No worries! Read aloud and tap 'I Read It Aloud' to continue."
          );
          break;

        case "aborted":
          break;

        default:
          setStage2SpeechUnavailable(true);
          setStage2Message(
            "Speech recognition encountered an issue. Read aloud and tap 'I Read It Aloud' to claim XP!"
          );
          break;
      }
    };

    recognition.onend = () => {
      setStage2Listening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Could not start speech recognition:",
        error
      );

      setStage2Listening(false);
      setStage2SpeechUnavailable(true);
      setStage2Message(
        "Could not connect to microphone. Read aloud and tap 'I Read It Aloud' to continue."
      );
    }
  };

  const handleToggleListening = () => {
    if (stage2Listening) {
      if (stage2RecognitionRef.current) {
        try {
          stage2RecognitionRef.current.stop();
        } catch { }
      }
      setStage2Listening(false);
    } else {
      startPronunciationCheck();
    }
  };

  const acceptStage2ReadingManually = () => {
    setStage2Accuracy(100);
    setStage2Message("Accurate reading accepted! +1 XP earned.");
    const qKey = `${stage2LevelIndex}_${stage2ExerciseIndex}`;
    if (!stage2AnsweredQuestionsRef.current.has(qKey)) {
      stage2AnsweredQuestionsRef.current.add(qKey);
      setStage2CorrectCount((previous) => previous + 1);
    }
    setStage2Score((previous) => previous + 1);
    if (userCtx) userCtx.awardXp(1);
    const exercise = playStage2Levels[stage2LevelIndex]?.exercises?.[stage2ExerciseIndex];
    if (exercise) {
      recordStagePerformance("stage2", true, exercise, stage2SpokenText || exercise.text);
    }
  };


  /* =======================================================
     NEXT STAGE 2 EXERCISE
     ======================================================= */

  const nextStage2Exercise = () => {
    window.speechSynthesis?.cancel();

    if (stage2RecognitionRef.current) {
      try {
        stage2RecognitionRef.current.stop();
      } catch { }
    }

    const level =
      playStage2Levels[
      stage2LevelIndex
      ];

    if (
      stage2ExerciseIndex <
      level.exercises.length - 1
    ) {
      setStage2ExerciseIndex(
        (previous) =>
          previous + 1
      );

      setStage2Message("");
      setStage2SpokenText("");
      setStage2Accuracy(0);
      setStage2Hint("");
      setStage2HintUsed(false);
      setStage2ShowHint(false);

      return;
    }

    /*
      Current level completed.
      SAVE PROGRESS.
    */

    const completedLevel =
      stage2LevelIndex + 1;

    const totalStage2Questions =
      playStage2Levels.reduce(
        (total, item) =>
          total +
          item.exercises.length,
        0
      );

    const completedQuestions =
      playStage2Levels
        .slice(
          0,
          completedLevel
        )
        .reduce(
          (total, item) =>
            total +
            item.exercises.length,
          0
        );

    const oldProgress =
      JSON.parse(
        localStorage.getItem(
          getActiveProgressKey()
        ) || "{}"
      );

    const updatedProgress = {
      ...oldProgress,

      stage2: {
        completedLevels:
          Array.from(
            {
              length:
                completedLevel,
            },
            (_, index) =>
              index + 1
          ),

        completedQuestions,

        totalQuestions:
          totalStage2Questions,
      },
    };

    localStorage.setItem(
      getActiveProgressKey(),
      JSON.stringify(
        updatedProgress
      )
    );

    setSavedProgress(
      updatedProgress
    );

    /*
      Move to next level.
    */

    if (
      stage2LevelIndex <
      playStage2Levels.length - 1
    ) {
      setStage2LevelIndex(
        (previous) =>
          previous + 1
      );

      setStage2ExerciseIndex(0);
      setStage2Message("");
      setStage2SpokenText("");
      setStage2Accuracy(0);
      setStage2Hint("");
      setStage2HintUsed(false);
      setStage2ShowHint(false);

      return;
    }

    /*
      ALL STAGE 2 LEVELS COMPLETE.
    */

    setScreen(
      "stage2Report"
    );
  };
  const restartStageOne =
    () => {
      const confirmed =
        window.confirm(
          `RESTART EAGLE EYE ISLAND FOR CLASS ${selectedClass} FROM THE BEGINNING? YOUR SAVED PROGRESS FOR THIS CLASS WILL BE CLEARED.`
        );

      if (!confirmed) {
        return;
      }

      window.speechSynthesis?.cancel();

      const classKey =
        String(selectedClass);

      let currentProgress;

      try {
        currentProgress =
          JSON.parse(
            localStorage.getItem(
              getActiveProgressKey()
            ) || "{}"
          );
      } catch {
        currentProgress =
          createEmptyLearningProgress();
      }

      if (
        !currentProgress.stage1?.classes
      ) {
        currentProgress =
          createEmptyLearningProgress();
      }

      const resetClassProgress = {
        ...createEmptyClassProgress(),
        xp: 10,
        started: true,
        savedAt: new Date().toISOString(),
      };

      const updatedProgress = {
        ...currentProgress,
        stage1: {
          ...currentProgress.stage1,
          classes: {
            ...currentProgress.stage1.classes,
            [classKey]:
              resetClassProgress,
          },
        },
      };

      localStorage.setItem(
        getActiveProgressKey(),
        JSON.stringify(
          updatedProgress
        )
      );

      setSavedProgress(
        updatedProgress
      );
      persistScores({ stage1: 10 });

      setPlayStage1Levels(
        createShuffledStage1(
          selectedClass
        )
      );

      setLevelIndex(0);
      setExerciseIndex(0);
      setStageAnswer("");
      setStageMessage("");
      setStageHint("");
      setHintUsed(false);
      setStageScore(10);
      setCompletedQuestions(0);
      setCompletedLevelNumber(0);
      resetStagePerformance("stage1");

      setScreen("stage1");
    };

  /* =======================================================
     PREVIOUS QUESTION
     ======================================================= */

  const goBackQuestion =
    () => {
      window.speechSynthesis?.cancel();

      if (exerciseIndex > 0) {
        setExerciseIndex(
          (previous) =>
            previous - 1
        );

        setStageAnswer("");
        setStageMessage("");
        setStageHint("");
        setHintUsed(false);
        setStage1ShowHint(false);

        return;
      }

      if (levelIndex > 0) {
        const previousLevelIndex =
          levelIndex - 1;

        setLevelIndex(
          previousLevelIndex
        );

        setExerciseIndex(
          playStage1Levels[
            previousLevelIndex
          ].exercises.length - 1
        );

        setStageAnswer("");
        setStageMessage("");
        setStageHint("");
        setHintUsed(false);
        setStage1ShowHint(false);

        return;
      }

      setStageAnswer("");
      setStageMessage("");
      setStageHint("");
      setHintUsed(false);
      setStage1ShowHint(false);
    };

  /* =======================================================
     HINT SYSTEM
     ======================================================= */

  const getStage1Hint = (exercise) => {
    if (!exercise) {
      return "LOOK CAREFULLY AT THE TARGET AND COMPARE ALL THE OPTIONS.";
    }

    if (exercise.type === "uppercase") {
      return "LOOK CAREFULLY AT THE CAPITAL LETTER'S SHAPE AND COMPARE IT WITH EACH OPTION.";
    }

    if (exercise.type === "lowercase") {
      return "LOOK FOR THE CAPITAL LETTER THAT HAS THE SAME SHAPE AS THE SMALL LETTER.";
    }

    if (exercise.type === "mixed") {
      return "THE TWO LETTERS BELONG TO THE SAME LETTER PAIR. FOCUS ON THEIR SHAPE, NOT THEIR SIZE.";
    }

    if (exercise.type === "letter") {
      return "COMPARE THE LETTERS ONE BY ONE. CHECK THEIR ORDER AND THEIR SHAPES CAREFULLY.";
    }

    if (exercise.type === "word") {
      return "COMPARE THE WORDS LETTER BY LETTER. CHECK THE FIRST, MIDDLE AND LAST LETTERS.";
    }

    if (exercise.type === "sentence") {
      return "COMPARE THE SENTENCE WORD BY WORD. CHECK LETTER ORDER, SPACES AND PUNCTUATION.";
    }

    return "COMPARE THE TARGET WITH EACH OPTION CAREFULLY. LOOK FOR THE OPTION THAT MATCHES EXACTLY.";
  };

  const useStage1Hint = () => {
    if (hintUsed) {
      setStage1ShowHint(true);
      return;
    }

    if (stageScore < 5) {
      setStageMessage(
        "You need at least 5 XP to unlock a hint."
      );
      setStage1ShowHint(false);
      return;
    }

    const level =
      playStage1Levels[levelIndex];

    const exercise =
      level?.exercises[exerciseIndex];

    if (!exercise) {
      return;
    }

    const newXP =
      Math.max(0, stageScore - 5);

    setStageScore(newXP);
    if (userCtx) userCtx.spendXp(5);
    setStageHint(
      getStage1Hint(exercise)
    );
    setHintUsed(true);
    setStage1ShowHint(true);
    recordHintUsed("stage1");

    setStageMessage("");
    setStageAnswer("");

    // Save the XP deduction immediately.
    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);

    const classKey =
      String(classNumber);

    try {
      const rawSaved =
        localStorage.getItem(
          getActiveProgressKey()
        );

      const progress =
        rawSaved
          ? JSON.parse(rawSaved)
          : createEmptyLearningProgress();

      if (!progress.stage1?.classes) {
        return;
      }

      const classProgress = {
        ...createEmptyClassProgress(),
        ...(progress.stage1.classes[classKey] || {}),
      };

      progress.stage1.classes[classKey] = {
        ...classProgress,
        xp: newXP,
        savedAt:
          new Date().toISOString(),
      };

      localStorage.setItem(
        getActiveProgressKey(),
        JSON.stringify(progress)
      );

      setSavedProgress(progress);
      persistScores({ stage1: newXP });
    } catch (error) {
      console.error(
        "Could not save hint XP:",
        error
      );
    }
  };

  /* =======================================================
     ANSWER QUESTION
     ======================================================= */

  const answerStageQuestion =
    (answer) => {
      // Correct answers lock the question.
      // Incorrect answers remain retryable.
      if (
        stageMessage &&
        stageMessage.includes("Correct")
      ) {
        return;
      }

      const classNumber = getNormalizedClassNumber(studentClass || selectedClass);

      const level =
        playStage1Levels[
        levelIndex
        ];

      const exercise =
        level?.exercises[
        exerciseIndex
        ];

      if (!exercise) {
        return;
      }

      const isCorrect =
        answer === exercise.answer;

      setStageAnswer(answer);

      // XP is earned for a correct answer and is reduced by hints.
      // Each question awards 3 XP only once, even after retries.
      const alreadyCorrect =
        savedProgress?.stage1?.classes?.[
          String(classNumber)
        ]?.correctQuestionIds?.includes(
          exercise.id
        );

      const nextXP =
        isCorrect && !alreadyCorrect
          ? stageScore + 3
          : stageScore;

      setStageScore(nextXP);
      if (isCorrect && !alreadyCorrect && userCtx) {
        userCtx.awardXp(3);
      }

      // SAVE IMMEDIATELY — before moving to the next question.
      // Wrong answers are also saved as completed.
      saveStage1QuestionProgress(
        classNumber,
        level.id,
        exercise,
        isCorrect,
        nextXP
      );

      recordStagePerformance("stage1", isCorrect, exercise, answer);

      if (isCorrect) {
        setStageMessage(
          "Correct! Well done."
        );
      } else {
        // Never reveal the correct answer after a wrong attempt.
        setStageMessage(
          "Incorrect. Try again or use a hint for 5 XP."
        );
      }
    };

  /* =======================================================
     NEXT QUESTION
     ======================================================= */

  const nextExercise =
    () => {
      window.speechSynthesis?.cancel();

      const level =
        playStage1Levels[
        levelIndex
        ];

      if (!level) {
        return;
      }

      const isLastQuestionOfLevel =
        exerciseIndex ===
        level.exercises.length - 1;

      if (!isLastQuestionOfLevel) {
        setExerciseIndex(
          (previous) =>
            previous + 1
        );

        setStageAnswer("");
        setStageMessage("");
        setStageHint("");
        setHintUsed(false);
        setStage1ShowHint(false);

        return;
      }

      // The last question of this level has already been
      // saved by answerStageQuestion().
      setCompletedLevelNumber(
        level.id
      );

      if (
        levelIndex <
        playStage1Levels.length - 1
      ) {
        setScreen("levelReport");
        return;
      }

      // All 3 levels are complete.
      setScreen("stage1Report");
    };

  /* =======================================================
     RESET PROFILE
     ======================================================= */

  const resetProfile =
    () => {
      const confirmed =
        window.confirm(
          "ARE YOU SURE YOU WANT TO DELETE THE STUDENT PROFILE AND ALL SAVED INFORMATION?"
        );

      if (!confirmed) {
        return;
      }

      removeRecording();

      if (activeProfileId) {
        localStorage.removeItem(getProfilePerformanceKey(activeProfileId));
        localStorage.removeItem(getProfileProgressKey(activeProfileId));
        localStorage.removeItem(getProfileScoresKey(activeProfileId));
      }
      localStorage.removeItem("dyslexia_student_profile");
      localStorage.removeItem("dyslexiaQuestProgress");
      localStorage.removeItem("dyslexiaQuestPerformance");

      setSavedProgress(
        createEmptyLearningProgress()
      );

      setStudentName("");
      setStudentAge("");
      setStudentClass("");
      setSchoolName("");

      setParentName("");
      setParentPhone("");
      setParentEmail("");

      setStudentPhoto("");

      setLevelIndex(0);
      setExerciseIndex(0);
      setStageScore(10);
      setCompletedQuestions(0);
      setCompletedLevelNumber(0);
      setStageAnswer("");
      setStageMessage("");
      setStageHint("");
      setHintUsed(false);
      setStage1ShowHint(false);
      setStage2ShowHint(false);
      setStage3ShowHint(false);
      setStage4ShowHint(false);
      setShapesShowHint(false);
      setCompShowHint(false);

      setStage2LevelIndex(0);
      setStage2ExerciseIndex(0);
      setStage2Message("");
      setStage2SpokenText("");
      setStage2Accuracy(0);
      setStage2Listening(false);
      setStage2Score(10);
      setPlayStage2Levels(createShuffledStage2(selectedClass));

      setStage3LevelIndex(0);
      setStage3ExerciseIndex(0);
      setStage3Message("");
      setStage3Answer("");
      setStage3Hint("");
      setStage3HintUsed(false);
      setStage3Score(10);

      setStage4LevelIndex(0);
      setStage4ExerciseIndex(0);
      setStage4Score(10);
      setStage4Answer("");
      setStage4Message("");
      setStage4Hint("");
      setStage4HintUsed(false);
      setStage4EliminatedOptions([]);
      setPlayStage4Levels(createShuffledStage4(selectedClass));

      setShapesLevelIndex(0);
      setShapesExerciseIndex(0);
      setShapesScore(10);
      setShapesAnswer("");
      setShapesMessage("");
      setShapesHint("");
      setShapesHintUsed(false);
      setShapesEliminatedOptions([]);
      setShowShapeFact(false);
      setPlayShapesLevels(createShuffledShapes(selectedClass));

      setCompLevelIndex(0);
      setCompQuestionIndex(0);
      setCompScore(10);
      setCompAnswer("");
      setCompMessage("");
      setCompHint("");
      setCompHintUsed(false);
      setPlayComprehensionLevels(getComprehensionLevelsForClass(selectedClass));

      setScreen("home");
    };

  // Synchronize URL hash with current screen for deep linking and testing
  useEffect(() => {
    const handleHash = () => {
      if (isInternalNavRef.current) {
        isInternalNavRef.current = false;
        return;
      }
      const h = window.location.hash.replace("#", "").trim();
      if (!h || h === "home") {
        setScreen("home");
        return;
      }
      if (h === "teacher" || h === "journal" || h === "guide") {
        setScreen("teacher");
      } else if (h === "analysis") {
        setScreen("analysis");
      } else if (h === "levelTransition" || h === "leveltransition" || h === "transition") {
        setScreen("levelTransition");
      } else if (h === "privacy" || h === "privacypolicy" || h === "privacy-policy") {
        setScreen("privacy");
      } else if (h === "terms" || h === "termsconditions" || h === "terms-and-conditions" || h === "tos") {
        setScreen("terms");
      } else if (h === "login" || h === "signin" || h === "signup") {
        setScreen("login");
      } else if (h === "verifyEmail" || h === "verifyemail") {
        setScreen("verifyEmail");
      } else if (h === "stages") {
        enterStages();
      } else if (h === "profile") {
        startProfileCreation();
      } else if (h === "profileCreated") {
        setScreen("profileCreated");
      } else if (h === "home") {
        setScreen("home");
      } else if (h === "stage1" || h === "visual" || h === "eagle") {
        enterStageOne();
      } else if (h === "stage1Report") {
        setScreen("stage1Report");
      } else if (h === "stage2" || h === "echo" || h === "echosanctuary" || h === "echo-sanctuary" || h === "auditory" || h === "auditoryprocessing") {
        enterStageTwo();
      } else if (h === "stage2Report") {
        setScreen("stage2Report");
      } else if (h === "stage3" || h === "anagram" || h === "vineweaver") {
        enterStageThree();
      } else if (h === "stage3Report") {
        setScreen("stage3Report");
      } else if (h === "stage4" || h === "math" || h === "maths" || h === "maths-jutsu") {
        enterStageFour();
      } else if (h === "stage4Report") {
        setScreen("stage4Report");
      } else if (h === "shapes" || h === "geometry" || h === "sunstone") {
        enterShapesStage();
      } else if (h === "shapesReport") {
        setScreen("shapesReport");
      } else if (h === "comprehension" || h === "reading" || h === "reading-comprehension" || h === "storyteller") {
        enterComprehensionStage();
      } else if (h === "comprehensionReport") {
        setScreen("comprehensionReport");
      } else if (h === "levelReport") {
        setScreen("levelReport");
      } else if (h === "404" || h === "notFound" || h === "notfound") {
        setScreen("notFound");
      } else {
        setScreen("notFound");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "").trim();
    if (screen && currentHash !== screen) {
      isInternalNavRef.current = true;
      window.location.hash = screen;
    }
  }, [screen]);

  /* =======================================================
     HOME PAGE
     ======================================================= */
  /* =======================================================
     REALM 2 — ECHO VALLEY (VOICE & READING SAFARI)
     ======================================================= */

  if (screen === "stage2") {
    const validLevels = (Array.isArray(playStage2Levels) && playStage2Levels.length > 0)
      ? playStage2Levels
      : createShuffledStage2(selectedClass || 1);
    const safeLevelIndex = Math.min(Math.max(0, stage2LevelIndex), validLevels.length - 1);
    const level = validLevels[safeLevelIndex] || validLevels[0];
    const safeExercises = (level && Array.isArray(level.exercises) && level.exercises.length > 0)
      ? level.exercises
      : [{ id: 1, text: "Listen carefully and speak clearly", prompt: "Speak aloud into the crystal", type: "word" }];
    const safeExerciseIndex = Math.min(Math.max(0, stage2ExerciseIndex), safeExercises.length - 1);
    const exercise = safeExercises[safeExerciseIndex];

    const totalQuestions = validLevels.reduce(
      (total, item) => total + (item?.exercises?.length || 0),
      0
    ) || 1;

    const completedBefore = validLevels
      .slice(0, safeLevelIndex)
      .reduce((total, item) => total + (item?.exercises?.length || 0), 0) + safeExerciseIndex;

    const currentCompleted = completedBefore + (stage2Message && stage2SpokenText ? 1 : 0);
    const overallProgress = Math.min(100, Math.round((currentCompleted / totalQuestions) * 100));

    const levelExercisesCount = level?.exercises?.length || 1;
    const levelCompleted = safeExerciseIndex + (stage2Message && stage2SpokenText ? 1 : 0);
    const levelProgress = Math.min(100, Math.round((levelCompleted / levelExercisesCount) * 100));

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <div className="page">

          <div className="top-bar">

            <button
              className="back-button"
              onClick={() => {
                window.speechSynthesis?.cancel();

                if (
                  stage2RecognitionRef.current
                ) {
                  try {
                    stage2RecognitionRef.current.stop();
                  } catch { }
                }

                setScreen("stages");
              }}
            >
              ← STAGES
            </button>

            <div className="score-display">
              {stage2Score} XP
            </div>

          </div>

          <section className="stage-card">

            <p className="eyebrow">
              Class {selectedClass} • Module 02: Auditory Processing
            </p>

            <h1>
              Auditory Processing & Reading Aloud
            </h1>

            <p className="stage-description">
              VOICE & READING SAFARI — SPEAK ALOUD AND UNLOCK THE MYSTERIES OF SOUND!
            </p>

            {/* CURRENT LEVEL DISPLAY */}

            <div className="current-level-display">
              <span className="current-level-pill">
                Level {stage2LevelIndex + 1} • {formatDifficulty(level.difficulty)}
              </span>
            </div>

            {/* READING EXERCISE */}

            <div className="exercise-card">

              <div className="exercise-header">

                <span className="exercise-type">
                  Module 02: {exercise.type === "word" ? "Word" : exercise.type === "sentence" ? "Sentence" : "Paragraph"}
                </span>

                <span className="question-level-badge">
                  Level {stage2LevelIndex + 1} • {formatDifficulty(level.difficulty)}
                </span>

                <span>
                  QUESTION {stage2ExerciseIndex + 1} / {level.exercises.length}
                </span>

              </div>

              <h2>
                READ THIS ALOUD
              </h2>

              {/* TARGET TEXT */}

              <div
                className={
                  exercise.type ===
                    "paragraph"
                    ? "reading-paragraph"
                    : "reading-target"
                }
              >
                {exercise.text}
              </div>

              {/* MODEL AUDIO */}

              <button
                type="button"
                className="secondary-button"
                onClick={
                  playStage2Model
                }
              >
                Play Audio Model
              </button>

              <p className="listening-hint">
                LISTEN TO THE MODEL FIRST
                IF YOU NEED HELP.
              </p>

              {/* CHILD READING */}

              <div className="reading-record-box">

                <div className="listen-icon">
                  <IconMic size={28} />
                </div>

                <h3>
                  NOW YOU READ
                </h3>

                <p>
                  PRESS THE BUTTON AND
                  READ THE TEXT ALOUD.
                </p>

                <button
                  type="button"
                  className={
                    stage2Listening
                      ? "stop-button listening-active-btn"
                      : "primary-button"
                  }
                  onClick={
                    handleToggleListening
                  }
                  title={stage2Listening ? "Click to stop listening and check reading" : "Click to speak aloud"}
                >
                  {stage2Listening
                    ? "■ Stop Listening"
                    : <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><IconMic size={16} /> Read Aloud</span>}
                </button>

                {stage2Listening && (
                  <div className="mic-active-banner">
                    <span className="pulsing-mic-dot" />
                    <span>Listening... Speak clearly into your mic!</span>
                  </div>
                )}

                {/* Self-Check Oral Reading Fallback Button */}
                <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={acceptStage2ReadingManually}
                    className="btn-accept-reading"
                    style={{ fontSize: "0.88rem", padding: "8px 16px" }}
                    title="Read aloud and tap here to verify and claim your star"
                  >
                    <IconCheck size={16} /> I Read It Aloud (Self-Check & Claim XP)
                  </button>
                  <span style={{ fontSize: "0.78rem", color: "#15803d", fontWeight: "600" }}>
                    Prefer reading aloud at your own pace? Tap above anytime!
                  </span>
                </div>

              </div>

              {/* SPEECH RESULT */}

              {stage2SpokenText && (
                <div className="spoken-result">

                  <h3>
                    WHAT I HEARD
                  </h3>

                  <p>
                    "{stage2SpokenText}"
                  </p>

                  <div className="reading-accuracy">

                    <strong>
                      {stage2Accuracy}%
                    </strong>

                    <span>
                      READING MATCH
                    </span>

                  </div>

                </div>
              )}

              {/* FEEDBACK */}

              {stage2Message && (
                <div
                  className={
                    stage2Accuracy >= 65
                      ? "feedback correct-feedback"
                      : "feedback wrong-feedback"
                  }
                >
                  {stage2Message}
                </div>
              )}

              {/* FALLBACK NOTICE CARD WHEN MIC IS OFFLINE */}
              {stage2SpeechUnavailable && (
                <div className="stage2-fallback-card">
                  <h4>Oral Reading Mode Active</h4>
                  <p>
                    Take your time, read the text aloud clearly, and tap below when you are ready to claim your star!
                  </p>
                  <div className="stage2-fallback-actions">
                    <button
                      type="button"
                      className="btn-accept-reading"
                      onClick={acceptStage2ReadingManually}
                    >
                      <IconCheck size={16} /> I Read It Aloud (Accept & Continue)
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={startPronunciationCheck}
                    >
                      <IconRefresh size={14} /> Retry Microphone
                    </button>
                  </div>
                </div>
              )}

              {/* RETRY OR ACCEPT */}

              {stage2Message &&
                stage2Accuracy < 65 && !stage2SpeechUnavailable && (
                  <div className="stage2-action-row" style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "16px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        setStage2Message("");
                        setStage2SpokenText("");
                        setStage2Accuracy(0);
                      }}
                    >
                      <IconRefresh size={14} /> Try Again
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      style={{ background: "#16a34a", borderColor: "#15803d", padding: "10px 18px" }}
                      onClick={acceptStage2ReadingManually}
                      title="If you spoke clearly but the mic misheard, click here to accept your reading"
                    >
                      <IconCheck size={14} /> I Read It Clearly (Accept)
                    </button>
                  </div>
                )}

              {/* DEDICATED COMPANION AREA (BELOW ANSWERS) */}
              <div className="companion-bottom-bar">
                <div
                  className="companion-avatar-wrap"
                  onClick={() => {
                    if (stage2ShowHint) {
                      setStage2ShowHint(false);
                    } else if (stage2HintUsed) {
                      setStage2ShowHint(true);
                    } else {
                      useStage2Hint();
                    }
                  }}
                  title="Click Rio the Echo Parrot for a pronunciation clue!"
                >
                  <RioParrot size="small" />
                </div>

                <div className="companion-dialogue-col">
                  {stage2ShowHint ? (
                    <div className="companion-dialogue-bubble">
                      <div className="dialogue-header">
                        <span className="companion-name-tag">
                          <IconLightbulb size={14} /> Rio's Echo Clue
                        </span>
                        <button
                          type="button"
                          className="btn-dismiss-hint"
                          onClick={() => setStage2ShowHint(false)}
                        >
                          ✕ Hide
                        </button>
                      </div>
                      <p className="dialogue-message">
                        {stage2Hint || (exercise ? `Take a slow, deep breath. Break "${exercise.text}" into simple syllables and say each part clearly!` : "Speak clearly into your microphone!")}
                      </p>
                    </div>
                  ) : (
                    <div className="companion-idle-bar">
                      <button
                        type="button"
                        className="btn-request-hint"
                        onClick={useStage2Hint}
                      >
                        <IconLightbulb size={16} /> Need a Hint from Rio?
                      </button>
                      <span className="companion-idle-subtext">
                        {stage2Score < 5 && !stage2HintUsed
                          ? `You need at least 5 XP to unlock a hint. (Current: ${stage2Score} XP)`
                          : "Rio is listening attentively. Tap if you want pronunciation tips!"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* NEXT */}

              {stage2Accuracy >= 65 && (
                <button
                  type="button"
                  className="save-button next-button"
                  onClick={
                    nextStage2Exercise
                  }
                >
                  {stage2LevelIndex ===
                    playStage2Levels.length - 1 &&
                    stage2ExerciseIndex ===
                    level.exercises.length - 1
                    ? "Complete Module 2"
                    : "NEXT READING →"}
                </button>
              )}

            </div>

          </section>

        </div>
      </div>
    );
  }
  /* =======================================================
     REALM 2 PROGRESS REPORT — ECHO VALLEY
     ======================================================= */

  if (screen === "stage2Report") {
    const totalQuestions =
      playStage2Levels.reduce(
        (total, level) =>
          total +
          level.exercises.length,
        0
      );

    const safeCorrectCount = Math.min(
      totalQuestions,
      stage2CorrectCount > 0
        ? stage2CorrectCount
        : (stagePerformance.stage2?.firstTrySuccess || 0)
    );

    const percentage =
      totalQuestions > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round(
                (safeCorrectCount /
                  totalQuestions) *
                100
              )
            )
          )
        : 100;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("teacher")}
        <div className="page">

          <section className="complete-card">

            <div className="complete-icon">
              <IconAward size={36} />
            </div>

            <p className="eyebrow">
              Module 02 Assessment Completed
            </p>

            <h1>
              AMAZING READING!
            </h1>

            <h2>
              {studentName}
            </h2>

            <p>
              YOU COMPLETED WORD,
              SENTENCE AND PARAGRAPH
              READING PRACTICE.
            </p>

            <div
              className="final-score"
              style={{
                margin: "25px 0",
              }}
            >
              {totalQuestions} /{" "}
              {totalQuestions}

              <div
                style={{
                  fontSize: "18px",
                  marginTop: "8px",
                }}
              >
                READING ACTIVITIES COMPLETED
              </div>
            </div>

            <div
              className="analysis-grid"
              style={{
                marginTop: "20px",
              }}
            >

              <div className="analysis-item">
                <span>
                  <IconStar size={16} />
                </span>
                <strong>
                  READING SCORE
                </strong>
                <p>
                  {safeCorrectCount} /{" "}
                  {totalQuestions}
                </p>
              </div>

              <div className="analysis-item">
                <span>
                  <IconTarget size={16} />
                </span>
                <strong>
                  ACCURACY
                </strong>
                <p>
                  {percentage}%
                </p>
              </div>

              <div className="analysis-item">
                <span>
                  <IconEdit size={16} />
                </span>
                <strong>
                  WORDS
                </strong>
                <p>
                  {
                    playStage2Levels[0]
                      .exercises.length
                  }
                </p>
              </div>

              <div className="analysis-item">
                <span>
                  <IconBookOpen size={16} />
                </span>
                <strong>
                  SENTENCES
                </strong>
                <p>
                  {
                    playStage2Levels[1]
                      .exercises.length
                  }
                </p>
              </div>

            </div>

            <div className="analysis-note">

              Assessment Activities Evaluated:

              <br />

              Phonetic Word Pronunciation

              <br />

              Oral Sentence Fluency

              <br />

              Passage Comprehension & Pace

              <br />

              Oral Reading Fluency

            </div>

            <StageComprehensiveAnalysis
              stageKey="stage2"
              stageName="Module 02: Auditory Processing & Reading Aloud"
              performance={stagePerformance.stage2}
              totalQuestions={totalQuestions}
              studentName={studentName}
              studentClass={selectedClass}
              score={stage2Score}
              onRestart={() => enterStageTwo()}
              onNextStage={enterStageThree}
              nextStageTitle="Continue to Module 03 (Written Expression) →"
            />

          </section>

        </div>
      </div>
    );
  }
  if (screen === "teacher") {
    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <UniversalAppHeader
          currentScreen="teacher"
          onNavigate={(target) => {
            if (target === "stages") enterStages();
            else if (target === "profile") startProfileCreation();
            else if (target === "login") setScreen("login");
            else setScreen(target);
          }}
          studentName={studentName}
          studentPhoto={studentPhoto}
          selectedClass={selectedClass}
          profiles={allProfiles}
          onSelectProfile={handleSelectProfile}
          onNewProfile={handleCreateNewProfile}
          authUser={authUser}
          onOpenLogin={() => setScreen("login")}
          onSignOut={handleSignOut}
        />
        <div className="page" style={{ maxWidth: "1400px", padding: "20px 24px 60px" }}>
          <TeacherDashboardView
            onLaunchStage={(stageId) => {
              const map = { 1: "stage1", 2: "stage2", 3: "stage3", 4: "stage4", 5: "shapes", 6: "comprehension" };
              showGladeTransition(map[stageId] || "stage1");
            }}
            onReturnHome={() => setScreen("home")}
            profiles={allProfiles}
            activeProfileId={activeProfileId}
            onSelectProfile={handleSelectProfile}
            savedProgress={stagePerformance}
            stagePerformance={stagePerformance}
            studentName={studentName}
            selectedClass={selectedClass}
            studentXp={stageScore}
            allProgress={savedProgress}
          />
        </div>
      </div>
    );
  }

  /* =======================================================
     LEGAL DOCUMENTS (PRIVACY POLICY & TERMS)
     ======================================================= */
  if (screen === "privacy" || screen === "terms") {
    return (
      <LegalDocuments
        initialTab={screen === "terms" ? "terms" : "privacy"}
        initialType={screen === "terms" ? "terms" : "privacy"}
        onClose={() => setScreen("home")}
        onBack={() => setScreen("home")}
        onReturnHome={() => setScreen("home")}
        onNavigate={(target) => {
          if (target === "stages") enterStages();
          else if (target === "profile") startProfileCreation();
          else if (target === "home") setScreen("home");
          else if (target === "login") setScreen("login");
          else if (target === "teacher") setScreen("teacher");
          else setScreen(target);
        }}
      />
    );
  }

  /* =======================================================
     404 NOT FOUND: LOST IN THE CANOPY
     ======================================================= */
  if (screen === "notFound" || screen === "404") {
    return (
      <NotFoundScreen
        onBackHome={() => setScreen("home")}
        onNavigate={(target) => {
          if (target === "stages") enterStages();
          else if (target === "profile") startProfileCreation();
          else if (target === "home") setScreen("home");
          else if (target === "login") setScreen("login");
          else if (target === "teacher") setScreen("teacher");
          else if (target === "privacy") setScreen("privacy");
          else if (target === "terms") setScreen("terms");
          else if (target === "stage1") showGladeTransition("stage1");
          else if (target === "stage2") showGladeTransition("stage2");
          else if (target === "stage3") showGladeTransition("stage3");
          else if (target === "stage4") showGladeTransition("stage4");
          else if (target === "shapes") showGladeTransition("shapes");
          else if (target === "comprehension") showGladeTransition("comprehension");
          else setScreen(target);
        }}
      />
    );
  }

  /* =======================================================
     FIREBASE EMAIL VERIFICATION SCREEN
     ======================================================= */
  if (screen === "verifyEmail" || (!authUser && pendingVerificationUser && (screen === "login" || screen === "verifyEmail"))) {
    return (
      <EmailVerificationScreen
        user={pendingVerificationUser}
        onVerificationSuccess={(verifiedUser) => {
          setAuthUser(verifiedUser);
          setPendingVerificationUser(null);
          if (verifiedUser?.displayName) {
            setStudentName((prev) => prev || verifiedUser.displayName);
          }
          setScreen("home");
        }}
        onSignOut={handleSignOut}
      />
    );
  }

  /* =======================================================
     FIREBASE EMAIL AUTHENTICATION SCREEN
     ======================================================= */
  if (screen === "login") {
    return (
      <LoginScreen
        onLoginSuccess={(user) => {
          setAuthUser(user);
          setPendingVerificationUser(null);
          if (user?.displayName) {
            setStudentName((prev) => prev || user.displayName);
          }
          setScreen("home");
        }}
        onNeedsVerification={(unverifiedUser) => {
          setAuthUser(null);
          setPendingVerificationUser(unverifiedUser);
          setScreen("verifyEmail");
        }}
        onContinueAsGuest={() => setScreen("home")}
        onClose={() => setScreen("home")}
      />
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
        onStartProfile={handleCreateNewProfile}
        onNewProfile={handleCreateNewProfile}
        onEnterStages={enterStages}
        onLaunchStage1={() => showGladeTransition("stage1")}
        onLaunchStage2={() => showGladeTransition("stage2")}
        onLaunchStage3={() => showGladeTransition("stage3")}
        onLaunchStage4={() => showGladeTransition("stage4")}
        onLaunchStage5={() => showGladeTransition("shapes")}
        onLaunchStage6={() => showGladeTransition("comprehension")}
        onNavigate={(target) => {
          if (target === "stages") enterStages();
          else if (target === "profile") startProfileCreation();
          else if (target === "login") setScreen("login");
          else if (target === "teacher" || target === "journal") setScreen("teacher");
          else if (target === "echo" || target === "auditory" || target === "stage2") showGladeTransition("stage2");
          else if (target === "reading" || target === "comprehension") showGladeTransition("comprehension");
          else if (target === "stage1") showGladeTransition("stage1");
          else if (target === "stage3") showGladeTransition("stage3");
          else if (target === "stage4") showGladeTransition("stage4");
          else if (target === "shapes") showGladeTransition("shapes");
          else setScreen(target);
        }}
        studentName={studentName}
        studentPhoto={studentPhoto}
        selectedClass={selectedClass}
        profiles={allProfiles}
        onSelectProfile={handleSelectProfile}
        savedProgress={stagePerformance}
        studentXp={stageScore}
        authUser={authUser}
        onOpenLogin={() => setScreen("login")}
        onSignOut={handleSignOut}
      />
    );
  }

  /* =======================================================
     CREATE PROFILE PAGE
     ======================================================= */

  if (screen === "profile") {
    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        <UniversalAppHeader
          currentScreen="profile"
          onNavigate={(target) => {
            if (target === "stages") enterStages();
            else if (target === "profile") startProfileCreation();
            else if (target === "login") setScreen("login");
            else setScreen(target);
          }}
          studentName={studentName}
          studentPhoto={studentPhoto}
          selectedClass={selectedClass}
          profiles={allProfiles}
          onSelectProfile={handleSelectProfile}
          onNewProfile={handleCreateNewProfile}
          studentXp={stageScore}
          authUser={authUser}
          onOpenLogin={() => setScreen("login")}
          onSignOut={handleSignOut}
        />
        <div className="page">

          <div className="top-bar">

            <button
              className="back-button"
              onClick={() =>
                setScreen("home")
              }
            >
              ← HOME
            </button>

          </div>

          <div className="hero">

            <div className="brain">
              <IconBrain size={32} />
            </div>

            <p className="eyebrow">
              STUDENT ONBOARDING & PROFILES
            </p>

            <h1>
              Student Profile Setup
            </h1>

            <p className="hero-subtitle">
              ACTIVE COHORT & CLINICAL DEMOGRAPHICS
            </p>

            <p className="hero-description">
              Select an existing student profile below to review diagnostic records, or fill in the form to register a new student.
            </p>

          </div>

          {/* ALL SAVED PROFILES COHORT SELECTOR */}
          <div className="saved-profiles-deck-container">
            <div className="saved-profiles-deck-header">
              <div>
                <span className="deck-eyebrow">SAVED COHORT ROSTER ({allProfiles.length})</span>
                <h3>Switch Student or Create New</h3>
              </div>
              <button
                className="btn-deck-new-profile"
                onClick={handleCreateNewProfile}
              >
                + Blank Form (New Student)
              </button>
            </div>

            <div className="saved-profiles-grid">
              {allProfiles.length === 0 ? (
                <div style={{
                  gridColumn: "1 / -1",
                  padding: "24px 20px",
                  textAlign: "center",
                  background: "#fffbeb",
                  border: "2px dashed #f59e0b",
                  borderRadius: "14px",
                  color: "#78350f"
                }}>
                  <div style={{ display: "inline-flex", padding: 10, background: "#fef3c7", borderRadius: "50%", color: "#d97706", marginBottom: 8 }}>
                    <IconBackpack size={28} />
                  </div>
                  <h4 style={{ margin: "0 0 6px", color: "#451a03", fontSize: "1.05rem" }}>No Explorer Passports Registered Yet</h4>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#92400e" }}>
                    Fill in your adventurer details below to create your first expedition profile!
                  </p>
                </div>
              ) : (
                allProfiles.map((p) => {
                  const isActive = p.id === activeProfileId || p.studentName === studentName;
                  return (
                    <div
                      key={p.id}
                      className={`saved-profile-card ${isActive ? "active" : ""}`}
                      onClick={() => handleSelectProfile(p)}
                    >
                      <div className="spc-avatar">
                        <IconUser size={18} />
                      </div>
                      <div className="spc-info">
                        <strong>{p.studentName}</strong>
                        <span>Class {p.studentClass || 1} • Age {p.studentAge || "—"}</span>
                      </div>
                      {isActive ? (
                        <span className="spc-active-pill" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><IconCheck size={12} /> Editing</span>
                      ) : (
                        <button className="spc-switch-btn">Switch</button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div
              style={{
                marginTop: "14px",
                padding: "10px 16px",
                background: "#fefce8",
                border: "1.5px dashed #d97706",
                borderRadius: "12px",
                color: "#78350f",
                fontSize: "0.86rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IconBackpack size={16} style={{ color: "#d97706", flexShrink: 0 }} />
              <span>Want to add another explorer? You can create additional profiles here anytime.</span>
            </div>
          </div>

          <section className="card">

            <h2>
              Student Demographics & Settings
            </h2>

            <p className="section-description">
              ADD THE STUDENT'S INFORMATION BELOW.
            </p>

            {/* PHOTO */}

            <div className="profile-photo-section">

              <div className="photo-preview">

                {studentPhoto ? (
                  <img
                    src={studentPhoto}
                    alt="Student"
                  />
                ) : (
                  <span><IconUser size={40} /></span>
                )}

              </div>

              <label className="upload-button">

                Upload Student Photograph

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handlePhotoUpload
                  }
                />

              </label>

              {studentPhoto && (
                <button
                  className="small-button danger"
                  onClick={() =>
                    setStudentPhoto("")
                  }
                >
                  REMOVE PHOTOGRAPH
                </button>
              )}

            </div>

            {/* STUDENT DETAILS */}

            <div className="form-section">

              <h3>
                Student Information
              </h3>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    STUDENT NAME *
                  </label>

                  <input
                    value={
                      studentName
                    }
                    onChange={(e) =>
                      setStudentName(
                        e.target.value
                      )
                    }
                    placeholder="Enter student's name"
                  />

                </div>

                <div className="form-group">

                  <label>
                    AGE *
                  </label>

                  <input
                    type="number"
                    min="4"
                    max="11"
                    value={
                      studentAge
                    }
                    onChange={(e) =>
                      setStudentAge(
                        e.target.value
                      )
                    }
                    placeholder="Age"
                  />

                </div>

                <div className="form-group">

                  <label>
                    CLASS / GRADE
                  </label>

                  <select
                    value={studentClass}
                    onChange={(e) =>
                      setStudentClass(e.target.value)
                    }
                  >
                    <option value="">
                      SELECT YOUR CLASS
                    </option>

                    <option value="1">
                      CLASS 1
                    </option>

                    <option value="2">
                      CLASS 2
                    </option>

                    <option value="3">
                      CLASS 3
                    </option>

                    <option value="4">
                      CLASS 4
                    </option>

                    <option value="5">
                      CLASS 5
                    </option>
                  </select>

                </div>

                <div className="form-group">

                  <label>
                    SCHOOL
                  </label>

                  <input
                    value={
                      schoolName
                    }
                    onChange={(e) =>
                      setSchoolName(
                        e.target.value
                      )
                    }
                    placeholder="School name"
                  />

                </div>

              </div>

            </div>

            {/* PARENT DETAILS */}

            <div className="form-section">

              <h3>
                Parent / Guardian Information
              </h3>

              <div className="form-grid">

                <div className="form-group">

                  <label>
                    PARENT / GUARDIAN NAME *
                  </label>

                  <input
                    value={
                      parentName
                    }
                    onChange={(e) =>
                      setParentName(
                        e.target.value
                      )
                    }
                    placeholder="Parent or guardian name"
                  />

                </div>

                <div className="form-group">

                  <label>
                    PHONE NUMBER
                  </label>

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={parentPhone}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setParentPhone(value);
                    }}
                    placeholder="10-digit phone number"
                  />


                </div>

                <div className="form-group full-width">

                  <label>
                    EMAIL
                  </label>

                  <input
                    type="email"
                    value={
                      parentEmail
                    }
                    onChange={(e) =>
                      setParentEmail(
                        e.target.value
                      )
                    }
                    placeholder="Parent email"
                  />

                </div>

              </div>

            </div>

            {/* AUDIO - UNCHANGED */}

            <div className="form-section voice-section">

              <h3>
                Student Voice Sample
              </h3>

              <p>
                RECORD A SHORT MESSAGE IN
                THE STUDENT'S VOICE.
              </p>

              <div className="voice-prompt">

                Recommended phrase:

                <strong>
                  "Hello! My name is{" "}
                  {studentName ||
                    "_____"}
                  ."
                </strong>

              </div>

              {!recording &&
                !audioURL && (
                  <button
                    className="primary-button"
                    onClick={
                      startRecording
                    }
                  >
                    Start Recording
                  </button>
                )}

              {recording && (
                <div className="recording-active">

                  <div className="recording-dot">
                    ●
                  </div>

                  <h3>
                    RECORDING...
                  </h3>

                  <p>
                    SPEAK CLEARLY INTO
                    THE MICROPHONE.
                  </p>

                  <button
                    className="stop-button"
                    onClick={
                      stopRecording
                    }
                  >
                    Stop Recording
                  </button>

                </div>
              )}

              {!recording &&
                audioURL && (
                  <div className="recording-result">

                    <h3 className="recording-ready">
                      Recording Ready
                    </h3>

                    <p>
                      PRESS PLAY TO HEAR
                      THE STUDENT'S
                      RECORDING.
                    </p>

                    <audio
                      className="audio-player"
                      controls
                      preload="metadata"
                      src={audioURL}
                      onLoadedMetadata={() =>
                        console.log(
                          "Audio loaded successfully."
                        )
                      }
                      onCanPlay={() =>
                        console.log(
                          "Audio can play."
                        )
                      }
                      onError={() =>
                        setAudioError(
                          "The recording could not be played. Please record again."
                        )
                      }
                    />

                    <div className="audio-buttons">

                      <button
                        className="secondary-button danger-border"
                        onClick={
                          removeRecording
                        }
                      >
                        Remove Recording
                      </button>

                      <button
                        className="primary-button"
                        onClick={
                          recordAgain
                        }
                      >
                        Record Again
                      </button>

                    </div>

                    {audioError && (
                      <div className="audio-error">
                        {audioError}
                      </div>
                    )}

                  </div>
                )}

              {audioError &&
                !audioURL && (
                  <div className="audio-error">
                    {audioError}
                  </div>
                )}

            </div>

            {saveMessage && (
              <div className="save-message">
                {saveMessage}
              </div>
            )}

            <button
              className="save-button"
              onClick={
                saveProfile
              }
            >
              Save Student Profile
            </button>

            <p className="privacy-note">
              YOUR PROFILE STAYS SAVED
              ON THIS DEVICE.
            </p>

          </section>

        </div>
      </div>
    );
  }

  /* =======================================================
     PROFILE CREATED
     ======================================================= */

  if (
    screen ===
    "profileCreated"
  ) {
    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("profile")}
        <div className="page">

          <section className="analysis-card">

            <div className="analysis-icon">
              <IconAward size={36} />
            </div>

            <p className="eyebrow">
              PROFILE CREATED
            </p>

            <h1>
              GREAT JOB!
            </h1>

            {studentPhoto && (
              <div
                className="photo-preview"
                style={{
                  margin:
                    "20px auto",
                }}
              >
                <img
                  src={
                    studentPhoto
                  }
                  alt="Student"
                />
              </div>
            )}

            <h2>
              {studentName}
            </h2>

            <p className="analysis-welcome">
              YOUR STUDENT PROFILE
              HAS BEEN CREATED
              SUCCESSFULLY!
            </p>

            <div className="analysis-grid">

              <div className="analysis-item">
                <span><IconGraduationCap size={18} /></span>
                <strong>
                  AGE
                </strong>
                <p>
                  {studentAge}
                </p>
              </div>

              <div className="analysis-item">
                <span><IconBookOpen size={18} /></span>
                <strong>
                  CLASS
                </strong>
                <p>
                  {studentClass ||
                    "NOT PROVIDED"}
                </p>
              </div>

              <div className="analysis-item">
                <span><IconShieldCheck size={18} /></span>
                <strong>
                  SCHOOL
                </strong>
                <p>
                  {schoolName ||
                    "NOT PROVIDED"}
                </p>
              </div>

              <div className="analysis-item">
                <span><IconMic size={18} /></span>
                <strong>
                  VOICE
                </strong>
                <p>
                  {audioData
                    ? "RECORDED"
                    : "NOT RECORDED"}
                </p>
              </div>

            </div>

            <div className="analysis-note">
              Assessment profile successfully initialized and ready.
            </div>

            <button
              className="save-button"
              onClick={
                startAnalysis
              }
            >
              Begin Assessment
            </button>

          </section>

        </div>
      </div>
    );
  }

  /* =======================================================
     STUDENT ANALYSIS
     ======================================================= */

  if (
    screen === "analysis"
  ) {
    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        <UniversalAppHeader
          currentScreen="analysis"
          onNavigate={(target) => {
            if (target === "stages") enterStages();
            else if (target === "profile") startProfileCreation();
            else if (target === "login") setScreen("login");
            else setScreen(target);
          }}
          studentName={studentName}
          studentPhoto={studentPhoto}
          selectedClass={selectedClass}
          profiles={allProfiles}
          onSelectProfile={handleSelectProfile}
          onNewProfile={handleCreateNewProfile}
          authUser={authUser}
          onOpenLogin={() => setScreen("login")}
          onSignOut={handleSignOut}
        />
        <div className="page">

          <div className="top-bar">

            <button
              className="back-button"
              onClick={() =>
                setScreen(
                  "profileCreated"
                )
              }
            >
              ← BACK
            </button>

          </div>

          <section className="analysis-card">

            <div className="analysis-icon">
              <IconTarget size={36} />
            </div>

            <p className="eyebrow">
              STUDENT ASSESSMENT
            </p>

            <h1>
              STUDENT ANALYSIS
            </h1>

            <p className="analysis-welcome">
              WELCOME,{" "}
              <strong>
                {studentName ||
                  "STUDENT"}
              </strong>
              !
            </p>

            <p>
              WE WILL START WITH SIMPLE
              VISUAL RECOGNITION.
              THERE ARE NO DIFFICULT
              CONCEPTUAL QUESTIONS.
            </p>

            <div className="analysis-grid">

              <div className="analysis-item">
                <span><IconEye size={18} /></span>

                <strong>
                  VISUAL RECOGNITION
                </strong>

                <p>
                  LOOK CAREFULLY AT
                  LETTER SHAPES.
                </p>
              </div>

              <div className="analysis-item">
                <span><IconEdit size={18} /></span>

                <strong>
                  LETTER ORIENTATION
                </strong>

                <p>
                  RECOGNISE BOTH FORMS
                  OF LETTERS.
                </p>
              </div>

              <div className="analysis-item">
                <span><IconShapes size={18} /></span>

                <strong>
                  MATCHING
                </strong>

                <p>
                  FIND LETTERS THAT
                  LOOK RELATED.
                </p>
              </div>

              <div className="analysis-item">
                <span><IconLayers size={18} /></span>

                <strong>
                  SORTING
                </strong>

                <p>
                  CHOOSE THE MATCHING
                  LETTER OR WORD.
                </p>
              </div>

            </div>

            <div className="analysis-note">
              Foundational baseline assessment without timed pressure.
              THE CHILD LEARNS THROUGH
              LOOKING, COMPARING AND
              RECOGNISING.
            </div>

            <button
              className="save-button"
              onClick={
                enterStages
              }
            >
              Enter Assessment Modules
            </button>

          </section>

        </div>
      </div>
    );
  }

  /* =======================================================
     STAGES PAGE
     ======================================================= */

  if (
    screen === "stages"
  ) {
    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        <UniversalAppHeader
          currentScreen="stages"
          onNavigate={(target) => {
            if (target === "stages") enterStages();
            else if (target === "profile") startProfileCreation();
            else if (target === "login") setScreen("login");
            else setScreen(target);
          }}
          studentName={studentName}
          studentPhoto={studentPhoto}
          selectedClass={selectedClass}
          profiles={allProfiles}
          onSelectProfile={handleSelectProfile}
          onNewProfile={handleCreateNewProfile}
          authUser={authUser}
          onOpenLogin={() => setScreen("login")}
          onSignOut={handleSignOut}
        />
        <div className="page">

          <div className="top-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              className="back-button"
              onClick={() =>
                setScreen("analysis")
              }
            >
              {t("backBtn", "← BACK")}
            </button>
            <button
              className="quest-return-home-btn"
              onClick={() => setScreen("home")}
            >
              {t("portalBtn", "3D Website Portal")}
            </button>
          </div>

          <section className="card stages-card">

            <div className="stages-header">

              <p className="eyebrow">
                {t("stagesEyebrow", "CLINICAL & EDUCATIONAL CURRICULUM")}
              </p>

              <h1>
                {t("stagesTitle", "Cognitive Assessment Modules")}
              </h1>

              <p>
                {t("stagesDesc", "Select an assessment module below. Real-time response performance is tracked and analyzed.")}
              </p>

              <div
                className="analysis-note"
                style={{ margin: "15px 0" }}
              >
                {CLASS_INFO[selectedClass]?.name || "Class Not Selected"}
                <br />
                {t("difficultyLevel", "Difficulty Level:")} {CLASS_INFO[selectedClass]?.difficulty || "Standard"}
              </div>

              <div className="saved-progress-card">
                <strong><IconLayers size={14} /> {t("savedProgress", "Saved Assessment Progress")}</strong>
                <p>
                  Module 01 (Visual Perception): {(
                    savedProgress.stage1?.classes?.[
                      String(selectedClass)
                    ]?.completedQuestions || 0
                  )} / 27 QUESTIONS
                </p>
                <p>
                  Module 04 (Numerical Cognition): {(
                    savedProgress.stage4?.classes?.[
                      String(selectedClass)
                    ]?.completedQuestions || 0
                  )} / 30 QUESTIONS
                </p>
                <p>
                  Module 05 (Spatial Geometry): {(
                    savedProgress.shapes?.classes?.[
                      String(selectedClass)
                    ]?.completedQuestions || 0
                  )} / 16 QUESTIONS
                </p>
                <p>
                  Module 06 (Reading Comprehension): {(
                    savedProgress.comprehension?.classes?.[
                      String(selectedClass)
                    ]?.completedQuestions || 0
                  )} / {(
                    getComprehensionLevelsForClass(selectedClass).reduce(
                      (sum, l) => sum + l.questions.length,
                      0
                    )
                  )} QUESTIONS
                </p>
              </div>

            </div>

            <div className="stage-grid">

              {/* REALM 1: EAGLE EYE ISLAND */}

              <div className="stage-option">

                <div className="realm-pill">Module 01</div>

                <div className="stage-number">
                  <IconEye size={24} />
                </div>

                <h2>
                  Visual Perception
                </h2>

                <p className="realm-tagline">
                  Visual Discrimination & Orientation
                </p>

                <p>
                  3 LEVELS • EASY → HARD
                </p>

                <div
                  className="analysis-note"
                  style={{
                    margin: "15px 0",
                  }}
                >
                  Visual symbol discrimination & pattern search
                  <br />
                  9 Assessment Tasks Per Level
                  <br />
                  27 Total Diagnostic Tasks
                  <br />
                  Progress automatically recorded
                </div>

                <button
                  className="primary-button"
                  onClick={() => showGladeTransition("stage1")}
                >
                  Begin Module 1
                </button>

              </div>

              {/* REALM 2: ECHO VALLEY */}

              <div className="stage-option">

                <div className="realm-pill">Module 02</div>

                <div className="stage-number">
                  <IconMic size={24} />
                </div>

                <h2>
                  Auditory Processing & Reading
                </h2>

                <p className="realm-tagline">
                  Speech Recognition & Phonemic Decoding
                </p>

                <p>
                  SPEAK WORDS, SENTENCES & STORIES ALOUD
                </p>

                <div
                  className="analysis-note"
                  style={{
                    margin: "15px 0",
                  }}
                >
                  Phonics & Single-Word Pronunciation
                  <br />
                  Oral Sentence Fluency
                  <br />
                  Passage Comprehension Tasks
                  <br />
                  Speech-to-Text Recognition
                </div>

                <button
                  className="primary-button"
                  onClick={() => showGladeTransition("stage2")}
                >
                  Begin Module 2
                </button>

              </div>

              {/* REALM 3: WORD WIZARD CASTLE */}

              <div className="stage-option">

                <div className="realm-pill">Module 03</div>

                <div className="stage-number">
                  <IconEdit size={24} />
                </div>

                <h2>
                  Written Expression
                </h2>

                <p className="realm-tagline">
                  Spelling, Vocabulary & Encoding
                </p>

                <p>
                  TRACE WORDS & UNLOCK ANCIENT SPELLS
                </p>

                <div
                  className="analysis-note"
                  style={{
                    margin: "15px 0",
                  }}
                >
                  Interactive Letter Tracing & Spelling
                  <br />
                  Orthographic Word Construction
                  <br />
                  Phonological Rhyme & Syntax Evaluation
                </div>

                <button
                  className="primary-button"
                  onClick={() => showGladeTransition("stage3")}
                >
                  Begin Module 3
                </button>

              </div>

              {/* REALM 4: NUMBER NINJA TEMPLE */}

              <div className="stage-option">

                <div className="realm-pill">Module 04</div>

                <div className="stage-number">
                  <IconCalculator size={24} />
                </div>

                <h2>
                  Numerical Cognition
                </h2>

                <p className="realm-tagline">
                  Arithmetic & Quantitative Reasoning
                </p>

                <p>
                  MASTER NUMBERS & REASONING JUTSU
                </p>

                <div
                  className="analysis-note"
                  style={{
                    margin: "15px 0",
                  }}
                >
                  Addition & Subtraction Operations
                  <br />
                  Multiplication & division operations STRIKES
                  <br />
                  Applied Quantitative Reasoning
                  <br />
                  10 Math Items Per Level
                </div>

                <button
                  className="primary-button"
                  onClick={() => showGladeTransition("stage4")}
                >
                  Begin Module 4
                </button>

              </div>

              {/* REALM 5: SHAPE SHIFTER GALAXY */}

              <div className="stage-option">

                <div className="realm-pill">Module 05</div>

                <div className="stage-number">
                  <IconShapes size={24} />
                </div>

                <h2>
                  Spatial Geometry
                </h2>

                <p className="realm-tagline">
                  2D & 3D Dimensional Reasoning
                </p>

                <p>
                  WARP THROUGH 2D & 3D DIMENSIONS
                </p>

                <div
                  className="analysis-note"
                  style={{
                    margin: "15px 0",
                  }}
                >
                  2 Calibrated Spatial Levels
                  <br />
                  2D & 3D Geometric solids
                  <br />
                  Educational Shape Insights
                  <br />
                  8 Spatial Tasks Per Level
                </div>

                <button
                  className="primary-button"
                  onClick={() => showGladeTransition("shapes")}
                >
                  Begin Module 5
                </button>

              </div>

              {/* MODULE 06: READING COMPREHENSION */}

              <div className="stage-option">

                <div className="realm-pill">Module 06</div>

                <div className="stage-number">
                  <IconBookOpen size={24} />
                </div>

                <h2>
                  Reading Comprehension
                </h2>

                <p className="realm-tagline">
                  Text Synthesis & Understanding
                </p>

                <p>
                  2 Progressive Levels • Passages & Questions
                </p>

                <div
                  className="analysis-note"
                  style={{
                    margin: "15px 0",
                  }}
                >
                  Persistent passage view & audio read-aloud
                  <br />
                  Factual, vocabulary & inference challenges
                  <br />
                  Calibrated for dyslexic reading fluency
                  <br />
                  Progress automatically recorded
                </div>

                <button
                  className="primary-button"
                  onClick={() => showGladeTransition("comprehension")}
                >
                  Begin Module 6
                </button>

              </div>


            </div>

          </section>

        </div>
      </div>
    );
  }

  /* =======================================================
       DYNAMIC LEVEL TRANSITION & CONFIRMATION SCREEN
       ======================================================= */
  if (screen === "levelTransition") {
    return (
      <LevelTransitionScreen
        gladeKey={selectedGladeKey}
        onEnterGlade={() => launchCurrentGlade(selectedGladeKey)}
        onReturnToTrail={() => setScreen("home")}
        studentName={studentName}
        studentPhoto={studentPhoto}
        selectedClass={selectedClass}
        profiles={allProfiles}
        onSelectProfile={handleSelectProfile}
        onNewProfile={handleCreateNewProfile}
        studentXp={stageScore}
        authUser={authUser}
        onOpenLogin={() => setScreen("login")}
        onSignOut={handleSignOut}
        spatialPulse={spatialPulse}
        pulseType={pulseType}
        fxTrigger={fxTrigger}
        fxScore={fxScore}
        fxCombo={fxCombo}
      />
    );
  }

  /* =======================================================
       MODULE 06 GAME — READING COMPREHENSION
       ======================================================= */

  if (screen === "comprehension") {
    const activeLevels = (Array.isArray(playComprehensionLevels) && playComprehensionLevels.length > 0)
      ? playComprehensionLevels
      : getComprehensionLevelsForClass(selectedClass || 1);
    const activeLevelIndex = Math.min(Math.max(0, compLevelIndex), activeLevels.length - 1);
    const level = activeLevels[activeLevelIndex] || activeLevels[0];
    const safeQuestions = (level && Array.isArray(level.questions) && level.questions.length > 0)
      ? level.questions
      : [{ id: 1, question: "Read the story passage carefully.", options: ["Yes", "No"], answer: "Yes", hint: "Check the passage details" }];
    const activeQuestionIndex = Math.min(Math.max(0, compQuestionIndex), safeQuestions.length - 1);
    const question = safeQuestions[activeQuestionIndex];

    const totalQuestions = activeLevels.reduce(
      (sum, item) => sum + (item?.questions?.length || 0),
      0
    ) || 1;

    const completedBefore = activeLevels
      .slice(0, activeLevelIndex)
      .reduce((sum, item) => sum + (item?.questions?.length || 0), 0) + activeQuestionIndex;

    const currentCompleted =
      completedBefore + (compMessage && compMessage.includes("Correct") ? 1 : 0);

    const overallProgress = Math.min(100, Math.round((currentCompleted / totalQuestions) * 100));

    const isLastQuestion =
      activeQuestionIndex === safeQuestions.length - 1 &&
      activeLevelIndex === activeLevels.length - 1;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <div className="page">
          <div className="top-bar">
            <button
              className="back-button"
              onClick={() => {
                window.speechSynthesis?.cancel();
                setScreen("stages");
              }}
            >
              <IconChevronLeft size={16} /> Modules
            </button>
            <div className="score-display">
              <IconStar size={14} /> {compScore} XP
            </div>
          </div>

          <section className="stage-card">
            <p className="eyebrow">
              Class {selectedClass} • Module 06: Reading Comprehension
            </p>
            <h1>Reading Comprehension & Text Synthesis</h1>
            <p className="stage-description">
              Read the passage carefully, then answer the questions based on the text.
            </p>

            {/* CURRENT LEVEL DISPLAY */}
            <div className="current-level-display">
              <span className="current-level-pill">
                Level {activeLevelIndex + 1} • {formatDifficulty(level.difficulty)}
              </span>
            </div>

            {/* OVERALL PROGRESS */}
            <div className="progress-area">
              <div className="progress-label">
                <span>Module 06 Progress</span>
                <span>{currentCompleted} / {totalQuestions}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* COMPREHENSION LAYOUT: PASSAGE + QUESTION */}
            <div className="comprehension-layout">
              {/* 1. PASSAGE CARD */}
              <div className="passage-card">
                <div className="passage-header">
                  <span className="passage-badge">
                    <IconBookOpen size={13} /> Level {activeLevelIndex + 1} • {formatDifficulty(level.difficulty)}
                  </span>
                  <div className="passage-controls">
                    <button
                      type="button"
                      className="shape-fact-audio-btn read-aloud-btn"
                      onClick={() => readPassageAloud(level.passage)}
                      title="Listen to full passage"
                    >
                      <IconVolume size={15} /> Read Passage Aloud
                    </button>
                  </div>
                </div>
                <h3 className="passage-title">{level.passageTitle}</h3>
                <div className="passage-content">
                  {level.passage}
                </div>
              </div>

              {/* 2. QUESTION PANEL */}
              <div className="question-panel">
                <div className="question-panel-header">
                  <span className="question-counter-pill">
                    Question {compQuestionIndex + 1} of {level.questions.length}
                  </span>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    {!compHintUsed ? (
                      <button
                        type="button"
                        className="btn-unlock-clue"
                        style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                        onClick={useComprehensionHint}
                        disabled={compScore < 5}
                        title={compScore < 5 ? "Need at least 5 XP to unlock clue" : "Click to reveal helpful pedagogical clue (-5 XP)"}
                      >
                        <IconLightbulb size={16} /> Conceptual Hint (-5 XP)
                      </button>
                    ) : (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: "800", color: "#92400e", background: "#fef3c7", padding: "5px 12px", borderRadius: "8px", border: "1.5px solid #f59e0b" }}>
                        <IconLightbulb size={15} /> Clue Unlocked Below
                      </span>
                    )}
                    <button
                      type="button"
                      className="shape-fact-audio-btn read-aloud-btn"
                      onClick={() => readQuestionAloud(question.question)}
                      title="Read question aloud"
                    >
                      <IconVolume size={14} /> Read Question
                    </button>
                  </div>
                </div>

                <h4 className="question-text-title">{question.question}</h4>

                {/* OPTIONS GRID */}
                <div className="comprehension-options-grid">
                  {question.options.map((option, idx) => {
                    const isSelected = compAnswer === option;
                    const isCorrectOption = option === question.answer;
                    const showFeedback = Boolean(compMessage);

                    let btnClass = "comprehension-option-btn";
                    if (showFeedback && isSelected) {
                      btnClass += isCorrectOption ? " selected-correct" : " selected-wrong";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        className={btnClass}
                        onClick={() => answerComprehensionQuestion(option)}
                        disabled={compMessage && compMessage.includes("Correct")}
                      >
                        <span style={{
                          minWidth: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: isSelected ? (isCorrectOption ? "#15803d" : "#dc2626") : "#e2e8f0",
                          color: isSelected ? "#ffffff" : "#1e293b",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: "800",
                          border: isSelected ? "none" : "1.5px solid #cbd5e1"
                        }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* FEEDBACK */}
                {compMessage && (
                  <div
                    className={
                      compMessage.includes("Correct")
                        ? "feedback correct-feedback"
                        : compMessage.includes("Hint unlocked")
                        ? "hint-unlocked-banner"
                        : "feedback wrong-feedback"
                    }
                  >
                    {compMessage.includes("Hint unlocked") ? (
                      <>
                        <IconLightbulb size={18} />
                        <span>{compMessage}</span>
                      </>
                    ) : (
                      compMessage
                    )}
                  </div>
                )}

                {/* HINT DRAWER */}
                {compHint && (
                  <div className="shape-fact-card pedagogical-clue-card" style={{ marginTop: "16px" }}>
                    <div className="shape-fact-header">
                      <span className="shape-fact-title">
                        <IconLightbulb size={18} /> PEDAGOGICAL CLUE
                      </span>
                      <button
                        type="button"
                        className="shape-fact-audio-btn read-aloud-btn"
                        onClick={() => readQuestionAloud(compHint)}
                        title="Click to hear this clue read aloud"
                      >
                        <IconVolume size={14} /> Read Clue Aloud
                      </button>
                    </div>
                    <div className="shape-fact-body" style={{ color: "#0f172a", fontSize: "1.1rem", fontWeight: "700" }}>
                      {compHint}
                    </div>
                  </div>
                )}

                {/* CONTROLS */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px", alignItems: "center" }}>
                  {!compHintUsed && (
                    <button
                      type="button"
                      className="btn-unlock-clue"
                      onClick={useComprehensionHint}
                      disabled={compScore < 5}
                      title={compScore < 5 ? "Need at least 5 XP to unlock clue" : "Click to reveal helpful pedagogical clue (-5 XP)"}
                    >
                      <IconLightbulb size={18} /> Conceptual Hint (-5 XP)
                    </button>
                  )}

                  {compMessage && compMessage.includes("Correct") && (
                    <button
                      type="button"
                      className="save-button next-button"
                      style={{ marginTop: 0 }}
                      onClick={nextComprehensionExercise}
                    >
                      {isLastQuestion ? "Complete Module 6" : "Next Question →"}
                    </button>
                  )}
                </div>

                {/* DEDICATED COMPANION AREA (BELOW ANSWERS) */}
                <div className="companion-bottom-bar">
                  <div
                    className="companion-avatar-wrap"
                    onClick={() => {
                      if (compShowHint) {
                        setCompShowHint(false);
                      } else if (compHintUsed) {
                        setCompShowHint(true);
                      } else {
                        useComprehensionHint();
                      }
                    }}
                    title="Click Luna the Lagoon Otter for a clue!"
                  >
                    <LunaOtter size="small" />
                  </div>

                  <div className="companion-dialogue-col">
                    {compShowHint ? (
                      <div className="companion-dialogue-bubble">
                        <div className="dialogue-header">
                          <span className="companion-name-tag">
                            <IconLightbulb size={14} /> Luna's Clue
                          </span>
                          <button
                            type="button"
                            className="btn-dismiss-hint"
                            onClick={() => setCompShowHint(false)}
                          >
                            ✕ Hide
                          </button>
                        </div>
                        <p className="dialogue-message">
                          {compHint || question?.hint || "Read the enchanted passage at your own pace. The answer is nestled right in the story paragraphs!"}
                        </p>
                      </div>
                    ) : (
                      <div className="companion-idle-bar">
                        <button
                          type="button"
                          className="btn-request-hint"
                          onClick={useComprehensionHint}
                        >
                          <IconLightbulb size={16} /> Need a Hint from Luna?
                        </button>
                        <span className="companion-idle-subtext">
                          {compScore < 5 && !compHintUsed
                            ? `You need at least 5 XP to unlock a hint. (Current: ${compScore} XP)`
                            : "Luna is diving for answers. Tap if you want a reading tip!"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     MODULE 06 PROGRESS REPORT (COMPREHENSION)
     ======================================================= */

  if (screen === "comprehensionReport") {
    const totalQuestions = playComprehensionLevels.reduce(
      (sum, item) => sum + item.questions.length,
      0
    );

    const maxPossibleXP = totalQuestions * 3;
    const accuracy = totalQuestions > 0
      ? Math.min(100, Math.round((compScore / maxPossibleXP) * 100))
      : 0;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("teacher")}
        <div className="page">
          <section className="complete-card">
            <div className="complete-icon">
              <IconAward size={36} />
            </div>
            <p className="eyebrow">Module 06 Assessment Completed</p>
            <h1>Reading Comprehension Mastered</h1>
            <h2>{studentName || "Student"}</h2>
            <p>
              You successfully read the passages, synthesized the text, and answered comprehension challenges.
            </p>

            <div className="final-score" style={{ margin: "25px 0" }}>
              {totalQuestions} / {totalQuestions}
              <div style={{ fontSize: "18px", marginTop: "8px" }}>
                Comprehension Tasks Completed
              </div>
            </div>

            <div className="analysis-grid" style={{ marginTop: "20px" }}>
              <div className="analysis-item">
                <span><IconStar size={16} /></span>
                <strong>Comprehension Score</strong>
                <p>{compScore} XP</p>
              </div>

              <div className="analysis-item">
                <span><IconTarget size={16} /></span>
                <strong>Performance</strong>
                <p>{accuracy}%</p>
              </div>

              <div className="analysis-item">
                <span><IconLayers size={16} /></span>
                <strong>Levels</strong>
                <p>2 / 2 Completed</p>
              </div>

              <div className="analysis-item">
                <span><IconGraduationCap size={16} /></span>
                <strong>Grade</strong>
                <p>Class {selectedClass}</p>
              </div>
            </div>

            <div className="analysis-note" style={{ margin: "25px 0" }}>
              Skills Evaluated:
              <br />
              Main Idea & Topic Comprehension
              <br />
              Explicit Text Details & Direct Recall
              <br />
              Vocabulary in Context & Meaning Retrieval
              <br />
              Inferential Reasoning & Synthesis
            </div>

            <StageComprehensiveAnalysis
              stageKey="comprehension"
              stageName="Module 06: Reading Comprehension & Text Synthesis"
              performance={stagePerformance.comprehension}
              totalQuestions={totalQuestions}
              studentName={studentName}
              studentClass={selectedClass}
              score={compScore}
              onRestart={restartComprehensionStage}
              onNextStage={() => setScreen("stages")}
              nextStageTitle="Return to Assessment Modules"
            />
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 5 GAME — SHAPES QUEST
     ======================================================= */

  if (screen === "shapes") {
    const level = playShapesLevels[shapesLevelIndex] || playShapesLevels[0];
    const exercise = level?.exercises?.[shapesExerciseIndex] || level?.exercises?.[0];

    if (!level || !exercise) {
      return (
        <div className="app">
          <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
          <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
          {renderAppHeader("stages")}
          <div className="page" style={{ textAlign: "center", padding: "80px 20px" }}>
            <div className="stage-card" style={{ maxWidth: 500, margin: "0 auto", padding: 30 }}>
              <h2>Sunstone Altar Ready</h2>
              <p style={{ margin: "16px 0 24px" }}>3D geometry challenges for Class {selectedClass} are aligning.</p>
              <button className="save-button" onClick={() => { setShapesLevelIndex(0); setShapesExerciseIndex(0); }}>Awaken Altar</button>
            </div>
          </div>
        </div>
      );
    }

    const totalQuestions = playShapesLevels.reduce(
      (sum, item) => sum + item.exercises.length,
      0
    );

    const completedBefore = playShapesLevels
      .slice(0, shapesLevelIndex)
      .reduce((sum, item) => sum + item.exercises.length, 0) + shapesExerciseIndex;

    const currentCompleted =
      completedBefore + (shapesMessage && shapesMessage.includes("Correct") ? 1 : 0);

    const overallProgress = Math.round((currentCompleted / totalQuestions) * 100);

    const levelCompleted =
      shapesExerciseIndex + (shapesMessage && shapesMessage.includes("Correct") ? 1 : 0);

    const levelProgress = Math.round((levelCompleted / level.exercises.length) * 100);

    const isLastQuestion =
      shapesExerciseIndex === level.exercises.length - 1 &&
      shapesLevelIndex === playShapesLevels.length - 1;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <div className="page">
          <div className="top-bar">
            <button
              className="back-button"
              onClick={() => {
                window.speechSynthesis?.cancel();
                setScreen("stages");
              }}
            >
              ← STAGES
            </button>
            <div className="score-display">
              {shapesScore} XP
            </div>
          </div>

          <section className="stage-card">
            <p className="eyebrow">
              Class {selectedClass} • Module 05: Spatial Geometry
            </p>
            <h1>Spatial Geometry & Structural Reasoning</h1>
            <p className="stage-description">
              WARP THROUGH 2D & 3D DIMENSIONS, COUNT SIDES & CORNERS, AND DISCOVER FUN SHAPE FACTS!
            </p>

            {/* CURRENT LEVEL DISPLAY */}
            <div className="current-level-display">
              <span className="current-level-pill">
                Level {shapesLevelIndex + 1} • {formatDifficulty(level.difficulty)}
              </span>
            </div>

            {/* OVERALL PROGRESS */}
            <div className="progress-area">
              <div className="progress-label">
                <span>Module 05 Progress</span>
                <span>{currentCompleted} / {totalQuestions}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: "8px",
                }}
              >
                {overallProgress}% COMPLETED
              </p>
            </div>

            {/* CURRENT LEVEL PROGRESS */}
            <div className="progress-area">
              <div className="progress-label">
                <span>Level {shapesLevelIndex + 1} PROGRESS</span>
                <span>{levelCompleted} / {level.exercises.length}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>

            {/* EXERCISE CARD */}
            <div className="exercise-card">
              <div className="exercise-header">
                <span className="exercise-type">Module 05: Spatial Geometry</span>
                <span className="question-level-badge">
                  Level {shapesLevelIndex + 1} • {formatDifficulty(level.difficulty)}
                </span>
                <span>
                  QUESTION {shapesExerciseIndex + 1} / {level.exercises.length}
                </span>
              </div>

              <h2>{exercise.question}</h2>

              {/* CENTRAL SHAPE DISPLAY */}
              {exercise.shape && (
                <div className="shape-display-card">
                  <ShapeVisual shape={exercise.shape} size={110} />
                </div>
              )}

              {/* READ ALOUD BUTTON */}
              <button
                type="button"
                className="shape-fact-audio-btn read-aloud-btn"
                style={{ marginTop: "12px" }}
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(exercise.question);
                    utterance.rate = 0.8;
                    utterance.pitch = 1.05;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <IconVolume size={14} /> Read Question Aloud
              </button>

              {/* ANSWER OPTIONS GRID */}
              <div className="answer-grid" style={{ marginTop: "24px" }}>
                {exercise.options.map((option) => {
                  const isSelected = shapesAnswer === option;
                  const isCorrect = option === exercise.answer;

                  let buttonClass = "answer-button ";
                  if (isSelected) {
                    buttonClass += isCorrect ? "correct" : "wrong";
                  }

                  return (
                    <button
                      key={option}
                      className={buttonClass}
                      disabled={Boolean(shapesMessage && shapesMessage.includes("Correct"))}
                      onClick={() => answerShapesQuestion(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK */}
              {shapesMessage && (
                <div
                  className={
                    shapesMessage.includes("Correct")
                      ? "feedback correct-feedback"
                      : "feedback wrong-feedback"
                  }
                  style={{ marginTop: "20px" }}
                >
                  {shapesMessage}
                </div>
              )}

              {/* OPTIONAL FUN SHAPE FACT CARD */}
              {showShapeFact && exercise.fact && (
                <div className="shape-fact-card">
                  <div className="shape-fact-header">
                    <div className="shape-fact-title">
                      Educational Shape Insight:
                    </div>
                    <button
                      type="button"
                      className="shape-fact-audio-btn read-aloud-btn"
                      onClick={() => {
                        if ("speechSynthesis" in window) {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(exercise.fact);
                          u.rate = 0.85;
                          window.speechSynthesis.speak(u);
                        }
                      }}
                    >
                      <IconVolume size={14} /> Read Fact Aloud
                    </button>
                  </div>
                  <div className="shape-fact-body">
                    {exercise.fact}
                  </div>
                </div>
              )}

              {shapesHint && (
                <div className="shape-fact-card pedagogical-clue-card" style={{ marginTop: "16px" }}>
                  <div className="shape-fact-header">
                    <span className="shape-fact-title">
                      <IconLightbulb size={18} /> PEDAGOGICAL HINT
                    </span>
                    <button
                      type="button"
                      className="shape-fact-audio-btn read-aloud-btn"
                      onClick={() => {
                        if ("speechSynthesis" in window) {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(shapesHint);
                          u.rate = 0.85;
                          window.speechSynthesis.speak(u);
                        }
                      }}
                    >
                      <IconVolume size={14} /> Read Hint Aloud
                    </button>
                  </div>
                  <div className="shape-fact-body">
                    {shapesHint}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              {shapesMessage && !shapesMessage.includes("Correct") && (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setShapesAnswer("");
                      setShapesMessage("");
                    }}
                  >
                    Try Again
                  </button>

                  {!shapesHintUsed && (
                    <button
                      type="button"
                      className="btn-unlock-clue"
                      onClick={useShapesHint}
                      disabled={shapesScore < 5}
                    >
                      <IconLightbulb size={16} /> Conceptual Hint (-5 XP)
                    </button>
                  )}
                </div>
              )}

              {/* DEDICATED COMPANION AREA (BELOW ANSWERS) */}
              <div className="companion-bottom-bar">
                <div
                  className="companion-avatar-wrap"
                  onClick={() => {
                    if (shapesShowHint) {
                      setShapesShowHint(false);
                    } else if (shapesHintUsed) {
                      setShapesShowHint(true);
                    } else {
                      useShapesHint();
                    }
                  }}
                  title="Click Sol the Sunstone Chameleon for a hint!"
                >
                  <SolChameleon size="small" />
                </div>

                <div className="companion-dialogue-col">
                  {shapesShowHint ? (
                    <div className="companion-dialogue-bubble">
                      <div className="dialogue-header">
                        <span className="companion-name-tag">
                          <IconLightbulb size={14} /> Sol's Crystal Clue
                        </span>
                        <button
                          type="button"
                          className="btn-dismiss-hint"
                          onClick={() => setShapesShowHint(false)}
                        >
                          ✕ Hide
                        </button>
                      </div>
                      <p className="dialogue-message">
                        {shapesHint || exercise?.hint || "Drag and rotate the 3D crystal! Count its vertices, edges, and planar faces carefully."}
                      </p>
                    </div>
                  ) : (
                    <div className="companion-idle-bar">
                      <button
                        type="button"
                        className="btn-request-hint"
                        onClick={useShapesHint}
                      >
                        <IconLightbulb size={16} /> Need a Hint from Sol?
                      </button>
                      <span className="companion-idle-subtext">
                        {shapesScore < 5 && !shapesHintUsed
                          ? `You need at least 5 XP to unlock a hint. (Current: ${shapesScore} XP)`
                          : "Sol is camouflaging with shapes. Tap if you want a geometry clue!"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {shapesMessage && shapesMessage.includes("Correct") && (
                <button
                  type="button"
                  className="save-button next-button"
                  style={{ marginTop: "20px" }}
                  onClick={nextShapesExercise}
                >
                  {isLastQuestion ? "Complete Module 5" : "Next Question →"}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 5 PROGRESS REPORT (SHAPES QUEST)
     ======================================================= */

  if (screen === "shapesReport") {
    const totalQuestions = playShapesLevels.reduce(
      (sum, item) => sum + item.exercises.length,
      0
    );

    const maxPossibleXP = totalQuestions * 3;
    const accuracy = totalQuestions > 0
      ? Math.min(100, Math.round((shapesScore / maxPossibleXP) * 100))
      : 0;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("teacher")}
        <div className="page">
          <section className="complete-card">
            <div className="complete-icon"><IconAward size={36} /></div>
            <p className="eyebrow">Module 05 Assessment Completed</p>
            <h1>SHAPES MASTER!</h1>
            <h2>{studentName || "STUDENT"}</h2>
            <p>
              YOU MASTERED 2D AND 3D SHAPES, SIDES, CORNERS, AND REAL-WORLD GEOMETRY.
            </p>

            <div className="final-score" style={{ margin: "25px 0" }}>
              {totalQuestions} / {totalQuestions}
              <div style={{ fontSize: "18px", marginTop: "8px" }}>
                SHAPES CHALLENGES COMPLETED
              </div>
            </div>

            <div className="analysis-grid" style={{ marginTop: "20px" }}>
              <div className="analysis-item">
                <span><IconStar size={16} /></span>
                <strong>SHAPES SCORE</strong>
                <p>{shapesScore} XP</p>
              </div>

              <div className="analysis-item">
                <span><IconTarget size={16} /></span>
                <strong>PERFORMANCE</strong>
                <p>{accuracy}%</p>
              </div>

              <div className="analysis-item">
                <span><IconShapes size={16} /></span>
                <strong>LEVELS</strong>
                <p>2 / 2 COMPLETED</p>
              </div>

              <div className="analysis-item">
                <span><IconAward size={16} /></span>
                <strong>GRADE</strong>
                <p>CLASS {selectedClass}</p>
              </div>
            </div>

            <div className="analysis-note" style={{ margin: "25px 0" }}>
              Skills Evaluated:
              <br />
              Circles, squares, triangles & rectangles
              <br />
              Stars, hearts, diamonds & ovals
              <br />
              Polygons, vertices, sides & corners
              <br />
              3D Solids: cubes, spheres, cylinders & cones
            </div>

            <StageComprehensiveAnalysis
              stageKey="shapes"
              stageName="Module 05: Spatial Geometry & Structural Reasoning"
              performance={stagePerformance.shapes}
              totalQuestions={totalQuestions}
              studentName={studentName}
              studentClass={selectedClass}
              score={shapesScore}
              onRestart={restartShapesStage}
              onNextStage={() => setScreen("stages")}
              nextStageTitle="Return to Assessment Modules"
            />
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 4 GAME — MATHS QUEST
     ======================================================= */

  if (screen === "stage4") {
    const level = playStage4Levels[stage4LevelIndex] || playStage4Levels[0];
    const exercise = level?.exercises?.[stage4ExerciseIndex] || level?.exercises?.[0];

    if (!level || !exercise) {
      return (
        <div className="app">
          <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
          <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
          {renderAppHeader("stages")}
          <div className="page" style={{ textAlign: "center", padding: "80px 20px" }}>
            <div className="stage-card" style={{ maxWidth: 500, margin: "0 auto", padding: 30 }}>
              <h2>Maths Jutsu Temple Ready</h2>
              <p style={{ margin: "16px 0 24px" }}>Numerical challenges for Class {selectedClass} are ready.</p>
              <button className="save-button" onClick={() => { setStage4LevelIndex(0); setStage4ExerciseIndex(0); }}>Enter Temple</button>
            </div>
          </div>
        </div>
      );
    }

    const totalQuestions = playStage4Levels.reduce(
      (sum, item) => sum + item.exercises.length,
      0
    );

    const completedBefore = playStage4Levels
      .slice(0, stage4LevelIndex)
      .reduce((sum, item) => sum + item.exercises.length, 0) + stage4ExerciseIndex;

    const currentCompleted =
      completedBefore + (stage4Message && stage4Message.includes("Correct") ? 1 : 0);

    const overallProgress = Math.round((currentCompleted / totalQuestions) * 100);

    const levelCompleted =
      stage4ExerciseIndex + (stage4Message && stage4Message.includes("Correct") ? 1 : 0);

    const levelProgress = Math.round((levelCompleted / level.exercises.length) * 100);

    const isLastQuestion =
      stage4ExerciseIndex === level.exercises.length - 1 &&
      stage4LevelIndex === playStage4Levels.length - 1;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <div className="page">
          <div className="top-bar">
            <button
              className="back-button"
              onClick={() => {
                window.speechSynthesis?.cancel();
                setScreen("stages");
              }}
            >
              ← STAGES
            </button>
            <div className="score-display">
              {stage4Score} XP
            </div>
          </div>

          <section className="stage-card">
            <p className="eyebrow">
              Class {selectedClass} • Module 04: Numerical Cognition
            </p>
            <h1>Numerical Cognition & Mathematics</h1>
            <p className="stage-description">
              MASTER NUMBER REASONING & ARITHMETIC JUTSU STEP BY STEP.
            </p>

            {/* CURRENT LEVEL DISPLAY */}
            <div className="current-level-display">
              <span className="current-level-pill">
                Level {stage4LevelIndex + 1} • {formatDifficulty(level.difficulty)}
              </span>
            </div>

            {/* OVERALL PROGRESS */}
            <div className="progress-area">
              <div className="progress-label">
                <span>Module 04 Progress</span>
                <span>{currentCompleted} / {totalQuestions}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: "8px",
                }}
              >
                {overallProgress}% COMPLETED
              </p>
            </div>

            {/* CURRENT LEVEL PROGRESS */}
            <div className="progress-area">
              <div className="progress-label">
                <span>Level {stage4LevelIndex + 1} PROGRESS</span>
                <span>{levelCompleted} / {level.exercises.length}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>

            {/* EXERCISE CARD */}
            <div className="exercise-card">
              <div className="exercise-header">
                <span className="exercise-type">Module 04: Mathematics</span>
                <span className="question-level-badge">
                  Level {stage4LevelIndex + 1} • {formatDifficulty(level.difficulty)}
                </span>
                <span>
                  QUESTION {stage4ExerciseIndex + 1} / {level.exercises.length}
                </span>
              </div>

              <h2>SOLVE THIS QUESTION</h2>

              <div
                className="reading-target"
                style={{
                  fontSize: "32px",
                  padding: "24px 20px",
                  margin: "20px 0",
                  letterSpacing: "1px",
                }}
              >
                {exercise.question}
              </div>

              {/* READ ALOUD BUTTON */}
              <button
                type="button"
                className="shape-fact-audio-btn read-aloud-btn"
                style={{ marginTop: "12px" }}
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(exercise.question);
                    utterance.rate = 0.8;
                    utterance.pitch = 1.05;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              >
                <IconVolume size={14} /> Read Question Aloud
              </button>

              {/* ANSWER OPTIONS GRID */}
              <div className="answer-grid" style={{ marginTop: "24px" }}>
                {exercise.options.map((option) => {
                  const isSelected = stage4Answer === option;
                  const isCorrect = option === exercise.answer;

                  let buttonClass = "answer-button ";
                  if (isSelected) {
                    buttonClass += isCorrect ? "correct" : "wrong";
                  }

                  return (
                    <button
                      key={option}
                      className={buttonClass}
                      disabled={Boolean(stage4Message && stage4Message.includes("Correct"))}
                      onClick={() => answerStageFourQuestion(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK & HINT */}
              {stage4Message && (
                <div
                  className={
                    stage4Message.includes("Correct")
                      ? "feedback correct-feedback"
                      : "feedback wrong-feedback"
                  }
                  style={{ marginTop: "20px" }}
                >
                  {stage4Message}
                </div>
              )}

              {stage4Hint && (
                <div className="shape-fact-card pedagogical-clue-card" style={{ marginTop: "16px" }}>
                  <div className="shape-fact-header">
                    <span className="shape-fact-title">
                      <IconLightbulb size={18} /> PEDAGOGICAL HINT
                    </span>
                    <button
                      type="button"
                      className="shape-fact-audio-btn read-aloud-btn"
                      onClick={() => {
                        if ("speechSynthesis" in window) {
                          window.speechSynthesis.cancel();
                          const u = new SpeechSynthesisUtterance(stage4Hint);
                          u.rate = 0.85;
                          window.speechSynthesis.speak(u);
                        }
                      }}
                    >
                      <IconVolume size={14} /> Read Hint Aloud
                    </button>
                  </div>
                  <div className="shape-fact-body">
                    {stage4Hint}
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              {stage4Message && !stage4Message.includes("Correct") && (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setStage4Answer("");
                      setStage4Message("");
                    }}
                  >
                    Try Again
                  </button>

                  {!stage4HintUsed && (
                    <button
                      type="button"
                      className="btn-unlock-clue"
                      onClick={useStageFourHint}
                      disabled={stage4Score < 5}
                    >
                      <IconLightbulb size={16} /> Conceptual Hint (-5 XP)
                    </button>
                  )}
                </div>
              )}

              {/* DEDICATED COMPANION AREA (BELOW ANSWERS) */}
              <div className="companion-bottom-bar">
                <div
                  className="companion-avatar-wrap"
                  onClick={() => {
                    if (stage4ShowHint) {
                      setStage4ShowHint(false);
                    } else if (stage4HintUsed) {
                      setStage4ShowHint(true);
                    } else {
                      useStageFourHint();
                    }
                  }}
                  title="Click Koji the Bamboo Panda for a math hint!"
                >
                  <KojiPanda size="small" />
                </div>

                <div className="companion-dialogue-col">
                  {stage4ShowHint ? (
                    <div className="companion-dialogue-bubble">
                      <div className="dialogue-header">
                        <span className="companion-name-tag">
                          <IconLightbulb size={14} /> Koji's Bamboo Clue
                        </span>
                        <button
                          type="button"
                          className="btn-dismiss-hint"
                          onClick={() => setStage4ShowHint(false)}
                        >
                          ✕ Hide
                        </button>
                      </div>
                      <p className="dialogue-message">
                        {stage4Hint || exercise?.hint || "Breathe with the bamboo scroll. Break down the numbers step by step to solve the problem!"}
                      </p>
                    </div>
                  ) : (
                    <div className="companion-idle-bar">
                      <button
                        type="button"
                        className="btn-request-hint"
                        onClick={useStageFourHint}
                      >
                        <IconLightbulb size={16} /> Need a Hint from Koji?
                      </button>
                      <span className="companion-idle-subtext">
                        {stage4Score < 5 && !stage4HintUsed
                          ? `You need at least 5 XP to unlock a hint. (Current: ${stage4Score} XP)`
                          : "Koji is meditating on the numbers. Tap if you want a math tip!"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {stage4Message && stage4Message.includes("Correct") && (
                <button
                  type="button"
                  className="save-button next-button"
                  style={{ marginTop: "20px" }}
                  onClick={nextStageFourExercise}
                >
                  {isLastQuestion ? "Complete Module 4" : "Next Question →"}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 4 PROGRESS REPORT
     ======================================================= */

  if (screen === "stage4Report") {
    const totalQuestions = playStage4Levels.reduce(
      (sum, item) => sum + item.exercises.length,
      0
    );

    const maxPossibleXP = totalQuestions * 3;
    const accuracy = totalQuestions > 0
      ? Math.min(100, Math.round((stage4Score / maxPossibleXP) * 100))
      : 0;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("teacher")}
        <div className="page">
          <section className="complete-card">
            <div className="complete-icon"><IconAward size={36} /></div>
            <p className="eyebrow">Module 04 Assessment Completed</p>
            <h1>MATHS MASTER!</h1>
            <h2>{studentName || "STUDENT"}</h2>
            <p>
              YOU COMPLETED ARITHMETIC, COUNTING AND SHAPE REASONING CHALLENGES.
            </p>

            <div className="final-score" style={{ margin: "25px 0" }}>
              {totalQuestions} / {totalQuestions}
              <div style={{ fontSize: "18px", marginTop: "8px" }}>
                MATHS CHALLENGES COMPLETED
              </div>
            </div>

            <div className="analysis-grid" style={{ marginTop: "20px" }}>
              <div className="analysis-item">
                <span><IconStar size={16} /></span>
                <strong>MATHS SCORE</strong>
                <p>{stage4Score} XP</p>
              </div>

              <div className="analysis-item">
                <span><IconTarget size={16} /></span>
                <strong>PERFORMANCE</strong>
                <p>{accuracy}%</p>
              </div>

              <div className="analysis-item">
                <span><IconCalculator size={16} /></span>
                <strong>LEVELS</strong>
                <p>3 / 3 COMPLETED</p>
              </div>

              <div className="analysis-item">
                <span><IconAward size={16} /></span>
                <strong>GRADE</strong>
                <p>CLASS {selectedClass}</p>
              </div>
            </div>

            <div className="analysis-note" style={{ margin: "25px 0" }}>
              Skills Evaluated:
              <br />
              Addition & numerical sequences
              <br />
              Subtraction & place-value relations
              <br />
              Multiplication & division operations
              <br />
              Perimeters, measurements & geometric logic
            </div>

            <StageComprehensiveAnalysis
              stageKey="stage4"
              stageName="Module 04: Numerical Cognition & Mathematics"
              performance={stagePerformance.stage4}
              totalQuestions={totalQuestions}
              studentName={studentName}
              studentClass={selectedClass}
              score={stage4Score}
              onRestart={restartStageFour}
              onNextStage={enterShapesStage}
              nextStageTitle="Continue to Module 05 (Spatial Geometry) →"
            />
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 1 GAME
     CLASS-SPECIFIC • VISUAL ONLY
     3 LEVELS × 9 QUESTIONS = 27 QUESTIONS
     ======================================================= */

  /* =======================================================
     STAGE 3 GAME — WRITTEN EXPRESSION & ENCODING
     ======================================================= */
  if (screen === "stage3") {
    const stage3Bank =
      playStage3Levels && playStage3Levels.length > 0
        ? playStage3Levels
        : getStage3LevelsForClass(selectedClass);

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <Module3Activity
          classNumber={selectedClass}
          levels={stage3Bank}
          levelIndex={stage3LevelIndex}
          exerciseIndex={stage3ExerciseIndex}
          currentXp={userCtx ? userCtx.totalXp : stage3Score}
          onAwardXp={(amt = 3) => {
            if (userCtx) {
              userCtx.awardXp(amt);
            } else {
              setStage3Score((prev) => prev + amt);
            }
            trigger3DCelebration(amt, true);
          }}
          onDeductXp={(amt = 5) => {
            if (userCtx) {
              const success = userCtx.spendXp(amt);
              if (success) {
                setStage3Score(userCtx.totalXp - amt);
              }
              return success;
            } else {
              if (stage3Score < amt) return false;
              setStage3Score((prev) => prev - amt);
              return true;
            }
          }}
          onRecordPerformance={(stageKey, isCorrect, exercise, answer) => {
            recordStagePerformance(stageKey, isCorrect, exercise, answer);
          }}
          onNextQuestion={() => {
            const currentLevel = stage3Bank[stage3LevelIndex] || stage3Bank[0];
            const lastQuestion =
              stage3ExerciseIndex === (currentLevel?.exercises?.length || 0) - 1;
            const lastLevel = stage3LevelIndex === stage3Bank.length - 1;

            if (!lastQuestion) {
              setStage3ExerciseIndex((prev) => prev + 1);
            } else if (!lastLevel) {
              setStage3LevelIndex((prev) => prev + 1);
              setStage3ExerciseIndex(0);
            } else {
              setScreen("stage3Report");
            }
          }}
          onCompleteModule={() => {
            setScreen("stage3Report");
          }}
          onBackToStages={() => {
            setScreen("stages");
          }}
        />
      </div>
    );
  }

  /* =======================================================
     STAGE 3 PROGRESS REPORT
     ======================================================= */

  if (screen === "stage3Report") {
    const stage3Bank =
      playStage3Levels && playStage3Levels.length > 0
        ? playStage3Levels
        : getStage3LevelsForClass(selectedClass);

    const totalStage3Questions = stage3Bank.reduce(
      (sum, item) => sum + item.exercises.length,
      0
    );

    const currentReportXp = userCtx ? userCtx.totalXp : stage3Score;
    const stage3Perf = stagePerformance.stage3 || { firstTrySuccess: 0, wrongAttempts: 0, hintsUsed: 0 };
    const percentage = totalStage3Questions > 0
      ? Math.min(100, Math.max(0, Math.round(((stage3Perf.firstTrySuccess || 0) / totalStage3Questions) * 100)))
      : 100;

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("teacher")}
        <div className="page">
          <section className="complete-card">
            <div className="complete-icon"><IconAward size={36} /></div>
            <p className="eyebrow">Module 03 Assessment Completed</p>
            <h1>GREAT WORK!</h1>
            <h2>{studentName}</h2>
            <p>YOU COMPLETED WRITING & UNDERSTANDING PRACTICE.</p>

            <div className="final-score" style={{ margin: "25px 0" }}>
              {currentReportXp} XP
              <div style={{ fontSize: "18px", marginTop: "8px" }}>
                {totalStage3Questions} ACTIVITIES COMPLETED
              </div>
            </div>

            <div className="analysis-item" style={{ marginBottom: "20px" }}>
              <span><IconTarget size={16} /></span>
              <strong>WIZARD CASTLE SCORE</strong>
              <p>{percentage}%</p>
            </div>

            <StageComprehensiveAnalysis
              stageKey="stage3"
              stageName="Module 03: Written Expression & Language Encoding"
              performance={stagePerformance.stage3}
              totalQuestions={totalStage3Questions}
              studentName={studentName}
              studentClass={selectedClass}
              score={currentReportXp}
              onRestart={() => enterStageThree()}
              onNextStage={enterStageFour}
              nextStageTitle="Continue to Module 04 (Numerical Cognition) →"
            />
          </section>
        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 1 GAME — VISUAL PERCEPTION & DISCRIMINATION
     ======================================================= */
  if (screen === "stage1") {
    const level = playStage1Levels[levelIndex] || playStage1Levels[0];
    const exercise = level?.exercises?.[exerciseIndex] || level?.exercises?.[0];
    if (!level || !exercise) {
      return (
        <div className="app">
          <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
          <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
          {renderAppHeader("stages")}
          <div className="page" style={{ textAlign: "center", padding: "80px 20px" }}>
            <div className="stage-card" style={{ maxWidth: 500, margin: "0 auto", padding: 30 }}>
              <h2>Mirror Glyph Grove Ready</h2>
              <p style={{ margin: "16px 0 24px" }}>Visual exercises for Class {selectedClass} are ready.</p>
              <button className="save-button" onClick={() => { setLevelIndex(0); setExerciseIndex(0); }}>Begin Eagle Eye</button>
            </div>
          </div>
        </div>
      );
    }

    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);

    const classProgress =
      savedProgress?.stage1?.classes?.[
      String(classNumber)
      ] || createEmptyClassProgress();

    const completedIds =
      classProgress.completedQuestionIds || [];

    const totalExercises = 27;

    const currentLevelCompleted =
      level.exercises.filter((item) =>
        completedIds.includes(item.id)
      ).length;

    const currentCompleted =
      classProgress.completedQuestions || 0;

    const overallProgress =
      Math.round(
        (currentCompleted /
          totalExercises) *
        100
      );

    const levelProgress =
      Math.round(
        (currentLevelCompleted /
          level.exercises.length) *
        100
      );

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <div className="page">

          <div className="top-bar">

            <button
              className="back-button"
              onClick={() => {
                window.speechSynthesis?.cancel();
                setScreen("stages");
              }}
            >
              ← STAGES
            </button>

            <div className="score-display">
              {stageScore} XP
            </div>

          </div>

          <section className="stage-card">

            <p className="eyebrow">
              Class {classNumber} • Module 01: Visual Perception
            </p>

            <h1>
              Visual Perception & Orthography
            </h1>

            <p className="stage-description">
              SHARPEN YOUR EAGLE VISION! COMPARE PATTERNS AND FIND THE EXACT MATCH.
            </p>

            {/* CURRENT LEVEL DISPLAY */}
            <div className="current-level-display">
              <span className="current-level-pill">
                Level {levelIndex + 1} • {formatDifficulty(level.difficulty)}
              </span>
            </div>

            {/* OVERALL PROGRESS */}

            <div className="progress-area">

              <div className="progress-label">

                <span>
                  Module 01 Progress
                </span>

                <span>
                  {currentCompleted} / 27
                </span>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${overallProgress}%`,
                  }}
                />

              </div>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "8px",
                  fontWeight: "700",
                }}
              >
                {overallProgress}% COMPLETED
              </p>

            </div>

            {/* CURRENT LEVEL PROGRESS */}

            <div className="progress-area">

              <div className="progress-label">

                <span>
                  Level {levelIndex + 1} PROGRESS
                </span>

                <span>
                  {currentLevelCompleted} / 9
                </span>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${levelProgress}%`,
                  }}
                />

              </div>

              <p
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: "8px",
                }}
              >
                {currentLevelCompleted} / 9
                QUESTIONS COMPLETED
              </p>

            </div>

            {/* VISUAL QUESTION */}

            <div className="exercise-card">

              <div className="exercise-header">

                <span className="exercise-type">
                  Module 01: Visual Perception
                </span>

                <span className="question-level-badge">
                  Level {levelIndex + 1} • {formatDifficulty(level.difficulty)}
                </span>

                <span>
                  QUESTION {exerciseIndex + 1} / 9
                </span>

              </div>

              <h2>
                {exercise.question}
              </h2>

              <div className="big-letter">
                {exercise.visual}
              </div>

              <div className="listening-hint">
                Compare options carefully and identify the exact match.
                IT CAREFULLY WITH EACH OPTION.
              </div>

              {/* OPTIONS — NO AUDIO */}

              <div className="answer-grid">

                {exercise.options.map(
                  (option) => (
                    <button
                      key={option}
                      className={
                        "answer-button " +
                        (stageAnswer === option
                          ? option ===
                            exercise.answer
                            ? "correct"
                            : "wrong"
                          : "")
                      }
                      onClick={() =>
                        answerStageQuestion(
                          option
                        )
                      }
                      disabled={
                        Boolean(stageMessage && stageMessage.includes("Correct"))
                      }
                    >
                      {option}
                    </button>
                  )
                )}

              </div>

              {/* HINT / RETRY — ONLY AVAILABLE AFTER AN INCORRECT ANSWER */}

              {stageMessage &&
                stageMessage.includes("Wrong") && (
                  <div
                    className="hint-panel"
                    style={{
                      marginTop: "18px",
                      padding: "16px",
                      borderRadius: "14px",
                      border: "2px solid #f0c75e",
                      background: "#fff9e6",
                      textAlign: "center",
                    }}
                  >
                    {!hintUsed && !stageHint && (
                      <button
                        type="button"
                        className="btn-unlock-clue"
                        onClick={useStage1Hint}
                        disabled={stageScore < 5}
                      >
                        <IconLightbulb size={16} /> Conceptual Hint (-5 XP)
                      </button>
                    )}

                    {stageScore < 5 &&
                      !hintUsed && (
                        <p
                          style={{
                            margin: "10px 0 0",
                            fontWeight: "700",
                          }}
                        >
                          You need at least 5 XP to unlock a hint.
                        </p>
                      )}

                    {stageHint && (
                      <div className="shape-fact-card pedagogical-clue-card" style={{ margin: "14px 0" }}>
                        <div className="shape-fact-header">
                          <span className="shape-fact-title">
                            <IconLightbulb size={18} /> PEDAGOGICAL HINT
                          </span>
                          <button
                            type="button"
                            className="shape-fact-audio-btn read-aloud-btn"
                            onClick={() => {
                              if ("speechSynthesis" in window) {
                                window.speechSynthesis.cancel();
                                const u = new SpeechSynthesisUtterance(stageHint);
                                u.rate = 0.85;
                                window.speechSynthesis.speak(u);
                              }
                            }}
                          >
                            <IconVolume size={14} /> Read Hint Aloud
                          </button>
                        </div>
                        <div className="shape-fact-body">
                          {stageHint}
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => {
                        setStageAnswer("");
                        setStageMessage("");
                        setStage1ShowHint(false);
                      }}
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                )}

              {/* DEDICATED COMPANION AREA (BELOW ANSWERS) */}
              <div className="companion-bottom-bar">
                <div
                  className="companion-avatar-wrap"
                  onClick={() => {
                    if (stage1ShowHint) {
                      setStage1ShowHint(false);
                    } else if (hintUsed) {
                      setStage1ShowHint(true);
                    } else {
                      useStage1Hint();
                    }
                  }}
                  title="Click Baron the Scout Eagle for a hint!"
                >
                  <BaronEagle size="small" />
                </div>

                <div className="companion-dialogue-col">
                  {stage1ShowHint ? (
                    <div className="companion-dialogue-bubble">
                      <div className="dialogue-header">
                        <span className="companion-name-tag">
                          <IconLightbulb size={14} /> Baron's Scout Clue
                        </span>
                        <button
                          type="button"
                          className="btn-dismiss-hint"
                          onClick={() => setStage1ShowHint(false)}
                        >
                          ✕ Hide
                        </button>
                      </div>
                      <p className="dialogue-message">
                        {stageHint || exercise?.hint || "Look closely at the letter's belly and stick! Mirror letters reflect horizontally."}
                      </p>
                    </div>
                  ) : (
                    <div className="companion-idle-bar">
                      <button
                        type="button"
                        className="btn-request-hint"
                        onClick={useStage1Hint}
                      >
                        <IconLightbulb size={16} /> Need a Hint from Baron?
                      </button>
                      <span className="companion-idle-subtext">
                        {stageScore < 5 && !hintUsed
                          ? `You need at least 5 XP to unlock a hint. (Current: ${stageScore} XP)`
                          : "Baron is scouting from above. Tap if you want a visual clue!"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* FEEDBACK */}

              {stageMessage && (
                <div
                  className={
                    stageMessage.includes(
                      "Correct"
                    )
                      ? "feedback correct-feedback"
                      : "feedback wrong-feedback"
                  }
                >
                  {stageMessage}
                </div>
              )}

              {/* NEXT */}

              {stageMessage && stageMessage.includes("Correct") && (
                <button
                  className="save-button next-button"
                  onClick={nextExercise}
                >
                  {exerciseIndex === 8
                    ? levelIndex === 2
                      ? "Complete Module 1"
                      : "View Level Report"
                    : "NEXT QUESTION →"}
                </button>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >

                <button
                  className="back-button"
                  onClick={goBackQuestion}
                >
                  ← PREVIOUS QUESTION
                </button>

                <button
                  className="secondary-button"
                  onClick={restartStageOne}
                >
                  Restart Level
                </button>

              </div>

              <div
                className="analysis-note"
                style={{
                  marginTop: "18px",
                }}
              >
                Response recorded
                AUTOMATICALLY AFTER EVERY QUESTION.
              </div>

            </div>

          </section>

        </div>
      </div>
    );
  }

  /* =======================================================
     LEVEL PROGRESS REPORT
     ======================================================= */

  if (screen === "levelReport") {
    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);

    const completedLevel =
      playStage1Levels[
      completedLevelNumber - 1
      ];

    const classProgress =
      savedProgress?.stage1?.classes?.[
      String(classNumber)
      ] || createEmptyClassProgress();

    const completedQuestionsForLevel =
      classProgress.completedQuestionIds?.length || 0;

    const overallPercentage =
      Math.round(
        (completedQuestionsForLevel / 27) *
        100
      );

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("stages")}
        <div className="page">

          <section className="complete-card">

            <div className="complete-icon"><IconAward size={36} /></div>

            <p className="eyebrow">
              CLASS {classNumber} • LEVEL{" "}
              {completedLevelNumber} COMPLETE
            </p>

            <h1>
              {completedLevel?.title}
            </h1>

            <h2>
              WELL DONE,{" "}
              {studentName || "STUDENT"}!
            </h2>

            <p>
              YOU FINISHED ALL 9 QUESTIONS
              IN THIS LEVEL.
              <br />
              YOUR PROGRESS HAS BEEN SAVED.
            </p>

            <div className="final-score">

              9 / 9 Complete

              <div
                style={{
                  fontSize: "18px",
                  marginTop: "8px",
                }}
              >
                LEVEL QUESTIONS COMPLETED
              </div>

            </div>

            <div className="analysis-grid">

              <div className="analysis-item">
                <span><IconBookOpen size={16} /></span>
                <strong>LEVEL PROGRESS</strong>
                <p>9 / 9</p>
              </div>

              <div className="analysis-item">
                <span><IconTarget size={16} /></span>
                <strong>STAGE PROGRESS</strong>
                <p>
                  {completedQuestionsForLevel} / 27
                </p>
              </div>

              <div className="analysis-item">
                <span><IconTarget size={16} /></span>
                <strong>COMPLETION</strong>
                <p>
                  {overallPercentage}%
                </p>
              </div>

              <div className="analysis-item">
                <span><IconLayers size={16} /></span>
                <strong>SAVED</strong>
                <p>YES</p>
              </div>

            </div>

            <div className="progress-area">

              <div className="progress-label">
                <span>
                  OVERALL EAGLE EYE PROGRESS
                </span>

                <span>
                  {completedQuestionsForLevel} / 27
                </span>
              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${overallPercentage}%`,
                  }}
                />

              </div>

            </div>

            <div className="analysis-note">
              Every response in this assessment level
              HAS BEEN SAVED.
              <br />
              You may proceed to
              THE NEXT LEVEL AT ANY TIME.
            </div>

            <button
              className="save-button"
              onClick={() => {
                if (
                  completedLevelNumber <
                  playStage1Levels.length
                ) {
                  setLevelIndex(
                    completedLevelNumber
                  );

                  setExerciseIndex(0);
                  setStageAnswer("");
                  setStageMessage("");

                  setScreen("stage1");
                } else {
                  setScreen("stage1Report");
                }
              }}
            >
              {completedLevelNumber <
                playStage1Levels.length
                ? `Proceed to Level ${completedLevelNumber + 1
                }`
                : "View Assessment Report"}
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                setScreen("stages")
              }
            >
              ← BACK TO REALMS
            </button>

          </section>

        </div>
      </div>
    );
  }

  /* =======================================================
     STAGE 1 PROGRESS REPORT
     ======================================================= */

  if (screen === "stage1Report") {
    const classNumber = getNormalizedClassNumber(studentClass || selectedClass);

    const classProgress =
      savedProgress?.stage1?.classes?.[
      String(classNumber)
      ] || createEmptyClassProgress();

    const totalQuestions = 27;

    const completedQuestions =
      classProgress.completedQuestions || 0;

    const correctQuestions =
      classProgress.correctQuestionIds?.length || 0;

    const percentage =
      Math.round(
        (correctQuestions /
          totalQuestions) *
        100
      );

    return (
      <div className="app">
        <SpatialBackground3D pulseTrigger={spatialPulse} pulseType={pulseType} />
        <ParticleFX trigger={fxTrigger} score={fxScore} combo={fxCombo} />
        {renderAppHeader("teacher")}
        <div className="page">

          <section className="complete-card">

            <div className="complete-icon">
              <IconAward size={36} />
            </div>

            <p className="eyebrow">
              Class {classNumber} • Module 01 Assessment Completed
            </p>

            <h1>
              AMAZING WORK!
            </h1>

            <h2>
              {studentName}
            </h2>

            <p>
              YOU COMPLETED ALL 27 VISUAL
              QUESTIONS FOR CLASS {classNumber}.
              <br />
              YOUR PROGRESS HAS BEEN SAVED.
            </p>

            <div
              className="final-score"
              style={{
                margin: "25px 0",
              }}
            >
              {completedQuestions} / 27

              <div
                style={{
                  fontSize: "18px",
                  marginTop: "8px",
                }}
              >
                QUESTIONS COMPLETED
              </div>
            </div>

            <div
              className="analysis-grid"
              style={{
                marginTop: "20px",
              }}
            >

              <div className="analysis-item">
                <span><IconStar size={16} /></span>

                <strong>
                  SCORE
                </strong>

                <p>
                  {correctQuestions} / 27
                </p>
              </div>

              <div className="analysis-item">
                <span><IconTarget size={16} /></span>

                <strong>
                  ACCURACY
                </strong>

                <p>
                  {percentage}%
                </p>
              </div>

              <div className="analysis-item">
                <span><IconBookOpen size={16} /></span>

                <strong>
                  LEVELS
                </strong>

                <p>
                  3 / 3
                </p>
              </div>

              <div className="analysis-item">
                <span><IconLayers size={16} /></span>

                <strong>
                  SAVED
                </strong>

                <p>
                  YES
                </p>
              </div>

            </div>

            <div
              className="progress-area"
              style={{
                marginTop: "30px",
              }}
            >

              <div className="progress-label">

                <span>
                  STAGE 1 COMPLETION
                </span>

                <span>
                  100%
                </span>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: "100%",
                  }}
                />

              </div>

            </div>

            <div className="analysis-note">

              Class {classNumber} Module 01 Evaluation:

              <br />

              Level 1: 9 Visual Perception Items

              <br />

              Level 2: 9 Visual Perception Items

              <br />

              Level 3: 9 Visual Perception Items

              <br />

              All 27 Assessment Items Recorded

            </div>

            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "25px 0",
              }}
            >
              Assessment completed. Visual perception responses recorded.
            </p>

            <StageComprehensiveAnalysis
              stageKey="stage1"
              stageName="Module 01: Visual Perception & Orthography"
              performance={stagePerformance.stage1}
              totalQuestions={totalQuestions}
              studentName={studentName}
              studentClass={classNumber}
              score={correctQuestions * 3}
              onRestart={restartStageOne}
              onNextStage={enterStageTwo}
              nextStageTitle="Continue to Module 02 (Auditory Processing) →"
            />

          </section>

        </div>
      </div>
    );
  }

  return (
    <NotFoundScreen
      onBackHome={() => setScreen("home")}
      onNavigate={(target) => {
        if (target === "stages") enterStages();
        else if (target === "profile") startProfileCreation();
        else if (target === "home") setScreen("home");
        else if (target === "login") setScreen("login");
        else if (target === "teacher") setScreen("teacher");
        else if (target === "privacy") setScreen("privacy");
        else if (target === "terms") setScreen("terms");
        else if (target === "stage1") showGladeTransition("stage1");
        else if (target === "stage2") showGladeTransition("stage2");
        else if (target === "stage3") showGladeTransition("stage3");
        else if (target === "stage4") showGladeTransition("stage4");
        else if (target === "shapes") showGladeTransition("shapes");
        else if (target === "comprehension") showGladeTransition("comprehension");
        else setScreen(target);
      }}
    />
  );
}

class JungleErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.warn("Jungle Explorer Boundary caught render issue:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="app" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fefae0" }}>
          <div className="stage-card" style={{ maxWidth: 520, margin: "20px", padding: "36px", textAlign: "center" }}>
            <div style={{ color: "#16a34a", marginBottom: "16px" }}>
              <IconCompass size={48} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display, 'Outfit', sans-serif)", color: "#451a03", marginBottom: "12px" }}>
              Expedition Guide Checkpoint
            </h2>
            <p style={{ margin: "12px 0 24px", color: "#78350f", fontSize: "1.02rem", lineHeight: "1.5" }}>
              Your explorer passport and XP Stars are securely saved. Tap below to resume your learning adventure.
            </p>
            <button
              className="save-button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.hash = "home";
                window.location.reload();
              }}
            >
              Return to Canopy Trail
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function SafeAppWrapper() {
  return (
    <JungleErrorBoundary>
      <OfflineBanner />
      <App />
    </JungleErrorBoundary>
  );
}

export default SafeAppWrapper;
