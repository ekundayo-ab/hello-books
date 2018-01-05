import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Header from './Header';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
// import ForgotPassword from './ForgotPasswordForm'; // TODO:Write logic

/**
 * @description represents application's landing page
 * @class Home
 * @extends {Component}
 */
export class Home extends Component {
  /**
   * @description Invoked before component mounts
   *
   * @param {void} null - Has no parameter
   *
   * @returns {void} returns nothing, but redirects conditionally
   *
   * @memberof Home
   */
  componentWillMount() {
    if (localStorage.getItem('jwtToken') !== null) {
      this.props.history.push('/shelf');
    }
  }

  /**
   * @description displays the application's landing page
   *
   * @param {void} null
   *
   * @returns {string} - HTML markup for the landing page
   *
   * @memberof Home
   */
  render() {
    const isCurrent = this.props.location.pathname === '/';
    let theActiveClass;
    if (isCurrent) theActiveClass = 'mod-active';
    return (
      <div className="landing-page">
        <div className="page-wrapper">
          <Header />
          <br />
          <div className="container-fluid">
            <div className="row">
              <div className="col s12 m6 l5 center valign-wrapper intro-text">
                <h1 className="white-text">Read, think & Innovate</h1>
              </div>
              <div className="card col s12 m6 offset-l1 l5">
                <div className="card-tabs">
                  <ul className="mod-tabs mod-tabs-fixed-width">
                    <li className="mod-tab">
                      <NavLink
                        className={theActiveClass}
                        activeClassName={'mod-active'}
                        to="/register"
                      >Register
                      </NavLink></li>
                    <li className="mod-tab">
                      <NavLink activeClassName="mod-active" to="/login">
                      Login</NavLink></li>
                    {/* TODO: Forgot password logic implementation
                      <li className="mod-tab">
                        <NavLink activeClassName="mod-active" to="/forgot">
                        Forgot Password</NavLink></li> */}
                  </ul>
                </div>
                <div className="card-content">
                  <Switch>
                    <Route exact path="/" component={SignUpForm} />
                    <Route exact path="/register" component={SignUpForm} />
                    <Route exact path="/login" component={SignInForm} />
                    {/* TODO: Forgot password logic implementation
                    <Route exact path="/forgot" component={ForgotPassword} />
                    */}
                    <Redirect path="*" to="/login" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

// Type checking for Home(Landing Page) component
Home.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
};

export default withRouter(Home);
