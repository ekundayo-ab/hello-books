import singleBookReducer from '../../src/reducers/singleBookReducer';
import * as actionTypes from '../../src/actions/types';
import {
  book1,
} from './testData';

describe('single book reducer', () => {
  it('should return the initial state', () => {
    expect(singleBookReducer({}, {})).toEqual({});
  });

  it('should handle BOOK_FETCHED and save the payload to the store', () => {
    expect(
      singleBookReducer(
        { book: {} },
        { type: actionTypes.BOOK_FETCHED, book: book1 }
      )
    ).toEqual({ book: book1 });
  });
});
