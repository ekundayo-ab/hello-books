import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import * as bookAction from '../../src/actions/bookActions';
import {
  book,
  books
} from '../__mocks__/testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Book actions', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: () => {} };
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Books listing action', () => {
    it('should return all books', (done) => {
      moxios.stubRequest(`/api/v1/books?page=${1}`, {
        status: 200,
        response: {
          success: true,
          books,
          numberOfPages: 1
        }
      });
      const expectedActions = [{
        type: actionType.SET_BOOKS,
        books
      }];
      const store = mockStore({});
      store.dispatch(bookAction.fetchBooks(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Book filtering action', () => {
    it('should return books by category', (done) => {
      moxios.stubRequest(
        `/api/v1/category/books?page=${1}&categoryId=${3}`, {
          status: 200,
          response: {
            success: true,
            books,
            numberOfPages: 1
          }
        });
      const expectedActions = [{
        type: actionType.SET_BOOKS,
        books
      }];
      const store = mockStore({});
      store.dispatch(bookAction.fetchBooksByCategory(1, 3))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Single Book fetching action', () => {
    it('should return a single book', (done) => {
      moxios.stubRequest(`/api/v1/books/${7}`, {
        status: 200,
        response: {
          book
        }
      });
      const expectedActions = [{
        type: actionType.BOOK_FETCHED,
        book: { book }
      }];
      const store = mockStore({});
      store.dispatch(bookAction.fetchBook(7))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Book creation action', () => {
    it('should return the newly added book', (done) => {
      moxios.stubRequest('/api/v1/books', {
        status: 200,
        response: {
          book
        }
      });
      const expectedActions = [{
        type: actionType.ADD_BOOK,
        book
      }];
      const store = mockStore({});
      store.dispatch(bookAction.saveBook(7))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Book update action', () => {
    it('should return the updated book', (done) => {
      moxios.stubRequest('/api/v1/books/7', {
        status: 200,
        response: {
          book
        }
      });
      const expectedActions = [{
        type: actionType.BOOK_UPDATED,
        book
      }];
      const store = mockStore({});
      store.dispatch(bookAction.updateBook(book))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Book deletion action', () => {
    it('should return ID of book to delete', (done) => {
      moxios.stubRequest('/api/v1/books/7', {
        status: 200,
        response: {
          book
        }
      });
      const expectedActions = [
        { type: actionType.BOOK_DELETED, bookId: 7 }
      ];
      const store = mockStore({});
      store.dispatch(bookAction.deleteBook(book.id, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on book deletion failure', (done) => {
      moxios.stubRequest(`/api/v1/books/${7}`, {
        status: 500,
        response: { message: 'Internal Server Error' }
      });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(bookAction.deleteBook(book.id, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});

