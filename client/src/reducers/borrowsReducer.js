import { SET_BORROWED_BOOKS } from './../actions/types';

// Declare the initial state for borrowing
const initialState = {
  borrows: []
};

/**
 * Borrowing Reducer
 *
 * @description Return each action by its type
 *
 * @param {object} state - The state passed to the borrowsReducer
 * @param {object} action - The action passed to the borrowsReducer
 *
 * @returns {object} - Borrowed/Returned Book(s)
 */
const borrowsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BORROWED_BOOKS:
      return { ...state, borrows: action.borrowedBooks };
    default:
      return state;
  }
};

export default borrowsReducer;
