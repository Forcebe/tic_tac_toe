
# CROSSTRONAUGHT

Crosstronaught is a simple noughts and crosses/tic-tac toe game you can play in the browser. It is my first-ever completed coding project and was built for the first project week of a General Assembly Software Engineering Immersive course (hello SEIC-ANZ #38!)

At this stage the project is complete and likely will not be developed further.

## Availability

Crosstronaught is hosted on GitHub pages and is [available here.](https://forcebe.github.io/tic_tac_toe/)

## Features and info

Crosstronaught is built using HTML, CSS and javascript with [jQuery](https://jquery.com/). It features:
* Local multiplayer and single player vs AI modes
* Custom player names
* Selectable player icons
* A basic AI that will play a token in a random unoccupied square
* A scoreboard that tracks game wins for each player

## Structure

The game consists of one HTML file, one CSS file and two javascript files, plus jQuery.

index.html has all the screen states in it, with the class of `.hidden` applied when they should not be visible. `.hidden` sets the display property to `display: none;`

gameLogic.js contains an object, `gameBoard` within which are stored the cells on the game board represented as an empty string:

```javascript
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
//more stuff after this
}
```

`gameBoard` also contains the players as sub-objects with a name and a score value along with the functions to play a token into the cells, detect a victory or draw  and update the score.

The tic-tac-toe.js file handles interaction with the DOM via jQuery. It displays and hides screen states, sets values within gameLogic.js based on player input and has the event handlers for user input.

Updating the DOM is mostly handled through the `render` function which detects a win state from gameLogic.js, deactivates click event handlers and displays appropriate messages. If a win is not detected, it calls a function to update each on-screen square with it's appropriate token and background.

There are also `reset` and `home` functions that reset the board and hide the victory text/buttons and return to the first menu respectively.

## Acknowledgement

Icons for this project were sourced from [Flaticon](https://www.flaticon.com/) and were made by [Pixel perfect,](https://www.flaticon.com/authors/pixel-perfect) [Freepik,](www.flaticon.com/authors/freepik) [monkik,](https://www.flaticon.com/authors/monkik) [Good Ware](https://www.flaticon.com/authors/good-ware) and [hirschwolf](https://www.flaticon.com/authors/hirschwolf)

Thanks to course instructors [Joel Turnbull](https://github.com/wofockham) and [Camilla Champion de Crespigny](https://github.com/CamillaCdC)

[![Twitter link](https://img.shields.io/twitter/follow/forcebe_?label=Follow%20me%20on%20Twitter&style=social)](https://twitter.com/Forcebe_)
