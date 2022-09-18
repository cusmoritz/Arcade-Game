
// get our html elements
const siteBody = document.getElementsByName('body');
const gameLayout = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('table'); // playing field
let scoreboard = document.getElementById('score'); // get score elem
let sidebar = document.getElementById('sidebar');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let selector = document.getElementById('select');
let highScore = document.createElement('span');

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 1]
}

let gameState = {
apple: [5, 15],
eaten: false,
snake: snake,
score: 0,
highscore: 0,
time: 0,
applecounter: 0,
gameRunning: false,
size: 20,
ticker: 200,
large: 50,
medium: 30,
small: 20
}

function buildInitialState() {

    gameState.gameRunning = false;

    gameLayout.appendChild(newGameBoard);

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
scoreboard.after(highScore);
colorSnake();
createApple();

// if gamestate.gamerunning = true
    // call render and ticker functions
// if gamestate.gamerunning = false
    // do not call render and ticker functions
    // call game over function

function startGame(){
        if (gameState.gameRunning === true){
            ticker();
            render();
        } else {
            
            gameOver();
            // break;
        }
}

function ticker() {
    console.log('tick');
    moveSnake();
    appleEaten();
    // need to add our wall collision tests to ticker
    collisionWalls();
}

function render() {
    console.log('render');
    colorSnake();
    timer();
}


// ********************* TICKER FUNCTIONS *******************
function moveSnake(){ // updates the snake array with snake.direction
    let newSegment = [(snake.body[snake.body.length - 1][0] + snake.nextDirection[0]), (snake.body[snake.body.length - 1][1] + snake.nextDirection[1])];
    snake.body.push(newSegment);
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
    gameState.apple[1] = newAppleCell
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
    console.log(snakeHead);

    // let snake = {
    //     body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],

    if ((snakeHead[0] < 0) || (snakeHead[0] >= gameState.size)){
        gameOver(); // check to make sure the snake is inside the game board width
        console.log('ded height');
    }

    if ((snakeHead[1] < 0) || (snakeHead[1] >= gameState.size)){
        gameOver(); // check to make sure snake is within height of game
        console.log('ded width');
    }
}


// ************************** RENDER FUNCTIONS ***********************
function colorSnake (){ // styles each snake cell with "snake"
    snake.body.forEach(element => {
        newGameBoard.children[element[0]].children[element[1]].classList = "snake";
    })
}

function drawApple(){ // colors apple from gamestate.apple coordinates
    gameState.apple.forEach(element => {
        newGameBoard.children[gameState.apple[0]].children[gameState.apple[1]].classList = "apple"; // put the random apple on the board
    })
}

function timerScore(){ // if gamestate.time = 20/40/60/80...  score + 1
    if ((gameState.time % 20) == 0){
        gameState.score = gameState.score + 1;
    }
    scoreCounter();
}

function timer(){ // add time to time element
    let timer = document.getElementById('timer');
    timer.innerText = gameState.time;
    gameState.time = gameState.time + 1;
    timerScore();
}

function scoreCounter(){ // add score to score element
    let scorer = document.getElementById('score');
    scorer.innerHTML = `
    Score: 
    <span>
    ${gameState.score}
    </span>`
}


// ************************* EVENT LISTENERS *************
startButton.addEventListener('click', function(){
    gameState.gameRunning = true;
    window.setInterval(startGame, gameState.ticker);
});

selector.addEventListener('click', function(){
    selector.dropodown.style.display = "block";
})

pauseButton.addEventListener('click', function(){
    gameState.gameRunning = false;
    gameState.ticker = null;
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
    alert(`Good game! Your final score was ${gameState.score}, you ate ${gameState.applecounter} apples, and you survived for ${Math.trunc(gameState.time / 6)} seconds`);

    // let highScoreText = highScore.innerText;
    if (gameState.score > gameState.highscore){
        gameState.highscore = gameState.score;

        highScore.innerText = `Highscore: ${gameState.highscore}`;

        console.log(gameState.highscore);
    }

    window.clearInterval(gameState.ticker);
}