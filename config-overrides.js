"use strict"

const { override, addLessLoader, addBabelPlugins, useBabelRc } = require('customize-cra')

console.log('override...')
module.exports = override(
  // less加载器的配置
  addLessLoader({
    strictMath: true, // less中Math数学计算开启严格模式
    javascriptEnabled: true, // 允许在JS代码中嵌入'less'语法
    localIdentName: "[local]--[hash:base64:5]" // 在使用CSS模块时，生成的CSS模块文件名称
  }),
  // babel插件配置
  ...addBabelPlugins(
    "emotion"
  ),
  // 允许使用.babelrc文件进行babel的配置
  useBabelRc()
)