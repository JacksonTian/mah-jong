'use strict';

const algo = require('./algorithm');

/**
 * 玩家的定义
 */
class Player {
  /**
   * 玩家的构造函数
   * @param {String} name 玩家名字
   * @param {WINDS} seating 玩家坐次
   */
  constructor(name, seating) {
    this.name = name;
    this.seating = seating;
    this.hand = [];
  }

  /**
   * 将手牌排序
   */
  sortHand() {
    this.hand = algo.sortTiles(this.hand);
  }

  /**
   * 显示手中的牌
   */
  display() {
    console.log(this.hand.join(' '));
  }
}

module.exports = Player;
