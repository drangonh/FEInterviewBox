 class Heater {
   constructor(name) {
     this.name = name;
   }
   on() {
     console.log(this.name, '开始热水')
   }
   off() {
     console.log('关掉', this.name)
   }
 }

 module.exports.Heater = Heater