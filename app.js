// create board
const gameBoard = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('div'); // playing field
const snakeColor = "lightblue"; // snake color


function buildInitialState() {
    const siteBody = document.getElementsByName('body');
    const gameBoard = document.getElementById('gamePlusScore');

    const newGameBoard = document.createElement('div');
    newGameBoard.style.border = "dashed";

    let gameSize = {
    xsmallGame: 300,
    smallGame: 500, // has to be a string because of css (?)
    mediumGame: 800, // is always a string if in an object
    }
    console.log('small game', gameSize.smallGame === '500');

    newGameBoard.style.width = "500px"; // setting height / width of game board 
    newGameBoard.style.height = "500px";
 
    gameBoard.appendChild(newGameBoard);
    console.log(newGameBoard);

    function createSnake() {
        console.log('reading create snake');
        // create an array (object? both?) which keeps track of the length of our snake
    
        //get the initial location of the snake head (middle of game field)
        let boardCenterWidth = gameSize.smallGame / 2;
        let boardCenterHeight = gameSize.smallGame / 2;
        console.log("boardCenterHeight", gameSize.smallGame / 2);
        console.log("boardCenterWidth", gameSize.smallGame / 2);
        

        // take the boardCenterHeight and boardCenterWidth to use as coordinates
            // use coordinates within game board?

        let snakeHead;
        snakeHead.width = "4px";
        snakeHead.height = "4px";
        snakeHead.top = boardCenterHeight;
        console.log(snakeHead);


    
        // create snake object
        //    variable         x cord              y cord
        // let snake = {
        //     headPosition: [boardCenterHeight, boardCenterWidth,],
        //     headWidth: [boardCenterHeight + 4, boardCenterWidth + 4],
        //     snakeBody: [headPosition, headPosition(1) + 10],
        // }


        // the starting position of the head of the snake should be the center of the board
        // snake should be an x amount height and width
    
    }

    createSnake();
}

/*
create a game board of somewidth x someheight
inside that game board, do we want a bunch of smaller divs,
    do we just want the pixels to count as the game board,
    or do we want to use a table of a set width and height?


*/



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