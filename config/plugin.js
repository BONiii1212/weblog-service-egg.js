'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
// 配置组件
exports.mysql = {
  enable:true,
  package: 'egg-mysql'
}
//开启cors跨域
exports.cors = {
  enable:true,
  package:'egg-cors'
}