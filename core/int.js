const Bignum = require('./bignum');

function truncateZero(array) {
    while (array[array.length - 1] === '0' && array.length > 1) {
        array.pop();
    }
}

class Int extends Bignum {
    constructor(number, sign) {
        super();

        const numArray = number.split('').reverse();
        truncateZero(numArray);
        const num = numArray.reverse().join('');

        this.number = num.slice(num.indexOf('-') + 1);
        this.sign = typeof sign === 'boolean' ? sign : num.indexOf('-') === 0;
    }

    abs() {
        return new Int(this.number);
    }

    toString() {
        return this.sign ? `-${this.number}` : this.number;
    }

    copy() {
        return new Int(this.number, this.sign);
    }
}

module.exports = Int;
