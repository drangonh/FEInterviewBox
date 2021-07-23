/**
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
 * 迭代器分为内部迭代器和外部迭代器
 * 
 * 内部迭代器函数往往在内部就已经定义了迭代了规则，它完全负责了整个迭代过程，外部只需要调用一次就可以完成迭代
 * 优点:内部迭代器而言，调用的过程是很方便的，外界不需要关注迭代器的实现
 * 缺点:使得当迭代规则发生变化的时候，函数的复用性会变差，需要修改到函数本身去兼容更多的迭代方式
 * 
 * @param {*} arr 
 * @returns 
 */


function iterator(arr) {
  let current = 0;

  let next = function () {
    current += 1;
  }

  let value = function () {
    return arr[current]
  }

  let done = function () {
    if (current >= arr.length) {
      return true
    }

    return false
  }

  return {
    value,
    next,
    done
  }
}

let arr1 = [2, 3, 4]
let arr2 = [2, 3, 4]

function compare(arr1, arr2) {
  return new Promise((resolve, reject) => {
    let obj1 = iterator(arr1)
    let obj2 = iterator(arr2)

    let fn = function t() {
      if (obj1.done() || obj2.done()) {
        console.log(obj1.done())
        resolve('数组想等')
        return
      }
      if (obj1.value() !== obj2.value()) {
        reject('数组不等')
        return
      }

      setTimeout(() => {
        obj1.next()
        obj2.next()

        t()
      }, 2000)
    }()
  })

}

// 跳用方式一   //数组想等 undefined
let str = compare(arr1, arr2).then((res, rej) => {
  console.log(res, rej)
})

// 跳用方式二  //数组想等
async function test() {
  let str = await compare(arr1, arr2)
  console.log(str)
}

test()


// class版本
/**
 * 迭代器
 */
 class Iterator {
  constructor(arr) {
    this.list = arr;
    this.index = 0
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false
    }
    return true
  }
}

const iterator = new Iterator([1,2,3,'a','b']);
while(iterator.hasNext()){
  console.log(iterator.next());
}