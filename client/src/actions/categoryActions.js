import axios from 'axios';
import store from '../../src/index';

const SET_CATEGORIES = 'SET_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';

/**
 * Set Categories
 * @description Set the categories in the store
 * @param {object} categories - details categories to set
 * @returns {object} action
 */
const setCategories = categories =>
  ({ type: SET_CATEGORIES, categories });

/**
 * Add Category
 * @description Adds a new category to the store
 * @param {object} category - category to add
 * @returns {object} action
 */
const addCategory = category =>
  ({ type: ADD_CATEGORY, category });

/**
 * Get Categories
 * @description Makes request to the server to get categories
 * @param {void} null
 * @returns {object} action
 */
const fetchCategories = () =>
  ((dispatch) => {
    axios.get('/api/v1/categories')
      .then((res) => {
        dispatch(setCategories(res.data));
        return res.data;
      })
      .catch(err =>
        ({ err: err.message }),
      );
  });

/**
 * Create/Add Category
 * @description Sends category to be saved to the server
 * @param {object} categoryDetails
 * @returns {object} action
 */
const saveCategory = categoryDetails =>
  axios.post('/api/v1/category', categoryDetails)
    .then((res) => {
      store.dispatch(addCategory(res.data));
      return { res: res.data, isDone: true };
    })
    .catch(err =>
      ({ errors: err.response.data, isDone: false }),
    );

export {
  fetchCategories,
  setCategories,
  saveCategory,
  SET_CATEGORIES,
};
