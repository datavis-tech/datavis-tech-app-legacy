import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import ShareProvider from './share/ShareProvider'

import App from './components/App'
import Home from './components/Home'
import Create from './components/Create'
import Consulting from './components/Consulting'
import About from './components/About'
import Document from './components/Document'
import Vis from './components/Vis'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="consulting" component={Consulting}/>
    <Route path="about" component={About}/>
    <Route path="create" component={Create}/>
    <Route path=":id" component={Document}/>
    <Route path="vis/:id" component={Vis}/>
  </Route>
)

ReactDOM.render(
  <ShareProvider>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </ShareProvider>,
  document.getElementById('root')
)
