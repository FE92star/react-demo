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