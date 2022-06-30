// тк мы не можем унаследоваться от нескольких классов => помогут mixins

class Animal {
    feed(): void {
        console.log('feed');
    }
}

class Car {
    private _type: string;
    constructor(type: string) {
        this._type = type
    }

    get type(): string {
        return this._type;
    }

    showType(): void {
        console.log('my type is', this._type);
    }
}

class Movable1 {
    move(): void {
        console.log('move');
    }
}

// сначала попробуем решить проблему с помощью implements
class Horse1 extends Animal implements Movable1 {
    move(): void {
        console.log('move horse'); // нам приходится реализовывать метод move(), а он уже есть, это дублирование кода
    }
}

// используем mixins
type Constructor = new (...args: any[]) => {};

function mixWithMovable<TBase extends Constructor>(Base: TBase) {
    return class Movable extends Base {
        move(): void {
            console.log('moving');
        }
    }
}

const Horse = mixWithMovable(Animal);

const horse = new Horse;
horse.move(); // moving

const MovableCar = mixWithMovable(Car);
const myCar = new MovableCar('jetta');
myCar.showType();
myCar.move();
