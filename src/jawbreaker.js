let game = new Game();

function draw() {
  let canvas = document.getElementById("matrix");

  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.board.cells.forEach(cell => {
      let x = cell.x * ballRadius * 2 + ballRadius;
      let y = cell.y * ballRadius * 2 + ballRadius;
      ctx.fillStyle = cell.colour;
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
      ctx.fill();
    });
    canvas.onclick = onclick;
  }

  let scoreDiv = document.getElementById("score");
  scoreDiv.innerHTML = "Score: " + game.score;

  let gameOverDiv = document.getElementById("canGo");
  gameOverDiv.innerHTML = "CanGo: " + game.board.canGo;
}

function onclick(event) {
  let cell = null;
  for (i = 0; i < game.board.cells.length; i++) {
    if (cellClicked(game.board.cells[i], event.x, event.y)) {
      cell = game.board.cells[i];
      console.log("clicked");
      console.log(cell);

      break;
    }
  }
  if (cell != null) {
    game.remove(cell);
  }
  draw();
}

function cellClicked(cell, mx, my) {
  // this is a circle
  let dx = mx - (cell.x * ballRadius * 2 + ballRadius);
  let dy = my - (cell.y * ballRadius * 2 + ballRadius);
  // math test to see if mouse is inside circle
  if (dx * dx + dy * dy < ballRadius * ballRadius) {
    // yes, mouse is inside this circle
    return true;
  }
}

function initialise() {
  game.setup();
}

initialise();
draw();
