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
}

export default BorrowController;
