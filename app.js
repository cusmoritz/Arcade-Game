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
        console.log(gameBoard);
    newGameBoard.appendChild(newRow);
    }

    // create snake

    // let snakeColor = "green";
    // let snakeSpawn = gameBoard[5][5];
    // snakeSpawn.style.backgroundColor = snakeColor;

}

buildInitialState();