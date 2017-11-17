import { isEmpty } from 'lodash';
import { SET_CURRENT_USER, UNSET_CURRENT_USER } from '../actions/types';

// Declare the initial state for Authentication
const initialState = {
  isAuthenticated: false,
  user: {},
};

/**
 * Authentication Reducer
 * @description Returns each action by its type
 * @param {array} [state=[]]
 * @param {object} [action={}]
 * @returns {object} User(s)
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.user,
      };
    default: return state;
  }
};
