function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}
generator = makeRangeIterator(0, 2);

console.log(generator.next()); // 0
console.log(generator.next()); // 1
console.log(generator.next()); // 2

console.log(generator.next()); // undefined, done: true

function* startGame() {
    const answer = yield "Do you love JavaScript?";
    if (answer !== "Yes") {
      return "Oh wow... Guess we're gone here";
    }
    return "JavaScript loves you back ❤️";
  }
  
  const game = startGame();
  console.log(game.next().value); // Do you love JavaScript?
  // если передать в next аргумент, он заменит предыдущий yield
  console.log(game.next('Yes').value); // JavaScript loves you back ❤️