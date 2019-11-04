import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.less';
import Button from '@/components/Button/button'

/* state向props的数据流动 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appText: 'are you ok?'
    }
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
    this.setState({
      appText: '66666'
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p onClick={ this.handleClick }>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {/* <Button buttonText="你确定？？？"/> */}
          <Button buttonText={ this.state.appText }></Button>
        </header>
      </div>
    )
  }
}

export default App
