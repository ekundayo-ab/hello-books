/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

export default function (ComposedComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.token = localStorage.getItem('jwtToken');
      jwt.verify(this.token, 'hello-books', (err, decoded) => {
        this.isAdmin = decoded.data;
      });
    }

    componentWillMount() {
      if (localStorage.getItem('jwtToken') === null || !this.props.isAuthenticated) {
        Materialize.toast('You need to login to access this page', 3000, 'red');
        this.props.history.push('/login');
      }

      if (this.isAdmin.role !== 'admin') {
        Materialize.toast('Administrative rights is needed to access that page', 3000, 'red');
        this.props.history.push('/shelf');
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
    location: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.users.isAuthenticated,
    };
  }

  return connect(mapStateToProps)(Authenticate);
}
