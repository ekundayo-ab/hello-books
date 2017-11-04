/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { userSignUpRequest, isUserExists, login, googleAuth } from '../../actions/authActions';
import Helper from './../../helpers/index';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    googleAuth(response)
      .then((res) => {
        if (res.success) {
          this.props.history.push('/shelf');
        }
        return false;
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(this.state)
        .then((res) => {
          const errors = this.state.errors;
          let invalid;
          if (res.data.username || res.data.email) {
            errors[field] = `User exists with this ${field}`;
            invalid = true;
          } else {
            errors[field] = '';
            invalid = false;
          }
          this.setState({ errors, invalid });
        });
    }
  }

  isValid() {
    const { errors, isValid } = Helper.userValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignUpRequest(this.state)
        .then((res) => {
          if (res.data.success) {
            login({ identifier: this.state.username, password: this.state.password })
              .then((resp) => {
                if (resp.isAuthenticated) {
                  Materialize.toast(`${res.data.message} You're logged in, welcome`, 3000, 'green');
                  return this.props.history.push('/shelf');
                }
                return this.setState({ isLoading: true });
              });
          }
        })
        .catch(() => {
          Materialize.toast('Oops! Internal Server Error, try again', 3000, 'red');
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div id="register">
        <br />
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="center-align col s12">
              <GoogleLogin
                className="google-btn"
                clientId="530102763421-emmil7mu3jjlqr1c6vqm19k8mnc40cjp.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              >
                <i
                  className="fa fa-google-plus-official fa-2x"
                />
                 &nbsp; GOOGLE+
              </GoogleLogin><br /> <br />
              <span className="or"><i>Or</i></span>
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.username })}>
              <input
                placeholder="Username"
                id="username"
                type="text"
                className="validate"
                onBlur={this.checkUserExists}
                name="username"
                onChange={this.onChange}
                value={this.state.username}
              />
              {errors.username && <span className="help-block">{errors.username}</span> }
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.email })}>
              <input
                placeholder="Email Address"
                id="email"
                type="email"
                className="validate"
                onBlur={this.checkUserExists}
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
              {errors.email && <span className="help-block">{errors.email}</span> }
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.password })}>
              <input
                placeholder="Password"
                id="password"
                type="password"
                className="validate"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
              />
              {errors.password && <span className="help-block">{errors.password}</span> }
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.passwordConfirmation })}>
              <input
                placeholder="Confirm Password"
                id="passwordConfirmation"
                type="password"
                className="validate"
                name="passwordConfirmation"
                onChange={this.onChange}
                value={this.state.passwordConfirmation}
              />
              {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span> }
            </div>
            <div className="col s12">
              <button type="submit" disabled={this.state.isLoading || this.state.invalid} className="right-align btn teal"><i className="fa fa-user" /> Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isUserExists: PropTypes.func.isRequired,
};

export default
connect(null, { userSignUpRequest, isUserExists, login })(withRouter(SignUp));
