import returnReducer from '../../src/reducers/returnsReducer';
import * as actionTypes from '../../src/actions/types';
import {
  borrow1,
  borrows1,
  borrows2,
  booksAfterReturning
} from '../__mocks__/testData';

describe('return reducer', () => {
  it('should return the initial state', () => {
    expect(returnReducer({}, {})).toEqual({});
  });

  it('should set SET_BORROWED_NOT_RETURNED_BOOKS and save to store', () => {
    expect(
      returnReducer(
        { returns: [] },
        {
          type: actionTypes.SET_BORROWED_NOT_RETURNED_BOOKS,
          bookList: borrows1
        }
      )
    ).toEqual({ returns: borrows1 });
  });

  it('should handle BORROWED_RETURNED and save to store', () => {
    expect(
      returnReducer(
        { returns: borrows2 },
        { type: actionTypes.BORROWED_RETURNED, book: borrow1 }
      )
    ).toEqual({ returns: booksAfterReturning });
  });
});
