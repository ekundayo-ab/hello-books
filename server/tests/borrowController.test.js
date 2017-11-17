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

describe('BORROWING & RETURNING Operations', () => {
  helperBeforeHooks.makeDataAvailable();
  beforeEach((done) => {
    adminToken = process.env.adminToken;
    normalToken = process.env.normalToken;
    bookId = process.env.bookId;
    userId = process.env.userId;
    user2Id = process.env.user2Id;
    done();
  });

  describe('Upon borrowing of books', () => {
    it('should notify if no book(s) is/are available', (done) => {
      server
        .get(`/api/v1/borrowed/${userId}/books?page=${24556789451}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('You have no borrowed book(s)');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should disallow unauthenticated user from borrowing', (done) => {
      server
        .post('/api/v1/users/2/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          bookId,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
    it('should allow authenticated user to borrow', (done) => {
      server
        .post(`/api/v1/users/${userId}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId,
        })
        .end((err, res) => {
          borrowId = res.body.borrowingRecord.id;
          expect(res.body.success).to.equal(true);
          expect(res.status).to.equal(200);
          expect(res.body.message)
            .to.equal('Learn Haskell succesfully borrowed');
          done();
        });
    });
    it('should notify if book is not available', (done) => {
      server
        .post(`/api/v1/users/${userId}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId: 24,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Book not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should notify if book was borrowed but not returned by same user',
      (done) => {
        server
          .post(`/api/v1/users/${userId}/books`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            bookId,
          })
          .end((err, res) => {
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Book borrowed already');
            expect(res.status).to.equal(409);
            done();
          });
      });
    it('should get all borrowed books for an authenticated user', (done) => {
      server
        .get(`/api/v1/borrowed/${userId}/books?page=${1}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.borrowedBooks)
            .to.be.an.instanceOf(Object);
          expect(res.body).to.have.property('numberOfPages');
          expect(res.body.numberOfPages).to.be.a('number');
          done();
        });
    });
  });

  describe('Upon listing of books not returned', () => {
    it('should disallow unauthenticated user from listing', (done) => {
      server
        .get(`/api/v1/users/${userId}/books?returned=false`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
    it('should list all books borrowed but not returned by authenticated user',
      (done) => {
        server
          .get(`/api/v1/users/${userId}/books?returned=false&page=1`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('borrow');
            done();
          });
      });
    it('should notify if user has no book(s) to return', (done) => {
      server
        .get(`/api/v1/users/${user2Id}/books?returned=false&page=1`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('You have no books to return');
          done();
        });
    });
  });

  describe('Upon returning of book', () => {
    before((done) => {
      jwt.verify(adminToken, 'hello-books', (error, decoded) => {
        userId = decoded.data.id;
      });
      done();
    });
    it('should disallow unauthenticated user from returning', (done) => {
      server
        .put('/api/v1/users/2/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          bookId,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
    it('should allow authenticated user to return book', (done) => {
      server
        .put(`/api/v1/users/${userId}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId,
          borrowId
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.status).to.equal(200);
          expect(res.body.message)
            .to.equal('Learn Haskell succesfully returned ' +
            'but pending review by Administrator');
          done();
        });
    });
    it('should notify if book has been returned or if user has' +
    'no business returning book', (done) => {
      server
        .get(`/api/v1/borrowed/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Cleared, Not borrowed by you!');
          expect(res.body)
            .to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should notify if user does not exist', (done) => {
      server
        .put(`/api/v1/users/${28}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId,
          borrowId
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User does not exist');
          done();
        });
    });
    it('should notify if book is not available', (done) => {
      server
        .put(`/api/v1/users/${userId}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId: 24,
          borrowId
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Book not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
