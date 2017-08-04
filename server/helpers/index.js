
/**
 * Helper functions for borrowing logic
 */
class Helper {
  /**
   * 
   * @param {*} Model 
   * @param {*} id 
   * @param {*} req 
   * @param {*} res 
   * @param {*} qty 
   * @param {*} book 
   */
  static subtractBorrowedBook(Model, id, req, res, qty, book) {
    return Model.update({
      quantity: book.quantity - qty,
    }, {
      where: {
        id: book.id,
      },
    })
      .then(() => {
        if (!book) {
          res.status(404).send({ success: false, message: 'Book not found' });
        }
        res.status(200).send({ success: true, message: `You just borrowed ${book.title}` });
      })
      .catch((error) => { res.status(404).send(error); });
  }

  /**
   * 
   * @param {*} Book 
   * @param {*} id 
   * @param {*} req 
   * @param {*} res 
   */
  static findBook(Book, id, req, res) {
    return Book.find({
      where: {
        id,
      },
    })
      .then((book) => {
        if (book.quantity === 0 || req.body.quantity > book.quantity) {
          res.status(404).send({ success: false, message: 'You can not borrow at this time, Book is unavailable' });
        } else {
          Helper.subtractBorrowedBook(Book, id, req, res, req.body.quantity, book);
        }
      })
      .catch(error => res.send(error));
  }
}

module.exports = Helper;
