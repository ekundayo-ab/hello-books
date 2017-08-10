import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import models from '../server/models/';

const User = models.User;
const Book = models.Book;
const expect = chai.expect;

const server = supertest.agent(app);
let loggedInToken;
let normalToken;


User.destroy({ where: {} });
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
        expect(res.body.message).to.equal('Bad request data, enter valid inputs or valid key-value pairs.');
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
        expect(res.body.message).to.equal('Bad request data, enter valid inputs or valid key-value pairs.');
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
        expect(res.body.message).to.equal('Bad request data, enter valid inputs or valid key-value pairs.');
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
  it('should prevent non admin user from creating books', (done) => {
    server
      .post('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', normalToken)
      .send({
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
});
