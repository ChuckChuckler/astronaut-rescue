# Astronaut Rescue
A game where the player plays as an astronaut trying to save their ship (and themself) from complete obliteration.\
Also, an Algebra II practice game for solving problems over C.\
This is the second game that I've made entirely with HTML/CSS/JS! Giving myself a little pat on the back because making good games with them is HARD.

## Goal
The goal of the game is to successfully figure out the six-digit passcode to an emergency missile button before the "time limit" runs out.\

## How to Play
Before entering the game, the user will interact with a small configuration page.\
Here, the user will be able to choose their time constraint according to their skill, as well as whether or not they would like to enable minigames (this will be explained later).
- Note: The time limit must be at least twenty minutes and at most sixty.

Upon hitting the "Play!" button, the user will be directed to the main game.\
The user will be able to interact with the computer to their left and the passcode and button to their right.\
The computer contains twenty-one solving-over-c equations corresponding to all the letters of the alphabet, excluding e, i, l, o, and t (these are either common confusors, or mean something else entirely in math.)\
The passcode/button contains the password input and a key.\
The solutions to six of the problems in the computer will correspond directly to the six solutions written on the key.\
As such, if the user solves an equation and finds a solution that matches with a key, then the letter corresponding to the equation will be in the spot written on the key.\
An example, as a better explanation:
- The equation for the letter b's solution is 5
- The key states that the second digit has a solution of 5
- In this case, this would mean that the letter b is the second letter in the passcode.
The user will continue solving equations until they have correctly identified all six of the digits of the password.

## Win/Lose
To win, the player just has to figure out the correct passcode.\
The only way to lose is by running out of time.\

## Minigmaes
If the player chooses to enable minigames, some areas will be a little more complicated:
- Computer
  - The computer will now require a passcode to gain access to the database of questions.
  - To guess this password, the user will go through a small Wordle minigame.
  - If the player is able to guess the password correctly in five tries, they gain access to the questions, and this password will NOT change.
  - If they are not able to guess the password correctly in five tries, the password will change to a different one, and they must repeat the process.
- Passcode
  - There will be a minigame that the player must complete to add a digit to the passcode.
  - The letter will slide left and right across the scene, hovering over a long grey gap with a dark grey square.
  - The player must press the down arrow when the letter is hovering right over the dark grey square.
  - When the letter slides down, if it is touching the grey square, the digit will be successfully inserted into the passcode!
  - Else, the process will just repeat.
- Enemy
  - Every so often, there will be a small chance for an enemy to spawn (a floating UFO).
  - The user will see a warning pop up in the bottom of the screen.
  - They must click on the enemy to "defeat" it in the span of five seconds.
  - If they fail to defeat the enemy in five seconds, they will lose two minutes of time.

## Disclaimers
This is NOT made for a mobile device.\
There's a strange bug where if the user switches tabs while the computer is doing its cool typing thing (only w/ with minigames on), then switches back, the text just goes totally crazy. This is 100% because of browser throttling, so please just...don't switch the tab, k? Thanks <3
