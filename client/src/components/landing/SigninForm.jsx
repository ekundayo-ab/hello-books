import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleInput from '../forms/SingleInput';
import Helper from './../../helpers/Helper';
import { login } from '../../actions/authActions';

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
            Materialize.toast(res.message, 1000, 'green');
            return this.props.history.push('/shelf?page=1');
          }
          this.setState({ errors: {}, isLoading: false });
          return Materialize.toast(res.message, 1000, 'red');
        },
      );
    }
    this.setState({ errors });
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
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(SignInForm);
