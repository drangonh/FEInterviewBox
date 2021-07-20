/**
 * 代理模式
 */

function Instance() {
 
}

Instance.getInstance = function () {
  if (!this.instance) {
    this.instance = new Instance()
  }

  return this.instance
}

function mul(args) {
  let a = 1;
  console.log(args)
  for (let v of args) {
    a *= v;
  }

  return a
}

function proxyTest(fn) {
  let obj = Instance.getInstance()

  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const prop = args.join(',')
      console.log(obj)

      if (obj[prop]) {
        console.log(222)
        return obj[prop]
      }

      console.log(333)
      obj[prop] = fn(args)
      return obj[prop]
    }
  })
}

let p = proxyTest(mul)

let all = p(1, 2, 3, 4)
let all1 = p(1, 2, 3, 4)

console.log(all)