// 这是一个计算器的例子，将每一个具体操作以对象的形式进行封装，计算器接收到我们的请求后，
// 对发出具体的命令，是+，-，还是*/。这样，我们把请求传给计算器，计算器来具体执行需要哪些命令。
// 这样一来虽然结果是一样的，都是计算出结果，但是过程去截然不同喽。最大限度的降低了耦合。

// 实际的计算方法


function add(x, y) {
  return x + y;
};

function sub(x, y) {
  return x - y;
};

function mul(x, y) {
  return x * y;
};

function div(x, y) {
  return x / y;
};

// command对象创建
var Command = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
}

// 创建command的方法
var AddCommand = function (value) {
  return new Command(add, sub, value);
};
var SubCommand = function (value) {
  return new Command(sub, add, value);
};
var MulCommand = function (value) {
  return new Command(mul, div, value);
};
var DivCommand = function (value) {
  return new Command(div, mul, value);
};


/**
 * 创建一个队列用来记录操作
 * 创建一个变量记录当前值
 * 创建一个队列增加并执行command.execute的方法 execute
 * 创建一个队列删除并执行删除操作的方法 undo,用于撤销操作
 * 创建一个返回当前值的方法
 * @returns 
 */
var Calculator = function () {
  var current = 0;
  var commands = [];

  function action(command) {
    var name = command.execute.name;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      log.add(action(command) + ": " + current);
    },
    undo: function () {
      var command = commands.pop();
      current = command.undo(current, command.value);
      log.add("Undo " + action(command) + ": " + current);
    },
    getCurrentValue: function () {
      return current;
    }
  }
}
var log = (function () {
  var log = "";
  return {
    add: function (msg) {
      log += msg + "\n";
    },
    show: function () {
      console.log(log);
      log = "";
    }
  }
})();

function run() {
  var calculator = new Calculator();
  calculator.execute(new AddCommand(100));
  calculator.execute(new SubCommand(24));
  calculator.execute(new MulCommand(6));
  calculator.execute(new DivCommand(2));

  calculator.undo();
  calculator.undo();
  log.add("\nValue: " + calculator.getCurrentValue());
  log.show();
}

run()