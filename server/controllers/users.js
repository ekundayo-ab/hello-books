import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

class UserController {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      })
      .then((user) => { res.status(201).send({ success: true, message: `Hi ${user.username}, registration successful!` }); })
      .catch((error) => { res.status(400).send(error); });
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static retrieve(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          res.send({ success: false, message: 'Authentication failed. User not found' });
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
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static list(req, res) {
    if (req.decoded.data.role !== 2) {
      res.status(403).send({ success: false, message: 'You are not allowed to view all users' });
    }
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
