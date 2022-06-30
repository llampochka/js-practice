const arr = [1, 20, 10, 8, 2, 1]

let arrSorted = [...arr];
arrSorted.sort();

// по умолчанию результат не такой как ожидали, тк сравнивает как строки
console.log('arrSorted', arrSorted); // [ 1, 10, 15, 2, 20, 8 ]

let arrSorted2 = [...arr];
arrSorted2.sort((a, b) => a - b);
console.log('arrSorted2', arrSorted2); //  [ 1, 2, 8, 10, 15, 20 ] - как надо

arrSorted2.sort((a, b) => b - a);
console.log('arrSorted2', arrSorted2); //  [ 20, 15, 10, 8, 2, 1 ] - по убыванию

// метод пузырька
// Алгоритм состоит из повторяющихся проходов по сортируемому массиву. 
// За каждый проход элементы последовательно сравниваются попарно и, если порядок в паре неверный, выполняется обмен элементов. 
// Проходы по массиву повторяются N-1 раз или до тех пор, пока на очередном проходе не окажется, что обмены больше не нужны,
// что означает — массив отсортирован. 
function sortBubble(arr) {
    const startTime = new Date().getTime();
    let stepsCount = arr.length;

    let swapped;

    do {
        swapped = false;
        for (let i = 1; i < stepsCount; i++) {
            if (arr[i] < arr[i - 1]) {
                let elem = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = elem;
                swapped = true;
            }
        }
        // после первого прохода (и так после каждого) максимальный элемент оказывается в конце массива, и в следующий проход нам не нужно его проверять
        // => 
        stepsCount -= 1;
    } while (swapped)

    const endTime = new Date().getTime();
    console.log('time', `${endTime - startTime} ms`)
    return arr;
}

const randomArr = (() => {
    const arr = [];
    for (let i = 0; i < 10e3; i++) {
        arr.push(Math.round(Math.random() * 10))
    }
    return arr;
})()

// console.log('randomArr', randomArr);

let arrSortedbubble = sortBubble(arr);
console.log('arrSortedbubble', arrSortedbubble);

let arrSortedbubbleRandom = sortBubble(randomArr);

// решение покороче, идея в том, чтобы заполнять новый массив, вставляя туда минимальный элемент каждый раз и удаляя его из исходного
function sortMy(arr) {
    const startTime = new Date().getTime();
    /* 
     1й вариант подробный
    */
    // const res = [];
    // while (arr.length) {
    //     let min = Math.min(...arr);
    //     res.push(min);
    //     arr.splice(arr.indexOf(min), 1);  
    // }
    // return res;

    /*
    2й вариант супер короткий
    arr.splice(arr.indexOf(Math.min(...arr)), 1) - возвращает массив из удаленных элементов, поэтому берем 0 значение этого массива и вставляем в результат
    */
    let res = [];
    while (arr.length)  { res.push(arr.splice(arr.indexOf(Math.min(...arr)), 1)[0]) };

    const endTime = new Date().getTime();
    console.log('time', `${endTime - startTime} ms`)
    return res;
}    
let arr2 = [2, 4, 2, 20, 5, 1];
console.log('Math.min(arr)', Math.min(...arr2))
let arrSortedMy = sortMy(arr2);
console.log('sortMy', arrSortedMy);