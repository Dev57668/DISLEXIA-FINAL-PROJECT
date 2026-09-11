// scratch/test_all_stages.cjs
// Comprehensive test suite for all 6 stages across classes 1 to 5

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
const { classComprehensionBank, getComprehensionLevelsForClass } = require('../src/data/comprehensionBank');

let errors = [];

// ================= STAGE 1 =================
console.log('--- Testing Stage 1 (Visual Recognition) ---');
for (let c = 1; c <= 5; c++) {
  const levels = CLASS_STAGE1_BANK[c];
  if (!levels || !Array.isArray(levels) || levels.length !== 3) {
    errors.push(`Stage 1 missing or not 3 levels for Class ${c}`);
    continue;
  }
  levels.forEach((lvl, lvlIdx) => {
    if (!lvl.exercises || lvl.exercises.length === 0) {
      errors.push(`Stage 1 Class ${c} Level ${lvlIdx + 1} has no exercises`);
    } else {
      lvl.exercises.forEach((item, idx) => {
        if (!item.answer || !item.options || item.options.length < 2) {
          errors.push(`Stage 1 Class ${c} Level ${lvlIdx + 1} item ${idx} malformed: ${JSON.stringify(item)}`);
        }
        if (!item.options.includes(item.answer)) {
          errors.push(`Stage 1 Class ${c} Level ${lvlIdx + 1} item ${idx} answer '${item.answer}' not in options`);
        }
      });
    }
  });
}
console.log('Stage 1 verified for classes 1-5.');

// ================= STAGE 2 =================
console.log('--- Testing Stage 2 (Audio Phonics) ---');
const stage2Banks = {
  1: CLASS1_STAGE2_BANK,
  2: CLASS2_STAGE2_BANK,
  3: CLASS3_STAGE2_BANK,
  4: CLASS4_STAGE2_BANK,
  5: CLASS5_STAGE2_BANK,
};
for (let c = 1; c <= 5; c++) {
  const bank = stage2Banks[c];
  if (!bank || !Array.isArray(bank) || bank.length !== 3) {
    errors.push(`Stage 2 Class ${c} bank missing or not 3 levels`);
    continue;
  }
  bank.forEach(lvl => {
    if (!lvl.exercises || lvl.exercises.length === 0) {
      errors.push(`Stage 2 Class ${c} level ${lvl.id} has no exercises`);
    } else {
      lvl.exercises.forEach((ex, idx) => {
        if (!ex.id || !ex.type || !ex.text) {
          errors.push(`Stage 2 Class ${c} level ${lvl.id} ex ${idx} malformed: ${JSON.stringify(ex)}`);
        }
      });
    }
  });
}
console.log('Stage 2 verified for classes 1-5.');

// ================= STAGE 3 =================
console.log('--- Testing Stage 3 (Word Builder) ---');
const stage3Banks = {
  1: CLASS1_STAGE3_BANK,
  2: CLASS2_STAGE3_BANK,
  3: CLASS3_STAGE3_BANK,
  4: CLASS4_STAGE3_BANK,
  5: CLASS5_STAGE3_BANK,
};
for (let c = 1; c <= 5; c++) {
  const bank = stage3Banks[c];
  if (!bank || !Array.isArray(bank) || bank.length !== 3) {
    errors.push(`Stage 3 Class ${c} bank missing or not 3 levels`);
    continue;
  }
  bank.forEach(lvl => {
    if (!lvl.exercises || lvl.exercises.length === 0) {
      errors.push(`Stage 3 Class ${c} level ${lvl.id} has no exercises`);
    } else {
      lvl.exercises.forEach((ex, idx) => {
        if (ex.word && ex.distractors) {
          // Word builder format
        } else if (ex.options && ex.answer) {
          // Multiple choice format
          if (!ex.options.includes(ex.answer)) {
            errors.push(`Stage 3 Class ${c} level ${lvl.id} ex ${idx} answer '${ex.answer}' not in options`);
          }
        } else if ((ex.question || ex.prompt) && ex.answer) {
          // Written response format
        } else {
          errors.push(`Stage 3 Class ${c} level ${lvl.id} ex ${idx} malformed: ${JSON.stringify(ex)}`);
        }
      });
    }
  });
}
console.log('Stage 3 verified for classes 1-5.');

// ================= STAGE 4 =================
console.log('--- Testing Stage 4 (Maths Quest / Number Ninja) ---');
let stage4Count = 0;
for (let c = 1; c <= 5; c++) {
  const classBank = mathQuestionBanks[c];
  if (!classBank) {
    errors.push(`Stage 4 Class ${c} missing`);
    continue;
  }
  [1, 2, 3].forEach(lvl => {
    const questions = classBank[lvl];
    if (!questions || !Array.isArray(questions) || questions.length !== 10) {
      errors.push(`Stage 4 Class ${c} Level ${lvl} expected 10 questions, found ${questions ? questions.length : 0}`);
    } else {
      questions.forEach((q, idx) => {
        stage4Count++;
        if (!q.question || !q.options || !q.answer) {
          errors.push(`Stage 4 Class ${c} Level ${lvl} Q${idx+1} missing fields`);
        }
        if (!q.options.includes(q.answer)) {
          errors.push(`Stage 4 Class ${c} Level ${lvl} Q${idx+1} answer '${q.answer}' not in options: ${JSON.stringify(q.options)}`);
        }
        if (q.options.length !== 4) {
          errors.push(`Stage 4 Class ${c} Level ${lvl} Q${idx+1} does not have 4 options`);
        }
      });
    }
  });
}
console.log(`Stage 4 verified with ${stage4Count}/150 questions across classes 1-5.`);

// ================= STAGE 5 =================
console.log('--- Testing Stage 5 (Spatial Shapes & 3D Geometry) ---');
let stage5Count = 0;
for (let c = 1; c <= 5; c++) {
  const classBank = classShapesQuestionBank[c];
  if (!classBank) {
    errors.push(`Stage 5 Class ${c} missing`);
    continue;
  }
  [1, 2].forEach(lvl => {
    const questions = classBank[lvl];
    if (!questions || !Array.isArray(questions) || questions.length !== 8) {
      errors.push(`Stage 5 Class ${c} Level ${lvl} expected 8 questions, found ${questions ? questions.length : 0}`);
    } else {
      questions.forEach((q, idx) => {
        stage5Count++;
        if (!q.question || !q.options || !q.answer || !q.shape) {
          errors.push(`Stage 5 Class ${c} Level ${lvl} Q${idx+1} missing fields: ${JSON.stringify(q)}`);
        }
        if (!q.options.includes(q.answer)) {
          errors.push(`Stage 5 Class ${c} Level ${lvl} Q${idx+1} answer '${q.answer}' not in options: ${JSON.stringify(q.options)}`);
        }
        if (q.options.length !== 4) {
          errors.push(`Stage 5 Class ${c} Level ${lvl} Q${idx+1} does not have 4 options`);
        }
      });
    }
  });
}
console.log(`Stage 5 verified with ${stage5Count}/80 questions across classes 1-5.`);

// ================= STAGE 6 =================
console.log('--- Testing Stage 6 (Reading Comprehension) ---');
let stage6Count = 0;
for (let c = 1; c <= 5; c++) {
  const levels = getComprehensionLevelsForClass(c);
  if (!levels || !Array.isArray(levels) || levels.length !== 2) {
    errors.push(`Stage 6 Class ${c} expected 2 levels, got ${levels ? levels.length : 0}`);
    continue;
  }
  levels.forEach((lvl, lvlIdx) => {
    if (!lvl.passage || !lvl.passageTitle || !lvl.questions || lvl.questions.length === 0) {
      errors.push(`Stage 6 Class ${c} Level ${lvlIdx+1} missing passage or questions`);
    } else {
      lvl.questions.forEach((q, qIdx) => {
        stage6Count++;
        if (!q.question || !q.options || !q.answer) {
          errors.push(`Stage 6 Class ${c} Level ${lvlIdx+1} Q${qIdx+1} missing fields`);
        }
        if (!q.options.includes(q.answer)) {
          errors.push(`Stage 6 Class ${c} Level ${lvlIdx+1} Q${qIdx+1} answer '${q.answer}' not in options: ${JSON.stringify(q.options)}`);
        }
        if (q.options.length !== 4) {
          errors.push(`Stage 6 Class ${c} Level ${lvlIdx+1} Q${qIdx+1} does not have 4 options`);
        }
      });
    }
  });
}
console.log(`Stage 6 verified with ${stage6Count} questions across classes 1-5.`);

if (errors.length > 0) {
  console.error('\n--- TEST FAILURES ---');
  errors.forEach(e => console.error('FAIL:', e));
  process.exit(1);
} else {
  console.log('\nALL 6 STAGES FOR ALL CLASSES 1 TO 5 PASSED WITH 100% SUCCESS!');
}
