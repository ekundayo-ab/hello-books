/* eslint-disable no-case-declarations, no-underscore-dangle */
import { SET_BORROWED_BOOKS,
  SET_BORROWED_NOT_RETURNED_BOOKS, BORROWED_RETURNED }
  from './../actions/types';

// Declare the initial state for borrowing
const initialState = {
  borrows: []
};

/**
 * Borrowing Reducer
 * @description Return each action by its type
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {object} // Borrowed/Returned Book(s)
 */
const borrowsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_BORROWED_BOOKS:
      return { ...state, borrows: action.borrowedBooks };
    case SET_BORROWED_NOT_RETURNED_BOOKS:
      return { ...state, borrows: action.bookList };
    case BORROWED_RETURNED:
      const booksAfterReturning =
      state.borrows.filter(borrowedBook => borrowedBook.id !== action.book.id);
      return { ...state, borrows: booksAfterReturning };
    default:
      return state;
  }
};

export default borrowsReducer;
