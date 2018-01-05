import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import SingleInput from '../forms/SingleInput';
import { userSignUpRequest, doesUserExist, login, googleAuth }
  from '../../actions/authActions';
import Helper from './../../helpers/Helper';

/**
 * @description represents SignUp form
 *
 * @class SignUp
 *
 * @extends {Component}
 */
export class SignUpForm extends Component {
  /**
   * Creates an instance of SignUp.
   *
   * @param {object} props - The properties passed to the component
   *
   * @memberof SignUp
   *
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
   *
   * @param {object} event - Form inputs events on the sign-up form
   *
   * @returns {void} null
   *
   * @memberof SignUp
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description handles form submission
   *
   * @param {object} event - Form submission event caught when submitting the
   * Sign-Up form
   *
   * @returns {boolean} isLoading - needed to disable submit button
   *
   * @returns {object} redirects to library shelf
   *
   * @memberof SignUp
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors, isValid } = Helper.userValidation(this.state);
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      return this.props.userSignUpRequest(this.state)
        .then(() => this.props.history.push('/shelf'));
    }
    this.setState({ errors });
  }

  /**
   * @description checks if username or email exists
   *
   * @param {object} event - Form inputs event fired when filling the Sign-Up
   * form
   *
   * @returns {void} null
   *
   * @memberof SignUp
   */
  checkUserExists(event) {
    const field = event.target.name;
    const val = event.target.value;
    if (val !== '') {
      this.props.doesUserExist(this.state)
        .then((res) => {
          const { errors } = this.state;
          const { exists } = res;
          let invalid;
          if (exists) {
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
   * @description handles callback during Google signup and signin
   *
   * @param {object} response - The response payload sent from google when
   * signing up a user through google
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
   * @param {void} null - Has no parameter
   *
   * @returns {string} HTML markup for the SignUp form
   *
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
                className="red darken-2 google-btn"
                clientId={'1037424306341-av656qd87qifs0vsbhp67ej5n04359us.apps.googleusercontent.com'}
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
                className="right-align btn teal register-btn"
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
SignUpForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  googleAuth: PropTypes.func.isRequired,
  userSignUpRequest: PropTypes.func.isRequired,
  doesUserExist: PropTypes.func.isRequired
};

export default
connect(null, { googleAuth, login, userSignUpRequest, doesUserExist })(
  withRouter(SignUpForm));
