import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    data: 'login'
  }
  render() {
    return (
    <div>{ this.state.data }</div>
    )
  }
}