const distanceInputEl = document.querySelector('.distance-input');
const timeInputEl = document.querySelector('.time-input');
const calcBtnEl = document.querySelector('.calc-button');
const resultEl = document.querySelector('.js-result');

function getUserData(distanceEl, timeEl) {
  console.log(distanceEl.value.split(' '));
  return {
    time: timeEl.value,
    distances: distanceEl.value.split(' ')
  };
}
function calculateSpeed(distance, time) {
  return Math.round(distance / time * 100) / 100;
}
function showResult(distances, time) {
  if (distances.length == 0) return;
  let speed = calculateSpeed(distances[0], time);
  resultEl.innerHTML += `
    <p>Given data: distance = ${distances[0]} km, time = ${time} h</p>
    <p>Speed of a car is: ${speed} km/h</p>
  `;
  distances.shift();
  setTimeout(() => showResult(distances, time), 1000);
}
calcBtnEl.addEventListener('click', () => {
  const { distances, time } = getUserData(distanceInputEl, timeInputEl);
  distanceInputEl.value = '';
  timeInputEl.value = '';
  showResult(distances, time);
});
