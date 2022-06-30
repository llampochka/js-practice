// Дженерики, или Generic Types, — обобщенные типы. Они нужны для описания похожих, но отличающихся какими-то характеристиками типов. 
// Мы описываем общую структуру, а конкретную уже определяет пользователь дженерика.

type CurrencySign = 'Eur' | 'Rub' | 'Forint';

const currSigns: Array<CurrencySign> = ['Rub', 'Forint']; // массив в котором данные типа CurrencySign
// с помощью дженерика мы передаем типу другой тип 

const arr: Array<string> = ['a', 'b']; // тоже дженерик

// keyof
type Payment = {
    value: number,
    sign: string
};

type ObjectKeys<T> = keyof T; // ObjectKeys - дженерик тип, принимает аргументом объект, ключи которого нам нужны

type PaymentKeys = ObjectKeys<Payment>; // Union type => 'value' | 'sign'
// ==
type PaymentKeys2 = keyof Payment;

const key: PaymentKeys = 'value';
const key2: PaymentKeys2 = 'value';
// const key3: PaymentKeys = 'test'; // Error: Type '"test"' is not assignable to type 'keyof Payment'

// Типизация функций 
function identity(arg: string): string { // здесь мы знаем, что функция должна вернуть тип string
    return 'arg' + arg
};
function returnArg<T>(arg: T): T { // а здесь заранее не знаем, а вернет она тот тип, который ей передали <T>
    return arg;
};
console.log('returnArg number', returnArg<number>(123)); // 123
console.log('returnArg string', returnArg<string>('test')); // 'test'

// Generic constraints
type WithLength = {
    length: number
}
const getLength = <T extends WithLength>(arg: T): number => {
    return arg.length; // тип у arg должен быть обязательно такой, чтобы имел свойство length => добавили extends
}
console.log('getLength arr', getLength<number[]>([1, 2, 3])); // 3
console.log('getLength str', getLength<string>('fewfew')); // 6

// Типизация классов
interface IdentityGetter<Type> {
    getIdentity(): Type;
}

class IdentityClass<Type> implements IdentityGetter<Type> {
    private value: Type;

    constructor(value: Type) {
        this.value = value;
    }

    getIdentity(): Type {
        return this.value
    }
}

const identityInst = new IdentityClass<string>('Tommy');
console.log('identityInst value', identityInst.getIdentity()); // Tommy (string)

const identityInst2 = new IdentityClass<number>(55);
console.log('identityInst2 value', identityInst2.getIdentity()); // 55

// Охранники типов: Type Guards
const account = {
    name: 'tim',
    age: 25
}
type Account = typeof account; // {name: string, age: number}

console.log("typeof null === 'object'", typeof null === 'object'); // true засада! (по историческим причинам, что-то с выделением байтов в памяти)

class Currency { }
const currency = new Currency;
console.log(currency instanceof Currency); // true - проверяем, является ли переменная экземпляром класса

// задачка: реализовать свой дженерик ReturnType по аналогии со встроенным
const fn = (v: boolean) => {
    if (v)
        return 1
    else
        return 2
}

type MyReturnType<T> = T extends (...arg:any) => infer R ? R : never;

type a = MyReturnType<typeof fn> // should be "1 | 2"
type b = ReturnType<typeof fn> // "1 | 2"