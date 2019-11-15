const { it, describe } = require('mocha');
const assert = require('assert');
const Bignum = require('./../bignum');
const Int = require('./../int');

const bigNum = new Bignum();

describe('Bignum test', () => {
    describe('Test sum(<Int>, <Int>)', () => {
        it('1 + 1 = 2', () => {
            const a = new Int('1');
            const b = new Int('1');
            assert.equal(bigNum.sum(a, b), '2');
        });
        it('11 + 23 = 34', () => {
            const a = new Int('11');
            const b = new Int('23');
            assert.equal(bigNum.sum(a, b), '34');
        });
        it('9999999 + 1 = 10000000', () => {
            const a = new Int('9999999');
            const b = new Int('1');
            assert.equal(bigNum.sum(a, b), '10000000');
        });
        it('10 + 10 != 21', () => {
            const a = new Int('10');
            const b = new Int('10');
            assert.notEqual(bigNum.sum(a, b), '21');
        });
        it('1234124125125 + 124124128657433453474835 = 124124128658667577599960', () => {
            const a = new Int('1234124125125');
            const b = new Int('124124128657433453474835');
            assert.equal(bigNum.sum(a, b), '124124128658667577599960');
        });
    });
});
