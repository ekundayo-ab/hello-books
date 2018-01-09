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
 * @param {array} state - The state passed to the paginationReducer
 * @param {object} action - The action passed to the paginationReducer
 *
 * @returns {object} User(s)
 */
const paginationReducer = (state = initialState, action = {}) => {
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

export default paginationReducer;
