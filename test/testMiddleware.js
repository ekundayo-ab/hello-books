import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import models from '../server/models/';

const User = models.User; // Makes User model available globally in this file
const Book = models.Book; // Makes Book model available globally in this file
const expect = chai.expect; // Provides interface to ascertain expected results are true

const server = supertest.agent(app);
let loggedInToken; // Token for an Admin User

User.destroy({ where: {} }); // Purges Data already in the table before testing
Book.destroy({ where: {} });

beforeEach(() => {
  server
    .post('/api/v1/users/signup')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      username: 'ekundayo',
      email: 'ekprogs@gmail.com',
      password: '123456',
      role: 'admin',
    });
  server
    .post('/api/v1/users/signup')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      username: 'bootcamp',
      email: 'bootcamp@gmail.com',
      password: '123456',
      role: 'admin',
    });
});

describe('An Authentication middleware', () => {
  beforeEach((done) => {
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
        done();
      });
  });
  it('should prevent access to authenticated route without token', (done) => {
    server
      .get('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('Unauthenticated, token not found');
        done();
      });
  });
  it('should prevent access to authenticated route with tampered token', (done) => {
    server
      .get('/api/v1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', `${loggedInToken}giberrish`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('Failed to authenticate token.');
        done();
      });
  });
});
