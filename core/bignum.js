function truncateZero(array) {
    while (array[array.length - 1] === '0' && array.length > 1) {
        array.pop();
    }
}


class Bignum {
    /**
     * Compare function return the comparison result of two Int instances
     * @property {Int} numA - first num to make sum
     * @property {Int} numB - second num to make sum
     * @property {string} operator - '>' '<' '=='
     * @return {boolean} true false
     * */
    compare(numA, numB, operator) {
        let a = numA;
        let b = numB;
        let method = operator;
        if (this.constructor.name === 'Int' && !operator) {
            a = this;
            b = numA;
            method = numB;
        }

        const comp = (A, B, reverse = false) => {
            if (A.length > B.length) {
                return reverse ? 2 : 1;
            }
            if (A.length < B.length) {
                return reverse ? 1 : 2;
            }
            if (A.length === B.length) {
                const aDigits = A.split('').reverse();
                const bDigits = B.split('').reverse();

                for (let i = 0; i < A.length; i++) {
                    if (reverse && aDigits[i] !== bDigits[i]) {
                        return aDigits[i] > bDigits[i] ? 2 : 1;
                    }
                    if (!reverse && aDigits[i] !== bDigits[i]) {
                        return aDigits[i] > bDigits[i] ? 1 : 2;
                    }
                }
                return 0;
            }
            return -1;
        };

        // bug inside eslint, disable for result 'cause we change it value anyway
        // eslint-disable-next-line no-unused-vars
        let result; // 1 - 'a' is higher 2 - 'b' is higher 0 - equal -1 - error;

        if (a.sign && !b.sign) {
            result = 2;
        } else if (!a.sign && b.sign) {
            result = 1;
        } else if (a.sign === b.sign) {
            if (a.sign) {
                result = comp(a.number, b.number, true);
            } else {
                result = comp(a.number, b.number);
            }
        }

        if (method === '>') {
            return result === 1;
        }
        if (method === '<') {
            return result === 2;
        }
        if (method === '==') {
            return result === 0;
        }

        return false; // if error
    }

    /**
     * Sum function return the sum of two Int instances
     * @property {Int} numA - first num to make sum
     * @property {Int} numB - second num to make sum
     * @return {Int}
     * */
    sum(numA, numB) {
        let a = numA;
        let b = numB;

        if (this.constructor.name === 'Int' && !numB) {
            a = this;
            b = numA;
        }

        if (a.sign && !b.sign) {
            return this.substr(b, a.abs());
        } if (!a.sign && b.sign) {
            return this.substr(a, b.abs());
        } if (a.sign && b.sign) {
            const number = this.sum(a.abs(), b.abs());
            number.sign = true;
            return number;
        }

        if (a.number.length < b.number.length) {
            const temp = a;
            a = b;
            b = temp;
        }

        const aDigitsRev = a.number.split('').reverse();
        const bDigitsRev = b.number.split('').reverse();

        while (bDigitsRev.length < aDigitsRev.length) {
            bDigitsRev.push('0');
        }

        let extraDigit = 0;
        for (let i = 0; i < aDigitsRev.length; i++) {
            const digitSum = parseInt(aDigitsRev[i], 10) + parseInt(bDigitsRev[i], 10) + extraDigit;
            extraDigit = Math.floor(digitSum / 10);
            aDigitsRev[i] = (digitSum % 10).toString();
        }
        if (extraDigit === 1) {
            aDigitsRev.push('1');
        }

        let r = aDigitsRev;
        truncateZero(r);
        r = r.reverse().join('');

        return new a.constructor(r);
    }

    /**
     * Substr function return the substruction of two Int instances
     * @property {Int} numA - first num to make sum
     * @property {Int} numB - second num to make sum
     * @return {Int}
     * */
    substr(numA, numB) {
        let a = numA;
        let b = numB;
        let sign = false;

        if (this.constructor.name === 'Int' && !numB) {
            a = this;
            b = numA;
        }

        // resolve signs for result
        if (!a.sign && b.sign) {
            return this.sum(a, b.abs());
        } if (a.sign && !b.sign) {
            const number = this.sum(a.abs(), b);
            number.sign = true;
            return number;
        } if (a.sign && b.sign) {
            return this.substr(b.abs(), a.abs());
        }

        if (a.number.length < b.number.length) {
            const temp = a;
            a = b;
            b = temp;
            sign = true;
        } else if (a.number.length === b.number.length) {
            if (this.compare(a, b, '<')) {
                const number = this.substr(b, a);
                number.sign = true;
                return number;
            }
        }

        const aDigitsRev = a.number.split('').reverse();
        const bDigitsRev = b.number.split('').reverse();

        while (bDigitsRev.length < aDigitsRev.length) {
            bDigitsRev.push('0');
        }

        for (let i = 0; i < bDigitsRev.length; i++) {
            let digit = parseInt(aDigitsRev[i], 10) - parseInt(bDigitsRev[i], 10);
            if (digit < 0) {
                aDigitsRev[i + 1] = (parseInt(aDigitsRev[i + 1], 10) - 1).toString();
                digit = 10 + digit;
            }
            aDigitsRev[i] = digit.toString();
        }

        let j = aDigitsRev.length - 1;
        while (aDigitsRev[j] === '0') {
            aDigitsRev.pop();
            j++;
        }
        if (aDigitsRev.length === 0) {
            aDigitsRev[0] = '0';
        }

        let r = aDigitsRev;
        truncateZero(r);
        r = r.reverse().join('');

        return new a.constructor(r, sign);
    }
}


module.exports = Bignum;
