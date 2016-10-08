import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Create from './components/Create'

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="create" component={Create}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
