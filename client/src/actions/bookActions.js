import axios from 'axios';
import store from '../../src/index';
import * as actionTypes from './types';

/**
 * Make books available
 * @description Sets the books in the store
 * @param {array} books - list of books
 * @returns {object} action
 */
const setBooks = books =>
  ({ type: actionTypes.SET_BOOKS, books, });

/**
 * Add Book
 * @description {object} Adds a new book to the store
 * @param {object} book - book to add
 * @returns {object} action
 */
const addBook = book =>
  ({ type: actionTypes.ADD_BOOK, book });

/**
 * Deletes Book
 * @description Deletes a book from the store
 * @param {any} bookId - id of book to delete
 * @returns {object} action
 */
const deleteSuccess = bookId =>
  ({ type: actionTypes.BOOK_DELETED, bookId });


/**
 * Updates Book
 * @description Updates a single book in the store
 * @param {object} book - book details
 * @returns {object} action
 */
export const bookUpdated = book =>
  ({ type: actionTypes.BOOK_UPDATED, book });

/**
 * Get Single Book
 * @description Gets single book from store
 * @param {object} book - book detail
 * @returns {object} action
 */
export const bookFetched = book =>
  ({ type: actionTypes.BOOK_FETCHED, book });

/**
 * Get Books
 * @description Gets books from the server page by page
 * @param {number} pageNumber - page ID to get
 * @returns {array} action
 */
const fetchBooks = pageNumber =>
  dispatch =>
    axios.get(`/api/v1/books?page=${pageNumber}`)
      .then((res) => {
        const toDispatch = res.data.books ? res.data.books : [];
        dispatch(setBooks(toDispatch));
        return res.data;
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 3000, 'red');
        return err.response.data;
      });

/**
 * Get Books
 * @description Gets books from the server by category
 * @param {number} pageNumber - page ID to get
 * @param {number} categoryId - page ID to get
 * @returns {array} action
 */
const fetchBooksByCategory = (pageNumber, categoryId) =>
  axios.get(
    `/api/v1/category/books?page=${pageNumber}&categoryId=${categoryId}`
  )
    .then((res) => {
      store.dispatch(setBooks(res.data.books));
      return {
        isDone: true
      };
    })
    .catch((err) => {
      store.dispatch(setBooks(err.response.data.books));
      return err.response.data;
    });

/**
 * Get Single Book
 * @description Gets a single book from the server
 * @param {number} id - book ID to get
 * @returns {object} action
 */
const fetchBook = id =>
  axios.get(`/api/v1/books/${id}`)
    .then((res) => {
      store.dispatch(bookFetched(res.data));
      return res.data;
    })
    .catch(err => err);


/**
 * Create/Add Book
 * @description Sends book to the server to save in database
 * @param {object} data - book details
 * @returns {object} action
 */
const saveBook = data =>
  axios.post('/api/v1/books', data)
    .then((res) => {
      store.dispatch(addBook(res.data.book));
      Materialize.toast(res.data.message, 3000, 'green');
      return { res: res.data, isDone: true };
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
      return {
        isDone: false
      };
    });

/**
 * Update Book
 * @description Sends details of book to update to the server
 * @param {object} data - book detail
 * @returns {object} action
 */
const updateBook = data =>
  axios
    .put(`/api/v1/books/${data.id}`, data)
    .then((res) => {
      store.dispatch(bookUpdated(res.data.book));
      Materialize.toast(res.data.message, 3000, 'green');
      return {
        isDone: true,
        result: res.data,
      };
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
      return {
        hasError: true,
        result: err.response.data
      };
    });

/**
 * Delete A Book
 * @description Sends ID of book to server for deletion
 * @param {number} bookId - id of book to delete
 * @returns {object} action
 */
const deleteBook = bookId =>
  axios.delete(`/api/v1/books/${bookId}`)
    .then((res) => {
      Materialize.toast('Poof! Book successfully deleted', 3000, 'green');
      store.dispatch(deleteSuccess(res.data.book.id));
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 3000, 'red');
    });

export {
  fetchBooks,
  fetchBooksByCategory,
  fetchBook,
  setBooks,
  saveBook,
  deleteBook,
  updateBook,
};
