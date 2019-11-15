const { it, describe } = require('mocha');
const assert = require('assert');
const Int = require('./../int');

describe('Int test', () => {
    describe('Test sum(<Int>, <Int>)', () => {
        it('1 + 1 = 2', () => {
            const a = new Int('1');
            const b = new Int('1');
            assert.equal(a.sum(b), '2');
        });
        it('11 + 23 = 34', () => {
            const a = new Int('11');
            const b = new Int('23');
            assert.equal(a.sum(b), '34');
        });
        it('10 + 10 != 21', () => {
            const a = new Int('10');
            const b = new Int('10');
            assert.notEqual(a.sum(b), '21');
        });
        it('1234124125125 + 124124128657433453474835 = 124124128658667577599960', () => {
            const a = new Int('1234124125125');
            const b = new Int('124124128657433453474835');
            assert.equal(a.sum(b), '124124128658667577599960');
        });
        it('11 + -23 = -12', () => {
            const a = new Int('11');
            const b = new Int('-23');
            assert.equal(a.sum(b), '-12');
        });
        it('-11 + -23 = -12', () => {
            const a = new Int('-11');
            const b = new Int('-23');
            assert.equal(a.sum(b), '-34');
        });
        it('1 + -23 = -12', () => {
            const a = new Int('1');
            const b = new Int('-23');
            assert.equal(a.sum(b), '-22');
        });
        it('-11 + 23 = -12', () => {
            const a = new Int('-11');
            const b = new Int('23');
            assert.equal(a.sum(b), '12');
        });
        it('-99 + 999999999999999 = 0', () => {
            const b = new Int('999999999999999');
            const a = new Int('-99');
            assert.equal(a.sum(b), '999999999999900');
        });
    });
    describe('Test substraction(<Int>, <Int>)', () => {
        it('1 - 1 = 0', () => {
            const a = new Int('1');
            const b = new Int('1');
            assert.equal(a.substr(b), '0');
        });
        it('110 - 100 = 10', () => {
            const a = new Int('1');
            const b = new Int('1');
            assert.equal(a.substr(b), '0');
        });
        it('23 - 11 = 12', () => {
            const b = new Int('11');
            const a = new Int('23');
            assert.equal(a.substr(b), '12');
        });
        it('10 - 10 != 1', () => {
            const a = new Int('10');
            const b = new Int('10');
            assert.notEqual(a.substr(b), '1');
        });
        it('124124128657433453474835 - 1234124125125 = 124124128656199329349710', () => {
            const b = new Int('1234124125125');
            const a = new Int('124124128657433453474835');
            assert.equal(a.substr(b), '124124128656199329349710');
        });
        it('1 - 10 = -9', () => {
            const a = new Int('1');
            const b = new Int('10');
            assert.equal(a.substr(b), '-9');
        });
        it('-1 - 10 = -9', () => {
            const a = new Int('-1');
            const b = new Int('10');
            assert.equal(a.substr(b), '-11');
        });
        it('-1 - -10 = -9', () => {
            const a = new Int('-1');
            const b = new Int('-10');
            assert.equal(a.substr(b), '9');
        });
        it('1 - -10 = -9', () => {
            const a = new Int('1');
            const b = new Int('-10');
            assert.equal(a.substr(b), '11');
        });
        it('1234124125125 - 124124128657433453474835 = -124124128656199329349710', () => {
            const b = new Int('124124128657433453474835');
            const a = new Int('1234124125125');
            assert.equal(a.substr(b), '-124124128656199329349710');
        });
        it('124124128657433453474835 - 124124128657433453474835 = 0', () => {
            const b = new Int('124124128657433453474835');
            const a = new Int('124124128657433453474835');
            assert.equal(a.substr(b), '0');
        });
        it('124124128657433453474824 - 124124128657433453474835 = -11', () => {
            const b = new Int('124124128657433453474835');
            const a = new Int('124124128657433453474834');
            assert.equal(a.substr(b), '-1');
        });
        it('124124128657433453474835 - 124124128657433453474834 = 1', () => {
            const b = new Int('124124128657433453474834');
            const a = new Int('124124128657433453474835');
            assert.equal(a.substr(b), '1');
        });
        it('-124124128657433453474835 - 124124128657433453474835 = -248248257314866906949670', () => {
            const b = new Int('124124128657433453474835');
            const a = new Int('-124124128657433453474835');
            assert.equal(a.substr(b), '-248248257314866906949670');
        });
        it('-1 - -2 = 1', () => {
            const b = new Int('-2');
            const a = new Int('-1');
            assert.equal(a.substr(b), '1');
        });
        it('0 - 0 = 0', () => {
            const b = new Int('0');
            const a = new Int('0');
            assert.equal(a.substr(b), '0');
        });
        it('-99 - -999999999999999 = 0', () => {
            const b = new Int('-999999999999999');
            const a = new Int('-99');
            assert.equal(a.substr(b), '999999999999900');
        });
    });
    describe('Test compare(<Int>, <Int>)', () => {
        it('1 > 1 = false', () => {
            const a = new Int('1');
            const b = new Int('1');
            assert.equal(a.compare(b, '>'), false);
        });
        it('12 > 11 = true', () => {
            const a = new Int('12');
            const b = new Int('11');
            assert.equal(a.compare(b, '>'), true);
        });
        it('1000 > 10 = true', () => {
            const a = new Int('1000');
            const b = new Int('10');
            assert.equal(a.compare(b, '>'), true);
        });
        it('1000 == 10 = false', () => {
            const a = new Int('1000');
            const b = new Int('10');
            assert.equal(a.compare(b, '=='), false);
        });
        it('-10 == -10 = true', () => {
            const a = new Int('-10');
            const b = new Int('-10');
            assert.equal(a.compare(b, '=='), true);
        });
        it('-1 < 324 = true', () => {
            const a = new Int('-1');
            const b = new Int('324');
            assert.equal(a.compare(b, '<'), true);
        });
        it('-123 > -1245 = true', () => {
            const a = new Int('-123');
            const b = new Int('-1245');
            assert.equal(a.compare(b, '>'), true);
        });
        it('-123456789 < -123456788 = true', () => {
            const a = new Int('-123456789');
            const b = new Int('-123456788');
            assert.equal(a.compare(b, '<'), true);
        });
        it('-123456488 > -123456788 = true', () => {
            const a = new Int('-123456488');
            const b = new Int('-123456788');
            assert.equal(a.compare(b, '>'), true);
        });
        it('-123456488 == -123456788 = false', () => {
            const a = new Int('-123456488');
            const b = new Int('-123456788');
            assert.equal(a.compare(b, '=='), false);
        });
        it('12342352523523523523523523523556488 > 11342352523523523523523523523556488 = true', () => {
            const a = new Int('-123456488');
            const b = new Int('-123456788');
            assert.equal(a.compare(b, '>'), true);
        });
        it('124124128657433453474834 < 124124128657433453474835 = true', () => {
            const a = new Int('124124128657433453474834');
            const b = new Int('124124128657433453474835');
            assert.equal(a.compare(b, '<'), true);
        });
    });
});
