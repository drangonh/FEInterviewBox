/**
 * 如果B继承A,那么b的实例在设置原型链上属性的值的时候如果是简单类型的属性,可以直接给b本身属性赋值
 * 如果是对象,b直接操作原型链上的对象属性,会更改原型上的属性值,造成其他B的实例被污染
 * 可以用类似setArr,通过传入的this指向,为子类进行赋值而不污染其他B的实例对象
 * 也可以在B的构造函数加入A.call(this),让new B()的时候用A进行实例对象,但是A的this是只想B的
 */
const Drinks = function () {
  this.name = '222'
  this.arr = {}
  this.firstStep = function () {
    console.log('烧开水');
  };
  this.setName = function (name) {
    console.log('this::', this)
    this.name = name;
  }
  this.setArr = function (arr) {
    this.arr = arr
  }
  
};
Drinks.prototype.tt = 44
Drinks.prototype.test = function () {
}

const Tea = function () {
  // Drinks.call(this)
}
let d = new Drinks()
Tea.prototype = d;

Tea.prototype.firstStep = function (t) {
  console.log(t)
}


console.log(d)
console.log(d.__proto__)


let t = new Tea();
let t1 = new Tea();
t.setName('hl')
t.setArr({ d: 3 })
console.log(t)
console.log(t1)
console.log(d)