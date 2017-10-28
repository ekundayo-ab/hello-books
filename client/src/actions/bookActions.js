import axios from 'axios';
import store from '../../src/index';

const SET_BOOKS = 'SET_BOOKS';
const ADD_BOOK = 'ADD_BOOK';
const BOOK_DELETED = 'BOOK_DELETED';
const BOOK_UPDATED = 'BOOK_UPDATED';
const BOOK_FETCHED = 'BOOK_FETCHED';

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

export function gameUpdated(book) {
  return {
    type: BOOK_UPDATED,
    book,
  };
}

export function bookFetched(book) {
  return {
    type: BOOK_FETCHED,
    book,
  };
}

function fetchBooks(pageNumber) {
  return ((dispatch) => {
    return axios.get(`/api/v1/books?page=${pageNumber}`,
      { 'x-access-token': token })
      .then((res) => {
        dispatch(setBooks(res.data.books));
        return res.data.numberOfPages;
      })
      .catch(err => err);
  });
}

function fetchBook(id) {
  return axios.get(`/api/v1/books/${id}`, { 'x-access-token': token })
    .then((res) => {
      store.dispatch(bookFetched(res.data));
      return res.data;
    })
    .catch(err => err);
}

function saveBook(data) {
  return axios.post('/api/v1/books', data, { 'x-access-token': token })
    .then((res) => {
      store.dispatch(addBook(res.data.book));
      return { res: res.data, isDone: true };
    })
    .catch(err =>
      ({ errors: err.response.data, isDone: false }),
    );
}

function updateBook(data) {
  return axios
    .put(`/api/v1/books/${data.id}`, data)
    .then((res) => {
      store.dispatch(gameUpdated(res.data.book));
      return {
        isDone: true,
        result: res.data,
      };
    })
    .catch(err => ({ hasError: true, result: err.response.data }),
    );
}

function deleteBook(dataId) {
  axios.delete(`/api/v1/books/${dataId}`, { 'x-access-token': token })
    .then((res) => {
      store.dispatch(deleteSuccess(res.data.book.id));
    })
    .catch(err => err);
}

export {
  fetchBooks,
  fetchBook,
  setBooks,
  saveBook,
  deleteBook,
  updateBook,
  BOOK_FETCHED,
  BOOK_DELETED,
  BOOK_UPDATED,
  SET_BOOKS,
  ADD_BOOK,
};
