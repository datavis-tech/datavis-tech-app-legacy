import React from 'react'
import CreateButton from './components/CreateButton'

const Navbar = () => (
  <nav className="navbar navbar-light bg-faded">
    <a className="navbar-brand" href="#">Navbar</a>
    <ul className="nav navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About</a>
      </li>
    </ul>
    <form className="form-inline pull-xs-right">
      <CreateButton/>
    </form>
  </nav>
)

const App = ({children}) => (
  <div className="container-fluid">
    <Navbar/>
    {children}
  </div>
)
export default App
