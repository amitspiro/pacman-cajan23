"use strict";

// const WALL ='<p class="wall" >#</p>'
const FOOD = '<img class="chip" src="img/chip.png">';
const SUPER_FOOD = '<img src="img/sour.png">';
const CHERRY = '<img src="img/oreo.png">';
const WALL = '<img class="WALL" src="img/ss.png">';
// const FOOD = '<img src="img/sour.png">'
// const FOOD = '<img src="img/pizza.png">'
// WALL.style.width = "20px"

const EMPTY = " ";

const gGame = {
  score: 0,
  isOn: false,
  isSuperFood: false
};
var gBoard;
var gSuperTime = 0;

function init() {
  var out = document.querySelector("h3");
  out.innerText = "You Won!!!";
  out.style.display = "none";
  gGame.score = 0;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  renderBoard(gBoard, ".board-container");
  setInterval(addCherry, 1500);
//   setInterval(createScared, 5000);
  gGame.isOn = true;
// }
// function createScared() {
//   if (gSuperTime === 555) {
//     GHOST = SCARED_GHOST;
//   }
}
function playAgain() {
  var btn = document.querySelector(".btnrestart");
  init();
  btn.style.display = "none";
}

function buildBoard() {
  const size = 10;
  const board = [];

  for (var i = 0; i < size; i++) {
    board.push([]);

    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD;

      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPER_FOOD;
  board[8][1] = SUPER_FOOD;
  board[1][8] = SUPER_FOOD;
  board[8][8] = SUPER_FOOD;

  return board;
}
function addCherry() {
  const emptyPos = getEmptyPos();
  if (!emptyPos) return;
  gBoard[emptyPos.i][emptyPos.j] = CHERRY;
  renderCell(emptyPos, CHERRY);
}

function getEmptyPos() {
  const emptyPoss = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      // if(gBoard[i][j] === WALL
      // && gBoard[i][j] ===FOOD && gBoard[i][j] === PACMAN &&
      //  gBoard[i][j] === SUPER_PACMAN && gBoard[i][j] === SUPER_FOOD) {
      //  continue
      // }else{
      if (gBoard[i][j] === EMPTY) {
        emptyPoss.push({ i, j });
      }
    }
  }
  var randIdx = getRandomIntInclusive(0, emptyPoss.length);
  return emptyPoss[randIdx];
}
function updateScore(diff) {
  if (gGame.score >= 150) {
    gameOver();
    var out = document.querySelector("h3");
    out.style.display = "block";
  }
  // TODO: update model and dom
  // Model
  gGame.score += diff;

  // DOM
  const elScore = document.querySelector("span");
  elScore.innerText = gGame.score;
}

function gameOver() {
  // console.log(' no no Game Over')
  var btn = document.querySelector(".btnrestart");
  btn.style.display = "block";
  gGhosts = [];
  // TODO
  gGame.isOn = false;
}


