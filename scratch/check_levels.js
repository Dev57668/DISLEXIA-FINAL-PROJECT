import fs from 'fs';

// Let's check the objects in playStage1Levels, playStage2Levels, stage3Bank, playStage4Levels, playShapesLevels, activeLevels
const content = fs.readFileSync('src/App.jsx', 'utf8');

// Find where stage data is defined
const stage1Matches = content.match(/id:\s*1,\s*title:[^,\n]+,\s*difficulty:[^,\n]+/g);
console.log("Sample Level items:", stage1Matches?.slice(0, 10));
