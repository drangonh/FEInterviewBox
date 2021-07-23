/**
 * Created by lin on 2018/8/16.
 * * 命令模式旨在将方法调用、请求或操作封装到单个对象中，并赋予我们参数化和传递方法调用的能力，
 * 这些调用可以由我们自行决定执行。此外，它使我们能够将调用动作的对象从实现它们的对象中分离出来，
 * 从而在交换具体的类(对象)时给予我们更大程度的整体灵活性。
 */
const setCommand = function(button, command) {
  button.onClick = function() {
    command.excute();
  };
};

// --------------------  上面的界面逻辑由A完成，下面的由B完成

const menu = {
  updateMenu() {
    console.log('更新菜单');
  }
};

const updateCommand = function(receive) {
  return {
    excute: receive.updateMenu
  };
};

const updateCommandMenu = updateCommand(menu); // 创建命令

const button1 = document.getElementById('button1');
setCommand(button1, updateCommandMenu);
