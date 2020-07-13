class Timebar {
  constructor(game) {
    this.game = game;
    // this.timer = 60;
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

  loop() {
    this.paint();

    setTimeout(() => {
      this.loop();
    }, this.timer);
  }
}
