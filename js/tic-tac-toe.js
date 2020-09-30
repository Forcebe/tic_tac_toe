//This code has no idea about the rules.

// it connects DOM elements to game logic defined elsewhere

//lots of event handlers

//render updates every part of the DOM with the latest values from our
//gameBoard object.

//board is a holder for the game board when it is detatched to be replaced by a
//victory message
let $board;

//Values hold the tokens for either player as a detached jQuery object
const tokens = [
  '<img src="images/cross.png" alt="" class="token">',
  '<img src="images/circle.png" alt="" class="token">',
  '<img src="images/meteor.png" alt="" class="token">',
  '<img src="images/helmet.png" alt="" class="token">',
  '<img src="images/swords.png" alt="" class="token">',
  '<img src="images/skull.png" alt="" class="token">',
];

let $token1 = tokens[0];
let $token2 = tokens[1];

const local = function() {
  $('#modeSelect').addClass('hidden');
  $('#localMode').removeClass('hidden');
}

const back = function() {
  $('#localMode').addClass('hidden');
  $('#modeSelect').removeClass('hidden');
}


const updateSettings = function () {
  const p1Name = $('#p1Name').val();
  const p2Name = $('#p2Name').val();
  gameBoard.player1 = p1Name;
  gameBoard.player2 = p2Name;
  gameBoard.nextTurn = p1Name;
  console.log(gameBoard.player1);
  console.log(gameBoard.player2);
  $('.menus').addClass('hidden');
  $('.game').removeClass('hidden');
  render();
}

const render = function () {
  if (gameBoard.winner !== '') {
    //disable clicks then display win + reset button
    stopGame()
    if (gameBoard.winner !== 'draw') {
      $('#messages').text(`Congratulations ${gameBoard.winner}, You win!`)
    } else {
      $('#messages').text(`Cat's Game! It's a draw.`)
    }
    $('#reset').removeClass('hidden');
  } else {
    $('#messages').text(`It's ${gameBoard.nextTurn}'s turn`)
    // render box content
  }
  printToken('c1', "#1")
  printToken('c2', "#2")
  printToken('c3', "#3")
  printToken('c4', "#4")
  printToken('c5', "#5")
  printToken('c6', "#6")
  printToken('c7', "#7")
  printToken('c8', "#8")
  printToken('c9', "#9")
};

const printToken = function (c, cell) {
  if (gameBoard[c] === '') {
    $(cell).text('');
  } else if (gameBoard[c] === 'X') {
    $(cell).html($token1);
  } else {
    $(cell).html($token2);
  }
}

const reset = function () {
  $("#win-message").remove();
  $('#reset button').addClass('hidden');
  $('#game-board div').removeClass('X O').addClass('marker')
  gameBoard.c1 = '';
  gameBoard.c2 = '';
  gameBoard.c3 = '';
  gameBoard.c4 = '';
  gameBoard.c5 = '';
  gameBoard.c6 = '';
  gameBoard.c7 = '';
  gameBoard.c8 = '';
  gameBoard.c9 = '';
  gameBoard.winner = '';
  $('#game-board').prepend($board);
  startGame();
  render()
}

const startGame = function () {
  $('#1').on('click', function () {
    gameBoard.play('c1');
    gameBoard.winCheck();
    $('#1').removeClass('marker').addClass(`${gameBoard.c1}`);

    render();
  })
  $('#2').on('click', function () {
    gameBoard.play('c2');
    gameBoard.winCheck();
    $('#2').removeClass('marker').addClass(`${gameBoard.c2}`);
    render();
  })
  $('#3').on('click', function () {
    gameBoard.play('c3');
    gameBoard.winCheck();
    $('#3').removeClass('marker').addClass(`${gameBoard.c3}`);
    render();
  })
  $('#4').on('click', function () {
    gameBoard.play('c4');
    gameBoard.winCheck();
    $('#4').removeClass('marker').addClass(`${gameBoard.c4}`);
    render();
  })
  $('#5').on('click', function () {
    gameBoard.play('c5');
    gameBoard.winCheck();
    $('#5').removeClass('marker').addClass(`${gameBoard.c5}`);
    render();
  })
  $('#6').on('click', function () {
    gameBoard.play('c6');
    gameBoard.winCheck();
    $('#6').removeClass('marker').addClass(`${gameBoard.c6}`);
    render();
  })
  $('#7').on('click', function () {
    gameBoard.play('c7');
    gameBoard.winCheck();
    $('#7').removeClass('marker').addClass(`${gameBoard.c7}`);
    render();
  })

  $('#8').on('click', function () {
    gameBoard.play('c8');
    gameBoard.winCheck();
    $('#8').removeClass('marker').addClass(`${gameBoard.c8}`);
    render();
  })

  $('#9').on('click', function () {
    gameBoard.play('c9');
    gameBoard.winCheck();
    $('#9').removeClass('marker').addClass(`${gameBoard.c9}`);
    render();
  })
}

const stopGame = function () {
  $('#1').off('click');
  $('#2').off('click');
  $('#3').off('click');
  $('#4').off('click');
  $('#5').off('click');
  $('#6').off('click');
  $('#7').off('click');
  $('#8').off('click');
  $('#9').off('click');
}

let token1I = 1;
let token2I = 2;
const pickToken1 = function (dir) {
  console.log(token1I)
  if (dir === 'right') {
    if (token1I < tokens.length) {
      $token1 = tokens[token1I];
      token1I ++
    } else {
    token1I = 0
    $token1 = tokens[token1I];
    token1I ++
    }
  } else {
    if (token1I > 0) {
      $token1 = tokens[token1I];
      token1I --
    } else {
      token1I = tokens.length;
      $token1 = tokens[token1I];
      token1I --
    }
    //this needs bugfixing!!
  };
  console.log(token1I)
  $(".menus #p1 img").remove();
  $(".menus #p1").append($token1)
};

$(document).ready(function () {

  startGame();
  render();

  $('#local').on('click', function() {
    local();
  })

  $('#back').on('click', function() {
    back();
  })

  $('#go').on('click', function() {
    updateSettings();
    reset();
  })

  $('#reset').on('click', function() {
    reset();
  })

  $('#p1-img-right').on('click', function() {
    pickToken1('right')
  })
  $('#p1-img-left').on('click', function() {
    console.log('click')
    pickToken1('left')
  })

});
