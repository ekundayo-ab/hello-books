import axios from 'axios';
import store from '../../src/index';

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
 * Gets Borrowed Book
 * @description dispatches a single borrowed book to redux store
 * @param {object} borrow - borrowing details
 * @returns {object} action
 */
const borrowedFetched = borrow =>
  ({ type: BORROWED_FETCHED, borrow });

/**
 * Get A Book
 * @description dispatch a single book to redux store
 * @param {object} book - details of book
 * @returns {object} action
 */
const bookFetched = book =>
  ({ type: BOOK_FETCHED, book });

/**
 * Returns A Book
 * @description dispatch and updates lists of
 * books borrowed but not returned in the redux store
 * @param {object} book - book details
 * @returns {object} action
 */
const bookReturned = book =>
  ({ type: BORROWED_RETURNED, book });

/**
 * Sets Borrowed Books
 * @description dispatches all borrowed books to redux store
 * @param {array} borrowedBooks - lists of borrowed books
 * @returns {object} action
 */
const setBorrowedBooks = borrowedBooks =>
  ({ type: SET_BORROWED_BOOKS, borrowedBooks });

/**
 * Get Borrowed Not Returned Books
 * @description dispatches all books borrowed but not returned
 * to redux store
 * @param {array} bookList - lists of books not returned
 * @returns {object} action
 */
const setBorrowedNotReturnedBooks = bookList =>
  ({ type: SET_BORROWED_NOT_RETURNED_BOOKS, bookList });

/**
 * Borrow Book
 * @description borrows book from the library and dispatches
 * function borrowFetched and function bookFetched to redux store
 * @param {number} userId - id of user borrowing
 * @param {number} bookId - id of book to borrow
 * @returns {object} action
 */
const borrowBook = (userId, bookId) =>
  axios.post(
    `/api/v1/users/${userId}/books`,
    bookId,
  ).then((res) => {
    store.dispatch(borrowedFetched(res.data.updatedBorrowedBook));
    store.dispatch(bookFetched(res.data.updatedBorrowedBook));
    Materialize.toast(
      `${res.data.updatedBorrowedBook.title} Successfully borrowed`,
      '2000', 'green');
  });

/**
 * Get Borrowed Books
 * @description makes an API call to the server for all
 * borrowed books, then dispatches an action to set them
 * in the redux store
 * @param {number} pageNumber - page number
 * @param {number} userId - id of user
 * @returns {object} action
 */
const fetchAllBorrowedBooks = (pageNumber, userId) =>
  dispatch =>
    axios.get(
      `/api/v1/borrowed/${userId}/books?page=${pageNumber}`,
    ).then((res) => {
      if (res.data.borrowedBooks) {
        dispatch(setBorrowedBooks(res.data.borrowedBooks));
      }
      return res.data;
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

/**
 * Get Single Borrowed Book
 * @description makes an API call to the server to borrow a single
 * book, then dispatches a pure function action to
 * set it in the redux store
 * @param {number} bookId - id of book to borrow
 * @returns {object} action
 */
const fetchBorrowedBook = bookId =>
  axios.get(`/api/v1/borrowed/${bookId}`)
    .then((res) => {
      if (res.data.foundBorrowedBook) {
        store.dispatch(borrowedFetched(res.data.foundBorrowedBook));
      } else {
        const foundBorrowedBook = {};
        store.dispatch(borrowedFetched(foundBorrowedBook));
      }
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

/**
 * Get All Books Borrowed Not Returned
 * @description makes an API call the server to get all books
 * which have been borrowed but not returned, then dispatches
 * an action to set them in the redux store
 * @param {number} pageNumber - page number
 * @param {number} userId - id of user concerned
 * @returns {object} action
 */
const getBorrowedNotReturned = (pageNumber, userId) =>
  dispatch =>
    axios.get(`/api/v1/users/${userId}/books?returned=false&page=${pageNumber}`
    ).then((res) => {
      dispatch(setBorrowedNotReturnedBooks(res.data.borrow));
      return res.data;
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

  /**
   * Return Book
   * @description Send ID of book to return, with a the borrower's identity
   * @param {*} userId - id of user returning book
   * @param {*} bookId - id of book returned
   * @returns {object} action
   */
const returnBook = (userId, bookId) =>
  axios.put(`/api/v1/users/${userId}/books`,
    { bookId }
  ).then((res) => {
    store.dispatch(bookReturned(res.data.updatedBorrowedBook));
    Materialize.toast(res.data.message, '2000', 'green');
  }).catch((err) => {
    Materialize.toast(err.response.data.message);
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
