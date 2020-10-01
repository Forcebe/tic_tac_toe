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
let $tokenSp = tokens[0];

let mode;

const local = function() {
  $('#modeSelect').addClass('hidden');
  $('#localMode').removeClass('hidden');
}

const single = function() {
  $('#modeSelect').addClass('hidden');
  $('#singleplayer').removeClass('hidden');
}

const home = function() {
  $('#localMode').addClass('hidden');
  $('#singleplayer').addClass('hidden');
  $('.game').addClass('hidden')
  $('#modeSelect').removeClass('hidden');
  $('.menus').removeClass('hidden');
  stopGame();
}


const startLocal = function () {
  const p1Name = $('#p1Name').val();
  const p2Name = $('#p2Name').val();
  gameBoard.player1.name = p1Name;
  gameBoard.player2.name = p2Name;
  gameBoard.nextTurn = p1Name;
  $('.menus').addClass('hidden');
  $('.game').removeClass('hidden');
  gameBoard.player1.score = 0
  gameBoard.player2.score = 0
  mode = 'local'
  render();
}

function randomToken() {
  return Math.floor(Math.random() * Math.floor(tokens.length));
}

const startSingle = function () {
  const p1Name = $('#spName').val();
  const p2Name = 'Computer'
  $token1 = $tokenSp
  $token2 = tokens[randomToken()]
  gameBoard.player1.name = p1Name;
  gameBoard.player2.name = p2Name;
  gameBoard.nextTurn = p1Name;
  $('.menus').addClass('hidden');
  $('.game').removeClass('hidden');
  gameBoard.winner = '';
  gameBoard.player1.score = 0;
  gameBoard.player2.score = 0;
  mode = 'single'
  render();
}

const render = function () {
  if (gameBoard.winner !== '') {
    //disable clicks, then display win + reset button
    gameBoard.scoreUpdate()
    stopGame();
    if (gameBoard.winner !== 'draw') {
      $('#messages').text(`Congratulations ${gameBoard.winner}, You win!`)
    } else {
      $('#messages').text(`Cat's Game! It's a draw.`)
    }
    $('#reset, #menu-back').removeClass('hidden');
  } else {
    $('#messages').text(`It's ${gameBoard.nextTurn}'s turn`)
  }
  $('#p1-score p').text(
    `${gameBoard.player1.name}: ${gameBoard.player1.score} wins`
  )
  $('#p2-score p').text (
    `${gameBoard.player2.name}: ${gameBoard.player2.score} wins`
  )
  // render box content
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
  if (mode === 'local') {
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

  } else if (mode === 'single') {
    $('#1').on('click', function () {
      console.log('click')
      gameBoard.easyAiPlay('c1');
      gameBoard.winCheck();
      $('#1').removeClass('marker').addClass(`${gameBoard.c1}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
    $('#2').on('click', function () {
      gameBoard.easyAiPlay('c2');
      gameBoard.winCheck();
      $('#2').removeClass('marker').addClass(`${gameBoard.c2}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
    $('#3').on('click', function () {
      gameBoard.easyAiPlay('c3');
      gameBoard.winCheck();
      $('#3').removeClass('marker').addClass(`${gameBoard.c3}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
    $('#4').on('click', function () {
      gameBoard.easyAiPlay('c4');
      gameBoard.winCheck();
      $('#4').removeClass('marker').addClass(`${gameBoard.c4}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
    $('#5').on('click', function () {
      gameBoard.easyAiPlay('c5');
      gameBoard.winCheck();
      $('#5').removeClass('marker').addClass(`${gameBoard.c5}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
    $('#6').on('click', function () {
      gameBoard.easyAiPlay('c6');
      gameBoard.winCheck();
      $('#6').removeClass('marker').addClass(`${gameBoard.c6}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
    $('#7').on('click', function () {
      gameBoard.easyAiPlay('c7');
      gameBoard.winCheck();
      $('#7').removeClass('marker').addClass(`${gameBoard.c7}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })

    $('#8').on('click', function () {
      gameBoard.easyAiPlay('c8');
      gameBoard.winCheck();
      $('#8').removeClass('marker').addClass(`${gameBoard.c8}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })

    $('#9').on('click', function () {
      gameBoard.easyAiPlay('c9');
      gameBoard.winCheck();
      $('#9').removeClass('marker').addClass(`${gameBoard.c9}`);
      $('#' + gameBoard.cpuLast)
        .removeClass('marker')
        .addClass(`${gameBoard['c' + gameBoard.cpuLast]}`);
      render();
    })
  }
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

let token1I = 0;
let token2I = 1;
let tokenSpI = 0;

const pickToken1 = function (dir) {
  if (dir === 'right') {
    if (token1I < tokens.length -1 ) {
      token1I ++
      $token1 = tokens[token1I];
    } else {
    token1I = 0
    $token1 = tokens[token1I];
    }

  } else if (dir === 'left') {
    if (token1I > 0) {
      token1I --
      $token1 = tokens[token1I];
    } else {
      token1I = tokens.length -1;
      $token1 = tokens[token1I];
    }
  };
  $(".menus #p1 img").remove();
  $(".menus #p1").append($token1)
};

const pickToken2 = function (dir) {
  if (dir === 'right') {
    if (token2I < tokens.length -1 ) {
      token2I ++
      $token2 = tokens[token2I];
    } else {
    token2I = 0
    $token2 = tokens[token2I];
    }

  } else if (dir === 'left') {
    if (token2I > 0) {
      token2I --
      $token2 = tokens[token2I];
    } else {
      token2I = tokens.length -1;
      $token2 = tokens[token2I];
    }
  };
  $(".menus #p2 img").remove();
  $(".menus #p2").append($token2);
};

const pickTokenSp = function (dir) {
  if (dir === 'right') {
    console.log(tokenSpI)
    if (tokenSpI < tokens.length -1 ) {
      tokenSpI ++
      $tokenSp = tokens[tokenSpI];
    } else {
    tokenSpI = 0
    $tokenSp = tokens[tokenSpI];
    }

  } else if (dir === 'left') {
    if (tokenSpI > 0) {
      tokenSpI --
      $tokenSp = tokens[tokenSpI];
    } else {
      tokenSpI = tokens.length -1;
      $tokenSp = tokens[tokenSpI];
    }
  };
  $(".menus #sp img").remove();
  $(".menus #sp").append($tokenSp);
  console.log(tokenSpI)
};

$(document).ready(function () {
//local multiplayer buttons
  $('#local').on('click', function() {
    local();
  })
  $('#back').on('click', function() {
    home();
  })
  $('#go').on('click', function() {
    startLocal();
    reset();
  })
  $('#p1-img-right').on('click', function() {
    pickToken1('right')
  })
  $('#p1-img-left').on('click', function() {
    pickToken1('left')
  })
  $('#p2-img-right').on('click', function() {
    pickToken2('right')
  })
  $('#p2-img-left').on('click', function() {
    pickToken2('left')
  })

  //singleplayer buttons
  $('#single').on('click', function () {
    single();
  })
  $('#sp-img-right').on('click', function() {
    pickTokenSp('right')
  })
  $('#sp-img-left').on('click', function() {
    pickTokenSp('left')
  })
  $('#back-sp').on('click', function() {
    home();
  })
  $('#go-sp').on('click', function() {
    startSingle();
    reset();
  })
  //game board buttons
  $('#reset').on('click', function() {
    reset();
  })
  $('#menu-back').on('click', function() {
    home();
  })
});
