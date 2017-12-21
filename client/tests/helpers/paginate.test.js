import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionType from '../../src/actions/types';
import paginate from '../../src/helpers/paginate';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {
  describe('Paginate action', () => {
    it('should return pages and pageId', (done) => {
      const expectedActions = [{
        type: actionType.SET_PAGES,
        pageDetails: { pageId: 1, pages: [1] }
      }];
      const store = mockStore({});
      const getData = jest.fn(() => Promise.resolve(1));
      store.dispatch(paginate(getData, 1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should set pageId to 1 if its null or undefined', (done) => {
      const expectedActions = [{
        type: actionType.SET_PAGES,
        pageDetails: { pageId: 1, pages: [1] }
      }];
      const store = mockStore({});
      const getData = jest.fn(() => Promise.resolve(1));
      store.dispatch(paginate(getData, null, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});

