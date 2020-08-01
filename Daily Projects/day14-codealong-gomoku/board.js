class Board {
  constructor(rows, cols) {
    this.cells = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.cells[i] = new Array(cols);
    }
  }

  // Calls fn(row, col, value) for each position on the board  -- where "value"
  // is the name of the player who played that that position; or undefined if the
  // position is not yet played.
  forEach(fn) {
    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[row].length; col++) {
        fn(row, col, this.cells[row][col]);
      }
    }
  }

  // Sets the value of row/col position
  set(row, col, value) {
    this.cells[row][col] = value;
  }

  // Returns the value of row/col position
  get(row, col) {
    return this.cells[row][col];
  }

  // Returns true if the given row/col pair is a valid position on the board.
  exists(row, col) {
    return (
      row >= 0 &&
      row < this.cells.length &&
      col >= 0 &&
      col < this.cells[row].length
    );
  }

  // Returns true if the given row/col position is valid, and contains the 'value'
  is_value(row, col, value) {
    return this.exists(row, col) && this.get(row, col) == value;
  }

  // Counts run length in a single direction, from starting point.
  count_one_way(row, col, d_row, d_col) {
    let value = this.get(row, col);
    let count = 0;
    while (this.is_value(row, col, value)) {
      count++;
      col += d_col;
      row += d_row;
    }
    return count;
  }

  // Counts forward and backwards from given starting point, for single orientation.
  count_bidirectional(row, col, d_row, d_col) {
    return (
      this.count_one_way(row, col, d_row, d_col) +
      this.count_one_way(row, col, -d_row, -d_col) +
      -1
    );
  }

  // Returns the longest run-length, starting from row/col position, for all directions:
  // horizontal, vertical, and the two diagonals.
  longestRunFrom(row, col) {
    return Math.max(
      this.count_bidirectional(row, col, 0, 1),
      this.count_bidirectional(row, col, 1, 0),
      this.count_bidirectional(row, col, 1, 1),
      this.count_bidirectional(row, col, 1, -1)
    );
  }
}

Board.Tests = function(assert) {
  suite("Board", () => {
    test("get and set", () => {
      let b = new Board(6, 7);
      assert.notEqual(b.get(1, 1), "x");
      b.set(3, 4, "x");
      assert.equal(b.get(3, 4), "x");
    });

    test("edges", () => {
      let b = new Board(3, 5);
      assert.isTrue(b.exists(0, 0));
      assert.isTrue(b.exists(0, 4));
      assert.isTrue(b.exists(2, 0));
      assert.isTrue(b.exists(2, 4));
      assert.isFalse(b.exists(-1, 0));
      assert.isFalse(b.exists(0, -1));
      assert.isFalse(b.exists(3, 0));
      assert.isFalse(b.exists(0, 5));
    });

    test("foreach", () => {
      let b = new Board(2, 3);
      let inputs = {
        a: [0, 0],
        b: [0, 1],
        c: [0, 2],
        d: [1, 0],
        e: [1, 1],
        f: [1, 2]
      };
      for (let value in inputs) {
        b.set(inputs[value][0], inputs[value][1], value);
      }
      let outputs = {};
      b.forEach((row, col, value) => {
        outputs[value] = [row, col];
      });
      assert.deepEqual(inputs, outputs);
    });
    
    suite("count_one_way", () => {
      test("count stones to right of point", () => {
        let b = new Board(10, 10);
        b.set(4, 4, "X");
        b.set(4, 5, "X");
        b.set(4, 6, "X");
        assert.equal(3, b.count_one_way(4, 4, 0, 1));
      });

      test("count stones above point", () => {
        let b = new Board(10, 10);
        b.set(4, 4, "X");
        b.set(5, 4, "X");
        b.set(6, 4, "X");
        b.set(7, 4, "X");
        assert.equal(4, b.count_one_way(4, 4, 1, 0));
      });
    });

    suite("bidirectional", () => {
      test("count stones left and right of point", () => {
        let b = new Board(10, 10);
        b.set(4, 4, "X");
        b.set(4, 5, "X");
        b.set(4, 6, "X");
        b.set(4, 7, "X");
        assert.equal(4, b.count_bidirectional(4, 5, 0, 1));
      });
      test("diagonal", () => {
        let b = new Board(10, 10);
        for (let i = 3; i < 8; i++) {
          b.set(i, i, "*");
        }
        assert.equal(b.count_bidirectional(6, 6, 1, 1), 5);
        assert.equal(b.count_bidirectional(6, 6, 1, -1), 1);
      });
    });

    suite("longestRunFrom", () => {
      test("horizontal", () => {
        let b = new Board(10, 10);
        for (let col = 2; col < 9; col++) {
          b.set(5, col, "X");
        }
        for (let row = 4; row < 7; row++) {
          b.set(row, 5, "X");
        }
        assert.equal(b.longestRunFrom(5, 5), 7);
      });
      
      test("vertical", () => {
        let b = new Board(10, 10);
        for (let row = 3; row < 7; row++) {
          b.set(row, 5, "X");
        }
        assert.equal(b.longestRunFrom(5, 5), 4);
      });

      test("dialogal+1", () => {
        let b = new Board(10, 10);
        for (let i = 2; i < 9; i++) {
          b.set(i, i, "X");
        }
        assert.equal(b.longestRunFrom(5, 5), 7);
      });

      test("dialogal-1", () => {
        let b = new Board(10, 10);
        for (let i = 2; i < 9; i++) {
          b.set(i, 10 - i, "X");
        }
        assert.equal(b.longestRunFrom(5, 5), 7);
      });
    });
  });
};