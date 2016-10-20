'use strict';

var circles = Symbol('同');
var bamboo = Symbol('条'); // 条
var character = Symbol('万');

var TYPES = {
  circles, // 同
  bamboo, // 条
  character // 万
};

var east = Symbol('East');
var west = Symbol('West');
var north = Symbol('North');
var south = Symbol('South');

var WINDS = {
  east,
  west,
  north,
  south
};

class Tile {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }

  toString() {
    return `${this.value}${this.type.toString()}`;
  }
}

var sort = function (a, b) {
  return a.value > b.value ? 1 : -1;
};

class Player {
  constructor(name, seating) {
    this.name = name;
    this.seating = seating;
    this.hand = [];
  }

  sortHand() {
    var circles = this.hand.filter((item) => {
      return item.type === TYPES.circles;
    }).sort(sort);
    var bamboos = this.hand.filter((item) => {
      return item.type === TYPES.bamboo;
    }).sort(sort);
    var characters = this.hand.filter((item) => {
      return item.type === TYPES.character;
    }).sort(sort);

    this.hand = circles.concat(bamboos).concat(characters);
  }

  display() {
    console.log(this.hand.join(' '));
  }
}

var generate = function (type) {
  var tiles = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 4; j++) {
      tiles.push(new Tile(i + 1, type));
    }
  }

  return tiles;
};

var initTiles = function () {
  return [].concat(generate(TYPES.circles))
    .concat(generate(TYPES.bamboo))
    .concat(generate(TYPES.character));
};

var random = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

var shuffle = function (set) {
  var length = set.length;
  var shuffled = new Array(length);
  for (var index = 0, rand; index < length; index++) {
    rand = random(0, index);
    if (rand !== index) {
      shuffled[index] = shuffled[rand];
    }
    shuffled[rand] = set[index];
  }

  return shuffled;
};

class Game {
  constructor() {
    this.wall = shuffle(initTiles());
    this.offset = 0;
    this.players = [];
  }

  join(player) {
    this.players.push(player);
  }

  seat() {
    this.seating = [
      this.players
    ];
  }

  initDealt() {
    // 每人发12张
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < this.players.length; j++) {
        var player = this.players[j];
        this.dealt(player);
        this.dealt(player);
        this.dealt(player);
        this.dealt(player);
      }
    }

    // 每人发1张，共13张
    for (let j = 0; j < this.players.length; j++) {
      let player = this.players[j];
      this.dealt(player);
      // 齐牌
      player.sortHand();
    }
  }

  dealt(player) {
    player.hand.push(this.wall[this.offset]);
    this.offset++;
  }

  display() {
    for (let j = 0; j < this.players.length; j++) {
      let player = this.players[j];
      // 齐牌
      player.display();
    }
  }
}

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

