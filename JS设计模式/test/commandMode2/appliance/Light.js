class Light{
  constructor(name){
    this.name = name;
  }
  on(){
    console.log('打开',this.name)
  }
  off(){
    console.log('关掉',this.name)
  }
}

module.exports.Light = Light