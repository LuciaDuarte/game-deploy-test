class Timebar {
  constructor(game) {
    this.game = game;
    this.timer = game.duration; //60; //60 -> 30seg
    this.i = 20;
  }

  runLogic() {
    this.loop();
  }

  clean() {
    const context = this.game.context;
    context.clearRect(650, 0, 30, 500);
  }

  paint() {
    const context = this.game.context;

    this.clean();

    context.save();

    context.fillStyle = 'black';

    this.i++;

    context.fillRect(650, this.i, 30, 480);

    context.restore();
  }

  stopGame() {
    if (this.i > 500) {
      this.game.stopGame();
    }
  }

  loop() {
    this.paint();

    setTimeout(() => {
      this.loop();
      this.stopGame();
    }, this.timer);
  }
}
