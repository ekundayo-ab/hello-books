import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import models from '../models/';

const User = models.User;
const Book = models.Book;
const Borrow = models.Borrow;
const expect = chai.expect;

const server = supertest.agent(app);
let loggedInToken;

describe('Middleware', () => {
  after((done) => {
    User.destroy({ where: {} });
    Book.destroy({ where: {} });
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
  describe('AuthMiddleware', () => {
    it('should return error message if no token exists', (done) => {
      server
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          done();
        });
    });
    it('should return error message if token is altered',
      (done) => {
        server
          .get('/api/v1/books')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', `${loggedInToken}giberrish`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.message).to.equal('Failed to authenticate token');
            done();
          });
      });
  });
});
