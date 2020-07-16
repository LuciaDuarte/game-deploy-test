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

    const green = '#5EA170';
    const yellow = '#F8E919';
    const red = '#EA4335';

    this.i++;

    if (this.i >= 20 && this.i < 160) {
      context.fillStyle = green;
    } else if (this.i >= 160 && this.i < 320) {
      context.fillStyle = yellow;
    } else {
      runningOutOfTime.play();
      context.fillStyle = red;
    }

    context.fillRect(650, this.i, 30, 480);

    context.restore();
  }

  stopGame() {
    if (this.i > 500) {
      runningOutOfTime.pause();
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
