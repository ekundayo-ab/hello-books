import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models';
import Helper from '../helpers/Helper';

const { autoUpgradeJudge } = Helper;

/**
 * @class UserController
 *
 * @description Library users operations
 */
class UserController {
  /**
   * @static
   *
   * @description Signs up a user
   *
   * @param {object} req - The request payload sent to the controller
   * @param {object} res - The request payload sent from the contorller
   *
   * @returns {object} - registered user and message
   *
   * @memberOf UserController
   */
  static signup(req, res) {
    const { password, username, email, role } = req.body;
    return User
      .create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        role
      })
      .then((user) => {
        res.status(201).send({
          message: `Hi ${user.username}, registration successful!`,
          user
        });
      })
      .catch((err) => {
        const { message } = err;
        const error = err.name === 'SequelizeUniqueConstraintError' ?
          { statusCode: 409, message } :
          { statusCode: 500, message };
        return res.status(error.statusCode)
          .send({ message: error.message });
      });
  }

  /**
   * @static
   *
   * @description Registers and Logs In a user with their google credentials
   *
   * @param {object} req - The request payload sent to the controller
   * @param {object} res - The request payload sent from the contorller
   *
   * @returns {object} - Message, token
   *
   * @memberof UserController
   */
  static googleAuth(req, res) {
    const { username, email, password, role } = req.body;
    return User
      .create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      })
      .then((user) => {
        const token = jwt.sign({
          data: { id: user.id, role: user.role, username: user.username },
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
        return res.status(201).send({
          message: `Hi ${username}, registration successful!`,
          token,
        });
      }).catch(() => {
        res.status(500).send({ message: 'Internal server error' });
      });
  }

  /**
   * @static
   *
   * @description Changes a user password if old password supplied is correct
   *
   * @param {object} req - The request payload sent to the controller
   * @param {object} res - The request payload sent from the contorller
   *
   * @returns {object} - Message
   *
   * @memberof UserController
   */
  static changePassword(req, res) {
    const { newPass, userId } = req.body;
    return User
      .update({
        password: bcrypt.hashSync(newPass, 10),
      }, {
        where: {
          id: process.env.TRIGGER_ENV
            ? userId : req.decoded.data.id
        }
      }).then((user) => {
        if (user[0] === 0) {
          return res.status(404)
            .send({ message: 'Password change failed, try again' });
        }
        return res.status(200)
          .send({ message: 'Password successfully changed' });
      }).catch(() =>
        res.status(500).send({ message: 'Internal Server Error' }));
  }

  /**
   * @static
   *
   * @description Automatically upgrades a user level based
   * on amount of books borrowed
   *
   * @param {object} req - The request payload sent to the controller
   * @param {object} res - The request payload sent from the contorller
   *
   * @returns {object} - Message
   *
   * @memberof UserController
   */
  static autoUpgrade(req, res) {
    return User.findById(req.decoded.data.id)
      .then((user) => {
        const { totalBorrow } = user;
        if (totalBorrow !== 10 && totalBorrow !== 20 && totalBorrow !== 30) {
          return res.status(200).send({ message: 'Not eligible' });
        }
        const { upgradeToken } = autoUpgradeJudge(user);
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
              message: 'You\'ve been upgraded to ' +
              `${userUpdated[1].dataValues.level}`,
              user: userUpdated[1]
            })).catch(() => {
            res.status(500).send({ message: 'Internal Server Error' });
          });
        }
        return res.status(200).send({ message: 'Not eligible' });
      }).catch(() => res.status(500)
        .send({ message: 'Internal Server Error' }));
  }
}

export default UserController;
