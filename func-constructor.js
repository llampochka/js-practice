// Используется, чтобы создавать несколько однотипных объектов 
// в es6 это уже классы
// Функции-конструкторы являются обычными функциями. Но есть два соглашения:

// Имя функции-конструктора должно начинаться с большой буквы.
// Функция-конструктор должна вызываться при помощи оператора "new".


function Person(firstName, lastName) {
    // this = {};  (неявно)

    this.firstName = firstName;
    this.lastName = lastName;

    // return this;  (неявно)
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith"); // без new не работает как функция конструктор

Person.test = () => { // работает, потому что функция это тоже объект!
    return 'test is ok'
}

console.log(lydia); // Person { firstName: 'Lydia', lastName: 'Hallie' }
console.log(sarah); // undefined
console.log('Person.test()', Person.test()); // test is ok

function User(name) {
    this.name = name;
    this.age = 33;

    return {name: 'Bob', test: 25}

    // return 'bbbb'; // если вернуть не объект, проигнорится и вернет this
}

const user = new User('Tom');
console.log('user', user); // { name: 'Bob', test: 25 } тк вернули объект в функции конструкторе, вместо this

function testThis() {
    this.name = 'Bim';
    this.greeting = 'Hello, ' + this.name;
    return this.greeting;
}

console.log('testThis', testThis()); // hello bim