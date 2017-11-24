import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyToken from '../utils/verifyAuthorizationToken';
import autoUpgrade from '../utils/autoUpgrade';
import Header from '../components/library/master/Header';
import { setCurrentUser, logout } from '../actions/authActions';

/**
 * Higher Order Function
 * @description A function which returns another function
 * @param {class} ComposedComponent
 * @returns {function} connect
 */
export default function (ComposedComponent) {
  /**
   * @description Represents a component middleware for protected pages
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     * @description Executed after component mounts
     * @param {void} null
     * @returns {void} returns nothing
     * @memberof Authenticate
     */
    componentWillMount() {
      if (localStorage.getItem('jwtToken') === null) {
        Materialize.toast('Oops! Something Happened, Please login.',
          3000, 'red');
        this.props.logout();
        return this.props.history.push('/login');
      }
      verifyToken({ token: localStorage.getItem('jwtToken') })
        .then((res) => {
          autoUpgrade();
          this.props.setCurrentUser(res.user);
        })
        .catch(() => {
          Materialize.toast(
            'Oops! Something happened, Allow us verify you again',
            3000, 'red');
          this.props.logout();
          return this.props.history.push('/login');
        });
    }

    /**
     * @description Renders the component
     * @returns {string} - HTML markup for component which passes authentication
     * @memberof Authenticate
     */
    render() {
      return (
        <div>
          <Header />
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  // Type checking for props used
  Authenticate.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  /**
   * @description maps state from store to component props
   * @param {object} state
   * @returns {boolean} false or true
   */
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.users.isAuthenticated,
    };
  }


  /**
   * @desc Maps dispatch to setCurrentUser action
   * @param {void} null
   * @return {object} setCurrentUser
   */
  const mapDispatchToProps = {
    setCurrentUser,
    logout,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
