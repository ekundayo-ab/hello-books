import { BOOK_FETCHED } from './../actions/types';

// Declare the initial state for a single book
const initialState = {
  book: {}
};

/**
 * Single Book Reducer
 *
 * @description Return each action by its type
 *
 * @param {object} state - The state passed to the singleBookReducer
 * @param {object} action - The action passed to the singleBookReducer
 *
 * @returns {object} - Single Book
 */
const singleBookReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case BOOK_FETCHED: {
      return { ...state, book: action.book };
    }
    default:
      return state;
  }
};

export default singleBookReducer;
