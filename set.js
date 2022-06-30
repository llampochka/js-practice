// Set - коллекции уникальных значений

const mySet = new Set();

mySet.add(1);
mySet.add({
    name: 'test',
    value: 2
})

console.log('mySet', mySet); // mySet Set(2) { 1, { name: 'test', value: 2 } }

mySet.add(1); // игнорируется

console.log('mySet2', mySet); // mySet Set(2) { 1, { name: 'test', value: 2 } }

const obj = {name: 'test3', value: 5};

// уникальные элементы в массиве объектов, используем Set
const arr = [
    { name: 'test', value: 2 },
    { name: 'test2', value: 3 },
    { name: 'test', value: 2 },
    { name: 'test', value: 4 },
    obj
];
console.log('arr', arr);

const arrUnique = [...new Set(arr)];
console.log('arrUnique', arrUnique); // не сработает, тк видимо каждый элемент это уникальная ссылка на объект

const arrUnique2 = [...new Set(arr.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
console.log('arrUnique2', arrUnique2); // так сработает!

const myObjSet = new Set(arr);
console.log('myObjSet.size', myObjSet.size);
console.log('has object 1:', myObjSet.has({ name: 'test', value: 2 })); // false
console.log('has object 2:', myObjSet.has(obj)); // true! (помним про ссылки на объекты в памяти)

const myObjSet2 = new Set({ name: 'test2', value: 3 }, { name: 'test', value: 2 });

const str = 'word';
const strSet = new Set(str);
console.log('strSet', strSet); // strSet Set(4) { 'w', 'o', 'r', 'd' }


