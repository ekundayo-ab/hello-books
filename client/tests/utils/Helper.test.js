import Helper from '../../src/helpers/Helper';
import * as testData from '../__mocks__/testData';

const {
  userValidation,
  loginValidation,
  inputValidation,
  validateEmail,
  handleFormChange
} = Helper;

describe('Helper Functions', () => {
  describe('SignUp form validation', () => {
    it('should return errors with isValid false for invalid inputs', () => {
      expect(userValidation(testData.req).isValid).toEqual(false);
      expect(userValidation(testData.req).errors.all)
        .toEqual('username, email or password must be present');
      expect(userValidation(testData.req).errors.username)
        .toEqual('One word, only letters or underscore');
      expect(userValidation(testData.req).errors.password)
        .toEqual('Passwords do not match');
      expect(userValidation(testData.req1).isValid).toEqual(false);
      expect(userValidation(testData.req1).errors.username)
        .toEqual('minimum of 2 characters word allowed');
      expect(userValidation(testData.req1).errors.password)
        .toEqual('minimum of 6 characters word allowed');
      expect(userValidation(testData.req1).errors.passwordConfirmation)
        .toEqual('minimum of 6 characters word allowed');
      expect(userValidation(testData.req2).errors.username)
        .toEqual('This field is required');
      expect(userValidation(testData.req2).errors.email)
        .toEqual('This field is required');
      expect(userValidation(testData.req2).errors.password)
        .toEqual('This field is required');
      expect(userValidation(testData.req2).errors.passwordConfirmation)
        .toEqual('This field is required');
    });


    it('should return no errors and isValid true for valid inputs', () => {
      expect(userValidation(testData.req3).isValid).toEqual(true);
      expect(userValidation(testData.req3).errors).toEqual({});
    });
  });

  describe('Login form validation', () => {
    it('should return errors with isValid false for invalid inputs', () => {
      expect(loginValidation(testData.req4).isValid).toEqual(false);
      expect(loginValidation(testData.req4).errors.all)
        .toEqual('Check your username or email.');
      expect(loginValidation(testData.req4).errors.identifier)
        .toEqual('This field is required');
      expect(loginValidation(testData.req4).errors.password)
        .toEqual('This field is required');
    });
    it('should return no errors and isValid true for valid inputs', () => {
      expect(loginValidation(testData.req5).isValid).toEqual(true);
      expect(loginValidation(testData.req5).errors).toEqual({});
    });
  });

  describe('Book form validation', () => {
    it('should return errors with isValid false for invalid inputs', () => {
      expect(inputValidation(testData.req6).isValid).toEqual(false);
      expect(inputValidation(testData.req6).errors.all)
        .toEqual('All required fields must exist');
      expect(inputValidation(testData.req6).errors.ISBNValidation)
        .toEqual('ISBN must be a number');
      expect(inputValidation(testData.req6).errors.numeric)
        .toEqual('quantity must be a number');
      expect(inputValidation(testData.req6).errors.author)
        .toEqual('This field is required');
    });
    it('should return no errors and isValid true for valid inputs', () => {
      expect(inputValidation(testData.req7).isValid).toEqual(true);
      expect(inputValidation(testData.req7).errors).toEqual({});
    });
  });

  describe('Email validation', () => {
    it('should return false if email is invalid', () => {
      expect(validateEmail(testData.req2.email)).toEqual(false);
    });
    it('should return true if email is valid', () => {
      expect(validateEmail(testData.req1.email)).toEqual(true);
    });
  });

  describe('Form change handle', () => {
    const state = {
      errors: {}
    };
    const event = {
      target: { name: 'isbn', value: 10 }
    };
    it('should return filled field value and delete span error', () => {
      expect(handleFormChange(state, event))
        .toEqual({ ...state, [event.target.name]: event.target.value });
    });

    it('should return field value', () => {
      state.errors.isbn = 'This field is required';
      expect(handleFormChange(state, event))
        .toEqual({ [event.target.name]: event.target.value });
    });
  });
});

