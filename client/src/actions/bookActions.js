import axios from 'axios';
import store from '../../src/index';

const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const token = localStorage.getItem('jwtToken');

function setBooks(books) {
  return {
    type: SET_BOOKS,
    books,
  };
}

function addBook(book) {
  return {
    type: ADD_BOOK,
    book,
  };
}

function fetchBooks() {
  return ((dispatch) => {
    axios.get('/api/v1/books', { 'x-access-token': token })
      .then((res) => {
        dispatch(setBooks(res.data));
      })
      .catch(err => err);
  });
}

function saveBook(data) {
  axios.post('/api/v1/books', data, { 'x-access-token': token })
    .then((res) => {
      const response = { res: res.response.data, isDone: true };
      store.dispatch(addBook(response.res));
      return response;
    })
    .catch((err) => {
      const errors = err.response;
      return { errors, loading: false };
    });
}

export {
  fetchBooks,
  setBooks,
  saveBook,
  SET_BOOKS,
};
