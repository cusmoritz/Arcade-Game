
// get our html elements
const siteBody = document.getElementsByName('body');
const gameLayout = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('table'); // playing field
let scoreboard = document.getElementById('score'); // get score elem
let sidebar = document.getElementById('sidebar');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const highScoreEl = document.createElement('span');
const timerEl = document.getElementById('timer');
const resetButton = document.getElementById('reset');
const gameOverText = document.createElement('p');

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 1]
}

let gameState = {
apple: [10, 5],
eaten: false,
snake: snake,
score: 0,
highscore: 0,
time: 0,
applecounter: 0,
gameRunning: false,
size: 20,
ticker: 200,
}

intervalTimer = setInterval(startGame, gameState.ticker);

function buildInitialState() {

    gameLayout.appendChild(newGameBoard);

    newGameBoard.innerText = "";

    for (let rowsInTable = 0; rowsInTable < gameState.size; rowsInTable++){
        // create rows
        let newRow = document.createElement('tr');

        for (let cellsInRow = 0; cellsInRow < gameState.size; cellsInRow++){
            //create cells
            let newCell = document.createElement('td');
            // add cells to rows
            newRow.appendChild(newCell);      
        }
    // add rows to board
    newGameBoard.appendChild(newRow);
    }

}

buildInitialState();
scoreStatic.after(highScoreEl);
colorSnake();
createApple();

// if gamestate.gamerunning = true
    // call render and ticker functions
// if gamestate.gamerunning = false
    // do not call render and ticker functions
    // call game over function

function startGame(){
    if (gameState.gameRunning == true){
        ticker();
        render();

    } else {
        clearInterval(intervalTimer);
    // break;
    }
}

function ticker() {
    // console.log('tick');
    moveSnake();
    appleEaten();
    collisionWalls();
    // need to add snake self-collision
}

function render() {
    // console.log('render');
    colorSnake();
    timer();
}


// ********************* TICKER FUNCTIONS *******************
function moveSnake(){ // updates the snake array with snake.direction
    let newSegment = [(snake.body[snake.body.length - 1][0] + snake.nextDirection[0]), (snake.body[snake.body.length - 1][1] + snake.nextDirection[1])];
    snake.body.push(newSegment);
    
    for (let i = 0; i < snake.body.length-2; i++){
        if (snake.body[i][0] == newSegment[0] && snake.body[i][1] == newSegment[1]){
            gameOver();
        }
    }

    removeTail();
 }

function removeTail(){ // removes "snake" class from first 'snake' array elem.
    let snakeTail = snake.body[0];
    newGameBoard.children[snakeTail[0]].children[snakeTail[1]].classList.remove("snake");
    snake.body.shift();
}

function createApple() {
    gameState.eaten = false;
    //random apple row and cell
    let randomRow = Math.floor(Math.random() * newGameBoard.children.length);
    let newAppleCell = Math.floor(Math.random() * newGameBoard.children[0].children.length);
    // put random row and cell in apple array
    gameState.apple[0] = randomRow;
    gameState.apple[1] = newAppleCell;
    appleCollision();
    drawApple();
}

function appleEaten(){ // checks to see if we ate the apple
    // this checks if the head of our snake == the apple coordinates
    if (snake.body[snake.body.length - 1][0] == gameState.apple[0] && snake.body[snake.body.length - 1][1] == gameState.apple[1]) {

        gameState.eaten = true;
        gameState.applecounter = gameState.applecounter + 1;
        // and adds 5 to the score if we eat an apple
        gameState.score = gameState.score + 5;
        // add length to the snake
        addTail();
        // create a new apple
        createApple();
    }
}

function addTail(){
    snake.body.unshift(snake.body[0]);
}

function collisionWalls() {
    let snakeHead = (snake.body.at(-1));

    if ((snakeHead[0] < 0) || (snakeHead[0] >= gameState.size)){
        gameState.gameRunning = false;
        gameOver(); // check to make sure the snake is inside the game board width
        console.log('ded height');
    }

    if ((snakeHead[1] < 0) || (snakeHead[1] >= gameState.size)){
        gameState.gameRunning = false;
        gameOver(); // check to make sure snake is within height of game
        console.log('ded width');
    }
}

function appleCollision() {
    let appleCoord = gameState.apple;

    for (let i = 0; i < snake.body.length; i++){ // loops through snake.body
        for (let j = 0; j < 2; j++){ // loop through snake.body[i]
            if (appleCoord[0] === snake.body[i][j] && appleCoord[1] === snake.body[i][j]){ // loop thru snake.body[i][j]
                createApple();
                console.log(`APPLE HIT at ${snake.body[i]}`);
            }
        }
    }
}


// ************************** RENDER FUNCTIONS ***********************
function colorSnake() { // styles each snake cell with "snake"
    snake.body.forEach(element => {
        newGameBoard.children[element[0]].children[element[1]].classList = "snake";
    })
}

function drawApple(){ // colors apple from gamestate.apple coordinates
    newGameBoard.children[gameState.apple[0]].children[gameState.apple[1]].classList = "apple"; // put the random apple on the board    
}

function timerScore(){ // if gamestate.time = 20/40/60/80...  score + 1
    if ((gameState.time % 20) == 0){
        gameState.score = gameState.score + 1;
    }
    scoreCounter();
}

function timer(){ // add time to time element
    timerEl.innerText = gameState.time;
    gameState.time = gameState.time + 1;
    timerScore();
}

function scoreCounter(){ // add score to score element
    let scorer = document.getElementById('score');
    scorer.innerHTML = gameState.score;
}


// ************************* EVENT LISTENERS *************
startButton.addEventListener('click', function(){
    gameState.gameRunning = true;
    clearInterval(intervalTimer);
    intervalTimer = setInterval(startGame, gameState.ticker);
});

let largeGame = document.getElementById('large');
largeGame.addEventListener('click', function(){
    gameState.size = 40;
    buildInitialState();
    colorSnake();
    createApple();
})

let mediumGame = document.getElementById('medium');
mediumGame.addEventListener('click', function(){
    gameState.size = 30;
    buildInitialState();
    colorSnake();
    createApple();
})

let smallGame = document.getElementById('small');
smallGame.addEventListener('click', function(){
    gameState.size = 20;
    buildInitialState();
    colorSnake();
    createApple();
})

const fasterButton = document.getElementById('faster');
fasterButton.addEventListener('click', function(){
    // this is where I code that the ticker function increases
    gameState.ticker = 150;
})

const fastestButton = document.getElementById('fastest');
fastestButton.addEventListener('click', function(){
    // this is where I code that the ticker function increases even more
    gameState.ticker = 100;
})

resetButton.addEventListener('click', function(){
    gameState.gameRunning = false;
    clearInterval(intervalTimer);
    buildInitialState();
    snake.body = [ [10, 5], [10, 6], [10, 7], [10, 8] ];
    snake.nextDirection = [0, 1];
    gameState.score = 0;
    gameState.time = 0;
    gameState.applecounter = 0;
    colorSnake();
    createApple();
    scoreboard.innerText = "";
    timerEl.innerText = "";
    gameOverText.innerText = "";
})

pauseButton.addEventListener('click', function(){
    if (gameState.gameRunning = true){
        gameState.gameRunning = false;
        clearInterval(intervalTimer);
    } else {
        gameState.gameRunning = true; // this should restart play ... 
        intervalTimer = setInterval(startGame, gameState.ticker);; // but it's not
        intervalTimer;
    };
})

window.addEventListener("keydown", function(event){
    let keyPress = event.key;
    if (keyPress == "ArrowUp" || keyPress == "w"){ // move the snake up
        snake.nextDirection = [-1, 0];

    } else if (keyPress == "ArrowDown" || keyPress == "s"){ // move the snake down
        snake.nextDirection = [1, 0];

    } else if (keyPress == "ArrowLeft" || keyPress == "a"){ // move the snake left
        snake.nextDirection = [0, -1];

    } else if (keyPress == "ArrowRight" || keyPress == "d"){ // move the snake right
        snake.nextDirection = [0, 1];

    }
})

function gameOver() {

    gameState.gameRunning = false;
    clearInterval(intervalTimer);

    // sets our new highscore if there is one to the field / object
    if (gameState.score > gameState.highscore){
        gameState.highscore = gameState.score;

        highScoreEl.innerText = `Highscore: ${gameState.highscore}`;

        console.log(gameState.highscore);
    }
    newGameBoard.after(gameOverText);

    gameOverText.innerText = `Good game! Your final score was ${gameState.score}, you ate ${gameState.applecounter} apples, and you survived for ${Math.trunc(gameState.time / 6)} seconds`

}