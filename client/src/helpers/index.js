import { isEmpty } from 'lodash';
/**
 * @class Helper
 * @description Abstracts validation functions
 */
class Helper {
  /**
   * Check for Admin priviledge
   * @description Checks Admin priviledge to perform certain operations
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
   * Validates Book Input Fields
   * @description Ensures all fields are present when adding or updating book
   * @param {object} req
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static isDefined(req) {
    if (Object.keys(req.body).length < 5) return false;
    return true;
  }

  /**
   * Also Validates Book Input Fields
   * @description Ensures all inputs are validated
   * @param {object} req
   * @returns {object } isValid and errors
   * @memberOf Helper
   */
  static inputValidation(req) {
    const errors = {};
    for (let i = 0; i < 5; i += 1) {
      const field = Object.values(req.body)[i].trim();
      if (field === (undefined || null || '') || /^\s+$/.test(field)) {
        const theKey = Object.keys(req.body)[i];
        errors[theKey] = 'This field is required';
      }
      if (Object.keys(req.body)[i] === 'isbn'
        && typeof (Object.values(req.body)[i]) !== 'number') {
        errors.ISBNValidation = 'ISBN must be a number';
      }
      if (Object.keys(req.body)[i] === 'quantity'
        && typeof (parseInt(Object.values(req.body)[i], 10)) !== 'number') {
        errors.numeric = 'quantity must be a number';
      }
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   * Validates Register Input Fields
   * @description Ensures all inputs are validated when registering
   * @param {object} req
   * @returns {object} isValid and errors
   * @memberOf Helper
   */
  static userValidation(req) {
    const errors = {};
    if (!/^[a-z_]+$/i.test(req.username)) {
      errors.username = 'One word, only letters or underscore';
    }

    if (req.password !== req.passwordConfirmation) {
      errors.password = 'Passwords do not match';
    }

    for (let i = 0; i < 4; i += 1) {
      const field = Object.values(req)[i];
      const theKey = Object.keys(req)[i];
      if (Object.keys(req)[i] !== 'email' && field.trim().length < 6) {
        errors[theKey] = 'minimum of 6 characters word allowed';
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
   * Validates Login Input Fields
   * @description Ensures all inputs are validated when logging in
   * @param {object} req
   * @returns {object} isValid and errors
   * @memberof Helper
   */
  static loginValidation(req) {
    const errors = {};
    for (let i = 0; i < 2; i += 1) {
      const field = Object.values(req)[i];
      if (field === (undefined || null || '') || /^\s+$/.test(field)) {
        const theKey = Object.keys(req)[i];
        errors[theKey] = 'This field is required';
      }
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   * Validates Email
   * @description Ensures email supplied is a valid email address
   * @param {any} email
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
    return re.test(email);
  }
}

export default Helper;
