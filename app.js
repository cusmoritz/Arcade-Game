// create board
const siteBody = document.getElementsByName('body');
const gameLayout = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('table'); // playing field

let game = {
    xsmallGame: 300,
    smallGame: 500, // has to be a string because of css (?)
    mediumGame: 800, // key is always a string if in an object
    }

    let gameBoard = {
    //     1: [1,2,3,4,5,6,7,8,9,10],
    //     2: [1,2,3,4,5,6,7,8,9,10],
    //     3: [1,2,3,4,5,6,7,8,9,10],
    //     4: [1,2,3,4,5,6,7,8,9,10],
    //     5: [1,2,3,4,5,6,7,8,9,10],
    //     6: [1,2,3,4,5,6,7,8,9,10],
    //     7: [1,2,3,4,5,6,7,8,9,10],
    //     8: [1,2,3,4,5,6,7,8,9,10],
    //     9: [1,2,3,4,5,6,7,8,9,10],
    //     10: [1,2,3,4,5,6,7,8,9,10]
    }


function buildInitialState() {
    gameLayout.appendChild(newGameBoard);

    // create 20 rows with 20 cells each

    for (let rowsInTable = 1; rowsInTable < 21; rowsInTable++){
        let newRow = document.createElement('tr');
        // gameBoard[rowsInTable] = rowsInTable;
        newRow.dataset.index = rowsInTable

        for (let cellsInRow = 1; cellsInRow < 21; cellsInRow++){
            let newCell = document.createElement('td');
            newCell.dataset.index = cellsInRow;

            // Object.values(rowsInTable) = newCell;
            // gameBoard[rowsInTable] = newCell;
            
            newRow.appendChild(newCell);
            
            console.log(parseInt(newCell.dataset.index));
            
        }
        // console.log(gameBoard);
    newGameBoard.appendChild(newRow);
    }

    // create snake

    let snakeColor = "green";

    // start snake head at row 11 cell 11
    let startRow = document.querySelector('tr[data-index="11"]'); // get snake head location
    // console.log(startRow);
    // startRow.style.backgroundColor = "green";

    let snakeHead = startRow.children[11]; // snake head location
    snakeHead.style.backgroundColor = 'blue';
    // console.log(snakeHead);

    let bodyRow = document.querySelector(('tr[data-index="12"]')); // body cells
    let bodyRow2 = document.querySelector(('tr[data-index="13"]'));
    
    let body1 = bodyRow.children[11]; // create / color body cells
    let body2 = bodyRow2.children[11];
    body1.style.backgroundColor = "blue";
    body2.style.backgroundColor = 'blue';
    
    // create apple
    let randomSpot; 
    let allRows = document.querySelectorAll('tr');
    let randomAppleRow = Math.ceil(Math.random() * allRows.length);
    console.log("randomapplerow", randomAppleRow);
    let randomAppleCell = Math.ceil(Math.random() * randomAppleRow);
    console.log("randomapple cell", randomAppleCell);
    

    let appleRow = document.querySelector("tr[data-index=randomAppleRow]");
    // let appleCell = appleRow.children[randomAppleCell];
    // console.log(appleRow);
    // console.log(appleCell);
    // appleCell.style.backgroundColor = "red";

}

buildInitialState();

function drawApple() {

}

// event listeners *************************
let keys = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}


let body = document.getElementById("body");
body.addEventListener("keydown", function(event){

    if (event.key = 38){
        // if Arrow Up is pressed, run move up function

    } else if ( event.key = 40){
    // if Arrow Down is pressed 

    } else if (event.key = 37){
    // if Arrow Left

    } else {
    // if Arrow Right
    }
})

function moveUp(){

}