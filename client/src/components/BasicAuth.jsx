/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authenticate extends Component {
    componentWillMount() {
      if (localStorage.getItem('jwtToken') === null) {
        Materialize.toast('You need to login to access this page', 3000, 'red');
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.users.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
