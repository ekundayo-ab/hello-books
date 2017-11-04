/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <nav className="teal">
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">HelloBooks</Link>
      <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
      <ul className="right hide-on-med-and-down">
        <li><NavLink activeClassName="teal darken-2" to="/register">REGISTER</NavLink></li>
        <li><NavLink activeClassName="teal darken-2" to="/login">LOGIN</NavLink></li>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <li className="mobile-header"><Link to="/">HelloBooks</Link></li>
        <li><NavLink activeClassName="teal white-text" to="/register"><i className="fa fa-users" /> REGISTER</NavLink></li>
        <li><NavLink activeClassName="teal white-text" to="/login"><i className="fa fa-sign-in" /> LOGIN</NavLink></li>
      </ul>
    </div>
  </nav>
);

export default Header;
