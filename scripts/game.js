const endAudio = new Audio('/sounds/482783__mattiagiovanetti__ninja-tune.wav');
const runningOutOfTime = new Audio(
  '/sounds/487726__matrixxx__ticking-timer-30-sec.wav'
);

class Game {
  constructor(canvas) {
    this.gameStarted = false;
    this.canvas = canvas;
    this.duration = 0;
    this.context = canvas.getContext('2d');

    this.player = new Player(this);

    this.scoreboard = new Scoreboard(this);
  }

  runLogic() {
    this.player.runLogic();
    this.scoreboard.runLogic();
    this.timebar.runLogic();
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
    this.scoreboard.paint();
    this.timebar.paint();
  }

  restart() {
    this.player.restart();
    this.gameStarted = false;
  }

  stopGame() {
    const canvasElement = document.getElementById('game');
    const endMenu = document.getElementById('end-game');

    endMenu.style.display = 'flex';
    canvasElement.style.display = 'none';

    this.gameStarted = false;

    endAudio.play();

    //display words in the end
    const typedWordsArray = this.player.typedWords;

    const typedWordsDiv = document.getElementById('typed-words');

    for (let word of typedWordsArray) {
      const wordElement = document.createElement('p');
      typedWordsDiv.appendChild(wordElement);
      let description = '';
      description += word;
      wordElement.innerText = description;
    }

    const score = `Best Score: ${this.player.bestScore()}`;
    const currentScore = `Your Score: ${this.player.score}`;

    const scoreElement = document.getElementById('best-score');
    scoreElement.innerText = score;

    const currentScoreElement = document.getElementById('current-score');
    currentScoreElement.innerText = currentScore;
  }

  loop() {
    if (this.gameStarted) {
      this.timebar = new Timebar(this);
    }

    // Run logic
    this.runLogic();

    // Clean
    this.clean();

    // Paint
    this.paint();
  }
}
