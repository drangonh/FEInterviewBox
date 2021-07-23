/**
 * 遥控器，遥控器关注的是有什么指令，不在在乎各个器件是否真的存在
 */
class RemoteControl {
  constructor() {
    this.commandObj = {};
  }

  setCommand(command) {
    this.commandObj[command.name] = command;

  }

  /**
   * 打开指令
   * @param name
   */
  buttonOn(name) {
    if (this.commandObj[name]) {
      this.commandObj[name].execute('on');
    }
  }

  /**
   * 关闭指令
   * @param name
   */
  buttonOff(name) {
    if (this.commandObj[name]) {
      this.commandObj[name].execute('off');
    }
  }
}

module.exports.RemoteControl = RemoteControl