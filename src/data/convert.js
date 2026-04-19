const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'citations.csv');
const jsonPath = path.join(__dirname, 'publications.json');

const data = fs.readFileSync(csvPath, 'utf8');
const lines = data.split('\n');
const headers = lines[0].split(',');

const results = [];

for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  // Handle commas inside quotes
  const currentline = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  
  if (currentline && currentline.length >= headers.length) {
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      let val = currentline[j] ? currentline[j].replace(/^"|"$/g, '').trim() : "";
      obj[headers[j].toLowerCase()] = val;
    }
    results.push(obj);
  }
}

fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
console.log('Conversion complete!');
