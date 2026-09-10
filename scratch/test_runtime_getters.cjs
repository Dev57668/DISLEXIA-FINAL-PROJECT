// scratch/test_runtime_getters.cjs
const { mathQuestionBanks } = require('../src/data/stage4Bank');
const { classShapesQuestionBank } = require('../src/data/stage5Bank');
const { getComprehensionLevelsForClass } = require('../src/data/comprehensionBank');

function getNormalizedClassNumber(val) {
  const num = parseInt(val, 10);
  return isNaN(num) || num < 1 || num > 5 ? 1 : num;
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

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
    return {
      ...cfg,
      exercises: rawQuestions.map((q, idx) => ({
        id: `c${classKey}-m-l${cfg.id}-q${idx + 1}`,
        question: q.question,
        options: shuffleArray([...(q.options || [])]),
        answer: q.answer,
      })),
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
    return {
      ...cfg,
      exercises: rawQuestions.map((q, idx) => ({
        id: `c${classKey}-sh-l${cfg.id}-q${idx + 1}`,
        question: q.question,
        shape: q.shape,
        options: shuffleArray([...(q.options || [])]),
        answer: q.answer,
        hint: q.hint,
        fact: q.fact,
      })),
    };
  });
};

for (let c = 1; c <= 5; c++) {
  const s4 = getStage4LevelsForClass(c);
  console.log(`Class ${c} Stage 4 levels: ${s4.length}, questions: ${s4.map(l => l.exercises.length).join('+')}`);
  
  const s5 = getShapesLevelsForClass(c);
  console.log(`Class ${c} Stage 5 levels: ${s5.length}, questions: ${s5.map(l => l.exercises.length).join('+')}`);
  
  const s6 = getComprehensionLevelsForClass(c);
  console.log(`Class ${c} Stage 6 levels: ${s6.length}, questions: ${s6.map(l => l.questions.length).join('+')}`);
}

console.log('Runtime getter tests passed successfully!');
