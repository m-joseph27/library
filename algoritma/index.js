// No. 1
function reverseString(input) {
  // filter alpabet
  const letters = input.match(/[a-zA-Z]/g); 
  const reversedLetters = letters ? letters.reverse().join('') : '';
  const number = input.match(/\d+/) || '';
  return reversedLetters + number;
}
const inputString = "NEGIE1";
const reversedString = reverseString(inputString);
console.log(reversedString);

// No. 2
function findLongestWord(sentence) {
  const words = sentence.split(' ');
  const longestWord = words.reduce((longest, current) => {
  return current.length > longest.length ? current : longest;
  });
  return longestWord;
}
const word = "Hari ini adalah hari sabtu";
const longestWord = findLongestWord(word);
console.log(longestWord);

// No. 3
function countQueryInput(INPUT, QUERY) {
  const count = QUERY.map(queryWord => {
  return INPUT.filter(inputWord => inputWord === queryWord).length;
  });
  return count;
}
const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const occurrences = countQueryInput(INPUT, QUERY);
console.log(occurrences);

// No. 4
function diagonalSum(array) {
  return Math.abs(array.reduce((sum, row, i) => sum + row[i] - row[row.length - 1 - i], 0));
}
const array = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
const result = diagonalSum(array);
console.log(result);