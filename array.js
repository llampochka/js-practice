// Удаляем повторяющиеся элементы массива
const nums = [9, 2, 3, 4, 5, 6, 6, 7, 8, 8, 5]
const uniqNums = [...new Set(nums)] // [9,2,3,4,5,6,7,8] - 
console.log('uniqNums', uniqNums);

// Ещё способ оставить только уникальные знаечния
console.log('uniqNums with filter', [1, 2, 2, 4, 4, 5, 6, 7, 3].filter((item, index, self) => self.indexOf(item) === index));

// map - возвращает новый массив
const arr1 = [1, 2, 3];
console.log('array map', arr1.map(v => v + 10)) // [ 11, 12, 13 ]

// every - возвращает true если каждый элемент удовлетворяет условию, иначе false
console.log('array every', [10, 20, 30].every(v => v % 2 == 0)) // true

// some - возвращает true если хотя бы 1 элемент удовлетворяет условию, иначе false
console.log('array some', [10, 25, 35].some(v => v % 2 == 0)) // true

// уникальные элементы в массиве объектов, используем Set

const arrObjNotUnique = [
    { name: 'test', value: 2 },
    { name: 'test2', value: 3 },
    { name: 'test', value: 2 },
    { name: 'test', value: 4 }
];

const arrObjUnique = [...new Set(arrObjNotUnique.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
console.log('arrObjUnique', arrObjUnique);

// пересечение массивов
const arrOne = [2, 3, 5, 6, 1, 7, 2, 5];
const arrTwo = [1, 2, 3, 4, 8];

// оставляем только уникальные !
const intersection = arrOne.filter(item1 => arrTwo.includes(item1)).filter((item, index, self) => self.indexOf(item) === index);
console.log('intersection', intersection); //  [ 2, 3, 1 ]

// разница массивов
const difference = arrOne.filter(item1 => !arrTwo.includes(item1));
console.log('difference', difference); // [ 5, 6, 7, 5 ]

// симметричная разница - в итоговом массиве будут все элементы из А которых нет в В и все элементы в В, которых нет в А
const symDiff = arrOne.filter(item1 => !arrTwo.includes(item1)).concat(arrTwo.filter(item2 => !arrOne.includes(item2)));
console.log('Symmetric difference', symDiff); // [ 5, 6, 7, 5, 4, 8 ]

// объединение массивов
const concat = arrOne.concat(arrTwo);
console.log('Concat arrays', concat);
console.log('Concat arrays with ...', [...arrOne, ...arrTwo]);
console.log('Concat arrays unique with ... and Set', [...new Set([...arrOne, ...arrTwo])]);

// пересечение массивов объектов
const arrObj2 = [
    { name: 'test', value: 2 },
    { name: 'test', value: 4 }
];

let intersectionObjs = arrObjNotUnique.filter(item1 => arrObj2.some(item2 => JSON.stringify(item2) === JSON.stringify(item1)));
intersectionObjs = [...new Set(intersectionObjs.map(item => JSON.stringify(item)))].map(item => JSON.parse(item)); // оставляем уникальные

console.log('intersectionObjs', intersectionObjs);

// задача от Google
// дано: массив целых чисел (неупорядоченный) и число, если сумма любых двух элементов массива == числу => true
const checkSumWithSome = (arr, sum) => {
    return arr.some((item1, index1) => {
        return arr.some((item2, index2) => {
            return item1 + item2 === sum && index1 != index2
        })
    })
}

// ускоряем с помощью Set, тк временная сложность перебора массива O(N), а Set - O(1):
const checkSumWithSet = (arr, sum) => {
    const sumDiff = new Set();
    if (sum - arr[0] > 0) {
        sumDiff.add(sum - arr[0]);
    }
    for (let i = 1; i < arr.length; i++) {
        if (sumDiff.has(arr[i])) {
            return true;
        } else {
            // console.log('sumDiffSet', sumDiff);
            sum - arr[i] > 0 && sumDiff.add(sum - arr[i]);
        }
    }
    return false;
};

const checkSum = checkSumWithSet;

const testArr = [1, 6, 3, 11, 8, 11, 1, 5, 7, 5];
console.log('checkSum 5:', checkSum(testArr, 5));
console.log('checkSum 2:', checkSum(testArr, 2));
console.log('checkSum 1:', checkSum(testArr, 1));
console.log('checkSum 11:', checkSum(testArr, 11));
console.log('checkSum 10:', checkSum(testArr, 10));

// Задачка: дано - массив 0 и 1, найти 1 максимально удаленную от других 1
// for example: [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0] - res index = 7, 10

const findIntrovertOne = (arr) => {
    const left = [];
    const right = [];
    const zeroAroundSum = [];

    for (let i = 0; i < arr.length; i++) {
        left[i] = 0;
        right[i] = 0;

        if (arr[i] === 1 && i > 0) {

            // считаем 0 слева
            for (let j = i - 1; j >= 0; j--) {
                if (arr[j] == 0) {
                    left[i] += 1;
                } else {
                    break;
                }
            }

            // считаем 0 справа
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] == 0) {
                    right[i] += 1;
                } else {
                    break;
                }
            }
        }

        zeroAroundSum[i] = left[i] + right[i]; // вопрос, что считать самым удаленным от других единиц

    }

    console.log('left', left);
    console.log('right', right);
    console.log('zeroAroundSum', zeroAroundSum);

    let max = Math.max.apply(null, zeroAroundSum); // максимальный элемент в массиве
    console.log('max', max);

    const aloneIndexes = [];
    zeroAroundSum.forEach((val, index) => {
        if (val === max) {
            aloneIndexes.push(index);
        }
    });

    return aloneIndexes;

}

arrOnesAndZeros = [1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0];
console.log('max alone 1 indexes is:', findIntrovertOne(arrOnesAndZeros));

// копирование массивов
const arrA = [1, 2, 3];
const arrCopy = arrA;
arrA.push(5);
console.log('arrCopy', arrCopy); // [ 1, 2, 3, 5 ] - копирование по ссылке, как и с объектами

// для массивов не из объектов и других массивов
const arrCopy2 = arrA.slice(0); // так быстрее чем просто slice()
arrA.push(6);
console.log('arrCopy2', arrCopy2); // [ 1, 2, 3, 5 ] - 6 не добавилось

// поверхностное копирование не работает для массивов объектов
const arrB = [{ name: 'Tom' }, { name: 'Jerry' }];

const arrCopy3 = arrB.slice(0);
arrB[0].name = 'Bob';
console.log('arrCopy3', arrCopy3); // [ { name: 'Bob' }, { name: 'Jerry' } ] - name изменилось, тк объекты хранятся как ссылки 

const arrCopy4 = [].concat(arrB);
arrB[0].name = 'Tim';
console.log('arrCopy4', arrCopy4); // [ { name: 'Tim' }, { name: 'Jerry' } ] - тоже не работает как надо
arrCopy4[0].name = 'Joe';
console.log('arrB', arrB); // исходный тоже меняется при изменении копии

const arrCopy5 = [...arrB];
arrB[0].name = 'Sam';
console.log('arrCopy5', arrCopy5); // [ { name: 'Sam' }, { name: 'Jerry' } ] - та же фигня
arrCopy5[0].name = 'Bim';
console.log('arrB', arrB); // исходный тоже меняется при изменении копии

const arrCopy6 = arrB.map(el => el);
arrB[0].name = 'Bred';
console.log('arrCopy6', arrCopy6);  // [ { name: 'Bred' }, { name: 'Jerry' } ] - та же фигня
arrCopy6[0].name = 'Bim';
console.log('arrB', arrB); // [ { name: 'Bim' }, { name: 'Jerry' } ]

// нормальный метод только lodash _.deepClone !!!

// передача массива в функцию
const testFunc = (arr) => {
    arr.push(7)
    console.log('arr in func', arr);
};
testFunc(arrA);

console.log('arrA after func', arrA); // [ 1, 2, 3, 5, 6, 7 ] - 7 добавилось к исходному массиву

// typeof Array = object
console.log('typeof arrA', typeof arrA);

// reduce
const arraySum = [1, 2, 3, 4].reduce((acc, curr) => {
    return acc + curr;
}, 10)
console.log('arraySum', arraySum); // 20

// splice array.splice(startIndex, count) = return array[] of deleted elems
const arrayOne = [1, 3, 7, 5, 6, 9, 8];
console.log('array splice was:', arrayOne);
console.log('spliced arr from 2 elem 3 elems = ', arrayOne.splice(2, 3)) // [ 7, 5, 6 ]
console.log('array splice now:', arrayOne); // [ 1, 3, 9, 8 ]
console.log('spliced arr from 2 to the end = ', arrayOne.splice(2)) // [ 9, 8 ]

const arr = ['a', 'b', 'c'];
for (let [index, elem] of arr.entries()) {
    console.log(index, ': ', elem);
}

const obj = {
    name: 'Tom',
    age: 25
}

for (let [index, elem] of Object.entries(obj)) {
    console.log(index, ': ', elem);
}

// test git ssh