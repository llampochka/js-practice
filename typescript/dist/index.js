"use strict";
// npx tsc index.ts - компилировать
// npx tsc -w - режим наблюдения (чтобы не компилировать каждый раз)
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = 'world';
function hello(word = world) {
    return `Hello ${world}! `;
}
exports.hello = hello;
console.log(hello());
// Array
const scores = [1, 2, 3]; // массив чисел
// использование дженерика
const scores2 = [1, 2, 3];
// Tuple - массив с элементами разных типов
let student = ['Bob', 123];
console.log('student', student);
const user = {
    name: 'Tom',
    age: 25,
    // role: 'admin' // будет ошибка, в типе нет такого поля
};
console.log('user', user);
function move(direction) {
    console.log('move', direction);
}
move('up');
// move('rrr'); // ошибка, тип не подходит
var Directs;
(function (Directs) {
    Directs["left"] = "left";
    Directs["right"] = "right";
    Directs["up"] = "up";
    Directs["down"] = "down";
})(Directs || (Directs = {}));
move(Directs.down);
function move2(direction) {
    console.log('move', direction);
}
move2(Directs.left);
// нельзя теперь напрямую использовать строки, даже если кажется, что все совпадает
// move2('up'); // Error: Argument of type '"up"' is not assignable to parameter of type 'Direction2'
// numeric enums работают странновато
var ZeroOrOne;
(function (ZeroOrOne) {
    ZeroOrOne[ZeroOrOne["Zero"] = 0] = "Zero";
    ZeroOrOne[ZeroOrOne["One"] = 1] = "One";
})(ZeroOrOne || (ZeroOrOne = {}));
const zeroOrOne = 2; // no error!!
function printLoginState(state) {
    if (state.state === 'success') { // field 'state' общее для 2х типов
        console.log('Login ok!');
    }
    else {
        console.log('Login failed!');
    }
}
printLoginState({ state: "success", response: 'ok' });
const client = {
    name: 'Tim',
    work() {
        console.log('I am working');
    }
};
client.work();
// Enums - используется для набора конкретных значений
// аналог с помощью js
const enumDays = Object.freeze({
    monday: 0,
    sunday: 7
});
// enumDays.tuesday = 1; // Error: Property 'tuesday' does not exist on type 'Readonly<{ monday: number; sunday: number; }>'
console.log('enumDays.monday', enumDays.monday);
var Days;
(function (Days) {
    Days[Days["Monday"] = 0] = "Monday";
    Days[Days["Tuesday"] = 1] = "Tuesday"; // 1
})(Days || (Days = {}));
console.log('Days.Monday', Days.Monday);
// лучше не использовать enum как тип, вместо этого union
let day = Days.Tuesday;
day = 10; // не вызовет ошибки, это плохо
console.log('day', day); // 10
// Inference
let text = 'hello'; // TypeScript проверяет данные, присвоенные переменной, и считает текст переменной типом String
function testPet(pet) {
    // pet.doSmth(); // error - не находит метод
    pet.doSmth(); // когда в какой-то ситуации точно знаем, что будет Cat, а не Monkey
}
const kitty = {
    name: 'Boba',
    doSmth: () => {
        console.log('meow');
    }
};
testPet(kitty); // meow
testPet({ name: 'Biba' }); // ошибка, передали не Cat
