const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      })
      .then((user) => { res.status(201).send({ success: true, message: `Hi ${user.username}, registration successful!` }); })
      .catch((error) => { res.status(400).send(error); });
  },
  retrieve(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          res.send({ success: true, message: 'Authentication failed. User not found' });
        } else if (user) {
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
  },
  list(req, res) {
    return User
      .findAll({}).then((user) => {
        res.send({ user });
      });
  },
};
