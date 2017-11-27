import axios from 'axios';
import * as actionTypes from '../actions/types';

/**
 * Set Categories
 * @description Set the categories in the store
 * @param {object} categories - details categories to set
 * @returns {object} action
 */
const setCategories = categories =>
  ({ type: actionTypes.SET_CATEGORIES, categories });

/**
 * Add Category
 * @description Adds a new category to the store
 * @param {object} category - category to add
 * @returns {object} action
 */
const addCategory = category =>
  ({ type: actionTypes.ADD_CATEGORY, category });

/**
 * Get Categories
 * @description Makes request to the server to get categories
 * @param {void} null
 * @returns {object} action
 */
const fetchCategories = () =>
  dispatch =>
    axios.get('/api/v1/categories')
      .then((res) => {
        dispatch(setCategories(res.data.categories));
        return res.data;
      })
      .catch((err) => {
        dispatch(setCategories([]));
        return err.response.data.message;
      });

/**
 * Create/Add Category
 * @description Sends category to be saved to the server
 * @param {object} categoryDetails
 * @returns {object} action
 */
const saveCategory = categoryDetails =>
  dispatch =>
    axios.post('/api/v1/category', categoryDetails)
      .then((res) => {
        const { category } = res.data;
        category.cat = [];
        dispatch(addCategory(category));
        return { res: res.data, isDone: true };
      })
      .catch(err =>
        ({ errors: err.response.data, isDone: false }),
      );

export {
  fetchCategories,
  setCategories,
  saveCategory,
};
