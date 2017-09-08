import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/Landing/Home';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './rootReducer';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { Provider } from 'react-redux';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
