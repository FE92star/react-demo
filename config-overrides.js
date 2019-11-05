"use strict"

const { override, addLessLoader, addBabelPlugins, useBabelRc, addWebpackAlias } = require('customize-cra')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = override(
  // less加载器的配置
  addLessLoader({
    strictMath: true, // less中Math数学计算开启严格模式
    javascriptEnabled: true, // 允许在JS代码中嵌入'less'语法
    localIdentName: "[name]-[local]-[hash:base64:5]" // 在使用CSS模块时，生成的CSS模块文件名称
  }),
  // babel插件配置
  ...addBabelPlugins(
    "emotion"
  ),
  // 允许使用.babelrc文件进行babel的配置
  useBabelRc(),
  // 添加webpack的alias，别名路径引用
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'page': path.resolve(__dirname, 'src/views')
  }),
  // 传入一个匿名函数，函数的参数是webpack的配置对象，打印出来的配置对象是框架本身的原有基础配置
  (config) => {
    config.devtool = '' // 去除默认JS的source-map文件
    config.module.rules[2].oneOf.push( // 添加JSloader
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory', //缓存loader执行结果 提升打包速度(打包时间减少400ms左右)
        include: [resolve('src'), resolve('test')], //必须匹配对应选项
        exclude: /node_modules/
      }
    )
    config.module.rules[2].oneOf[7].use[2].options.sourceMap = false // CSS的map设置无效，目前还没有找到合适的解决方案
    config.output = { // 输出配置
      publicPath: '', 
      filename: 'js/[name].[hash:8].js', //JS的输出，编译提示不能用[chunkhash]，必须要用[hash]代替
      chunkFilename: 'js/[name].[hash:8].js',
      path: path.resolve(__dirname, 'build') // 当改变一次输出路径之后，即使把对应的配置选项删除，也会按照新的配置，因此这个选项需要加上才能覆盖默认配置，尽量不修改此选项配置
    }
    // css的输出配置
    config.plugins[5].options.filename = 'css/[name].[contenthash:8].css'
    config.plugins[5].options.chunkFilename = 'css/[name].[contenthash:8].css'
    return config
  }
)
// 基础配置对象config输出
// {
//   mode: 'production',
//   bail: true,
//   devtool: 'source-map',
//   entry: [ '/Users/kaifa/react-demo/src/index.js' ],
//   output: {
//     path: '/Users/kaifa/react-demo/build',
//     pathinfo: false,
//     filename: 'static/js/[name].[contenthash:8].js',
//     futureEmitAssets: true,
//     chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
//     publicPath: '/',
//     devtoolModuleFilenameTemplate: [Function],
//     jsonpFunction: 'webpackJsonpreact-demo',
//     globalObject: 'this'
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [ [TerserPlugin], [OptimizeCssAssetsWebpackPlugin] ],
//     splitChunks: { chunks: 'all', name: false },
//     runtimeChunk: { name: [Function: name] }
//   },
//   resolve: {
//     modules: [ 'node_modules', '/Users/kaifa/react-demo/node_modules' ],
//     extensions: [
//       '.web.mjs', '.mjs',
//       '.web.js',  '.js',
//       '.json',    '.web.jsx',
//       '.jsx'
//     ],
//     alias: { 'react-native': 'react-native-web' },
//     plugins: [ [Object], [ModuleScopePlugin] ]
//   },
//   resolveLoader: { plugins: [ [Object] ] },
//   module: {
//     strictExportPresence: true,
//     rules: [ [Object], [Object], [Object] ]
//   },
//   plugins: [
//     HtmlWebpackPlugin {
//       options: [Object],
//       childCompilerHash: undefined,
//       childCompilationOutputName: undefined,
//       assetJson: undefined,
//       hash: undefined,
//       version: 4
//     },
//     InlineChunkHtmlPlugin {
//       htmlWebpackPlugin: [Function],
//       tests: [Array]
//     },
//     InterpolateHtmlPlugin {
//       htmlWebpackPlugin: [Function],
//       replacements: [Object]
//     },
//     ModuleNotFoundPlugin {
//       appPath: '/Users/kaifa/react-demo',
//       yarnLockFile: undefined,
//       useYarnCommand: [Function: bound useYarnCommand],
//       getRelativePath: [Function: bound getRelativePath],
//       prettierError: [Function: bound prettierError]
//     },
//     DefinePlugin { definitions: [Object] },
//     MiniCssExtractPlugin { options: [Object] },
//     ManifestPlugin { opts: [Object] },
//     IgnorePlugin {
//       options: [Object],
//       checkIgnore: [Function: bound checkIgnore]
//     },
//     GenerateSW { config: [Object] }
//   ],
//   node: {
//     module: 'empty',
//     dgram: 'empty',
//     dns: 'mock',
//     fs: 'empty',
//     http2: 'empty',
//     net: 'empty',
//     tls: 'empty',
//     child_process: 'empty'
//   },
//   performance: false
// }