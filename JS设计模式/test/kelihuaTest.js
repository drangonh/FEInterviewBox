/** 
 * 函数柯里化
 * 主要运用递归的思想,以传入的实际参数数量大于等于形参数量为循环结束条件
 **/

function curry(func) {

  return function curried(...args) {
    console.log(func.length, args.length)
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化