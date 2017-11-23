import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import * as authAction from '../../src/actions/authActions';
import {
  user,
  googleUser,
  token,
  googleDetails,
  regUserData,
  passData
} from '../reducers/testData';

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
  describe('Login action', () => {
    it('should respond with a success message when a user logs in', (done) => {
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: {
          success: true,
          message: 'Hi ekundayo, you are logged in',
          token,
          user
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
  });

  describe('Register action', () => {
    it('should respond with a success message when a' +
    ' user successfully registers', (done) => {
      moxios.stubRequest('/api/v1/users/signup', {
        status: 200,
        response: {
          success: true,
          message: 'Hi ekundayo, registration successful'
        }
      });
      const expectedResponse = {
        isDone: true,
        message: 'Hi ekundayo, registration successful'
      };
      authAction.userSignUpRequest(regUserData)
        .then((res) => {
          expect(res).toEqual(expectedResponse);
          done();
        });
    });
  });

  describe('Google authentication action', () => {
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
      const store = mockStore({});
      const expectedActions = [{
        type: actionType.SET_CURRENT_USER,
        user: googleUser
      }];
      store.dispatch(authAction.googleAuth(googleDetails))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Logout action', () => {
    it('should logout a user clearing the store', (done) => {
      const expectedActions = {
        type: actionType.UNSET_CURRENT_USER,
        user: {}
      };
      const store = mockStore({});
      expect(store.dispatch(authAction.logout({}))).toEqual(expectedActions);
      done();
    });
  });

  describe('Username confirm action', () => {
    it('should ensure a new username has not been taken', (done) => {
      moxios.stubRequest('/api/v1/users', {
        status: 404,
        response: {
          success: false,
          message: 'User does not exist'
        }
      });
      const expected404Response = {
        success: false,
        message: 'User does not exist'
      };
      authAction.isUserExists(regUserData)
        .then((res) => {
          expect(res).toEqual(expected404Response);
          done();
        });
    });
  });

  describe('Password change action', () => {
    it('should make known if password was successfully changed', (done) => {
      moxios.stubRequest('/api/v1/users/pass', {
        status: 200,
        response: {
          success: true,
          message: 'Password successfully changed'
        }
      });
      const expectedResponse = {
        success: true,
        message: 'Password successfully changed'
      };
      authAction.changePassword(passData)
        .then((res) => {
          expect(res).toEqual(expectedResponse);
          done();
        });
    });
  });
});

