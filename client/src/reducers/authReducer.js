import { isEmpty } from 'lodash';
import { SET_CURRENT_USER, UNSET_CURRENT_USER, SET_EXISTENCE }
  from '../actions/types';

// Declare the initial state for Authentication
const initialState = {
  isAuthenticated: false,
  user: {},
  userExists: ''
};

/**
 * Authentication Reducer
 *
 * @description Returns each action by its type
 *
 * @param {array} state - The state passed to the authReducer
 * @param {object} action - The action passed to the authReducer
 *
 * @returns {object} User(s), isAuthenticated - Returns user(s) and their
 * authentication state
 */
const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_EXISTENCE:
      return { ...state, userExists: action.message };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.user
      };
    default: return state;
  }
};

export default authReducer;
