import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';
import Helper from '../helpers/index';

const User = models.User;

/**
 *
 *
 * @class UserController
 */
class UserController {
  /**
   *
   * @static
   * @description Signs up a user
   * @param {any} req
   * @param {any} res
   * @returns registered user and success: true message
   *
   * @memberOf UserController
   */
  static signup(req, res) {
    // Validates and ensure expected inputs are gotten
    if (req.body.password === undefined || req.body.username === undefined
      || req.body.email === undefined) {
      return res.status(400).send({ success: false, message: 'Check your username, email or password and try again!' });
    }

    if (!Helper.validateEmail(req.body.email)) {
      return res.status(400).send({ success: false, message: 'Invalid email address, try again' });
    }
    return User
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((foundEmail) => {
        if (foundEmail) {
          return res.status(409).send({ success: false, message: 'User with that email exists' });
        }
        return User.findOne({
          where: {
            username: req.body.username,
          },
        }).then((foundUsername) => {
          if (foundUsername) {
            return res.status(409).send({ success: false, message: 'Username already taken' });
          }
          return User
            .create({
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              role: req.body.role,
            })
            .then((user) => { res.status(201).send({ success: true, message: `Hi ${user.username}, registration successful!` }); })
            .catch((error) => { res.status(409).send(error.message); });
        });
      });
  }
  /**
   *
   * @static
   * @description Signs In in a User
   * @param {any} req
   * @param {any} res
   * @returns token and success: true message
   *
   * @memberOf UserController
   */
  static signin(req, res) {
    // Ensures expected inputs are gotten
    if (!req.body.password || !req.body.username) {
      return res.status(400).send({ success: false, message: 'Bad request!, Check your username or email.' });
    }
    // Queries the database if user exists with supplied credentials
    return User
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((user) => {
        // If User does not exist, output User not found.
        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found' });
        } else if (user) {
          /**
           * if User exists, compares supplied credentials
           * with one found in the database,
           * Authentication fails if no match. But, if all goes well
           * User is signed in with a json web token
           * consisting of User's data and the phrase "hello-books"
           */
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.send({ success: false, message: 'Authentication failed. Wrong password' });
          } else {
            const token = jwt.sign({
              data: user,
            }, 'hello-books', { expiresIn: 60 * 60 });
            res.json({ success: true, message: `Hi ${user.username}, you are logged in`, token });
          }
        }
      })
      .catch((error) => { res.status(404).send(error); });
  }
  /**
   *
   * @static
   * @description Lists all users
   * @param {any} req
   * @param {any} res
   * @returns users list
   *
   * @memberOf UserController
   */
  static list(req, res) {
    if (req.decoded.data.role !== 'admin') {
      res.status(403).send({ success: false, message: 'You are not allowed to view all users' });
    }
    // Get all users.
    return User
      .findAll({
        order: [
          ['createdAt', 'ASC'],
        ],
      }).then((user) => {
        res.send({ user });
      });
  }
}

export default UserController;
