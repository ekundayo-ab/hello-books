import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import verifyToken from '../../src/utils/verifyToken';
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
  describe('Verify Authorization Token action', () => {
    it('should return verified user', (done) => {
      moxios.stubRequest('/api/v1/verify-token', {
        status: 200,
        response: { user }
      });
      const expectedActions = [{
        type: actionType.SET_CURRENT_USER,
        user
      }];
      const store = mockStore({});
      store.dispatch(verifyToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on request failure', (done) => {
      moxios.stubRequest('/api/v1/verify-token', {
        status: 500,
        response: { message: 'Internal Server Error' }
      });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(verifyToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});

