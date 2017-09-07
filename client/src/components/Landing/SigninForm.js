/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div id="login">
        <div className="row">
          <form method="get" action="shelf.html">
            <div className="input-field col s12">
              <input placeholder="Email Address" id="email" type="email" className="validate" />
            </div>
            <div className="input-field col s12">
              <input placeholder="Password" id="password" type="password" className="validate" />
            </div>
            <div className="col s6">
              <p>
                <input type="checkbox" id="check-log" />
                <label htmlFor="check-log"><i>Keep me logged in</i></label>
              </p>
            </div>
            <div className="col s6 right-align">
              <button type="submit" className="btn"><i className="fa fa-sign-in" />Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
