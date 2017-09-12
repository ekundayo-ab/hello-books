/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';
import signUpAction from '../../actions/signUpActions';
import { addFlashMessage } from '../../actions/flashMessages';
import Helper from './../../helpers/index';

const userSignUpRequest = signUpAction.userSignUpRequest;

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
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
        .then((done) => {
          this.props.addFlashMessage({
            type: 'success',
            text: done,
          });
          this.props.history.push('/shelf');
        })
        .catch((err) => {
          this.setState({ errors: err.response.data.errors, isLoading: false });
        });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div id="register">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="center-align col s12">
              <button className="btn red"><i className="fa fa-google-plus-official fa-2x" /> Google+</button><br />
              <span className="or"><i>Or</i></span>
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.username })}>
              <input
                placeholder="Username"
                id="username"
                type="text"
                className="validate"
                name="username"
                onChange={this.onChange}
                value={this.state.username}
              />
              {errors.username && <span className="help-block">{errors.username}</span> }
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.username })}>
              <input
                placeholder="Email Address"
                id="email"
                type="email"
                className="validate"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
              {errors.email && <span className="help-block">{errors.email}</span> }
            </div>
            <div className={classname('input-field', 'col s12', { 'has-error': errors.username })}>
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
            <div className={classname('input-field', 'col s12', { 'has-error': errors.username })}>
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
            <div className={classname('input-field', 'col s12', { 'has-error': errors.username })}>
              <button type="submit" disabled={this.state.isLoading} className="right-align btn teal"><i className="fa fa-user" /> Register</button>
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
  addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, { userSignUpRequest, addFlashMessage })(withRouter(SignUp));
