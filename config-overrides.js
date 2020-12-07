"use strict"

const {
  override,
  overrideDevServer,
  addLessLoader,
  addBabelPlugins,
  useBabelRc,
  addWebpackAlias,
  addBundleVisualizer
} = require('customize-cra')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const globby = require('globby')
const paths = require('react-scripts/config/paths')

const processEnv = process.env.NODE_ENV
const resolveAlias = (dir) => path.join(__dirname, '.', dir)
// 多项目的入口列表
// const entriePath = globby.sync([`${resolveAlias('src')}/*/index.tsx`], { cwd: process.cwd() })
// paths.entriePath = entriePath
// // 获取多页面的入口
// function getMultEntries() {
//   const filesList = paths.entriePath
//   const entries = {}
//   filesList.forEach(filePath => {
//     const tempList  = filePath.split('/')
//     const name = tempList[tempList.length - 2]
//     if (processEnv === 'production') {
//       entries[name] = [filePath]
//     } else {
//       entries[name] = [require.resolve('react-dev-utils/webpackHotDevClient')]
//     }
//   })
//   return entries
// }
// const configEntries = getMultEntries()
// // 配置HtmlWebpackPlugin
// const genHtmlWebpackPlugin = env => {
//   const minify = {
//     removeComments: true,
//     collapseWhitespace: true,
//     removeRedundantAttributes: true,
//     useShortDoctype: true,
//     removeEmptyAttributes: true,
//     removeStyleLinkTypeAttributes: true,
//     keepClosingSlash: true,
//     minifyJS: {
//       comments: '@cc_on',
//     },
//     minifyCSS: true,
//     minifyURLs: true,
//   }
//   const config = Object.assign(
//     {},
//     { inject: true, template: paths.appHtml },
//     'development' !== env ? { minify } : undefined,
//   )
//   return entry => {
//     return new HtmlWebpackPlugin({
//       ...config,
//       // chunks: ['vendors', `runtime~${entry}.html`, entry],
//       filename: `${entry}.html`,
//       template: paths.appHtml
//     })
//   }
// }

// 打包配置优化
const addWebpackTerserConfifg = () => config =>  {
  // config.entry = configEntries
  // const htmlPluginsFn = genHtmlWebpackPlugin(processEnv)
  // Object.keys(configEntries).forEach(item => {
  //   config.plugins.push(htmlPluginsFn(item))
  // })
  // config.plugins.push(htmlWebpackPlugins)
  if (processEnv === 'production') {
    // 生成模式下关闭sourceMap
    config.devtool = false
    // 优化TerserPlugin配置
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') { // 返回的是一个插件实例
          minimizer.options.terserOptions.compress.drop_console = true // 去除console语句
          minimizer.options.extractComments = false // 去除license文件
        }
      })
    }
  }
  return config
}
// 代理配置
const addDevServerConfig = () => config => {
  return {
    ...config,
    compress: true,
    proxy: {
      '/mock': {
        target: 'xxx', // 接口代理的真正请求地址
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/api',
        }
      }
    }
  }
}

module.exports = {
  webpack: override(
    addWebpackTerserConfifg(),
    // less配置
    addLessLoader({
      strictMath: true, // less中Math数学计算开启严格模式
      javascriptEnabled: true, // 允许在JS代码中嵌入'less'语法
      localIdentName: "[name]-[local]-[hash:base64:5]" // 在使用CSS模块时，生成的CSS模块文件名称
    }),
    // bundle包分析
    processEnv === 'production' && addBundleVisualizer({
      analyzerMode: "static",
      reportFilename: "report.html"
    }, false),
    // webpack别名配置
    addWebpackAlias({
      '@': resolveAlias('src')
    }),
    // babel插件配置
    ...addBabelPlugins(
      "@emotion"
    ),
    // 允许使用.babelrc文件进行babel的配置
    useBabelRc(),
  ),
  devServer: overrideDevServer(
    addDevServerConfig()
  )
}
