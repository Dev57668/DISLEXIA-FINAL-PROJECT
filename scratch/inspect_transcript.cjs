const fs = require('fs');
const logFile = 'C:\\Users\\dev maurya\\.gemini\\antigravity-ide\\brain\\46d959ab-17ba-4692-80fd-1d1eb52cd8f7\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').split('\n');

for (let i = 1675; i <= 1720; i++) {
  if (lines[i]) {
    try {
      const json = JSON.parse(lines[i]);
      console.log('=== LINE ' + i + ' (' + json.type + ') ===');
      if (json.content) console.log(String(json.content).slice(0, 500));
      if (json.tool_calls) console.log(JSON.stringify(json.tool_calls).slice(0, 500));
    } catch (e) {
      console.log('Error parsing line ' + i, e.message);
    }
  }
}
