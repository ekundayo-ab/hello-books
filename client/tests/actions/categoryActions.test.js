import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import * as categoryAction from '../../src/actions/categoryActions';
import {
  categories1,
  category1
} from '../reducers/testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Category actions', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: () => {} };
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Category listing action', () => {
    it('should return all categories', (done) => {
      moxios.stubRequest('/api/v1/categories', {
        status: 200,
        response: {
          success: true,
          categories: categories1
        }
      });
      const expectedActions = [{
        type: actionType.SET_CATEGORIES,
        categories: categories1
      }];
      const store = mockStore({});
      store.dispatch(categoryAction.fetchCategories())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Category adding action', () => {
    it('should return the newly added category', (done) => {
      moxios.stubRequest('/api/v1/category', {
        status: 200,
        response: {
          success: true,
          category: category1
        }
      });
      const expectedActions = [{
        type: actionType.ADD_CATEGORY,
        category: category1
      }];
      const store = mockStore({});
      store.dispatch(categoryAction.saveCategory(category1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
