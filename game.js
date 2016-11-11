'use strict';

const Game = require('./').Game;
const Player = require('./').Player;

// Four Winds
// The four winds symbolize the seating arrangements:
//  East, West, North and South.
// A player who is the East Wind, gets to be the dealer and starts the game.

var game = new Game();

game.join(new Player('玩家1'));
game.join(new Player('玩家2'));
game.join(new Player('玩家3'));
game.join(new Player('玩家4'));

// 洗牌

// 庄家🎲

// 发牌
game.initDealt();

game.display();
// 开牌

