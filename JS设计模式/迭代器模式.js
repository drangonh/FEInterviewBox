/**
 * Created by lin on 2018/8/16.
 * 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
 * 迭代器分为内部迭代器和外部迭代器
 * 
 * 内部迭代器函数往往在内部就已经定义了迭代了规则，它完全负责了整个迭代过程，外部只需要调用一次就可以完成迭代
 * 优点:内部迭代器而言，调用的过程是很方便的，外界不需要关注迭代器的实现
 * 缺点:使得当迭代规则发生变化的时候，函数的复用性会变差，需要修改到函数本身去兼容更多的迭代方式
 * 
 * 
 */
// 实现一个内部的迭代器
function each(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(i, arr[i]);
  }
}

each([1, 2, 3], function(i, n) {
  console.log(i); // 0 1 2
  console.log(n); // 1 2 3
});

// 可以看出内部迭代器在调用的时候非常简单，使用者不用关心迭代器内部实现的细节，但这也是内部迭代器的缺点。
// 比如要比较两数组是否相等，只能在其回调函数中作文章了，代码如下：
const compare = function(arr1, arr2) {
  each(arr1, function(i, n) {
    if (arr2[i] !== n) {
      console.log('两数组不等');
      return;
    }
  });
  console.log('两数组相等');
};

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
compare(arr1, arr2); // 两数组相等

// 实现一个外部的迭代器
const iterator = function(arr) {
  let current = 0;
  const next = function() {
    current = current + 1;
  };
  const done = function() {
    return current >= arr.length;
  };
  const value = function() {
    return arr[current];
  };
  return {
    next,
    done,
    value
  };
};

const newArr1 = [1, 2, 3];
const newArr2 = [1, 2, 3];
const iterator1 = iterator(arr1);
const iterator2 = iterator(arr2);

const compare2 = function(iterator1, iterator2) {
  while (!iterator1.done() && !iterator2.done()) {
    if (iterator1.value() !== iterator2.value()) {
      console.log('两数组不等');
      return;
    }
    iterator1.next(); // 外部迭代器将遍历的权利转移到外部
    iterator2.next();
  }
  console.log('两数组相等');
};

compare2(iterator1, iterator2);
