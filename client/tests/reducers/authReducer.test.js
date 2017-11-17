import authReducer from '../../src/reducers/authReducer';
import * as actionTypes from '../../src/actions/types';
import { userAuthenticated, userNotAuthenticated } from './testData';

describe('authentication reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer({}, {})).toEqual({});
  });

  it('should handle SET_CURRENT_USER and save the payload to the store', () => {
    expect(authReducer(userAuthenticated, actionTypes.SET_CURRENT_USER))
      .toEqual(userAuthenticated);
  });

  it('should handle UNSET_CURRENT_USER and save the payload to the store',
    () => {
      expect(authReducer(userNotAuthenticated, actionTypes.UNSET_CURRENT_USER))
        .toEqual(userNotAuthenticated);
    });
});
