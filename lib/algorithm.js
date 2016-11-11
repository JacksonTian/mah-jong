'use strict';

const Tile = require('./tile');

const TYPES = Tile.TYPES;

/**
 * 得到一个位于指定区间的随机整数
 * @param {Number} min 区间最小值
 * @param {Number} max 区间最大值
 * @return {Number} 位于指定区间的随机整数
 */
exports.random = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * 将一组数据进行洗牌
 * @param {Array} set 待洗牌的数据集
 * @return {Array} 洗牌后的数据集
 */
exports.shuffle = function (set) {
  var length = set.length;
  var shuffled = new Array(length);
  for (var index = 0, rand; index < length; index++) {
    rand = exports.random(0, index);
    if (rand !== index) {
      shuffled[index] = shuffled[rand];
    }
    shuffled[rand] = set[index];
  }

  return shuffled;
};

/**
 * 将一组牌，分花色，按顺序排好
 * @param {Array} tiles 一组待排序的牌
 * @return {Array} 排序后的牌
 */
exports.sortTiles = function (tiles) {
  var circles = tiles.filter((item) => {
    return item.type === TYPES.circles;
  });

  var bamboos = tiles.filter((item) => {
    return item.type === TYPES.bamboo;
  });

  var characters = tiles.filter((item) => {
    return item.type === TYPES.character;
  });

  return [
    ...exports.pongFirst(circles),
    ...exports.pongFirst(bamboos),
    ...exports.pongFirst(characters)
  ];
};

/**
 * 根据指定的花色生成36张牌
 * @param {TYPES} type 花色类型，值取自Type.TYPES
 * @return {Array} 36张牌相同花色的牌
 */
var makeTilesByType = function (type) {
  var tiles = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 4; j++) {
      tiles.push(new Tile(i + 1, type));
    }
  }

  return tiles;
};

/**
 * 生成3中花色的牌，共108张
 * @return {Array} 108张牌
 */
exports.makeTiles = function () {
  var circles36 = makeTilesByType(TYPES.circles);
  var bamboos36 = makeTilesByType(TYPES.bamboo);
  var characters36 = makeTilesByType(TYPES.character);
  return [...circles36, ...bamboos36, ...characters36];
};

var group = function (set) {
  var index = 0;
  var failed = 0;
  var matchs = [];
  var match = [];
  while (index < set.length) {
    // if (failed > 1) {
    //   return false;
    // }
    let current = set[index];
    let last = match[match.length - 1];
    if (!last) {
      // 第一次匹配
      match.push(current);
      index++;
      continue;
    }

    // 与上一张牌类型不同
    if (last.type !== current.type) {
      matchs.push(match);
      match = [current];
      failed += 1;
      index++;
      continue;
    }

    if (match.length === 1) {
      if (last.value === current.value ||
        last.value + 1 === current.value) {
        match.push(current);
      } else {
        matchs.push(match);
        match = [current];
        failed++;
      }
      index++;
      continue;
    }

    let first = match[0];
    if (first.value === last.value &&
        last.value === current.value || // aaa
        first.value + 1 === last.value &&
        last.value + 1 === current.value) { // abc
      match.push(current);
      matchs.push(match);
      match = [];
    } else {
      matchs.push(match);
      match = [current];
      failed++;
    }

    index++;
  }

  if (match.length) {
    matchs.push(match);
  }

  return matchs;
};

var getUnmatched = function (groups) {
  var rest = [];
  for (var i = 0; i < groups.length; i++) {
    var parts = groups[i];
    if (parts.length % 3 !== 0) {
      rest = rest.concat(parts);
    }
  }
  return rest;
};

/**
 * 检测手牌是否胡了
 * @param {Array} set 手牌
 * @return {Boolean} 是否胡牌
 */
exports.huCheck = function (set) {
  if (set.length % 3 !== 2) {
    return false;
  }

  // 第一次分组
  var rest = getUnmatched(group(exports.pongFirst(set)));

  // 当且仅当只有一个aa时，才是胡牌
  if (rest.length === 2) {
    return exports.isEyes(rest);
  }

  // 第二次分组
  rest = getUnmatched(group(exports.chiFirst(rest)));
  // 当且仅当只有一个aa时，才是胡牌
  if (rest.length === 2) {
    return exports.isEyes(rest);
  }

  return false;
};

exports.isEyes = function (set) {
  return (set[0].type === set[1].type &&
    set[0].value === set[1].value);
};

/**
 * 一种以优先的排序
 * 1, 2, 3, 1, 2, 3 => 1, 1, 2, 2, 3, 3
 */
exports.pongFirst = function (set) {
  return set.sort(function (a, b) {
    return a.value > b.value ? 1 : -1;
  });
};

/**
 * 一种以顺子优先的排序
 * 1, 1, 2, 2, 3, 3 => 1, 2, 3, 1, 2, 3
 */
exports.chiFirst = function (set) {
  var matchs = [];
  var match = [];
  var max = 0;
  for (let i = 0; i < set.length; i++) {
    let last = match[match.length - 1];
    let tile = set[i];
    if (match.length === 0) {
      match.push(tile);
      continue;
    }

    if (last.value === tile.value) {
      match.push(tile);
      continue;
    }

    max = Math.max(max, match.length);
    matchs.push(match);
    match = [tile];
  }

  max = Math.max(max, match.length);
  matchs.push(match);

  var newSet = [];
  for (let i = 0; i < max; i++) { // 最多4次
    for (let j = 0; j < matchs.length; j++) {
      var pair = matchs[j];
      if (pair.length) {
        newSet.push(pair.shift());
      }
    }
  }

  return newSet;
};

/**
 * 检测手牌是否听了
 * @return {Boolean} 是否听牌
 */
exports.tingCheck = function (set) {
  if (set.length % 3 !== 1) {
    return false;
  }

  // TODO: ting check

  return false;
};
