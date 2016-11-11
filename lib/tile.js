'use strict';

/**
 * 单张牌的定义，花色为筒、条、万，值为1-9。
 */
class Tile {
  /**
   * 构造器
   */
  constructor(value, type) {
    this.value = value; // 数值
    this.type = type; // 花色
  }

  /**
   * 输出牌的内容
   */
  toString() {
    return `${this.value}${this.type.toString()}`;
  }
}

const circles = Symbol('同');
const bamboo = Symbol('条'); // 条
const character = Symbol('万');

/**
 * 牌的花色定义
 */
Tile.TYPES = {
  circles, // 同
  bamboo, // 条
  character // 万
};

module.exports = Tile;
