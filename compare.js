console.log('NaN == NaN', NaN == NaN); // false
console.log('NaN != NaN', NaN != NaN); // true

/*
Если типы x и y совпадают, то возвращаем результат строгого сравнения. 
То есть, сравниваем их значения (или ссылки, если это объекты). Единственная особенная ситуация тут — NaN, который не равен сам себе.
Если один из операндов null, а второй undefined, возвращаем true.
Если один из операндов типа String, а второй — Number, то приводим String к Number, а затем переходим к п. 1.
Если один из операндов типа Boolean, приводим его к Number.
Если один из операндов типа Object, приводим его к примитиву и начинаем сравнение заново, с п. 1.
Иначе возвращаем false.

При преобразовании в число null становится 0, а undefined становится NaN.

К примитиву: Метод valueOf возвращает сам объект => ,берем Object.toString = [object Object]
[1,2,3] => к строке '1,2,3'
[].valueOf() => ''
*/
console.log('"0" == 0', "0" == 0); // true
console.log('"0" == false', "0" == false); // true - false приводится к 0
console.log('"" == false', "" == false); // true
console.log('"0" == ""', "0" == ''); // false
console.log('0 == ""', 0 == ''); // true
console.log('({}) == true', {} == true); // false:  true приводится к 1
console.log('{} == {}', {} == {}); // false
console.log('[] == ""', [] == ''); // true ([].valueOf() => '')
console.log('{} == ""', {} == ''); // false

console.log('null == undefined', null == undefined); // true
console.log('null === undefined', null === undefined); // false




// странные задачки с сайта https://alf.nu/ReturnTrue?world=true&level=MpzFxM%2Fm6YDFIi0-7TbjsWLUEsCbucotBaf6#accesstoken=9v27FmGwdtVWKeP70Uwi
function transitive(x,y,z) {
    return x && x == y && y == z && x != z;
}


console.log('transitive', transitive('0',0,'')); // true
console.log('transitive2', transitive({},'[object Object]',{})); // true
console.log('transitive3', transitive([], '', [])); // true
console.log('transitive4', transitive([], 0, [])); // true



let x = Number.MAX_SAFE_INTEGER;
console.log('Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER)
console.log('x++ === x', x++ === x, 'x=', x)

function counter(f) {
    var a = f(), b = f();
    return a() == 1 && a() == 2 && a() == 3
        && b() == 1 && b() == 2;
}
const myFunc = (x = 0) => _ => ++x;
let test = myFunc();
console.log('test()', test());
console.log('test()', test());
console.log('counter', counter(myFunc));

x = {__proto__: Array.prototype};
console.log('Array.isArray(x)', Array.isArray(x)); // false
console.log('x instanceof Array', x instanceof Array); // true

x = Object;
y = Function;
console.log('x instanceof y', x instanceof y); // true
console.log('y instanceof x', y instanceof x); // true
console.log('x == y', x === y); // false

function undef(x) {
    // return { undefined: { undefined: 1 } }[typeof x][x];
}
// console.log('undef(x)', undef(document.all));

console.log('typeof null', typeof null); // object

function truth(x) {
    return x.valueOf() && !x;
}
console.log('truth(x)', truth('',''.__proto__.valueOf=_=>1));

