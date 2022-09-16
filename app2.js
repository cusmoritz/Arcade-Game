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

function moveSnake(){

    let direction = [1,0];
    // up = [-1, 0] == key 38
    // down = [1, 0] == key 40
    // right = [0, 1] == key 39
    // left = [-1, 0] == key 37

    let newSegment = [(snake.body[snake.body.length - 1][0] + direction[0]), (snake.body[snake.body.length - 1][1] + direction[1])];
    console.log(newSegment);

    newSegment.classList = "snake";
    
    snake.body.push(newSegment);

    snake.body.shift();

    console.log(snake.body);

    colorSnake();

}

moveSnake();

function colorSnake() {
    snake.body.forEach(element => {
        element.classList = "snake";
    })
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

    // console.log(gameState.apple);
    gameState.apple.forEach(element => {
        newGameBoard.children[gameState.apple[0]].children[gameState.apple[1]].classList = "apple"; // put the random apple on the board
    })
}

newGameBoard.addEventListener("keydown", function(event){
    if (event.key = 38){
        console.log('movin up');
    }
})