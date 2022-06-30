let animal = {
    jumps: null
};
let rabbit = {
    __proto__: animal, // старинный способ установки прототипа объекта
    // Не рекомендован спецификацией. Используйте Object.setPrototypeOf или Object.create (предпочтительнее). 
    jumps: true
};

console.log(rabbit.jumps); // true

delete rabbit.jumps;

console.log(rabbit.jumps); // null

delete animal.jumps;

console.log(rabbit.jumps); // undefined

let monkey = Object.create(animal); // создали новый объект с прототипом animal
animal.eat = function() {
    console.log('I eat!');
}
monkey.eat();

// Протоипное наследование с функциями-конструкторами

function Rabbit(name) {
    this.name = name;
 }
// по умолчанию:
// Rabbit.prototype = { constructor: Rabbit }

Rabbit.prototype = {}; // не надо так делать, переписываем внутренний конструктор

rabbit = new Rabbit('Bob');
console.log('rabbit', rabbit); // rabbit { name: 'Bob' }

let lazyRabbit = new rabbit.constructor('Tom'); 
console.log('lazyRabbit', lazyRabbit); // lazyRabbit [String: 'Tom'], тк переписали Rabbit.prototype = {};

function Person() {
    this.type = 'human';
    this.addAge = function (age) {
        this.age = age;
    }
};

// Person.addName = function(name) { // так нельзя: методы нужно добавлять через prototype!
//     console.log('person name', name);
// }

// const student = new Person();
// student.addName('Bob'); // TypeError: student.addName is not a function

Person.prototype.addName = function(name) {
    this.name = name;
}

const student = new Person();
student.addName('Bob');
console.log('student', student); // Person { type: 'human', addAge: [Function (anonymous)], name: 'Bob' } - addName тут не выводится

function Driver(name) {
    this.auto = 'bmw';
    this.name = name;
}

// правильное задание прототипа для конструкторов
Driver.prototype = Object.create(Person.prototype);

const driver = new Driver('Tim');
console.log('driver', driver); // Person { auto: 'bmw', name: 'Tim' }

// driver.addAge(25); - TypeError, тк addAge принадлежит непосредственно Person, a не его прототипу, а мы унаследовались от Person.prototype
driver.addName('Bim');
console.log('driver', driver); // Person { auto: 'bmw', name: 'Bim' }

