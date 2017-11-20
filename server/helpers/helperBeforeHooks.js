import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app';
import models from '../models/';

const { User, Book, Borrow, Category } = models;

const server = supertest.agent(app);

/**
 * @class BeforeHooks
 */
class BeforeHooks {
  /**
   * Basically performed before any test runs
   * @param {void} null
   * @return {object} action
   * @memberof BeforeHooks
   */
  static clearDatabaseTables() {
    before((done) => {
      // Purges Data already in the table after testing
      User.destroy({ where: {} });
      Book.destroy({ where: {} });
      Borrow.destroy({ where: {} });
      Category.destroy({ where: {} });
      setTimeout(done, 5000);
      done();
    });
  }

  /**
   * Basically performed before any test runs
   * @param {void} null
   * @return {object} action
   * @memberof BeforeHooks
   */
  static makeDataAvailable() {
    before((done) => {
      // Purges Data already in the table after testing
      User.destroy({ where: {} });
      Book.destroy({ where: {} });
      Borrow.destroy({ where: {} });
      Category.destroy({ where: {} });
      Book
        .create({
          isbn: '001',
          title: 'Learn Haskell',
          author: 'Haskell Master',
          description: 'Learn and Master Haskell in 16 Months',
          quantity: '30',
          categoryId: 4
        }).then((book) => {
          process.env.bookId = book.id;
        });
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
        .end(() => {
          server
            .post('/api/v1/users/signin')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              identifier: 'ekundayo',
              password: '123456',
            })
            .end((err, res) => {
              process.env.adminToken = res.body.token;
              jwt.verify(process.env.adminToken, 'hello-books',
                (error, decoded) => {
                  process.env.userId = decoded.data.id;
                });
            });
        });
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'bootcamp@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end(() => {
          server
            .post('/api/v1/users/signin')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
              identifier: 'bootcamp',
              password: '123456',
            })
            .end((err, res) => {
              process.env.normalToken = res.body.token;
              jwt.verify(process.env.normalToken, 'hello-books',
                (error, decoded) => {
                  process.env.user2Id = decoded.data.id;
                });
              done();
            });
        });
    });
  }
}

export default BeforeHooks;
