/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="teal">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">HelloBooks</a>
          <a href="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="shelf.html">REGISTER</a></li>
            <li><a href="shelf.html">LOGIN</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li className="mobile-header"><a href="">HelloBooks</a></li>
            <li><a href="shelf.html"><i className="fa fa-sign-in" /> REGISTER</a></li>
            <li><a href="shelf.html"><i className="fa fa-sign-out" /> LOGIN</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
