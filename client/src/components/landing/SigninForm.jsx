import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import SingleInput from '../forms/SingleInput';
import Helper from './../../helpers/Helper';
import { login, googleAuth } from '../../actions/authActions';

/**
 * @description represents SignIn form
 *
 * @class SignIn
 *
 * @extends {Component}
 */
export class SignInForm extends Component {
  /**
   * Creates an instance of SignIn.
   *
   * @param {object} props
   *
   * @memberof SignUp
   *
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * @description handles event changes for form fields
   *
   * @param {object} event
   *
   * @returns {void} null
   *
   * @memberof SignIn
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles form submission
   *
   * @param {object} event
   *
   * @returns {boolean} isLoading - needed to disable submit button
   * @returns {object} action - redirects to library shelf
   * @returns {object} action - notifies of errors
   *
   * @memberof SignIn
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = Helper.loginValidation(this.state);
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => {
          if (res.isAuthenticated) {
            return this.props.history.push('/shelf?page=1');
          }
          this.setState({ errors: {}, isLoading: false });
        },
      );
    }
    this.setState({ errors });
  }

  /**
   * @description handles callback during Google signup and signin
   *
   * @param {object} response
   *
   * @returns {boolean} or redirects
   *
   * @memberof SignUp
   */
  responseGoogle(response) {
    this.props.googleAuth(response)
      .then((res) => {
        if (res.success) {
          this.props.history.push('/shelf?page=1');
        }
        return false;
      });
  }

  /**
   * @description displays the registration form
   *
   * @param {void} null
   *
   * @returns {string} HTML markup for SignIn form
   *
   * @memberof SignIn
   */
  render() {
    const { errors } = this.state;
    return (
      <div id="login">
        <div className="row">
          <div className="center-align col s12">
            <GoogleLogin
              className="red darken-2 google-btn"
              clientId={'1037424306341' +
              '-av656qd87qifs0vsbhp67ej5n' +
              '04359us.apps.googleusercontent.com'}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={
                () => {
                  Materialize.toast('Oops! try again', 4000, 'red');
                }
              }
            >
              <i className="fa fa-google-plus-official fa-2x" />
              &nbsp; GOOGLE+
            </GoogleLogin><br /> <br />
            <span className="or"><i>Or</i></span>
          </div>
          <form onSubmit={this.onSubmit}>
            <SingleInput
              placeholder="Username or Email"
              identifier="identifier"
              inputName="identifier"
              inputType="text"
              inputClass="validate"
              controlFunc={this.onChange}
              content={this.state.identifier}
              fieldError={errors.identifier}
            />
            <SingleInput
              placeholder="Password"
              identifier="password"
              inputName="password"
              inputType="password"
              inputClass="validate"
              controlFunc={this.onChange}
              content={this.state.password}
              fieldError={errors.password}
            />
            <div className="col s12">
              <button
                type="submit"
                disabled={this.state.isLoading || this.state.invalid}
                className="right-align btn teal login-btn"
              ><i className="fa fa-user" /> Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  login: PropTypes.func.isRequired,
  googleAuth: PropTypes.func.isRequired
};

export default connect(null, { login, googleAuth })(SignInForm);
