// Add input here if code is ran locally.
var input = ``;

function getTestCaseArgs() {
  return [stdin.nextWord()];
}

function solveTestCase(N) {
  // Find the index of first odd digit
  var i = 0;
  while (N[i] % 2 === 0) {
    i++;
    // If no odds return zero
    if (i === N.length) {
      return 0;
    }
  }

  // If first odd digit is nine, there is always fewer minus presses
  if (N[i] === '9') {
    return calculateMinusPresses(N, i);
  }

  const plusPresses = calculatePlusPresses(N, i);
  const minusPresses = calculateMinusPresses(N, i);

  return plusPresses < minusPresses ? plusPresses : minusPresses;
}

// Calculates plus presses needed to have no odd digits given number N as string
// and index i of first odd digit
function calculatePlusPresses(N, i) {
  var noOddsN = (N.slice(0, i) + (+N[i] + 1)).padEnd(N.length, '0');
  return BigInt(noOddsN) - BigInt(N);
}

// Calculate minus presses needed to have no odd digits given number N as string
// and index i of first odd digit
function calculateMinusPresses(N, i) {
  var noOddsN = (N.slice(0, i) + (N[i] - 1)).padEnd(N.length, '8');
  return BigInt(N) - BigInt(noOddsN);
}

(function initIO() {
  const fs = require('fs');
  var lines = (input || fs.readFileSync(0, 'utf-8')).trim().split('\n');
  var currentLine = 0;

  globalThis.stdin = {
    nextWord: () => lines[currentLine++],
    nextWords: () => lines[currentLine++].split(' '),
    nextNum: () => +lines[currentLine++],
    nextNums: () => lines[currentLine++].split(' ').map(Number),
  };
})();

Array.from({ length: stdin.nextNum() }, (_, i) => i + 1).forEach(
  function solveAndLogToOutput(testCase) {
    var testCaseArgs = getTestCaseArgs();
    var result = solveTestCase(...testCaseArgs);
    console.log(`Case #${testCase}: ${result}`);
  }
);
