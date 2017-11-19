import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import * as authAction from '../../src/actions/authActions';
import { user, googleUser, token, googleDetails } from '../reducers/testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Authentication actions', () => {
    it('should respond with a success message when a user logs in', (done) => {
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: {
          success: true,
          message: 'Hi ekundayo, you are logged in',
          token,
        }
      });
      const expectedActions = [{
        type: actionType.SET_CURRENT_USER,
        user
      }];
      const store = mockStore({});
      store.dispatch(authAction.login(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should respond with a success message when a' +
    ' user registers and logs in with google', (done) => {
      moxios.stubRequest('/api/v1/auth/google', {
        status: 200,
        response: {
          success: true,
          message: 'Hi ekundayo, you are logged in',
          token,
        }
      });
      const expectedActions = [{
        type: actionType.SET_CURRENT_USER,
        user: googleUser
      }];
      const store = mockStore({});
      store.dispatch(authAction.googleAuth(googleDetails))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});

