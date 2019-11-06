import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.less';
import Button from '@/components/Button/button'
import Input from '@/components/Input/input'

/* state向props的数据流动 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appText: 'are you ok?',
      childMsg: '',
      testText: 'ppp'
    }
    this.appRef = React.createRef()
  }
  /* 当前事件函数的this指向的是当前函数的作用域，因此在调用阶段需要改变this指向，或者用箭头函数
   * 一般事件处理函数建议直接用箭头函数来书写即可解决this指向的问题
   */
  // handleClick(e) { 
  //   console.log('click')
  //   this.setState({
  //     appText: '666'
  //   })
  // }
  handleClick = (e) => {
    console.log('click')
    // this.setState({
    //   appText: '66666'
    // })
    this.setState({ // 最后一次会覆盖前面所有的setState操作
      appText: '88888'
    })
    setTimeout(() => {
      console.log(this.state.appText)
    }, 20)
  }
  getChildData = (msg) => {
    console.log('子组件传值')
    this.setState({
      childMsg: msg
    })
  }
  componentDidMount() {
    document.addEventListener('click', () => {
      this.setState({
        testText: 'update'
      })
      console.log(this.state.testText) // 同步获取
    }, false)
    this.appRef.current.setAttribute('style', 'color: red;')
    // this.forceUpdate()
  }
  render() {
    console.log(`render App:${new Date().getTime()}`)
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p onClick={ this.handleClick } ref={ this.appRef }>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/* <Button buttonText="你确定？？？"/> */}
          <Button buttonText={ this.state.appText } parent={ this } fontSize="12px"></Button>
          <h1>{ this.state.childMsg }</h1>
          <Input />
        </header>
      </div>
    )
  }
}

export default App
