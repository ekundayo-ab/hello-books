import { isEmpty } from 'lodash';
import model from './../models';

const User = model.User;
/**
 * @class Helper
 * @description Abstracts validation functions
 */
class Helper {
  /**
   * @description Ensures Admin priviledges to perform certain operations
   * @static
   * @param {object} req
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static isAdmin(req) {
    if (req.decoded.data.role !== 'admin') {
      return false;
    }
    return true;
  }

  /**
   * @description Ensures all fields are present when adding or updating book
   * @static
   * @param {object} req
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static isDefined(req) {
    if (Object.keys(req.body).length < 5) return false;
    return true;
  }

  /**
   * @description Ensures all inputs are validated
   * @static
   * @param {object} req
   * @returns {object} isValid and errors
   * @memberOf Helper
   */
  static inputValidation(req) {
    const errors = {};
    for (let i = 0; i < 5; i += 1) {
      const field = (Object.values(req.body)[i]);
      if (typeof (Object.values(req.body)[i])
      === 'string') Object.values(req.body)[i].trim();

      if (field === (undefined || null || '')
      || /^\s+$/.test(field)) {
        const theKey = Object.keys(req.body)[i];
        errors[theKey] = 'This field is required';
      }

      if (Object.keys(req.body)[i] === 'isbn'
      && isNaN(Object.values(req.body)[i])) {
        errors.ISBNValidation = 'ISBN must be a number';
      }

      if (Object.keys(req.body)[i] === 'quantity'
      && isNaN(Object.values(req.body)[i])) {
        errors.numeric = 'quantity must be a number';
      }
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   * @description Ensures all inputs are validated
   * @static
   * @param {object} req
   * @returns {object} isValid and errors
   * @memberOf Helper
   */
  static userValidation(req) {
    const errors = {};
    if (!/^[a-z_]+$/i.test(req.body.username)) {
      errors.username = 'One word, only letters or underscore';
    }

    if (req.body.password !== req.body.passwordConfirmation) {
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
   * @description validates some input fields for the form
   * @param {object} formState - state data in the form
   * @returns {object} - This contains errors and isvalid a boolean
   * @memberof Validators
   */
  static validatePassForm(formState) {
    const { oldPass, newPass, newPassConfirm } = formState;
    const errors = {};
    if (oldPass.trim() === '') errors.oldPass = 'field required';
    if (newPass.trim() === '') errors.newPass = 'field required';
    if (newPassConfirm.trim() === '') errors.newPassConfirm = 'field required';
    if (newPass !== newPassConfirm) errors.mismatch = 'Passwords do not match';
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
  }

  /**
   * @static
   * @description Ensures email supplied is a valid email address
   * @param {string} email
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
    return re.test(email);
  }

  /**
   * @static
   * @description Ensures borrow limit and total limit is updated for user
   * @param {object} userData
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static updateBorrowLimitAndTotalBorrows(userData) {
    return User.findById(userData.userId)
      .then(user =>
        User.update({
          borrowLimit: userData.ops ?
            user.borrowLimit - 1 : user.borrowLimit + 1,
          totalBorrow: userData.ops ?
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
   * @description Decides on credit to assign ugraded user
   * @param {object} user
   * @returns {boolean} true or false
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
}

export default Helper;
