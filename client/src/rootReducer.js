import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import users from './reducers/authReducer';
import booksReducer from './reducers/bookReducer';
import borrowsReducer from './reducers/borrowReducer';
import returnsReducer from './reducers/returnReducer';
import bookReducer from './reducers/singleBookReducer';
import borrowReducer from './reducers/singleBorrowReducer';
import paginationReducer from './reducers/paginationReducer';

const appReducer = combineReducers({
  users,
  categoryReducer,
  booksReducer,
  borrowsReducer,
  bookReducer,
  borrowReducer,
  returnsReducer,
  paginationReducer
});

/**
 * @description ensures whole application state can be managed and cleared
 *
 * @param {object} state - state passed to the rootReducer
 * @param {object} action - action passed to the rootReducer
 *
 * @returns {object} appReducer - the application reducer
 */
const rootReducer = (state, action) => {
  if (action.type === 'UNSET_CURRENT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
