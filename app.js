// create board
const siteBody = document.getElementsByName('body');
const gameBoard = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('div'); // playing field

let gameSize = {
    xsmallGame: 300,
    smallGame: 500, // has to be a string because of css (?)
    mediumGame: 800, // key is always a string if in an object
    }



function buildInitialState() {

    // const newGameBoard = document.createElement('div');
    newGameBoard.style.border = "dashed";
    newGameBoard.style.width = "500px"; // setting height / width of game board 
    newGameBoard.style.height = "500px";
    newGameBoard.style.display = "wrap";
    


    for (i = 0; i < 380; i++){
        let newCell = document.createElement('div');
        newCell.style.height = "25px";
        newCell.style.width = "25px";
        newCell.dataset.index = i;

        newGameBoard.appendChild(newCell);
        // middleCell.style.backgroundColor = "green";
    }


    

    gameBoard.appendChild(newGameBoard);

    newGameBoard.addEventListener('click', function(event){
        console.log(event.target)
        event.target.style.backgroundColor = "green";
    })



    function createSnake(event) {

        console.log('reading create snake');
        
    }

    createSnake();
}

/*
create a game board of somewidth x someheight
inside that game board, do we want a bunch of smaller divs,
    do we just want the pixels to count as the game board,
    or do we want to use a table of a set width and height?


*/

function createApple(){
    let appleSpawn = Math.floor(Math.random() * gameSize.smallGame);

}

/*
The snake
could be an array of length x
every time we eat an "apple"
our snake grows by one

if we hit a wall or another part of the snake,
the game ends

*/




// calling our functions
buildInitialState();