const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise1 resolved');
    }, 500)
    // resolve('123')
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise2 resolved');
    }, 0)
})

const promise3 = new Promise((resolve, reject) => {
    resolve('promise3 resolved');
})

const promiseErr = new Promise((resolve, reject) => {
    reject('promiseErr err');
})

promise1.then(res => console.log(res)).catch(e => console.log(e))
promise2.then(res => console.log(res)).catch(e => console.log(e))
promise3.then(res => console.log(res)).catch(e => console.log(e))
/*
promise3 resolved
promise2 resolved
promise1 resolved
*/


Promise.all([promise1, promise2, promise3]).then(res => console.log('Promise all res', res)).catch(e => console.log('Promise all err', e))
// => Promise all res [ 'promise1 resolved', 'promise2 resolved', 'promise3 resolved' ] (по порядку в массиве аргументов)

// Цепочка промисов
promise1.then(res => {
    console.log('Promises chain - promise1 res:', res);
    return promise2
}).then(res => {
    console.log('Promises chain - promise1 step2 then res:', res);
})
/*
Promises chain - promise1 res: promise1 resolved
Promises chain - promise1 step2 then res: promise2 resolved
*/

// Цепочка промисов - один упал
promise1.then(res => {
    console.log('Promises chain2 - step1 res:', res);
    return promise2
}).then(res => {
    console.log('Promises chain2 - step2 then res:', res);
    return promiseErr
}).then(res => {
    console.log('Promises chain2 - step3 then res:', res);
}).catch(e => {
    console.log('Promises chain2 err', e);
})

// не одно и тоже, тк если в f1 внутри произойдет ошибка
// promise.then(f1).catch(f2); // ошибка будет обработана
// promise.then(f1, f2); // не будет обработана

async function getData() {
    return await Promise.resolve("I made it!");
}

const data = getData();
console.log('data', data); // data Promise { <pending> }, причем выведется в самом начале, тк остальной код на странице попадет в стек позже

console.log('--- start test Promise chain');
Promise.resolve(10)
  .then(e => console.log(e)) // 10
  .then(e => Promise.resolve(e)) // e - undefined, тк в предыдущем then не вернули никакого значения
  .then(console.log) // undefined
  .then(e => {
    if (!e) {
      throw 'Error caught';
    }
  })
  .catch(e => {
    console.log(e); // Error caught
    return new Error('New error');
  })
  .then(e => {
    console.log('why then after catch?');  
    console.log(e.message); //
  })
  .catch(e => {
    console.log(e.message); //  сюда не попадем
  });