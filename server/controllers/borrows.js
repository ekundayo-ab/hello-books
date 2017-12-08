import moment from 'moment';
import nodemailer from 'nodemailer';
import model from '../models';
import Helper from '../helpers/index';

const Book = model.Book;
const Borrow = model.Borrow;
const User = model.User;
/**
 * @class BorrowController
 * @description Borrowing operations
 */
class BorrowController {
  /**
   * @static
   * @description Borrow a book
   * @param {object} req
   * @param {object} res
   * @returns {object} // Success, Message, Borrowed Book
   * @memberOf BorrowController
   */
  static create(req, res) {
    if (res.locals.borrowStatus) {
      return res.status(401).send({
        success: false,
        message: 'Loan credit exhausted, upgrade or return borrowed book'
      });
    }
    // Also checks if book has been borrowed and not returned
    return Borrow
      .findOne({
        where: {
          userId: req.decoded.data.id,
          bookId: req.body.bookId,
          returned: false,
        },
        include: [
          { model: Book, as: 'book', required: true },
        ],
      }).then((foundBorrow) => {
        /**
         * If book has been borrowed before and not returned,
         * User cannot borrow same book again.
         */
        if (foundBorrow) {
          return res.status(409).send({
            success: false,
            message: 'Book borrowed already'
          });
        }
        // Check if book is available and not borrowed out.
        return Book
          .findOne({
            where: {
              id: req.body.bookId,
            },
          })
          .then((foundBooktoBorrow) => {
            // If book is borrowed out, then No book to borrow
            if (!foundBooktoBorrow || foundBooktoBorrow.quantity === 0) {
              return res.status(404).send({
                success: false,
                message: 'Book not found'
              });
            }
            /**
             * But if book is available, User can borrow book
             * with the count decreased by one
             */
            return foundBooktoBorrow
              .update({
                quantity: foundBooktoBorrow.quantity - 1,
              })
              .then((updatedBorrowedBook) => {
                // If book is borrowed out, then No book to borrow
                if (!foundBooktoBorrow ||
                  foundBooktoBorrow.quantity === 0) {
                  return res.status(404).send({
                    success: false,
                    message: 'Book not found'
                  });
                }
                // Else, user is eligible to borrow book
                return Borrow
                  .create({
                    returned: false,
                    userId: req.decoded.data.id,
                    bookId: req.body.bookId,
                    dueDate:
                    new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
                    actualReturnDate: Date.now(),
                  }).then((borrowingRecord) => {
                    const userToUpdate = {
                      ops: true,
                      updateTotalBorrows: true,
                      userId: req.decoded.data.id,
                    };
                    Helper.updateBorrowLimitAndTotalBorrows(userToUpdate);
                    res.status(200).send({
                      success: true,
                      message: `${updatedBorrowedBook.title}` +
                      ' succesfully borrowed',
                      updatedBorrowedBook,
                      borrowingRecord
                    });
                  });
              });
          });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: `Oops! something happened, ${error.message}` });
      });
  }
  /**
   * @static
   * @description Return borrowed book
   * @param {object} req
   * @param {object} res
   * @returns {object} // Success, Message, Returned book
   * @memberOf BorrowController
   */
  static returnBook(req, res) {
    let bookToReturn;
    let userToUpdateInStore;
    const dueDate = req.body.borrow.dueDate;

    // Compares the current date with the dueDate specified for returning a book
    // If current date is greater than the due date, then user is returning late
    // Hence surcharge variable evaluates to true,
    // meaning user borrowing credit would be deducted by one.
    const surcharge = moment(Date.now()) > moment(dueDate);

    // Searches if book is available in the database
    return Book.findById(req.body.bookId).then((bookFound) => {
      if (!bookFound) {
        return res.status(404).send({
          success: false,
          message: 'Book not found'
        });
      }
      bookToReturn = bookFound;
      return Borrow
        .update({
          returned: true,
          actualReturnDate: Date.now(),
        }, {
          where: {
            id: req.body.borrowId,
          },
          returning: true,
          plain: true
        })
        .then((borrowUpdated) => {
          if (borrowUpdated[0] === 0) {
            return res.status(404).send({
              success: false,
              message: 'You have not borrowed this book'
            });
          }
          // Book is returned with the count increased by one
          return Book
            .update({
              quantity: bookToReturn.quantity + 1,
            }, {
              where: {
                id: bookToReturn.id,
              },
              returning: true,
              plain: true
            }).then((updatedBook) => {
              const userToUpdate = {
                ops: surcharge,
                updateTotalBorrows: false,
                userId: req.decoded.data.id,
              };
              Helper.updateBorrowLimitAndTotalBorrows(userToUpdate)
                .then((resp) => {
                  userToUpdateInStore = resp.ok ? resp.user : {};

                  // If a user is returning late, send them a mail stating
                  // that they've been surcharged because they are
                  // returning late
                  if (surcharge === true) {
                    const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'ekprogs@gmail.com',
                        pass: process.env.TRANSPORT_PASS
                      }
                    });
                    const mailOptions = {
                      from: 'admin@hellobooks.com',
                      to: userToUpdateInStore.email,
                      subject: 'Notice of surcharge on late ' +
                      `return of ${updatedBook[1].dataValues.title}`,
                      html: `<p>Hi ${userToUpdateInStore.username}</p>` +
                      '<p>In a bid to satisfy hellobooks users, we ' +
                      'encourage all users to return book(s) borrowed' +
                      ' on or as at when due, so we can have books to serve' +
                      ' other users.</p>' +
                      '<p>In order to checkmate this we deduct a borrowing' +
                      ' credit per book returned late</p>' +
                      '<p>We have therefore deducted 1 credit point from your' +
                      ' total credit, find below the updated details of your' +
                      ' borrowing credit account</p>' +
                      `<p><b>Total Credit: </b>
                      ${userToUpdateInStore.borrowLimit}</p>` +
                      '<blockquote>To replenish your credit at the rate of $1' +
                      ' (One Dollar) per 10 credit points send funds to ' +
                      '<b>HelloBooks Account: AAABBBXXXXXX</b></blockquote>' +
                      '<p>Thanks. for more info visit' +
                      ' https://hellobooks-e.herokuapp.com</p>'
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                      /* eslint-disable no-console */
                      if (err) return console.log(err);
                      return console.log(info);
                      /* eslint-enable */
                    });
                  }
                  res.status(200).send({
                    success: true,
                    message: `${updatedBook[1].dataValues.title} succesfully` +
                    ' returned but pending review by Administrator',
                    updatedBook,
                    borrowUpdated: borrowUpdated[1].dataValues,
                    userToUpdateInStore
                  });
                });
            });
        });
    }).catch(() => res.status(500).send({
      success: false,
      message: 'Internal Server Error'
    }));
  }

  /**
   * @static
   * @description List all books borrowed but not returned by a User.
   * @param {object} req
   * @param {object} res
   * @returns {object} // Success, Books not returned
   * @memberOf BorrowController
   */
  static listNotReturned(req, res) {
    const limit = 4;
    const { page } = req.query; // page number
    const offset = limit * (page - 1);
    return Borrow.findAndCountAll({
      where: {
        userId: req.params.userId,
        returned: false,
      },
      include: [
        { model: Book, as: 'book', required: true },
      ],
      limit,
      offset,
    })
      .then((borrow) => {
        const pages = Math.ceil(borrow.count / limit);
        if (borrow.rows.length < 1) {
          return res.status(200).send({
            success: false,
            message: 'You have no books to return'
          });
        }
        return res.status(200).send({
          success: true,
          borrow: borrow.rows,
          numberOfPages: pages
        });
      })
      .catch(() => {
        res.status(500).send({
          success: false,
          message: 'Internal Server Error'
        });
      });
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} // Success, Message, Book borrowed
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
            success: true,
            message: 'You borrowed this book',
            foundBorrowedBook });
        }
        return res.status(200).send({
          success: false,
          message: 'Cleared, Not borrowed by you!' });
      })
      .catch(() => res.status(500).send({
        success: false,
        message: 'Internal Server Error'
      }));
  }

  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} // Success, All borrowed books by user
   * @memberof BorrowController
   */
  static getAllBorrowedBooks(req, res) {
    let limit = 4; // number of records per page
    const levelQuery = ((req) => {
      if (req.query.notify === 'true') {
        limit = 10 + parseInt(req.query.more, 10);
        return {};
      }
      return { userId: req.params.userId };
    });
    const { page } = req.query; // page number
    const offset = limit * (page - 1);
    return Borrow.findAndCountAll({
      where: levelQuery(req),
      order: [
        ['updatedAt', 'DESC'],
      ],
      include: [
        { model: Book, as: 'book', required: true },
        { model: User, as: 'user', attributes: ['username'], required: true },
      ],
      limit,
      offset,
    })
      .then((borrowedBooks) => {
        const pages = Math.ceil(borrowedBooks.count / limit);
        if (borrowedBooks.rows.length < 1) {
          return res.status(404).send({
            success: false,
            message: 'You have no borrowed book(s)',
            numberOfPages: 0
          });
        }
        return res.status(200).send({
          success: true,
          borrowedBooks: borrowedBooks.rows,
          numberOfPages: pages
        });
      })
      .catch(() => {
        res.status(500).send({
          success: false,
          message: 'Internal Server Error'
        });
      });
  }
}

export default BorrowController;
