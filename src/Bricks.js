const Brick = require('./Brick')

class Bricks {
  constructor(row = 4, column = 6) {
    this.brickColumnCount = column;
    this.brickRowCount = row;
    this.brickWidth = 60;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricksArray = [];
    this.setup();
  }

  setup() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricksArray[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        // this.bricksArray[c][r] = { x: brickX, y: brickY, status: 1 };
        let color;
        if ((c + r) % 5 !== 0) {
          color = '#9abdf5';
        } else {
          color = `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;
        }
        this.bricksArray[c][r] = new Brick(brickX, brickY, color);
      }
    }
  }

  draw(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        // eslint-disable-next-line no-bitwise
        if (this.bricksArray[c][r].status === 1) {
          const brick = this.bricksArray[c][r];
          brick.render(ctx, this.brickWidth, this.brickHeight);
        }
      }
    }
  }
}

module.exports = Bricks;