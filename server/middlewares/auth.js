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
    let token;
    // check header or url parameters or post parameters for token
    if (req.body.token) {
      token = req.body.token;
    } else {
      token = req.query.token || req.headers['x-access-token'];
    }
    if (!token) {
      res.status(401).send({ success: false, message: 'Unauthenticated, token not found' });
    }
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(400).send({ success: false, message: 'Failed to authenticate token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(404).send({ success: false, message: 'Looking for? Not Found!' });
    }
  }

  static verifyToken(req, res) {
    if (req.decoded) {
      return res.status(200).send({ decoded: req.decoded.data });
    }
    return res.status(500).send({ failure: 'Internal Server Error' });
  }
}

export default Authenticate;
