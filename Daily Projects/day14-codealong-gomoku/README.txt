This project provides an implementation of games where players take
turns to place markers, on a board-grid, in an attempt to form lines
of N in a row.

(The project's name, "Gomoku", is a game of 5-in-a-row)

visualization.js

* Uses p5 library to draw the board with its pieces; and to take
  mouse-click inputs to place the markers.
* defines the configuration of the game (number of row/cols; and "N")

game.js

* mediates access to the game board.
* defines the turn-taking behavior of the game
* determines when a player has won

board.js

* stores the current state of the game board
* for each move, calculated the run-length of that move


The project uses the "Mocha" and "Chai" libraries as its testing framework.