/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Footer from './Footer';
import Shelf from '../Shelf';
import History from '../History';
import Admin from './../admin/Admin';
import Profile from '../Profile';
import BookDetail from '../BookDetail';
import NotFound from '../NotFound';
import requireAuth from '../../BasicAuth';

class Home extends Component {
  render() {
    return (
      <div className="shelf-page" >
        <Switch>
          <Route exact path="/shelf" component={requireAuth(Shelf)} />
          <Route exact path="/history" component={requireAuth(History)} />
          <Route exact path="/admin" component={requireAuth(Admin)} />
          <Route exact path="/profile" component={requireAuth(Profile)} />
          <Route exact path="/shelf/:id" component={requireAuth(BookDetail)} />
          <Route exact path="/*" component={requireAuth(NotFound)} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Home);
