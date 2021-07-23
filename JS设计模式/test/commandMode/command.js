var bar = {
  refresh: function (element, more) {
    console.log('刷新菜单目录:', more);
  },
  add: function (element, more) {
    console.log('增加子菜单:', more);
  },
  del: function (element, more) {
    console.log('删除子菜单:', element);
    element.style.display = 'none'

  },
  execute: function (element, eventName, more) {
    commandObj[eventName](element, more)
  }
};



var Command = function (receiver, event) {
  this.receiver = receiver;
  this.execute = receiver[event]
};

let commandObj = {
  'button1': bar.refresh,
  'button2': bar.add,
  'button3': bar.del,
}

var setCommand = function (element, eventName, more) {
  bar.execute(element, eventName, more)
}