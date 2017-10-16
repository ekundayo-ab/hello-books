/* eslint-disable no-case-declarations, no-underscore-dangle */
import { BOOK_FETCHED } from './../actions/bookActions';

export default function book(state = {}, action = {}) {
  switch (action.type) {
    case BOOK_FETCHED: {
      return action.book;
    }
    default:
      return state;
  }
}
