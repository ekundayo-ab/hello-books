import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../../app';
import models from '../models/';

const { User, Book, Borrow, Category } = models;
const server = require('supertest');
// const server = supertest.agent(app);

/**
 * @class BeforeHooks
 */
class HelperBeforeHooks {
  /**
   * @description This is executed before the userController test runs
   *
   * @return {null} nothing - Returns nothing
   *
   * @memberof BeforeHooks
   */
  static clearDatabaseTables() {
    before((done) => {
      // Purges Data already in the table after testing
      User.destroy({ where: {} });
      Book.destroy({ where: {} });
      Borrow.destroy({ where: {} });
      Category.destroy({ where: {} });
      User
        .create({
          username: 'ekundayo',
          email: 'ekprogs@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          role: 'admin',
          borrowLimit: 9005,
        });
      setTimeout(done, 5000);
      done();
    });
  }

  /**
   * @description This is executed before the tests in which it is placed runs
   *
   * @return {null} nothing - Returns nothing
   *
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
          Category.create({ id: 4, title: 'Anything' });
          process.env.bookId = book.id;
        });
      Book
        .create({
          isbn: 612,
          title: 'Theory of Music',
          author: 'Jazz Fingers',
          description: 'Learn and Master Music basics',
          quantity: 50,
          categoryId: 9
        }).then((book) => {
          Category.create({ id: 9, title: 'Sciences' });
          process.env.book2Id = book.id;
        });
      User
        .create({
          username: 'ekundayo',
          email: 'ekprogs@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          role: 'admin',
          borrowLimit: 9005,
        }).then(() => {
          server(app)
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
      server(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'bootcamp@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end(() => {
          server(app)
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

export default HelperBeforeHooks;
