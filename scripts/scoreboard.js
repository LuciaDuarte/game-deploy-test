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

    context.font = '32px sans-serif';

    context.fillText('Words: ' + score, 50, 50);

    context.restore();
  }
}
