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
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(1);
  });

  it('huCheck(ab) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles) // 2筒
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(a_b-) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.bamboo) // 2条
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(aaa, aa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(9, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(2);
  });

  it('huCheck(abc, aa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(9, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(2);
  });

  it('huCheck(aab, aa) should not ok', () => {
    var set = [
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(9, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(aa, abc) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(7, Tile.TYPES.circles), // 3筒
      new Tile(8, Tile.TYPES.circles), // 9筒
      new Tile(9, Tile.TYPES.circles) // 9筒
    ];
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(2);
  });

  it('huCheck(a) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles) // 1筒
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(aaa) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles) // 1筒
    ];

    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(ad) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(aa, aaa) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(2);
  });

  it('huCheck(aac, aa) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(4, Tile.TYPES.circles), // 4筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
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
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(3);
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

    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(3);
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
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(3);
  });

  it('huCheck(aabbcc,dd-) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(4, Tile.TYPES.bamboo), // 4条
      new Tile(4, Tile.TYPES.character) // 4万
    ];
    var [isComplete] = algo.huCheck(set);
    expect(isComplete).to.be(false);
  });

  it('huCheck(a_a_b_b_c_c_,dd) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.bamboo), // 1条
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.bamboo), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(3, Tile.TYPES.bamboo), // 3条
      new Tile(4, Tile.TYPES.bamboo), // 4条
      new Tile(4, Tile.TYPES.bamboo) // 4条
    ];
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(3);
  });

  it('huCheck(a_a_a-b-c-ddd) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(1, Tile.TYPES.bamboo), // 1条
      new Tile(2, Tile.TYPES.bamboo), // 2条
      new Tile(3, Tile.TYPES.bamboo), // 3条
      new Tile(4, Tile.TYPES.bamboo), // 4条
      new Tile(4, Tile.TYPES.bamboo), // 4条
      new Tile(4, Tile.TYPES.bamboo) // 4条
    ];
    var [isComplete, combined] = algo.huCheck(set);
    expect(isComplete).to.be(true);
    expect(combined.length).to.be(3);
  });

  it('tingCheck(1234567) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(2, Tile.TYPES.character), // 2万
      new Tile(3, Tile.TYPES.character), // 3条
      new Tile(4, Tile.TYPES.character), // 4条
      new Tile(5, Tile.TYPES.character), // 5条
      new Tile(6, Tile.TYPES.character), // 6条
      new Tile(7, Tile.TYPES.character) // 7条
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(1);
    var [tip] = tips;
    expect(tip.value).to.be(7);
    expect(tip.type).to.be(Tile.TYPES.character);
  });

  it('tingCheck(1123) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(2, Tile.TYPES.character), // 2万
      new Tile(3, Tile.TYPES.character) // 3万
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(2);
    var [tip1, tip2] = tips;
    expect(tip1.value).to.be(1);
    expect(tip1.type).to.be(Tile.TYPES.character);
    expect(tip2.value).to.be(4);
    expect(tip2.type).to.be(Tile.TYPES.character);
  });

  it('tingCheck(1134) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(3, Tile.TYPES.character), // 3万
      new Tile(4, Tile.TYPES.character) // 4万
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(2);
    var [tip1, tip2] = tips;
    expect(tip1.value).to.be(2);
    expect(tip1.type).to.be(Tile.TYPES.character);
    expect(tip2.value).to.be(5);
    expect(tip2.type).to.be(Tile.TYPES.character);
  });

  it('tingCheck(1144) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(4, Tile.TYPES.character), // 4万
      new Tile(4, Tile.TYPES.character) // 4万
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(2);
    var [tip1, tip2] = tips;
    expect(tip1.value).to.be(1);
    expect(tip1.type).to.be(Tile.TYPES.character);
    expect(tip2.value).to.be(4);
    expect(tip2.type).to.be(Tile.TYPES.character);
  });

  it('tingCheck(aabbccd) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(1, Tile.TYPES.circles), // 1筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(2, Tile.TYPES.circles), // 2筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(3, Tile.TYPES.circles), // 3筒
      new Tile(4, Tile.TYPES.circles) // 4筒
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(1);
    var [tip] = tips;
    expect(tip.value).to.be(4);
    expect(tip.type).to.be(Tile.TYPES.circles);
  });

  it('tingCheck() should not ok', () => {
    var set = [];
    var [isComplete] = algo.tingCheck(set);
    expect(isComplete).to.be(false);
  });

  it('tingCheck(1245) should not ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(2, Tile.TYPES.character), // 2万
      new Tile(4, Tile.TYPES.character), // 4万
      new Tile(5, Tile.TYPES.character) // 5万
    ];
    var [isComplete] = algo.tingCheck(set);
    expect(isComplete).to.be(false);
  });

  it('tingCheck(1255) should ok', () => {
    var set = [
      new Tile(1, Tile.TYPES.character), // 1万
      new Tile(2, Tile.TYPES.character), // 2万
      new Tile(5, Tile.TYPES.character), // 4万
      new Tile(5, Tile.TYPES.character) // 5万
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(1);
    var [tip] = tips;
    expect(tip.value).to.be(3);
    expect(tip.type).to.be(Tile.TYPES.character);
  });

  it('tingCheck(5589) should ok', () => {
    var set = [
      new Tile(8, Tile.TYPES.character), // 8万
      new Tile(9, Tile.TYPES.character), // 9万
      new Tile(5, Tile.TYPES.character), // 4万
      new Tile(5, Tile.TYPES.character) // 5万
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(1);
    var [tip] = tips;
    expect(tip.value).to.be(7);
    expect(tip.type).to.be(Tile.TYPES.character);
  });

  it('tingCheck(5578) should ok', () => {
    var set = [
      new Tile(7, Tile.TYPES.character), // 7万
      new Tile(8, Tile.TYPES.character), // 8万
      new Tile(5, Tile.TYPES.character), // 4万
      new Tile(5, Tile.TYPES.character) // 5万
    ];
    var [isComplete, tips] = algo.tingCheck(set);
    expect(isComplete).to.be(true);
    expect(tips.length).to.be(2);
    var [tip1, tip2] = tips;
    expect(tip1.value).to.be(6);
    expect(tip1.type).to.be(Tile.TYPES.character);
    expect(tip2.value).to.be(9);
    expect(tip2.type).to.be(Tile.TYPES.character);
  });
});
