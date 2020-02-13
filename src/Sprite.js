class Sprite {
  constructor(x, y, color = 'blue') {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  render(ctx, a, b) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, a, b);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = Sprite;
