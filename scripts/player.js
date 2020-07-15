class Player {
  constructor(game) {
    this.game = game;
    this.word = '';
    this.input = '';
    this.score = 0;
    this.arrayOfWords = tenLetterWords;

    this.typedWords = [];

    this.randomWords();
    this.checkInputWord();
  }

  randomWords() {
    if (this.arrayOfWords.length > 0) {
      const generateRandomIndex = Math.floor(
        Math.random() * this.arrayOfWords.length
      );
      const generateRandomWord = this.arrayOfWords[generateRandomIndex];
      this.word = generateRandomWord;

      this.arrayOfWords.splice(generateRandomIndex, 1);
    } else {
      this.word = 'You won';
    }
  }

  checkInputWord() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      const keyCode = event.keyCode;
      if (keyCode >= 65 && keyCode <= 90 && this.input.length < 10) {
        this.input += key;
        this.runLogic();
      } else {
        this.wrongWord();
      }
      //backspace is pressed
      if (keyCode === 8) {
        this.input = this.input
          .split('')
          .splice(0, this.input.length - 1)
          .join('');
        this.runLogic();
      }
      //enter is pressed
      if (keyCode === 13) {
        if (this.input === this.word) {
          this.score++;
          this.typedWords.push(this.word);
          this.randomWords();
          this.input = '';
          this.runLogic();
        } else {
          this.wrongWord();
        }
      }
      this.paintInput();
    });
  }

  wrongWord() {
    const context = this.game.context;

    context.save();

    context.fillStyle = 'red';
    context.fillRect(150, 360, 400, 50);

    context.restore();
  }

  clean() {
    const context = this.game.context;
    context.clearRect(0, 0, 600, 500);
  }

  paintInput() {
    const context = this.game.context;
    const input = this.input;

    context.save();

    context.fillStyle = 'black';
    context.font = '36px Courier New';
    context.fillText(input, 250, 400);

    context.restore();
  }

  paint() {
    const context = this.game.context;
    const word = this.word;

    //paint random word
    context.save();

    context.fillStyle = 'black';
    context.font = '46px Courier New';

    context.fillText(word, 210, 200);

    context.restore();

    //paint input rectangle
    context.save();

    context.fillStyle = 'white';
    context.fillRect(150, 360, 400, 50);

    context.restore();
  }

  runLogic() {
    this.clean();
    this.paint();
    this.game.scoreboard.runLogic();
  }
}
