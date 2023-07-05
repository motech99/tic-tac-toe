'use strict';

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status-text');
const restartButton = document.querySelector('#restart-button');
const winnerCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", "", ];
let currentPlayer = "X";
let running = false;

initialiseGame();

function initialiseGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running) {
        return
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (currentPlayer === "X") {
    cell.style.color = "#00faff";
  } else if (currentPlayer === "O") {
     cell.style.color = "#4dadff";
  }
  
}


function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn!`;
  if(currentPlayer === "X") {
    statusText.style.color = `#00faff`;
  } else {
    statusText.style.color = "#4dadff";
  }
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winnerCon.length; i++){
        const condition = winnerCon[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true
            break;
        }

    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Unlucky! its a Draw!`
        statusText.style.color = "white";
        running = false;
    } else {
        changePlayer()
    }
}
function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", "", ];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
      cell.textContent = "";
      cell.style.color = "white";
    });
    running = true;
}