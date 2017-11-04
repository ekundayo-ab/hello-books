import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import SingleInput from '../forms/SingleInput';
import { userSignUpRequest, isUserExists, login, googleAuth }
  from '../../actions/authActions';
import Helper from './../../helpers/index';

/**
 * @description represents SignUp form
 * @class SignUp
 * @extends {Component}
 */
class SignUp extends Component {
  /**
   * Creates an instance of SignUp.
   * @param {object} props
   * @memberof SignUp
   * @constructor
   */
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

  /**
   * @description handles event changes for form fields
   * @param {object} event
   * @returns {void} null
   * @memberof SignUp
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles form submission
   * @param {object} event
   * @returns {boolean} isLoading - needed to disable submit button
   * @returns {object} redirects to library shelf
   * @memberof SignUp
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignUpRequest(this.state)
        .then((res) => {
          if (res.data.success) {
            login({
              identifier: this.state.username,
              password: this.state.password
            })
              .then((resp) => {
                if (resp.isAuthenticated) {
                  Materialize.toast(
                    `${res.data.message} You're logged in, welcome`,
                    3000, 'green');
                  return this.props.history.push('/shelf');
                }
                return this.setState({ isLoading: true });
              });
          }
        })
        .catch(() => {
          Materialize.toast('Oops! Internal Server Error, try again',
            3000, 'red');
          this.setState({ isLoading: false });
        });
    }
  }

  /**
   * @description checks if username or email exists
   * @param {object} event
   * @returns {void} null
   * @memberof SignUp
   */
  checkUserExists(event) {
    const field = event.target.name;
    const val = event.target.value;
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

  /**
   * @description ensures form fields are filled with expected inputs
   * @param {void} null
   * @returns {boolean} isValid
   * @memberof SignUp
   */
  isValid() {
    const { errors, isValid } = Helper.userValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * @description handles callback during Google signup and signin
   * @param {object} response
   * @returns {boolean} or redirects
   * @memberof SignUp
   */
  responseGoogle(response) {
    googleAuth(response)
      .then((res) => {
        if (res.success) {
          this.props.history.push('/shelf?page=1');
        }
        return false;
      });
  }

  /**
   * @description displays the registration form
   * @param {void} null
   * @returns {string} HTML markup for the SignUp form
   * @memberof SignUp
   */
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
                clientId={'530102763421' +
                '-emmil7mu3jjlqr1c6vqm19k8mn' +
                'c40cjp.apps.googleusercontent.com'}
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              >
                <i className="fa fa-google-plus-official fa-2x" />
                 &nbsp; GOOGLE+
              </GoogleLogin><br /> <br />
              <span className="or"><i>Or</i></span>
            </div>
            <SingleInput
              placeholder="Username"
              identifier="username"
              inputType="text"
              inputClass="validate"
              inputName="username"
              controlFunc={this.onChange}
              effectFunc={this.checkUserExists}
              content={this.state.username}
              fieldError={errors.username}
            />

            <SingleInput
              placeholder="Email Address"
              identifier="email"
              inputType="email"
              inputClass="validate"
              inputName="email"
              controlFunc={this.onChange}
              effectFunc={this.checkUserExists}
              content={this.state.email}
              fieldError={errors.email}
            />
            <SingleInput
              placeholder="Password"
              identifier="password"
              inputType="password"
              inputClass="validate"
              inputName="password"
              controlFunc={this.onChange}
              content={this.state.password}
              fieldError={errors.password}
            />
            <SingleInput
              placeholder="Confirm Password"
              identifier="passwordConfirmation"
              inputType="password"
              inputClass="validate"
              inputName="passwordConfirmation"
              controlFunc={this.onChange}
              content={this.state.passwordConfirmation}
              fieldError={errors.passwordConfirmation}
            />
            <div className="col s12">
              <button
                type="submit"
                disabled={this.state.isLoading || this.state.invalid}
                className="right-align btn teal"
              >
                <i className="fa fa-user" /> Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Type checking for SignUp form
SignUp.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  isUserExists: PropTypes.func.isRequired,
};

export default
connect(null, { userSignUpRequest, isUserExists, login })(withRouter(SignUp));
