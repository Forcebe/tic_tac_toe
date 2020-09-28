$(document).ready(function() {
  //Check the JS and jQuery are working right
  console.log('hi ' + $.fn.jquery)

  runGame();

  turnCheck();
});

//Treats each square as a button to place a counter
const runGame = function() {
  $('#1').on('click', function () {
    play(1);
  });

  $('#2').on('click', function () {
    play(2);
  });

  $('#3').on('click', function () {
    play(3);
  });

  $('#4').on('click', function () {
    play(4);
  });

  $('#5').on('click', function () {
    play(5);
  });

  $('#6').on('click', function () {
    play(6);
  });

  $('#7').on('click', function () {
    play(7);
  });

  $('#8').on('click', function () {
    play(8);
  });

  $('#9').on('click', function () {
    play(9);
  });
};

//establishes turn order and stores the winner plus a place to put output
let nextTurn = 'X'
let winner;
let outputPara;
// takes in a cell and if the cell isn't already taken, places the current players token in the cell
const play = function (cell) {
  const $cell = `#${cell}`;
  const counter = $($cell).text();
  if (counter !== "") {
    //flash red
  } else if (nextTurn === 'X') {
    $($cell).text('X');
    nextTurn = 'O';
  } else {
    $($cell).text('O');
    nextTurn = 'X';
  }
  //checks if there has been a winner and who has the next turn
  winCond();
  turnCheck();
  winCheck();
};

//checks each possible win condition and if the game has been drawn
const winCond = function() {
  if (
  //Top row
      $('#1').text() !== '' &&
      $('#1').text() === $('#2').text() &&
      $('#2').text() === $('#3').text()
      ) {
        winner = $('#1').text();
  } else if (
  //First column
      $('#1').text() !== '' &&
      $('#1').text() === $('#4').text() &&
      $('#4').text() === $('#7').text()
      ) {
        winner = $('#1').text()
  } else if (
  //Second Row
      $('#4').text() !== '' &&
      $('#4').text() === $('#5').text() &&
      $('#5').text() === $('#6').text()
      ) {
        winner = $('#4').text()
  } else if (
  //Second column
      $('#2').text() !== '' &&
      $('#2').text() === $('#5').text() &&
      $('#5').text() === $('#8').text()
      ) {
        winner = $('#2').text()
  } else if (
  //Bottom row
      $('#7').text() !== '' &&
      $('#7').text() === $('#8').text() &&
      $('#8').text() === $('#9').text()
      ) {
        winner = $('#7').text()
  } else if (
  //Third Column
      $('#3').text() !== '' &&
      $('#3').text() === $('#6').text() &&
      $('#6').text() === $('#9').text()
      ) {
        winner = $('#3').text()
  } else if (
  //Left diagonal
      $('#1').text() !== '' &&
      $('#1').text() === $('#5').text() &&
      $('#5').text() === $('#9').text()
      ) {
        winner = $('#1').text()
  } else if (
  //Right diagonal
      $('#3').text() !== '' &&
      $('#3').text() === $('#5').text() &&
      $('#5').text() === $('#7').text()
      ) {
        winner = $('#3').text()
  } else if (
    $('#1').text() !== '' &&
    $('#2').text() !== '' &&
    $('#3').text() !== '' &&
    $('#4').text() !== '' &&
    $('#5').text() !== '' &&
    $('#6').text() !== '' &&
    $('#7').text() !== '' &&
    $('#8').text() !== '' &&
    $('#9').text() !== ''
  ) {
    winner = 'draw';
  }
};

//checks if there has been  a win or draw. Disables buttons if there has been a
//win, displays the reset button and the winner/draw text
const winCheck = function() {
  if (winner === 'draw') {
    $(".victory-text").remove();
    outputPara = $('<p class="victory-text"></p>').text(`Cat's game! It's a draw.`);
    $('.container').append(outputPara);
    $('button').removeClass('hidden');
    $('button').on('click', reset);
  } else if (winner === 'X' || winner === 'O') {
    $(".victory-text").remove();
    outputPara = $('<p class="victory-text"></p>').text(`${winner} wins!`);
    $('.container').append(outputPara);
    $('button').removeClass('hidden');
    $('button').on('click', reset);
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
}

// resets the game
const reset = function() {
  $('.marker').text('');
  winner = undefined;
  $(".victory-text").remove();
  $('button').addClass('hidden');
  runGame()
}

const turnCheck = function() {
  $('#whos-turn').text(`It's ${nextTurn}'s go`);
}
