import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models/';

// Makes User model available globally in this file
const User = models.User;
// Makes Book model available globally in this file
const Book = models.Book;
// Makes Borrow model available globally in this file
const Borrow = models.Borrow;
// Provides interface to ascertain expected results are true
const expect = chai.expect;

const server = supertest.agent(app);
let loggedInToken; // Token for an Admin User
describe('Middleware', () => {
  after((done) => {
    // Purges Data already in the table after testing
    User.destroy({ where: {} });
    // Purges Data already in the table after testing
    Book.destroy({ where: {} });
    // Purges Data already in the table after testing
    Borrow.destroy({ where: {} });

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
      });

    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        password: '123456',
      });

    done();
  });
  describe('An Authentication middleware', () => {
    it('should prevent access to authenticated route without token', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect(200)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
    it('should prevent access to authenticated route with tampered token',
      (done) => {
        server
          .get('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', `${loggedInToken}giberrish`)
          .expect(200)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.message).to.equal('Failed to authenticate token');
            done();
          });
      });
  });
});
