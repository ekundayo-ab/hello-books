import jwt from 'jsonwebtoken';

/**
 *
 */
class Authenticate {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static authenticate(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      res.status(401).send({ success: false, message: 'Unauthenticated, token not found' });
    }
    if (token) {
      jwt.verify(token, 'hello-books', (err, decoded) => {
        if (err) {
          res.send({ success: 'false', message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(404).send({ success: false, message: 'Looking for? Not Found!' });
    }
  }
}

export default Authenticate;
