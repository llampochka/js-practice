// Переменная хранит не сам объект, а его «адрес в памяти», другими словами «ссылку» на него.
// функции это объекты! (Всё есть объект кроме примитивов).

let user1 = new Object(); // синтаксис "конструктор объекта"
let user2 = {};  // синтаксис "литерал объекта"

const prop = 256;
const propObj = {
    test: 123
}
const propObj2 = {
    test: 789
}
propObj2.toString = (obj) => {
    return 'fff';
}

const age = 25;

let user3 = {
    name: 'Tom',
    "second name": 'Jerry',
    [prop]: 'test', // prop - вычисляемое свойство, приводится к строке
    [propObj]: 'test2', // '[object Object]': 'test2' - объект приводится к строке, таким вот образом по умолчанию
    [propObj2]: 'test3', // fff: 'test3' - тк переписали дефолтный метод toString()
    age, // вместо age: age, если нужно значение из переменной
}

console.log('user3', user3);

// проверка существования свойства
console.log('prop in obj', 'name' in user3); // true

// перебрать свойства
for (let key in user3) {
    console.log('user: ', key, user3[key]);
    // output 
    // порядок будет по порядку добавления свойств в объект, кроме числовых ключей ("256" может преобразоваться в число), они отсортируются как числа

    // user:  256 test
    // user:  name Tom
    // user:  second name Jerry
    // user:  [object Object] test2
    // user:  fff test3
    // user:  age 25
}

// копирование объектов
const user = {
    name: 'Tom',
    age: 30,
    sport: {
        type: 'football',
        years: 5
    }
}

let admin = user; // копируется ссылка
admin.age = 30;
console.log('user.age', user.age); // 30

let userCopy = { name: 'Jerry' };
Object.assign(userCopy, user);
console.log('userCopy', userCopy); // userCopy { name: 'Tom', age: 30, sport: { type: 'football', years: 5 } }, name перезаписан
// or
const userCopy2 = Object.assign({}, user);
console.log('userCopy2', userCopy2);

// проблема: Object.assign() делает поверхностную копию, внутренние объекты копируютмя по ссылке, если изменить в исходном объекте - поменяется и в копии
user.sport.type = 'hockey';
console.log('userCopy2', userCopy2); // userCopy2.sport.type = 'hockey'

// решение 1:
const userCopy3 = JSON.parse(JSON.stringify(user));
user.sport.type = 'dance';
console.log('userCopy3', userCopy3); // userCopy2.sport.type = 'hockey' - не изменилось
// минусы: не работает для циклических объектов и если есть методы, гряный и медленный способ
// JSON.stringify/parse работает только с литералом Number, String и Object без функции или свойства Symbol.

// способ с ... Spread (оператор расширения):
const userCopy4 = { ...user };
user.sport.type = 'box';
console.log('userCopy4', userCopy4); // userCopy4.sport.type = 'box'; - та же проблема, что и у Object.assign()

// решение - _deepClone из lodash или свой написать аналогичный

// передача объекта в функцию
const testFunc = (user) => {
    user.age = 35;
    console.log('user in func', user);
};
testFunc(user);

console.log('user after func', user); // user.age - изменился, тк в функцию тоже по ссылке передается

// чтобы точно вернуть новый объект (но внутренние объекты все равно будут иметь проблемы)
const testFunc2 = (user) => {
    const userCopy = {...user}
    userCopy.age = 45;
    console.log('user in func', user);
    return userCopy;
};
const newUser = testFunc2(user);
console.log('user after func2', user); // user.age не изменился
console.log('newUser after func2', newUser); 


// сравнениие: Два объекта равны только в том случае, если это один и тот же объект.
console.log('{} === {}', {} === {}); // false
console.log('{} == {}', {} == {}); // false
console.log('{age} === {age}', { age } === { age }); // false

const a = { test: 1, value: 2 }
const b = { test: 1, value: 2 }
const c = { value: 2, test: 1 }

// вариант 1
console.log('JSON {} === {}', JSON.stringify(a) === JSON.stringify(b)); // true

// но если свойства перечислены не в том же порядке, не сработает
console.log('JSON {} === {}', JSON.stringify(a) === JSON.stringify(c)); // false

// лучше использовать _.isEqual из lodash

const person = {
    name: 'Tom',
    sayHello() {
        console.log('Hello from person', this.name)
    },
    sayBye: () => {
        console.log('Bye from person', this.name) // потеряли this при стрелочной функции
    },
    method: {
        name: 'Method 1',
        printName() {
            console.log('Method 1 name', this.name) // Method 1 name Method 1
        },
        printNameOfPerson: () => {
            console.log('Method 1 person name', this.name) // не работает, ищет this в глобальном скоупе
        }
    }
}
person.sayHello(); // Hello from person Tom
person.sayBye(); // Bye from person undefined
person.method.printName(); // Method 1 name Method 1
person.method.printNameOfPerson(); // Method 1 person name undefined 

// Опциональная цепочка
console.log('person?.prop?.test', person?.prop?.test); // undefined - возвращает undefined, как только натолкнется на несуществующий объект/свойство

// set/get
Object.defineProperty(person, 'age', {
    set: function (age) { this._age = parseInt(age) },
    get: function () { return this._age }
})

person.age = '20 лет';
console.log('person.age', person.age); // 20

// freeze
const frosen = Object.freeze({
    name: 'Bim' // нельзя удалить, изменить, добавить новое свойство, изменить перечисляемость
});
frosen.name = 'Tom'; // не применится
frosen.age = 25; // тихо ничего не добавит, а в строгом режиме будет TypeError
console.log('frosen', frosen); // { name: 'Bim' }

// seal
const sealed = Object.seal({
    name: 'Bom' // можно изменить значение, нельзя удалить, добавить новое
});
sealed.age = 25; // не добавилось
delete sealed.name; // не удалилось
sealed.name = 'Tom'; // изменилось
console.log('sealed', sealed); // { name: 'Tom' }

var status = 'status1'

setTimeout(() => {
    const status = 'status2'

    const data = {
        status: 'status3',
        getStatus() {
            return this.status
        }
    }

    console.log(data.getStatus()) // status3

    // В функциях ключевое слово this относится к объекту, которому принадлежит функция. 
    // в данном случае setTimeout принадлежит объекту global
    console.log(data.getStatus.call(this)) // undefined
}, 0)

const info = {
    [Symbol('a')]: 'b' // Symbol является неперечисляемым свойством
}

console.log('info', info)
console.log('Object.keys(info)', Object.keys(info))

var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};

console.log('foo.x', foo.x); // undefined

let xx = 5;
let z;
let yy = xx = 10;
z = yy = 15;
console.log('xx', xx, 'yy', yy, 'z', z); // xx 10 yy 15 z 15

// test for git 22