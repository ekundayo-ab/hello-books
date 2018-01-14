import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from './../models';

const { User } = model;

/**
 * @class Authenticate
 *
 * @description Authenticates requests
 */
class AuthMiddleware {
  /**
   * @description Checks and authenticates JWT Token
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   * @param {object} next - The next action
   *
   * @returns {next} - verifies and allows route continue to endpoint
   */
  static authenticate(req, res, next) {
    const token = req.url === '/api/v1/verify-token' ?
      req.body.token : req.headers['x-access-token'];
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401)
            .send({ message: 'Failed to authenticate token' });
        }
        req.decoded = decoded;
        return next();
      });
    }
    return res.status(401)
      .send({ message: 'Unauthenticated, token not found' });
  }

  /**
   * @static
   *
   * @description Returns user data in token
   *
   * @param {object} req - The request payload sent from the route
   * @param {object} res - The response payload sent to the controller
   *
   * @returns {object} - Sends decoded data
   *
   * @memberof AuthMiddleware
   */
  static verifyToken(req, res) {
    return User.findOne({
      where: { id: req.decoded.data.id },
      attributes: [
        'id',
        'username',
        'role',
        'level',
        'borrowLimit',
        'totalBorrow'
      ]
    })
      .then(user =>
        res.status(200).send({ decoded: req.decoded.data, user }))
      .catch(() =>
        res.status(500).send({ message: 'Internal Server Error' }));
  }

  /**
   * @static
   *
   * @description Checks if a user exists and return the user or
   * return a message if not
   * @param {object} req - The request payload sent from the route
   * @param {object} res - The response payload sent to the controller
   * @param {object} next - The next action
   *
   * @returns {object} foundUser - Ensure a user exists
   *
   * @memberof AuthMiddleware
   */
  static checkUser(req, res, next) {
    let query;
    // Set query and validate conditionally based on request
    query = req.url === '/users/signin' ?
      { $or: { email: req.body.identifier, username: req.body.identifier } } :
      { $or: { email: req.body.email, username: req.body.username } };

    if (req.query.loan === 'borrowOrReturn') query = { id: req.params.userId };
    if (req.url === '/users/pass') query = { id: req.decoded.data.id };
    return User
      .findOne({ where: { ...query } })
      .then((foundUser) => {
        const isGuestRoute = (req.url === '/auth/google'
          || req.url === '/users');
        if (isGuestRoute && !foundUser) {
          return next();
        }
        if (req.query.loan === 'borrowOrReturn') {
          const message = 'You are not authorized to perform this action';
          if (!foundUser) return res.status(401).send({ message });
          res.locals.borrowStatus = foundUser.borrowLimit < 1;
          return next();
        }
        if (!foundUser) {
          const message = req.url === '/users/signin' ?
            'Authentication failed, Wrong password or email' : 'User not found';
          return res.status(401).send({ message });
        }
        req.foundUser = foundUser;
        return next();
      })
      .catch(err => res.status(500).send({ message: err }));
  }

  /**
   * @static
   *
   * @description Compares password supplied to one existing in the database
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The request payload sent to the route
   * @param {object} next - The next action
   *
   * @returns {object} checkSuccess and or message
   *
   * @memberOf AuthMiddleware
   */
  static checkPassword(req, res, next) {
    if (req.url === '/users/signin' && !req.foundUser) {
      return res.status(401)
        .send({ message: 'Authentication failed, Wrong password or email' });
    }
    if (!bcrypt.compareSync(req.body.password || req.body.oldPass,
      req.foundUser.password)) {
      const message = `Authentication failed, ${req.url === '/users/pass' ?
        'Old password incorrect' : 'check password or email'}`;
      return res.status(401).send({ message });
    }
    return next();
  }

  /**
   * @static
   *
   * @description Checks if a user has administrative rights
   *
   * @param {object} req - The request payload sent from the route
   * @param {object} res - The response payload sent to the controller
   * @param {object} next - The next action
   *
   * @returns {object} - Sends response or allow route request to continue
   *
   * @memberof AuthMiddleware
   */
  static hasAdminRights(req, res, next) {
    // Ensure user has administrative priviledges to perform certain operations
    if (req.decoded.data.role !== 'admin') {
      return res.status(403).send({ message: 'Permission Denied' });
    }
    return next();
  }
}

export default AuthMiddleware;
