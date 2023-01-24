'use strict'

// const GHOST ="&#10084;"
const GHOST ='<img src="img/sbsp.gif">'
const DEAD = []
const SCARED_GHOST = '<img src="img/scared.gif">'
var gGhostMode = GHOST
// GHOST.style.width = "20px"
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for(var i = 0; i < 3; i++){
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: set arbitrary start pos & currCellContent
    // var idx =getRandomIntInclusive(0, GHOST.length)
    var ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        imgUrl:0,
        color:getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = gGhostMode
}

function moveGhosts() {
    // TODO: loop through ghosts
    for(var i = 0; i < gGhosts.length; i++){
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell

    const nextLocation = { i: ghost.location.i, j: ghost.location.j }
    // const nextLocation = ghost.location // This is Wrong!
    const diff = getMoveDiff()

    nextLocation.i += diff.i
    nextLocation.j += diff.j

    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]
    // TODO: return if cannot move

    if(nextCellContent === WALL || nextCellContent === gGhostMode) return
    // TODO: hitting a pacman? call gameOver

    if(nextCellContent === PACMAN && !gGame.isSuperFood){
        gameOver()
        var out = document.querySelector("h3")
        out.innerText ="you lost!"
        out.style.display = "block"
        return
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    
    // TODO: update the DOM
    
    renderCell(ghost.location, ghost.currCellContent)
    
    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    
    ghost.location = nextLocation
    ghost.currCellContent = nextCellContent
    gBoard[ghost.location.i][ghost.location.j] = gGhostMode

    // TODO: update the DOM
    
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0,  j: 1  }
        case 2: return { i: 1,  j: 0  }
        case 3: return { i: 0,  j: -1 }
        case 4: return { i: -1, j: 0  }
    }
}

function getGhostHTML(ghost) {
// return ` <img src="img/${ghost.imgurl}.gif" alt="">`
//   var color = gPacman.isSuper? 'blue':ghost.color
  var color = gPacman.isSuper? 'blue':ghost.color
    return `<span style="background-color:${color}">${gGhostMode}</span>`
}
function changeGhostColor(color = false) {
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = color ? color : getRandomColor();
    }
  }
  