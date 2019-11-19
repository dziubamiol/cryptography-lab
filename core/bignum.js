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
                const aDigits = A.split('');
                const bDigits = B.split('');

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
     * Substr function return the subtruction of two Int instances
     * @property {Int} numA - first num to make subtruction
     * @property {Int} numB - second num to make subtruction
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

    /**
     * Mult function return the multiply of two Int instances
     * @property {Int} numA - first num to make multiply
     * @property {Int} numB - second num to make multiply
     * @return {Int}
     * */
    mult(numA, numB) {
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

        const aDigitsRev = a.number.split('').reverse();
        const bDigitsRev = b.number.split('').reverse();

        const sign = !!(a.sign ^ b.sign);
        const multResut = [];
        for (let i = 0; i < bDigitsRev.length; i++) {
            let extraDigit = 0;
            let digitMultiply = new Array(i).fill('0');
            for (let j = 0; j < aDigitsRev.length; j++) {
                const result = parseInt(aDigitsRev[j], 10) * parseInt(bDigitsRev[i], 10) + extraDigit;
                extraDigit = Math.floor(result / 10);
                digitMultiply.push((result % 10).toString());
            }
            if (extraDigit > 0) {
                digitMultiply.push(extraDigit.toString());
            }
            digitMultiply = digitMultiply.reverse().join('');
            multResut.push(new a.constructor(digitMultiply));
        }

        while (multResut.length > 1) {
            multResut[0] = this.sum(multResut[0], multResut[1]);
            multResut.splice(1, 1);
        }

        return new a.constructor(multResut[0].number, sign);
    }

    /**
     * Div function return the division of two Int instances
     * @property {Int} numA - first num to make multiply
     * @property {Int} numB - second num to make multiply
     * @return {Int}
     * */
    div(numA, numB, remainder = false) {
        let a = numA;
        let b = numB;

        // bug with eslint
        // eslint-disable-next-line no-unused-vars
        let remaind = remainder;
        if (this.constructor.name === 'Int' && !numB) {
            a = this;
            b = numA;
            remaind = !!numB;
        }
        const sign = !!(a.sign ^ b.sign);
        a = a.abs();
        b = b.abs();

        if (a.number.length < b.number.length) {
            if (remaind) {
                return new a.constructor(a.toString());
            }
            return new a.constructor('0');
        }

        let result = [];
        let i = 0;
        const aDigits = a.number.split('');
        while (aDigits.length > 0) {
            let digit = 0;
            const processingDigits = aDigits.splice(0, i === 0 ? b.number.length : 1);

            while ((new a.constructor(processingDigits.join(''))).compare(b, '<') && aDigits.length > 0) {
                result.push('0');
                processingDigits.push(aDigits.splice(0, 1).join(''));
                if (processingDigits[0] === '0') {
                    while (processingDigits[0] === '0') {
                        processingDigits.splice(0, 1);
                    }
                }
            } if ((new a.constructor(processingDigits.join(''))).compare(b, '<') && aDigits.length === 0) {
                result = result.concat((new Array(processingDigits.length).fill('0')));
            }

            const processingNumber = new a.constructor(processingDigits.join(''));
            let multiply = b.mult(new a.constructor(digit.toString()));

            while (multiply.compare(processingNumber, '<')) {
                digit++;
                multiply = b.mult(new a.constructor(digit.toString()));
            }
            multiply = b.mult(new a.constructor(digit.toString()));
            if (!multiply.compare(processingNumber, '<') && !multiply.compare(processingNumber, '==')) {
                digit--;
                multiply = b.mult(new a.constructor(digit.toString()));
            }
            if (digit !== 0) {
                result.push(digit.toString());
            }
            const unshift = processingNumber.substr(multiply).number;

            if (unshift !== '0' && !!aDigits[0]) {
                aDigits[0] = unshift + aDigits[0];
            }
            i++;
        }

        result = result.reverse();
        truncateZero(result);
        result = result.reverse();

        const r = result.join('');
        return new a.constructor(r, sign);
    }

    /**
     * Sqrt function return square root of Int instance
     * @property {Int} num - num to calculate sqrt
     * @return {Int}
     * */
    sqrt(num) {
        let a = num;

        if (this.constructor.name === 'Int' && !num) {
            a = this;
        }

        if (a.compare(new a.constructor('0'), '<')) {
            throw new Error('Smaller than zero');
        }

        let resultN = a.copy().div(new a.constructor('2'));
        let resultN1 = a.copy().div(new a.constructor('2'));
        let iterate = true;
        while (iterate) {
            const divisionSonX = a.div(resultN);
            const sum = resultN.sum(divisionSonX);
            resultN1 = sum.div(new a.constructor('2'));

            iterate = !resultN.compare(resultN1, '==');
            resultN = resultN1;
        }

        return resultN1;
    }

    /**
     * Pow function return the power of two Int instances
     * @property {Int} num - num to make power
     * @property {Int} numB - power
     * @return {Int}
     * */
    pow(num, power) {
        let a = num;
        let pwr = power;

        if (this.constructor.name === 'Int' && !power) {
            a = this;
            pwr = num;
        }

        let result = new a.constructor('1');
        while (!pwr.compare(new a.constructor('0'), '==')) {
            result = result.mult(a);
            pwr = pwr.substr(new a.constructor('1'));
        }

        return result;
    }
}


module.exports = Bignum;
