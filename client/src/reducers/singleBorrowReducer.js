/* eslint-disable no-case-declarations, no-underscore-dangle */
import { BORROWED_FETCHED } from './../actions/borrowActions';

export default function book(state = {}, action = {}) {
  switch (action.type) {
    case BORROWED_FETCHED: {
      return action.borrow;
    }
    default:
      return state;
  }
}
