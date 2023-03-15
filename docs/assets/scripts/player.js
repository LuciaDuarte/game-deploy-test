const correctAudio = new Audio(
  '../sounds/243567__sonictechtonic__airy-whoosh-left-to-right (mp3cut.net) (2).wav'
);
const errorAudio = new Audio('/sounds/error_008.ogg');

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

  restart() {
    this.input = '';
    this.randomWords();
    this.score = 0;
    this.typedWords = [];
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
      this.word = `
      あなたが勝つ`;
    }
  }

  checkInputWord() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      const keyCode = event.keyCode;
      if (keyCode >= 65 && keyCode <= 90 && this.input.length < 10) {
        event.preventDefault();
        this.input += key;
        this.runLogic();
        //backspace is pressed
      } else if (keyCode === 8) {
        event.preventDefault();
        this.input = this.input
          .split('')
          .splice(0, this.input.length - 1)
          .join('');
        this.runLogic();
        //enter is pressed
      } else if (keyCode === 13) {
        event.preventDefault();
        if (this.input === this.word) {
          this.input = '';
          correctAudio.play();
          this.score++;
          this.typedWords.push(this.word);
          this.randomWords();
          this.runLogic();
        } else {
          this.wrongWord();
        }
      } else {
        this.wrongWord();
      }
      this.paintInput();
    });
  }

  wrongWord() {
    errorAudio.play();
    const context = this.game.context;

    context.save();

    context.fillStyle = 'red';
    context.fillRect(175, 340, 350, 60);

    context.restore();
  }

  bestScore() {
    const currentScore = this.score;
    let bestScore = localStorage.getItem('BestScore');
    if (currentScore > bestScore) {
      localStorage.BestScore = currentScore;
    }

    let scoreToPrint = localStorage.getItem('BestScore');

    return scoreToPrint;
  }

  clean() {
    const context = this.game.context;
    context.clearRect(0, 0, 600, 500);
  }

  paintInput() {
    const context = this.game.context;
    let input = this.input;

    context.save();

    context.fillStyle = 'black';
    context.font = '40px Courier New';
    context.fillText(input, 230, 380);

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

    //paint input rectangles

    context.save();

    context.fillStyle = 'black';
    context.fillRect(170, 335, 360, 70);

    context.restore();

    context.save();

    context.fillStyle = 'white';
    context.fillRect(175, 340, 350, 60);

    context.restore();
  }

  runLogic() {
    this.clean();
    this.paint();
    this.game.scoreboard.runLogic();
  }
}
