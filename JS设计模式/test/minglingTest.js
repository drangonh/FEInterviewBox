/**
 * 命令模式测试
 * Created by lin on 2018/8/16.
 */
const setCommand = function (command) {
  command.excute();
};

// --------------------  上面的界面逻辑由A完成，下面的由B完成

const menu = {
  updateMenu() {
    console.log('更新菜单');
  }
};

const updateCommand = function (receive) {
  return {
    excute: receive.updateMenu
  };
};

const updateCommandMenu = updateCommand(menu); // 创建命令

setCommand(updateCommandMenu);