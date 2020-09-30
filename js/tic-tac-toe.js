//This code has no idea about the rules.

// it connects DOM elements to game logic defined elsewhere

//lots of event handlers

//render updates every part of the DOM with the latest values from our
//gameBoard object.

//board is a holder for the game board when it is detatched to be replaced by a
//victory message
let $board;

//Values hold the tokens for either player as a detached jQuery object
let $tokenX = '<img src="images/cross.png" alt="" class="token">'
let $tokenO = '<img src="images/circle.png" alt="" class="token">'

const render = function () {
  if (gameBoard.winner !== '') {
    //disable clicks then display win + reset button
    stopGame()
    if (gameBoard.winner !== 'draw') {
      $('#messages').text(`Congratulations ${gameBoard.winner}. You win!`)
    } else {
      $('#messages').text(`Cat's Game! It's a draw.`)
    }
    $('button').removeClass('hidden');
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
    $(cell).html($tokenX);
  } else {
    $(cell).html($tokenO);
  }
}

const reset = function () {
  $("#win-message").remove();
  $('button').addClass('hidden');
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

$(document).ready(function () {
  startGame();
  render();
  //Event handlers for the game board squares:
  //play the value into the gameBoard key for the square
  //check if there is a winner
  //render to the screen

  $('button').on('click', function() {
    reset();
  })
});

const startGame = function () {
  $('#1').on('click', function () {
    $('#1').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c1');
    gameBoard.winCheck();
    render();
  })
  $('#2').on('click', function () {
    $('#2').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c2');
    gameBoard.winCheck();
    render();
  })
  $('#3').on('click', function () {
    $('#3').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c3');
    gameBoard.winCheck();
    render();
  })
  $('#4').on('click', function () {
    $('#4').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c4');
    gameBoard.winCheck();
    render();
  })
  $('#5').on('click', function () {
    $('#5').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c5');
    gameBoard.winCheck();
    render();
  })
  $('#6').on('click', function () {
    $('#6').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c6');
    gameBoard.winCheck();
    render();
  })
  $('#7').on('click', function () {
    $('#7').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c7');
    gameBoard.winCheck();
    render();
  })
  $('#8').on('click', function () {
    $('#8').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c8');
    gameBoard.winCheck();
    render();
  })
  $('#9').on('click', function () {
    $('#9').removeClass('marker').addClass(`${gameBoard.nextTurn}`);
    gameBoard.play('c9');
    gameBoard.winCheck();
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
