// Add input here if code is ran locally.
var input = ``;

function getTestCaseArgs() {
  const [N, K] = stdin.nextNums();
  const items = stdin.nextNums().sort((a, b) => a - b);

  return [N, K, items];
}

function solveTestCase(N, K, items) {
  // Calculate suffix sums of items
  var suffixSums = [...items];

  for (let i = N - 2; i >= 0; i--) {
    suffixSums[i] += suffixSums[i + 1];
  }

  // Calculate expected value of last redip. It is average of items
  var expectedValue = items.reduce((a, b) => a + b, 0) / N;

  // Calculate expected value of last item for each earlier redip with optimal strategy
  // Only redip if current item value is lower than expected value of next redip
  for (let i = 0; i < K; i++) {
    const count = countSmallerItems(N, items, expectedValue);
    expectedValue = (count * expectedValue + suffixSums[count]) / N;
  }

  return expectedValue;
}

// Binary search for finding count of smaller values than given value from sorted array
function countSmallerItems(N, items, value) {
  var start = 0;
  var end = N - 1;

  while (start !== end) {
    let center = Math.floor((start + end) / 2);
    if (items[center] <= value) {
      start = center + 1;
    } else {
      end = center;
    }
  }

  return start;
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
