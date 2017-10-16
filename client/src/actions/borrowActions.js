import axios from 'axios';
import store from '../../src/index';

const token = localStorage.getItem('jwtToken');
const ADD_BORROW = 'ADD_BORROW';
const BORROWED_FETCHED = 'BORROWED_FETCHED';
const BOOK_FETCHED = 'BOOK_FETCHED';
const SET_BORROWED_BOOKS = 'SET_BORROWED_BOOKS';

export function setBorrow(borrow) {
  return {
    type: ADD_BORROW,
    borrow,
  };
}

export function borrowedFetched(borrow) {
  return {
    type: BORROWED_FETCHED,
    borrow,
  };
}

export function bookFetched(book) {
  return {
    type: BOOK_FETCHED,
    book,
  };
}

export function setBorrowedBooks(borrowedBooks) {
  return {
    type: SET_BORROWED_BOOKS,
    borrowedBooks,
  };
}

function borrowBook(userId, bookId) {
  return axios.post(
    `/api/v1/users/${userId}/books`,
    bookId,
    { 'x-access-token': token },
  ).then((res) => {
    store.dispatch(borrowedFetched(res.data.updatedBorrowedBook));
    store.dispatch(bookFetched(res.data.updatedBorrowedBook));
  });
}

function fetchAllBorrowedBooks(userId) {
  return axios.get(
    `/api/v1/borrowed/${userId}/books`,
    { 'x-access-token': token },
  ).then((res) => {
    store.dispatch(setBorrowedBooks(res.data.borrowedBooks));
  });
}

function fetchBorrowedBook(bookId) {
  return axios.get(`/api/v1/borrowed/${bookId}`, { 'x-access-token': token })
    .then((res) => {
      if (res.data.foundBorrowedBook) {
        store.dispatch(borrowedFetched(res.data.foundBorrowedBook));
      } else {
        const foundBorrowedBook = {};
        store.dispatch(borrowedFetched(foundBorrowedBook));
      }
    })
    .catch(err => err);
}

export {
  ADD_BORROW,
  SET_BORROWED_BOOKS,
  BORROWED_FETCHED,
  borrowBook,
  fetchBorrowedBook,
  fetchAllBorrowedBooks,
};
