import supertest from 'supertest';
import { expect } from 'chai';
import model from '../models';
import app from '../../app';
import helperBeforeHooks from './../helpers/helperBeforeHooks';

const Book = model.Book;
const server = supertest.agent(app);
let adminToken; // Token for an Admin User
let normalToken; // Token for a Normal User
let bookId;
describe('BOOK Operations', () => {
  helperBeforeHooks.makeDataAvailable();
  beforeEach((done) => {
    ({ adminToken, normalToken, bookId } = process.env);
    done();
  });
  describe('Upon adding of books', () => {
    it('should ensure admin user is authenticated', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          isbn: 20234,
          title: 'Learn JAVA',
          author: 'Java Master',
          description: 'Learn & Master Java in 28 days',
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should allow admin user to add books', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 20234,
          title: 'Learn JAVA',
          author: 'Java Master',
          description: 'Learn & Master Java in 28 days',
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Learn JAVA, successfully added');
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should disallow admin adding same book again', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 20234,
          title: 'Learn JAVA',
          author: 'Java Master',
          description: 'Learn & Master Java in 28 days',
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('should notify if any field not defined', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 20238,
          title: 'Learn JAVA',
          author: 'Java Master',
          description: 'Learn & Master Java in 28 days',
          quantity: undefined,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('All fields must exist');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should notify if isbn field is empty', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '',
          title: 'Learn JAVA',
          author: 'Java Master',
          description: 'Learn & Master Java in 28 days',
          quantity: 200,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.isbn).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should notify if title field is empty', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '567801',
          title: '',
          author: 'Java Master',
          description: 'Learn & Master Java in 28 days',
          quantity: 200,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.title).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should notify if author field is empty', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 20238,
          title: 'Learn JAVA',
          author: '',
          description: 'Learn & Master Java in 28 days',
          quantity: 240,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.author).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should notify if description field is empty', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 202138,
          title: 'Learn SQL',
          author: 'SQL Master',
          description: '',
          quantity: 12,
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.description)
            .to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should notify if quantity field is empty', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 202347,
          title: 'Learn Android',
          author: 'Android Master',
          description: 'Learn and Master Android in 6 Months',
          quantity: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.quantity).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should prevent non admin user from creating books', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .send({
          isbn: 839483,
          title: 'Learn SQL',
          author: 'SQL Master',
          description: 'Learn & Master SQL in 48hours',
          quantity: 39,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Permission Denied');
          done();
        });
    });
    it('should prevent unauthenticated user from viewing all books', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
  });

  describe('Upon modification of books', () => {
    it('should ensure only admin user can modify books', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16 Months' +
          'Updated with more projects and examples',
          quantity: '30',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Permission Denied');
          done();
        });
    });
    it('should ensure only authenticated admin user can modify books',
      (done) => {
        server
          .put(`/api/v1/books/${bookId}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', `${adminToken}giberrish`)
          .send({
            isbn: '001',
            title: 'Learn Haskell New Edition',
            author: 'Haskell Master',
            description: 'Learn and Master Haskell in' +
            '16 Months Updated with more projects and examples',
            quantity: '30',
          })
          .end((err, res) => {
            expect(res.body.success).to.equal(false);
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Failed to authenticate token');
            done();
          });
      });
    it('should allow authenticated admin user to modify books', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in' +
          '16 Months Updated with more projects and examples',
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.status).to.equal(200);
          expect(res.body.message)
            .to.equal('Learn Haskell successfully ' +
            'updated to Learn Haskell New Edition');
          done();
        });
    });
    it('should notify if book is not available', (done) => {
      server
        .put('/api/v1/books/345')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in' +
          '16 Months Updated with more projects and examples',
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Book not found');
          done();
        });
    });
    it('should ensure all fields exists', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in' +
          '16 Months Updated with more projects and examples',
          quantity: undefined,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('All fields must exist');
          done();
        });
    });
    it('should ensure isbn field is required', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16 Months' +
          'Updated with more projects and examples',
          quantity: 40,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.isbn).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should ensure title field is required', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 456,
          title: '',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16' +
          'Months Updated with more projects and examples',
          quantity: 40,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.title).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should ensure author field is required', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 456,
          title: 'Learn Haskell New Edition',
          author: '',
          description: 'Learn and Master Haskell in' +
          '16 Months Updated with more projects and examples',
          quantity: 40,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.author).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should ensure description field is required', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 456,
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: '',
          quantity: 40,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.description)
            .to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should ensure quantity field is required', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: 456,
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16' +
          'Months Updated with more projects and examples',
          quantity: '',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.errors.quantity).to.equal('This field is required');
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('Upon listing of all books', () => {
    it('should ensure only authenticated admin user can view all books',
      (done) => {
        server
          .get('/api/v1/books?page=1')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.numberOfPages).to.equal(1);
            expect(res.body.books).to.be.a('array');
            done();
          });
      });
    it('should send a notification if no book(s) exists', (done) => {
      server
        .get(`/api/v1/books?page=${8986521345}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Books not available, check back later.');
          done();
        });
    });
    it('should raise error for invalid inputs', (done) => {
      server
        .get(`/api/v1/books?page=${8986521345}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Books not available, check back later.');
          done();
        });
    });
    it('should ensure only authenticated user can view all books', (done) => {
      server
        .get('/api/v1/books?page=1')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.numberOfPages).to.equal(1);
          expect(res.body.books).to.be.a('array');
          done();
        });
    });
    it('should disallow unauthenticated user from viewing all books',
      (done) => {
        server
          .get('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.success).to.equal(false);
            expect(res.body.message)
              .to.equal('Unauthenticated, token not found');
            done();
          });
      });
    it('should disallow user with altered token from viewing all books',
      (done) => {
        server
          .get('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', `${adminToken}gibberish`)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Failed to authenticate token');
            done();
          });
      });
  });

  describe('A search for a particular book', () => {
    it('should make book available to an authenticated user', (done) => {
      server
        .get(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.id).to.be.a('number');
          expect(res.body.title).to.be.a('string');
          expect(res.body.description).to.be.a('string');
          expect(res.body.quantity).to.be.a('number');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should raise an error when book is not found', (done) => {
      server
        .get(`/api/v1/books/${3210}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Book not found');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should raise an error when book ID is invalid', (done) => {
      server
        .get(`/api/v1/books/${undefined}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Ensure book ID is supplied');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
  });

  describe('Upon filtering of books', () => {
    it('should return books in a category', (done) => {
      server
        .get(`/api/v1/category/books?page=${1}&categoryId=${4}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('books');
          expect(res.body.books).to.be.an('array');
          done();
        });
    });
    it('should return not found error if no book(s) exist in category',
      (done) => {
        server
          .get(`/api/v1/category/books?page=${1}&categoryId=${6}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', normalToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('No book(s) in this category');
            expect(res.body.books).to.have.lengthOf(0);
            done();
          });
      });
  });

  describe('Upon deleting of a book', () => {
    it('should ensure only admin can delete book', (done) => {
      server
        .delete(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Permission Denied');
          done();
        });
    });
    it('should allow only authenticated admin to delete book', (done) => {
      server
        .delete(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Book successfully deleted');
          done();
        });
    });
    it('should notify if book to be deleted is not found', (done) => {
      server
        .delete('/api/v1/books/003')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Book not found');
          done();
        });
    });
    it('should notify if parameter specified is undefined', (done) => {
      server
        .delete(`/api/v1/books/${undefined}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Ensure book ID is present');
          done();
        });
    });
    it('should notify raise error for unexpected outcome', (done) => {
      Book.find = () => Promise.reject(1);
      server
        .delete(`/api/v1/books/${3}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Internal Server Error');
          done();
        });
    });
  });

  // describe('Upon further modification of a book', () => {
  //   it('should raise error for unexpected outcome', (done) => {
  //     // Book.update = () => Promise.reject(1);
  //     server
  //       .put(`/api/v1/books/${bookId}`)
  //       .set('Accept', 'application/x-www-form-urlencoded')
  //       .set('x-access-token', adminToken)
  //       .send({
  //         isbn: 456,
  //         title: 'Learn Haskell New Edition',
  //         author: 'Haskell Master',
  //         description: 'Learn and Master Haskell in 16' +
  //         'Months Updated with more projects and examples',
  //         quantity: '',
  //       })
  //       .end((err, res) => {
  //         expect(res.status).to.equal(500);
  //         expect(res.body.success).to.equal(false);
  //         expect(res.body.errors.quantity)
  //           .to.equal('This field is required');
  //         expect(res.status).to.equal(400);
  //         done();
  //       });
  //   });
  // });
});
