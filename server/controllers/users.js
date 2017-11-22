import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models';
import Helper from '../helpers/index';

const User = models.User;

/**
 * @class UserController
 * @description Library users operations
 */
class UserController {
  /**
   * @static
   * @description Signs up a user
   * @param {any} req
   * @param {any} res
   * @returns {object} registered user and success: true message
   * @memberOf UserController
   */
  static signup(req, res) {
    // Validates and ensure expected inputs are gotten
    if (req.body.password === undefined || req.body.username === undefined
      || req.body.email === undefined) {
      return res.status(400).send({
        success: false,
        message: 'Check your username, email or password and try again!'
      });
    }

    // Error(s) is/are outputted if any is pushed to the array
    const { isValid, errors } = Helper.userValidation(req);
    if (!isValid) return res.status(400).send({ success: false, errors });


    if (!Helper.validateEmail(req.body.email)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid email address, try again'
      });
    }

    return User
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((foundEmail) => {
        if (foundEmail) {
          return res.status(409).send({
            success: false,
            message: 'User with that email exists'
          });
        }
        return User.findOne({
          where: {
            username: req.body.username,
          },
        }).then((foundUsername) => {
          if (foundUsername) {
            return res.status(409).send({
              success: false,
              message: 'Username already taken'
            });
          }
          return User
            .create({
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10),
              role: req.body.role,
            })
            .then((user) => {
              res.status(201).send({
                success: true,
                message: `Hi ${user.username}, registration successful!`
              });
            })
            .catch((err) => {
              res.status(500).send({
                success: false,
                message: err.message
              });
            });
        });
      });
  }
  /**
   * @static
   * @description Signs In in a User
   * @param {any} req
   * @param {any} res
   * @returns {object} token and success: true message
   * @memberOf UserController
   */
  static signin(req, res) {
    // Ensures expected inputs are gotten
    if (!req.body.password || !req.body.identifier) {
      return res.status(400).send({
        success: false,
        message: 'Bad request!, Check your username or email.'
      });
    }
    // Queries the database if user exists with supplied credentials
    return User
      .findOne({
        where: {
          $or: {
            username: req.body.identifier,
            email: req.body.identifier,
          },
        },
      })
      .then((user) => {
        // If User does not exist, output User not found.
        if (!user) {
          res.status(404).send({
            success: false,
            message: 'Authentication failed. check password or email'
          });
        } else if (user) {
          /**
           * if User exists, compares supplied credentials
           * with one found in the database,
           * Authentication fails if no match. But, if all goes well
           * User is signed in with a json web token
           * consisting of User's data and the phrase "hello-books"
           */
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send({
              success: false,
              message: 'Authentication failed. check password or email'
            });
          } else {
            const token = jwt.sign({
              data: { id: user.id, role: user.role, username: user.username },
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
            res.json({
              success: true,
              message: `Hi ${user.username}, you are logged in`,
              token,
              user
            });
          }
        }
      })
      .catch(() => {
        res.status(500).send({
          success: false,
          message: 'Internal Server Error'
        });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} //Success, Message
   * @memberof UserController
   */
  static findUser(req, res) {
    // Get all users.
    return User
      .findOne({
        where: {
          $or: {
            username: req.body.username,
            email: req.body.email,
          },
        },
      })
      .then((user) => {
        if (user) {
          return res.status(200).send(user);
        }
        return res.status(200).send({
          success: true,
          message: 'Username available'
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message
        });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} // Success, Message token
   * @memberof UserController
   */
  static googleAuth(req, res) {
    // Error(s) is/are outputted if any is pushed to the array
    const { isValid, errors } = Helper.userValidation(req);
    if (!isValid) return res.status(400).send({ success: false, errors });
    return User
      .findOne({
        where: {
          $or: {
            email: req.body.email,
            username: req.body.username,
          },
        },
      })
      .then((foundUser) => {
        if (foundUser) {
          const token = jwt.sign({
            data: { id: foundUser.id,
              role: foundUser.role,
              username: foundUser.username },
          }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
          return res.status(200).send({
            success: true,
            message: `Hi ${foundUser.username}, you are logged in`,
            token,
          });
        }
        return User
          .create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            role: req.body.role,
          })
          .then((user) => {
            const token = jwt.sign({
              data: { id: user.id, role: user.role, username: user.username },
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
            return res.status(201).send({
              success: true,
              message: `Hi ${user.username}, registration successful!`,
              token,
            });
          });
      })
      .catch(() => {
        res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} // Success, Message
   * @memberof UserController
   */
  static changePassword(req, res) {
    const { isValid, errors } = Helper.validatePassForm(req.body);
    if (!isValid) return res.status(400).send({ success: false, errors });
    return User.findOne({
      where: {
        id: process.env.TRIGGER_ENV
          ? req.body.userId : req.decoded.data.id
      }
    }).then((user) => {
      // If User does not exist, output User not found.
      if (!user) {
        res.status(404).send({
          success: false,
          message: 'Password change failed, try again'
        });
      } else if (user) {
        /**
         * if User exists, compares supplied credentials
         * with one found in the database,
         * Authentication fails if no match. But, if all goes well
         * User password is updated
         */
        if (!bcrypt.compareSync(req.body.oldPass, user.password)) {
          return res.status(401).send({
            success: false,
            message: 'Authentication failed, old password incorrect'
          });
        }

        return User
          .update({
            password: bcrypt.hashSync(req.body.newPass, 10),
          }, {
            where: {
              id: req.decoded.data.id
            }
          }).then(() => {
            res.status(200).send({
              success: false,
              message: 'Password successfully changed'
            });
          }).catch(() => {
            res.status(500).send({
              success: false,
              message: 'Internal Server Error'
            });
          });
      }
    });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} // Success, Message
   * @memberof UserController
   */
  static autoUpgrade(req, res) {
    return User.findById(req.decoded.data.id)
      .then((user) => {
        const upgradeToken = {
          levelName: user.level,
          credit: 0,
        };
        if (user.totalBorrow !== 10
          && user.totalBorrow !== 20 && user.totalBorrow !== 30) {
          return res.status(200).send({
            success: false,
            message: 'Not eligible'
          });
        }
        if (user.level === 'bronze' && user.totalBorrow === 10) {
          upgradeToken.levelName = 'silver';
          upgradeToken.credit = 1;
        }
        if (user.level === 'silver' && user.totalBorrow === 20) {
          upgradeToken.levelName = 'gold';
          upgradeToken.credit = 2;
        }
        if (user.level === 'gold' && user.totalBorrow === 30) {
          upgradeToken.levelName = 'unlimited';
          upgradeToken.credit = 9000;
        }
        if (upgradeToken.credit > 0) {
          return User.update({
            level: upgradeToken.levelName,
            borrowLimit: user.borrowLimit + upgradeToken.credit
          }, {
            where: {
              id: req.decoded.data.id
            },
            returning: true,
            plain: true
          }).then(userUpdated =>
            res.status(200).send({
              success: true,
              message: 'You\'ve been upgraded to ' +
              `${userUpdated[1].dataValues.level}`,
              user: userUpdated[1]
            })).catch((err) => {
            res.status(500).send({
              success: false,
              message: err.message,
            });
          });
        }
        return res.status(200).send({
          success: false,
          message: 'Not eligible'
        });
      });
  }
}

export default UserController;
