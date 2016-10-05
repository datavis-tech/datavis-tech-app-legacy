import React, { Component } from 'react'
import CreateDocumentButton from './components/CreateDocumentButton'

import '../public/bootstrap.min.css'

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <CreateDocumentButton/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
