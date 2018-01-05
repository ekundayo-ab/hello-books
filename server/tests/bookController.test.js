import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import HelperBeforeHooks from './../helpers/HelperBeforeHooks';


const server = supertest.agent(app);
let adminToken;
let normalToken;
let bookId;
let book2Id;
describe('Library book(s)', () => {
  HelperBeforeHooks.makeDataAvailable();
  beforeEach((done) => {
    ({ adminToken, normalToken, bookId, book2Id } = process.env);
    done();
  });
  describe('Books Addition route', () => {
    it('should return book with success message if it was successfully created',
      (done) => {
        server
          .post('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            isbn: 20234,
            title: 'Learn JAVA',
            author: 'Java Master',
            description: 'Learn & Master Java in 28 days',
            category: 1,
            quantity: 30,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Learn JAVA, successfully added');
            expect(res.body.book.isbn).to.equal(20234);
            expect(res.body.book.title).to.equal('Learn JAVA');
            expect(res.body.book.author).to.equal('Java Master');
            expect(res.body.book.quantity).to.equal(30);
            expect(res.body.book.categoryId).to.equal(1);
            expect(res.body.book.description)
              .to.equal('Learn & Master Java in 28 days');
            expect(res.body.book.isbn).to.equal(20234);
            expect(res.body.book.isbn).to.be.a('number');
            expect(res.body.book.quantity).to.be.a('number');
            expect(res.body.book.categoryId).to.be.a('number');
            done();
          });
      });
    it('should return error message if same book is being added again',
      (done) => {
        server
          .post('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            isbn: 20234,
            title: 'Learn JAVA',
            author: 'Java Master',
            description: 'Learn & Master Java in 28 days',
            category: 1,
            quantity: 30,
          })
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message)
              .to.equal('Conflict! Learn JAVA exists already');
            done();
          });
      });
    it('should return error message if inputed field(s) are undefined',
      (done) => {
        server
          .post('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            isbn: 20238,
            title: 'Learn JAVA',
            author: 'Java Master',
            description: 'Learn & Master Java in 28 days',
            quantity: 9,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('All required fields must exist');
            done();
          });
      });
    it('should return error message if inputted fields are empty', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: ' ',
          title: ' ',
          author: ' ',
          description: ' ',
          category: ' ',
          quantity: ' ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message.isbn).to.equal('This field is required');
          expect(res.body.message.title).to.equal('This field is required');
          expect(res.body.message.author).to.equal('This field is required');
          expect(res.body.message.description)
            .to.equal('This field is required');
          expect(res.body.message.category).to.equal('This field is required');
          expect(res.body.message.quantity).to.equal('This field is required');
          done();
        });
    });
    it('should return error message when accessed by a non admin user',
      (done) => {
        server
          .post('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', normalToken)
          .send({
            isbn: 839483,
            title: 'Learn SQL',
            author: 'SQL Master',
            description: 'Learn & Master SQL in 48hours',
            category: 9,
            quantity: 39,
          })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to.equal('Permission Denied');
            done();
          });
      });
  });

  describe('Book Update route', () => {
    it(`should return modified book and success message if book
    was successfully updated`,
      (done) => {
        server
          .put(`/api/v1/books/${bookId}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            isbn: 1,
            title: 'Learn Haskell New Edition',
            author: 'Haskell Master',
            description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
            category: 6,
            quantity: 30,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message)
              .to.equal('Learn Haskell successfully updated to Learn Haskell New Edition');
            expect(res.body.newBook.description)
              .to.equal('Learn and Master Haskell in 16 Months Updated with more projects and examples');
            expect(res.body.newBook.isbn).to.equal(1);
            expect(res.body.newBook.title)
              .to.equal('Learn Haskell New Edition');
            expect(res.body.newBook.author).to.equal('Haskell Master');
            expect(res.body.newBook.quantity).to.equal(30);
            expect(res.body.newBook.categoryId).to.equal(6);
            done();
          });
      });
    it('should return error message if book is not found', (done) => {
      server
        .put('/api/v1/books/345')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: `Learn and Master Haskell in 16 Months Updated with more
          projects and examples`,
          category: 4,
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Book not found');
          done();
        });
    });
    it('should return error message if input fields are undefined or null',
      (done) => {
        server
          .put(`/api/v1/books/${bookId}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            isbn: '001',
            title: 'Learn Haskell New Edition',
            author: 'Haskell Master',
            description: `Learn and Master Haskell in 16 Months Updated with
            more projects and examples`,
            quantity: 90,
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('All required fields must exist');
            done();
          });
      });
    it('should return error message if input field(s) are empty', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          isbn: ' ',
          title: ' ',
          author: ' ',
          description: ' ',
          category: ' ',
          quantity: ' ',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message.isbn).to.equal('This field is required');
          expect(res.body.message.title).to.equal('This field is required');
          expect(res.body.message.author).to.equal('This field is required');
          expect(res.body.message.description)
            .to.equal('This field is required');
          expect(res.body.message.category).to.equal('This field is required');
          expect(res.body.message.quantity).to.equal('This field is required');
          done();
        });
    });
  });

  describe('Books listing route', () => {
    it('should return all books when accessed by an authenticated user',
      (done) => {
        server
          .get('/api/v1/books?page=1')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.numberOfPages).to.equal(1);
            expect(res.body.books).to.have.lengthOf(3);
            expect(res.body.books).to.be.a('array');
            expect(res.body.books[0].title)
              .to.equal('Learn Haskell New Edition');
            expect(res.body.books[0].author).to.equal('Haskell Master');
            expect(res.body.books[0].description)
              .to.equal('Learn and Master Haskell in 16 Months Updated with more projects and examples');
            expect(res.body.books[0].quantity).to.equal(30);
            expect(res.body.books[0].categoryId).to.equal(6);
            expect(res.body.books[1].title)
              .to.equal('Learn JAVA');
            expect(res.body.books[1].author).to.equal('Java Master');
            expect(res.body.books[1].description)
              .to.equal('Learn & Master Java in 28 days');
            expect(res.body.books[1].quantity).to.equal(30);
            expect(res.body.books[1].categoryId).to.equal(1);
            done();
          });
      });
    it('should return (no-content) message if no book(s) exists in the library',
      (done) => {
        server
          .get(`/api/v1/books?page=${8986521345}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(204);
            expect(Object.keys(res.body)).to.have.lengthOf(0);
            done();
          });
      });
    it('should return error message if shelf page does not exist', (done) => {
      server
        .get(`/api/v1/books?page=${8986521345}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(Object.keys(res.body)).to.have.lengthOf(0);
          done();
        });
    });
    it(`should return all books when accessed by a user with normal
    authentication level`,
      (done) => {
        server
          .get('/api/v1/books?page=1')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', normalToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.numberOfPages).to.equal(1);
            expect(res.body.books).to.have.lengthOf(3);
            expect(res.body.books).to.be.a('array');
            expect(res.body.books[0].title)
              .to.equal('Learn Haskell New Edition');
            expect(res.body.books[0].author).to.equal('Haskell Master');
            expect(res.body.books[0].description)
              .to.equal('Learn and Master Haskell in 16 Months Updated with more projects and examples');
            expect(res.body.books[0].quantity).to.equal(30);
            expect(res.body.books[0].categoryId).to.equal(6);
            expect(res.body.books[1].title)
              .to.equal('Learn JAVA');
            expect(res.body.books[1].author).to.equal('Java Master');
            expect(res.body.books[1].description)
              .to.equal('Learn & Master Java in 28 days');
            expect(res.body.books[1].quantity).to.equal(30);
            expect(res.body.books[1].categoryId).to.equal(1);
            done();
          });
      });
    it('should return error message when accessed by an unauthenticated user',
      (done) => {
        server
          .get('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
              .to.equal('Unauthenticated, token not found');
            done();
          });
      });
    it('should return error message when accessed by a user with altered token',
      (done) => {
        server
          .get('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', `${adminToken}gibberish`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Failed to authenticate token');
            done();
          });
      });
  });

  describe('single book request by an authenticated user', () => {
    it('should return specific book if request is successful', (done) => {
      server
        .get(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(parseInt(bookId, 10));
          expect(res.body.title).to.equal('Learn Haskell New Edition');
          expect(res.body.description).to.equal('Learn and Master Haskell in 16 Months Updated with more projects and examples');
          expect(res.body.quantity).to.equal(30);
          expect(res.body.categoryId).to.equal(6);
          done();
        });
    });
    it('should return specific book with category name', (done) => {
      server
        .get(`/api/v1/books/${book2Id}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(parseInt(book2Id, 10));
          expect(res.body.title).to.equal('Theory of Music');
          expect(res.body.description)
            .to.equal('Learn and Master Music basics');
          expect(res.body.quantity).to.equal(50);
          expect(res.body.categoryId).to.equal(9);
          done();
        });
    });
    it('should return error message if book is not found', (done) => {
      server
        .get(`/api/v1/books/${3210}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Book not found');
          done();
        });
    });
    it('should return error message when book ID is invalid', (done) => {
      server
        .get(`/api/v1/books/${undefined}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Ensure book ID is supplied');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
  });

  describe('filtering operations by authenticated user', () => {
    it('should return books matching a category if it successful', (done) => {
      server
        .get(`/api/v1/category/books?page=${1}&categoryId=${1}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.books).to.be.an('array');
          expect(res.body.books).to.have.lengthOf(1);
          expect(res.body.books[0].isbn).to.equal(20234);
          expect(res.body.books[0].title).to.equal('Learn JAVA');
          expect(res.body.books[0].author).to.equal('Java Master');
          expect(res.body.books[0].description)
            .to.equal('Learn & Master Java in 28 days');
          expect(res.body.books[0].quantity).to.equal(30);
          expect(res.body.books[0].categoryId).to.equal(1);
          done();
        });
    });
    it('should return error message if no category ID is supplied', (done) => {
      server
        .get(`/api/v1/category/books?page=${1}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.body.message).to.equal('Category ID is required');
          done();
        });
    });
    it('should return (no-content) message if no book(s) match category',
      (done) => {
        server
          .get(`/api/v1/category/books?page=${1}&categoryId=${3}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', normalToken)
          .end((err, res) => {
            expect(res.status).to.equal(204);
            expect(Object.keys(res.body)).to.have.lengthOf(0);
            done();
          });
      });
  });

  describe('deletion operation by admin user', () => {
    it('should return error message for non admin user', (done) => {
      server
        .delete(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Permission Denied');
          done();
        });
    });
    it('should return success message', (done) => {
      server
        .delete(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Book successfully deleted');
          done();
        });
    });
    it('should return error message if book is not found', (done) => {
      server
        .delete('/api/v1/books/1502')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Book not found');
          done();
        });
    });
    it('should return error message if book ID is undefined', (done) => {
      server
        .delete(`/api/v1/books/${undefined}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Ensure book ID is supplied');
          done();
        });
    });
  });
});
