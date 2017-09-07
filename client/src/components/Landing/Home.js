/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Header from './Header';
import SignUp from './SignupForm';
import SignIn from './SigninForm';
import ForgotPassword from './ForgotPasswordForm';

class Home extends Component {
  render() {
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
                  <ul className="tabs tabs-fixed-width">
                    <li className="tab"><a href="#register">Register</a></li>
                    <li className="tab"><a className="active" href="#login">Login</a></li>
                    <li className="tab"><a href="#forgot">Forgot Password</a></li>
                  </ul>
                </div>
                <div className="card-content">
                  <SignUp />
                  <SignIn />
                  <ForgotPassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
