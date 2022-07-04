function getName(obj) {
    return obj?.name;
}

function loggerDecorator(fn) {
    return function(...args){
        console.log(`Logging... ${args.join(",")}`);
        return fn(...args);
    }
}

const obj = {
    name: 'Tom'
}

const loggedGetName = loggerDecorator(getName);

console.log('getName', getName(obj))
console.log('loggedGetName', loggedGetName(obj))