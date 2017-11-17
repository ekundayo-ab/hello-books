/* eslint-disable no-case-declarations, no-underscore-dangle */
import { BORROWED_FETCHED } from './../actions/types';

// Declare the initial state for a single book
const initialState = {
  borrow: {}
};
/**
 * Singly Borrowed Book Reducer
 * @description Return each action by its type
 * @param {any} [state={}]
 * @param {any} [action={}]
 * @returns {object} // Borrowed book
 */
const borrowReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BORROWED_FETCHED: {
      return { ...state, borrow: action.borrow };
    }
    default:
      return state;
  }
};

export default borrowReducer;
