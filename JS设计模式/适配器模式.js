/**
 * Created by lin on 2018/8/17.
 * 适配器是数据结构的转换，将不适配的数据结构通过适配器处理后，得到了可以适配的数据结构
 */
// 老接口
const oldCity = (function() {
  return [
    {
      name: 'hangzhou',
      id: 11
    },
    {
      name: 'jinhua',
      id: 12
    }
  ];
})();

// 新接口希望是下面形式
// {
//     hangzhou: 11,
//     jinhua: 12
// }

// 这时候就可采用适配者模式
const adaptor = function(oldCity) {
  const obj = {};
  for (const city of oldCity) {
    obj[city.name] = city.id;
  }
  return obj;
};

console.log(adaptor(oldCity));
