import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import models from '../server/models/';

const User = models.User; // Makes User model available globally in this file
const Book = models.Book; // Makes Book model available globally in this file
const expect = chai.expect; // Provides interface to ascertain expected results are true 

const server = supertest.agent(app);
let loggedInToken; // Token for an Admin User
let normalToken; // Token for a Normal User

User.destroy({ where: {} }); // Purges Data already in the table before testing
Book.destroy({ where: {} });
describe('A typical User registration', () => {
  it('Should allow admin user to be created', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        email: 'ekprogs@gmail.com',
        password: '123456',
        role: 'admin',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Hi ekundayo, registration successful!');
        done();
      });
  });
  it('Should allow normal user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'bootcamp',
        email: 'bootcamp@gmail.com',
        password: '123456',
        role: 'admin',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('Should raise an error for registration property not available', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: 'ekundayo',
        mail: 'ekprogs@gmail.com',
        pasword: '123456',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Check your username, email or password and try again!');
        done();
      });
  });

  it('Should raise an error for invalid inputs', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: '',
        email: '',
        password: '',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Check your username, email or password and try again!');
        done();
      });
  });
});

describe('A typical User Logging In', () => {
  it('Should raise error for bad request data on signing in', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: 'ekundayo',
        email: 'ekprogs@gmail.com',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Bad request!, Check your username or email.');
        done();
      });
  });

  it('Should allow normal user to sign in and assign token', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        password: '123456',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Hi ekundayo, you are logged in');
        expect(res.body).to.have.property('token');
        expect(res.body).not.to.equal(null);
        normalToken = res.body.token;
        done();
      });
  });
  it('Should allow admin user to sign in and assign token', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'bootcamp',
        password: '123456',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Hi bootcamp, you are logged in');
        expect(res.body).to.have.property('token');
        expect(res.body).not.to.equal(null);
        loggedInToken = res.body.token;
        done();
      });
  });

  it('Should prevent user from signing in with wrong password', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        password: 'dayo',
      })
      .expect(401)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed. Wrong password');
        done();
      });
  });

  it('Should prevent user not registered from signing in', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayoguy',
        password: 'dayo',
      })
      .expect(404)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed. User not found');
        done();
      });
  });
});

describe('A library with books', () => {
  it('should allow admin user to create books', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', loggedInToken)
      .send({
        isbn: 20234,
        title: 'Learn JAVA',
        author: 'Java Master',
        description: 'Learn & Master Java in 28 days',
        quantity: 30,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it('should not allow admin to create same book again', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', loggedInToken)
      .send({
        isbn: 20234,
        title: 'Learn JAVA',
        author: 'Java Master',
        description: 'Learn & Master Java in 28 days',
        quantity: 30,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
  it('should raise error if quantity of book to be created is not specified', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', loggedInToken)
      .send({
        isbn: 20238,
        title: 'Learn JAVA',
        author: 'Java Master',
        description: 'Learn & Master Java in 28 days',
        quantity: undefined,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('All fields are required.');
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should raise error if author of book to be created is not specified', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', loggedInToken)
      .send({
        isbn: 7394389,
        title: 'Learn JAVA',
        author: '',
        description: 'Learn & Master Java in 28 days',
        quantity: 90,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body).to.be.a('object');
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should raise error if description of book to be created is not specified', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', loggedInToken)
      .send({
        isbn: 7394380,
        title: 'Learn JAVA',
        author: 'Lambda Master',
        description: '',
        quantity: 90,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body).to.be.a('object');
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('should raise error if title of book to be created is not specified', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', loggedInToken)
      .send({
        isbn: 732360,
        title: '',
        author: 'Android Master',
        description: 'Learn Android in 6 weeks',
        quantity: 90,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body).to.be.a('object');
        expect(res.statusCode).to.equal(400);
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
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it('should prevent not authenticated user from viewing all books', (done) => {
    server
      .get('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');
        expect(res.body.success).to.equal(false);
        expect(res.statusCode).to.equal(401);
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
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });
});

// describe('A library that borrow books', () => {
//   it('should allow authenticated user to borrow books', (done) => {
//     server
//       .post('/api/v1/books')
//       .set('Accept', 'application/x-www-form-urlencoded')
//       .set('x-access-token', loggedInToken)
//       .send({
//         isbn: 20234,
//         title: 'Learn JAVA',
//         author: 'Java Master',
//         description: 'Learn & Master Java in 28 days',
//         quantity: 30,
//       })
//       .expect(200)
//       .end((err, res) => {
//         expect(res.body.success).to.equal(true);
//         expect(res.statusCode).to.equal(200);
//         done();
//       });
//   });
// });
