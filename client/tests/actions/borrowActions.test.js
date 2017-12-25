import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionType from '../../src/actions/types';
import * as borrowAction from '../../src/actions/borrowActions';
import {
  user,
  book,
  borrow,
  borrowedBooks,
  updatedBook,
  borrowedNotReturnedBooks
} from '../__mocks__/testData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Borrowing actions', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: () => {} };
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('Single Book borrow action', () => {
    it('should return book to borrow', (done) => {
      moxios.stubRequest(`/api/v1/users/${1}/books?loan=borrowOrReturn`, {
        status: 200,
        response: {
          success: true,
          message: 'You borrowed this book',
          updatedBorrowedBook: book
        }
      });
      const expectedActions = [
        { type: actionType.BOOK_FETCHED, book },
        { type: actionType.BORROWED_FETCHED, borrow: book },
      ];
      const store = mockStore({});
      store.dispatch(borrowAction.borrowBook(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on borrow action failure', (done) => {
      moxios.stubOnce('POST', `/api/v1/users/${1}/books?loan=borrowOrReturn`, {
        status: 500,
        response: { message: 'Internal Server Error' }
      });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(borrowAction.borrowBook(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Borrowed books listing action', () => {
    it('should return all books borrowed by a user', (done) => {
      moxios
        .stubRequest(`/api/v1/borrowed/${1}/books?page=${1}` +
        `&notify=${false}&more=${0}&returned=${0}`, {
          status: 200,
          response: {
            success: true,
            borrowedBooks,
            numberOfPages: 3
          }
        });
      const expectedActions = [{
        type: actionType.SET_BORROWED_BOOKS,
        borrowedBooks
      }];
      const store = mockStore({});
      store.dispatch(borrowAction.fetchAllBorrowedBooks(1, 1, false, 0))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return empty array for no books', (done) => {
      moxios
        .stubRequest(`/api/v1/borrowed/${1}/books?page=${1}` +
        `&notify=${false}&more=${0}&returned=${0}`, {
          status: 200,
          response: {
            success: true,
            numberOfPages: 3
          }
        });
      const expectedActions = [{
        type: actionType.SET_BORROWED_BOOKS,
        borrowedBooks: []
      }];
      const store = mockStore({});
      store.dispatch(borrowAction.fetchAllBorrowedBooks(1, 1, false, 0))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on book listing failure', (done) => {
      moxios
        .stubRequest(`/api/v1/borrowed/${1}/books?page=${1}` +
        `&notify=${false}&more=${0}&returned=${0}`, {
          status: 500,
          response: { message: 'Internal Server Error' }
        });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(borrowAction.fetchAllBorrowedBooks(1, 1, false, 0))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Single borrow checking action', () => {
    it('should return the borrowing record of a book', (done) => {
      moxios.stubRequest(`/api/v1/borrowed/${1}`, {
        status: 200,
        response: {
          success: true,
          foundBorrowedBook: borrow,
          numberOfPages: 3
        }
      });
      const expectedActions = [{
        type: actionType.BORROWED_FETCHED,
        borrow
      }];
      const store = mockStore({});
      store.dispatch(borrowAction.fetchBorrowedBook(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return the borrowing record of a book', (done) => {
      moxios.stubRequest(`/api/v1/borrowed/${1}`, {
        status: 200,
        response: {
          success: true,
          numberOfPages: 3
        }
      });
      const expectedActions = [{
        type: actionType.BORROWED_FETCHED,
        borrow: {}
      }];
      const store = mockStore({});
      store.dispatch(borrowAction.fetchBorrowedBook(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on checking failure', (done) => {
      moxios.stubRequest(`/api/v1/borrowed/${1}`, {
        status: 500,
        response: { message: 'Internal Server Error' }
      });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(borrowAction.fetchBorrowedBook(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Borrowed and Not returned records listing action', () => {
    it('should return all books borrowed and not returned by user', (done) => {
      moxios.stubRequest(
        `/api/v1/users/${1}/books?returned=false&page=${1}`, {
          status: 200,
          response: {
            success: true,
            borrowedBooks: borrowedNotReturnedBooks,
            numberOfPages: 3
          }
        });
      const expectedActions = [{
        type: actionType.SET_BORROWED_NOT_RETURNED_BOOKS,
        bookList: borrowedNotReturnedBooks
      }];
      const store = mockStore({});
      store.dispatch(borrowAction.getBorrowedNotReturned(1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return empty array if no books', (done) => {
      moxios.stubRequest(
        `/api/v1/users/${1}/books?returned=false&page=${1}`, {
          status: 200,
          response: {
            numberOfPages: 3
          }
        });
      const expectedActions = [{
        type: actionType.SET_BORROWED_NOT_RETURNED_BOOKS,
        bookList: []
      }];
      const store = mockStore({});
      store.dispatch(borrowAction.getBorrowedNotReturned(1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on listing failure', (done) => {
      moxios.stubRequest(
        `/api/v1/users/${1}/books?returned=false&page=${1}`, {
          status: 500,
          response: { message: 'Internal Server Error' }
        });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(borrowAction.getBorrowedNotReturned(1, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Borrowed book returning action', () => {
    it('should return the book returned by user', (done) => {
      moxios.stubOnce('PUT', `/api/v1/users/${1}/books?loan=borrowOrReturn`, {
        status: 200,
        response: {
          success: true,
          updatedBook,
          updatedBorrowedBook: book,
          userToUpdateInStore: user,
        }
      });
      const expectedActions = [
        { type: actionType.BORROWED_RETURNED, book },
        { type: actionType.SET_CURRENT_USER, user }
      ];
      const store = mockStore({});
      store.dispatch(borrowAction.returnBook(1, 1, 1, 'ekundayo', borrow))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return empty object for no book', (done) => {
      moxios.stubOnce('PUT', `/api/v1/users/${1}/books?loan=borrowOrReturn`, {
        status: 200,
        response: {
          success: true,
          updatedBook,
          userToUpdateInStore: user,
        }
      });
      const expectedActions = [
        { type: actionType.BORROWED_RETURNED, book: {} },
        { type: actionType.SET_CURRENT_USER, user }
      ];
      const store = mockStore({});
      store.dispatch(borrowAction.returnBook(1, 1, 1, 'ekundayo', borrow))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should return error message on return action failure', (done) => {
      moxios.stubOnce('PUT', `/api/v1/users/${1}/books?loan=borrowOrReturn`, {
        status: 500,
        response: { message: 'Internal Server Error' }
      });
      const expectedActions = [];
      const store = mockStore({});
      store.dispatch(borrowAction.returnBook(1, 1, 'ekundayo', borrow))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});

