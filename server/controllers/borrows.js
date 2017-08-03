const Borrow = require('../models').Borrow;
const User = require('../models').User;
const Book = require('../models').Book;

module.exports = {
  create(req, res) {
    return User
      .find({
        where: {
          id: req.params.userId,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(403).send({ success: false, message: 'Forbidden, not allowed!' });
        }
        return Borrow
          .create({
            quantity: req.body.quantity,
            returned: 0,
            userId: user.id,
            bookId: req.body.bookId,
          })
          .then(() => {
            return Book
              .find({
                where: {
                  id: req.body.bookId,
                },
              })
              .then((book) => {
                if (!book) {
                  res.status(404).send({ success: false, message: 'Book not found' });
                }
                res.status(201).send({ success: true, message: `${book.title}, just borrowed` });
              })
              .catch((error) => { res.status(404).send({ error }); });
          })
          .catch(() => { res.status(404).send({ success: false, message: 'Book not found' }); });
      })
      .catch((error) => { res.status(404).send(error); });
  },
};
