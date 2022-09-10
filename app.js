// create board

function buildInitialState() {
    const siteBody = document.getElementsByName('body');
    const gameBoard = document.getElementById('gameboard');

    let newGameBoard = document.createElement('div');
    console.log(newGameBoard);
    newGameBoard.classList.add('small');
    // newGameBoard.innerText = 'this is where our snake game would live if it loaded with the right width and height';
    console.log(gameBoard);
    gameBoard.appendChild(newGameBoard);

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