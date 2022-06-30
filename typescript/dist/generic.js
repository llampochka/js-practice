"use strict";
// Дженерики, или Generic Types, — обобщенные типы. Они нужны для описания похожих, но отличающихся какими-то характеристиками типов. 
// Мы описываем общую структуру, а конкретную уже определяет пользователь дженерика.
const currSigns = ['Rub', 'Forint']; // массив в котором данные типа CurrencySign
// с помощью дженерика мы передаем типу другой тип 
const arr = ['a', 'b']; // тоже дженерик
const key = 'value';
const key2 = 'value';
// const key3: PaymentKeys = 'test'; // Error: Type '"test"' is not assignable to type 'keyof Payment'
// Типизация функций 
function identity(arg) {
    return 'arg' + arg;
}
;
function returnArg(arg) {
    return arg;
}
;
console.log('returnArg number', returnArg(123)); // 123
console.log('returnArg string', returnArg('test')); // 'test'
const getLength = (arg) => {
    return arg.length; // тип у arg должен быть обязательно такой, чтобы имел свойство length => добавили extends
};
console.log('getLength arr', getLength([1, 2, 3])); // 3
console.log('getLength str', getLength('fewfew')); // 6
class IdentityClass {
    constructor(value) {
        this.value = value;
    }
    getIdentity() {
        return this.value;
    }
}
const identityInst = new IdentityClass('Tommy');
console.log('identityInst value', identityInst.getIdentity()); // Tommy (string)
const identityInst2 = new IdentityClass(55);
console.log('identityInst2 value', identityInst2.getIdentity()); // 55
// Охранники типов: Type Guards
const account = {
    name: 'tim',
    age: 25
};
console.log("typeof null === 'object'", typeof null === 'object'); // true засада! (по историческим причинам, что-то с выделением байтов в памяти)
class Currency {
}
const currency = new Currency;
console.log(currency instanceof Currency); // true - проверяем, является ли переменная экземпляром класса
// задачка: реализовать свой дженерик ReturnType по аналогии со встроенным
const fn = (v) => {
    if (v)
        return 1;
    else
        return 2;
};
