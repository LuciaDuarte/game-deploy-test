window.addEventListener('load', () => {
  const timeAudio = new Audio('../sounds/select_008.ogg');
  const startAudio = new Audio('../sounds/drop_003.ogg');

  const canvasElement = document.getElementById('game');
  const startMenu = document.getElementById('start-game');
  const endMenu = document.getElementById('end-game');

  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');

  const timerOptions = document.querySelectorAll('input');

  const timerButtons = document.getElementById('time-div');

  const fifteen = timerOptions[0];
  const thirty = timerOptions[1];
  const fortyfive = timerOptions[2];

  const game = new Game(canvasElement);

  startButton.addEventListener('click', () => {
    startAudio.play();
    duration();
  });

  timerButtons.addEventListener('click', () => {
    timeAudio.play();
  });

  const startGame = () => {
    startMenu.style.display = 'none';
    canvasElement.style.display = 'flex';
    game.restart();
  };

  function duration() {
    if (fifteen.checked === true) {
      startGame();
      game.duration = 30;
      game.gameStarted = true;
      game.loop();
    } else if (thirty.checked === true) {
      startGame();
      game.duration = 60;
      game.gameStarted = true;
      game.loop();
    } else if (fortyfive.checked === true) {
      startGame();
      game.duration = 90;
      game.gameStarted = true;
      game.loop();
    }
  }

  restartButton.addEventListener('click', () => {
    endAudio.pause();

    const typedWordsDiv = document.getElementById('typed-words');

    endMenu.style.display = 'none';
    startMenu.style.display = 'flex';
    canvasElement.style.display = 'none';

    function removeAllChildren(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

    removeAllChildren(typedWordsDiv);
  });
});
