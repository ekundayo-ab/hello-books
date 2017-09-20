/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { addFlashMessage } from '../../../actions/messageActions';
import { logout } from '../../../actions/authActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    e.preventDefault();
    logout(this.state);
    this.props.addFlashMessage({
      type: 'success',
      text: 'Successfully Logged out.',
    });
    return this.props.history.push('/');
  }
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
              <li><Link onClick={this.handleLogout} to=""><i className="fa fa-sign-out" /> Logout</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li className="mobile-header"><Link to="">HelloBooks</Link></li>
              <li><NavLink activeClassName="active" to="/shelf">Shelf</NavLink></li>
              <li><NavLink activeClassName="active" to="/history">History</NavLink></li>
              <li><NavLink activeClassName="active" to="/admin"><i className="fa fa-gear" /> Admin Dashboard</NavLink></li>
              <li><NavLink activeClassName="active" to="/profile"><i className="fa fa-user" /> Profile</NavLink></li>
              <li><Link onClick={this.handleLogout} to="/"><i className="fa fa-sign-out" /> Logout</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, { logout, addFlashMessage })(withRouter(Header));
