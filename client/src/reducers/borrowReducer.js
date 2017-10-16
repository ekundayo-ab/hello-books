/* eslint-disable no-case-declarations, no-underscore-dangle */
import { ADD_BORROW, SET_BORROWED_BOOKS } from './../actions/borrowActions';

export default function borrows(state = [], action = {}) {
  switch (action.type) {
    case ADD_BORROW:
      return [...state, action.borrow];
    case SET_BORROWED_BOOKS:
      return action.borrowedBooks;
    default:
      return state;
  }
}
