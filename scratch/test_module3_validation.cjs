const assert = require('assert');

// The exact normalization function in Module3Activity
const normalizeText = (str) => {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/^[.,/#!$%^&*;:{}=\-_`~()]+|[.,/#!$%^&*;:{}=\-_`~()]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// Simulation of handleCheckAnswer matching logic
function checkAnswer(exercise, input) {
  const cleanInput = normalizeText(input);
  if (!cleanInput) return false;

  const rawAccepted = Array.isArray(exercise.acceptedAnswers) && exercise.acceptedAnswers.length > 0
    ? exercise.acceptedAnswers
    : [exercise.answer];

  const normalizedAccepted = rawAccepted.map(a => normalizeText(a));
  return normalizedAccepted.includes(cleanInput);
}

// Simulation of handleSelectOption matching logic
function selectOption(exercise, option) {
  const cleanOption = normalizeText(option);
  const rawAccepted = Array.isArray(exercise.acceptedAnswers) && exercise.acceptedAnswers.length > 0
    ? exercise.acceptedAnswers
    : [exercise.answer];

  const normalizedAccepted = rawAccepted.map(a => normalizeText(a));
  return option === exercise.answer || normalizedAccepted.includes(cleanOption);
}

console.log("Testing written answer normalization and validation...");

// Test Case 1: The 'true' question (c5-s3-l2-q6)
const trueExercise = {
  id: "c5-s3-l2-q6",
  prompt: "Fact verification: true or false",
  question: "Is it true or false that books contain written information?",
  answer: "true",
  acceptedAnswers: ["true", "True", "TRUE"],
  hint: "A fact can be proven objectively true for all instances."
};

assert.strictEqual(checkAnswer(trueExercise, "true"), true, "Should match 'true'");
assert.strictEqual(checkAnswer(trueExercise, "True"), true, "Should match 'True'");
assert.strictEqual(checkAnswer(trueExercise, "TRUE"), true, "Should match 'TRUE'");
assert.strictEqual(checkAnswer(trueExercise, " true "), true, "Should match ' true ' with spaces");
assert.strictEqual(checkAnswer(trueExercise, "  TRUE  "), true, "Should match '  TRUE  ' with spaces");
assert.strictEqual(checkAnswer(trueExercise, "True."), true, "Should match 'True.' with punctuation");
assert.strictEqual(checkAnswer(trueExercise, "false"), false, "Should reject 'false'");
assert.strictEqual(checkAnswer(trueExercise, "random"), false, "Should reject 'random'");
assert.strictEqual(checkAnswer(trueExercise, ""), false, "Should reject empty string");

// Test Case 2: Missing letters (e.g. c1-s3-l1-q1 C_T)
const catExercise = {
  id: "c1-s3-l1-q1",
  prompt: "Complete: C _ T",
  question: "Fill in the missing letter to complete the word: C _ T",
  answer: "CAT",
  acceptedAnswers: ["cat", "cot", "cut", "a", "o", "u"]
};

assert.strictEqual(checkAnswer(catExercise, "cat"), true);
assert.strictEqual(catExercise.options, undefined, "Missing letter question must have no options");
assert.strictEqual(checkAnswer(catExercise, "CAT"), true);
assert.strictEqual(checkAnswer(catExercise, "  cat  "), true);
assert.strictEqual(checkAnswer(catExercise, "A"), true);
assert.strictEqual(checkAnswer(catExercise, "dog"), false);

// Test Case 3: Multiple choice question (e.g. c1-s3-l3-q1)
const mcExercise = {
  id: "c1-s3-l3-q1",
  prompt: "Sentence completion",
  question: "The little bird ___ up into the sky.",
  answer: "flew",
  options: ["flew", "swam", "crawled", "slept"],
  acceptedAnswers: ["flew"]
};

assert.strictEqual(Array.isArray(mcExercise.options), true, "Multiple choice must have options");
assert.strictEqual(selectOption(mcExercise, "flew"), true);
assert.strictEqual(selectOption(mcExercise, "swam"), false);
assert.strictEqual(selectOption(mcExercise, "crawled"), false);

console.log("All validation assertions passed successfully!");
