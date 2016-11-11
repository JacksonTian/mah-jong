'use strict';

const expect = require('expect.js');

const algo = require('../lib/algorithm');
const Tile = require('../lib/tile');

describe('mah-jong', () => {
  it('makeTiles should ok', () => {
    var tiles = algo.makeTiles();
    expect(tiles.length).to.be(108);
    for (var i = 0; i < tiles.length; i++) {
      var value = tiles[i].value;
      expect(value % 1).to.be(0); // 整数
      expect(value).to.be.above(0);
      expect(value).to.be.lessThan(10);
    }
  });

  it('huCheck(aa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles) // 1筒
    ];
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(ab) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles) // 2筒
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(a_b-) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.bamboo) // 2条
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(aaa, aa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(9, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(abc, aa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(9, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(aab, aa) should not ok', () => {
    var set = [
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(9, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(aa, abc) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(7, Tile.TYPES.circles), // 3筒
      new Tile(8, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(a) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles) // 1筒
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(aaa) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles) // 1筒
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(ad) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(aa, aaa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(aac, aa) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    expect(algo.huCheck(set)).to.be(false);
  });

  it('huCheck(aabbccdd) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(ddccbbaa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ].reverse();
    expect(algo.huCheck(set)).to.be(true);
  });

  it('huCheck(aabbcc,dd) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(4, Tile.TYPES.bamboo), // 4条
      new Tile(4, Tile.TYPES.bamboo) // 4条
    ];
    expect(algo.huCheck(set)).to.be(true);
  });
});
