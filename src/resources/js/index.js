(function($) {
  const itemData = ['rock', 'scissors', 'paper'];
  const $btnPlayer =  $('.btn_item');
  const $btnStart = $('.btn_start');
  const $btnResetScore = $('.btn_reset');
  const $victoryPanel = $('.victory .txt_score');
  const $defeatPanel = $('.defeat .txt_score');
  const $drawPanel = $('.draw .txt_score');

  let victory = 0;
  let defeat = 0;
  let draw = 0;

  gameInit();

  function gameInit() {
    $btnStart.css('background', '#fff');
    $btnStart.css('color', '#000');
    $btnPlayer.css('background', '#fff');
    $btnPlayer.css('color', '#000');
    $btnStart.on('click', loadingGame);
    $btnResetScore.on('click', resetScore);
  }

  function loadingGame() {
    $btnStart.css('background', 'blue');
    $btnStart.css('color', '#fff');
    $btnStart.off('click', loadingGame);
    $btnResetScore.off('click', resetScore);
    $btnPlayer.on('click', startGame);
  }

  function resetScore() {
    $btnResetScore.css('background', '#000');
    $btnResetScore.css('color', '#fff');
    $victoryPanel.html(victory = 0);
    $defeatPanel.html(defeat = 0);
    $drawPanel.html(draw = 0);
    setTimeout(() => {
      $btnResetScore.css('background', '#fff');
      $btnResetScore.css('color', '#000');
    }, 100);
  }

  function startGame(event) {
    if (!event) return false;
    $btnPlayer.off('click', startGame);

    const $playerBtn = $(event.currentTarget);
    const playerItem = parseInt($playerBtn.val());

    let itemCounter = 0;
    let intervalTimer = 100;
    let intervalItem;

    $playerBtn.css('background', 'red');
    $playerBtn.css('color', '#fff');

    intervalItem = setInterval(rouletteItems, intervalTimer);
    setTimeout(controllTimer, 3000);

    function rouletteItems(result) {
      const currentItem = result !== undefined ? result : itemCounter % 3;
      let itemImage = './resources/images/' + itemData[currentItem] + '.png';
      $('.item_computer').attr('src', itemImage);
      itemCounter++;
    }

    function controllTimer() {
      clearInterval(intervalItem);
      intervalTimer += 300;
      if (intervalTimer < 1000) {
        intervalItem = setInterval(rouletteItems, intervalTimer);
        setTimeout(controllTimer, 2000);
      } else {
        const computerResultItem = Math.floor(Math.random() * 3);
        rouletteItems(computerResultItem);
        setTimeout(() => checkResult(playerItem, computerResultItem), 100);
        $btnPlayer.off('click');
      }
    }

    function checkResult(player, computer) {
      if (player === computer) {
        alert('무승부!');
        $drawPanel.html(++draw);
      } else if (++player % 3 === computer) {
        alert('승리!');
        $victoryPanel.html(++victory);
      } else {
        alert('패배!');
        $defeatPanel.html(++defeat);
      }
      gameInit();
    }
  }

})(jQuery);
