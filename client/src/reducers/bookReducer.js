import { SET_BOOKS, BOOK_DELETED } from './../actions/bookActions';

export default function books(state = [], action = {}) {
  switch (action.type) {
    case SET_BOOKS:
      return action.books;
    case BOOK_DELETED:
      return state.filter(item => item.id !== action.bookId);
    default: return state;
  }
}
