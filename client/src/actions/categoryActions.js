import axios from 'axios';
import store from '../../src/index';

const SET_CATEGORIES = 'SET_CATEGORIES';
const ADD_CATEGORY = 'ADD_CATEGORY';

const token = localStorage.getItem('jwtToken');

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}

function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}

function fetchCategories() {
  return ((dispatch) => {
    axios.get('/api/v1/categories', { 'x-access-token': token })
      .then((res) => {
        dispatch(setCategories(res.data));
        return res.data;
      })
      .catch(err =>
        ({ err: err.message }),
      );
  });
}

function saveCategory(data) {
  return axios.post('/api/v1/category', data, { 'x-access-token': token })
    .then((res) => {
      store.dispatch(addCategory(res.data));
      return { res: res.data, isDone: true };
    })
    .catch(err =>
      ({ errors: err.response.data, isDone: false }),
    );
}

export {
  fetchCategories,
  setCategories,
  saveCategory,
  SET_CATEGORIES,
};
