import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LandingHome from './../../src/components/landing/Home';
import Home from './../../src/components/library/master/Home';

/**
 * Renders a component(s)
 *
 * @description Renders page based on URL supplied
 *
 * @param {object} props - available from withRouter Higher Order Component
 *
 * @returns {string} HTML markup of component
 */
export const App = (props) => {
  const trackPage = props.location.pathname;
  const trackMatch = /\/register|\/login|\/forgot/.test(trackPage);
  let viewToRender;
  if (trackMatch || trackPage === '/'
    || !localStorage.getItem('jwtToken')) {
    viewToRender = <LandingHome />;
  } else {
    viewToRender = <Home />;
  }
  return (
    <div>
      {viewToRender}
    </div>
  );
};

// Type checking for function
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
};

export default withRouter(App);
