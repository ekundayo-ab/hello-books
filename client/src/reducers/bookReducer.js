/* eslint-disable no-case-declarations, no-underscore-dangle */
import { SET_BOOKS, BOOK_DELETED,
  BOOK_UPDATED, ADD_BOOK } from './../actions/bookActions';

/**
 * Book Reducer
 * @description Return each action by its type
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {object} // Book(s)
 */
export default function books(state = [], action = {}) {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.book];
    case SET_BOOKS:
      return action.books;
    case BOOK_DELETED:
      return state.filter(item => item.id !== action.bookId);
    case BOOK_UPDATED:
      return state.map((item) => {
        if (item.id === action.book.id) return action.book;
        return item;
      });
    default:
      return state;
  }
}
