import singleBorrowReducer from '../../src/reducers/singleBorrowReducer';
import * as actionTypes from '../../src/actions/types';
import {
  borrow1,
} from '../__mocks__/testData';

describe('single borrow reducer', () => {
  it('should return the initial state', () => {
    expect(singleBorrowReducer({}, {})).toEqual({});
  });

  it('should handle BOOK_FETCHED and save the payload to the store', () => {
    expect(singleBorrowReducer(
      { borrow: {} },
      { type: actionTypes.BORROWED_FETCHED, borrow: borrow1 }
    )).toEqual({ borrow: borrow1 });
  });
});
