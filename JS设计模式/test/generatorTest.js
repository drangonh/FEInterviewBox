function* test() {
  yield 1;
  yield 2;
  return 3;
}

const t = test()
// const t1 = t.next().value
// const t2 = t.next()
// const t3 = t.next()

// 1 { value: 2, done: false } { value: 3, done: true }
// next方法返回的对象,当done为true的时候代表generator执行完所有的结果
// console.log(t1, t2, t3)

function print() {
  for (let value of t) {
    // 1，然后是 2,generator中用return返回的值,因为当 done: true 时，for..of 循环会忽略最后一个 value。
    // 因此，如果我们想要通过 for..of 循环显示所有的结果，我们必须使用 yield 返回它们
    console.log(value);
  }
}

print()

// __________________________________________________________________

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log(str); // 0..9A..Za..z