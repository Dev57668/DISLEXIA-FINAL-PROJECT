const fs = require('fs');

async function runIntegrationTest() {
  console.log("=== Integration Test for DyslexiaQuest Questions ===");

  const stage1Module = await import('../src/data/stage1Bank.js');
  const stage2Module = await import('../src/data/stage2Bank.js');
  const stage3Module = await import('../src/data/stage3Bank.js');

  const { CLASS_STAGE1_BANK } = stage1Module;
  const stage2Banks = [
    stage2Module.CLASS1_STAGE2_BANK,
    stage2Module.CLASS2_STAGE2_BANK,
    stage2Module.CLASS3_STAGE2_BANK,
    stage2Module.CLASS4_STAGE2_BANK,
    stage2Module.CLASS5_STAGE2_BANK,
  ];
  const stage3Banks = [
    stage3Module.CLASS1_STAGE3_BANK,
    stage3Module.CLASS2_STAGE3_BANK,
    stage3Module.CLASS3_STAGE3_BANK,
    stage3Module.CLASS4_STAGE3_BANK,
    stage3Module.CLASS5_STAGE3_BANK,
  ];

  let totalQuestions = 0;

  for (let c = 1; c <= 5; c++) {
    console.log(`\nTesting Class ${c}:`);

    // Stage 1
    const s1Levels = CLASS_STAGE1_BANK[c];
    if (!s1Levels || s1Levels.length !== 3) throw new Error(`Class ${c} Stage 1 level count != 3`);
    let s1Count = 0;
    s1Levels.forEach((lvl, idx) => {
      if (lvl.exercises.length !== 9) throw new Error(`Class ${c} Stage 1 L${idx+1} count ${lvl.exercises.length} != 9`);
      s1Count += lvl.exercises.length;
      lvl.exercises.forEach(ex => {
        if (!ex.visual || !ex.answer || !ex.options.includes(ex.answer)) {
          throw new Error(`Class ${c} Stage 1 L${idx+1} invalid item: ${JSON.stringify(ex)}`);
        }
      });
    });
    console.log(`  ✓ Stage 1 (Visual): 3 levels, ${s1Count} questions`);
    totalQuestions += s1Count;

    // Stage 2
    const s2Levels = stage2Banks[c - 1];
    if (!s2Levels || s2Levels.length !== 3) throw new Error(`Class ${c} Stage 2 level count != 3`);
    let s2Count = 0;
    s2Levels.forEach((lvl, idx) => {
      if (lvl.exercises.length !== 9) throw new Error(`Class ${c} Stage 2 L${idx+1} count ${lvl.exercises.length} != 9`);
      s2Count += lvl.exercises.length;
      lvl.exercises.forEach(ex => {
        if (!ex.text || !ex.type) {
          throw new Error(`Class ${c} Stage 2 L${idx+1} invalid item: ${JSON.stringify(ex)}`);
        }
      });
    });
    console.log(`  ✓ Stage 2 (Reading/Audio): 3 levels, ${s2Count} questions`);
    totalQuestions += s2Count;

    // Stage 3
    const s3Levels = stage3Banks[c - 1];
    if (!s3Levels || s3Levels.length !== 3) throw new Error(`Class ${c} Stage 3 level count != 3`);
    let s3Count = 0;
    s3Levels.forEach((lvl, idx) => {
      if (lvl.exercises.length !== 9) throw new Error(`Class ${c} Stage 3 L${idx+1} count ${lvl.exercises.length} != 9`);
      s3Count += lvl.exercises.length;
      lvl.exercises.forEach(ex => {
        if ((!ex.prompt && !ex.question) || !ex.answer || !ex.options.includes(ex.answer)) {
          throw new Error(`Class ${c} Stage 3 L${idx+1} invalid item: ${JSON.stringify(ex)}`);
        }
      });
    });
    console.log(`  ✓ Stage 3 (Written Expression): 3 levels, ${s3Count} questions`);
    totalQuestions += s3Count;
  }

  console.log(`\n========================================`);
  console.log(`Total questions verified: ${totalQuestions}`);
  console.log(`(5 classes × 3 stages × 3 levels × 9 questions = 405)`);
  if (totalQuestions !== 405) {
    throw new Error(`Expected 405 questions, found ${totalQuestions}`);
  }
  console.log(`STATUS: ALL QUESTION BANKS VERIFIED AND MATCH SPECIFICATION!`);
}

runIntegrationTest().catch(err => {
  console.error("Integration test failed:", err);
  process.exit(1);
});
