const Book = require('../models').Book;
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
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
  },
  update(req, res) {
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
        // res.send({ book });
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
  },
  list(req, res) {
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
  },
};
