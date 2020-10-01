//gameBoard object holds the current state of the game board
//it has the rules for the game, win conditions etc
//it doesn't identify with the DOM

const cellSelector = function() {
  const min = Math.ceil(1);
  const max = Math.floor(10);
  return Math.floor(Math.random() * (max - min) + min);
};

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

  player1: { name: 'X', score: 0},
  player2: { name: 'O', score: 0},

  cpuLast: '',

  nextTurn: 'X',
  winner: '',

  play: function (cell) {
    if (this[cell] !== '') {

    } else if  (this.nextTurn === this.player1.name) {
      this[cell] = 'X';
      this.nextTurn = this.player2.name;
    } else {
      this[cell] = 'O';
      this.nextTurn = this.player1.name;
    }
  },

  easyAiPlay: function (cell) {
    if (this[cell] !== '') {
    } else  {
      this[cell] = 'X';
      this.nextTurn = this.player2.name;

      for (let i = 0; i < 9; i++) {
        this.cpuLast = cellSelector();
        aiCell = 'c' + this.cpuLast
        console.log(aiCell);
        //if it's empty, play in it
        if (this[aiCell] === '') {
          this[aiCell] = 'O';
          this.nextTurn = this.player1.name;
          break;
        }
      }
    }
  },

  winCheck: function() {
    //top row
    if (this.c1 != '' && this.c1 === this.c2 && this.c2 === this.c3) {
      if (this.c1 === 'X') {
        this.winner = this.player1.name
      } else if (this.c1 === 'O') {
        this.winner = this.player2.name
      }
    console.log('top row')
    //first column
    } else if (this.c1 !== '' && this.c1 === this.c4 && this.c4 === this.c7) {
      if (this.c1 === 'X') {
        this.winner = this.player1.name
      } else if (this.c1 === 'O') {
        this.winner = this.player2.name
      }
      console.log('first column')
    //middle Row
    } else if (this.c4 !== '' && this.c4 === this.c5 && this.c5 === this.c6) {
      if (this.c4 === 'X') {
        this.winner = this.player1.name
      } else if (this.c4 === 'O') {
        this.winner = this.player2.name
      }
      console.log('middle row')
    //second column
    } else if (this.c2 !== '' && this.c2 === this.c5 && this.c5 === this.c8) {
      if (this.c2 === 'X') {
        this.winner = this.player1.name
      } else if (this.c2 === 'O') {
        this.winner = this.player2.name
      }
      console.log('second row')
    //bottom row
    } else if (this.c7 !== '' && this.c7 === this.c8 && this.c8 === this.c9) {
      if (this.c7 === 'X') {
        this.winner = this.player1.name
      } else if (this.c7 === 'O') {
        this.winner = this.player2.name
      }
      console.log('bottom row')
    //third Column
    } else if (this.c3 !== '' && this.c3 === this.c6 && this.c6 === this.c9) {
      if (this.c3 === 'X') {
        this.winner = this.player1.name
      } else if (this.c3 === 'O') {
        this.winner = this.player2.name
      }
      console.log('third column')
    //left diagonal
    } else if (this.c1 !== '' && this.c1 === this.c5 && this.c5 === this.c9) {
      if (this.c1 === 'X') {
        this.winner = this.player1.name
      } else if (this.c1 === 'O') {
        this.winner = this.player2.name
      }
      console.log('left diagonal')
    //right diagonal
    } else if (this.c3 !== '' && this.c3 === this.c5 && this.c5 === this.c7) {
      if (this.c3 === 'X') {
        this.winner = this.player1.name
      } else if (this.c3 === 'O') {
        this.winner = this.player2.name
      }
      console.log('right diagonal')
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
  },

  scoreUpdate: function () {
    if (this.winner !== '') {
      if (this.winner === this.player1.name) {
        this.player1.score ++
      } else if (this.winner === this.player2.name) {
        this.player2.score ++
    }
    }
  }
};
