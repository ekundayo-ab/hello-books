/* eslint-env mocha */
import { assert } from 'chai';
import helper from '../helpers/index';
import helperUser from '../helpers/helperUser';
import helperBook from '../helpers/helperBook';

const isAdmin = helper.isAdmin;
const isDefined = helper.isDefined;
const inputValidation = helper.inputValidation;
const validateEmail = helper.validateEmail;

describe('Helper Functions', () => {
  describe('Checks if user is an Admin', () => {
    it('should return true if user an admin', () => {
      assert.equal(isAdmin(helperUser.user1), true);
    });
    it('should return false is user is a normal user', () => {
      assert.equal(isAdmin(helperUser.user2), false);
    });
  });
  describe('Checks if fields exists for book operations', () => {
    it('should return true since all book fields are present', () => {
      assert.equal(isDefined(helperBook.book1), true);
    });
    it('should return false since one field is missing', () => {
      assert.equal(isDefined(helperBook.book2), false);
    });
  });
  describe('Validates fields for book operations', () => {
    it('should raise no error since all field are valid', () => {
      assert.equal(inputValidation(helperBook.book1).isValid, true);
      assert.deepEqual(inputValidation(helperBook.book1).errors, {});
    });
    it('should raise error for isbn field which is invalid', () => {
      assert.equal(inputValidation(helperBook.book3).isValid, false);
      assert.equal(inputValidation(helperBook.book3).errors.isbn, 'This field is required');
    });
    it('should raise error for title field which is invalid', () => {
      assert.equal(inputValidation(helperBook.book4).isValid, false);
      assert.equal(inputValidation(helperBook.book4).errors.title, 'This field is required');
    });
    it('should raise error for author field which is invalid', () => {
      assert.equal(inputValidation(helperBook.book5).isValid, false);
      assert.equal(inputValidation(helperBook.book5).errors.author, 'This field is required');
    });
    it('should raise error for description field which is invalid', () => {
      assert.equal(inputValidation(helperBook.book6).isValid, false);
      assert.equal(inputValidation(helperBook.book6).errors.description, 'This field is required');
    });
    it('should raise error for quantity field which is invalid', () => {
      assert.equal(inputValidation(helperBook.book7).isValid, false);
      assert.equal(inputValidation(helperBook.book7).errors.quantity, 'This field is required');
    });
  });
  describe('Validates email for sign up & sign in', () => {
    it('should return true for ekprogs@gmail.com', () => {
      assert.equal(validateEmail(helperUser.user1.decoded.data.email), true);
    });
    it('should return false for ekprogs', () => {
      assert.equal(validateEmail(helperUser.user3.decoded.data.email), false);
    });
    it('should return false for ekprogs@gmail', () => {
      assert.equal(validateEmail(helperUser.user4.decoded.data.email), false);
    });
  });
});

