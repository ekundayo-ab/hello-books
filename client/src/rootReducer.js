import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import books from './reducers/books';

export default combineReducers({
  flashMessages,
  books,
});
