const siteBody = document.getElementsByName('body');
const gameLayout = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('table'); // playing field
let scoreboard = document.getElementById('score'); // get score elem
let sidebar = document.getElementById('sidebar');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 1]
}

let gameState = {
apple: [11, 8],
eaten: false,
snake: snake,
score: 0,
time: 0,
applecounter: 0,
gameRunning: startGame(false),
size: 20,
}

// let ticker = window.setInterval(tick, 200);

function startGame(boolean) {
    if (boolean === true){ // if we click start, the tick function begins
        window.setInterval(tick, 200);
    } else { // if we click pause, the tick function should stop running
        window.clearInterval(); // we will come back to this
    }
}

function tick() {
    collisionWalls();
    moveSnake(snake.nextDirection);
    appleEaten();
    gameState.time = gameState.time + 1;
    // console.log(gameState.time);
    timerScore();
    timer();
    scoreCounter();
}

startButton.addEventListener('click', function(){
    startGame(true);
});

pauseButton.addEventListener('click', function(){
    startGame(false);
    gameOver();
})

function buildInitialState() {

    // console.log(sidebar);

    // let startButton = document.createElement('button');
    // console.log(startButton);
    // startButton.innerText = "start";
    // sidebar.appendChild("startButton");

    gameLayout.appendChild(newGameBoard);

    // create 20 rows with 20 cells each

    for (let rowsInTable = 0; rowsInTable < gameState.size; rowsInTable++){
        let newRow = document.createElement('tr');

        for (let cellsInRow = 0; cellsInRow < gameState.size; cellsInRow++){
            let newCell = document.createElement('td');
            
            newRow.appendChild(newCell);
                    
        }
    newGameBoard.appendChild(newRow);
    }

    colorSnake();

    drawApple();

}

buildInitialState();

// fucntion for timing
    // tick
    // build snake
        // every second we want to continue to move the snake
            // (moving the snake redraws the snake body and eliminates the tail)
            // cant move the snake rn because there is no input array 
            // every 1000 ticks increment score by 1
    // spawn apple (?)


function moveSnake(array){

    // gameState.nextDirection = array;

    // we need to use array[num, num]
    // up = [-1, 0] == key 38
    // down = [1, 0] == key 40
    // right = [0, 1] == key 39
    // left = [-1, 0] == key 37

    let newSegment = [(snake.body[snake.body.length - 1][0] + array[0]), (snake.body[snake.body.length - 1][1] + array[1])];
    // console.log(newSegment);

    // let snakeTail = snake.body.shift();
    // snakeTail.classList.remove("snake");

    snake.body.push(newSegment);

    snake.body.shift();

    colorSnake();

    // check if the apple was eaten after each move
    // appleEaten();
}

function colorSnake (){ // styles each snake cell with "snake"
    snake.body.forEach(element => {
        newGameBoard.children[element[0]].children[element[1]].classList = "snake";
    })

    removeTail();
}

function removeTail(){ // removes "snake" class from first 'snake' array elem.
    let snakeTail = snake.body[0];
    // console.log("snakeTail", snakeTail);
    newGameBoard.children[snakeTail[0]].children[snakeTail[1]].classList.remove("snake");
}

function drawApple() {

    gameState.eaten = false;

    //random apple row and cell
    let randomRow = Math.floor(Math.random() * newGameBoard.children.length);
    let newAppleCell = Math.floor(Math.random() * newGameBoard.children[0].children.length);

    // put random row and cell in apple array
    gameState.apple[0] = randomRow;
    gameState.apple[1] = newAppleCell

    // we can use these to check if the apple has been eaten =>
        // if snake.body[snake.body.length - 1][0] = randomRow && snake.body[snake.body.length - 1][1] = newAppleCell
            // then respawn apple
            // else return

    // check to see if the apple spawns in the body of the snake
        // we could use a loop to fire through every x and y  of the snake body
        // this would be dynamic as our snake could get bigger and still work
        // or we could make it not spawn in the snake in the first place?

    


    gameState.apple.forEach(element => {
        newGameBoard.children[gameState.apple[0]].children[gameState.apple[1]].classList = "apple"; // put the random apple on the board
    })
    // would this work?
        // let squares = document.querySelectorAll("newgameBoard td");
        // randomApple(squares);
}

function appleEaten(){
    // this checks if the head of our snake == the apple coordinates
    if (snake.body[snake.body.length - 1][0] == gameState.apple[0] && snake.body[snake.body.length - 1][1] == gameState.apple[1]) {

        gameState.eaten = true;
        gameState.applecounter = gameState.applecounter + 1;

        // and adds 5 to the score if we eat an apple
        gameState.score = gameState.score + 5;

        // console.log('score', gameState.score);

        addTail();

        drawApple();

        // console.log(snake.body.length);

        // we also need to make the snake array 1 cell longer
            // push current coordinates of snake tail into snake.body array
        // let newSegment = [newGameBoard.children[snake.body[0][0]].value, newGameBoard.children[snake.body[0]].children[snake.body[1]]];
        // console.log(newSegment);

        // let newTail = snake.body.length + 1;
        // snake.body.newTail.push();

    } else {
        // gameState.eaten = false;
        return;
    }
}


window.addEventListener("keydown", function(event){
    let keyPress = event.key;
    if (keyPress == "ArrowUp" || keyPress == "w"){ // move the snake up
        // console.log('movin up');
        snake.nextDirection = [-1, 0];
        // moveSnake(snake.nextDirection);
        // console.log("snake dir", snake.nextDirection);

    } else if (keyPress == "ArrowDown" || keyPress == "s"){ // move the snake down
        // console.log('movin down');
        snake.nextDirection = [1, 0];
        // moveSnake(snake.nextDirection);
        // console.log("snake dir", snake.nextDirection);

    } else if (keyPress == "ArrowLeft" || keyPress == "a"){ // move the snake left
        // console.log('movin left');
        snake.nextDirection = [0, -1];
        // moveSnake(snake.nextDirection);
        // console.log("snake dir", snake.nextDirection);

    } else if (keyPress == "ArrowRight" || keyPress == "d"){ // move the snake right
        // console.log('movin right');
        snake.nextDirection = [0, 1];
        // moveSnake(snake.nextDirection);
        // console.log("snake dir", snake.nextDirection);

    } else {
        return; // we are only looking for the arrow keys here
    }
})

// if gamestate.time = 20/40/60/80... increment score by 1
function timerScore(){
    if ((gameState.time % 20) == 0){
        gameState.score = gameState.score + 1;
    } else {
        return;
    }
}

// add time to time element
function timer(){
    let timer = document.getElementById('timer');
    timer.innerText = gameState.time;
}

// add score to score element
function scoreCounter(){
    let scorer = document.getElementById('score');
    scorer.innerHTML = `
    Score: 
    <span>
    ${gameState.score}
    </span>`
}

function addTail(){
    snake.body.unshift(snake.body[0]);
}

function gameOver() {
    alert(`Good game! Your final score was ${gameState.score}, you ate ${gameState.applecounter} apples, and you survived for ${Math.trunc(gameState.time / 6)} seconds`);

    startGame(false);
}

function collisionWalls() {
    // if snake head array coord = rest of snake array
        // gameOver()
    // else
        // return
    let snakeHead = (snake.body[snake.body.length - 1]);
    console.log(snakeHead);
    // let snakeHead0 = snakeHead[0];
    // let snakeHead1 = snakeHead[1];
    // snake.body.forEach(element =>


    // console.log(lastRow);
    // check the snakehead coordinates ,
        // if they go beyond the bounds of the game board
            // game over
        // else
            // return

    // let snake = {
    //     body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],

    if ((snakeHead[0] < 0) || (snakeHead[0] > gameState.size)){
        gameOver(); // check to make sure the snake is inside the game board width
        console.log('ded height');
    } else {
        return;
    }

    if ((snakeHead[1] < 0) || (snakeHead[1] > gameState.size)){
        gameOver(); // check to make sure snake is within height of game
        console.log('ded width');
    } else {
        return;
    }
}

// function collisionApple(){
    // for (let i = 0; i < snake.body.length; i++){
    //     if (snakeHead[0] === snake.body[i][0] && snakeHead[1] === snake.body[i][1])
    //         gameOver();
    //         console.log('collision at ', snake.body[i]);
    //     } else {
    //         // console.log('snake body i', snake.body[i]);
    //         // console.log('snakehead 0 ', snakeHead[0]);
    //         // console.log('snakehead 1 ', snakeHead[1]);
    //         return;
    //     }
    // }
// }