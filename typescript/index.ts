// npx tsc index.ts - компилировать
// npx tsc -w - режим наблюдения (чтобы не компилировать каждый раз)

const world = 'world';

export function hello(word: string = world): string {
    return `Hello ${world}! `;
}

console.log(hello());

// Array
const scores: number[] = [1, 2, 3]; // массив чисел

// использование дженерика
const scores2: Array<number> = [1, 2, 3];

// Tuple - массив с элементами разных типов
let student: [string, number] = ['Bob', 123];
console.log('student', student);

// Alias - свой собственный тип
type User = {
    name: string,
    age: number,
    sport?: string // необязательный
};

const user: User = {
    name: 'Tom',
    age: 25,
    // role: 'admin' // будет ошибка, в типе нет такого поля
};
console.log('user', user);

// Union
type Direction = 'left' | 'right' | 'up' | 'down';
function move(direction: Direction): void {
    console.log('move', direction);
}
move('up');
// move('rrr'); // ошибка, тип не подходит

enum Directs { // перечисления
    left = 'left',
    right = 'right',
    up = 'up',
    down = 'down'
}
move(Directs.down);

// можем задать Union тип, используя перечисления
type Direction2 = typeof Directs[keyof typeof Directs];
function move2(direction: Direction2): void {
    console.log('move', direction);
}
move2(Directs.left);
// нельзя теперь напрямую использовать строки, даже если кажется, что все совпадает
// move2('up'); // Error: Argument of type '"up"' is not assignable to parameter of type 'Direction2'

// numeric enums работают странновато
enum ZeroOrOne {
    Zero = 0,
    One = 1
}
const zeroOrOne: ZeroOrOne = 2; // no error!!

type ZeroOrOne2 = 0 | 1;
// const zeroOrOne2: ZeroOrOne2 = 2; // будет ошибка

// Discriminated Union - присвоение общего ключа для совместного использования внутри типа Union
type SuccessState = {
    state: 'success',
    response: string
};

type ErrorState = {
    state: 'fail',
    error: Error
}
type LoginState = SuccessState | ErrorState;
function printLoginState(state: LoginState): void {
    if (state.state === 'success') { // field 'state' общее для 2х типов
        console.log('Login ok!')
    } else {
        console.log('Login failed!')
    }
}

printLoginState({state: "success", response: 'ok'});

// Intersection - в отличие от Union вместо || => &
type Person = {
    name: string
}
type Worker = {
    work: () => void
}
type Client = Person & Worker; // клиент и человек и работает еще
const client: Client = { // объект должен содержать все поля из 2х типов
    name: 'Tim',
    work() {
        console.log('I am working')
    }
}
client.work();

// Enums - используется для набора конкретных значений

// аналог с помощью js
const enumDays = Object.freeze({
    monday: 0,
    sunday: 7
});
// enumDays.tuesday = 1; // Error: Property 'tuesday' does not exist on type 'Readonly<{ monday: number; sunday: number; }>'
console.log('enumDays.monday', enumDays.monday);

enum Days {
    Monday, // 0 - по умолчанию
    Tuesday // 1
}
console.log('Days.Monday', Days.Monday);

// лучше не использовать enum как тип, вместо этого union
let day: Days = Days.Tuesday;
day = 10; // не вызовет ошибки, это плохо
console.log('day', day) // 10

// Inference
let text = 'hello'; // TypeScript проверяет данные, присвоенные переменной, и считает текст переменной типом String

// Type assertion - приведение к типу 
type Monkey = {
    name: string
}
type Cat = {
    name: string,
    doSmth: () => void
}
type Pet = Monkey | Cat; // Union
function testPet(pet: Pet): void {
    // pet.doSmth(); // error - не находит метод
    (pet as Cat).doSmth(); // когда в какой-то ситуации точно знаем, что будет Cat, а не Monkey
}
const kitty: Cat = {
    name: 'Boba',
    doSmth: () => {
        console.log('meow');
    }
};
testPet(kitty); // meow
testPet({name: 'Biba'}); // ошибка, передали не Cat

// type unknown