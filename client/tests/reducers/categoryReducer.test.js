import categoryReducer from '../../src/reducers/categoryReducer';
import * as actionTypes from '../../src/actions/types';
import {
  category3,
  categories1,
  categories2
} from './testData';

describe('category reducer', () => {
  it('should return the initial state', () => {
    expect(categoryReducer({}, {})).toEqual({});
  });

  it('should handle ADD_CATEGORY and save the payload to the store', () => {
    expect(categoryReducer(
      { categories: categories1 },
      { type: actionTypes.ADD_CATEGORY, category: category3 }
    )
    ).toEqual({ categories: categories2 });
  });

  it('should handle SET_CATEGORIES and save the payload to the store', () => {
    expect(
      categoryReducer(
        { categories: [] },
        { type: actionTypes.SET_CATEGORIES, categories: categories1 })
    ).toEqual({ categories: categories1 });
  });
});
