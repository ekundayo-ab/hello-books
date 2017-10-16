import { combineReducers } from 'redux';
import categories from './reducers/categoryReducer';
import users from './reducers/authReducer';
import books from './reducers/bookReducer';
import book from './reducers/singleBookReducer';
import borrows from './reducers/borrowReducer';
import borrow from './reducers/singleBorrowReducer';

export default combineReducers({
  users,
  categories,
  books,
  book,
  borrows,
  borrow,
});
