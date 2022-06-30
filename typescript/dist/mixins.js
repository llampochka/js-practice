"use strict";
// тк мы не можем унаследоваться от нескольких классов => помогут mixins
class Animal {
    feed() {
        console.log('feed');
    }
}
class Car {
    constructor(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }
    showType() {
        console.log('my type is', this._type);
    }
}
class Movable1 {
    move() {
        console.log('move');
    }
}
// сначала попробуем решить проблему с помощью implements
class Horse1 extends Animal {
    move() {
        console.log('move horse'); // нам приходится реализовывать метод move(), а он уже есть, это дублирование кода
    }
}
function mixWithMovable(Base) {
    return class Movable extends Base {
        move() {
            console.log('moving');
        }
    };
}
const Horse = mixWithMovable(Animal);
const horse = new Horse;
horse.move(); // moving
const MovableCar = mixWithMovable(Car);
const myCar = new MovableCar('jetta');
myCar.showType();
myCar.move();
