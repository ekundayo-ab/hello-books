import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyToken from '../utils/verifyToken';
import Header from '../components/library/master/Header';
import { logout } from '../actions/authActions';

/**
 * @description maps state from store to component props
 *
 * @param {object} state - The current state of the component
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
 * @param {class} ComposedComponent - The component to be wrapped and composed
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
     * @param {void} null - Has no parameter
     *
     * @returns {void} returns nothing
     *
     * @memberof Authenticate
     */
    componentWillMount() {
      if (process.env.noToken) localStorage.removeItem('jwtToken');
      const currentRoute = this.props.location.pathname.toLowerCase();

      if (localStorage.getItem('jwtToken') === null) {
        Materialize.toast('Oops! Something Happened, Please login.',
          3000, 'red');
        this.props.logout();
        return this.props.history.push('/login');
      }
      return this.props.verifyToken({ token: localStorage.getItem('jwtToken') })
        .then((res) => {
          const { role } = res;
          if (!res) {
            this.props.logout();
            Materialize.toast(
              'Oops! Something happened, Allow us verify you again',
              3000, 'red');
            return this.props.history.push('/login');
          }
          if (currentRoute === '/admin' && role !== 'admin') {
            this.props.history.push('/shelf');
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
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    logout: PropTypes.func.isRequired,
    verifyToken: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, { verifyToken, logout })(Authenticate);
}
