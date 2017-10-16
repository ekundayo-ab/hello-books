/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyToken from '../utils/verifyAuthorizationToken';
import Header from '../components/library/master/Header';
import { setCurrentUser } from '../actions/authActions';

export default function (ComposedComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isFetching: false,
      };
    }
    componentWillMount() {
      if (localStorage.getItem('jwtToken') === null) {
        Materialize.toast('Oops! Something Happened, Please login.', 3000, 'red');
        this.props.history.push('/login');
      } else {
        verifyToken({ token: localStorage.getItem('jwtToken') })
          .then((rex) => {
            this.props.setCurrentUser(rex);
          })
          .catch(() => {
            Materialize.toast('Oops! Something happened, Allow us verify you again', 3000, 'red');
            localStorage.removeItem('jwtToken');
            this.props.history.push('/login');
          });
      }
    }

    render() {
      return (
        <div>
          <Header />
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  Authenticate.propTypes = {
    history: PropTypes.object.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.users.isAuthenticated,
    };
  }

  const mapDispatchToProps = {
    setCurrentUser,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
