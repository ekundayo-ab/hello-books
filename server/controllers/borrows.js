import { User, Book, Borrow } from '../models';
import Helper from '../helpers';

/**
 * 
 */
class BorrowController {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    return User
      .find({
        where: {
          id: req.params.userId,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(403).send({ success: false, message: 'Forbidden, not allowed!' });
        }
        return Borrow
          .create({
            quantity: req.body.quantity,
            returned: 0,
            userId: user.id,
            bookId: req.body.bookId,
          })
          .then(() => {
            Helper.findBook(Book, req.body.bookId, req, res);
          })
          .catch(() => { res.status(404).send({ success: false, message: 'Book not found' }); });
      })
      .catch((error) => { res.status(404).send(error); });
  }

  static returnBook(req, res) {
    return Borrow
      .update({
        returned: true,
      }, {
        where: {
          id: req.body.bookId,
          userId: req.decoded.data.id,
        },
      })
      .then((book) => {
        if (!book) {
          res.send.status(404).send({ success: false, message: 'Book not found' });
        }
        res.status(201).send({ success: true, message: 'Book, returned but would be verified by admin' });
      })
      .catch((error) => { res.status(404).send(error); });
  }

  static listNotReturned(req, res) {
    return Borrow
      .findAll({
        where: {
          userId: req.decoded.data.id,
          returned: false,
        },
        include: [
          { model: Book, as: 'book', required: true },
        ],
      })
      .then((borrow) => {
        const p = [];
        for (let i = 0; i < borrow.length; i += 1) {
          p[i] = borrow[i].book;
        }
        res.status(200).send(p);
      })
      .catch((error) => { res.send(error.toString()); });
  }
}

export default BorrowController;
