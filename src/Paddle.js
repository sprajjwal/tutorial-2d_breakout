const Sprite = require('./Sprite');

class Paddle extends Sprite {
  constructor(width = 75, height = 10, canvas) {
    super((canvas.width - width) / 2, canvas.height - height);
    this.paddleHeight = height;
    this.paddleWidth = width;
    this.paddleSpeed = 7;
    // this.x = (canvas.width - this.paddleWidth) / 2;
  }

  draw(ctx) {
    super.render(ctx, this.paddleWidth, this.paddleHeight);
  }
}

module.exports = Paddle