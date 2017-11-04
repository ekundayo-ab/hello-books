/* eslint-disable no-case-declarations, no-underscore-dangle */
import { BORROWED_FETCHED } from './../actions/borrowActions';

/**
 * Singly Borrowed Book Reducer
 * @description Return each action by its type
 * @param {any} [state={}]
 * @param {any} [action={}]
 * @returns {object} // Borrowed book
 */
export default function book(state = {}, action = {}) {
  switch (action.type) {
    case BORROWED_FETCHED: {
      return action.borrow;
    }
    default:
      return state;
  }
}
