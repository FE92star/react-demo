## React项目学习流程
* 项目包含整个学习过程中遇到的问题的总结

### Q1. 个性化配置项目流程
* create-react-app脚手架内部集成了一套webpack配置方式，虽然官方暴露了`yarn eject`来暴露出原始的webpack配置文件，但是一旦放出，就是不可逆无法恢复，因此react社区开源了一套可以直接修改CRA配置的工具——`react-app-rewired`，而`customize-cra`提供了一组利用这个工具核心功能的配置，可以直接通过`config-overrides.js`文件来覆盖原始配置
1. 安装两个依赖；
2. 在项目的根目录下新建`config-overrides.js`文件；
3. 根据[官方API文档](https://github.com/arackaf/customize-cra/blob/master/api.md)，按照自己的需求配置；
4. 同时将`package.json`文件中的启动器改成`react-app-rewired`即可生效；

### Q2. 学习React无状态和有状态的组件编写方法