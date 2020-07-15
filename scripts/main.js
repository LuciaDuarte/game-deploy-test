window.addEventListener('load', () => {
  const canvasElement = document.getElementById('game');
  const startMenu = document.getElementById('start-game');
  const endMenu = document.getElementById('end-game');

  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');

  const timerOptions = document.querySelectorAll('input');

  const fifteen = timerOptions[0];
  const thirty = timerOptions[1];
  const fortyfive = timerOptions[2];

  startButton.addEventListener('click', () => {
    duration();
  });

  const startGame = () => {
    startMenu.style.display = 'none';
    canvasElement.style.display = 'flex';
  };

  function duration() {
    if (fifteen.checked === true) {
      startGame();
      const game = new Game(canvasElement, 30);
      game.loop();
    } else if (thirty.checked === true) {
      startGame();
      const game = new Game(canvasElement, 60);
      game.loop();
    } else if (fortyfive.checked === true) {
      startGame();
      const game = new Game(canvasElement, 90);
      game.loop();
    }
  }

  restartButton.addEventListener('click', () => {
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
