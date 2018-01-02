import { ADD_CATEGORY, SET_CATEGORIES } from
  '../../src/actions/types';

// Declare the initial state for the categories
const initialState = {
  categories: []
};

/**
 * Category Reducer
 *
 * @description Return each action by its type
 *
 * @param {array} state - The state passed to the categoryReducer
 * @param {object} action - The action passed to the categoryReducer
 *
 * @returns {object} - Category/Categories
 */
const categoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      const newCategory = [...state.categories, action.category];
      return { ...state, categories: newCategory };
    }
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    default: return state;
  }
};

export default categoryReducer;
