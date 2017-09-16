/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="admin-page shelf-page">
        <div className="nav-top row">
          <div className="col s12 center-align">
            <Link to="/shelf"><h4>Hello<span className="nav-top-marker">books</span></h4></Link>
          </div>
        </div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">HelloBooks</Link>
            <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
            <ul className="right hide-on-med-and-down">
              <li><NavLink activeClassName="active" to="/shelf">Shelf</NavLink></li>
              <li><NavLink activeClassName="active" to="/history">History</NavLink></li>
              <li><NavLink activeClassName="active" to="/admin"><i className="fa fa-gear" /> Admin Dashboard</NavLink></li>
              <li><NavLink activeClassName="active" to="/profile"><i className="fa fa-user" /> Profile</NavLink></li>
              <li><Link to=""><i className="fa fa-sign-out" /> Logout</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li className="mobile-header"><Link to="">HelloBooks</Link></li>
              <li><NavLink activeClassName="active" to="/shelf">Shelf</NavLink></li>
              <li><NavLink activeClassName="active" to="/history">History</NavLink></li>
              <li><NavLink activeClassName="active" to="/admin"><i className="fa fa-gear" /> Admin Dashboard</NavLink></li>
              <li><NavLink activeClassName="active" to="/profile"><i className="fa fa-user" /> Profile</NavLink></li>
              <li><Link to="/"><i className="fa fa-sign-out" /> Logout</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
