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

    for (let rowsInTable = 1; rowsInTable < 21; rowsInTable++){
        let newRow = document.createElement('tr');

        for (let cellsInRow = 1; cellsInRow < 21; cellsInRow++){
            let newCell = document.createElement('td');
            
            newRow.appendChild(newCell);
                    
        }
    newGameBoard.appendChild(newRow);
    }

    buildSnake();

    drawApple();
}

buildInitialState();

function buildSnake (){
    snake.body.forEach(element => {
        newGameBoard.children[element[0]].children[element[1]].classList = "snake";

    })
}

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

    let snakeTail = snake.body[0];

    snake.body.push(newSegment);

    snake.body.shift();

    // newSegment.classList = "snake";

    buildSnake();
    removeTail();

    console.log(snake.body);

}

function removeTail(){
    let snakeTail = snake.body[0];
    console.log("snakeTail", snakeTail);
    newGameBoard.children[snakeTail[0]].children[snakeTail[1]].classList.remove("snake");
}

function render(){
    // tick
    // build snake
        // remove background color from tail
        // add background color to head
    // spawn apple (?)

}

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

    // console.log(gameState.apple);
    gameState.apple.forEach(element => {
        newGameBoard.children[gameState.apple[0]].children[gameState.apple[1]].classList = "apple"; // put the random apple on the board
    })

    // would this work?
        // let squares = document.querySelectorAll("newgameBoard td");
        // randomApple(squares);
}

window.addEventListener("keydown", function(event){
    let keyPress = event.key;
    if (keyPress == "ArrowUp"){ // move the snake up
        console.log('movin up');
        moveSnake([-1, 0]);

    } else if (keyPress == "ArrowDown"){ // move the snake down
        console.log('movin down');
        moveSnake([1, 0]);

    } else if (keyPress == "ArrowLeft"){ // move the snake left
        console.log('movin left');
        moveSnake([0, -1]);

    } else if (keyPress == "ArrowRight"){ // move the snake right
        console.log('movin right');
        moveSnake([0, 1]);

    } else {
        return; // we are only looking for the arrow keys here
    }
})