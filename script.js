'use strict';
//Selecting elements
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  current0El.textContent = 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//Rolling dice funtionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll

  let dice = Math.trunc(Math.random() * 6 + 1);
  // 2.Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`; // dynamically load images depending on the random rolled dice

  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // add dice to the current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
});
btnHold.addEventListener('click', function () {
  //1. add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Check if player score is >= 100
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }

  //3. Switch to the next player
  switchPlayer();
});
