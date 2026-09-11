const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');

const videoRegex = /id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*channel:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"/g;
let match;
while ((match = videoRegex.exec(content)) !== null) {
  console.log(`${match[1]}: [${match[3]}] ${match[2]} -> ${match[4]}`);
}
