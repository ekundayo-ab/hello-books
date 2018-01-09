import { combineReducers } from 'redux';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import booksReducer from './reducers/booksReducer';
import borrowsReducer from './reducers/borrowsReducer';
import returnsReducer from './reducers/returnsReducer';
import singleBookReducer from './reducers/singleBookReducer';
import singleBorrowReducer from './reducers/singleBorrowReducer';
import paginationReducer from './reducers/paginationReducer';

const users = authReducer;

const appReducer = combineReducers({
  users,
  categoryReducer,
  booksReducer,
  borrowsReducer,
  singleBookReducer,
  singleBorrowReducer,
  returnsReducer,
  paginationReducer
});

/**
 * @description ensures whole application state can be managed and cleared
 *
 * @param {object} state - The state passed to the rootReducer
 * @param {object} action - The action passed to the rootReducer
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
