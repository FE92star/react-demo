import React, { Component } from 'react'
import './button.less'

// function Button() {
//   return (
//     <div className="button">
//       <button>learn react</button>
//     </div>
//   )
// }

class Button extends Component {
  // 初始化页面状态，绑定事件方法
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     status: false
  //   }
  // }
  state = { // 不需要写成this.state，直接state初始化即可
    status: false,
    msg: 'i am child msg!!!'
  }
  // 钩子函数，在此处改变状态
  componentDidMount() {
    this.setState({ // 异步改变状态
      status: true
    }, () => {
      console.log(`callback: new status ${this.state.status}`)
    })
    console.log(`async state: ${this.state.status}`)
  }
  toParent = () => {
    this.props.parent.getChildData(this.state.msg)
  }
  render() {
    console.log(`render button:${new Date().getTime()}`)
    return (
      <div className="button" onClick={ this.toParent }>
       {
         this.state.status ? (
          <button>{ this.props.buttonText }</button>
         ) : null
       }
     </div>
    )
  }
}

export default Button