// Map - коллекция ключ/значение, где ключом может быть любой тип, даже объект

const myMap = new Map();
const obj = {
    name: 'Alena',
    habbit: 'hockey'
};

myMap.set('test', 1);
myMap.set(obj, 123);

console.log('myMap', myMap); // myMap Map(2) { 'test' => 1, { name: 'Alena', habbit: 'hockey' } => 123 }

console.log('myMap obj val', myMap.get(obj)); // 123
console.log('myMap obj val', myMap.get({
    name: 'Alena',
    habbit: 'hockey'
})); // undefined, тк объекты сравниваются по ссылкам

// перебор
for (item of myMap) {
    console.log('myMap item', item); // myMap item [ 'test', 1 ], myMap item [ { name: 'Alena', habbit: 'hockey' }, 123 ]
    console.log('item 0', item[0]); // test, ...
}

// map.keys() – возвращает итерируемый объект по ключам,
// map.values() – возвращает итерируемый объект по значениям,
// map.entries() – возвращает итерируемый объект по парам вида [ключ, значение], этот вариант используется по умолчанию в for..of.

console.log('myMap.keys():', myMap.keys()); // [Map Iterator] { 'test', { name: 'Alena', habbit: 'hockey' } } - это не массив!

const keysAsArr = Array.from(myMap.keys());
console.log('myMap keysAsArr:', keysAsArr); // теперь это массив

// Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.

const aclean = (arr) => {
    const wordsMap = new Map();
    for (word of arr) {
        const sortedWord = word.toLowerCase().split('').sort().join('');
        console.log('sortedWord', sortedWord);
        wordsMap.set(sortedWord, word);
    }
    return Array.from(wordsMap.values());
}

const arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
console.log('aclean arr', aclean(arr));

