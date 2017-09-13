/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from '../../components/library/Header';
import Footer from '../../components/library/Footer';
import Shelf from '../../components/library/Shelf';
import History from '../../components/library/History';
import Admin from '../../components/library/Admin';
import Profile from '../../components/library/Profile';
import NotFound from '../../components/library/NotFound';
import FlashMessagesList from '../../components/flash/FlashMessagesList';

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
