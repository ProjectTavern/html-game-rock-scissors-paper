export default class GameRSP {
  constructor() {
    this.userChoice = null;
    this.computerChoice = null;
    this.init();
  }

  init() {
    this.score = {
      win: 0,
      draw: 0,
      lose: 0,
    };
  }

  set selectUserChoice(input) {
    this.userChoice = input;
  }

  get selectUserChoice() {
    return this.userChoice;
  }

  setComputerChoice() {
    this.computerChoice = Math.floor(Math.random() * 3);
  }

  checkWinner() {
    let result = {};
    console.log(this.userChoice, this.computerChoice);
    if (this.userChoice === this.computerChoice) {
      result.result = 'draw';
      this.score.draw += 1;
    } else if ((++this.userChoice % 3) === this.computerChoice) {
      result.result = 'win';
      this.score.win += 1;
    } else {
      result.result = 'lose';
      this.score.lose += 1;
    }
    result.score = this.score;
    return result;
  }

}

