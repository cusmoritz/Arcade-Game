const siteBody = document.getElementsByName('body');
const gameLayout = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('table'); // playing field
let scoreboard = document.getElementById('score'); // get score elem

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 1]
}

let gameState = {
apple: [11, 8],
eaten: false,
snake: snake,
score: 0,
time: 0
}

// window.setInterval(tick, 200);

function tick() {
    moveSnake(snake.nextDirection);
    appleEaten();
    gameState.time = gameState.time + 1;
    // console.log(gameState.time);
    timerScore();
    timer();
    scoreCounter();
}

function buildInitialState() {
    gameLayout.appendChild(newGameBoard);

    // create 20 rows with 20 cells each

    for (let rowsInTable = 1; rowsInTable < 20; rowsInTable++){
        let newRow = document.createElement('tr');

        for (let cellsInRow = 1; cellsInRow < 20; cellsInRow++){
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
    appleEaten();
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
    let randomRow = Math.ceil(Math.random() * newGameBoard.children.length);
    let newAppleCell = Math.ceil(Math.random() * randomRow);

    // put random row and cell in apple array
    gameState.apple[0] = randomRow;
    gameState.apple[1] = newAppleCell

    // we can use these to check if the apple has been eaten =>
        // if snake.body[snake.body.length - 1][0] = randomRow && snake.body[snake.body.length - 1][1] = newAppleCell
            // then respawn apple
            // else return

    gameState.apple.forEach(element => {
        newGameBoard.children[gameState.apple[0]].children[gameState.apple[1]].classList = "apple"; // put the random apple on the board
    })
    // would this work?
        // let squares = document.querySelectorAll("newgameBoard td");
        // randomApple(squares);
}

function appleEaten(){
    if (snake.body[snake.body.length - 1][0] == gameState.apple[0] && snake.body[snake.body.length - 1][1] == gameState.apple[1]) {
        // this checks if the head of our snake == the apple coordinates
        gameState.score = gameState.score + 10;
        // and adds 10 to the score
        console.log('score', gameState.score);
        gameState.eaten = true;

        drawApple();

        // we also need to make the snake array 1 cell longer
            // push current coordinates of snake tail into snake.body array
        snake.body.push();

    } else {
        // gameState.eaten = false;
        return;
    }

    // // if the apple was eaten, add another segment
    // if (gameState.eaten = true){
    //     // snake.body.push(newSegment);
    //     gameState.eaten = false;
    // } else {
    //     return;
    // }

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

function timer(){
    let timer = document.getElementById('timer');
    timer.innerText = gameState.time;
}

function scoreCounter(){
    let scorer = document.getElementById('score');
    scorer.innerHTML = `
    Score: 
    <span>
    ${gameState.score}
    </span>`
}