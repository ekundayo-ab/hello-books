import model from '../models';

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
    // Checks if user exists
    User.findById(req.decoded.data.id)
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).send({
            success: false,
            message: 'User does not exist' });
        }
      })
      .catch(() => res.status(500).send({
        success: false,
        message: 'Internal Server Error'
      }));

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
                  }).then(() => {
                    res.status(200).send({
                      success: true,
                      message: `${updatedBorrowedBook.title}` +
                      ' succesfully borrowed',
                      updatedBorrowedBook
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
    // Checks if user exists
    User.findById(req.params.userId).then((userFound) => {
      if (!userFound) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist'
        });
      }
    }).catch(() => res.status(500).send({
      success: false,
      message: 'Internal Server Error'
    }));

    let updatedBorrowedBook;
    return Borrow
      .update({
        // Sets userId to that supplied in path parameter
        userId: req.params.userId,
        returned: true, // Sets returned status to true
        actualReturnDate: Date.now(), // Updates returned date to now
      }, {
        where: {
          userId: req.params.userId,
          bookId: req.body.bookId,
          returned: false
        },
      })
      .then((borrowUpdated) => {
        if (borrowUpdated[0] === 0) {
          return res.status(404).send({
            success: false,
            message: 'You have not borrowed this book'
          });
        }
        Borrow
          .findOne({
            where: {
              userId: req.params.userId,
              bookId: req.body.bookId,
              returned: true,
            },
            include: [
              { model: Book, as: 'book', required: true },
            ],
          }).then((foundUpdatedBorrow) => {
            updatedBorrowedBook = foundUpdatedBorrow;
          });
        // Searches if book is available in the database
        return Book
          .findOne({
            where: {
              id: req.body.bookId,
            },
          })
          .then((foundBorrowedBook) => {
            if (!foundBorrowedBook || foundBorrowedBook.quantity === 0) {
              return res.status(404).send({
                success: false,
                message: 'Book not found'
              });
            }
            // Book is returned with the count increased by one
            return foundBorrowedBook
              .update({
                quantity: foundBorrowedBook.quantity + 1,
              })
              .then((updatedBook) => {
                res.status(200).send({
                  success: true,
                  message: `${updatedBook.title} succesfully` +
                  ' returned but pending review by Administrator',
                  updatedBook,
                  updatedBorrowedBook
                });
              })
              .catch((error) => {
                res.status(400).send({
                  success: false,
                  message: `Oops! something happened,
                  ${error.message}`
                });
              });
          })
          .catch((error) => {
            res.status(400).send({
              success: false,
              message: `Oops! something happenned ${error.message}`
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: `Oops! something happened, ${error.message}`
        });
      });
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
    let offset = 0;
    return Borrow.findAndCountAll()
      .then((data) => {
        const { page } = req.query; // page number
        const pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        return Borrow
          .findAll({
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
            if (borrow.length < 1) {
              return res.status(200).send({
                success: false,
                message: 'You have no books to return'
              });
            }
            return res.status(200).send({
              success: true,
              borrow,
              numberOfPages: pages
            });
          })
          .catch(() => {
            res.status(500).send({
              success: false,
              message: 'Internal Server Error'
            });
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
    const limit = 4; // number of records per page
    let offset = 0;
    return Borrow.findAndCountAll()
      .then((data) => {
        const { page } = req.query; // page number
        const pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);
        return Borrow
          .findAll({
            where: {
              userId: req.params.userId,
            },
            include: [
              { model: Book, as: 'book', required: true },
            ],
            limit,
            offset,
          })
          .then((borrowedBooks) => {
            if (borrowedBooks.length < 1) {
              return res.status(204).send({
                success: false,
                message: 'You have no borrowed book(s)'
              });
            }
            return res.status(200).send({
              success: true,
              borrowedBooks,
              numberOfPages: pages
            });
          })
          .catch((error) => { res.send(error.toString()); });
      });
  }
}

export default BorrowController;
