import React, { Component } from 'react'

export default class Detail extends Component {
  state = {
    data: 'detail'
  }
  render() {
    return (
    <div>{ this.state.data }</div>
    )
  }
}