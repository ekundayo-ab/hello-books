/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignUp extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render() {
    const { location } = this.props;
    return (
      <div id="register">
        <div className="row">
          <form method="get" action="shelf.html">
            <div className="center-align col s12">
              <button className="btn red"><i className="fa fa-google-plus-official fa-2x" /> Google+</button><br />
              <span className="or"><i>Or</i></span>
            </div>
            <div className="input-field col s12">
              <input placeholder="Username" id="username" type="text" className="validate" />
            </div>
            <div className="input-field col s12">
              <input placeholder="Email Address" id="email" type="email" className="validate" />
            </div>
            <div className="input-field col s12">
              <input placeholder="Password" id="password" type="password" className="validate" />
            </div>
            <div className="input-field col s12">
              <input placeholder="Confirm Password" id="password" type="password" className="validate" />
            </div>
            <div className="col s12 right-align">
              <button type="submit" className="right-align btn teal"><i className="fa fa-user" /> Register</button>
            </div>{location.pathname}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
