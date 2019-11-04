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
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }
  // 钩子函数，在此处改变状态
  componentDidMount() {
    this.setState({
      status: true
    })
  }
  handleBtnClick(e) {
    console.log(e)
  }
  render() {
    return (
      <div className="button" onClick={ this.handleBtnClick }>
       {
         this.state.status ? 
         <button>{ this.props.buttonText }</button>
         : null
       }
     </div>
    )
  }
}

export default Button