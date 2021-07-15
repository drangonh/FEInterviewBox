class Singleton {
  constructor(name) {
    this.name = name;

    if (!Singleton.instance) {
      Singleton.instance =  this;
    }

    return Singleton.instance;
  }

  getName = () => {
    console.log(this.name)
  }
}

// test
const a = new Singleton('a');
const b = new Singleton('b');
console.log(a);

b.getName()