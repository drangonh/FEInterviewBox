/**
 * 策略模式,为了降低代码重复
 * 策略模式就是将一系列算法封装起来，
 * 并使它们相互之间可以替换。被封装起来的算法具有独立性，外部不可改变其特性。
 */
let checkData = {
  isPhone(tel) {
    if (!/^1[3,4,5,7,8,9][0-9]\d{8}$/.test(tel)) {
      console.log('手机号码格式不正确')
      return false
    }
  },
  hasPhone(tel) {
    console.log(tel)
    return String(tel).length > 0
  }

}

let obT = Object.create(checkData)

console.log(obT.hasPhone(1234))

//-----------------------------
// 登录验证
function Validate() {}
Validate.prototype.rules = {
  // 是否手机号
  isMobile: function (str) {
    var rule = /^1[3,4,5,7,8,9][0-9]\d{8}$/;
    return rule.test(str);
  },
  // 是否必填
  isRequired: function (str) {
    // 除去首尾空格
    var value = str.replace(/(^\s*)|(\s*$)/g, "");
    return value !== "";
  },
  // 最小长度
  minLength: function (str, length) {
    var strLength = str.length;
    return strLength >= length;
  },
  // 是否相等
  isEqual: function () {
    // 可以接收多个参数比较
    var args = Array.prototype.slice.call(arguments);
    // 取首项与后面所有的项比较，如果每个都相等，就返回true
    var equal = args.every(function (value) {
      return value === args[0];
    })
    return equal;
  }
}

Validate.prototype.test = function (rules) {
  var v = this;
  var valid; // 保存校验结果
  for (var key in rules) { // 遍历校验规则对象
    for (var i = 0; i < rules[key].length; i++) { // 遍历每一个字段的校验规则
      var ruleName = rules[key][i].rule; // 获取每一个校验规则的规则名
      var value = rules[key][i].value; // 获取每一个校验规则的校验值
      if (!Array.isArray(value)) { // 统一校验值为数组类型
        value = new Array(value)
      }
      var result = v.rules[ruleName].apply(this, value); // 调用校验规则方法进行校验
      if (!result) { // 如果校验不通过，就获取校验结果信息，并立即跳出循环不再执行，节约消耗
        valid = {
          errValue: key,
          errMsg: rules[key][i].message
        }
        break;
      }
    }
    if (valid) { // 如果有了校验结果，代表存在不通过的字段，则立即停止循环，节约消耗
      break;
    }
  }
  return valid; // 把校验结果反悔出去
}

// formData.onsubmit = function () {
//   event.preventDefault()
//   var validator = new Validate();
//   var result = validator.test({
//     'username': [{rule: 'isRequired', value: this.username.value, message: '用户名不能为空！'}],
//     'password1': [
//       {rule: 'isRequired', value: this.password1.value, message: '密码不能为空！'},
//       {rule: 'minLength', value: [this.password1.value, 6], message: '密码长度不能小于6个字符！'}
//     ],
//     'password2': [
//       {rule: 'isRequired', value: this.password2.value, message: '确认密码不能为空！'},
//       {rule: 'minLength', value: [this.password2.value, 6], message: '确认密码长度不能小于6个字符！'},
//       {rule: 'isEqual', value: [this.password2.value, this.password1.value], message: '确认密码与原密码不相同！'}
//     ],
//     'isMobile': [
//       {rule: 'isRequired', value: this.phone.value, message: '手机号不能为空！'},
//       {rule: 'isMobile', value: this.phone.value, message: '手机号格式不正确！'}
//     ]
//   })
//   if (result) {
//     console.log(result)
//   } else {
//     console.log('校验通过')
//   }
// }

