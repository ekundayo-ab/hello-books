import { isEmpty } from 'lodash';
/**
 * @class Helper
 *
 * @description Abstracts validation functions
 */
class Helper {
  /**
   * Also Validates Book Input Fields
   *
   * @description Ensures all inputs are validated
   *
   * @param {object} req - The request payload sent to the function
   *
   * @returns {object } isValid and errors
   *
   * @memberOf Helper
   */
  static inputValidation(req) {
    const { isbn, title, author, quantity, description, category } = req.body;
    const errors = {};
    if (!isbn || !title || !author || !quantity || !description || !category) {
      errors.all = 'All required fields must exist';
    }
    for (let i = 0; i < 5; i += 1) {
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
    }
    return {
      isValid: isEmpty(errors),
      errors,
    };
  }

  /**
   * Validates Register Input Fields
   *
   * @description Ensures all inputs are validated when registering
   *
   * @param {object} req - The request payload sent to the function
   *
   * @returns {object} isValid and errors
   *
   * @memberOf Helper
   */
  static userValidation(req) {
    const { username, email, password, passwordConfirmation } = req;
    const errors = {};
    if (!username || !email || !password || !passwordConfirmation) {
      errors.all = 'username, email or password must be present';
    }
    if (!/^[a-z_]+$/i.test(req.username)) {
      errors.username = 'One word, only letters or underscore';
    }

    if (req.password !== req.passwordConfirmation) {
      errors.password = 'Passwords do not match';
    }

    for (let i = 0; i < 4; i += 1) {
      const field = Object.values(req)[i];
      const theKey = Object.keys(req)[i];
      if (Object.keys(req)[i] === 'password' && field.trim().length < 6) {
        errors[theKey] = 'minimum of 6 characters word allowed';
      }
      if (Object.keys(req)[i] === 'passwordConfirmation'
        && field.trim().length < 6) {
        errors[theKey] = 'minimum of 6 characters word allowed';
      }
      if (Object.keys(req)[i] === 'username' && field.trim().length < 2) {
        errors[theKey] = 'minimum of 2 characters word allowed';
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
   *
   * @description Ensures all inputs are validated when logging in
   *
   * @param {object} req - The request payload sent to the function
   *
   * @returns {object} isValid and errors
   *
   * @memberof Helper
   */
  static loginValidation(req) {
    const { identifier, password } = req;
    const errors = {};
    if (!identifier || !password) {
      errors.all = 'Check your username or email.';
    }
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
   *
   * @description Ensures email supplied is a valid email address
   *
   * @param {string} email - The email to be validated
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
   * Validates Email
   *
   * @description Ensures email supplied is a valid email address
   *
   * @param {object} state - The current state sent to the function
   * @param {object} event - The current event being executed
   *
   * @returns {boolean} true or false
   * @memberOf Helper
   */
  static handleFormChange(state, event) {
    if (!state.errors[event.target.name]) {
      const errors = Object.assign({}, state.errors);
      delete errors[event.target.name];
      return {
        [event.target.name]: event.target.value,
        errors,
      };
    }
    return { [event.target.name]: event.target.value };
  }
}

export default Helper;
