import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './views/HomePage/homePage'

const App = () => {
  return (
    <Router
      basename="/myapp" // 类比于vue-router的basename——公共url，且必须以/开头
      getUserConfirmation={(message, callback) => {
        const allowTransition = window.confirm(message);
        callback(allowTransition);
      }}
    >
      {/* 用于包裹Route组件，渲染第一个匹配的路由，不会重复匹配 */}
      <Switch> 
        <Route exact path="/"> 
          <Redirect to="/homePage" />
        </Route>
        <Route path="/homePage">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App