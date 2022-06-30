let a = 10;
let b = 20;

Number.prototype.plus = function(y) {
  console.log(this.valueOf());
  return this.valueOf() + y;
}

Number.prototype.minus = function(y) {
  return this.valueOf() - y;
}

console.log(a.plus(5));

// (2).plus(3).minus(1)

console.log((2).plus(3).minus(1));

console.log('next');

const test = function(joiner, ...args) {
  const res = args.join(joiner);
  return res;
}

console.log(test('*', '1', 'b', '1c'));

console.log('next');

const arr = [{date: '10.01.2017'}, {date: '10.01.2017'}, {date: '05.11.2016'}, {date: '21.13.2002'}];

const getTimeFromDate = (date) => {
  const dateArr = date.split('.');
  return new Date(dateArr[2], dateArr[1], dateArr[0]).getTime();
}

arr.sort(function (a, b) {
  a.time = getTimeFromDate(a.date);
  b.time = getTimeFromDate(b.date);

  if (a.time > b.time) {
        return 1;
      } else {
        return -1;
      }
});

console.log('arr res', arr);

// Выяснить, одинаковые ли буквы
let arr2 = ['кот', 'токк', 'октт']; // разная длина и повторяемость букв

const isSameLetters = (arr) => {    
  const arrSorted = arr.map(str => {
    const sortedStrArr = str.split('').sort(); // сортируем слово ['к', 'о', 'т'], ['к', 'к', 'о', 'т']

    // const obj = {}
    // sortedStrArr.forEach(letter => obj[letter] = ''); // оставляем уникальные буквы ['к', 'о', 'т'], ['к', 'о', 'т']
    // return Object.keys(obj).join(''); // возвращаем строку

    // другой способ оставить уникальные элементы массива
    return sortedStrArr.filter((item, index, self) => (self.indexOf(item) === index)).join('');
  })
//   console.log('arrSorted', arrSorted);
  return arrSorted.every(str => str === arrSorted[0]);
  console.log('arr str some', arr2);
}

console.log('is same letters', isSameLetters(arr2));

let x = eval([4, 2, 3, 7].join('+'));
console.log('x', x);

function delay(ms) {
  // ваш код
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

delay(3000).then(() => console.log('выполнилось через 3 секунды'));

function Book(name, author) {
    this.name = name;
    this.author = author;
    return this;
  }
  
  
  function Foo(BookClass, name, author) {
    const book = new BookClass(name, author);
    console.log(book.name);
    console.log(book.author);
  
    const book2 = Object.create(book);
    console.log(book2.name);
  }
  
  Foo(Book, 'Учебник javascript', 'Петр Сергеев');
  
  // палиндром
  function isPolyndrom(str) {
    const strPat = str.toLowerCase().split(/\s/).join('');
    let strArr = strPat.split('');
    console.log('strArr', strArr);
    let strReverse = strArr.reverse().join('');
    console.log('strReverse', strReverse);
  
    return strPat === strReverse;
  
  }
  
  function isPalindrom1(str) {
    let test = str.toLowerCase().replace(/[^а-яА-ЯёЁ]/g, '');
    console.log('test', test);
    if (str.toLowerCase().replace(/[^а-яА-ЯёЁ]/g, '') === str.toLowerCase().replace(/[^а-яА-ЯёЁ]/g, 
    '').split('').reverse().join('')) {
        return true;
     } else {
        return false;
     }
  }
  
  console.log('is polyndrom?', isPolyndrom('А   роза упала  на лапу Азора'));
  // console.log('is polyndrom2?', isPalindrom1('А роза упала на лапу Азора ыыы'));
  
  //seven(plus(one())) -> 8
  function one() {
    return 1;
  }
  
  function plus(x) {
    return '+' + x;
  }
  
  function seven(val) {
    return eval(7 + val);
  }
  
  console.log(seven(plus(one())));
  
  // проверить закрыты ли все скобки
  function areAllClosed(str) {
    const test = {
      circle: {opened: 0, closed: 0, ok: false},
      angular: 0,
      square: 0
    }
  
    // const arr = str.split('');
    const braces = [''];
  
    for(let i=0; i<str.length; i++){
      const sym = str[i];
  
      if (sym === '(') {
        test.circle.opened +=1
      }
      // console.log('test1', test);
  
      if (sym === ')') {
        if (!test.circle.opened || test.circle.closed >= test.circle.opened) {
          return false;
        } else {
          test.circle.closed +=1;
        }
      }
    };
    console.log('test', test);
  
    return test.circle.opened >0 && test.circle.opened === test.circle.closed;
  }
  
  console.log('areAllClosed', areAllClosed('())({}}{()][]['));
  console.log('areAllClosed', areAllClosed(')'));
  console.log('areAllClosed', areAllClosed(''));
  
  function validBraces(str) {
      try {
           eval(str);
           return true;
       } catch (err) {
           return false;
       }
  }
  
  console.log('areAllClosed valid', validBraces('{}[][[{}]]}'));
  
  var i = 10;
  var array = [];
  // var c = i--;
  // console.log('c', c); // 10
  
  while (--i) {
    console.log('i', i);
      (function (i) {
          var i= i;
          array.push(function() {
              return i + i;
          });
      })(i);
  }    
  
  console.log([
      array[0](), // 18
      array[1](), // 16
  ])
  
  var arrWithObjs = [
    {name: 'width', value: 10}, 
    {name: 'height', value: 20}
   ]
  
   function arrToObj(arr) {
     const obj = {};
      arr.forEach(item => {
        obj[item.name] = item.value
      })
      return obj;
   }
   
   // на выходе объект
   //{width: 10, height: 20}
   console.log('arrToObj', arrToObj(arrWithObjs));
  
   function unique(arr) {
     const obj = {};
     arr.forEach(item => {
       obj[item + 'x'] = ''
     })
     console.log(obj);
     return Object.keys(obj).map(item => parseInt(item.replace('x', '')));
   }
  
   function unique(arr) {
      return arr.filter((item, index, self) => (self.indexOf(item) === index));
  }
  
  console.log('uniq', unique([1, 1, 2, 2, 4, 2, 3, 7, 3])); // => [1, 2, 4, 3, 7]
  
  // расплющивание массива
  function flat2(arr) {
    let res = [];
    function handle(array) {
      array.forEach(item => {
        if (item instanceof Array) {
          console.log('item is arr', item);
          handle(item);
        } else {
          res.push(item);
        }
      })
    } 
    handle(arr);
    return res;
  }
  
  function flat3(arr) {
      let res = [];
      
      arr.forEach((item) => {
          if (Array.isArray(item)) {
              res = res.concat(flat(item));
          } else {
              res.push(item);
          }
      });
  
      return res;
  }
  
  const flat = (arr) => arr.join().split(',').map(el => parseInt(el))
  
  
  console.log(flat([1, [2, [3, [4,5]]]])); // => [1, 2, 3, 4, 5]
  
  // сжатие строк (Необходимо реализовать функцию, принимающую в аргументах строку, состоящую из букв и вернуть новую строку, в которой повторяющиеся буквы заменены количеством повторений.)
  function rle(str) {
    let res = str[0];
    let count = 1;
    for(i = 1; i < str.length; i++) {
      if (str[i] === str[i-1]) {
        count += 1;
      } else {
        if (count > 1){
          res += count;
        }
        res += str[i];       
        count = 1;
      }
  
      if (i === str.length - 1 && count > 1) {
        res += count;
      }
    }
    return res;
  }
  
  function rle(s) {
    return  s.replace(/(.)\1+/g, (m, c) => c + m.length);
  }
  console.log(rle('AAVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD')); // => 'AV3B3V2XDHJF4D6HA4J3D2SLS3D4'
                                                                   //    AV3B3V2XDHJF4D6HA4J3D2SLS3D4 