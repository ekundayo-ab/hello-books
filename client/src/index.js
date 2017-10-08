import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './rootReducer';
import setAuthorizationHeader from './utils/setAuthorizationToken';

/* eslint-disable import/first */
import '../public/css/main.scss';
import 'jquery/dist/jquery';
import 'materialize-css/dist/js/materialize';
import '../public/js/main.js';
/* eslint-enable */

const token = localStorage.getItem('jwtToken');
if (token) {
  setAuthorizationHeader(token);
}
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

// setAuthorizationToken(localStorage.jwtToken);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

export default store;
