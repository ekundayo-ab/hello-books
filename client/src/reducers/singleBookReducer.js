/* eslint-disable no-case-declarations, no-underscore-dangle */
import { BOOK_FETCHED } from './../actions/bookActions';

/**
 * Single Book Reducer
 * @description Return each action by its type
 * @param {any} [state={}]
 * @param {any} [action={}]
 * @returns {object} // Single Book
 */
export default function book(state = {}, action = {}) {
  switch (action.type) {
    case BOOK_FETCHED: {
      return action.book;
    }
    default:
      return state;
  }
}
