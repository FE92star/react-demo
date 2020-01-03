import React, { useState, useEffect, useMemo, useCallback, useRef, Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './homePage.less'

// function ListData(props) { // 无状态组件
//   const listData = [1,1,1,1,1,1,1]
//   const { name } = props
//   return (
//     listData.map((item, index) => {
//       return (
//         <li key={ index }>{ name }</li>
//       )
//     })
//   )
// }

class ListData extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }
  componentDidMount() {
    // console.log(this.props.name)
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)
  }
  render() {
    return (
      <p>66666</p>
    )
  }
}

export default class HomePage extends Component {
  state = {
    data: 'home',
    obj: {
      name: 'state',
      title: 'good'
    }
  }
  componentDidMount() {
    this.setState({
      data: 'update home'
    }, () => {
      console.log(this.state.data)
    })
  }
  handleClick = () => {
    this.setState({
      obj: {
        name: 'new state'
      }
    })
  }
  render() {
    // const listData = [1,1,1,1,1,1,1]
    return (
      <div className="app">
        <button onClick={this.handleClick}></button>
        <h2>{ this.state.data }</h2>
        <Link to="/detail">detail</Link>
        <div></div>
        <NavLink to="/login">login</NavLink>
        <ListData name={this.state.obj} />
      </div>
    )
  }
}

export function checkDataType (type) { // 高阶函数
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}
/* 防抖函数 */
/* 一般应用于用户的输入，视窗的变化，只在规定的时间内触发一次，节省资源 */
/* 高阶函数——返回一个新的函数，新函数作为可以调用的方法存储起来，函数的调用将会在delay延时之后只执行一次，每次事件触发则会重新触发计时，理论上如果一直触发则函数可能永远不会执行 */
export function debounce (fn, delay) {
  return function (args) {
    const self = this
    let timer = null
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(self, args)
    }, delay)
  }
}
/* 节流函数 */
/* 将多次触发合并成一次，并且最终肯定会执行一次，初始化肯定会执行一次 */
/* 高阶函数 */
export function throttle (fn, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date() // 日期格式的隐式转换
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fn.apply(that, _args)
      }, delay)
    } else {
      last = now
      fn.apply(that, _args)
    }
  }
}
// export function ListData (props) {
//   const { name } = props
//   const [list, setList] = useState([])
//   const [count, setCount] = useState(1)
//   const listMap = useMemo(() => {
//     console.log('render', new Date().getTime())
//     return count * 10
//   }, [count])
//   const fetchData = useCallback(async () => {
//     const listData = await function () {
//       const data = [1, 2, 3]
//       return data
//     }
//     setList(listData)
//   }, [])
//   useEffect(() => {
//     fetchData()
//   }, [fetchData])
//   useEffect(() => {
//     setCount(10)
//     console.log(count, 'count')
//   })
//   useEffect(() => {
//     // console.log('effect hooks')
//   }) 
//   const listStyle = {
//     color: '#000'
//   }
//   console.log('reRender', new Date().getTime())
//   return (
//     <div>
//       <p>{ name }</p>
//       {
//         list.map((item, index) => {
//           return (
//             <React.Fragment key={index}>
//               <li style={listStyle}>{ item }</li>
//               <li style={listStyle}>{ listMap }</li>
//             </React.Fragment>
//           )
//         })
//       }
//     </div>
//   )
// }

// export default function HomePage (props) {
//   const [title, setTitle] = useState('')
//   const [name, setName] = useState('Bob')
//   const count = useRef(0)
//   useEffect(() => {
//     const domTitle = document.title
//     setTitle(domTitle)
//   }, [])

//   const handleClick = () => {
//     count.current++
//     setTimeout(() => {
//       console.log(count)
//     }, 3000)
//   }
//   return (
//     <div>
//       <button onClick={handleClick}>change</button>
//       { title }
//       <ListData name={name} />
//     </div>
//   )
// }