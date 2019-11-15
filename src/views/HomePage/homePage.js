import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './homePage.less'

function ListData() { // 无状态组件
  const listData = [1,1,1,1,1,1,1]
  return (
    listData.map((item, index) => {
      return (
        <li key={ index }>{ item }</li>
      )
    })
  )
}

export default class HomePage extends Component {
  state = {
    data: 'home'
  }
  componentDidMount() {
    this.setState({
      data: 'update home'
    }, () => {
      console.log(this.state.data)
    })
  }
  render() {
    // const listData = [1,1,1,1,1,1,1]
    return (
    <div className="app">
      <h2>{ this.state.data }</h2>
      <Link to="/detail">detail</Link>
      <div></div>
      <NavLink to="/login">login</NavLink>
      <ListData />
    </div>
    )
  }
}