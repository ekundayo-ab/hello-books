/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Shelf from '../Shelf';
import History from '../History';
import Admin from './../admin/Admin';
import Profile from '../Profile';
import NotFound from '../NotFound';
import FlashMessagesList from '../../flash/FlashMessagesList';

class Home extends Component {
  render() {
    return (
      <div className="shelf-page" >
        <Header />
        <FlashMessagesList />
        <Switch>
          <Route path="/shelf" component={Shelf} />
          <Route path="/history" component={History} />
          <Route path="/admin" component={Admin} />
          <Route path="/profile" component={Profile} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
