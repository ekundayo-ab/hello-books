import { SET_BOOKS, BOOK_DELETED, ADD_BOOK } from './../actions/bookActions';

export default function books(state = [], action = {}) {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        action.book,
      ];
    case SET_BOOKS:
      return action.books;
    case BOOK_DELETED:
      return state.filter(item => item.id !== action.bookId);
    default: return state;
  }
}
