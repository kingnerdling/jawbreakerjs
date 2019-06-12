ballRadius = 15;
class Game {
  setup() {
    this.score = 0;
    this.board = new Board();
    this.board.populate(10, 10);
  }

  remove(cell) {
    this.score += this.board.removeBlock(cell);
  }
}
