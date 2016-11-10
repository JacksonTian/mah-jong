'use strict';

const expect = require('expect.js');

const algo = require('../lib/algorithm');

describe('mah-jong', () => {
  it('should ok', () => {
    var cards = algo.make(14);
    expect(cards.length).to.be(14);
    console.log(cards);
    for (var i = 0; i < cards.length; i++) {
      var value = cards[i];
      expect(value % 1).to.be(0); // 整数
      expect(value).to.be.above(0);
      expect(value).to.be.lessThan(10);
    }
  });
});
