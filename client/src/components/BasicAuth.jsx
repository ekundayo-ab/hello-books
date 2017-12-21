import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyToken from '../utils/verifyAuthorizationToken';
import Header from '../components/library/master/Header';
import { logout } from '../actions/authActions';

/**
 * @description maps state from store to component props
 *
 * @param {object} state
 *
 * @returns {boolean} false or true
 */
export const mapStateToProps = state =>
  ({ isAuthenticated: state.users.isAuthenticated });

/**
 * Higher Order Function
 *
 * @description A function which returns another function
 *
 * @param {class} ComposedComponent
 *
 * @returns {function} connect
 */
export default function (ComposedComponent) {
  /**
   * @description Represents a component middleware for protected pages
   *
   * @class Authenticate
   *
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
     * @description Executed after component mounts
     *
     * @param {void} null
     *
     * @returns {void} returns nothing
     *
     * @memberof Authenticate
     */
    componentWillMount() {
      if (process.env.noToken) localStorage.removeItem('jwtToken');
      if (localStorage.getItem('jwtToken') === null) {
        Materialize.toast('Oops! Something Happened, Please login.',
          3000, 'red');
        this.props.logout();
        return this.props.history.push('/login');
      }
      return this.props.verifyToken({ token: localStorage.getItem('jwtToken') })
        .then((res) => {
          if (!res.isDone) {
            this.props.logout();
            return this.props.history.push('/login');
          }
        });
    }

    /**
     * @description Renders the component
     *
     * @returns {string} - HTML markup for component which passes authentication
     *
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
    logout: PropTypes.func.isRequired,
    verifyToken: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, { verifyToken, logout })(Authenticate);
}
