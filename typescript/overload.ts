// Перегрузка функций - это возможность создавать несколько одноименных функций с разными реализациями.

// Исходя из документации, порядок указания перегрузок предполагает переход от более ограничивающих к менее ограничивающим.

function helloWorld(): number; // 1я перегрузка
function helloWorld(s: string): string; // 2я перегрузка
// function helloWorld(): Date; // Ошибка: Данная сигнатура перегрузки не совместима с сигнатурой ее реализации 
function helloWorld(s?: string) { // основная функция
  if (!s) {
    return Math.random();
  }
  return s;
}

// ❎ x имеет тип string 
const x = helloWorld('test');
// ❎ y имеет тип number 
const y = helloWorld();

// еще один вариант вместо перегрузки - это необязательные параметры в функции или union типы
function foo(name: string, text: string | number, age?: number): string | number {
    return age? age : name;
}

// Перегрузка конструктора (yне нашал нигде норм примера, везде обычно можно заменить необязательными параметрами или union типами)
interface IUserData {
    name: string;
    fullname: string;
    age: number;
}
class User {
    public name: string;

    constructor();
    constructor(name?: string) {
        if (typeof name === 'string') {
            this.name = name;
        } else  {      
            this.name = 'dqedfe';
        }       
    }
}