import axios from 'axios';
import jwt from 'jsonwebtoken';
import store from '../../src/index';

const SET_BOOKS = 'SET_BOOKS';
const ADD_CATEGORY = 'ADD_CATEGORY';
const token = localStorage.getItem('jwtToken');

function setBooks(books) {
  return {
    type: SET_BOOKS,
    books,
  };
}

function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}

function fetchBooks() {
  return ((dispatch) => {
    axios.get('/api/v1/books', { 'x-access-token': token })
      .then((res) => {
        dispatch(setBooks(res.data));
      })
      .catch((err) => {
        console.log('I am the function');
      });
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
  fetchBooks,
  setBooks,
  saveCategory,
  SET_BOOKS,
};
