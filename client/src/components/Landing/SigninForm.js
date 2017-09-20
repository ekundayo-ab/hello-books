/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helper from './../../helpers/index';
import { login } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/messageActions';
import FlashMessagesList from '../../components/flash/FlashMessagesList';

class SignIn extends Component {
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = Helper.loginValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      login(this.state).then(
        (res) => {
          if (res.isAuthenticated) {
            this.props.addFlashMessage({
              type: 'success',
              text: res.message,
            });
            return this.props.history.push('/shelf');
          }
          this.setState({ errors: {}, isLoading: false });
          return this.props.addFlashMessage({
            type: 'error',
            text: res.message,
          });
        },
      );
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div id="login">
        <FlashMessagesList />
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className={classnames('input-field', 'col s12', { 'has-error': errors.identifier })}>
              <input
                placeholder="Username"
                id="identifier"
                type="text"
                className="validate"
                name="identifier"
                onChange={this.onChange}
                value={this.state.username}
              />
              {errors.identifier && <span className="help-block">{errors.identifier}</span> }
            </div>
            <div className={classnames('input-field', 'col s12', { 'has-error': errors.password })}>
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
            <div className="col s6">
              <p>
                <input type="checkbox" id="check-log" />
                <label htmlFor="check-log"><i>Keep me logged in</i></label>
              </p>
            </div>
            <div className="col s12">
              <button type="submit" disabled={this.state.isLoading || this.state.invalid} className="right-align btn teal"><i className="fa fa-user" /> Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, { login, addFlashMessage })(withRouter(SignIn));
