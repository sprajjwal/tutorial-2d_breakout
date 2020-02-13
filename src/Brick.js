const Sprite = require('./Sprite');

class Brick extends Sprite {
  constructor(x, y, color = 'blue') {
    super(x, y, color);
    this.status = 1;
  }

  // render(ctx) {

// }
}

module.exports = Brick;
