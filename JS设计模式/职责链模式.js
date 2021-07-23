/**
 * Created by lin on 2018/8/16.
 * 
 * 职责链模式:使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，
 * 将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
 * 
 * 职责链中所有的对象都有几乎一样的行为,满足条件就执行,不满足就继续传递下去
 * 比如接力赛、APP优惠券付款、彩票抽奖等
 */
// orderType: 表示订单类型，1：500 元定金用户；2：200 元定金用户；3：普通购买用户
// pay：表示用户是否已经支付定金，true: 已支付；false：未支付
// stock: 表示当前用于普通购买的手机库存数量，已支付过定金的用户不受此限制

const order = function (orderType, pay, stock) {
  if (orderType === 1) {
    if (pay === true) {
      console.log('500 元定金预购，得到 100 元优惠券');
    } else {
      if (stock > 0) {
        console.log('普通购买，无优惠券');
      } else {
        console.log('库存不够，无法购买');
      }
    }
  } else if (orderType === 2) {
    if (pay === true) {
      console.log('200 元定金预购，得到 50 元优惠券');
    } else {
      if (stock > 0) {
        console.log('普通购买，无优惠券');
      } else {
        console.log('库存不够，无法购买');
      }
    }
  } else if (orderType === 3) {
    if (stock > 0) {
      console.log('普通购买，无优惠券');
    } else {
      console.log('库存不够，无法购买');
    }
  }
};

order(3, true, 500); // 普通购买，无优惠券

// 下面用职责链模式改造代码：
const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到 100 元优惠券');
  } else {
    order200(orderType, pay, stock);
  }
};

const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200 元定金预购，得到 50 元优惠券');
  } else {
    orderCommon(orderType, pay, stock);
  }
};

const orderCommon = function (orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('库存不够，无法购买');
  }
};

order500(3, true, 500); // 普通购买，无优惠券

// 改造后可以发现代码相对清晰了，但是链路代码和业务代码依然耦合在一起，进一步优化：
// 业务代码
const newOrder500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到 100 元优惠券');
  } else {
    return 'nextSuccess';
  }
};

const newOrder200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200 元定金预购，得到 50 元优惠券');
  } else {
    return 'nextSuccess';
  }
};

const newOrderCommon = function (orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('库存不够，无法购买');
  }
};

// 链路代码
const Chain = function (fn) {
  this.fn = fn;
  this.sucessor = null;
};

Chain.prototype.setNext = function (sucessor) {
  this.sucessor = sucessor;
};

Chain.prototype.init = function () {
  const result = this.fn.apply(this, arguments);
  if (result === 'nextSuccess') {
    this.sucessor.init.apply(this.sucessor, arguments);
  }
};

const order500New = new Chain(newOrder500);
const order200New = new Chain(newOrder200);
const orderCommonNew = new Chain(newOrderCommon);

order500New.setNext(order200New);
order200New.setNext(orderCommonNew);

order500New.init(3, true, 500); // 普通购买，无优惠券

// 重构后，链路代码和业务代码彻底地分离。假如未来需要新增 order300，那只需新增与其相关的函数而不必改动原有业务代码。

// 另外结合 AOP 还能简化上述链路代码：
// 业务代码
/**
 * 
 * {AOP为Aspect Oriented Programming的缩写，意为：面向切面编程（也叫面向方面），
 * 可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术。
 * AOP实际是GoF设计模式的延续，设计模式孜孜不倦追求的是调用者和被调用者之间的解耦，
 * AOP可以说也是这种目标的一种实现。} 
 * @param {*} pay 
 * @param {*} stock 
 * @returns 
 */
const new2Order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500 元定金预购，得到 100 元优惠券');
  } else {
    return 'nextSuccess';
  }
};

const new2Order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200 元定金预购，得到 50 元优惠券');
  } else {
    return 'nextSuccess';
  }
};

const new2OrderCommon = function (orderType, pay, stock) {
  if (orderType === 3 && stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('库存不够，无法购买');
  }
};

// 链路代码
// 重点:整体执行顺序为先执行最后一个after之前的函数,如果最后一个after之前还有after,那么继续依此类推,直到最开始的
// 函数,然后函数从第一个开始一次执行,知道满足条件或者执行到最后为止
Function.prototype.after = function (fn) {
  const self = this;
  return function () {
    // 这行代码相当于先执行调用after的函数
    const result = self.apply(self, arguments);
    // 如果第一个调用after的函数执行结果是'nextSuccess',然后执行fn
    if (result === 'nextSuccess') {
      return fn.apply(self, arguments); // 这里 return 别忘记了~
    }
  };
};

const newOrder = new2Order500.after(new2Order200).after(new2OrderCommon);

newOrder(3, true, 500); // 普通购买，无优惠券