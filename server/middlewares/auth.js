import jwt from 'jsonwebtoken';
/**
 * @class Authenticate
 * @description Authenticates requests
 */
class Authenticate {
  /**
   * @description Checks and authenticates JWT Token
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back from controller
   * @param {object} next - The next action
   * @returns {next} //verifies and allows route continue to endpoint
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
      res.status(401).send({
        success: false,
        message: 'Unauthenticated, token not found' });
    }
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(400).send({
            success: false,
            message: 'Failed to authenticate token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Looking for? Not Found!' });
    }
  }

  /**
   * @description Returns user data in token
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} // Sends decoded data
   * @memberof Authenticate
   */
  static verifyToken(req, res) {
    if (req.decoded) {
      return res.status(200).send({ decoded: req.decoded.data });
    }
    return res.status(500).send({ failure: 'Internal Server Error' });
  }
}

export default Authenticate;
