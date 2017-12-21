import { SET_PAGES } from '../actions/types';

// Declare the initial state for Authentication
const initialState = {
  pages: [],
  pageId: 1
};

/**
 * Authentication Reducer
 *
 * @description Returns each action by its type
 *
 * @param {array} [state=[]]
 * @param {object} [action={}]
 *
 * @returns {object} User(s)
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PAGES:
      return {
        ...state,
        pages: action.pageDetails.pages,
        pageId: action.pageDetails.pageId
      };
    default: return state;
  }
};
