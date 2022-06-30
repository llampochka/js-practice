"use strict";
// Перегрузка функций - это возможность создавать несколько одноименных функций с разными реализациями.
// function helloWorld(): Date; // Ошибка: Данная сигнатура перегрузки не совместима с сигнатурой ее реализации 
function helloWorld(s) {
    if (!s) {
        return Math.random();
    }
    return s;
}
// ❎ x имеет тип string 
const x = helloWorld('test');
// ❎ y имеет тип number 
const y = helloWorld();
// еще один вариант вместо перегрузки - это необязательные параметры в функции или union типы
function foo(name, text, age) {
    return age ? age : name;
}
class User {
    constructor(name) {
        if (typeof name === 'string') {
            this.name = name;
        }
        else {
            this.name = 'dqedfe';
        }
    }
}
