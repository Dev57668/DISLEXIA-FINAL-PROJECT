const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Remove the old Stage 2 inlined bank (from "const CLASS1_STAGE2_BANK = [" up to "const getNormalizedClassNumber =")
const stage2Start = content.indexOf('const CLASS1_STAGE2_BANK = [');
const stage2End = content.indexOf('const getNormalizedClassNumber =');

if (stage2Start !== -1 && stage2End !== -1 && stage2Start < stage2End) {
  content = content.slice(0, stage2Start) + '// Stage 2 Question Banks are imported from ./data/stage2Bank\n\n' + content.slice(stage2End);
  console.log('Stage 2 inline banks cleanly replaced!');
} else {
  console.error('Could not locate Stage 2 block!', { stage2Start, stage2End });
}

// 2. Remove the old Stage 1 and Stage 3 inlined banks (from "const makeVisualLevel = (" up to "const getStage1LevelsForClass =")
const stage1Start = content.indexOf('const makeVisualLevel = (');
const stage1End = content.indexOf('const getStage1LevelsForClass =');

if (stage1Start !== -1 && stage1End !== -1 && stage1Start < stage1End) {
  content = content.slice(0, stage1Start) + '// Stage 1 & Stage 3 Question Banks are imported from ./data/stage1Bank and ./data/stage3Bank\n\n' + content.slice(stage1End);
  console.log('Stage 1 & Stage 3 inline banks cleanly replaced!');
} else {
  console.error('Could not locate Stage 1 & 3 block!', { stage1Start, stage1End });
}

// 3. Update getStage3LevelsForClass to use CLASS1_STAGE3_BANK
if (content.includes(': GRADE1_STAGE3_BANK;')) {
  content = content.replace(
    ': GRADE1_STAGE3_BANK;',
    ': CLASS1_STAGE3_BANK;'
  );
  console.log('Updated getStage3LevelsForClass to use CLASS1_STAGE3_BANK!');
}

// 4. Update Stage 3 UI rendering to support both prompt and question and make options clickable
const oldStage3UI = `              <h2>{exercise.prompt}</h2>

              <div
                className="stage3-options"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {exercise.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 16px",
                      border: "2px solid #ddd",
                      borderRadius: "10px",
                      textAlign: "center",
                      fontWeight: "600",
                      pointerEvents: "none",
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>`;

const newStage3UI = `              <h2>{exercise.prompt || exercise.question}</h2>

              {Array.isArray(exercise.options) && exercise.options.length > 0 && (
                <div
                  className="stage3-options"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "10px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {exercise.options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className={
                        "stage3-option-button " +
                        (stage3Answer === option ? "selected " : "") +
                        (stage3Message === "CORRECT!" && stage3Answer === option
                          ? "correct "
                          : "") +
                        (stage3Message === "WRONG ANSWER" && stage3Answer === option
                          ? "wrong "
                          : "")
                      }
                      disabled={stage3Message === "CORRECT!"}
                      onClick={() => {
                        setStage3Answer(option);
                        setStage3Message("");
                      }}
                      style={{
                        padding: "12px 16px",
                        border: stage3Answer === option ? "2px solid #2e7d32" : "2px solid #ddd",
                        background: stage3Answer === option ? "rgba(46, 125, 50, 0.15)" : "transparent",
                        borderRadius: "10px",
                        textAlign: "center",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "16px",
                        color: "inherit",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}`;

if (content.includes(oldStage3UI)) {
  content = content.replace(oldStage3UI, newStage3UI);
  console.log('Stage 3 UI rendering updated successfully!');
} else {
  console.log('Warning: oldStage3UI exact text was not found, will check.');
}

// 5. Update getStage3Hint fallback so literacy questions don't call getMathHint
const oldHintFallback = `    // Fallback if question is present
    if (exercise.question) {
      return getMathHint(exercise);
    }

    return "Look carefully at the word, sound out each letter, and think about the meaning.";`;

const newHintFallback = `    if (p.includes("comes next") || p.includes("comes after")) {
      return "Notice the sequence pattern and identify what follows logically.";
    }
    if (p.includes("cause") || p.includes("effect")) {
      return "Think about what caused the event to happen and what resulted from it.";
    }
    if (p.includes("odd") || p.includes("belong")) {
      return "Look at what group or category the words belong to and find the one that is different.";
    }
    if (p.includes("title")) {
      return "The best title sums up the main theme or topic of the whole passage.";
    }
    if (p.includes("conclusion")) {
      return "A conclusion is what we can logically decide based on what was read.";
    }
    if (p.includes("fact") || p.includes("opinion")) {
      return "A fact can be proven true, while an opinion expresses personal feelings or thoughts.";
    }
    if (p.includes("first") || p.includes("next") || p.includes("last")) {
      return "Think about the correct order of steps from beginning to end.";
    }
    if (p.includes("compare")) {
      return "Comparing means looking at what is similar and what is different.";
    }
    if (p.includes("infer")) {
      return "Inferring means using clues in the text to figure out something not stated directly.";
    }
    if (p.includes("punctuation")) {
      return "Punctuation marks show pauses, stops, and help make sentence meaning clear.";
    }

    return "Look carefully at the word, sound out each letter, and think about the meaning.";`;

if (content.includes(oldHintFallback)) {
  content = content.replace(oldHintFallback, newHintFallback);
  console.log('Updated getStage3Hint with rich pedagogical hints for all new question types!');
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('src/App.jsx successfully updated!');
