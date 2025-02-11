/*
ARTG & CMPM 120 - Project Prototype
Author: Son Huynh
5/03/2017
*/

// create the game
var game = new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,'');

// add all game states
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('sound',soundState);
game.state.add('credits',creditsState);
game.state.add('play',playState);
game.state.add('end',endState);

// boot up game
game.state.start('boot');