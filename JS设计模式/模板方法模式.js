/**
 * Created by lin on 2018/8/16.
 * 模板模式:
 * 由两部分结构组成，第一部分是抽象父类，
 * 第二部分是具体的实现子类，子类通过继承抽象类，也继承了整个算法结构。
 */

const Drinks = function() {};

Drinks.prototype.firstStep = function() {
  console.log('烧开水');
};

Drinks.prototype.secondStep = function() {};

Drinks.prototype.thirdStep = function() {
  console.log('倒入杯子');
};

Drinks.prototype.fourthStep = function() {};

Drinks.prototype.init = function() {
  // 模板方法模式核心：在父类上定义好执行算法
  this.firstStep();
  this.secondStep();
  this.thirdStep();
  this.fourthStep();
};

const Tea = function() {};

Tea.prototype = new Drinks();

Tea.prototype.secondStep = function() {
  console.log('浸泡茶叶');
};

Tea.prototype.fourthStep = function() {
  console.log('加柠檬');
};

const Coffee = function() {};

Coffee.prototype = new Drinks();

Coffee.prototype.secondStep = function() {
  console.log('冲泡咖啡');
};

Coffee.prototype.fourthStep = function() {
  console.log('加糖');
};

const tea = new Tea();
tea.init();

// 烧开水
// 浸泡茶叶
// 倒入杯子
// 加柠檬

const coffee = new Coffee();
coffee.init();

// 烧开水
// 冲泡咖啡
// 倒入杯子
// 加糖

// 假如客人不想加佐料(糖、柠檬)怎么办，这时可以引人钩子来实现之，实现逻辑如下：
// ...

Drinks.prototype.ifNeedFlavour = function() {
  // 加上钩子
  return true;
};

Drinks.prototype.init = function() {
  // 模板方法模式核心：在父类上定义好执行算法
  this.firstStep();
  this.secondStep();
  this.thirdStep();
  if (this.ifNeedFlavour()) {
    // 默认是 true，也就是要加调料
    this.fourthStep();
  }
};

// ...
const Coffee2 = function() {};

Coffee2.prototype = new Drinks();
// ...

Coffee2.prototype.ifNeedFlavour = function() {
  return window.confirm('是否需要佐料吗？'); // 弹框选择是否佐料
};
