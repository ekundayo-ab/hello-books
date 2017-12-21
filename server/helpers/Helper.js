import { isEmpty } from 'lodash';
import nodemailer from 'nodemailer';
import model from './../models';

const { User } = model;
/**
 * @class Helper
 *
 * @description Abstracts validation functions
 */
class Helper {
  /**
   * @static
   *
   * @description Ensures all fields are present when adding or updating book
   *
   * @param {object} req - request payload sent to function
   *
   * @returns {boolean} true or false and message
   *
   * @memberOf Helper
   */
  static badRequestHandler(req) {
    let errMessage;
    const { bookId } = req.params;

    /**
     * @description Sign In form validation
     *
     * @returns {object} - true, false, message and errors
     */
    const signin = () => {
      const { identifier, password } = req.body;
      errMessage = (!identifier || !password) ?
        errMessage = 'Check your username or email.' : '';
      return { isValid: true, message: errMessage, errors: {} };
    };

    /**
     * @description Sign Up form validation
     *
     * @returns {object} - true, false, message and errors
     */
    const signup = () => {
      const { username, email, password, passwordConfirmation } = req.body;
      errMessage = (!username || !email || !password || !passwordConfirmation) ?
        'Check your username, email or password and try again!' : '';
      const { isValid, errors } = this.userValidation(req);
      return { isValid, message: errMessage, errors };
    };

    /**
     * @description New Book or Update Book form validation
     *
     * @returns {object} - true, false, message and errors
     */
    const addBook = () => {
      const { isbn, title, author, quantity, description, category } = req.body;
      errMessage = (!isbn || !title || !author || !quantity
        || !description || !category) ? 'All required fields must exist' : '';
      const { isValid, errors } = this.inputValidation(req);
      return { isValid, message: errMessage, errors };
    };

    /**
     * @description Change Password form validation
     *
     * @returns {object} - true, false, message and errors
     */
    const changePass = () => {
      const { oldPass, newPass } = req.body;
      errMessage = (!oldPass || !newPass) ? 'All fields must exist' : '';
      const { isValid, errors } = this.validatePassForm(req);
      return { isValid, message: errMessage, errors };
    };

    /**
     * @description Add Category form validation
     *
     * @returns {object} - true, false, message and errors
     */
    const addCategory = () => {
      const { title } = req.body;
      errMessage = (!title || /^\s+$/.test(title)) ?
        'All fields must exist' : '';
      return { isValid: true, message: errMessage, errors: {} };
    };

    const badRequestResponses = {
      '/users/signin': signin,
      '/users/signup': signup,
      '/auth/google': signup,
      '/books': addBook,
      [`/books/${bookId}`]: addBook,
      '/users/pass': changePass,
      '/category': addCategory
    };

    if (badRequestResponses[req.url] === undefined) {
      return {
        allDefined: true,
        allValid: true,
        message: ''
      };
    }
    const { isValid, message, errors } = badRequestResponses[req.url]();
    return {
      allDefined: isEmpty(message),
      allValid: isValid,
      message: message || errors
    };
  }

  /**
   * @static
   *
   * @description Ensures all inputs are validated
   *
   * @param {object} req
   *
   * @returns {object} isValid and errors
   *
   * @memberOf Helper
   */
  static inputValidation(req) {
    const errors = {};
    for (let i = 0; i < 6; i += 1) {
      const field = (Object.values(req.body)[i]);
      const theKey = Object.keys(req.body)[i];
      if (typeof field === 'string') Object.values(req.body)[i].trim();

      if (field === (undefined || null || '') || /^\s+$/.test(field)) {
        errors[theKey] = 'This field is required';
      }

      if (theKey === 'isbn' && isNaN(field)) {
        errors.ISBNValidation = 'ISBN must be a number';
      }

      if (theKey === 'quantity' && isNaN(field)) {
        errors.numeric = 'quantity must be a number';
      }
      if (theKey === 'category' && isNaN(field)) {
        errors.category = 'categoryId must be a number';
      }
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   * @static
   *
   * @description Ensures all inputs are validated
   *
   * @param {object} req
   *
   * @returns {object} isValid and errors
   *
   * @memberOf Helper
   */
  static userValidation(req) {
    const errors = {};
    const { password, passwordConfirmation, email } = req.body;
    if (!/^[a-z_]+$/i.test(req.body.username)) {
      errors.username = 'One word, only letters or underscore';
    }
    if (!Helper.validateEmail(email)) {
      errors.email = 'Invalid email address, try again';
    }
    if (password !== passwordConfirmation) {
      errors.password = 'Passwords do not match';
    }
    for (let i = 0; i < 4; i += 1) {
      const field = Object.values(req.body)[i];
      const theKey = Object.keys(req.body)[i];
      if (theKey === 'password' && field.trim().length < 6) {
        errors[theKey] = 'minimum of 6 characters word allowed';
      }
      if (theKey === 'username' && field.trim().length < 3) {
        errors[theKey] = 'minimum of 3 characters word allowed';
      }
      if (field === (undefined || null || '') || /^\s+$/.test(field)) {
        errors[theKey] = 'This field is required';
      }
    }

    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   * @static
   *
   * @description validates some input fields for the form
   *
   * @param {object} formState - state data in the form
   *
   * @returns {object} - This contains errors and isvalid a boolean
   *
   * @memberof Validators
   */
  static validatePassForm(formState) {
    const { oldPass, newPass, newPassConfirm } = formState.body;
    const errors = {};
    if (newPass.trim().length < 6) {
      errors.newPass = '6 or more characters allowed';
    }
    if (oldPass.trim() === '') errors.oldPass = 'field required';
    if (newPass.trim() === '') errors.newPass = 'field required';
    if (newPassConfirm.trim() === '') errors.newPassConfirm = 'field required';
    if (newPass !== newPassConfirm) errors.mismatch = 'Passwords do not match';
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
  }

  /**
   * @static
   *
   * @description Ensures email supplied is a valid email address
   *
   * @param {string} email
   *
   * @returns {boolean} true or false
   *
   * @memberOf Helper
   */
  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
    return re.test(email);
  }

  /**
   * @static
   *
   * @description Ensures borrow limit and total limit is updated for user
   *
   * @param {object} userData
   *
   * @returns {boolean} true or false
   *
   * @memberOf Helper
   */
  static updateBorrowLimitAndTotalBorrows(userData) {
    return User.findById(userData.userId)
      .then(user =>
        User.update({
          borrowLimit: userData.ops ?
            user.borrowLimit - 1 : user.borrowLimit + 1,
          totalBorrow: userData.updateTotalBorrows ?
            user.totalBorrow + 1 : user.totalBorrow
        }, {
          where: {
            id: user.id
          },
          returning: true,
          plain: true
        }).then(userUpdated =>
          ({ ok: !!userUpdated, user: userUpdated[1].dataValues })));
  }
  /**
   * @static
   *
   * @description Decides on credit to assign ugraded user
   *
   * @param {object} user
   *
   * @returns {boolean} true or false
   *
   * @memberOf Helper
   */
  static autoUpgradeJudge(user) {
    const upgradeToken = {
      levelName: user.level,
      credit: 0,
    };
    if (user.level === 'bronze' && user.totalBorrow === 10) {
      upgradeToken.levelName = 'silver';
      upgradeToken.credit = 1;
    }
    if (user.level === 'silver' && user.totalBorrow === 20) {
      upgradeToken.levelName = 'gold';
      upgradeToken.credit = 2;
    }
    if (user.level === 'gold' && user.totalBorrow === 30) {
      upgradeToken.levelName = 'unlimited';
      upgradeToken.credit = 9000;
    }
    return { upgradeToken };
  }

  /**
   * @static
   *
   * @description Sends email to user for late return of borrowed book
   *
   * @param {object} userToUpdateInStore
   *
   * @param {object} updatedBook
   *
   * @returns {object} - console information as to whether email was successful
   *
   * @memberOf Helper
   */
  static sendEmail(userToUpdateInStore, updatedBook) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ekprogs@gmail.com',
        pass: process.env.TRANSPORT_PASS
      }
    });
    const mailOptions = {
      from: 'admin@hellobooks.com',
      to: userToUpdateInStore.email,
      subject: 'Notice of surcharge on late ' +
      `return of ${updatedBook[1].dataValues.title}`,
      html: `<p>Hi ${userToUpdateInStore.username}</p>` +
      '<p>In a bid to satisfy hellobooks users, we ' +
      'encourage all users to return book(s) borrowed' +
      ' on or as at when due, so we can have books to serve' +
      ' other users.</p>' +
      '<p>In order to checkmate this we deduct a borrowing' +
      ' credit per book returned late</p>' +
      '<p>We have therefore deducted 1 credit point from your' +
      ' total credit, find below the updated details of your' +
      ' borrowing credit account</p>' +
      `<p><b>Total Credit: </b>
      ${userToUpdateInStore.borrowLimit}</p>` +
      '<blockquote>To replenish your credit at the rate of $1' +
      ' (One Dollar) per 10 credit points send funds to ' +
      '<b>HelloBooks Account: AAABBBXXXXXX</b></blockquote>' +
      '<p>Thanks. for more info visit' +
      ' https://hellobooks-e.herokuapp.com</p>'
    };
    transporter.sendMail(mailOptions, (err, info) => {
      /* eslint-disable no-console */
      if (err) return console.log(err);
      return console.log(info);
      /* eslint-enable */
    });
  }
}

export default Helper;
