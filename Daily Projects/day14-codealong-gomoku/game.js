/* globals Board */

class Game {
  constructor(rows, cols, players, threshold) {
    this.board = new Board(rows, cols);
    this.player = 0;
    this.game_over = false;
    this.player_names = players;
    this.threshold = threshold;
  }
  
  // Returns true if the given row/col can be played as a move, given current state.
  moveIsValid(row, col) {
    return !this.game_over &&
      this.board.exists(row, col) &&
      this.board.get(row, col) == null
  }
  
  // The name of the player who's turn it is to move
  currentPlayerName() {
    return this.player_names[this.player]
  }
  
  // Next player
  advanceToNextPlayer() {
    this.player = (this.player + 1) % this.player_names.length
  }
  
  // Returns true if given count is winning
  isWinningCount(count) {
    return count >= this.threshold
  }
  
  // Plays a move; and returns a dict with result of that move
  updateBoardForMove(row, col) {
    let player = this.currentPlayerName();
    this.board.set(row, col, player);
    let count = this.board.longestRunFrom(row, col);
    return {
      player: player,
      count: count,
      is_won: this.isWinningCount(count)
    };
  }
  
  // Places counter for current this.player's move.
  // * Computes the run-length that this moves results in
  // * If the run length is greater than the games threshold, then
  //    the current player wins the game
  //
  // If the game is already over; or the row/col is invalid (or already played)
  // then nothing is changed; and the function returns no result.
  //
  // Otherwise, returns a dict that summarizes the move. This contains:
  // * player -- the name of the player that moved
  // * count -- the max run-length that results from the move
  // * is_won -- true if hte player won the game
  playMove(row, col) {
    if (!this.moveIsValid(row, col)) {
      return;
    }
    
    let result = this.updateBoardForMove(row, col);

    if (result.is_won) {
      this.game_over = true;
    } else {
      this.advanceToNextPlayer();
    }
    
    return result;
  }
}


Game.Tests = function(assert) {
  suite("Game", () => {
    test("initial move is valid", () => {
      let g = new Game(3,3,['X', 'O'], 3);
      assert.isTrue(g.moveIsValid(1,1))
    })
    test("player name; turn taking", () => {
      let g = new Game(3,3,['X', 'O'], 3);
      assert.equal(g.currentPlayerName(), 'X');
      g.advanceToNextPlayer();
      assert.equal(g.currentPlayerName(), 'O');
      g.advanceToNextPlayer();
      assert.equal(g.currentPlayerName(), 'X');
    })
    test("Winning run length", () => {
      let g = new Game(3,3,['X', 'O'], 3);
      assert.isFalse(g.isWinningCount(2))
      assert.isTrue(g.isWinningCount(3))
    })
    test("invalid move is not played", () => {
      let g = new Game(3,3,['X', 'O'], 3);
      assert.isNotOk(g.playMove(9,9));
    })
    test("errors", () => {
      let g = new Game(3,3,['X', 'O'], 3);
      g.playMove(1,1);
      assert.isFalse(g.moveIsValid(1,1), "position already played");
      assert.isFalse(g.moveIsValid(10,10), "out of bounds");
    })
    test("play until game over", () => {
      let g = new Game(3,3,['X', 'O'], 3);
      g.updateBoardForMove = () => { return { is_won: false }};
      assert.equal(g.currentPlayerName(), 'X');
      assert.isOk(g.playMove(0,0));
      assert.equal(g.currentPlayerName(), 'O');
      assert.isOk(g.playMove(0,0));
      assert.equal(g.currentPlayerName(), 'X');
      g.updateBoardForMove = () => { return { is_won: true }};      
      assert.isOk(g.playMove(0,0));
      assert.equal(g.currentPlayerName(), 'X');
      assert.isNotOk(g.playMove(0,0));
    })
    test("run length", () => {
      let g = new Game(3,3, ['X', 'O'], 3);
      console.log(g);
      assert.equal(g.playMove(1,0).count, 1)
      assert.equal(g.playMove(2,0).count, 1)
      assert.equal(g.playMove(1,1).count, 2)
      assert.equal(g.playMove(2,1).count, 2)
      assert.equal(g.playMove(1,2).count, 3)
      assert.isTrue(g.game_over)
    })
  })
}