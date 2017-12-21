import { SET_BOOKS, BOOK_DELETED,
  BOOK_UPDATED, ADD_BOOK } from './../actions/types';

// Declare the initial state for books
const initialState = {
  books: []
};

/**
 * Book Reducer
 *
 * @description Return each action by its type
 *
 * @param {object} [state={}]
 * @param {object} [action={}]
 *
 * @returns {object} // Book(s)
 */
const booksReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BOOK: {
      const newBooks = [...state.books, action.book];
      return { ...state, books: newBooks };
    }
    case SET_BOOKS:
      return { ...state, books: action.books };
    case BOOK_DELETED:
      const booksAfterDeletion =
        state.books.filter(item => item.id !== action.bookId);
      return { ...state, books: booksAfterDeletion };
    case BOOK_UPDATED:
      const booksAfterUpdating = state.books.map((book) => {
        if (book.id === action.book.id) return action.book;
        return book;
      });
      return { ...state, books: booksAfterUpdating };
    default:
      return state;
  }
};

export default booksReducer;
