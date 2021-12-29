// Add input here if code is ran locally.
var input = ``;

function getTestCaseArgs() {
  return ['0' + stdin.nextWord()];
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

  const plusPresses = calculatePlusPresses(N, i);
  const minusPresses = calculateMinusPresses(N, i);

  return Math.min(plusPresses, minusPresses);
}

// Calculates plus presses needed to have no odd digits given number N as string
// and first odd digit index i
function calculatePlusPresses(N, i) {
  // Calculate presses needed to add one to first odd digit
  var presses = 10 ** (N.length - 1 - i) - N.slice(i + 1);

  // If the first odd digit was not 9, return the result
  if (N[i] !== '9') {
    return presses;
  }

  // Otherwise update the number digits
  N = (N.slice(0, i - 1) + (+N[i - 1] + 1).toString()).padEnd(N.length, '0');

  // And calculate recursively how many more presses are needed
  return presses + calculatePlusPresses(N, i - 1);
}

// Calculate minus presses needed to have no odd digits given number N as string
// and first odd digit index i
function calculateMinusPresses(N, i) {
  return +N.slice(i + 1) + +''.padEnd(N.length - 1 - i, 1) + 1;
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
