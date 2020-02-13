const Sprite = require('./Sprite');

class Ball extends Sprite {
  constructor(x, y, radius, color = 'gray', speed) {
    super(x, y);
    this.dx = speed;
    this.dy = -speed;
    this.radius = radius;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = Ball;
