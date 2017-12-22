import authReducer from '../../src/reducers/authReducer';
import * as actionTypes from '../../src/actions/types';
import { userExistence, userAuthenticated, userNotAuthenticated }
  from '../__mocks__/testData';

describe('authentication reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer({}, {})).toEqual({});
  });

  it('should handle SET_EXISTENCE and save the payload to the store', () => {
    expect(authReducer(userExistence, {
      type: actionTypes.SET_EXISTENCE, message: 'User exists'
    }))
      .toEqual(userExistence);
  });

  it('should handle SET_CURRENT_USER and save the payload to the store', () => {
    expect(authReducer(userAuthenticated, {
      type: actionTypes.SET_CURRENT_USER,
      user: userAuthenticated.user
    }))
      .toEqual(userAuthenticated);
  });

  it('should handle UNSET_CURRENT_USER and save the payload to the store',
    () => {
      expect(authReducer(userNotAuthenticated, {
        type: actionTypes.UNSET_CURRENT_USER,
        user: userNotAuthenticated.user
      }))
        .toEqual(userNotAuthenticated);
    });
});
