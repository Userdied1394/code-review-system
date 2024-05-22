const { exec } = require('child_process');

async function analyzeCode(code) {
  // Example: Run ESLint for JavaScript code analysis
  return new Promise((resolve, reject) => {
    exec(`echo "${code}" | eslint --stdin`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

module.exports = { analyzeCode };
