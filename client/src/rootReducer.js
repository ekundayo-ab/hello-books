import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import users from './reducers/authReducer';
import booksReducer from './reducers/bookReducer';
import borrowsReducer from './reducers/borrowReducer';
import bookReducer from './reducers/singleBookReducer';
import borrowReducer from './reducers/singleBorrowReducer';

const appReducer = combineReducers({
  users,
  categoryReducer,
  booksReducer,
  borrowsReducer,
  bookReducer,
  borrowReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'UNSET_CURRENT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
