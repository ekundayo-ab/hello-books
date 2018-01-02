import axios from 'axios';
import io from 'socket.io-client';
import * as actionTypes from './types';
import autoUpgrade from '../utils/autoUpgrade';
import { setCurrentUser } from './authActions';


/**
 * Gets Borrowed Book
 *
 * @description dispatches a single borrowed book to redux store
 *
 * @param {object} borrow - Details of a single borrowing record to be fetched
 *
 * @returns {object} action
 */
const borrowedFetched = borrow =>
  ({ type: actionTypes.BORROWED_FETCHED, borrow });

/**
 * Get A Book
 *
 * @description dispatch a single book to redux store
 *
 * @param {object} book - Details of a single borrowing record to be dispatched
 *
 * @returns {object} action
 */
const bookFetched = book =>
  ({ type: actionTypes.BOOK_FETCHED, book });

/**
 * Returns A Book
 *
 * @description dispatch and updates lists of
 * books borrowed but not returned in the redux store
 *
 * @param {object} book - Details of a single book to be dispatched for return
 * action
 *
 * @returns {object} action
 */
const bookReturned = book =>
  ({ type: actionTypes.BORROWED_RETURNED, book });

/**
 * Sets Borrowed Books
 *
 * @description dispatches all borrowed books to redux store
 *
 * @param {array} borrowedBooks - List of borrowed books to be dispatched
 *
 * @returns {object} action
 */
const setBorrowedBooks = borrowedBooks =>
  ({ type: actionTypes.SET_BORROWED_BOOKS, borrowedBooks });

/**
 * Get Borrowed Not Returned Books
 *
 * @description dispatches all books borrowed but not returned
 * to redux store
 *
 * @param {array} bookList - Lists of borrowed books which have not been
 * returned, ready to be dispatched
 *
 * @returns {object} action
 */
const setBorrowedNotReturnedBooks = bookList =>
  ({ type: actionTypes.SET_BORROWED_NOT_RETURNED_BOOKS, bookList });

/**
 * Borrow Book
 *
 * @description borrows book from the library and dispatches
 * function borrowFetched and function bookFetched to redux store
 *
 * @param {number} userId - ID of the current user borrowing
 * @param {number} bookId - ID of book to be borrowed
 * @param {string} username - Username of the user borrowing
 *
 * @returns {object} action
 */
const borrowBook = (userId, bookId, username) =>
  dispatch =>
    axios.post(
      `/api/v1/users/${userId}/books?loan=borrowOrReturn`,
      bookId,
    ).then((res) => {
      const { updatedBorrowedBook } = res.data;
      const socket = io('https://hellobooks-e.herokuapp.com');
      socket.emit('borrow book', { book: updatedBorrowedBook, username });
      dispatch(bookFetched(updatedBorrowedBook));
      dispatch(borrowedFetched(updatedBorrowedBook));
      Materialize.toast(`${updatedBorrowedBook.title} Successfully borrowed`,
        2000, 'green');
      autoUpgrade();
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 2000, 'red');
    });

/**
 * Get Borrowed Books
 *
 * @description makes an API call to the server for all
 * borrowed books, then dispatches an action to set them
 * in the redux store
 *
 * @param {number} pageNumber - Current page number of page in which book is
 * located
 * @param {number} userId - ID of the current user
 * @param {boolean} notify - Boolean value for notifying admin user
 * @param {number} more - Value of more borrowed books to be fetched
 *
 * @returns {object} action
 */
const fetchAllBorrowedBooks = (pageNumber, userId, notify, more) =>
  dispatch =>
    axios.get(
      `/api/v1/borrowed/${userId}/books?` +
      `page=${pageNumber}&notify=${notify}&more=${more}&returned=${0}`
    ).then((res) => {
      let toDispatch;
      if (res.data.borrowedBooks) {
        toDispatch = res.data.borrowedBooks;
      } else {
        toDispatch = [];
      }
      dispatch(setBorrowedBooks(toDispatch));
      return res.data;
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 2000, 'red');
    });

/**
 * Get Single Borrowed Book
 *
 * @description makes an API call to the server to borrow a single
 * book, then dispatches a pure function action to
 * set it in the redux store
 *
 * @param {number} bookId - ID of the book to be borrowed
 *
 * @returns {object} action
 */
const fetchBorrowedBook = bookId =>
  dispatch =>
    axios.get(`/api/v1/borrowed/${bookId}`)
      .then((res) => {
        if (res.data.foundBorrowedBook) {
          dispatch(borrowedFetched(res.data.foundBorrowedBook));
        } else {
          const foundBorrowedBook = {};
          dispatch(borrowedFetched(foundBorrowedBook));
        }
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 2000, 'red');
      });

/**
 * Get All Books Borrowed Not Returned
 *
 * @description makes an API call the server to get all books
 * which have been borrowed but not returned, then dispatches
 * an action to set them in the redux store
 *
 * @param {number} pageNumber - Current page number of the books
 * @param {number} userId - ID of the user getting this list
 *
 * @returns {object} action
 */
const getBorrowedNotReturned = (pageNumber, userId) =>
  dispatch =>
    axios.get(`/api/v1/users/${userId}/books?returned=false&page=${pageNumber}`)
      .then((res) => {
        let toDispatch;
        if (res.data.borrowedBooks) {
          toDispatch = res.data.borrowedBooks;
        } else {
          toDispatch = [];
        }
        dispatch(setBorrowedNotReturnedBooks(toDispatch));
        return res.data;
      }).catch((err) => {
        Materialize.toast(err.response.data.message, 2000, 'red');
      });

  /**
   * Return Book
   *
   * @description Send ID of book to return, with a the borrower's identity
   *
   * @param {number} userId - ID of user returning book
   * @param {number} bookId - ID of the book to be returned
   * @param {number} borrowId - ID of the borrowed record of book
   * @param {string} username - Name of the user returning a borrowed book
   * @param {object} borrow - The borrowing record payload
   *
   * @returns {object} action
   */
const returnBook = (userId, bookId, borrowId, username, borrow) =>
  dispatch =>
    axios.put(`/api/v1/users/${userId}/books?loan=borrowOrReturn`,
      { bookId, borrowId, borrow }
    ).then((res) => {
      const socket = io('https://hellobooks-e.herokuapp.com');
      socket.emit('return book', {
        book: res.data.updatedBook[1],
        username
      });
      let toDispatch;
      if (res.data.updatedBorrowedBook) {
        toDispatch = res.data.updatedBorrowedBook;
      } else {
        toDispatch = {};
      }
      dispatch(bookReturned(toDispatch));
      dispatch(setCurrentUser(res.data.userToUpdateInStore));
      return Materialize.toast(res.data.message, 2000, 'green');
    }).catch((err) => {
      Materialize.toast(err.response.data.message, 2000, 'red');
    });

export {
  borrowBook,
  returnBook,
  fetchBorrowedBook,
  fetchAllBorrowedBooks,
  getBorrowedNotReturned,
};
