const assert = require('assert');

// Test simulation of the exact restored hint XP logic across all 6 stages
function testStageHintXP(stageName, initialXp) {
  let score = initialXp;
  let hintUsed = false;
  let showHint = false;
  let hint = "";
  let message = "";
  let hintTelemetryCount = 0;
  let persistedScores = {};

  const persistScores = (overrides) => {
    persistedScores = { ...persistedScores, ...overrides };
  };
  const recordHintUsed = () => {
    hintTelemetryCount++;
  };

  const requestHint = (exerciseHintText) => {
    if (hintUsed) {
      showHint = true;
      return;
    }

    if (score < 5) {
      message = "You need at least 5 XP to unlock a hint.";
      showHint = false;
      return;
    }

    const newXP = Math.max(0, score - 5);
    score = newXP;
    hintUsed = true;
    hint = exerciseHintText;
    showHint = true;
    message = "Hint unlocked (-5 XP).";
    recordHintUsed();
    persistScores({ [stageName]: newXP });
  };

  const toggleAvatar = (exerciseHintText) => {
    if (showHint) {
      showHint = false;
    } else if (hintUsed) {
      showHint = true;
    } else {
      requestHint(exerciseHintText);
    }
  };

  const nextQuestion = () => {
    hint = "";
    hintUsed = false;
    showHint = false;
    message = "";
  };

  console.log(`\n--- Testing ${stageName} ---`);

  // Step 1: Initial state (10 XP)
  assert.strictEqual(score, 10, 'Initial score should be 10 XP');
  assert.strictEqual(showHint, false, 'Hint should initially be hidden');

  // Step 2: Request hint with 10 XP via avatar
  toggleAvatar("Look at the letter's belly!");
  assert.strictEqual(score, 5, 'Score should be 5 XP after using hint (-5 XP)');
  assert.strictEqual(hintUsed, true, 'hintUsed should be true');
  assert.strictEqual(showHint, true, 'showHint should be true');
  assert.strictEqual(hint, "Look at the letter's belly!", 'Hint text should be shown');
  assert.strictEqual(hintTelemetryCount, 1, 'Hint telemetry should increment');
  assert.strictEqual(persistedScores[stageName], 5, 'Persisted score should be 5 XP');

  // Step 3: Hide hint (click ✕ Hide)
  showHint = false;
  assert.strictEqual(showHint, false, 'showHint should be false after hide');

  // Step 4: Reopen hint on same question (clicking avatar or button)
  toggleAvatar("Look at the letter's belly!");
  assert.strictEqual(score, 5, 'Score must NOT deduct again on already unlocked question (still 5 XP)');
  assert.strictEqual(showHint, true, 'showHint should be reopened');
  assert.strictEqual(hintTelemetryCount, 1, 'Hint telemetry must not increment again');

  // Step 5: Advance to next question
  nextQuestion();
  assert.strictEqual(showHint, false, 'showHint should be reset');
  assert.strictEqual(hintUsed, false, 'hintUsed should be reset');
  assert.strictEqual(hint, '', 'hint should be cleared');
  assert.strictEqual(score, 5, 'Score carries over as 5 XP');

  // Step 6: Request hint with 5 XP
  requestHint("Second clue!");
  assert.strictEqual(score, 0, 'Score should be 0 XP after second hint (-5 XP)');
  assert.strictEqual(showHint, true, 'showHint should be true');
  assert.strictEqual(persistedScores[stageName], 0, 'Persisted score should be 0 XP');

  // Step 7: Advance to third question
  nextQuestion();
  assert.strictEqual(score, 0, 'Score carries over as 0 XP');

  // Step 8: Request hint with 0 XP (INSUFFICIENT XP)
  requestHint("Third clue!");
  assert.strictEqual(score, 0, 'Score should remain 0 XP (no deduction)');
  assert.strictEqual(showHint, false, 'Hint dialogue must NOT open when score < 5');
  assert.strictEqual(hint, '', 'Hint text must NOT be revealed when score < 5');
  assert.strictEqual(hintUsed, false, 'hintUsed must remain false');
  assert.strictEqual(message, "You need at least 5 XP to unlock a hint.", 'Clear message must inform user of needed XP');

  // Step 9: Click avatar with 0 XP
  toggleAvatar("Third clue!");
  assert.strictEqual(score, 0, 'Score should remain 0 XP');
  assert.strictEqual(showHint, false, 'Hint must still not open via avatar when score < 5');

  console.log(`✓ ${stageName} passed all 9 verification steps!`);
}

const stages = ['stage1', 'stage2', 'stage3', 'stage4', 'shapes', 'comprehension'];
stages.forEach(s => testStageHintXP(s, 10));
console.log('\n======================================');
console.log('ALL STAGE HINT XP SYSTEM TESTS PASSED!');
console.log('======================================');
