"use strict";
// const GAMER_IMG = '\n\t\t<img src="img/amit.png">\n';

const PACMAN = '<img src="img/amit.png">';
const SUPER_PACMAN = '<img src="img/simba.png">';
const PACMAN_EAT = '<img src="img/eat.png">';
var gPacman;
var gIsSuper = false;
var gPacmanMode = PACMAN
function createPacman(board) {
  // TODO: initialize gPacman...
  gPacman = {
    location: { i: 5, j: 5 },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  // TODO: use getNextLocation(), nextCell

  const nextLocation = getNextLocation(ev);

  // TODO: return if cannot move
  if (!nextLocation) return;

  const nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === WALL) return;

  // TODO: hitting a ghost? call gameOver
  if (nextCell === gGhostMode) {
    if (gGame.isSuperFood) eatGhosts(nextLocation);
    else {
      gameOver();
      return;
    }
  }
  // TODO: hitting food? call updateScore
  if (nextCell === FOOD) {
    renderCell({ i: nextLocation.i, j: nextLocation.j }, gPacmanMode);
    updateScore(1);
  }
  if (nextCell === CHERRY) {
    updateScore(10);
  }
  if (nextCell === SUPER_FOOD) {
    gGame.isSuperFood = true
    for (var i = 0; i < gGhosts.length; i++) {
        changeGhostColor("white");
        setTimeout(() => {
          changeGhostColor();
        }, 5000);
        gPacmanMode = SUPER_PACMAN
        gGhostMode = SCARED_GHOST
        gBoard[nextLocation.i][nextLocation.j]= gPacmanMode
       renderCell({ i: nextLocation.i, j: nextLocation.j }, gPacmanMode)

    // gPacman.isSuper = true;

    setTimeout(() => {
      gPacman.isSuper = false
      gPacmanMode = PACMAN
      gGhostMode = GHOST
    }, 5000);
    // gSuperTime =555
  }
}

  // TODO: moving from current location:
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);

  // TODO: Move the pacman to new location:
  // TODO: update the model
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // TODO: update the DOM
  if (nextCell === FOOD) {
    // playSound()
    renderCell(gPacman.location,   gPacman.isSuper ? gPacmanMode : PACMAN_EAT);
    setTimeout(
      renderCell,
      100,
      gPacman.location,
      gPacmanMode
     
    );
  } else renderCell(gPacman.location, gPacmanMode);
}

function getNextLocation(eventKeyboard) {
  if (gGame.isOn === false) return;

  const nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  // TODO: figure out nextLocation

  switch (eventKeyboard.key) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;

    default:
      return null;
  }
  return nextLocation;
}
function eatGhosts(nextLocation) {
    var ghostIdx = findingGhostIdx(nextLocation);
  
    DEAD.push(gGhosts[ghostIdx]);
    gGhosts.splice(ghostIdx, 1);
  
    setTimeout(returnGhosts, 5000)
  }
  function returnGhosts() {
    DEAD[0].color = getRandomColor()
    gGhosts.push(DEAD[0])
    DEAD.shift()
  }
  function findingGhostIdx(nextLocation){
    for ( var idx=0; idx<gGhosts.length; idx++){
      if( gGhosts[idx].location.i===nextLocation.i && gGhosts[idx].location.j===nextLocation.j ){
      return idx
      }
    }
  }
  