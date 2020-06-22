import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

class NavBar extends Component {

  signOut(){

  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-blue fixed-top">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={`/dashboard`}>Dashboard</Link>
          </li>
        </ul>
      </div>
      <button
        className="btn btn-secondary"
        onClick={this.signOut.bind(this)}
      >Sign out
      </button>
      </nav>
    )
  }
}

export default NavBar
