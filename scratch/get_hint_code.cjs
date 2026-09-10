const fs = require('fs');
const logFile = 'C:\\Users\\dev maurya\\.gemini\\antigravity-ide\\brain\\46d959ab-17ba-4692-80fd-1d1eb52cd8f7\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').split('\n');

const json1680 = JSON.parse(lines[1680]);
console.log('1680:', JSON.stringify(json1680));

const json1681 = JSON.parse(lines[1681]);
console.log('1681:', json1681.content);

const json1698 = JSON.parse(lines[1698]);
console.log('1698:', JSON.stringify(json1698));

const json1699 = JSON.parse(lines[1699]);
console.log('1699:', json1699.content);

const json1700 = JSON.parse(lines[1700]);
console.log('1700:', JSON.stringify(json1700));

const json1701 = JSON.parse(lines[1701]);
console.log('1701:', json1701.content);

const json1714 = JSON.parse(lines[1714]);
console.log('1714 chunks:');
if (json1714.tool_calls) {
  for (const tc of json1714.tool_calls) {
    if (tc.args?.ReplacementChunks) {
      for (const chunk of tc.args.ReplacementChunks) {
        if (chunk.TargetContent?.includes('hint') || chunk.ReplacementContent?.includes('hint')) {
          console.log('CHUNK TARGET:\n', chunk.TargetContent);
          console.log('CHUNK REPLACEMENT:\n', chunk.ReplacementContent);
        }
      }
    }
  }
}
