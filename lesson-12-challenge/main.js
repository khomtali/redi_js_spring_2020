// 4th
// your function should return { min: 1, max: 9 }
const numbers = '4 5 6 1 6 7 7 8 9';
function returnMinMax(stringOfNums) {
  // main solution
  const arrayOfNums = stringOfNums.split(' ');
  return {
    min: arrayOfNums.reduce((min, cur) => Math.min(min, cur), Number.MAX_SAFE_INTEGER),
    max: arrayOfNums.reduce((max, cur) => Math.max(max, cur), 0)
  };

  // alternative solution #1
  // arrayOfNums.sort();
  // return {min: arrayOfNums[0], max: arrayOfNums[arrayOfNums.length - 1]};

  // alternative solution #2
  // let minNum = Number.MAX_SAFE_INTEGER;
  // let maxNum = 0;
  // arrayOfNums.forEach(element => {
  //   if (minNum > element) minNum = element;
  //   if (maxNum < element) maxNum = element;
  // });
  // return {min: minNum, max: maxNum};
}
const result = returnMinMax(numbers);
console.log(result);

// 3rd
// main solution
function whoLikes(arrayOfNames) {
  if (arrayOfNames.length === 0) console.log('no one likes this');
  else if (arrayOfNames.length === 1) console.log(`${arrayOfNames[0]} likes this`);
  else if (arrayOfNames.length === 2) console.log(`${arrayOfNames[0]} and ${arrayOfNames[1]} like this`);
  else if (arrayOfNames.length === 3) console.log(`${arrayOfNames[0]}, ${arrayOfNames[1]} and ${arrayOfNames[2]} like this`);
  else console.log(`${arrayOfNames[0]}, ${arrayOfNames[1]} and ${arrayOfNames.length - 2} others like this`);
}

// alternative solution
// function whoLikes(arrayOfNames) {
//   switch(arrayOfNames.length) {
//     case 0:
//       console.log('no one likes this');
//       break;
//     case 1:
//       console.log(`${arrayOfNames[0]} likes this`);
//       break;
//     case 2:
//       console.log(`${arrayOfNames[0]} and ${arrayOfNames[1]} like this`);
//       break;
//     case 3:
//       console.log(`${arrayOfNames[0]}, ${arrayOfNames[1]} and ${arrayOfNames[2]} like this`);
//       break;
//     default:
//       console.log(`${arrayOfNames[0]}, ${arrayOfNames[1]} and ${arrayOfNames.length - 2} others like this`);
//   }
// }

whoLikes(['Ivan', 'Jessica', 'Jane', 'John', 'Natasha', 'Helga']);

// 1st
// Write a function that removes the first and last letter from a work.
const words = [
  'interfere',
  'soojee',
  'victrice',
  'civilisations',
  'succinonitrile',
  'dogfighters',
  'tempeh'
];
function removeFirstLast(str) {
  // main solution
  return str.slice(1, -1);
};
const correctAnswer = [
  'nterfer',
  'ooje',
  'ictric',
  'ivilisation',
  'uccinonitril',
  'ogfighter',
  'empe'
];
const correct = JSON.stringify(correctAnswer) === JSON.stringify(words.map(removeFirstLast));
console.log('correct answer?', correct);

// 2nd
// Write a function that returns the sum of all the positive numbers in an array
const testNums = [
  1,
  -4,
  7,
  12
];
function positiveSum(nums) {
  // main solution
  return nums.filter(num => num > 0).reduce((pre, cur) => pre + cur, 0);
};
const answer = positiveSum(testNums);
console.log('The correct sum', answer === 20);