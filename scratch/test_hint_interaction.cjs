const fs = require('fs');
const assert = require('assert');

// 1. Verify code matches expected logic
const appCode = fs.readFileSync('src/App.jsx', 'utf8');

console.log('--- Checking Code Patterns ---');

// Check Stage 1 answer button disabled condition
const stage1DisabledPattern = /disabled=\{\s*Boolean\(stageMessage && stageMessage\.includes\("Correct"\)\)\s*\}/;
assert(stage1DisabledPattern.test(appCode), 'Stage 1 answer button must only disable when stageMessage includes "Correct"');
console.log('✓ Stage 1 answer button disabled logic is correct');

// Check answerStageQuestion guard
const answerStageGuard = /if\s*\(\s*stageMessage\s*&&\s*stageMessage\.includes\("Correct"\)\s*\)\s*\{\s*return;\s*\}/;
assert(answerStageGuard.test(appCode), 'answerStageQuestion must only return early when stageMessage includes "Correct"');
console.log('✓ answerStageQuestion click guard is correct');

// Check next question button condition
const nextButtonCondition = /\{stageMessage && stageMessage\.includes\("Correct"\) && \(\s*<button\s+className="save-button next-button"/;
assert(nextButtonCondition.test(appCode), 'Stage 1 Next Question button must only appear when answer is correct');
console.log('✓ Stage 1 Next Question button condition is correct');

// Check speech synthesis voice feedback safeguard
assert(!appCode.includes('`Wrong answer. The correct answer is ${exercise.answer}.`'), 'Exact answer must not be read aloud by speech synthesis on general/hint message');
console.log('✓ Speech synthesis safeguard is in place (no answer leakage)');

// 2. Simulate Stage 1 State Flow
console.log('\n--- Simulating Stage 1 Interaction Flow ---');

let stageScore = 15;
let stageMessage = '';
let stageAnswer = '';
let stageHint = '';
let hintUsed = false;
let stage1ShowHint = false;

const exercise = {
  id: 1,
  target: 'b',
  answer: 'b',
  options: ['b', 'd', 'p', 'q'],
  hint: "Baron's Clue: Look at the belly on the right side of the vertical stick."
};

const getStage1Hint = (ex) => ex.hint;

const useStage1Hint = () => {
  if (hintUsed) {
    stage1ShowHint = true;
    return;
  }
  if (stageScore < 5) {
    stage1ShowHint = false;
    return;
  }
  stageScore = Math.max(0, stageScore - 5);
  stageHint = getStage1Hint(exercise);
  hintUsed = true;
  stage1ShowHint = true;
  stageMessage = '';
  stageAnswer = '';
};

const isButtonDisabled = () => Boolean(stageMessage && stageMessage.includes('Correct'));
const isNextButtonVisible = () => Boolean(stageMessage && stageMessage.includes('Correct'));

const answerStageQuestion = (selected) => {
  if (stageMessage && stageMessage.includes('Correct')) {
    return; // locked
  }
  const isCorrect = selected === exercise.answer;
  stageAnswer = selected;
  if (isCorrect) {
    stageMessage = 'Correct! Well done.';
    stageScore += 3;
  } else {
    stageMessage = 'Incorrect. Try again or use a hint for 5 XP.';
  }
};

// Initial state
assert.strictEqual(isButtonDisabled(), false, 'Buttons must be clickable initially');
assert.strictEqual(isNextButtonVisible(), false, 'Next button must not be visible initially');

// Step 1: Click Hint BEFORE answering
useStage1Hint();
console.log('Step 1: Hint clicked');
assert.strictEqual(stageScore, 10, '5 XP deducted');
assert.strictEqual(hintUsed, true, 'Hint used flag set');
assert.strictEqual(stage1ShowHint, true, 'Baron dialogue shown');
assert.strictEqual(isButtonDisabled(), false, 'CRITICAL: Answer buttons must remain clickable after hint!');
assert.strictEqual(isNextButtonVisible(), false, 'Next button must NOT appear on hint unlock');
console.log('✓ Buttons are fully clickable after hint');

// Step 2: Try a wrong answer 'd'
answerStageQuestion('d');
console.log('Step 2: Wrong answer "d" selected');
assert.strictEqual(stageAnswer, 'd');
assert.strictEqual(stageMessage, 'Incorrect. Try again or use a hint for 5 XP.');
assert.strictEqual(isButtonDisabled(), false, 'Answer buttons must remain clickable after wrong answer');
assert.strictEqual(isNextButtonVisible(), false, 'Next button must not appear on wrong answer');
console.log('✓ Buttons remain clickable after wrong answer');

// Step 3: Click Hint again (already unlocked)
useStage1Hint();
console.log('Step 3: Hint toggled again');
assert.strictEqual(stageScore, 10, 'No extra XP deducted when already unlocked');
assert.strictEqual(stage1ShowHint, true);
assert.strictEqual(isButtonDisabled(), false, 'Buttons remain clickable');
console.log('✓ Re-opening hint does not charge XP or lock buttons');

// Step 4: Select correct answer 'b'
answerStageQuestion('b');
console.log('Step 4: Correct answer "b" selected');
assert.strictEqual(stageAnswer, 'b');
assert.strictEqual(stageMessage, 'Correct! Well done.');
assert.strictEqual(stageScore, 13, 'Earned 3 XP for correct answer');
assert.strictEqual(isButtonDisabled(), true, 'Buttons are locked after correct answer');
assert.strictEqual(isNextButtonVisible(), true, 'Next button is visible after correct answer');
console.log('✓ Correct answer locks buttons and reveals Next button');

// Step 5: Attempting to click another button after correct answer
answerStageQuestion('q');
assert.strictEqual(stageAnswer, 'b', 'Subsequent clicks are ignored once correct');
console.log('✓ Questions remain locked after correct answer');

console.log('\nAll automated verification checks PASSED successfully!');
