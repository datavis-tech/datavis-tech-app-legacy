import React from 'react'
import { Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'

const Navbar = ({ isLoggedIn }) => (
  <nav className="navbar navbar-light bg-faded">

    <div className="container">

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
      <form className="form-inline float-xs-right">
        <Link to="/create" className="btn btn-primary" activeStyle={{display: 'none'}}>
          Create
        </Link> {
          isLoggedIn ? (
            <a href="/api/auth/logout" className="btn btn-primary">Log out</a>
          ) : (
            <a href="/api/auth/github" className="btn btn-primary">Log in</a>
          )
        }
      </form>
    </div>
  </nav>
)

const mapStateToProps = ({ user: {isLoggedIn}}) => ({ isLoggedIn })

export default connect(mapStateToProps)(Navbar)
