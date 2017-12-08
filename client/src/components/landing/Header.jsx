import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * @description Displays the Header section of the landing page
 * @param {void} null
 * @returns {string} - HTML markup of the landing page header section
 */
const Header = () => (
  <nav className="teal">
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">HelloBooks</Link>
      <Link to="#" data-activates="mobile-demo" className="button-collapse">
        <i className="material-icons">menu</i></Link>
      <ul className="right hide-on-med-and-down">
        <li><NavLink activeClassName="teal darken-2" to="/register">
        REGISTER</NavLink></li>
        <li><NavLink activeClassName="teal darken-2" to="/login">
        LOGIN</NavLink></li>
        <li>
          <a href="https://hellobooks-e.herokuapp.com/api/docs/" >
          API Docs
          </a>
        </li>
        <li>
          <a href="https://github.com/ekundayo-ab/hello-books" >
          Github Repo
          </a>
        </li>
        <li>
          <a href="https://www.pivotaltracker.com/n/projects/2087065" >
          Project Management Board
          </a>
        </li>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <li className="mobile-header"><Link to="/">HelloBooks</Link></li>
        <li><NavLink activeClassName="teal white-text" to="/register">
          <i className="fa fa-users" /> REGISTER</NavLink></li>
        <li><NavLink activeClassName="teal white-text" to="/login">
          <i className="fa fa-sign-in" /> LOGIN</NavLink></li>
        <li>
          <a href="https://hellobooks-e.herokuapp.com/api/docs/" >
            <i className="fa fa-book" /> API Docs
          </a>
        </li>
        <li>
          <a href="https://github.com/ekundayo-ab/hello-books" >
            <i className="fa fa-code-fork" /> Github Repo
          </a>
        </li>
        <li>
          <a href="https://www.pivotaltracker.com/n/projects/2087065" >
            <i className="fa fa-briefcase" /> Project Management Board
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
