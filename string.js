console.log(5 + 2 - '3'); // 4
console.log(5 + 2 + '3'); // '73'
console.log(5 + 2 + - '3'); // 4
console.log('7' + - '3'); // '7-3'

let str = 'hello, super hero!';
if (~str.indexOf('super')) { // старый трюк, равнозначно str.indexOf('super') >= 0
    console.log('super is in str');
}

// современный вариант
if (str.includes('super')) {
    console.log('str includes super');
}

console.log(str.startsWith('he')); // true
console.log(str.endsWith('ro!')); // true

console.log(str.slice(1,2)); // e (start = 1, ends = 2, не включая endIndex)
console.log(str.slice(2)); // llo, super hero! (start = 2, и до конца строки)
console.log(str.slice(-2)); // o! (считаем от конца)
console.log(str.slice(-2, 17)); // o (считаем от конца 2 символа и до 17го символа)
console.log(str.slice(-5, -1)); // hero

str = 'string';
console.log(str.substring(1,3)); // tr
console.log(str.substring(3,1)); // tr (start > end, аргументы поменялись местами)
console.log(str.slice(3,1)); // '' - пустая строка, так не сработает

console.log(str.substr(1, 3)); // tri (1 - startIndex, 3 - количество символов) // deprecated

// правильное сравнение строк
console.log('Österreich'.localeCompare('Zealand')); // -1
console.log('Bim'.localeCompare('Abc')); // 1 


// String.raw игнорирует спецсимволы типа \n \t
console.log(String.raw`Hello\nworld`); // Hello\nworld