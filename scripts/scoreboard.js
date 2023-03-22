class Scoreboard {
  constructor(game) {
    this.game = game;
  }

  runLogic() {
    this.paint();
  }

  paint() {
    const context = this.game.context;
    const score = this.game.player.score;

    context.save();

    context.font = '34px Courier New';

    context.fillText('Words: ' + score, 15, 35);

    context.restore();
  }
}
