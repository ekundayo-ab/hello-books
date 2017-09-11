import { isEmpty } from 'lodash';
/**
 *
 * @description Abstracts validation functions
 * @class Helper
 */
class Helper {
  /**
   *
   * @description Ensures Admin priviledges to perform certain operations
   * @static
   * @param {any} req
   * @returns true or false
   *
   * @memberOf Helper
   */
  static isAdmin(req) {
    if (req.decoded.data.role !== 'admin') {
      return false;
    }
    return true;
  }

  /**
   *
   * @description Ensures all fields are present when adding or updating book
   * @static
   * @param {any} req
   * @returns true or false
   *
   * @memberOf Helper
   */
  static isDefined(req) {
    if (Object.keys(req.body).length < 5) return false;
    return true;
  }

  /**
   *
   * @description Ensures all inputs are validated
   * @static
   * @param {any} req
   * @returns isValid and errors
   *
   * @memberOf Helper
   */
  static inputValidation(req) {
    const errors = {};
    for (let i = 0; i < 5; i += 1) {
      const field = Object.values(req.body)[i];
      if (field === (undefined || null || '') || /^\s+$/.test(field)) {
        const theKey = Object.keys(req.body)[i]; // eslint-disable-line no-unused-vars
        errors[theKey] = 'This field is required';
      }
      if (Object.keys(req.body)[i] === 'quantity' && typeof (parseInt(Object.values(req.body)[i], 10)) !== 'number') {
        errors.numeric = 'quantity must be a number';
      }
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   *
   * @description Ensures all inputs are validated
   * @static
   * @param {any} req
   * @returns isValid and errors
   *
   * @memberOf Helper
   */
  static userValidation(req) {
    const errors = {};
    for (let i = 0; i < 4; i += 1) {
      const field = Object.values(req)[i];
      if (field === (undefined || null || '') || /^\s+$/.test(field)) {
        const theKey = Object.keys(req)[i]; // eslint-disable-line no-unused-vars
        errors[theKey] = 'This field is required';
      }
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   *
   *
   * @static
   * @description Ensures email supplied is a valid email address
   * @param {any} email
   * @returns {boolean} true or false
   *
   * @memberOf Helper
   */
  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}

export default Helper;
