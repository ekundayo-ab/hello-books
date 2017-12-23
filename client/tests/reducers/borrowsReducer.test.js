import borrowsReducer from '../../src/reducers/borrowsReducer';
import * as actionTypes from '../../src/actions/types';
import {
  borrows1,
} from '../__mocks__/testData';

describe('borrow reducer', () => {
  it('should return the initial state', () => {
    expect(borrowsReducer({}, {})).toEqual({});
  });

  it('should handle SET_BORROWED_BOOKS and save to store', () => {
    expect(
      borrowsReducer(
        { borrows: [] },
        { type: actionTypes.SET_BORROWED_BOOKS, borrowedBooks: borrows1 }
      )
    ).toEqual({ borrows: borrows1 });
  });
});
