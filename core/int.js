const Bignum = require('./bignum');

class Int extends Bignum {
    constructor(number, sign) {
        super();

        this.number = number.slice(number.indexOf('-') + 1);
        this.sign = typeof sign === 'boolean' ? sign : number.indexOf('-') === 0;
    }

    abs() {
        return new Int(this.number);
    }

    toString() {
        return this.sign ? `-${this.number}` : this.number;
    }
}

module.exports = Int;
