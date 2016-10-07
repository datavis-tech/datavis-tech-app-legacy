import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Create from './components/Create'

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="create" component={Create}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
