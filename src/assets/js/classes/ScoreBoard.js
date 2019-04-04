export default class ScoreBoard {
  constructor() {
    this.template = {
      $victoryPanel: $('.victory .txt_score'),
      $defeatPanel: $('.defeat .txt_score'),
      $drawPanel: $('.draw .txt_score'),
      $btnResetScore: $('.btn_reset'),
    };
  }

  cutEvent() {
    this.template.$btnResetScore.off('click', resetScore);
  }

  resetScore() {
    this.template.$btnResetScore.css({'background': '#000', 'color': '#fff'});
    this.template.$victoryPanel.html(0);
    this.template.$defeatPanel.html(0);
    this.template.$drawPanel.html(0);
    setTimeout(function() {
      this.template.$btnResetScore.css({'background': '#fff', 'color': '#000'});
    }, 100);
  }

  setScore({ draw, win, lose}) {
    this.template.$drawPanel.html(draw);
    this.template.$victoryPanel.html(win);
    this.template.$defeatPanel.html(lose);
  }
};
