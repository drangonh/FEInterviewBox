class Command {
  constructor(){ }

  execute(command){
    console.log('开始执行指令:',command)
  }
}

module.exports.Command = Command