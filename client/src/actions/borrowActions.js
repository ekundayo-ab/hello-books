import axios from 'axios';
import store from '../../src/index';

// Gets set JSON Web Token from local storage
const token = localStorage.getItem('jwtToken');

/**
 * @description sets all immutable types for the pure redux actions
 * @constant ADD_BORROW, BORROW_FETCHED, BOOK_FETCHED, SET_BORROWED_BOOKS,
 * SET_BORROWED_NOT_RETURNED_BOOKS
 */
const BORROWED_FETCHED = 'BORROWED_FETCHED';
const BOOK_FETCHED = 'BOOK_FETCHED';
const SET_BORROWED_BOOKS = 'SET_BORROWED_BOOKS';
const SET_BORROWED_NOT_RETURNED_BOOKS = 'SET_BORROWED_NOT_RETURNED_BOOKS';
const BORROWED_RETURNED = 'BORROWED_RETURNED';
/**
 * @function
 * @description dispatches a single borrowed book to redux store
 * @param {*} borrow
 */
const borrowedFetched = borrow => ({
  type: BORROWED_FETCHED,
  borrow,
});

/**
 * @function
 * @description dispatch a single book to redux store
 * @param {*} book
 */
const bookFetched = book => ({
  type: BOOK_FETCHED,
  book,
});

/**
 * @function
 * @description dispatch and updates lists of
 * books borrowed but not returned in the redux store
 * @param {*} book
 */
const bookReturned = book => ({
  type: BORROWED_RETURNED,
  book,
});

/**
 * @function
 * @description dispatches all borrowed books to redux store
 * @param {*} borrowedBooks
 */
const setBorrowedBooks = borrowedBooks => ({
  type: SET_BORROWED_BOOKS,
  borrowedBooks,
});

/**
 * @function
 * @description dispatches all books borrowed but not returned
 * to redux store
 * @param {*} booksList
 */
const setBorrowedNotReturnedBooks = bookList => ({
  type: SET_BORROWED_NOT_RETURNED_BOOKS,
  bookList,
});

/**
 * @function
 * @description borrows book from the library and dispatches
 * @function borrowFetched and @function bookFetched to redux store,
 * It also displays a noti=fication that book was borrowed
 * @function Materialize does that
 * @param {*} userId
 * @param {*} bookId
 */
const borrowBook = (userId, bookId) =>
  axios.post(
    `/api/v1/users/${userId}/books`,
    bookId,
    { 'x-access-token': token },
  ).then((res) => {
    store.dispatch(borrowedFetched(res.data.updatedBorrowedBook));
    store.dispatch(bookFetched(res.data.updatedBorrowedBook));
    Materialize.toast(`${res.data.updatedBorrowedBook.title} Successfully borrowed`, '2000', 'green');
  });

/**
 * @function
 * @description makes an API call to the server for all
 * borrowed books, then dispatches an action to set them
 * in the redux store
 * @param {*} userId
 */
const fetchAllBorrowedBooks = userId =>
  axios.get(
    `/api/v1/borrowed/${userId}/books`,
    { 'x-access-token': token },
  ).then((res) => {
    store.dispatch(setBorrowedBooks(res.data.borrowedBooks));
  });

/**
 * @function
 * @description makes an API call to the server to borroww a single
 * book from then dispatches a pure function action to
 * set it in the redux store
 * @param {*} bookId
 */
const fetchBorrowedBook = bookId =>
  axios.get(`/api/v1/borrowed/${bookId}`, { 'x-access-token': token })
    .then((res) => {
      if (res.data.foundBorrowedBook) {
        store.dispatch(borrowedFetched(res.data.foundBorrowedBook));
      } else {
        const foundBorrowedBook = {};
        store.dispatch(borrowedFetched(foundBorrowedBook));
      }
    })
    .catch(err => err);

/**
 * @function
 * @description makes an API call the server to get all books
 * which have been borrowed but not returned, then dispatches
 * an action to set them in the redux store
 * @param {*} userId
 */
const getBorrowedNotReturned = userId =>
  axios.get(`/api/v1/users/${userId}/books?returned=false`, { 'x-access-token': token },
  ).then((res) => {
    if (res.data.success) {
      return store.dispatch(setBorrowedNotReturnedBooks(res.data.borrow));
    }
    return store.dispatch(setBorrowedNotReturnedBooks([]));
  });

const returnBook = (userId, bookId) =>
  axios.put(`/api/v1/users/${userId}/books`, { bookId }, { 'x-access-token': token },
  ).then((res) => {
    store.dispatch(bookReturned(res.data.updatedBorrowedBook));
    Materialize.toast(res.data.message, '2000', 'green');
  });

export {
  SET_BORROWED_BOOKS,
  BORROWED_FETCHED,
  SET_BORROWED_NOT_RETURNED_BOOKS,
  BORROWED_RETURNED,
  borrowBook,
  returnBook,
  fetchBorrowedBook,
  fetchAllBorrowedBooks,
  getBorrowedNotReturned,
};
