import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery';
import 'materialize-css/dist/js/materialize';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './rootReducer';
import setAuthorizationHeader from './utils/setAuthorizationToken';
import '../public/css/main.scss';
import '../public/js/main';

// Get token from Local Storage
const token = localStorage.getItem('jwtToken');

// If token exists set header for subsequent requests
if (token) {
  setAuthorizationHeader(token);
}
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

export default store;
