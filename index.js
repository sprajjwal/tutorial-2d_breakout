/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
const difficulty = document.getElementById('difficulty');
let speed = 4;
// let ballColor = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
let paddleSpeed = 7;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

difficulty.addEventListener('change', () => {
  speed *= (difficulty.selectedIndex + 2) / 2;
  paddleSpeed *= (difficulty.selectedIndex + 2) / 2;
  ball.dx *= (difficulty.selectedIndex + 1);
  ball.dy *= (difficulty.selectedIndex + 1);
});

const paddleHeight = 15;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 4;
const brickColumnCount = 6;
const brickWidth = 60;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let lives = 3;
let score = 0;
let gameRunning = false;

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  dx: speed,
  dy: -speed,
  radius: 10,
  move() {
    this.x += this.dx;
    this.y += this.dy;
  },
};

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

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
    paddleX = relativeX - paddleWidth / 2;
    if (!gameRunning) {
      ball.x = relativeX;
    }
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


document.addEventListener('mousemove', mouseMoveHandler, false);

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#9353b5';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  let color = '';
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      // eslint-disable-next-line no-bitwise
      color = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if ((c + r) % 5 !== 0) {
          ctx.fillStyle = '#b87874';
        } else {
          ctx.fillStyle = color;
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function gameOver() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        return false;
      }
    }
  }
  return true;
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        // eslint-disable-next-line max-len
        if (ball.x > b.x - ball.radius && ball.x < b.x + brickWidth + ball.radius && ball.y > b.y - ball.radius && ball.y < b.y + brickHeight + ball.radius) {
          ball.dy = -ball.dy;
          b.status = 0;
          // eslint-disable-next-line no-bitwise
          if (c % 3 === 0) {
            score += 10;
          } else {
            score += 1;
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
drawBricks();
drawPaddle();
drawBall();
drawScore();
drawLives();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius / 2) {
    if (ball.x > paddleX - ball.radius && ball.x < paddleX + paddleWidth + ball.radius) {
      // eslint-disable-next-line no-cond-assign
      if (ball.y -= paddleHeight) {
        ball.dy = -ball.dy;
      }
    } else {
      lives -= 1;
      gameRunning = false;
      if (!lives) {
        drawLives();
        alert('GAME OVER');
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = speed;
        ball.dy = -speed;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }

  ball.move();

  if (gameRunning) {
    requestAnimationFrame(draw);
  } else {
    // eslint-disable-next-line no-use-before-define
    ball.y = canvas.height - paddleHeight - ball.radius;
    moveBallAndPaddle();
  }
}

function moveBallAndPaddle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
    ball.x += paddleSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
    ball.x -= paddleSpeed;
  }
  drawBall();

  if (gameRunning) {
    return;
  }
  requestAnimationFrame(moveBallAndPaddle);
}


function onClick() {
  if (gameRunning === false) {
    gameRunning = true;
    draw();
  }
}

// canvas.addEventListener('click', onClick);
document.body.onkeypress = function (e) {
  if (e.keyCode === 32) {
    onClick();
  }
};
