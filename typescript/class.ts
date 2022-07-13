abstract class Person {
    abstract name: string;
    type = 'human'; // необязательно реализовывать в наследнике
    public abstract getId(): string; 
    static ver = '5.2.3'
}

interface IGetName {
    getName(): string;
}

class Admin extends Person implements IGetName {
    public name = 'Tom'; // обязательно нужно реализовать поле abstract в наследнике

    getId(): string { // обязательно нужно реализовать метод abstract в наследнике
        return Math.random().toFixed(2)
    }

    getName() { // обязательно нужно реализовать метод интерфейса IGetName
        return this.name
    }

    static test = 'Test static';

    private age: number;

    constructor(age: number) {
        super();
        this.age = age;
    }
}

// const person = new Person(); // ошибка: нельзя создать экземпляр абстрактного класса

const admin = new Admin(35);

console.log('admin.type', admin.type) // human - поле родителя
console.log('admin.name', admin.name) // Tom
console.log('admin.getName', admin.getName()) // Tom
console.log('admin.getId', admin.getId()) // random number like 0.52
console.log('get static prop of Admin', Admin.test) // Test static
console.log('get static prop of Person', Person.ver) // 5.2.3
console.log('get extended static prop of Admin', Admin.ver) // 5.2.3 - можем вызвать статическое свойство родителя

// console.log('get private', admin.age) // ошибка