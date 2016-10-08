import React from 'react'
import { Link, IndexLink } from 'react-router'
const Navbar = () => (
  <nav className="navbar navbar-light bg-faded">

    <IndexLink to="/" className="navbar-brand">
      Datavis.tech
    </IndexLink>

    <ul className="nav navbar-nav">

      <li className="nav-item">
        <IndexLink to="/" className="nav-link" activeClassName="active">
          Home
        </IndexLink>
      </li>

      <li className="nav-item">
        <Link to="/consulting" className="nav-link" activeClassName="active">
          Consulting
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/about" className="nav-link" activeClassName="active">
          About
        </Link>
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
