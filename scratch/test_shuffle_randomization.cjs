// scratch/test_shuffle_randomization.cjs
const { CLASS_STAGE1_BANK } = require('../src/data/stage1Bank');
const {
  CLASS1_STAGE2_BANK,
  CLASS2_STAGE2_BANK,
  CLASS3_STAGE2_BANK,
  CLASS4_STAGE2_BANK,
  CLASS5_STAGE2_BANK,
} = require('../src/data/stage2Bank');
const {
  CLASS1_STAGE3_BANK,
  CLASS2_STAGE3_BANK,
  CLASS3_STAGE3_BANK,
  CLASS4_STAGE3_BANK,
  CLASS5_STAGE3_BANK,
} = require('../src/data/stage3Bank');
const { mathQuestionBanks } = require('../src/data/stage4Bank');
const { classShapesQuestionBank } = require('../src/data/stage5Bank');
const { getComprehensionLevelsForClass } = require('../src/data/comprehensionBank');

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function getNormalizedClassNumber(rawClass) {
  if (typeof rawClass === "number" && rawClass >= 1 && rawClass <= 5) return rawClass;
  const match = String(rawClass || "").match(/[1-5]/);
  return match ? Number(match[0]) : 1;
}

// Emulate stage getters exactly as written in App.jsx
const getStage1LevelsForClass = (classNumber) => {
  const classKey = String(getNormalizedClassNumber(classNumber));
  const levels = CLASS_STAGE1_BANK[classKey] || CLASS_STAGE1_BANK["1"];
  return levels.map((level) => ({
    ...level,
    exercises: shuffleArray(
      level.exercises.map((exercise, index) => ({
        ...exercise,
        id: exercise.id || `c${classKey}l${level.id}q${index + 1}`,
        options: shuffleArray([...new Set(exercise.options || [])]),
      }))
    ),
  }));
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

console.log("=== Testing Shuffling Across All Stages ===");

// Check Stage 1
const s1_a = getStage1LevelsForClass(1)[0].exercises;
const s1_b = getStage1LevelsForClass(1)[0].exercises;
console.log("Stage 1 Q1 run A:", s1_a[0].visual, "Options:", s1_a[0].options);
console.log("Stage 1 Q1 run B:", s1_b[0].visual, "Options:", s1_b[0].options);

// Check Stage 2
const s2_a = createShuffledStage2(1)[0].exercises;
const s2_b = createShuffledStage2(1)[0].exercises;
console.log("Stage 2 Words run A:", s2_a.map(e => e.text).slice(0, 4));
console.log("Stage 2 Words run B:", s2_b.map(e => e.text).slice(0, 4));

// Check Stage 3
const s3_a = getStage3LevelsForClass(1)[0].exercises;
const s3_b = getStage3LevelsForClass(1)[0].exercises;
console.log("Stage 3 Q1 run A:", s3_a[0].question, "Options:", s3_a[0].options);
console.log("Stage 3 Q1 run B:", s3_b[0].question, "Options:", s3_b[0].options);

// Check Stage 4
const s4_a = getStage4LevelsForClass(1)[0].exercises;
const s4_b = getStage4LevelsForClass(1)[0].exercises;
console.log("Stage 4 Q1 run A:", s4_a[0].question, "Options:", s4_a[0].options);
console.log("Stage 4 Q1 run B:", s4_b[0].question, "Options:", s4_b[0].options);

// Check Stage 5
const s5_a = getShapesLevelsForClass(1)[0].exercises;
const s5_b = getShapesLevelsForClass(1)[0].exercises;
console.log("Stage 5 Q1 run A:", s5_a[0].question, "Options:", s5_a[0].options);
console.log("Stage 5 Q1 run B:", s5_b[0].question, "Options:", s5_b[0].options);

// Check Stage 6
const s6_a = getComprehensionLevelsForClass(1)[0].questions;
const s6_b = getComprehensionLevelsForClass(1)[0].questions;
console.log("Stage 6 Q1 run A:", s6_a[0].question, "Options:", s6_a[0].options);
console.log("Stage 6 Q1 run B:", s6_b[0].question, "Options:", s6_b[0].options);

// Verify integrity of all answers
for (let c = 1; c <= 5; c++) {
  getStage1LevelsForClass(c).forEach(l => l.exercises.forEach(e => {
    if (!e.options.includes(e.answer)) throw new Error(`Stage 1 answer missing in options`);
  }));
  getStage4LevelsForClass(c).forEach(l => l.exercises.forEach(e => {
    if (!e.options.includes(e.answer)) throw new Error(`Stage 4 answer missing in options`);
  }));
  getShapesLevelsForClass(c).forEach(l => l.exercises.forEach(e => {
    if (!e.options.includes(e.answer)) throw new Error(`Stage 5 answer missing in options`);
  }));
  getComprehensionLevelsForClass(c).forEach(l => l.questions.forEach(e => {
    if (!e.options.includes(e.answer)) throw new Error(`Stage 6 answer missing in options`);
  }));
}

console.log("All shuffle tests and answer integrity tests passed!");
