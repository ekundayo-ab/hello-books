import { ADD_CATEGORY, SET_CATEGORIES } from
  '../../src/actions/categoryActions';

/**
 * Category Reducer
 * @description Return each action by its type
 * @param {array} [state=[]]
 * @param {object} [action={}]
 * @returns {object} // Category/Categories
 */
export default function books(state = [], action = {}) {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.category;
    case SET_CATEGORIES:
      return action.categories;
    default: return state;
  }
}
