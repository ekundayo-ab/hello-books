import axios from 'axios';
import store from '../../src/index';

const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const BOOK_DELETED = 'BOOK_DELETED';

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

function deleteSuccess(bookId) {
  return {
    type: BOOK_DELETED,
    bookId,
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
      store.dispatch(addBook(res.data));
      return { res: res.data, isDone: true };
    })
    .catch(err =>
      ({ errors: err.response.data, isDone: false }),
    );
}

function deleteBook(dataId) {
  axios.delete(`/api/v1/books/${dataId}`, { 'x-access-token': token })
    .then((res) => {
      store.dispatch(deleteSuccess(res.data.book.id));
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  fetchBooks,
  setBooks,
  saveBook,
  deleteBook,
  BOOK_DELETED,
  SET_BOOKS,
};
