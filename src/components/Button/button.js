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
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 钩子函数
  componentDidMount() {

  }
  render() {
    return (
      <div className="button">
       <button>{ this.props.buttonText }</button>
     </div>
    )
  }
}

export default Button