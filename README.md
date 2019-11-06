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

### Q3. React组件的生命周期
* 同Vue类似，React组件也有自己的生命周期，在这些生命周期里处理不同的业务逻辑，`will`方法会在某些行为发生之前调用，`did`方法在某些行为发生之后调用，不过作为类定义的React组件最开始调用的是`constructor`，用于初始化定义`state`，[参考文献](https://zhuanlan.zhihu.com/p/30971608)
#### 装载组件触发：（调用次数）——（能否使用setState()）
1. `getDefaultProps`：获取默认的组件属性；1——否
2. `getInitialState`：获取初始化的状态；1——否
3. `componentWillMount`：状态初始化；1——是——发生在函数第一次render之前，状态初始化阶段，为render渲染做准备
4. `render`：组件实例化渲染；>=1——否——渲染过程应该是纯粹的，不能再此阶段更改状态，也无法访问真实的DOM元素
5. `componentDidMount`：组件已经挂载完毕；1——是（一般ajax数据操作都在这个钩子函数中进行，同时可以访问真实的DOM元素），访问真实的DOM的原生API方法——`ReactDOM.findDOMNode(this.refs.chart)`，即React也可以通过`refs`来访问真实的DOM。当在此声明周期中计算改变DOM元素的样式，可以通过`forceUpdate`强制触发`render`重新渲染。
#### 运行中触发：
1. `componentWillReceiveProps`：组件的属性发生传递；>=0——是——父元素的属性值传递过来就会触发此生命周期，即使props没有改变，也会触发，因此如果需要在属性变化时执行回调，则需要手动比较，传递给此生命周期的参数是`nextProps`——更新之后的props:
```js
  class Button extends Component {
    state = {
      status: true
    }
    componentWillReceiveProps(nextProps) {
      const { btnText } = this.props
      if(nextProps !== btnText) { // 手动比较新旧属性是否发生变化
        cb()
      }
    }
  }
```
2. `shouldComponentUpdate`：组件是否更新；>=0——否——默认都是`true`，传递的参数是新的props和state，形参名称是`nextProps`和`nextState`，React官方通过`PureRenderMixin`——内部修改了此钩子函数，可以用来检测是否需要触发更新，具体写法：
```js
// 老版本的写法
import 'PureRenderMixin' from 'react-addons-pure-render-mixin'
const createReactClass = require('create-react-class')

createReactClass({
  mixins: [PureRenderMixin], // 可以通过mixins的形式引入

  render: function() {
    return <div className={this.props.className}>foo</div>
  }
})
```
```js
// ES6写法,官方文档建议直接通过继承React.PureComponent来实现这种检测功能
class App extentds React.PureComponent {
  // 只有当改变setState才会触发更新，改变原有的值则不会触发更新，这个可以作为组件优化的一种策略
}
```

3. `componentWillUpdate`：组件将要更新之前；>=0——否——在即将发生渲染前触发，可以拿到`nextProps`和`nextState`，不能使用setState
4. `componentDidUpdate`：组件已经更新成功；>=0——否——组件更新成功，可以直接通过`refs`访问DOM元素，函数传入两个参数`prevProps`和`prevState`，上一个属性和状态，具体用法如下：
```js
componentDidUpdate(prevProps, prevState) {
  // One possible fix...
  let height = ReactDOM.findDOMNode(this).offsetHeight;
  if (this.state.height !== height ) { // 避免循环调用触发render
    this.setState({ internalHeight: height }); // 先触发render，然后又回到此生命周期，又触发，无限循环，所以加一重判断，确保只触发一次
  }
}
```
#### 组件卸载：
1. `componentWillUnmount`：组件将要卸载之前；1——否——组件销毁之前，和Vue中的`beforeDestroy`类似，做一些定时器消耗，或者事件监听器的移除操作确保页面的整体性能

### Q4. 组件的开发方式
* 组件的数据传递：属性传递，基础属性和事件属性都可以传递，子组件需要先注册事件才可以在父组件中调用触发事件；
* `setState`既是同步，也是异步，场景不同，处理的方式也不尽相同，第二个参数是`state`变更之后的回调，可以获取到最新的状态数据；
1. `state`就可以类比于Vue中的`data`数据，可以自定义，初始化可以在`constructor`阶段，在`getInitialState`生命周期阶段，并且只能通过`setState`来改变；
2. `props`就同Vue种的`props`一样，表示组件的属性，通过父组件向子组件传递属性，同Vue不同的地方在于子组件的props不需要初始化定义类型，只要父组件传递，子组件就可以获取，不过也可以在子组件中对`props`进行初始化定义，在`getDefaultProps`生命周期阶段，具体的设置方法是：
```js
class App extends Component {
  constructor(props) {
    super(props)
    // 初始化状态
    this.state = {
      status: false
    }
  }
  render() {
    return (
      <div>{ this.props.name }</div>
    )
  }
}
// 给组件设置defaultProps就是初始化属性
App.defaultProps = { name: 'good' }
// 组件调用
<App name={ null }/> // name为null
<App name={ undefined }/> // name为默认值good
```

### Q4. 组件的分类
* 在React中，组件可分为`Stateless Component`——无状态组件（不涉及到自身状态的传递）和`Stateful Component`——有状态组件（多种状态的数据传递），一般在功能组件的开发过程中可以尽可能的拆分组件，拆分出来的无状态组件可以直接写成`纯函数`的形式，直接可以在当前组件中引用；
1. 无状态组件的特点：不包含自己独立的状态，没有继承`React component`，没有自己的生命周期函数，无法访问状态，但是可以访问传入的属性`props`;
2. 纯函数，相同的输入，固定的输出，对于传入相同的属性，渲染的结果应该是保持一致
```js
// 直接返回JSX，传入参数是props
const Button = (props) => {
  return <button>{ props.btnText }<button/>
}
```

### Q5. React ref的发展历程
* ref类比于Vue中的refs，用于获取组件中真实的DOM元素，用于DOM操作需求，不过在React发展过程中有三种模式：
1. 字符串（`string ref`）——在16.0新版本中计划移除，性能不佳，同时应用覆盖场景不够；
2. 回调函数（`callback ref`）——目前版本中可使用
3. 新API（`React.createRef`）——官方建议用这种方式来调用
```js
// string ref
class MyComponent extends React.Component {
  componentDidMount() {
    this.refs.myRef.focus();
  }
  render() {
    return <input ref="myRef" />;
  }
}

// callback ref——在回调中如果有复杂的业务逻辑，建议用类成员函数绑定到callback中，是一个优化的方式
class MyComponent extends React.Component {
  componentDidMount() {
    this.myRef.focus();
  }
  render() {
    return <input ref={(ele) => {
      this.myRef = ele;
    }} />;
  }
}

// React.createRef
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.myRef.current.focus();
  }
  render() {
    return <input ref={this.myRef} />;
  }
}

// React.forwardRef——用于穿过父元素直接获取子元素的ref，应用于HOC组件（高阶组件）
function HOCProps(WrappedComponent) {
  class HOCComponent extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <HOCComponent forwardedRef={ref} {...props}  />;
  });
}

const App = HOCProps(Wrap);

<App ref={(dom) => {
  // 可以直接获取 WrappedComponent
  console.log(dom);
}} />
```

### Q6. 高阶组件(HOC)的开发及其应用
* [参考文献](https://juejin.im/post/5c72b97de51d4545c66f75d5)

### Q7. React的Hooks的基础用法(16.8版本新增的写法)
* [react hooks](https://juejin.im/post/5dbbdbd5f265da4d4b5fe57d)
* [react-redux hooks](http://www.react-china.org/t/topic/34076)
* [官方参考文献](https://zh-hans.reactjs.org/docs/hooks-intro.html)
1. `useState`用于设置状态以及对应的`setState`改变状态的处理函数
```js
import React, { useState } from 'react'
function Demo() {
  const [count, setCount] = useState(0) // 初始化state-count，并初始化赋值为0
  return (
    <div>
      <p>{ count }</p>
      <button onClick={ ()=>setCount(count+1) }>Click</button>
    </div>
  )
}
function MoreState() {
  // 传递的参数可以包含各种数据类型
  const [text, setText] = useState('page') // 字符串
  const [todos, setTodos] = useState([{ list: 'showList' }]) // 数组
}
```
2. `useEffect`(Effct Hook)——在React组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”
* 此HOOKS和`componentDidMount`，`componentDidUpdate`，`componentWillUnmount`三个钩子具有相同的用途，被合并成同一个API:
```js
import React, { useState, useEffect } from 'react'
function Example() {
  const [count, setCount] = useState(0)
  useEffect(() => { // 类似于钩子函数
    document.title = `had clicked ${count} times`
  })
  return (
    <div>
      <p>{ count }</p>
      <button onClick={ ()=>setCount(count+1) }>Click</button>
    </div>
  )
}
```

### Q8. React表单的双向数据绑定
* React本身是单向数据流，数据的流向只能通过父组件传递props给子组件，不能由子组件直接传递数据给父组件，而是只能通过将事件处理程序作为属性来改变父组件的数据，可以通过事件属性传递来传值给父组件
```js
/*  子组件向父组件传递数据的方式——核心方法是子组件通过父组件传递过来的组件实例属性调用父组件的方法，参数是子组件自己的数据
 1. 父组件定义一个属性，将整个父组件实例作为参数赋值给该属性，然后在父组件中定义一个接受子组件数据的方法，参数为子组件的数据
 2. 子组件定义一个事件处理程序，通过属性拿到父组件定义的方法，然后将自己的数据作为参数传入到方法中即可
*/
// 子组件
class Child extends Component {
  state = {
    msg: 'i am a child'
  }
  handleToParent = () => {
    this.props.parent.toChild(this.state.msg)
  }
  render() {
    return (
      <button onClick={this.handleToParent}></button>
    )
  }
}
// 父组件
class Parent extends Component {
  state = {
    childMsg: '' // 子组件传递过来的数据
  }
  toChild = (msg)=> { // 形参是子组件实例和子组件数据
    this.setState({
      childMsg: msg // msg是子组件传递过来的数据
    })
  }
  render() {
    return (
      <div className="parent">
        <h1>{ this.state.childMsg }</h1>
        <Button parent={ this }/>
      </div>
    )
  }
}
```