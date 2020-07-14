class Timebar {
  constructor(game) {
    this.game = game;
    this.timer = game.duration;
    this.i = 20; //starting position for timebar
    this.running = true;
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
      if (this.running) {
        this.game.stopGame();
        this.running = false;
      }
    }
  }

  loop() {
    this.paint();

    if (this.running) {
      setTimeout(() => {
        this.loop();
        this.stopGame();
      }, this.timer);
    }
  }
}
