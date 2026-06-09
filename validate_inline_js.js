const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const match = content.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
if (!match) {
  console.error('NO_SCRIPT_FOUND');
  process.exit(1);
}
fs.writeFileSync('tmp_script.js', match[1], 'utf8');
require('child_process').execSync('node --check tmp_script.js', { stdio: 'inherit' });
console.log('JS_SYNTAX_OK');
