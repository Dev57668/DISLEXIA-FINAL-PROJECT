import fs from "fs";

const appCode = fs.readFileSync("src/App.jsx", "utf-8");
const cssCode = fs.readFileSync("src/jungle-theme.css", "utf-8");

console.log("=== VERIFYING TARGETED FIXES ===\n");

// 1. Difficulty / Level Display
const levelTabsMatches = appCode.match(/className="level-tabs"/g) || [];
console.log(`1. 'className="level-tabs"' count: ${levelTabsMatches.length} (Expected: 0)`);

const currentLevelDisplayMatches = appCode.match(/className="current-level-display"/g) || [];
console.log(`2. 'className="current-level-display"' count: ${currentLevelDisplayMatches.length} (Expected: 6)`);

const currentLevelPillMatches = appCode.match(/className="current-level-pill"/g) || [];
console.log(`3. 'className="current-level-pill"' count: ${currentLevelPillMatches.length} (Expected: 6)`);

// 2. Animal Companion Position
const stageCompanionDockMatches = appCode.match(/className="stage-companion-dock"/g) || [];
console.log(`4. 'className="stage-companion-dock"' count: ${stageCompanionDockMatches.length} (Expected: 0)`);

const companionBottomBarMatches = appCode.match(/className="companion-bottom-bar"/g) || [];
console.log(`5. 'className="companion-bottom-bar"' count: ${companionBottomBarMatches.length} (Expected: 6)`);

// Check each companion inside companion-bottom-bar
const companions = [
  { name: "BaronEagle (Stage 1)", re: /companion-bottom-bar[\s\S]*?<BaronEagle/ },
  { name: "RioParrot (Stage 2)", re: /companion-bottom-bar[\s\S]*?<RioParrot/ },
  { name: "PipMonkeyCompanion (Stage 3)", re: /companion-bottom-bar[\s\S]*?<PipMonkeyCompanion/ },
  { name: "KojiPanda (Stage 4)", re: /companion-bottom-bar[\s\S]*?<KojiPanda/ },
  { name: "SolChameleon (Stage 5)", re: /companion-bottom-bar[\s\S]*?<SolChameleon/ },
  { name: "LunaOtter (Stage 6)", re: /companion-bottom-bar[\s\S]*?<LunaOtter/ }
];

companions.forEach(c => {
  const present = c.re.test(appCode);
  console.log(`   - ${c.name} in bottom bar: ${present ? "PASSED" : "FAILED"}`);
});

// 3. Hint Behavior & Dialogue
const hintStates = [
  "stage1ShowHint",
  "stage2ShowHint",
  "stage3ShowHint",
  "stage4ShowHint",
  "shapesShowHint",
  "compShowHint"
];

console.log("\nHint states presence:");
hintStates.forEach(hs => {
  const declared = appCode.includes(`const [${hs}, set${hs.charAt(0).toUpperCase() + hs.slice(1)}] = useState(false);`);
  console.log(`   - ${hs} declared with default false: ${declared ? "PASSED" : "FAILED"}`);
});

// 4. CSS rules check
const hasBottomBarCSS = cssCode.includes(".companion-bottom-bar");
const hasDialogueBubbleCSS = cssCode.includes(".companion-dialogue-bubble");
const hasCurrentLevelCSS = cssCode.includes(".current-level-display");
const hasCurrentLevelPillCSS = cssCode.includes(".current-level-pill");

console.log("\nCSS classes presence in jungle-theme.css:");
console.log(`   - .companion-bottom-bar: ${hasBottomBarCSS ? "PASSED" : "FAILED"}`);
console.log(`   - .companion-dialogue-bubble: ${hasDialogueBubbleCSS ? "PASSED" : "FAILED"}`);
console.log(`   - .current-level-display: ${hasCurrentLevelCSS ? "PASSED" : "FAILED"}`);
console.log(`   - .current-level-pill: ${hasCurrentLevelPillCSS ? "PASSED" : "FAILED"}`);

const allPassed = 
  levelTabsMatches.length === 0 &&
  currentLevelDisplayMatches.length === 6 &&
  currentLevelPillMatches.length === 6 &&
  stageCompanionDockMatches.length === 0 &&
  companionBottomBarMatches.length === 6 &&
  companions.every(c => c.re.test(appCode)) &&
  hintStates.every(hs => appCode.includes(`const [${hs}, set${hs.charAt(0).toUpperCase() + hs.slice(1)}] = useState(false);`)) &&
  hasBottomBarCSS && hasDialogueBubbleCSS && hasCurrentLevelCSS && hasCurrentLevelPillCSS;

console.log(`\nALL CHECKS RESULT: ${allPassed ? "SUCCESS - ALL TARGETED FIXES COMPLETE!" : "FAILURES DETECTED"}`);
if (!allPassed) process.exit(1);
