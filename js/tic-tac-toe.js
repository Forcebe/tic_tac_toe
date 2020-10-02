//This code has no idea about the rules.

// it connects DOM elements to game logic defined elsewhere

//lots of event handlers

//Array of tokens available for selection stored as HTML strings
const tokens = [
  '<img src="images/cross.png" alt="" class="token">',
  '<img src="images/circle.png" alt="" class="token">',
  '<img src="images/meteor.png" alt="" class="token">',
  '<img src="images/helmet.png" alt="" class="token">',
  '<img src="images/swords.png" alt="" class="token">',
  '<img src="images/skull.png" alt="" class="token">',
];

//Holds the selected token for each player with a default value
let $token1 = tokens[0];
let $token2 = tokens[1];
let $tokenSp = tokens[0];

// holds the game mode
let mode;

//hides the mode select menu and displays the local mode menu
const local = function() {
  $('#mode-select').addClass('hidden');
  $('#local-mode').removeClass('hidden');
}

//hides the mode-select menu and displays the singleplayer menu
const single = function() {
  $('#mode-select').addClass('hidden');
  $('#singleplayer').removeClass('hidden');
}

//Hides all other scren states, stops game and returns to mode select menu.
//resets all scores
const home = function() {
  $('#local-mode').addClass('hidden');
  $('#singleplayer').addClass('hidden');
  $('.game').addClass('hidden')
  $('#mode-select').removeClass('hidden');
  $('.menus').removeClass('hidden');
  gameBoard.winner = '';
  gameBoard.player1.score = 0;
  gameBoard.player2.score = 0;
  stopGame();
}
//iterators for token selectors
let token1I = 0;
let token2I = 1;

//takes a direction from which button was clicked
const pickToken1 = function (dir) {
  if (dir === 'right') {
    //going right, select the next token
    if (token1I < tokens.length -1 ) {
      token1I ++
      $token1 = tokens[token1I];
    //when you run out of tokens, go back to start
    } else {
    token1I = 0
    $token1 = tokens[token1I];
    }
  } else if (dir === 'left') {
    //going left, select the previous token
    if (token1I > 0) {
      token1I --
      $token1 = tokens[token1I];
    //when you go back from the first token, go to end
    } else {
      token1I = tokens.length -1;
      $token1 = tokens[token1I];
    }
  };
  //display the selected token on screen
  $(".menus #p1 img").remove();
  $(".menus #p1").append($token1)
};

//takes a direction from which button was clicked
const pickToken2 = function (dir) {
  if (dir === 'right') {
    //going right, select the next token
    if (token2I < tokens.length -1 ) {
      token2I ++
      $token2 = tokens[token2I];
    //when you run out of tokens, go back to start
    } else {
    token2I = 0
    $token2 = tokens[token2I];
    }
  } else if (dir === 'left') {
    //going left, select the previous token
    if (token2I > 0) {
      token2I --
      $token2 = tokens[token2I];
    //when you go back from the first token, go to end
    } else {
      token2I = tokens.length -1;
      $token2 = tokens[token2I];
    }
  };
  //display the selected token on screen
  $(".menus #p2 img").remove();
  $(".menus #p2").append($token2);
};

// gets custom entered names and sets them in gameLogic.js, sets p1 to go next
// hides menus and reveals game board, sets scores to 0, mode to local and
// runs render.
const startLocal = function () {
  console.log('startLocal')
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


// generates a number between 0 and the length of the tokens array to generate
// a random token for the CPU player
function randomToken() {
  return Math.floor(Math.random() * Math.floor(tokens.length));
}

//iterator for single player token selector
let tokenSpI = 0;

const pickTokenSp = function (dir) {
  if (dir === 'right') {
    //going right, select next token
    if (tokenSpI < tokens.length -1 ) {
      tokenSpI ++
      $tokenSp = tokens[tokenSpI];
    //when you run out go back to start
    } else {
    tokenSpI = 0
    $tokenSp = tokens[tokenSpI];
    }
  } else if (dir === 'left') {
    //going left, select previous token
    if (tokenSpI > 0) {
      tokenSpI --
      $tokenSp = tokens[tokenSpI];
    //if you try to go back from the first token, go to the last token
    } else {
      tokenSpI = tokens.length -1;
      $tokenSp = tokens[tokenSpI];
    }
  };
  //display selected token on scren
  $(".menus #sp img").remove();
  $(".menus #sp").append($tokenSp);

};

// Starts a single player game. Gets p1 name and sets p2 name to 'Computer'.
// Sets p1 token to the selected token, grabs a random token for the computer.
// Sets p1 to have first turn, hides menus and shows game, zeros scores and
// winner, sets mode to single, and runs render
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
//render updates every part of the DOM with the latest values from our
//gameBoard object. It also displays victory/tie messages & scores
const render = function () {
  if (gameBoard.winner !== '') {
    //if there is a winner, update score, stop the game and...
    gameBoard.scoreUpdate()
    stopGame();
    //check for a draw, if not, congratulate the winner
    if (gameBoard.winner !== 'draw') {
      $('#messages').text(`Congratulations ${gameBoard.winner}, You win!`)
    } else {
      //or print a draw message
      $('#messages').text(`Cat's Game! It's a draw.`)
    }
    //unhide the reset and go back buttons
    $('#reset, #menu-back').removeClass('hidden');
  //if there are no winners:
  } else {
    //displau next turn
    $('#messages').text(`It's ${gameBoard.nextTurn}'s turn`)
  }
  //update p1 score
  $('#p1-score p').text(
    `${gameBoard.player1.name}: ${gameBoard.player1.score} wins`
  )
  //update p2 score
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

// if gameLogic cell is empty, leave it empty. if not, add appropriate player
//token.
const printToken = function (c, cell) {
  if (gameBoard[c] === '') {
    $(cell).text('');
  } else if (gameBoard[c] === 'X') {
    $(cell).html($token1);
  } else {
    $(cell).html($token2);
  }
}

//Resets the game setting gameLogic cells & winner to empty, hiding  buttons,
//starting game and rendering
const reset = function () {
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
  startGame();
  render()
}

// holds click event handlers for each game mode
const startGame = function () {
  if (mode === 'local') {
    // for each cell on screen, watch for click, play a token, check win and add
    //appropriate class then render
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
    //for each cell, wait for click, play the AI function, check for a victory
    //add appropriate class to the cells the player and AI played into, render
    $('#1').on('click', function () {
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

//disables event handlers
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
