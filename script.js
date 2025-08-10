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

function setButtonsEnabled(on) {
  btnRoll.disabled = !on;
  btnHold.disabled = !on;
}

let playing, currentScore, activePlayer, scores;
let winScore = 100;

const init = function () {
  scores = [0, 0];

  const input = document.getElementById('winScore');
  const v = parseInt(input?.value, 10);
  winScore = Number.isFinite(v) && v > 0 ? v : 100;

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.src = 'dice-blank.png';
  diceEl.alt = 'Dice placeholder';
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  setButtonsEnabled(true);
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // current0El.textContent = 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

//Rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
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
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player score is >= 100
    if (scores[activePlayer] >= winScore) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      setButtonsEnabled(false);
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
// Keyboard shortcuts: R = Roll, H = Hold, N = New
window.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.target && e.target.tagName === 'INPUT') return; // don't trigger while typing
  const k = e.key.toLowerCase();
  if (!playing && k !== 'n') return; // only allow New when game over
  if (k === 'r') btnRoll.click();
  if (k === 'h') btnHold.click();
  if (k === 'n') btnNew.click();
});
