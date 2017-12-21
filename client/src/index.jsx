import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery';
import 'materialize-css/dist/js/materialize';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './helpers/store';
import App from './components/App';
import setAuthorizationHeader from './utils/setAuthorizationToken';
import '../public/css/main.scss';
import '../public/js/main';
import '../public/js/notifications';

// Get token from Local Storage
const token = localStorage.getItem('jwtToken');

// If token exists set header for subsequent requests
if (token) {
  setAuthorizationHeader(token);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
