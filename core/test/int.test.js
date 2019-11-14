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
    });
});
