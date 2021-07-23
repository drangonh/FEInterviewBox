/**
 * https://blog.csdn.net/weixin_40817115/article/details/81534819
 * 以上的文章介绍了在node和浏览器环境下到导入和导出的方法
 */

const RemoteControl = require('./control/RemoteControl')
const HeaterCommand = require('./applianceCommand/HeaterCommand')
const LightCommand = require('./applianceCommand/LightCommand')

const control = new RemoteControl();

control.setCommand(new LightCommand('大厅的灯'));
control.setCommand(new HeaterCommand('热水器'));

control.buttonOn('大厅的灯')
control.buttonOn('热水器')

console.log('---------------')

control.buttonOff('大厅的灯')
control.buttonOff('热水器')