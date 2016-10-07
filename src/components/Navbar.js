import React from 'react'
import { Link, IndexLink } from 'react-router'
const Navbar = () => (
  <nav className="navbar navbar-light bg-faded">
    <a className="navbar-brand" href="#">Datavis.tech</a>
    <ul className="nav navbar-nav">
      <li className="nav-item">
        <IndexLink to="/" className="nav-link" activeClassName="active">
          Home
        </IndexLink>
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
      <Link to="/create" className="btn btn-primary" activeStyle={{display: "none"}}>
        Create
      </Link>
    </form>
  </nav>
)
export default Navbar
