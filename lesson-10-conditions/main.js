const numberBtnEl = document.querySelector('.number');
const colorBtnEl = document.querySelector('.color');

// guessing number game
numberBtnEl.addEventListener('click', () => {
  const number = Math.floor(Math.random() * 10);
  console.log(number);
  let userNumber;
  for (let i = 0; i < 3; i++) {
    userNumber = Number(prompt(`Try to guess a number. You have ${3 - i} attempts`));
    if (isNaN(userNumber))
      alert('NOT A NUMBER!');
    else if (userNumber > number)
      alert('TOO HIGH');
    else if (userNumber < number)
      alert('TOO LOW');
    else if (userNumber === number) {
      alert('YOU WIN!');
      break;
    }
  }
  if (userNumber !== number) alert('You lost.');
});

// guessing color game
colorBtnEl.addEventListener('click', () => {
  const color = 'red';
  let userColor;
  for (let i = 0; i < 3; i++) {
    userColor = prompt(`Try to guess color. You have ${3 - i} attempts`);
    if (userColor == color) {
      alert('Correct!');
      break;
    } else alert('Try again');
  }
  if (userColor !== color) alert('You lost.');
});