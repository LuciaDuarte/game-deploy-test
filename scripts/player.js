class Player {
  constructor(game) {
    this.game = game;
    this.word = this.randomWords();
    this.input = '';
    this.score = 0;

    this.checkInputWord();
  }

  randomWords() {
    const tenLetterWords = [
      'washington',
      'characters',
      'blackboard',
      'gymnastics',
      'ubiquitous'
    ];

    const generateRandomIndex = Math.floor(
      Math.random() * tenLetterWords.length
    );
    const generateRandomWord = tenLetterWords[generateRandomIndex];
    return generateRandomWord;
  }

  checkInputWord() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      const keyCode = event.keyCode;
      if (keyCode >= 65 && keyCode <= 90) {
        this.input += key;
      }
      if (keyCode === 8) {
        this.input = this.input
          .split('')
          .splice(0, this.input.length - 1)
          .join('');
      }
      //enter is pressed
      if (keyCode === 13) {
        if (this.input === this.word) {
          this.score++;
          this.game.scoreboard.runLogic();
          this.word = this.randomWords();
          this.input = '';
        }
      }

      // paint the input
      this.runLogic();
    });
  }

  clean() {
    const context = this.game.context;
    context.clearRect(0, 0, 600, 500);
  }

  paint() {
    const context = this.game.context;
    const word = this.word;
    const input = this.input;

    //paint random word
    context.save();

    context.fillStyle = 'black';
    context.font = '36px sans-serif';

    context.fillText(word, 250, 200);

    context.restore();

    //paint input
    context.save();

    context.fillStyle = 'black';
    context.font = '36px sans-serif';
    context.fillText(input, 250, 400);

    context.restore();
  }

  runLogic() {
    this.clean();
    this.paint();
    this.game.scoreboard.paint();
  }
}
