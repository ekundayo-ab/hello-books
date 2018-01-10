import axios from 'axios';
import * as actionTypes from './types';

/**
 * Make books available
 *
 * @description Sets the books in the store
 *
 * @param {array} books - List of books to be dispatched
 *
 * @returns {object} action
 */
const setBooks = books =>
  ({ type: actionTypes.SET_BOOKS, books, });

/**
 * Add Book
 *
 * @description {object} Adds a new book to the store
 *
 * @param {object} book - A single book to be dispatched
 *
 * @returns {object} action
 */
const addBook = book =>
  ({ type: actionTypes.ADD_BOOK, book });

/**
 * Deletes Book
 *
 * @description Deletes a book from the store
 *
 * @param {any} bookId - ID of the book to be deleted
 *
 * @returns {object} action
 */
const deleteSuccess = bookId =>
  ({ type: actionTypes.BOOK_DELETED, bookId });


/**
 * Updates Book
 *
 * @description Updates a single book in the store
 *
 * @param {object} book - A single book to be dispatched
 *
 * @returns {object} action
 */
export const bookUpdated = book =>
  ({ type: actionTypes.BOOK_UPDATED, newBook: book });

/**
 * Get Single Book
 *
 * @description Gets single book from store
 *
 * @param {object} book - Payload of book to be dispatch
 *
 * @returns {object} action
 */
export const bookFetched = book =>
  ({ type: actionTypes.BOOK_FETCHED, book });

/**
 * Prepares page details based on Pagination
 *
 * @description Gets books from the server page by page
 *
 * @param {number} pageDetails - Payload of pages to set in store
 *
 * @returns {array} action
 */
export const setPages = pageDetails =>
  ({ type: actionTypes.SET_PAGES, pageDetails });

/**
 * Dispatches details of page to set for pagination
 *
 * @description Gets books from the server page by page
 *
 * @param {object} pageDetails - Payload of single page to set in store
 *
 * @returns {array} action
 */
export const setCurrentPage = pageDetails => dispatch =>
  dispatch(setPages(pageDetails));

/**
 * Get Books
 *
 * @description Gets books from the server page by page
 *
 * @param {number} pageNumber - ID of each page to be rendered
 *
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
      .catch(err => err.response.data);

/**
 * Get Books
 *
 * @description Gets books from the server by category
 *
 * @param {number} pageNumber - ID of each page to be rendered
 * @param {number} categoryId - ID of category used to fetch books
 *
 * @returns {array} action
 */
const fetchBooksByCategory = (pageNumber, categoryId) =>
  dispatch =>
    axios.get(
      `/api/v1/category/books?page=${pageNumber}&categoryId=${categoryId}`
    )
      .then((res) => {
        const { books } = res.data;
        const toDispatch = books || [];
        dispatch(setBooks(toDispatch));
        return { isDone: !!books };
      })
      .catch((err) => {
        dispatch(setBooks([]));
        return err.response.data;
      });

/**
 * Get Single Book
 *
 * @description Gets a single book from the server
 *
 * @param {number} id - ID of a single book to be fetched
 *
 * @returns {object} action
 */
const fetchBook = id => dispatch =>
  axios.get(`/api/v1/books/${id}`)
    .then((res) => {
      dispatch(bookFetched(res.data));
      return res.data;
    })
    .catch((err) => {
      const { message } = err.response.data;
      Materialize.toast(message, 2000, 'red');
      return { notFound: true, message };
    });


/**
 * Create/Add Book
 *
 * @description Sends book to the server to save in database
 *
 * @param {object} book - Details of the book to be added
 *
 * @returns {object} action
 */
const saveBook = book => dispatch =>
  axios.post('/api/v1/books', book)
    .then((res) => {
      dispatch(addBook(res.data.book));
      Materialize.toast(res.data.message, 2000, 'green');
      return { res: res.data, isDone: true };
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 2000, 'red');
      return { isDone: false };
    });

/**
 * Update Book
 *
 * @description Sends details of book to update to the server
 *
 * @param {object} book - Details of the book to be updated
 *
 * @returns {object} action
 */
const updateBook = book => dispatch =>
  axios.put(`/api/v1/books/${book.id}`, book)
    .then((res) => {
      dispatch(bookUpdated(res.data.newBook));
      Materialize.toast(res.data.message, 2000, 'green');
      return { isDone: true, result: res.data };
    })
    .catch((err) => {
      Materialize.toast(err.response.data.message, 2000, 'red');
      return { hasError: true, result: err.response.data };
    });

/**
 * Delete A Book
 *
 * @description Sends ID of book to server for deletion
 *
 * @param {number} bookId - ID of the book to be deleted
 * @param {number} pageNumber - ID of the current page in which the book is
 * to be deleted
 *
 * @returns {object} action
 */
const deleteBook = (bookId, pageNumber) =>
  dispatch =>
    axios.delete(`/api/v1/books/${bookId}`)
      .then((res) => {
        Materialize
          .toast('Poof! Book successfully deleted', 2000, 'green');
        dispatch(deleteSuccess(res.data.book.id));
        dispatch(fetchBooks(pageNumber))
          .then((res) => {
            const { numberOfPages } = res;
            const pages =
              Array.from(Array(numberOfPages)).map((e, i) => i + 1);
            const pageDetails = { pages, pageId: pageNumber };
            dispatch(setCurrentPage(pageDetails));
          });
      })
      .catch((err) => {
        Materialize.toast(err.response.data.message, 2000, 'red');
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
