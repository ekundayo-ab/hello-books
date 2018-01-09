import { assert } from 'chai';
import helper from '../helpers/Helper';
import helperUser from '../helpers/helperUser';
import helperBook from '../helpers/helperBook';

const {
  inputValidation,
  userValidation,
  validateEmail,
  validatePassForm,
  autoUpgradeJudge
} = helper;

describe('Helper methods', () => {
  describe('fields validation for book operations', () => {
    it('should return empty errors object for valid fields', () => {
      assert.equal(inputValidation(helperBook.book1).isValid, true);
      assert.deepEqual(inputValidation(helperBook.book1).errors, {});
    });
    it('should return error value for invalid isbn field ', () => {
      assert.equal(inputValidation(helperBook.book3).isValid, false);
      assert.equal(inputValidation(helperBook.book3)
        .errors.isbn, 'This field is required');
    });
    it('should return error value for invalid title field', () => {
      assert.equal(inputValidation(helperBook.book4).isValid, false);
      assert.equal(inputValidation(helperBook.book4)
        .errors.title, 'This field is required');
    });
    it('should return error value for invalid author field', () => {
      assert.equal(inputValidation(helperBook.book5).isValid, false);
      assert.equal(inputValidation(helperBook.book5)
        .errors.author, 'This field is required');
    });
    it('should return error value for invalid description field', () => {
      assert.equal(inputValidation(helperBook.book6).isValid, false);
      assert.equal(inputValidation(helperBook.book6)
        .errors.description, 'This field is required');
    });
    it('should return error value for invalid quantity field', () => {
      assert.equal(inputValidation(helperBook.book7).isValid, false);
      assert.equal(inputValidation(helperBook.book7)
        .errors.quantity, 'This field is required');
    });
    it('should return error value for isbn field not a number', () => {
      assert.equal(inputValidation(helperBook.book7a).isValid, false);
      assert.equal(inputValidation(helperBook.book7a)
        .errors.ISBNValidation, 'ISBN must be a number');
    });
    it('should return error value for quantity field not a number', () => {
      assert.equal(inputValidation(helperBook.book7b).isValid, false);
      assert.equal(inputValidation(helperBook.book7b)
        .errors.numeric, 'quantity must be a number');
    });
  });
  describe('field validation for email on signup or signin', () => {
    it('should return true for ekprogs@gmail.com', () => {
      assert.equal(validateEmail(helperUser.user3.email), true);
    });
    it('should return false for ekprogs', () => {
      assert.equal(validateEmail(helperUser.user4.email), false);
    });
    it('should return false for ekprogs@gmail', () => {
      assert.equal(validateEmail(helperUser.user5.email), false);
    });
  });
  describe('field validation for registration inputs', () => {
    it('should return an error for invalid username supplied', () => {
      assert.equal(userValidation(helperUser.user9a).isValid, false);
      assert.equal(userValidation(helperUser.user9a)
        .errors.username, 'One word, only letters or underscore');
    });
    it('should return error for username not supplied', () => {
      assert.equal(userValidation(helperUser.user9b).isValid, false);
      assert.equal(userValidation(helperUser.user9b)
        .errors.username, 'This field is required');
    });
    it('should return error for password mismatch', () => {
      assert.equal(userValidation(helperUser.user9c).isValid, false);
      assert.equal(userValidation(helperUser.user9c)
        .errors.password, 'Passwords do not match');
    });
    it('should not allow username less than 2 characters', () => {
      assert.equal(userValidation(helperUser.user9e).isValid, false);
      assert.equal(userValidation(helperUser.user9e)
        .errors.username, 'minimum of 2 characters word allowed');
    });
    it('should not allow password less than 6 characters', () => {
      assert.equal(userValidation(helperUser.user9f).isValid, false);
      assert.equal(userValidation(helperUser.user9f)
        .errors.password, 'minimum of 6 characters word allowed');
    });
  });
  describe('field validation for password change inputs', () => {
    it('should return an error for invalid inputs supplied', () => {
      assert.equal(validatePassForm(helperUser.user9d).isValid, false);
      assert.equal(validatePassForm(helperUser.user9d)
        .errors.oldPass, 'field required');
    });
    it('should return an error for password mismatch', () => {
      assert.equal(validatePassForm(helperUser.user9g).isValid, false);
      assert.equal(validatePassForm(helperUser.user9g)
        .errors.mismatch, 'Passwords do not match');
    });
  });
  describe('user upgrade eligibility', () => {
    it('should return silver update details', () => {
      assert.equal(autoUpgradeJudge(helperUser.upgradeToken1)
        .upgradeToken.levelName, 'silver');
      assert.equal(autoUpgradeJudge(helperUser.upgradeToken1)
        .upgradeToken.credit, 1);
    });
    it('should return gold update details', () => {
      assert.equal(autoUpgradeJudge(helperUser.upgradeToken2)
        .upgradeToken.levelName, 'gold');
      assert.equal(autoUpgradeJudge(helperUser.upgradeToken2)
        .upgradeToken.credit, 2);
    });
    it('should return unlimited update details', () => {
      assert.equal(autoUpgradeJudge(helperUser.upgradeToken3)
        .upgradeToken.levelName, 'unlimited');
      assert.equal(autoUpgradeJudge(helperUser.upgradeToken3)
        .upgradeToken.credit, 9000);
    });
  });
});

