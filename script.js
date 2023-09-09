'use strict';
//Selecting elements

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

//Rolling dice funtionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll

  let dice = Math.trunc(Math.random() * 6 + 1);
  console.log(dice);
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
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    nnn;
    current0El.textContent = 0;
  }
});
