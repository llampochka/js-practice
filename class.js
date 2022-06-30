// Это синтаксический сахар для new Func(), с некоторыми особенностями
// Например: Классы всегда используют use strict. Весь код внутри класса автоматически находится в строгом режиме.


class User {
    static lang = 'en';
    _age = 25; // _  соглашение между программистами, что приватные свойства и методы не должны быть доступны извне.

    // приватное свойство
    // Мы не можем получить к нему доступ извне или из наследуемых классов.
    #habbit; // Новая возможность js, Эта возможность была добавлена в язык недавно. В движках JavaScript пока не поддерживается или поддерживается частично, нужен полифил.

    constructor(name) {
        this.name = name;
        this.#habbit = 'sport';
    }

    greeting() {
        console.log('Hello, I am ', this.name); // by default this.name = undefined
    }

    get fullName() { // getter
        return this.name + ' full';
    }

    static hello() {
        console.log('Just hello');
        console.log('this', this); // this == [class User]
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (age < 18) {
            throw Error('Too young');
        } else {
            this._age = parseInt(age);
        }
    }

    showHabbit() {        
        console.log('habbit', this.#habbit);
    }
}

// console.log('User', User);

const user = new User('Bob');
user.greeting(); // Hello, I am  Bob

console.log('user.fullName', user.fullName); // Bob full

class Admin extends User {
    bye() {
        console.log('Chuuus');
    }

    showHabbitFromChild() {
        // не будет работать, так как #habbit приватное свойство класса родителя
        console.log('habbit from child', this.#habbit);
    }
}

const admin = new Admin('Admin Tom');
admin.greeting(); // Hello, I am  Admin Tom
admin.bye(); // Chuuus

User.hello(); // Just hello - без создания экземпляра, this [class User]
// user.hello(); // TypeError: user.hello is not a function

console.log('admin lang', Admin.lang); // en - унаследовали статитческое свойство

// Приватные свойства
admin.age = '20 лет';
console.log('admin age', admin.age); // 20

// admin.age = 15; // Error: Too young

// console.log('user.#habbit', user.#habbit); // SyntaxError: Private field '#habbit' must be declared in an enclosing class
user.showHabbit(); // habbit sport
admin.showHabbit(); // habbit sport
// admin.showHabbitFromChild(); // SyntaxError: Private field '#habbit' must be declared in an enclosing class