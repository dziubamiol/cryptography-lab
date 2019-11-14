const Bignum = require('./bignum');

class Int extends Bignum {
    constructor(number) {
        super();

        this.number = number.slice(number.indexOf('-') + 1);
        this.sign = this.number.indexOf('-') === 0;
    }

    toString() {
        return this.sign ? `-${this.number}` : this.number;
    }
}

module.exports = Int;
