import ScoreBoard from "./ScoreBoard";
import CoreRSP from "./CoreRSP";

export default class GameBoard {
  constructor() {
    this.game = new CoreRSP();
    this.scoreBoard = new ScoreBoard();
    this.itemData = ['rock', 'scissors', 'paper'];
    this.template = {
      $btnPlayer:  $('.btn_item'),
      $btnStart: $('.btn_start'),
      $computerUI: $('.item_computer'),
    };
    this.design = {
      originalButtonColor : {'background': '#fff', 'color': '#000'},
      loadingButtonColor : {'background': 'blue', 'color': '#fff'},
      startGameButtonColor: {'background': 'red', 'color': '#fff'}
    };

    this.init();
  }
  // ctrl + G
  init() {
    this.itemCounter = 0;
    this.intervalTimer = 100;
    this.intervalItem = null;
    this.template.$btnStart.css(this.design.originalButtonColor);
    this.template.$btnPlayer.css(this.design.originalButtonColor);
    this.bindDOMEvent();
  }

  bindDOMEvent() {
    this.template.$btnStart.one('click', () => this.loadingGame());
  }

  startGame(event) {
    const $playerBtn = $(event.currentTarget);
    const userChoice = Number($playerBtn.val());

    $playerBtn.css(this.design.startGameButtonColor);
    this.game.selectUserChoice = userChoice;
    this.template.$btnPlayer.off('click');
    this.intervalItem = setInterval(() => this.rouletteItems(), this.intervalTimer);
    setTimeout(() => this.controlTimer(), 3000);
  }

  rouletteItems(result) {
    const currentItem = result !== undefined ? result : this.itemCounter % 3;
    const itemImage = './assets/images/' + this.itemData[currentItem] + '.png';
    this.template.$computerUI.attr('src', itemImage);
    this.itemCounter += 1;
  }

  controlTimer() {
    clearInterval(this.intervalItem);
    this.intervalTimer += 300;
    if (this.intervalTimer < 1000) {
      this.intervalItem = setInterval(() => this.rouletteItems(), this.intervalTimer);
      setTimeout(() => this.controlTimer(), 2000);
    } else {
      this.game.setComputerChoice();
      this.rouletteItems(this.game.computerChoice);
      setTimeout(() => this.checkResult(),100);
    }
  }

  checkResult() {
    const { result, score } = this.game.checkWinner();
    this.scoreBoard.setScore(score);
    alert(result);
    this.init();
  }

  loadingGame() {
    this.template.$btnStart.css(this.design.loadingButtonColor);
    this.template.$btnPlayer.on('click', (event) => this.startGame(event));
  }

}
