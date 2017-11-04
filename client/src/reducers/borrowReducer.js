/* eslint-disable no-case-declarations, no-underscore-dangle */
import { SET_BORROWED_BOOKS,
  SET_BORROWED_NOT_RETURNED_BOOKS, BORROWED_RETURNED }
  from './../actions/borrowActions';

/**
 * Borrowing Reducer
 * @description Return each action by its type
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {object} // Borrowed/Returned Book(s)
 */
export default function borrows(state = [], action = {}) {
  switch (action.type) {
    case SET_BORROWED_BOOKS:
      return action.borrowedBooks;
    case SET_BORROWED_NOT_RETURNED_BOOKS:
      return action.bookList;
    case BORROWED_RETURNED:
      return state.filter(item => item.id !== action.book.id);
    default:
      return state;
  }
}
