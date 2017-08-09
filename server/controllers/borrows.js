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
      .findOne({
        where: {
          userId: req.params.userId,
          bookId: req.body.bookId,
        },
        include: [
          { model: Book, as: 'book', required: true },
        ],
      }).then((foundBorrow) => {
        if (foundBorrow) {
          return res.status(409).send({ success: false, messsage: 'Conflict! Book borrowed already', foundBorrow });
        }
        return Borrow
          .create({
            returned: false,
            userId: req.params.userId,
            bookId: req.body.bookId,
            dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
            actualReturnDate: Date.now(),
          })
          .then(() => {
            Book
              .findOne({
                where: {
                  id: req.body.bookId,
                },
              })
              .then((foundBorrowedBook) => {
                if (!foundBorrowedBook || foundBorrowedBook.quantity === 0) {
                  return res.status(404).send({ success: false, message: 'Book not found' });
                }
                return foundBorrowedBook
                  .update({
                    quantity: foundBorrowedBook.quantity - 1,
                  })
                  .then((updatedBorrowedBook) => {
                    res.status(200).send({ success: true, message: `${updatedBorrowedBook.title} succesfully borrowed`, updatedBorrowedBook });
                  })
                  .catch((error) => {
                    res.status(400).send({ success: false, message: `Oops! something happened, ${error.message}` });
                  });
              })
              .catch((error) => {
                res.status(400).send({ success: false, message: `Oops! something happenned ${error.message}` });
              });
          })
          .catch((error) => { res.status(400).send({ success: false, message: `Oops! something happened, ${error.message}` }); });
      })
      .catch((error) => {
        res.status(400).send({ success: false, message: `Oops! something happened, ${error.message}` });
      });
  }

  static returnBook(req, res) {
    return Borrow
      .findOne({
        where: {
          userId: req.params.userId,
          bookId: req.body.bookId,
          returned: true,
        },
        include: [
          { model: Book, as: 'book', required: true },
        ],
      }).then((foundBorrow) => {
        if (foundBorrow) {
          return res.status(409).send({ success: false, messsage: 'Conflict! Book returned already', foundBorrow });
        }
        return Borrow
          .update({
            returned: true,
            actualReturnDate: Date.now(),
          }, {
            where: { userId: req.params.userId, bookId: req.body.bookId },
          })
          .then(() => {
            Book
              .findOne({
                where: {
                  id: req.body.bookId,
                },
              })
              .then((foundBorrowedBook) => {
                if (!foundBorrowedBook || foundBorrowedBook.quantity === 0) {
                  return res.status(404).send({ success: false, message: 'Book not found' });
                }
                return foundBorrowedBook
                  .update({
                    quantity: foundBorrowedBook.quantity + 1,
                  })
                  .then((updatedBorrowedBook) => {
                    res.status(200).send({ success: true, message: `${updatedBorrowedBook.title} succesfully returned but pending review by Administrator`, updatedBorrowedBook });
                  })
                  .catch((error) => {
                    res.status(400).send({ success: false, message: `Oops! something 1happened, ${error.message}` });
                  });
              })
              .catch((error) => {
                res.status(400).send({ success: false, message: `Oops! something 2happenned ${error.message}` });
              });
          })
          .catch((error) => { res.status(400).send({ success: false, message: `Oops! something 3happened, ${error.message}` }); });
      })
      .catch((error) => {
        res.status(400).send({ success: false, message: `Oops! something 4happened, ${error.message}` });
      });
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
