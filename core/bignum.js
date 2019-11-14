class Bignum {
    /**
     * Sum function return the sum of two Int instances
     * @property {Int} numA - first num to make sum
     * @property {Int} numB - second num to make sum
    * */
    sum(numA, numB) {
        let a = numA;
        let b = numB;

        if (this.constructor.name === 'Int' && !numB) {
            a = this;
            b = numA;
        }

        if (a.number.length < b.number.length) {
            const temp = a;
            a = b;
            b = temp;
        }

        // bug inside eslint, disable for r
        // eslint-disable-next-line no-unused-vars
        let r = '';
        let j = 0;
        let extraDigit = 0;
        for (let i = b.number.length - 1; i >= 0; i--) {
            const aDigit = a.number.charAt(a.number.length - (1 + j));
            const bDigit = b.number.charAt(i);

            const digitSum = parseInt(aDigit, 10) + parseInt(bDigit, 10) + extraDigit;
            extraDigit = Math.floor(digitSum / 10);
            r += (digitSum % 10).toString();
            j++;
        }
        if (extraDigit === 1) {
            r += '1';
        }
        r += a.number.split('').reverse().join('').slice(r.length);
        r = r.split('').reverse().join('');

        return new a.constructor(r);
    }
}


module.exports = Bignum;
