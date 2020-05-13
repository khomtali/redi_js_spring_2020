// task 1
const printNumbersBtn = document.getElementById('printNumbersBtn');
printNumbersBtn.addEventListener('click', printNumbers);

function printNumbers() {
  let string = '';
  for (let i = 1; i < 11; i++) {
    string = string + i + ' ';
  }
  string = string.substring(0, string.length - 1);
  console.log(string);
}

// task 2
const countBy10Btn = document.getElementById('countBy10Btn');
countBy10Btn.addEventListener('click', countBy10);

function countBy10() {
  let counter = 0;
  let index = 0;
  let arrayOf10s = [];
  while (counter <= 100) {
    arrayOf10s[index] = counter;
    ++index;
    counter = counter + 10;
  }
  console.log(arrayOf10s);
}

// task 3
const debuggingIsFunBtn = document.getElementById('debuggingIsFunBtn');
debuggingIsFunBtn.addEventListener('click', debuggingIsFun);

function debuggingIsFun() {
  //HINT: use the debugger to see the value of 'firstHalf' and 'secondHalf'
  const str = 'Debugging is hard but is fun!';
  const firstHalf = str.substring(0, 13);
  const secondHalf = str.substring(25, 28);
  const finalStr = firstHalf + secondHalf;
  console.log(finalStr);
}

// task 4
const reverseNumberBtn = document.getElementById('reverseNumberBtn');
reverseNumberBtn.addEventListener('click', reverseNumberSorter);

function reverseNumberSorter() {
  //looks like the number sorter... But we want it to be a reverse number sorter
  let nums = [3, 6, 5, 4, 2, 8, 1, 10, 7, 9];
  for (let i = 1; i < nums.length; i++) {
    let j = i;
    while (j > 0 && nums[j - 1] < nums[j]) {
      let temp = nums[j];
      nums[j] = nums[j - 1];
      nums[j - 1] = temp;
      j--;
    }
  }
  console.log(nums);
}

// task 5
const maxNumberBtn = document.getElementById('maxNumberBtn');
maxNumberBtn.addEventListener('click', maxNumber);

function maxNumber() {
  //this function should print out the largest number in the array
  const nums = [
    4,
    32,
    41,
    23,
    10,
    4,
    36,
    24,
    29,
    35,
    38,
    40,
    12,
    33,
    42,
    26,
    27,
    19,
    20,
    2,
    43,
    41,
    34,
    38,
    39,
    45,
    42,
    41,
    34,
    23,
    26,
    40,
  ];
  let maxNumber = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxNumber) {
      maxNumber = nums[i];
    }
  }
  console.log(maxNumber);
}