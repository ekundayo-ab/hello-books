import supertest from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../app';
import helperBeforeHooks from './../helpers/helperBeforeHooks';

// Provides interface to ascertain expected results are true
const expect = chai.expect;

const server = supertest.agent(app);
let adminToken; // Token for an Admin User
let normalToken; // Token for a Normal User
let userId;
let user2Id;
let bookId;
let borrowId;

describe('Library books', () => {
  helperBeforeHooks.makeDataAvailable();
  beforeEach((done) => {
    ({ adminToken, normalToken, bookId, userId, user2Id } = process.env);
    done();
  });

  describe('borrowing operations by authenticated user', () => {
    it('should return (no-content) empty object if no borrows', (done) => {
      server
        .get(`/api/v1/borrowed/${userId}/books?page=${24556789451}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
    });
    it('should return success message and updated book and new borrow records',
      (done) => {
        server
          .post(`/api/v1/users/${userId}/books?loan=borrowOrReturn`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({ bookId })
          .end((err, res) => {
            borrowId = res.body.borrowingRecord.id;
            expect(res.status).to.equal(200);
            expect(res.body.message)
              .to.equal('Learn Haskell succesfully borrowed');
            expect(res.body.updatedBorrowedBook.isbn).to.equal(1);
            expect(res.body.updatedBorrowedBook.title)
              .to.equal('Learn Haskell');
            expect(res.body.updatedBorrowedBook.author)
              .to.equal('Haskell Master');
            expect(res.body.updatedBorrowedBook.description)
              .to.equal('Learn and Master Haskell in 16 Months');
            expect(res.body.updatedBorrowedBook.quantity).to.equal(29);
            expect(res.body.updatedBorrowedBook.categoryId).to.equal(4);
            expect(res.body.borrowingRecord.userId)
              .to.equal(parseInt(userId, 10));
            expect(res.body.borrowingRecord.bookId)
              .to.equal(res.body.updatedBorrowedBook.id);
            expect(res.body.borrowingRecord.returned).to.equal(false);
            expect(res.body.borrowingRecord)
              .to.have.property('dueDate');
            done();
          });
      });
    it('should return error message if book is not found', (done) => {
      server
        .post(`/api/v1/users/${userId}/books?loan=borrowOrReturn`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({ bookId: 24 })
        .end((err, res) => {
          expect(res.body.message).to.equal('Book not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return error message for already borrowed book',
      (done) => {
        server
          .post(`/api/v1/users/${userId}/books?loan=borrowOrReturn`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({ bookId })
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message)
              .to.equal('Book borrowed already please return');
            done();
          });
      });
  });

  describe('borrows listing operations by authenticated user', () => {
    it('should return all borrowed books', (done) => {
      server
        .get(`/api/v1/borrowed/${userId}/books?page=${1}&notify=${false}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.numberOfPages).to.equal(1);
          expect(res.body.numberOfPages).to.be.a('number');
          expect(res.body.borrowedBooks).to.be.an('array');
          expect(res.body.borrowedBooks[0]).to.have.property('dueDate');
          expect(res.body.borrowedBooks[0].bookId)
            .to.equal(res.body.borrowedBooks[0].book.id);
          expect(res.body.borrowedBooks[0].book.isbn).to.equal(1);
          expect(res.body.borrowedBooks[0].book.title)
            .to.equal('Learn Haskell');
          expect(res.body.borrowedBooks[0].book.author)
            .to.equal('Haskell Master');
          expect(res.body.borrowedBooks[0].book.description)
            .to.equal('Learn and Master Haskell in 16 Months');
          expect(res.body.borrowedBooks[0].book.quantity).to.equal(29);
          expect(res.body.borrowedBooks[0].book.categoryId).to.equal(4);
          done();
        });
    });
  });

  describe('borrows listing of un-returned books by authenticated user', () => {
    it('should return all books',
      (done) => {
        server
          .get(`/api/v1/users/${userId}/books?returned=false&page=1`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.numberOfPages).to.equal(1);
            expect(res.body.numberOfPages).to.be.a('number');
            expect(res.body.borrowedBooks).to.be.an('array');
            expect(res.body.borrowedBooks[0]).to.have.property('dueDate');
            expect(res.body.borrowedBooks[0].bookId)
              .to.equal(res.body.borrowedBooks[0].book.id);
            expect(res.body.borrowedBooks[0].book.isbn).to.equal(1);
            expect(res.body.borrowedBooks[0].book.title)
              .to.equal('Learn Haskell');
            expect(res.body.borrowedBooks[0].book.author)
              .to.equal('Haskell Master');
            expect(res.body.borrowedBooks[0].book.description)
              .to.equal('Learn and Master Haskell in 16 Months');
            expect(res.body.borrowedBooks[0].book.quantity).to.equal(29);
            expect(res.body.borrowedBooks[0].book.categoryId).to.equal(4);
            done();
          });
      });
    it('should return (no-content) message for no books', (done) => {
      server
        .get(`/api/v1/users/${user2Id}/books?returned=false&page=1`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(Object.keys(res.body).length).to.equal(0);
          done();
        });
    });
  });

  describe('borrows return operations by authenticated user', () => {
    before((done) => {
      jwt.verify(adminToken, process.env.JWT_SECRET, (error, decoded) => {
        userId = decoded.data.id;
      });
      done();
    });
    it('should return updated(book, borrow and user) records', (done) => {
      server
        .put(`/api/v1/users/${userId}/books?loan=borrowOrReturn`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId,
          borrowId,
          borrow: { id: borrowId, book: { id: bookId } }
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message)
            .to.equal('Learn Haskell succesfully returned ' +
            'but pending review by Administrator');
          expect(res.body.updatedBook[1].isbn).to.equal(1);
          expect(res.body.updatedBook[1].title).to.equal('Learn Haskell');
          expect(res.body.updatedBook[1].quantity).to.equal(30);
          expect(res.body.borrowUpdated.returned).to.equal(true);
          expect(res.body.borrowUpdated.userId)
            .to.equal(res.body.userToUpdateInStore.id);
          expect(res.body.userToUpdateInStore.borrowLimit).to.equal(2);
          expect(res.body.borrowUpdated.bookId)
            .to.equal(res.body.updatedBook[1].id);
          done();
        });
    });
    it('return not borrowed message', (done) => {
      server
        .get(`/api/v1/borrowed/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Cleared, Not borrowed by you!');
          expect(res.body)
            .to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should return error message if user is not found', (done) => {
      server
        .put(`/api/v1/users/${28}/books?loan=borrowOrReturn`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({ bookId, borrowId })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message)
            .to.equal('Authentication failed. User does not exist');
          done();
        });
    });
    it('should return error message if book is not found', (done) => {
      server
        .put(`/api/v1/users/${userId}/books?loan=borrowOrReturn`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId: 24,
          borrowId,
          borrow: { id: borrowId, book: { id: bookId } }
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Book not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
