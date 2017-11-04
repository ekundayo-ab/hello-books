/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SingleInput from '../forms/SingleInput';
import Helper from './../../helpers/index';
import { login } from '../../actions/authActions';

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
            Materialize.toast(res.message, 1000, 'green');
            return this.props.history.push('/shelf');
          }
          this.setState({ errors: {}, isLoading: false });
          return Materialize.toast(res.message, 1000, 'red');
        },
      );
    }
  }

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
};

export default connect(null, { login })(SignIn);
