/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LandingHome from './../../src/components/landing/Home';
import Home from './../../src/components/library/master/Home';

class App extends Component {
  render() {
    const trackPage = this.props.location.pathname;
    const trackMatch = /\/register|\/login|\/forgot/.test(trackPage);
    let viewToRender;
    if (trackMatch || trackPage === '/' || localStorage.getItem('jwtToken') === null) {
      viewToRender = <LandingHome />;
    } else {
      viewToRender = <Home />;
    }
    return (
      <div>
        {viewToRender}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
