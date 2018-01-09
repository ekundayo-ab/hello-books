/**
 * @description represents logics used in validating inputs
 * when updating or creating a book
 *
 * @class Validators
 */
class Validators {
  /**
   * @description validates some input fields for the form
   *
   * @param {object} formState - state data in the form
   *
   * @returns {object} - This contains errors and isvalid which is a boolean
   *
   * @memberof Validators
   */
  static validateBookForm(formState) {
    const errors = {};
    const isbnField = `${formState.isbn}`;
    if (isbnField.trim() === '' || isNaN(formState.isbn)) {
      errors.isbn = 'Can\'t be empty and must be number';
    }
    if (formState.title.trim() === '') errors.title = 'Can\'t be empty';
    if (formState.author.trim() === '') errors.author = 'Can\'t be empty';
    if (formState.quantity === '' || isNaN(formState.quantity)) {
      errors.quantity = 'Can\'t be empty and must be number';
    }
    if (formState.description.trim() === '') {
      errors.description = 'Can\'t be empty';
    }
    if (formState.category.toString().trim() === '') {
      errors.category = 'Can\'t be empty';
    }
    const isValid = Object.keys(errors).length === 0;
    return { isValid, errors };
  }

  /**
   * @description validates some input fields for the form
   *
   * @param {object} formState - state data in the form
   *
   * @returns {object} - This contains errors and isvalid a boolean
   *
   * @memberof Validators
   */
  static validatePassForm(formState) {
    const { oldPass, newPass, newPassConfirm } = formState;
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
}

export default Validators;
