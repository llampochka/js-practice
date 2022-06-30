/*
 первая сырая реализация промиса без учета цепочки промисов
*/

class MyPromise {
    #thenFn = () => {console.log('default thenFn')};
    #catchFn = () => {};

    #states = {
        pending: "pending",
        rejected: "rejected",
        fulfilled: "fulfilled"
    }

    #state = this.#states.pending;

    constructor(fn) {
        // при создании экземпляра класса MyPromise мы сразу вызываем функцию, которую указали при создании
        // и передаем туда наши внутренние реализации resolve и reject
        // таким образом в new MyPromise() => { // resolve(data) }
        // при вызове resolve - вызывается этот внутренний resolve
        return fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(data) {
        if (this.#state === this.#states.pending) {            
            setTimeout(() => { // это нужно, чтобы .then сработало в любом случае и успело прицепиться
                try {
                    console.log('try this.#thenFn(data)');
                    this.#state = this.#states.fulfilled;
                    // пока на промисе не вызовем .then() => this.#thenFn = () => {console.log('default thenFn')}; (по умолчанию)
                    // как только передадим в then callback
                    // this.#thenFn = callback
                    return this.#thenFn(data)
                }  catch(e) {
                    console.log('catch error');
                    this.#state = this.#states.rejected;
                    return this.#catchFn(e)
                }                
            }, 0)            
        }        
    }

    reject(err) {
        if (this.#state === this.#states.pending) {
            this.#state = this.#states.rejected;
            setTimeout(() => {
                return this.#catchFn(err)
            }, 0)            
        }
    }

    then(onResolved, onRejected) {
        if (onResolved) {
            this.#thenFn = onResolved
        }

        if (onRejected) {
            this.#catchFn = onRejected
        }
        return this
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
}

// testPromise = new MyPromise(() => {
//     console.log('tested MyPromise constructor')
// })

const promiseTimeout = new MyPromise((resolve, reject) => {
    console.log('create promise');
    // resolve('resolved');    
    setTimeout(() => {
        
        resolve('resolved');
        // reject('errroorrr');
    }, 1000)
});

promiseTimeout.then(data => {
    console.log('resolved data', data);
    // throw new Error('err2');
})
.then(data => {
    console.log('resolved data 2', data);
})
.catch(err => 
    console.log('rejected', err?.message || err))
                