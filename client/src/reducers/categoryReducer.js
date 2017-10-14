import { ADD_CATEGORY, SET_CATEGORIES } from '../../src/actions/categoryActions';

export default function books(state = [], action = {}) {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.category;
    case SET_CATEGORIES:
      return action.categories;
    default: return state;
  }
}
