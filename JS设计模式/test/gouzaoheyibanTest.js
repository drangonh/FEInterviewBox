/**
 * 构造函数和一般函数的区别
 * 构造函数继承的原型对象是一个实例
 * 所以下面创建的r1、r2的原型对象都是同一个对象
 * 所以只要修改一次,所有的继承对象的属性就会被修改
 */
function Flower() {
  this.colors = ['黄色', '红色'];
  this.print = function () {
    console.log(this.colors)
  }
}

function Rose() {}
Rose.prototype = Object.create(new Flower()); // ** 实例

var r1 = new Rose();
var r2 = new Rose();

console.log(r1.print()); // [ '黄色', '红色' ]
console.log(r2.print()); // [ '黄色', '红色' ]

r1.colors.push('紫色');

console.log(r1.print()); // [ '黄色', '红色', '紫色' ]
console.log(r2.print()); // [ '黄色', '红色', '紫色' ]


function Parent() {
  this.arr = ['黄色', '红色']
  this.name = 'dv'
}

function Son(age) {
  this.age = age
}
Son.prototype = Object.create(new Parent())
Son.prototype.construct = Son

let s = new Son(13)
let s1 = new Son(14)

s.name = 'dragon' // 这里修改的不是原型上的name属性,而是设置s本身的name属性为dragon
s.arr.push('zise')

console.log(s.name, s.arr)

console.log(s1.name, 's1::::', s1)

//--------------------------------

console.log('普通函数')

function test(n) {
  this.age = 30
  console.log(this)
}

test.prototype = Son
const ttt = new test()
console.log(ttt)