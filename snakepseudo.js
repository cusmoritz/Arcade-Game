// build the initial state
    // game board (20 x 20)
    // snake at snake.body
    // apple at random location

// every tick
    // move snake head 1 direction
        // check to see if the head of the snake hit the body
            // if it did, end game
        // check to see if the head of the snake hit a wall
            // if it did, end game
        // remove tail of snake
    // check to see if the apple was eaten
        // if it was, add 5 points to score
        // if it wasn't, do nothing
    
    // call render

// in render:
    // draw new snake

    // if apple was eaten
        // draw a new apple
    
    //



    // render should put in html
    // tick should be updating the object (gamestate)