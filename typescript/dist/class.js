"use strict";
class Person {
    constructor() {
        this.type = 'human'; // необязательно реализовывать в наследнике
    }
}
Person.ver = '5.2.3';
class Admin extends Person {
    constructor(age) {
        super();
        this.name = 'Tom'; // обязательно нужно реализовать поле abstract в наследнике
        this.age = age;
    }
    getId() {
        return Math.random().toFixed(2);
    }
    getName() {
        return this.name;
    }
}
Admin.test = 'Test static';
// const person = new Person(); // ошибка: нельзя создать экземпляр абстрактного класса
const admin = new Admin(35);
console.log('admin.type', admin.type); // human - поле родителя
console.log('admin.name', admin.name); // Tom
console.log('admin.getName', admin.getName()); // Tom
console.log('admin.getId', admin.getId()); // random number like 0.52
console.log('get static prop of Admin', Admin.test); // Test static
console.log('get static prop of Person', Person.ver); // 5.2.3
console.log('get extended static prop of Admin', Admin.ver); // 5.2.3 - можем вызвать статическое свойство родителя
// console.log('get private', admin.age) // ошибка
