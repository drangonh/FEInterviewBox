function promisify(f) {
  return function (...args) { // 返回一个包装函数（wrapper-function） (*)
    console.log(args)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // 我们对 f 的自定义的回调 (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // 将我们的自定义的回调附加到 f 参数（arguments）的末尾

      console.log(args)
      f.call(this, ...args); // 调用原始的函数

    });
  };
}

function test(a, callback) {
  // ...自己的函数处理代码
  if (a) {
    callback(a)
  } else {
    callback({
      err: 'err'
    })
  }
}

promisify(test)(false).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})