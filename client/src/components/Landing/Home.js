/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, withRouter } from 'react-router-dom';
import Header from './Header';
import SignUp from './SignupForm';
import SignIn from './SigninForm';
import ForgotPassword from './ForgotPasswordForm';

class Home extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }
  render() {
    const isCurrent = this.props.location.pathname === '/';
    let theActiveClass;
    if (isCurrent) theActiveClass = 'mod-active';
    return (
      <div className="landing-page">
        <div className="page-wrapper">
          <Header />
          <br />
          <div className="container">
            <div className="row">
              <div className="col s12 m12 l6 center valign-wrapper intro-text">
                <h1 className="white-text">Read, think & Innovate</h1>
              </div>
              <div className="card col s12 m12 l6">
                <div className="card-tabs">
                  <ul className="mod-tabs mod-tabs-fixed-width">
                    <li className="mod-tab"><NavLink className={theActiveClass} activeClassName={'mod-active'} to="/register">Register</NavLink></li>
                    <li className="mod-tab"><NavLink activeClassName="mod-active" to="/login">Login</NavLink></li>
                    <li className="mod-tab hide-on-small-only"><NavLink activeClassName="mod-active" to="/forgot">Forgot Password</NavLink></li>
                  </ul>
                </div>
                <div className="card-content">
                  <Route exact path="/" component={SignUp} />
                  <Route path="/register" component={SignUp} />
                  <Route path="/login" component={SignIn} />
                  <Route path="/forgot" component={ForgotPassword} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
