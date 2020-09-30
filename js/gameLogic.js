//gameBoard object holds the current state of the game board
//it has the rules for the game, win conditions etc
//it doesn't identify with the DOM


const gameBoard = {
  c1: '',
  c2: '',
  c3: '',
  c4: '',
  c5: '',
  c6: '',
  c7: '',
  c8: '',
  c9: '',

  player1: 'X',
  player2: 'O',

  lastTurn: 'O',
  nextTurn: 'X',
  winner: '',

  play: function (cell) {
    if (this[cell] !== '') {

    } else if  (this.nextTurn === this.player1) {
      this[cell] = 'X';
      this.lastTurn = this.player1
      this.nextTurn = this.player2;
    } else {
      this[cell] = 'O';
      this.lastTurn = this.player2;
      this.nextTurn = this.player1;
    }
  },

  winCheck: function() {
    //top row
    if (this.c1 != '' && this.c1 === this.c2 && this.c2 === this.c3) {
      this.winner = this.lastTurn
    //first column
    } else if (this.c1 !== '' && this.c1 === this.c4 && this.c4 === this.c7) {
      this.winner = this.lastTurn
    //middle Row
    } else if (this.c4 !== '' && this.c4 === this.c5 && this.c5 === this.c6) {
      this.winner = this.lastTurn
    //second column
    } else if (this.c2 !== '' && this.c2 === this.c5 && this.c5 === this.c8) {
      this.winner = this.lastTurn
    //bottom row
    } else if (this.c7 !== '' && this.c7 === this.c8 && this.c8 === this.c9) {
      this.winner = this.lastTurn
    //third Column
    } else if (this.c3 !== '' && this.c3 === this.c6 && this.c6 === this.c9) {
      this.winner = this.lastTurn
    //left diagonal
    } else if (this.c1 !== '' && this.c1 === this.c5 && this.c5 === this.c9) {
      this.winner = this.lastTurn
    //right diagonal
    } else if (this.c3 !== '' && this.c3 === this.c5 && this.c5 === this.c7) {
      this.winner = this.lastTurn
    //draw condition
    } else if (
      this.c1 !== '' &&
      this.c2 !== '' &&
      this.c3 !== '' &&
      this.c4 !== '' &&
      this.c5 !== '' &&
      this.c6 !== '' &&
      this.c7 !== '' &&
      this.c8 !== '' &&
      this.c9 !== ''
    ) {
      this.winner = 'draw'
    }
  }
};
