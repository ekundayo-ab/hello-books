import moment from 'moment';
import model from '../models';

const { Book, Borrow, User } = model;

/**
 * @class BorrowController
 *
 * @description Borrowing operations
 */
class BorrowController {
  /**
   * @static
   *
   * @description Borrow a book from the library
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   * @param {object} next - After endpoint middleware call
   *
   * @returns {object} - Message & Borrowed Book
   *
   * @memberOf BorrowController
   */
  static borrowBook(req, res, next) {
    const { foundBook } = req;
    return foundBook
      .update({ quantity: foundBook.quantity - 1 })
      .then(updatedBorrowedBook =>
        // Else, user is eligible to borrow book
        Borrow
          .create({
            returned: false,
            userId: req.decoded.data.id,
            bookId: req.body.bookId,
            dueDate:
            new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
            actualReturnDate: Date.now(),
          }).then((borrowingRecord) => {
            req.loanRecords = {
              surcharge: false,
              newBookRecord: updatedBorrowedBook,
              newBorrowRecord: borrowingRecord
            };
            next();
          }).catch(() => res.status(500)
            .send({ message: 'Internal Server Error' }))
      );
  }

  /**
   * @static
   *
   * @description Returns a borrowed book to the library
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from the controller
   * @param {object} next - After endpoint middleware call
   *
   * @returns {object} - Message, Returned book
   *
   * @memberOf BorrowController
   */
  static returnBook(req, res, next) {
    const { borrowId } = req.body;
    if (!borrowId) return res.status(400).send('Ensure borrowId is present');
    const { dueDate } = req.body.borrow;
    const surcharge = moment(Date.now()) > moment(dueDate);
    const bookToReturn = req.foundBook;
    return Borrow
      .update({
        returned: true,
        actualReturnDate: Date.now(),
      }, {
        where: { id: req.body.borrowId },
        returning: true,
        plain: true
      })
      .then((borrowUpdated) => {
        if (borrowUpdated[0] === 0) {
          return res.status(404).send({
            message: 'You have not borrowed this book'
          });
        }
        return Book
          .update({
            quantity: bookToReturn.quantity + 1,
          }, {
            where: { id: bookToReturn.id },
            returning: true,
            plain: true
          }).then((updatedBook) => {
            req.loanRecords = {
              surcharge,
              newBookRecord: updatedBook,
              newBorrowRecord: borrowUpdated
            };
            next();
          });
      }).catch(() => res.status(500)
        .send({ message: 'Internal Server Error' }));
  }

  /**
   * @static
   *
   * @description Get record for a specific borrowed book
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - Message, Book borrowed
   *
   * @memberof BorrowController
   */
  static getBorrowedBook(req, res) {
    return Borrow
      .findOne({
        where: {
          userId: req.decoded.data.id,
          bookId: req.params.bookId,
          returned: false,
        },
      })
      .then((foundBorrowedBook) => {
        if (foundBorrowedBook) {
          return res.status(200).send({
            message: 'You borrowed this book',
            foundBorrowedBook });
        }
        return res.status(200).send({
          message: 'Cleared, Not borrowed by you!' });
      })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }

  /**
   * @static
   *
   * @description List all borrowed books or books borrowed
   * but not returned by a particular user
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - All borrowed books by user
   *
   * @memberof BorrowController
   */
  static AllBorrowedOrNotReturnedBooks(req, res) {
    const { page } = req.query; // page number
    const { userId } = req.params;
    if (!page || !userId) {
      return res.status(400).send({ message: 'Supply bookId and userId' });
    }
    const { notify, returned, more } = req.query;

    // number of records per page
    let limit = 4;
    const userAttributes = ['id', 'username'];

    // conditional query for getting related table
    const includeQuery = returned === 'false' || returned === undefined ?
      [{ model: Book, as: 'book', required: true }] :
      [
        { model: Book, as: 'book', required: true },
        { model: User, as: 'user', attributes: userAttributes, required: true },
      ];

    let levelQuery;
    levelQuery = returned === 'false' ?
      { userId, returned: false } : { userId };

    if (notify === 'true') {
      limit = 10 + parseInt(more, 10);
      levelQuery = {};
    }
    const offset = limit * (page - 1);
    return Borrow.findAndCountAll({
      where: levelQuery,
      order: [['updatedAt', 'DESC']],
      include: [...includeQuery],
      limit,
      offset,
    })
      .then((borrowedBooks) => {
        const pages = Math.ceil(borrowedBooks.count / limit);
        if (borrowedBooks.rows.length < 1) return res.status(204).send({});
        return res.status(200).send({
          borrowedBooks: borrowedBooks.rows,
          numberOfPages: pages
        });
      })
      .catch(() => {
        res.status(500).send({ message: 'Internal Server Error' });
      });
  }
}

export default BorrowController;
