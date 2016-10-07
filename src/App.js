import React from 'react'
import { Link } from 'react-router'

const Navbar = () => (
  <nav className="navbar navbar-light bg-faded">
    <a className="navbar-brand" href="#">Datavis.tech</a>
    <ul className="nav navbar-nav">
      <li className="nav-item active">
        <Link to="/">
          <a className="nav-link">Home</a>
        </Link>
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
      <Link to="/create">
        <button type="button" className="btn btn-primary">
          Create
        </button>
      </Link>
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
