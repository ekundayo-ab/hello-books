import model from '../models';
import Helper from '../helpers';

const Book = model.Book;
// const User = model.User;
const Borrow = model.Borrow;
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
    return Borrow
      .findOrCreate({
        where: {
          userId: req.params.userId,
          bookId: req.body.bookId,
          returned: false,
        },
        defaults: {
          returned: false,
          userId: req.params.userId,
          bookId: req.body.bookId,
          dueDate: Helper.addDays(3),
          actualReturnDate: Date.now(),
        },
      })
      .spread((borrow, created) => {
        if (created) {
          return res.status(200).send({ success: 'Book successfully borrowed, enjoy!' });
        }
        return res.status(400).send({ success: 'false', message: 'You have borrowed this book before!' });
      })
      .then(() => {
        res.status(200).send({ success: true, message: 'Book successfully borrowed' });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }

  static returnBook(req, res) {
    return Borrow
      .findOne({
        where: {
          id: req.body.bookId,
        },
      })
      .then((borrow) => {
        return borrow
          .update({
            returned: true,
            actualReturnDate: Date.now(),
          })
          .then(() => {
            Helper.addReturnedBook(Book, req.body.bookId, req, res);
            res.status(200).send({ success: true, message: 'Book successfully returned' });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
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
