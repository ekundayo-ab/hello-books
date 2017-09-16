import { combineReducers } from 'redux';
import flashMessages from './reducers/messageReducer';
import books from './reducers/bookReducer';

export default combineReducers({
  flashMessages,
  books,
});
