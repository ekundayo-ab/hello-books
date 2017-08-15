import model from '../models';

const Book = model.Book;

/**
 * 
 */
class BookController {
  /**
   * 
   * 
   * @static
   * @description Adds new book to the library
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * 
   * @memberOf BookController
   */
  static create(req, res) {
    // Ensure user has administrative priviledges to create book
    if (req.decoded.data.role !== 'admin') {
      return res.status(403).send({ success: false, message: 'Permission Denied' });
    }
    // Validates every input by the user.
    if (Object.keys(req.body).length < 5) return res.status(400).send({ success: false, message: 'All fields are required.' });
    const errors = [];
    for (let i = 0; i < 5; i += 1) {
      if (Object.values(req.body)[i] === (undefined || null || '')) {
        errors.push(`${Object.keys(req.body)[i]} field is required`);
      }
      if (Object.keys(req.body)[i] === 'quantity' && typeof (parseInt(Object.values(req.body)[i], 10)) !== 'number') {
        errors.push('quantity must be a number');
      }
    }
    // Error(s) is/are outputted if any is pushed to the array
    if (errors.length > 0) return res.status(400).send({ success: false, errors });

    // Searches if book exists in the database
    return Book.findOne({
      where: { isbn: req.body.isbn },
    })
      .then((foundBook) => {
        if (foundBook) {
          return res.status(409).send({ success: false, messsage: `Conflict! ${req.body.title} exists already`, foundBook });
        }
        // If book does not exist, create new book.
        return Book
          .create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image: req.body.image,
            status: 1,
            quantity: req.body.quantity,
          })
          .then((book) => {
            res.status(200).send({ success: true, message: `${book.title}, succesfully added` });
          })
          .catch(error => res.send(error.message));
      })
      .catch(error => res.send(error.message));
  }
  /**
   * 
   * 
   * @static
   * @description Modifies existing book in the library
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * 
   * @memberOf BookController
   */
  static update(req, res) {
    // Ensure user has administrative priviledges to create book
    if (req.decoded.data.role !== 'admin') {
      return res.status(403).send({ success: false, message: 'Permission Denied' });
    }
    // Validates every input by the user.
    if (Object.keys(req.body).length < 5) return res.status(400).send({ success: false, message: 'All fields are required.' });
    const errors = [];
    for (let i = 0; i < 5; i += 1) {
      if (Object.values(req.body)[i] === (undefined || null || '')) {
        errors.push(`${Object.keys(req.body)[i]} field is required`);
      }
      if (Object.keys(req.body)[i] === 'quantity' && typeof (parseInt(Object.values(req.body)[i], 10)) !== 'number') {
        errors.push('quantity must be a number');
      }
    }
    // Error(s) is/are outputted if any is pushed to the array
    if (errors.length > 0) return res.status(400).send({ success: false, errors });

    // Checks if book exists in the database
    return Book
      .findOne({
        where: {
          id: req.body.bookId,
        },
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({ success: false, message: 'Book not found!' });
        }
        // If book exists, update the book.
        return Book
          .update({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image: req.body.image,
            status: 1,
            quantity: req.body.quantity,
          }, {
            where: {
              id: req.params.bookId,
            },
          })
          .then(() => {
            if (!book) {
              return res.send.status(404).send({ success: false, message: 'Book not found' });
            }
            return res.status(200).send({ success: true, message: `${req.body.title}, successfully updated`, old: book });
          })
          .catch(error => res.send(error.message));
      });
  }
  /**
   * 
   * 
   * @static
   * @description Deletes book from the library
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * 
   * @memberOf BookController
   */
  static destroy(req, res) {
    // Ensures user has administrative priviledges to delete book
    if (req.decoded.data.role !== 'admin') {
      return res.status(403).send({ success: false, message: 'Permission Denied' });
    }
    // Searches for book in the database
    return Book
      .find({
        where: {
          id: req.params.bookId,
        },
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({ success: false, message: 'Book not found' });
        }
        // If book is found, delete
        return book.destroy();
      })
      .then(() => {
        res.status(200).send({ success: true, message: 'Book successfully deleted' });
      }).catch(() => res.status(400).send({ success: false, message: 'Enter valid inputs!' }));
  }
  /**
   * 
   * 
   * @static
   * @description Lists all books in the library
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * 
   * @memberOf BookController
   */
  static list(req, res) {
    return Book
      .findAll({
        order: [
          ['createdAt', 'ASC'],
        ],
      })
      .then((book) => {
        if (book[0] === undefined) {
          return res.status(301).send({ success: false, message: 'Books not available, check back later.' });
        }
        return res.status(200).send(book);
      })
      .catch(() => res.status(400).send({ success: false, message: 'Ooops! something happened, check your inputs and try again.' }));
  }
}

export default BookController;
