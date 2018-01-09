import model from '../models';

const { Book, Category } = model;

/**
 * @class BookController
 *
 * @description Book operations
 */
class BookController {
  /**
   * @static
   *
   * @description Adds new book to the library
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from the controller
   *
   * @returns {object} - Message & Created book
   *
   * @memberOf BookController
   */
  static addBook(req, res) {
    const { isbn, title, author, description, image, quantity, category } =
      req.body;
    return Book
      .create({
        isbn,
        title,
        author,
        description,
        image,
        status: 1,
        quantity,
        categoryId: category,
      })
      .then((book) => {
        res.status(201).send({
          message: `${book.title}, successfully added`,
          book
        });
      })
      .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }

  /**
   * @static
   *
   * @description Modifies existing book in the library
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - Message with Updated book
   *
   * @memberOf BookController
   */
  static updateBook(req, res) {
    const { isbn, title, author, description, image, quantity, category }
      = req.body;
    return Book
      .update({
        isbn,
        title,
        author,
        description,
        image,
        status: 1,
        quantity,
        categoryId: category,
      }, {
        where: {
          id: req.params.bookId,
        },
        returning: true,
        plain: true
      })
      .then(newBook =>
        res.status(200).send({
          message: `${req.foundBook.title}` +
          ` successfully updated to ${req.body.title}`,
          oldBook: req.foundBook,
          newBook: newBook[1].dataValues
        }))
      .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }
  /**
   * @static
   *
   * @description Deletes book from the library
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - Deletions success message
   *
   * @memberOf BookController
   */
  static deleteBook(req, res) {
    // If book is found, delete
    req.foundBook.destroy()
      .then(() =>
        res.status(200).send({
          message: 'Book successfully deleted',
          book: req.foundBook
        })
      )
      .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }
  /**
   * @static
   *
   * @description Lists all books in the library
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - Message and List of books
   *
   * @memberOf BookController
   */
  static listBooks(req, res) {
    if (!req.query.page) {
      return res.status(400).send({
        message: 'Ooops! something happened, ensure page is specified'
      });
    }
    const limit = 4; // number of records per page
    const { page } = req.query; // page number
    const offset = limit * (page - 1);
    return Book.findAndCountAll({
      order: [
        ['title', 'ASC'],
      ],
      limit,
      offset,
    })
      .then((books) => {
        const pages = Math.ceil(books.count / limit);
        if (books.rows.length < 1) {
          return res.status(204).send();
        }
        return res.status(200).send({
          books: books.rows,
          numberOfPages: pages
        });
      })
      .catch(() =>
        res.status(500).send({
          message: 'Internal Server Error'
        }));
  }

  /**
   * @static
   *
   * @description Gets a single book from the database
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - Message, Found book
   *
   * @memberof BookController
   */
  static findBook(req, res) {
    return Category.findOne({ where: { id: req.foundBook.categoryId } })
      .then((category) => {
        if (category) {
          req.foundBook.dataValues.categoryName = category.title;
        }
        return res.status(200).send(req.foundBook);
      })
      .catch(() => {
        res.status(500).send({
          message: 'Internal Server Error'
        });
      });
  }

  /**
   * @static
   *
   * @description Gets a single book from the database
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {object} - Message, Found book
   *
   * @memberof BookController
   */
  static filterBooks(req, res) {
    const { categoryId } = req.query;
    if (!categoryId) {
      return res.status(400).send({ message: 'Category ID is required' });
    }
    return Book
      .findAll({
        where: {
          categoryId
        }
      }).then((books) => {
        if (books.length > 0) {
          return res.status(200).send({ books });
        }
        return res.status(204).send({
          message: 'No book(s) in this category',
          books: []
        });
      })
      .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }
}

export default BookController;
