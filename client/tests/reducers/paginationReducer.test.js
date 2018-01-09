import paginationReducer from '../../src/reducers/paginationReducer';
import * as actionTypes from '../../src/actions/types';

const newPages = { pages: [1, 2, 3], pageId: 1 };

describe('pagination reducer', () => {
  it('should return the initial state', () => {
    expect(paginationReducer({}, {})).toEqual({});
  });

  it('should handle SET_PAGES and save the payload to the store', () => {
    expect(paginationReducer(newPages, {
      type: actionTypes.SET_PAGES, pageDetails: newPages
    }))
      .toEqual({ pageId: 1, pages: [1, 2, 3] });
  });
});
