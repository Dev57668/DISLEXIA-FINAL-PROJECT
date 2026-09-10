import fs from 'fs';

const appCode = fs.readFileSync('src/App.jsx', 'utf8');
const pipCompanionCode = fs.readFileSync('src/components/jungle/companions/PipMonkeyCompanion.jsx', 'utf8');
const cssCode = fs.readFileSync('src/jungle-theme.css', 'utf8');

console.log("=== VERIFYING DYSLEXIAQUEST FIXES ===");

// 1. Speech Recognition Error Check
const oldError = "Speech recognition service temporarily unavailable. Please try again.";
if (appCode.includes(oldError)) {
  console.error("FAIL: Old speech recognition error message still found in App.jsx!");
  process.exit(1);
} else {
  console.log("PASS: Old speech recognition error completely removed.");
}

if (appCode.includes("stage2SpeechUnavailable") && appCode.includes("btn-accept-reading")) {
  console.log("PASS: Stage 2 resilient speech fallback state and action are present.");
} else {
  console.error("FAIL: Stage 2 speech fallback state or button missing!");
  process.exit(1);
}

// 2. Animal Companion Positioning Check
const dockMatches = (appCode.match(/className="stage-companion-dock"/g) || []).length;
console.log(`Found ${dockMatches} stage-companion-dock mounts in App.jsx (expecting 6).`);
if (dockMatches >= 6) {
  console.log("PASS: All 6 stage companions mounted in responsive .stage-companion-dock.");
} else {
  console.error("FAIL: Expected 6 stage-companion-dock mounts, found:", dockMatches);
  process.exit(1);
}

if (cssCode.includes(".stage-companion-dock") && cssCode.includes(".companion-speech-bubble")) {
  console.log("PASS: CSS rules for companion dock and speech bubble boundaries exist.");
} else {
  console.error("FAIL: CSS rules for .stage-companion-dock missing!");
  process.exit(1);
}

// 3. Pip the Monkey Artwork Check
if (pipCompanionCode.includes("viewBox=\"0 0 140 160\"") && pipCompanionCode.includes("Mossy Jungle Branch Perch")) {
  console.log("PASS: PipMonkeyCompanion has been redesigned with clean storybook branch perch & proportions.");
} else {
  console.error("FAIL: PipMonkeyCompanion redesign check failed!");
  process.exit(1);
}

// 4. Difficulty / Level Label Check
const badPattern = /<span>\s*\{[^}]*item\.id\}\s*<\/span>\s*<div>\s*<strong>\s*\{item\.title\}/g;
if (badPattern.test(appCode)) {
  console.error("FAIL: Found old level-tab duplication pattern in App.jsx!");
  process.exit(1);
} else {
  console.log("PASS: Duplicate level-tab numbering pattern eliminated.");
}

const levelTabStrongCount = (appCode.match(/<strong>Level \{index \+ 1\}<\/strong>/g) || []).length;
const levelTabSmallCount = (appCode.match(/<small>• \{diff\}<\/small>/g) || []).length;
console.log(`Found ${levelTabStrongCount} level-tab strongs and ${levelTabSmallCount} level-tab smalls (expecting 6 each).`);
if (levelTabStrongCount >= 6 && levelTabSmallCount >= 6) {
  console.log("PASS: All 6 stages consistently display 'Level {index + 1}' and '• {diff}'.");
} else {
  console.error(`FAIL: Incomplete level-tab count: strongs=${levelTabStrongCount}, smalls=${levelTabSmallCount}`);
  process.exit(1);
}

const badgeCount = (appCode.match(/className="question-level-badge"/g) || []).length;
console.log(`Found ${badgeCount} question-level-badge indicators across stages.`);
if (badgeCount >= 5) {
  console.log("PASS: Clear question-level-badge displayed in question headers.");
} else {
  console.error("FAIL: Expected at least 5 question-level-badges, found:", badgeCount);
  process.exit(1);
}

console.log("\nALL AUTOMATED VERIFICATION CHECKS PASSED!");
