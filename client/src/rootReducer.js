import { combineReducers } from 'redux';
import categories from './reducers/categoryReducer';
import users from './reducers/authReducer';
import books from './reducers/bookReducer';

export default combineReducers({
  users,
  books,
  categories,
});
