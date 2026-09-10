const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const matches = content.match(/screen === "[^"]+"/g) || [];
console.log(Array.from(new Set(matches)));
