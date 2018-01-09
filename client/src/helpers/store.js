import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './../rootReducer';

const devCompose = composeWithDevTools(applyMiddleware(thunk));
const prodCompose = applyMiddleware(thunk);
const shouldCompose = process.env.NODE_ENV === 'development'
  ? devCompose : prodCompose;

const store = createStore(
  rootReducer,
  shouldCompose
);

export default store;
