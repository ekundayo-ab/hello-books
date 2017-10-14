import { ADD_CATEGORY } from '../../src/reducers/categoryReducer';

export default function books(state = [], action = {}) {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.category;
    default: return state;
  }
}
