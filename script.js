"use strict";
// Selecting Elements
const player1 = document.querySelector(".sub-container-0");
const player2 = document.querySelector(".sub-container-1");
const score1 = document.getElementById("score-0");
const score2 = document.getElementById("score-1");
const current1 = document.getElementById("current-score-0");
const current2 = document.getElementById("current-score-1");
const btnNew = document.querySelector(".new-game");
const btnRollDice = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");
const image = document.getElementById("img");

let score, currentscore, activePlayer, playing;
// Starting Condition
const init = function () {
  score = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  image.classList.add("hidden");
  player1.classList.remove("player-winner");
  player2.classList.remove("player-winner");
  player1.classList.add("player-active");
  player2.classList.remove("player-active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current-score-${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
};

//Rolling Dice Functionality
btnRollDice.addEventListener("click", function () {
  // Generating a random  Roll dice number
  const diceResult = Math.trunc(Math.random() * 6) + 1;

  //   Display dice
  image.classList.remove("hidden");
  image.src = `dice-six-faces-${diceResult}-.png`;

  // Check if Rolled number is 1
  if (diceResult !== 1) {
    //Add diceResult to currentscore
    currentscore += diceResult;
    document.getElementById(`current-score-${activePlayer}`).textContent =
      currentscore;
  } else {
    // switch player
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  //   1.. add current score to active players score
  score[activePlayer] += currentscore;
  //   score[1]=score[1]+currentscore;
  document.getElementById(`score-${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.add(`player-winner`);
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.remove(`player-active`);
  } else {
    switchPlayer();
  }
});

/// Resetting the game
btnNew.addEventListener("click", init);
