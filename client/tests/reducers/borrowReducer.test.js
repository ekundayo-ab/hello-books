import borrowReducer from '../../src/reducers/borrowReducer';
import * as actionTypes from '../../src/actions/types';
import {
  borrow1,
  borrows1,
  borrows2,
  booksAfterReturning
} from './testData';

describe('borrow reducer', () => {
  it('should return the initial state', () => {
    expect(borrowReducer({}, {})).toEqual({});
  });

  it('should handle SET_BORROWED_BOOKS and save to store', () => {
    expect(
      borrowReducer(
        { borrows: [] },
        { type: actionTypes.SET_BORROWED_BOOKS, borrowedBooks: borrows1 }
      )
    ).toEqual({ borrows: borrows1 });
  });

  it('should set SET_BORROWED_NOT_RETURNED_BOOKS and save to store', () => {
    expect(
      borrowReducer(
        { borrows: [] },
        {
          type: actionTypes.SET_BORROWED_NOT_RETURNED_BOOKS,
          bookList: borrows1
        }
      )
    ).toEqual({ borrows: borrows1 });
  });

  it('should handle BORROWED_RETURNED and save to store', () => {
    expect(
      borrowReducer(
        { borrows: borrows2 },
        { type: actionTypes.BORROWED_RETURNED, book: borrow1 }
      )
    ).toEqual({ borrows: booksAfterReturning });
  });
});
