// TLE for test set 2. Too slow language?

// Add input here if code is ran locally.
var input = ``;

function getTestCaseArgs() {
  const L = stdin.nextNum();
  const words = stdin.nextWords();
  const params = stdin.nextWords();

  const dictionary = generateDictionary(words);
  const S = generateString(params);

  return [dictionary, S];
}

function generateString(params) {
  const [S1, S2, ...rest] = params;
  const [N, A, B, C, D] = rest.map(BigInt);

  var S = S1 + S2;
  var x1 = BigInt(S1.charCodeAt(0));
  var x2 = BigInt(S2.charCodeAt(0));

  for (let i = 3; i <= N; i++) {
    let x3 = (A * x2 + B * x1 + C) % D;
    S += String.fromCharCode(Number(97n + (x3 % 26n)));
    x1 = x2;
    x2 = x3;
  }

  return S;
}

function generateDictionary(words) {
  const dictionary = {};

  words.forEach((word) => {
    if (dictionary[word.length] === undefined) {
      dictionary[word.length] = [];
    }

    dictionary[word.length].push({
      first: word[0],
      last: word[word.length - 1],
      frequencies: countFrequencies(word),
    });
  });

  return dictionary;
}

function countFrequencies(word) {
  var frequencies = Array(26).fill(0);

  word.split('').forEach((c) => {
    frequencies[c.charCodeAt(0) - 97] += 1;
  });

  return frequencies;
}

function solveTestCase(dictionary, S) {
  var count = 0;

  Object.entries(dictionary).forEach(([length, words]) => {
    var first = S[0];
    var last = S[length - 1];
    var frequencies = countFrequencies(S.slice(0, length - 1));

    for (let i = 0; i < S.length - length + 1; i++) {
      first = S[i];
      last = S[i + +length - 1];
      frequencies[last.charCodeAt(0) - 97]++;

      words.forEach((word) => {
        if (word.first !== first || word.last !== last) {
          return;
        }

        const sameFrequencies = word.frequencies.every((freq, j) => {
          return frequencies[j] === freq;
        });

        if (sameFrequencies) {
          count++;
          word.first = null;
        }
      });

      frequencies[first.charCodeAt(0) - 97]--;
    }
  });

  return count;
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
