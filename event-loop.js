// Микро и макро таски

console.log(1);
// Первая строка выполняется сразу и выводит `1`.
// Очереди микрозадач и макрозадач на данный момент пусты.

setTimeout(() => console.log(2));
// `setTimeout` ставит переданный колбэк в очередь макрозадач
// - содержимое очереди макрозадач:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// В очередь микрозадач ставится колбэк, выводящий `3`
// - содержимое очереди микрозадач:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// В очередь микрозадач ставится колбэк с `setTimeout`
// - содержимое очереди микрозадач:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// В очередь микрозадач ставится колбэк, выводящий `5`
// - содержимое очереди микрозадач:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` ставит переданный колбэк в очередь макрозадач
// - содержимое очереди макрозадач:
//   `console.log(2); console.log(6)`

console.log(7); // сразу

// output 1 7 3 5 2 6 4

// порядок: 
// 1. основной стэк
// 2. микрозадачи (Promise.then/catch/finally)
// 3. макрозадачи (setTimeout, setInterval, ajax)

