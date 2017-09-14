import { SET_BOOKS } from './../actions/createActions';

export default function books(state = [], action = {}) {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;
    default: return state;
  }
}
