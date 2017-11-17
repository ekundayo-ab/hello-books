import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import users from './reducers/authReducer';
import booksReducer from './reducers/bookReducer';
import borrowsReducer from './reducers/borrowReducer';
import bookReducer from './reducers/singleBookReducer';
import borrowReducer from './reducers/singleBorrowReducer';

export default combineReducers({
  users,
  categoryReducer,
  booksReducer,
  borrowsReducer,
  bookReducer,
  borrowReducer,
});
