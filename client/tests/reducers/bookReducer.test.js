import bookReducer from '../../src/reducers/bookReducer';
import * as actionTypes from '../../src/actions/types';
import {
  book1,
  books1,
  books2,
  book3,
  booksAfterDeletion,
  booksAfterUpdating
} from '../__mocks__/testData';

describe('book reducer', () => {
  it('should return the initial state', () => {
    expect(bookReducer({}, {})).toEqual({});
  });

  it('should handle ADD_BOOK and save the payload to the store', () => {
    expect(
      bookReducer({ books: [] }, { type: actionTypes.ADD_BOOK, book: book1 })
    ).toEqual({ books: books1 });
  });

  it('should handle SET_BOOKS and save the payload to the store', () => {
    expect(
      bookReducer({ books: [] }, { type: actionTypes.SET_BOOKS, books: books1 })
    ).toEqual({ books: books1 });
  });

  it('should handle BOOK_DELETED and save the payload to the store', () => {
    expect(
      bookReducer(
        { books: books2 }, { type: actionTypes.BOOK_DELETED, bookId: book1.id }
      )
    ).toEqual({ books: booksAfterDeletion });
  });
  it('should handle BOOK_UPDATED and save the payload to the store', () => {
    expect(
      bookReducer(
        { books: books2 }, { type: actionTypes.BOOK_UPDATED, book: book3 }
      )
    ).toEqual({ books: booksAfterUpdating });
  });
});
