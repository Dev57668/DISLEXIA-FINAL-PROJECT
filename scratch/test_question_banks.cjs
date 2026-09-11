const fs = require('fs');

async function testBanks() {
  console.log("Validating question banks...");
  const stage1Module = await import('../src/data/stage1Bank.js');
  const stage2Module = await import('../src/data/stage2Bank.js');
  const stage3Module = await import('../src/data/stage3Bank.js');

  const { CLASS_STAGE1_BANK } = stage1Module;
  const {
    CLASS1_STAGE2_BANK,
    CLASS2_STAGE2_BANK,
    CLASS3_STAGE2_BANK,
    CLASS4_STAGE2_BANK,
    CLASS5_STAGE2_BANK,
  } = stage2Module;
  const {
    CLASS1_STAGE3_BANK,
    CLASS2_STAGE3_BANK,
    CLASS3_STAGE3_BANK,
    CLASS4_STAGE3_BANK,
    CLASS5_STAGE3_BANK,
  } = stage3Module;

  // Test Stage 1
  for (let c = 1; c <= 5; c++) {
    const levels = CLASS_STAGE1_BANK[c];
    if (!levels || levels.length !== 3) {
      throw new Error(`Stage 1 Class ${c} does not have 3 levels! Found: ${levels?.length}`);
    }
    levels.forEach((lvl, lIdx) => {
      if (lvl.exercises.length !== 9) {
        throw new Error(`Stage 1 Class ${c} Level ${lIdx + 1} has ${lvl.exercises.length} exercises (expected 9)`);
      }
      lvl.exercises.forEach((ex, qIdx) => {
        if (!ex.visual) throw new Error(`Stage 1 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} missing visual`);
        if (!ex.answer) throw new Error(`Stage 1 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} missing answer`);
        if (!ex.options.includes(ex.answer)) {
          throw new Error(`Stage 1 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} answer "${ex.answer}" not in options [${ex.options.join(', ')}]`);
        }
      });
    });
  }
  console.log("Stage 1 verification PASSED! (5 classes × 3 levels × 9 questions = 135 questions)");

  // Test Stage 2
  const stage2Banks = [
    CLASS1_STAGE2_BANK,
    CLASS2_STAGE2_BANK,
    CLASS3_STAGE2_BANK,
    CLASS4_STAGE2_BANK,
    CLASS5_STAGE2_BANK,
  ];
  stage2Banks.forEach((levels, cIdx) => {
    const c = cIdx + 1;
    if (!levels || levels.length !== 3) {
      throw new Error(`Stage 2 Class ${c} does not have 3 levels! Found: ${levels?.length}`);
    }
    levels.forEach((lvl, lIdx) => {
      if (lvl.exercises.length !== 9) {
        throw new Error(`Stage 2 Class ${c} Level ${lIdx + 1} has ${lvl.exercises.length} exercises (expected 9)`);
      }
      lvl.exercises.forEach((ex, qIdx) => {
        if (!ex.text || typeof ex.text !== 'string' || !ex.text.trim()) {
          throw new Error(`Stage 2 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} missing text`);
        }
        if (!ex.type) {
          throw new Error(`Stage 2 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} missing type`);
        }
      });
    });
  });
  console.log("Stage 2 verification PASSED! (5 classes × 3 levels × 9 questions = 135 questions)");

  // Test Stage 3
  const stage3Banks = [
    CLASS1_STAGE3_BANK,
    CLASS2_STAGE3_BANK,
    CLASS3_STAGE3_BANK,
    CLASS4_STAGE3_BANK,
    CLASS5_STAGE3_BANK,
  ];
  stage3Banks.forEach((levels, cIdx) => {
    const c = cIdx + 1;
    if (!levels || levels.length !== 3) {
      throw new Error(`Stage 3 Class ${c} does not have 3 levels! Found: ${levels?.length}`);
    }
    levels.forEach((lvl, lIdx) => {
      if (lvl.exercises.length !== 9) {
        throw new Error(`Stage 3 Class ${c} Level ${lIdx + 1} has ${lvl.exercises.length} exercises (expected 9)`);
      }
      lvl.exercises.forEach((ex, qIdx) => {
        if (!ex.prompt && !ex.question) {
          throw new Error(`Stage 3 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} missing prompt/question`);
        }
        if (!ex.answer) {
          throw new Error(`Stage 3 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} missing answer`);
        }
        if (ex.options && !ex.options.includes(ex.answer)) {
          throw new Error(`Stage 3 Class ${c} Level ${lIdx + 1} Q${qIdx + 1} answer "${ex.answer}" not in options [${ex.options.join(', ')}]`);
        }
      });
    });
  });
  console.log("Stage 3 verification PASSED! (5 classes × 3 levels × 9 questions = 135 questions)");

  console.log("\nALL 405 QUESTIONS FULLY VALIDATED AND READY FOR INTEGRATION!");
}

testBanks().catch(err => {
  console.error("Validation error:", err);
  process.exit(1);
});
