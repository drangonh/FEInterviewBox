const Command = require('./Command')
const Light = require('../appliance/Light')

class LightCommand{
  constructor(name){
    this.name = name;
    this.light = new Light(name);
  }

  execute(command){
    if(command === 'on'){
      this.light.on();
    }
    else if(command === 'off'){
      this.light.off();
    }
  }
}

module.exports.LightCommand = LightCommand