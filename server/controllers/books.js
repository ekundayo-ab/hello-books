import model from '../models';

const Book = model.Book;

/**
 * 
 */
class BookController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static create(req, res) {
    // Check if user has administrative priviledges
    if (req.decoded.data.role !== 'admin') {
      return res.status(400).send({ success: false, message: 'You are not allowed to add book' });
    }
    if (req.body.author === '' || null || undefined) {
      return res.status(400).send({ success: false, message: 'Please enter the author field' });
    }
    if (req.body.title === '' || null || undefined) {
      return res.status(400).send({ success: false, message: 'Please enter the title field' });
    }
    if (req.body.description === '' || null || undefined) {
      return res.status(400).send({ success: false, message: 'Please enter the description field' });
    }
    if (req.body.quantity === undefined || '' || null) {
      return res.status(400).send({ success: false, message: 'Please enter the quantity field' });
    }
    return Book.findOne({
      where: { isbn: req.body.isbn },
    })
      .then((foundBook) => {
        if (foundBook) {
          return res.status(409).send({ success: false, messsage: `Conflict! ${req.body.title} exists already`, foundBook });
        }
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
          .catch((error) => { res.status(400).send({ success: false, message: `Oops! something happened, ${error.message}` }); });
      })
      .catch((error) => {
        res.status(400).send({ success: false, message: `Oops! something happened, ${error.message}` });
      });
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static update(req, res) {
    if (req.decoded.data.role !== 'admin') {
      res.status(403).send({ success: false, message: 'You are not allowed to modify book' });
    }

    return Book
      .findOne({
        where: {
          id: req.body.bookId,
        },
      })
      .then((book) => {
        if (!book) {
          return res.status(404).send({ success: false, message: 'Book not found, try again!' });
        }
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
          .then((book) => {
            if (!book) {
              return res.send.status(404).send({ success: false, message: 'Book not found' });
            }
            return res.status(200).send({ success: true, message: `${req.body.title}, successfully updated` });
          })
          .catch((error) => {
            res.status(400).send({ success: false, message: 'Enter valid inputs!', error: error.toString() });
          });
      }).catch((error) => {
        return res.status(404).send({ success: false, message: 'Book not found' });
      });
  }
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static destroy(req, res) {
    if (req.decoded.data.role !== 'admin') {
      return res.status(403).send({ success: false, message: 'You are not allowed to delete books' });
    }
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
        return book.destroy();
      })
      .then(() => {
        res.status(200).send({ success: true, message: 'Book successfully deleted' });
      }).catch(() => res.status(400).send({ success: false, message: 'Enter valid inputs!' }));
  }
  /**
   *
   * @param {*} req
   * @param {*} res
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
