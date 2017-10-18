import supertest from 'supertest';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../app';
import models from '../models/';

const User = models.User; // Makes User model available globally in this file
const Book = models.Book; // Makes Book model available globally in this file
const Borrow = models.Borrow; // Makes Borrow model available globally in this file
const expect = chai.expect; // Provides interface to ascertain expected results are true

const server = supertest.agent(app);
let adminToken; // Token for an Admin User
let normalToken; // Token for a Normal User
let userId;
let user2Id;
let bookId;
describe('API Operations', () => {
  before((done) => {
    User.destroy({ where: {} }); // Purges Data already in the table after testing
    Book.destroy({ where: {} }); // Purges Data already in the table after testing
    Borrow.destroy({ where: {} }); // Purges Data already in the table after testing
    Book
      .create({
        isbn: '001',
        title: 'Learn Haskell',
        author: 'Haskell Master',
        description: 'Learn and Master Haskell in 16 Months',
        quantity: '30',
      }).then((book) => {
        bookId = book.id;
      });
    done();
  });

  describe('A typical User registration', () => {
    it('should allow admin user to be seeded', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'ekundayo',
          email: 'ekprogs@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
          role: 'admin',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Hi ekundayo, registration successful!');
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should allow normal user to register', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'bootcamp@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Hi bootcamp, registration successful!');
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should ensure all signup fields are required', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          usename: 'ekundayo',
          mail: 'ekprogs@gmail.com',
          pasword: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Check your username, email or password and try again!');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should ensure all signup fields are defined', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          usename: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Check your username, email or password and try again!');
          done();
        });
    });

    it('should ensure valid email is entered', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'testuser',
          email: 'testuser',
          password: 'testuser',
          passwordConfirmation: 'testuser',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Invalid email address, try again');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should ensure email is unique', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'spartan',
          email: 'bootcamp@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User with that email exists');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should ensure username is unique', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'spartan@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Username already taken');
          expect(res.status).to.equal(409);
          done();
        });
    });
  });

  describe('A typical User Logging In', () => {
    it('should ensure all fields exists', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          idenfir: 'ekundayo',
          email: 'ekprogs@gmail.com',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Bad request!, Check your username or email.');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should require all fields', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identfier: 'ekundayo',
          email: 'ekprogs@gmail.com',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Bad request!, Check your username or email.');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should sign in and assign token to normal user', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'bootcamp',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Hi bootcamp, you are logged in');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          normalToken = res.body.token;
          done();
        });
    });
    it('should sign in and assign token to admin user', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayo',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Hi ekundayo, you are logged in');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          adminToken = res.body.token;
          done();
        });
    });
    it('should disallow wrong password sign in', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayo',
          password: 'wrongpass',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Authentication failed. Wrong password');
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should disallow unregistered user sign in', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayoguy',
          password: 'dayo',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Authentication failed. User not found');
          expect(res.status).to.equal(404);
          done();
        });
    });
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
          expect(res.body.errors.description).to.equal('This field is required');
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
    it('should allow authenticated users to view all books', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

  describe('Upon borrowing of books', () => {
    before((done) => {
      jwt.verify(adminToken, 'hello-books', (error, decoded) => {
        userId = decoded.data.id;
      });
      done();
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
          expect(res.body.success).to.equal(true);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Learn Haskell succesfully borrowed');
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
    it('should notify if book was borrowed but not returned by same user', (done) => {
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
  });

  describe('Upon listing of books not returned', () => {
    before((done) => {
      jwt.verify(adminToken, 'hello-books', (error, decoded) => {
        userId = decoded.data.id;
      });
      jwt.verify(normalToken, 'hello-books', (error, decoded) => {
        user2Id = decoded.data.id;
      });
      done();
    });
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
    it('should list all books borrowed but not returned by authenticated user', (done) => {
      server
        .get(`/api/v1/users/${userId}/books?returned=false`)
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
        .get(`/api/v1/users/${user2Id}/books?returned=false`)
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
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Learn Haskell succesfully returned but pending review by Administrator');
          done();
        });
    });
    it('should notify if user does not exist', (done) => {
      server
        .put(`/api/v1/users/${userId}1/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          bookId,
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
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('You have not borrowed this book');
          expect(res.status).to.equal(404);
          done();
        });
    });
    // it('should notify if book has been returned', (done) => {
    //   server
    //     .put(`/api/v1/users/${userId}/books`)
    //     .set('Accept', 'application/x-www-form-urlencoded')
    //     .set('x-access-token', adminToken)
    //     .send({
    //       bookId,
    //     })
    //     .end((err, res) => {
    //       expect(res.body.success).to.equal(false);
    //       expect(res.body.message).to.equal('Book returned already');
    //       expect(res.status).to.equal(409);
    //       done();
    //     });
    // });
  });

  describe('Upon modification of books', () => {
    before((done) => {
      jwt.verify(adminToken, 'hello-books', (error, decoded) => {
        userId = decoded.data.id;
      });
      done();
    });

    it('should ensure only admin user can modify books', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
          quantity: '30',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Permission Denied');
          done();
        });
    });
    it('should ensure only authenticated admin user can modify books', (done) => {
      server
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', `${adminToken}giberrish`)
        .send({
          isbn: '001',
          title: 'Learn Haskell New Edition',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
          quantity: 30,
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Learn Haskell successfully updated to Learn Haskell New Edition');
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
          expect(res.body.errors.description).to.equal('This field is required');
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
          description: 'Learn and Master Haskell in 16 Months Updated with more projects and examples',
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
    it('should ensure only authenticated user can view all books', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
    it('should ensure only authenticated user can view all books', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
    it('should disallow unauthenticated user from viewing all books', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
    it('should disallow user with altered token from viewing all books', (done) => {
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
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Book not found');
          done();
        });
    });
  });
});
