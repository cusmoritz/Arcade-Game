const siteBody = document.getElementsByName('body');
const gameLayout = document.getElementById('gamePlusScore'); // game field
let newGameBoard = document.createElement('table'); // playing field

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0]
}

let gameState = {
apple: [11, 8],
snake: snake 

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

    buildSnake();

    drawApple();
}

buildInitialState();

function moveSnake(array){

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

    // newSegment.classList = "snake";

    buildSnake();
    removeTail();

    console.log(snake.body);

}

function buildSnake (){ // styles each snake cell with "snake"
    snake.body.forEach(element => {
        newGameBoard.children[element[0]].children[element[1]].classList = "snake";
    })
}

function removeTail(){ // removes "snake" class from first 'snake' array elem.
    let snakeTail = snake.body[0];
    console.log("snakeTail", snakeTail);
    newGameBoard.children[snakeTail[0]].children[snakeTail[1]].classList.remove("snake");
}

    // tick
    // build snake
        // remove background color from tail
        // add background color to head
    // spawn apple (?)


function drawApple() {

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

window.addEventListener("keydown", function(event){
    let keyPress = event.key;
    if (keyPress == "ArrowUp" || keyPress == "w"){ // move the snake up
        // console.log('movin up');
        snake.nextDirection = [-1, 0];
        moveSnake(snake.nextDirection);
        console.log("snake dir", snake.nextDirection);

    } else if (keyPress == "ArrowDown" || keyPress == "s"){ // move the snake down
        // console.log('movin down');
        snake.nextDirection = [1, 0];
        moveSnake(snake.nextDirection);
        console.log("snake dir", snake.nextDirection);

    } else if (keyPress == "ArrowLeft" || keyPress == "a"){ // move the snake left
        // console.log('movin left');
        snake.nextDirection = [0, -1];
        moveSnake(snake.nextDirection);
        console.log("snake dir", snake.nextDirection);

    } else if (keyPress == "ArrowRight" || keyPress == "d"){ // move the snake right
        // console.log('movin right');
        snake.nextDirection = [0, 1];
        moveSnake(snake.nextDirection);
        console.log("snake dir", snake.nextDirection);

    } else {
        return; // we are only looking for the arrow keys here
    }
})