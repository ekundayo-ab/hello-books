import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import autoUpgrade from '../../src/utils/autoUpgrade';
import { user } from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: () => {} };
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Auto Upgrade action', () => {
    it('should return pages and pageId', (done) => {
      moxios.stubRequest('/api/v1/users/autoupgrade', {
        status: 200,
        response: {
          message: 'You\'ve been upgraded',
          user,
        }
      });
      const expectedActions = [{
        type: actionType.SET_CURRENT_USER,
        user
      }];
      const store = mockStore({});
      store.dispatch(autoUpgrade())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on request failure', (done) => {
      moxios.stubRequest('/api/v1/users/autoupgrade', {
        status: 500,
        response: { message: 'Internal Server Error' }
      });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(autoUpgrade())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});

