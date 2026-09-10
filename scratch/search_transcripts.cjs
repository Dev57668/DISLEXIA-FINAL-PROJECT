const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\dev maurya\\.gemini\\antigravity-ide\\brain';
const convDirs = fs.readdirSync(brainDir);

for (const dir of convDirs) {
  const logFile = path.join(brainDir, dir, '.system_generated', 'logs', 'transcript.jsonl');
  if (fs.existsSync(logFile)) {
    const lines = fs.readFileSync(logFile, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      try {
        const json = JSON.parse(line);
        const str = JSON.stringify(json);
        if (str.toLowerCase().includes('hint') && (str.toLowerCase().includes('cost') || str.toLowerCase().includes('deduct') || str.includes('XP') || str.includes('xp'))) {
          // let's check tool_calls or content
          if (json.tool_calls) {
            for (const tc of json.tool_calls) {
              const tcStr = JSON.stringify(tc);
              if (tcStr.toLowerCase().includes('hint') && (tcStr.toLowerCase().includes('cost') || tcStr.toLowerCase().includes('deduct') || tcStr.includes('xp'))) {
                console.log(`[${dir}] line ${i} tool call ${tc.function?.name || tc.name}:`);
                console.log(tcStr.slice(0, 300));
              }
            }
          }
          if (json.content && typeof json.content === 'string') {
            if (json.content.toLowerCase().includes('hint') && (json.content.toLowerCase().includes('cost') || json.content.toLowerCase().includes('deduct'))) {
              console.log(`[${dir}] line ${i} content:`);
              console.log(json.content.slice(0, 300));
            }
          }
        }
      } catch(e) {}
    }
  }
}
