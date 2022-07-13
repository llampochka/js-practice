function Person() {
    // В конструкторе Person() `this` указывает на себя.
    this.age = 0;
    this.name = 'Tom';
  
    setTimeout(function growUp() {
      // В нестрогом режиме, в функции growUp() `this` указывает
      // на глобальный объект, который отличается от `this`,
      // определяемом в конструкторе Person().
      this.age++;
      console.log(this.age); // NaN
      console.log(this.name); // undefined
    }, 1000);

    setTimeout(() => {
        this.age++;
        console.log(this.age); // 1 - берет this из окружающего лексического окружения
      }, 1500);

    this.changeName = function changeName() {
        this.name = 'Bob'
        test(); // this.name from test undefined
        test2(); // this.name from test2 Bob
    }

    const test = function() {
        console.log('this.name from test', this.name);
    }

    const test2 = () => {
        console.log('this.name from test2', this.name);
    }
  }
  
const p = new Person();
p.changeName();

console.log('p.name', p.name) // Bob