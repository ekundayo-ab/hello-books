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
    if (req.decoded.data.role !== 2) {
      res.status(403).send({ success: false, message: 'You are not allowed to add book' });
    }
    return Book
      .create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        image: req.body.image,
        status: 1,
        quantity: req.body.quantity,
      })
      .then((book) => { res.status(201).send({ success: true, message: `${book.title}, succesfully added` }); })
      .catch((error) => { res.status(400).send(error); });
  }
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static update(req, res) {
    if (req.decoded.data.role !== 2) {
      res.status(403).send({ success: false, message: 'You are not allowed to modify book' });
    }
    return Book
      .find({
        where: {
          id: req.params.bookId,
        },
      })
      .then((book) => {
        if (!book) {
          res.status(404).send({ success: false, message: 'Book not found' });
        }
        return Book
          .update({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            image: req.body.image,
            status: 1,
            quantity: req.body.quantity,
          }, {
            where: {
              id: book.id,
            },
          })
          .then(() => {
            if (!book) {
              res.send.status(404).send({ success: false, message: 'Book not found' });
            }
            res.status(201).send({ success: true, message: `${book.title}, successfully updated` });
          })
          .catch((error) => { res.status(404).send(error); });
      })
      .catch((error) => { res.status(400).send(error); });
  }
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  static destroy(req, res) {
    if (req.decoded.data.role !== 2) {
      res.status(403).send({ success: false, message: 'You are not allowed to delete books' });
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
      }).then(() => {
        return res.status(200).send({ success: true, message: 'Book successfully deleted' });
      }).catch(error => res.status(400).send(error));
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
        res.status(201).send(book);
      })
      .catch((error) => { res.status(404).send(error); });
  }
}

module.exports = BookController;
