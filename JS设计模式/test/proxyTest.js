/**
 * 代理模式测试
 * func.call(context, arg1, arg2, ...)
 * func.apply(context, args)
 * 为其他对象提供一种代理以控制对这个对象的访问
 * 
 * Reflect:
 * 对于每个可被 Proxy 捕获的内部方法，在 Reflect 中都有一个对应的方法，
 * 其名称和参数与 Proxy 捕捉器相同。
 * Reflect 是一个内建对象，可简化 Proxy 的创建。
 * 给target设置属性的值
 * Reflect.set(target, prop, value);
 */


// 缓存代理实现乘积计算
const mult = function () {
  let a = 1;
  for (let val of arguments) {
    a *= val
  }
  return a
};

const proxyMult = (function () {
  const cache = {};
  return function () {
    console.log(arguments)
    const tag = Array.prototype.join.call(arguments, ',');
    if (cache[tag]) {
      console.log(cache)
      return cache[tag];
    }
    cache[tag] = mult.apply(this, arguments);
    return cache[tag];
  };
})();

console.log(proxyMult(1, 2, 3, 4)) // 24

// 表单对象
const userForm = {
  account: '',
  password: '',
}

// 验证方法
const validators = {
  account(value) {
    // account 只允许为中文   
    const re = /^[\u4e00-\u9fa5]+$/;
    return {
      valid: re.test(value),
      error: '"account" is only allowed to be Chinese'
    }
  },
  password(value) {
    // password 的长度应该大于6个字符    
    return {
      valid: value.length >= 6,
      error: '"password "should more than 6 character'
    }
  }
}

const getValidateProxy = (target, validators) => {
  return new Proxy(target, {
    _validators: validators,
    set(target, prop, value) {
      if (value === '') {
        console.error(`"${prop}" is not allowed to be empty`);
        return target[prop] = false;
      }
      const validResult = this._validators[prop](value);
      if (validResult.valid) {
        // 对于每个可被 Proxy 捕获的内部方法，在 Reflect 中都有一个对应的方法，
        // 其名称和参数与 Proxy 捕捉器相同。

        // Reflect 是一个内建对象，可简化 Proxy 的创建。

        // 给target设置属性的值
        return Reflect.set(target, prop, value);
      } else {
        console.error(`${validResult.error}`);
        return target[prop] = false;
      }
    }
  })
}

const userFormProxy = getValidateProxy(userForm, validators);
userFormProxy.account = '在'; // "account" is only allowed to be ChineseuserFormProxy.password = 'he'; 