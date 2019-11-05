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
    status: false
  }
  // 钩子函数，在此处改变状态
  componentDidMount() {
    this.setState({
      status: true
    }, () => {
      console.log(`callback:${this.state.status}`)
    })
  }
  render() {
    return (
      <div className="button" onClick={ this.props.onClick }>
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