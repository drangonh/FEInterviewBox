const Command = require('./Command')
const Heater = require('../appliance/Heater')

class HeaterCommand  {
  constructor(name) {
    this.name = name;
    this.heater = new Heater(name);
  }

  execute(command) {
    if (command === 'on') {
      this.heater.on();
    } else if (command === 'off') {
      this.heater.off();
    }
  }
}

module.exports.HeaterCommand = HeaterCommand