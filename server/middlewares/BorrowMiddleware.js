import model from '../models';
import Helper from '../helpers/Helper';

const { Borrow, Book } = model;
/**
 * @class BorrowMiddleware
 *
 * @description Intercepts some requests nade to borrow
 */
class BorrowMiddleware {
  /**
   * @description Checks if book has been borrowed
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   * @param {object} next - The next action
   *
   * @returns {next} - verifies and allows route continue to endpoint
   */
  static checkIfBorrowExist(req, res, next) {
    if (res.locals.borrowStatus) {
      return res.status(401).send({
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
        if (foundBorrow) {
          return res.status(409).send({
            message: 'Book borrowed already please return'
          });
        }
        return next();
      })
      .catch(error => res.status(400)
        .send({ message: `Oops! something happened, ${error.message}` }));
  }

  /**
   * @static
   *
   * @description Sends a mail to a user returning a book late,
   * and also updates borrowing credit and total books borrowed by a user
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   *
   * @returns {Function} - To send mail and response
   *
   * @memberof BorrowMiddleware
   */
  static sendMailAndResponse(req, res) {
    let userToUpdateInStore;
    let userToUpdate = { userId: req.decoded.data.id };
    const { surcharge, newBookRecord, newBorrowRecord } = req.loanRecords;
    userToUpdate = req.method === 'POST' ?
      { ...userToUpdate, ops: true, updateTotalBorrows: true } :
      { ...userToUpdate, ops: surcharge, updateTotalBorrows: false };

    if (req.method === 'POST') {
      Helper.updateBorrowLimitAndTotalBorrows(userToUpdate);
      return res.status(200).send({
        message: `${newBookRecord.title}` +
        ' succesfully borrowed',
        updatedBorrowedBook: newBookRecord,
        borrowingRecord: newBorrowRecord
      });
    }

    Helper.updateBorrowLimitAndTotalBorrows(userToUpdate)
      .then((resp) => {
        const { id, username, email, role, level, borrowLimit, totalBorrow } =
          resp.user;
        const formedUser =
          { id, username, email, role, level, borrowLimit, totalBorrow };
        userToUpdateInStore = resp.ok ? formedUser : {};
        // If a user is returning late, send them a mail stating
        // that they've been surcharged because they are
        // returning late
        if (surcharge === true) {
          Helper.sendEmail(userToUpdateInStore, newBookRecord);
        }
        return res.status(200).send({
          message: `${newBookRecord[1].dataValues.title} succesfully` +
          ' returned but pending review by Administrator',
          updatedBook: newBookRecord,
          borrowUpdated: newBorrowRecord[1].dataValues,
          userToUpdateInStore
        });
      });
  }
}

export default BorrowMiddleware;

