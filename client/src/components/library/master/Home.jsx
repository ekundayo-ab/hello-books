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
import requireAuth from '../../BasicAuth';
import requireAdmin from '../../AdminAuth';

class Home extends Component {
  render() {
    return (
      <div className="shelf-page" >
        <Header />
        <Switch>
          <Route path="/shelf" component={requireAuth(Shelf)} />
          <Route path="/history" component={requireAuth(History)} />
          <Route path="/admin" component={requireAdmin(Admin)} />
          <Route path="/profile" component={requireAuth(Profile)} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
