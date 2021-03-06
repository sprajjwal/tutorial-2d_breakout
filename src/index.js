/* eslint-disable no-bitwise */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
const difficulty = document.getElementById('difficulty');
let speed = 4;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const Bricks = require('./Bricks');
const Paddle = require('./Paddle');
const Ball = require('./Ball');

let rightPressed = false;
let leftPressed = false;
// let lives = 3;
// let score = 0;
// let gameRunning = false;

class Game {
  constructor(ballRadius, brickRow = 4, brickColumn = 6, ballColor = 'gray', paddleWidth = 75, paddleHeight = 10) {
    this.lives = 3;
    this.score = 0;
    this.gameRunning = false;
    this.bricks = new Bricks(brickRow, brickColumn);
    this.ball = new Ball(canvas.width / 2, canvas.height - paddleHeight - 10, ballRadius, ballColor, speed);
    this.paddle = new Paddle(paddleWidth, paddleHeight, canvas);
  }

  drawScore(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }

  drawLives(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);
  }

  makeFrame(ctx) {
    this.bricks.draw(ctx);
    this.paddle.draw(ctx);
    this.ball.draw(ctx);
    this.drawScore(ctx);
    this.drawLives(ctx);
  }

  moveBallAndPaddle(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.makeFrame(ctx);
    if (rightPressed && this.paddle.x < canvas.width - this.paddle.paddleWidth) {
      this.paddle.x += this.paddle.paddleSpeed;
      this.ball.x += this.paddle.paddleSpeed;
    } else if (leftPressed && this.paddle.x > 0) {
      this.paddle.x -= this.paddle.paddleSpeed;
      this.ball.x -= this.paddle.paddleSpeed;
    }
    this.ball.draw(ctx);

    if (this.gameRunning) {
      return;
    }
    requestAnimationFrame(() => {
      this.moveBallAndPaddle(ctx);
    });
  }
}

const game = new Game(10);


difficulty.addEventListener('change', () => {
  speed *= (difficulty.selectedIndex + 2) / 2;
  game.paddle.paddleSpeed *= (difficulty.selectedIndex + 2) / 2;
  game.ball.dx *= (difficulty.selectedIndex + 1);
  game.ball.dy *= (difficulty.selectedIndex + 1);
});

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    game.paddle.x = relativeX - game.paddle.paddleWidth / 2;
    if (!game.gameRunning) {
      game.ball.x = relativeX;
    }
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

document.addEventListener('mousemove', mouseMoveHandler, false);

function gameOver() {
  for (let c = 0; c < game.bricks.brickColumnCount; c += 1) {
    for (let r = 0; r < game.bricks.brickRowCount; r += 1) {
      if (game.bricks.bricksArray[c][r].status === 1) {
        return false;
      }
    }
  }
  return true;
}

function collisionDetection() {
  for (let c = 0; c < game.bricks.brickColumnCount; c += 1) {
    for (let r = 0; r < game.bricks.brickRowCount; r += 1) {
      const b = game.bricks.bricksArray[c][r];
      if (b.status === 1) {
        // eslint-disable-next-line max-len
        if (game.ball.x > b.x - game.ball.radius && game.ball.x < b.x + game.bricks.brickWidth + game.ball.radius && game.ball.y > b.y - game.ball.radius && game.ball.y < b.y + game.bricks.brickHeight + game.ball.radius) {
          game.ball.dy = -game.ball.dy;
          b.status = 0;
          // eslint-disable-next-line no-bitwise
          if (c % 3 === 0) {
            game.score += 10;
          } else {
            game.score += 1;
          }
          if (gameOver()) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

// setup
game.makeFrame(ctx);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.makeFrame(ctx);
  collisionDetection();

  // eslint-disable-next-line max-len
  if (game.ball.x + game.ball.dx > canvas.width - game.ball.radius || game.ball.x + game.ball.dx < game.ball.radius) {
    game.ball.dx = -game.ball.dx;
  }
  if (game.ball.y + game.ball.dy < game.ball.radius) {
    game.ball.dy = -game.ball.dy;
  } else if (game.ball.y + game.ball.dy > canvas.height - game.ball.radius / 2) {
    // eslint-disable-next-line max-len
    if (game.ball.x > game.paddle.x - game.ball.radius && game.ball.x < game.paddle.x + game.paddle.paddleWidth + game.ball.radius) {
      // eslint-disable-next-line no-cond-assign
      if (game.ball.y -= game.paddle.paddleHeight) {
        game.ball.dy = -game.ball.dy;
      }
    } else {
      game.lives -= 1;
      game.gameRunning = false;
      if (!game.lives) {
        game.drawLives(ctx);
        alert('GAME OVER');
        document.location.reload();
      } else {
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height - 30;
        game.ball.dx = speed;
        game.ball.dy = -speed;
        game.paddle.x = (canvas.width - game.paddle.paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && game.paddle.x < canvas.width - game.paddle.paddleWidth) {
    game.paddle.x += game.paddle.paddleSpeed;
  } else if (leftPressed && game.paddle.x > 0) {
    game.paddle.x -= game.paddle.paddleSpeed;
  }

  game.ball.move();

  if (game.gameRunning) {
    requestAnimationFrame(draw);
  } else {
    // eslint-disable-next-line no-use-before-define
    game.ball.y = canvas.height - game.paddle.paddleHeight - game.ball.radius;
    game.moveBallAndPaddle(ctx);
  }
}

function onClick() {
  if (game.gameRunning === false) {
    game.gameRunning = true;
    draw();
  }
}

// canvas.addEventListener('click', onClick);
document.body.onkeypress = function (e) {
  if (e.keyCode === 32) {
    onClick();
  }
};
