'use strict';

exports.make = function (count) {
  var cards = new Array(count);
  for (var i = 0; i < count; i++) {
    cards[i] = Math.floor(Math.random() * 100000) % 9 + 1;
  }

  return cards.sort();
};

exports.random = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

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
