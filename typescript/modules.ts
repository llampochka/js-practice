import { StringValidator } from "./exports";
import IUser from "./exports"; // без {}
import * as models from "./exports2"

class MinLengthValidator implements StringValidator {
    private minLength: number = 0;
    
    constructor(minLength: number) {
        this.minLength = minLength;
    }

    isAcceptable(s: string): boolean {
        return s.length > this.minLength
    }
}
const str = 'r31r3r13r';
const minLengthValidator5 = new MinLengthValidator(5);
const minLengthValidator10 = new MinLengthValidator(10);
console.log('MinLengthValidator 5', minLengthValidator5.isAcceptable(str))
console.log('MinLengthValidator 10', minLengthValidator10.isAcceptable(str))

const user: IUser = {
    name: 'Tom',
    age: 25,
    // sport: 'football' // error - в IUser нет такого поля
}

const cat: models.IAnimal = {
    type: 'cat',
    name: 'Bob'
}