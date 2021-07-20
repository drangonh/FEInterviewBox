let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    console.log(arguments)
    let value = Reflect.get(...arguments);
    console.log(value)
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
console.log(proxy.get('test')); // 1（工作了！）