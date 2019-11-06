import React, { Component } from 'react'
import './input.less'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Bob'
    }
  }
  handleInput(e) {
    console.log(e.target.value)
  }
  render() {
    console.log(`render:${new Date().getTime()}`)
    return (
      <div>
        <h1>my name is { this.state.name }</h1>
        <input value={ this.state.name } onChange={ e=>this.setState({ name: e.target.value }) } onInput={this.handleInput.bind(this)}/>
      </div>
    )
  }
}

export default Input