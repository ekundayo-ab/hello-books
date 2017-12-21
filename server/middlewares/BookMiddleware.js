import model from './../models';

const { Book } = model;
/**
 * @class BookMiddleware
 *
 * @description Abstracts logics common to book operations
 */
class BookMiddleware {
  /**
   * @description Checks and ensures a book exists
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   * @param {object} next - The next action
   *
   * @returns {next} - verifies and allows route continue to endpoint
   */
  static validateAndCheckIfBookExist(req, res, next) {
    const bookId = req.params.bookId || req.body.bookId;
    // Set query conditionally based on request
    const query = req.url === '/books' ?
      { isbn: req.body.isbn } : { id: bookId };

    // Ensures Book ID is present in the path
    if (req.url !== '/books' && isNaN(bookId)) {
      return res.status(400).send({ message: 'Ensure book ID is supplied' });
    }

    // Checks if book exists in the database
    return Book
      .findOne({
        where: {
          ...query,
        }
      })
      .then((book) => {
        if (req.url === '/books') {
          if (!book) return next();
          return res.status(409)
            .send({
              message: `Conflict! ${req.body.title} exists already`,
              book
            });
        }
        if (!book) return res.status(404).send({ message: 'Book not found' });
        req.foundBook = book;
        return next();
      })
      .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }
}

export default BookMiddleware;
