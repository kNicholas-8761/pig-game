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

const startSound = new Audio('./sounds/gamestart.mp3');
const soundRoll = new Audio('./sounds/dice-roll.mp3');
const soundHold = new Audio('./sounds/hold.mp3');
const soundWin = new Audio('./sounds/win.mp3');
const soundLoseTurn = new Audio('./sounds/lose.mp3');

startSound.volume = 0.2;

function setButtonsEnabled(on) {
  btnRoll.disabled = !on;
  btnHold.disabled = !on;
}
function setHoldEnabled(on) {
  btnHold.disabled = !on;
}

let playing, currentScore, activePlayer, scores;
let winScore = 100;

const winScoreInput = document.getElementById('winScore');

winScoreInput?.addEventListener('input', updateWinScore);
winScoreInput?.addEventListener('change', updateWinScore);

function updateWinScore(e) {
  const v = parseInt(e.target.value, 10);
  winScore = Number.isFinite(v) && v > 0 ? v : 100;
  console.log('Winning score set to:', winScore);
}

const init = function () {
  scores = [0, 0];

  currentScore = 0;
  activePlayer = 0;
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

  btnRoll.disabled = false;
  setHoldEnabled(false);
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
  setHoldEnabled(false);
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      soundRoll.play();
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      setHoldEnabled(true);

      if (scores[activePlayer] + currentScore >= winScore) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
          scores[activePlayer];

        playing = false;

        soundWin.play();
        diceEl.classList.add('hidden');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');

        setButtonsEnabled(false);
      }
    } else {
      soundLoseTurn.play();
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= winScore) {
      playing = false;

      soundWin.play();
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      setButtonsEnabled(false);
    } else {
      soundHold.play();
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', () => {
  startSound.currentTime = 0;
  startSound.play();
  init();
});
window.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.target && e.target.tagName === 'INPUT') return;
  const k = e.key.toLowerCase();
  if (!playing && k !== 'n') return;
  if (k === 'r') btnRoll.click();
  if (k === 'h') btnHold.click();
  if (k === 'n') btnNew.click();
});
