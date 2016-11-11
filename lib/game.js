'use strict';

const algo = require('./algorithm');

/**
 * 麻将游戏的定义
 */
class Game {
  /**
   * 麻将的构造函数
   */
  constructor() {
    var tiles = algo.makeTiles();
    this.wall = algo.shuffle(tiles);
    this.offset = 0;
    this.players = [];
  }

  /**
   * 加入一个玩家到游戏中来
   *
   * Example:
   * ```js
   * var newPlayer = new Player();
   * if (!game.join(newPlayer)) {
   *   console.log('游戏已经满员');
   * }
   * ```
   *
   * @param {Player} player 新的玩家
   * @return {Boolean} 返回是否加入成功
   */
  join(player) {
    if (this.players.length === 4) {
      return false;
    }

    this.players.push(player);
    return true;
  }

  seat() {
    this.seating = [
      this.players
    ];
  }

  /**
   * 初始发牌，为每个玩家手里发13张牌
   */
  initDealt() {
    // 每人发12张
    for (let i = 0; i < 3; i++) { // 发3轮
      for (let j = 0; j < this.players.length; j++) {
        var player = this.players[j];
        // 发4次
        for (let k = 0; k < 4; k++) {
          this.dealt(player);
        }
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

  /**
   * 向一个玩家手里发一张牌
   */
  dealt(player) {
    player.hand.push(this.wall[this.offset]);
    this.offset++;
  }

  /**
   * 显示每个玩家的手牌详情
   */
  display() {
    for (let j = 0; j < this.players.length; j++) {
      let player = this.players[j];
      // 齐牌
      player.display();
    }
  }
}

module.exports = Game;
