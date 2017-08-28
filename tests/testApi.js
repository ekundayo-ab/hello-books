import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import models from '../server/models/';

const User = models.User; // Makes User model available globally in this file
const Book = models.Book; // Makes Book model available globally in this file
const Borrow = models.Borrow; // Makes Borrow model available globally in this file
const expect = chai.expect; // Provides interface to ascertain expected results are true

const server = supertest.agent(app);
let adminToken; // Token for an Admin User
let normalToken; // Token for a Normal User

describe('API Operations', () => {
  before((done) => {
    User.destroy({ where: {} }); // Purges Data already in the table after testing
    Book.destroy({ where: {} }); // Purges Data already in the table after testing
    Borrow.destroy({ where: {} }); // Purges Data already in the table after testing
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
          usename: 'ekundayo',
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
          usename: 'ekundayo',
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
          username: 'bootcamp',
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
          username: 'ekundayo',
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
          username: 'ekundayo',
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
          username: 'ekundayoguy',
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

  describe('Upon adding books library', () => {
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
          expect(res.body.message).to.equal('All fields are required.');
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
});
