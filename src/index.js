import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Create from './components/Create'
import Consulting from './components/Consulting'
import About from './components/About'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="create" component={Create}/>
      <Route path="consulting" component={Consulting}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
