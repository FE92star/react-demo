## React项目学习流程
* 项目包含整个学习过程中遇到的问题的总结

### Q1. 个性化配置项目流程
* create-react-app脚手架内部集成了一套webpack配置方式，虽然官方暴露了`yarn eject`来暴露出原始的webpack配置文件，但是一旦放出，就是不可逆无法恢复，因此react社区开源了一套可以直接修改CRA配置的工具——`react-app-rewired`，而`customize-cra`提供了一组利用这个工具核心功能的配置，可以直接通过`config-overrides.js`文件来覆盖原始配置
1. 安装两个依赖；
2. 在项目的根目录下新建`config-overrides.js`文件；
3. 根据[官方API文档](https://github.com/arackaf/customize-cra/blob/master/api.md)，按照自己的需求配置；
4. 同时将`package.json`文件中的启动器改成`react-app-rewired`即可生效；
5. 改变原始的框架`webpack`配置，不单单可以通过`customize-cra`插件暴露的API来进行覆盖配置，同时也可以通过传入一个匿名函数，函数的参数是`webpack的配置对象-config`，可以打印其默认配置对象，根据自己的需求单独设置`config`对象的每一个默认值，从而达到自定义配置的目的；
6. 通过打印出来的源码配置可以看出，本身是做了一些打包优化，因此不需要再增加额外的优化配置；
7. 项目本身是支持热更新。

### Q2. 学习React无状态和有状态的组件编写方法
* 组件输出可以有两种写法，一种是构造函数，一种是`class 组件名 extends Component`，同时组件引用的时候同Vue不一样，直接引入即可使用引入名称作为组件名使用，可以写成单闭合标签形式，也可以双标签形式。

### Q3. React的生命周期
* 同Vue类似，React也有自己的生命周期，在这些生命周期里处理不同的业务逻辑，`will`方法会在某些行为发生之前调用，`did`方法在某些行为发生之后调用。
#### 装载组件触发：（调用次数）——（能否使用setState()）
1. `getDefaultProps`：获取默认的组件属性；1——否
2. `getInitialState`：获取初始化的状态；1——否
3. `componentWillMount`：组件即将挂载到DOM中；1——是
4. `render`：组件实例化渲染；>=1——否
5. `componentDidMount`：组件已经挂载完毕；1——是
#### 运行中触发：
1. `componentWillReceiveProps`：组件的属性发生变化；>=0——是
2. `shouldComponentUpdate`：组件是否更新；>=0——否
3. `componentWillUpdate`：组件将要更新之前；>=0——否
4. `componentDidUpdate`：组件已经更新成功；>=0——否
#### 组件卸载：
1. `componentWillUnmount`：组件将要卸载之前；1——否