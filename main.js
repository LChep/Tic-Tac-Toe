const statusText = document.querySelector(".statusText");
const cells = Array.from(document.querySelectorAll(".cell"));
const restartBtn = document.getElementById("restartBtn");

const winningCondition= [
    [0, 1, 2],
    [3, 4, 5],
    [6,  7,8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let placeHolders = ["", "", "", "", "", "", "", "", ""];

const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;
let gameOn = false;

function startGame (){
    cells.forEach(cell => document.addEventListener("click", cellClicked))
    statusText.innerHTML = `${turn}'s TURN`
    gameOn = true;
}



function cellClicked(e){
       let id = e.target.id;
     
       if (!placeHolders[id] || gameOn){
            placeHolders[id] = turn;
            e.target.innerText = turn;

            if (gameWon()){
                statusText.innerText = `${turn} has won!`;
                statusText.style.color = "#EDAA25";
                let win = gameWon();
                
                win.map(cell => cells[cell].style.backgroundColor = "#0A7373")
            
                }
            
            else if(draw()){
                statusText.textContent = `Draw`;
                gameOn=false;
            }
            
            else {
                turn = (turn == PLAYER_X) ? PLAYER_O : PLAYER_X;
            statusText.textContent = `${turn}'s TURN`
        }
       }
}



function btnClicked(){
    placeHolders = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.innerText = ""
        cell.style.backgroundColor = ""
    });

    turn = PLAYER_X;
    statusText.innerHTML = `${turn}'s TURN`
    gameOn = true;
    restartBtn.innerText= " ";
}

function gameWon(){
    for (const condition of winningCondition){
        let [a, b, c] = condition;

        if (placeHolders[a] && (placeHolders[a] == placeHolders[b] && placeHolders[b] == placeHolders[c])){
            gameOn = false;
           return [a, b, c];
        }
    }
    return null;
}



function draw(){
    if(!placeHolders.includes("") && !gameWon()){
        return true;
    }
    return false;
}

restartBtn.addEventListener("click", btnClicked);

startGame();
