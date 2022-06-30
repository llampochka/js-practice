"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MinLengthValidator {
    constructor(minLength) {
        this.minLength = 0;
        this.minLength = minLength;
    }
    isAcceptable(s) {
        return s.length > this.minLength;
    }
}
const str = 'r31r3r13r';
const minLengthValidator5 = new MinLengthValidator(5);
const minLengthValidator10 = new MinLengthValidator(10);
console.log('MinLengthValidator 5', minLengthValidator5.isAcceptable(str));
console.log('MinLengthValidator 10', minLengthValidator10.isAcceptable(str));
const user = {
    name: 'Tom',
    age: 25,
    // sport: 'football' // error - в IUser нет такого поля
};
const cat = {
    type: 'cat',
    name: 'Bob'
};
