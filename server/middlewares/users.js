const jwt = require('jsonwebtoken');

module.exports = {
  authenticate(req, res, next) {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
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
      res.status(403).send({ success: false, message: 'No token provided' });
    }
  },
};
