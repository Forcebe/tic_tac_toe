//This code has no idea about the rules.

// it connects DOM elements to game logic defined elsewhere

//lots of event handlers

//render updates every part of the DOM with the latest values from our
//gameBoard object.

//board is a holder for the game board when it is detatched to be replaced by a
//victory message
let $board;

const render = function () {
  if (gameBoard.winner !== '') {
    //display win + reset button
    $board = $("#game-board table").detach();
    let $winMsg = $('<p id="win-message"></p>');
    $('#whos-turn').addClass("hidden")

    if (gameBoard.winner !== 'draw') {
      $winMsg.text(`Congratulations ${gameBoard.winner}. You win!`)

    } else {
      $winMsg.text(`Cat's Game! It's a draw.`)
    }
    $('#game-board').prepend($winMsg)
    $('button').removeClass('hidden');
  } else {
    $('#whos-turn').text(`It's ${gameBoard.nextTurn}'s turn`)
    // render box content
    $('#1').text(gameBoard.c1);
    $('#2').text(gameBoard.c2);
    $('#3').text(gameBoard.c3);
    $('#4').text(gameBoard.c4);
    $('#5').text(gameBoard.c5);
    $('#6').text(gameBoard.c6);
    $('#7').text(gameBoard.c7);
    $('#8').text(gameBoard.c8);
    $('#9').text(gameBoard.c9);
  }
};

const reset = function () {
  $("#win-message").remove();
  $('#whos-turn').removeClass("hidden");
  $('button').addClass('hidden');
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
  render()
}

$(document).ready(function () {

  render()
  //Event handlers for the game board squares:
  //play the value into the gameBoard key for the square
  //check if there is a winner
  //render to the screen
  $('#1').on('click', function () {
    gameBoard.play('c1');
    gameBoard.winCheck();
    render();
  })
  $('#2').on('click', function () {
    gameBoard.play('c2');
    gameBoard.winCheck();
    render();
  })
  $('#3').on('click', function () {
    gameBoard.play('c3');
    gameBoard.winCheck();
    render();
  })
  $('#4').on('click', function () {
    gameBoard.play('c4');
    gameBoard.winCheck();
    render();
  })
  $('#5').on('click', function () {
    gameBoard.play('c5');
    gameBoard.winCheck();
    render();
  })
  $('#6').on('click', function () {
    gameBoard.play('c6');
    gameBoard.winCheck();
    render();
  })
  $('#7').on('click', function () {
    gameBoard.play('c7');
    gameBoard.winCheck();
    render();
  })
  $('#8').on('click', function () {
    gameBoard.play('c8');
    gameBoard.winCheck();
    render();
  })
  $('#9').on('click', function () {
    gameBoard.play('c9');
    gameBoard.winCheck();
    render();
  })
  $('button').on('click', function() {
    reset();
  })
});
