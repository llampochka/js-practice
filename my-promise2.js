/*
 вторая реализация промиса с учетом цепочки .then
*/

class MyPromise {
    #thenFn = () => {console.log('default thenFn')};
    #catchFn = () => {};

    #deffered = [];
    // result = this;
    // test = 0;

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

        setTimeout(() => {
            return fn(this.resolve.bind(this), this.reject.bind(this))
        });
        
    }

    resolve(data) {
        if (this.#state === this.#states.pending) {  
            try {          
                this.#state = this.#states.fulfilled;
                this.handleDeffered(data);
            } catch(e) {
                this.#state = this.#states.rejected;
                this.handleDeffered(e); 
            }
        }        
    }

    reject(err) {
        if (this.#state === this.#states.pending) {
            this.#state = this.#states.rejected;
            this.handleDeffered(err);          
        }
    }

    handleDeffered(dataOrErr) {
        
        // console.log('this.#deffered', this.#deffered);
        this.#deffered.forEach((defObject) => {

            const callback = this.#state === this.#states.fulfilled ? defObject.onResolved : defObject.onRejected;
            // let result;

            if (callback != null) {
                this.result = callback(dataOrErr);                    
            }            
            // this.test++;
        });
        
    }

    then(onResolved, onRejected) {
        const promise = new this.constructor(() => {});
        this.#deffered.push({
            onResolved: onResolved,
            onRejected: onRejected
        });
        // console.log('this.test', this.test);
        return this
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    /*
        принимает набор промисов и возвращает один промис, в результате .then() которого массив результатов всех
    */
    static all(promises) {   
        console.log('all +++++++++++++++++++++++++'); 
        let results = [];
        let count = 0;

        
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                promises.forEach((promise, index) => {
                    console.log('promise', promise);
                    promise.then(res => {
                        count += 1;
                        results[index] = res;
                        console.log('res', res);
                        if (results.length === promises.length) {
                            resolve(results);
                        }
                    }).catch(err => {
                        reject(err);
                    })
                })
                // resolve(results);
                // console.log('all results', results);
            });
        });

        
    }

    static testAll(arr) {
        console.log('testAll arr', arr);
    }

}

// testPromise = new MyPromise(() => {
//     console.log('tested MyPromise constructor')
// })

const promiseTimeout = new MyPromise((resolve, reject) => {
    console.log('create promise');
    // resolve('resolved');    
    setTimeout(() => {
        
        resolve('promiseTimeout resolved');
        // reject('errroorrr');
    }, 1000)
});

const promise2 = new MyPromise((resolve, reject) => {
    resolve('promise2 resolved');
    // // reject('promise 2 error');
    // setTimeout(() => {
        
    //     resolve('promise2 timeout resolved');
    //     // reject('errroorrr');
    // }, 100)
});

// promiseTimeout.then(data => {
//     console.log('resolved data', data);
//     // throw new Error('err2');
//     return promise2;
// })
// .then(data => {
//     console.log('resolved data 2', data);
//     // throw new Error('err3');
// })
// .catch(err => 
//     console.log('rejected', err?.message || err));

// MyPromise.testAll([promiseTimeout, promise2]); 

promise2.then(res => console.log('promise2 test res', res))

MyPromise.all([promise2, promiseTimeout]).then(res => {
    console.log('promise all result', res);
})    
                