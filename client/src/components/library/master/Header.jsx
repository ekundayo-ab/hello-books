import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { logout } from '../../../actions/authActions';

/**
 *
 * @description represents Header for the library pages
 *
 * @class Header
 *
 * @extends {Component}
 */
export class Header extends Component {
  /**
   * Creates an instance of Header.
   *
   * @param {object} props
   *
   * @memberof Header
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNotify = this.handleNotify.bind(this);
  }

  /**
   * @description logs out user and clears local storage
   *
   * @param {object} event
   *
   * @returns {string} redirects to landing page
   *
   * @memberof Header
   */
  handleLogout() {
    this.props.logout(this.state);
    return this.props.history.push('/');
  }

  /**
   * @description reveals borrowing and return notifications
   *
   * @param {null} nothing
   *
   * @returns {string} redirects to admin page then shows notifications
   *
   * @memberof Header
   */
  handleNotify() {
    this.props.history.push('/admin?page=1');
    setTimeout(() => {
      $('html, body').animate({
        scrollTop: $('.notify-section').offset().top
      }, 2000);
    }, 50);
  }

  /**
   * @description Displays the Header section of the library pages
   *
   * @param {void} null
   *
   * @returns {string} - HTML markup of Header component
   *
   * @memberof Header
   */
  render() {
    return (
      <div className="admin-page shelf-page">
        <div className="nav-top row">
          <div className="col s12 center-align">
            <Link to="/shelf?page=1">
              <h4>Hello<span className="nav-top-marker">books</span></h4></Link>
          </div>
        </div>
        {this.props.isAdmin === 'admin' ?
          <a
            href="#!"
            className="notify-container"
            onClick={this.handleNotify}
          >
            <i className="fa fa-2x fa-bell" />
          </a> : '' }
        {this.props.isAdmin === 'admin' ?
          <span id="notify-popout" >&#8595;</span> : ''}
        <nav>
          <div className="nav-wrapper">
            <a
              href="#!"
              data-activates="mobile-demo"
              className="button-collapse"
            ><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li id="lib-shelf">
                <NavLink
                  activeClassName="active"
                  to="/shelf?page=1"
                ><i className="fa fa-book" /> Shelf</NavLink>
              </li>
              <li id="lib-history">
                <NavLink activeClassName="active" to="/history?page=1">
                  <i className="fa fa-history" /> History</NavLink>
              </li>
              {this.props.isAdmin === 'admin'
                && <li id="lib-admin">
                  <NavLink activeClassName="active" to="/admin?page=1">
                    <i className="fa fa-gear" /> Admin Dashboard</NavLink>
                </li>}
              <li id="lib-profile">
                <NavLink activeClassName="active" to="/profile?page=1">
                  <i className="fa fa-user" /> Profile</NavLink>
              </li>
              <li className="logout">
                <Link onClick={this.handleLogout} to="">
                  <i className="fa fa-sign-out" /> Logout</Link>
              </li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li className="mobile-header"><Link to="">HelloBooks</Link></li>
              <li>
                <NavLink activeClassName="active" to="/shelf?page=1">
                  <i className="fa fa-book" /> Shelf</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/history?page=1">
                  <i className="fa fa-history" /> History</NavLink>
              </li>
              {this.props.isAdmin === 'admin' &&
              <li>
                <NavLink activeClassName="active" to="/admin?page=1">
                  <i className="fa fa-gear" /> Admin Dashboard</NavLink>
              </li>}
              <li>
                <NavLink activeClassName="active" to="/profile?page=1">
                  <i className="fa fa-user" /> Profile</NavLink>
              </li>
              <li>
                <Link onClick={this.handleLogout} to="">
                  <i className="fa fa-sign-out" /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

// Set value for default props in Header component
Header.defaultProps = {
  isAdmin: '',
};

// Type checking for Header component
Header.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  isAdmin: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

/**
 * @description maps the state in redux store to Header props
 *
 * @param {object} state
 *
 * @returns {object} isAuthenticated, isAdmin
 */
export function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isAdmin: state.users.user.role,
  };
}

export default withRouter(connect(mapStateToProps, { logout })(Header));
