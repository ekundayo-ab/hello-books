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
      assert.equal(inputValidation(helperBook.firstBook).isValid, true);
      assert.deepEqual(inputValidation(helperBook.firstBook).errors, {});
    });
    it('should return error value for invalid isbn field ', () => {
      assert.equal(inputValidation(helperBook.thirdBook).isValid, false);
      assert.equal(inputValidation(helperBook.thirdBook)
        .errors.isbn, 'This field is required');
    });
    it('should return error value for invalid title field', () => {
      assert.equal(inputValidation(helperBook.fourthBook).isValid, false);
      assert.equal(inputValidation(helperBook.fourthBook)
        .errors.title, 'This field is required');
    });
    it('should return error value for invalid author field', () => {
      assert.equal(inputValidation(helperBook.fifthBook).isValid, false);
      assert.equal(inputValidation(helperBook.fifthBook)
        .errors.author, 'This field is required');
    });
    it('should return error value for invalid description field', () => {
      assert.equal(inputValidation(helperBook.sixthBook).isValid, false);
      assert.equal(inputValidation(helperBook.sixthBook)
        .errors.description, 'This field is required');
    });
    it('should return error value for invalid quantity field', () => {
      assert.equal(inputValidation(helperBook.seventhBook).isValid, false);
      assert.equal(inputValidation(helperBook.seventhBook)
        .errors.quantity, 'This field is required');
    });
    it('should return error value for isbn field not a number', () => {
      assert.equal(inputValidation(helperBook.seventhBookVariantOne)
        .isValid, false);
      assert.equal(inputValidation(helperBook.seventhBookVariantOne)
        .errors.ISBNValidation, 'ISBN must be a number');
    });
    it('should return error value for quantity field not a number', () => {
      assert.equal(inputValidation(helperBook.seventhBookVariantTwo)
        .isValid, false);
      assert.equal(inputValidation(helperBook.seventhBookVariantTwo)
        .errors.numeric, 'quantity must be a number');
    });
  });
  describe('field validation for email on sign-up or sign-in', () => {
    it('should return true for ekprogs@gmail.com', () => {
      assert.equal(validateEmail(helperUser.thirdUser.email), true);
    });
    it('should return false for ekprogs', () => {
      assert.equal(validateEmail(helperUser.fourthUser.email), false);
    });
    it('should return false for ekprogs@gmail', () => {
      assert.equal(validateEmail(helperUser.fifthUser.email), false);
    });
  });
  describe('field validation for registration inputs', () => {
    it('should return an error for invalid username supplied', () => {
      assert.equal(userValidation(helperUser.ninthUserVariantOne)
        .isValid, false);
      assert.equal(userValidation(helperUser.ninthUserVariantOne)
        .errors.username, 'One word, only letters or underscore');
    });
    it('should return error for username not supplied', () => {
      assert.equal(userValidation(helperUser.ninthUserVariantTwo)
        .isValid, false);
      assert.equal(userValidation(helperUser.ninthUserVariantTwo)
        .errors.username, 'This field is required');
    });
    it('should return error for password mismatch', () => {
      assert.equal(userValidation(helperUser.ninthUserVariantThree)
        .isValid, false);
      assert.equal(userValidation(helperUser.ninthUserVariantThree)
        .errors.password, 'Passwords do not match');
    });
    it('should not allow username less than 2 characters', () => {
      assert.equal(userValidation(helperUser.ninthUserVariantFive)
        .isValid, false);
      assert.equal(userValidation(helperUser.ninthUserVariantFive)
        .errors.username, 'minimum of 2 characters word allowed');
    });
    it('should not allow password less than 6 characters', () => {
      assert.equal(userValidation(helperUser.ninthUserVariantSix)
        .isValid, false);
      assert.equal(userValidation(helperUser.ninthUserVariantSix)
        .errors.password, 'minimum of 6 characters word allowed');
    });
  });
  describe('field validation for password change inputs', () => {
    it('should return an error for invalid inputs supplied', () => {
      assert.equal(validatePassForm(helperUser.ninthUserVariantFour)
        .isValid, false);
      assert.equal(validatePassForm(helperUser.ninthUserVariantFour)
        .errors.oldPass, 'field required');
    });
    it('should return an error for password mismatch', () => {
      assert.equal(validatePassForm(helperUser.ninthUserVariantSeven)
        .isValid, false);
      assert.equal(validatePassForm(helperUser.ninthUserVariantSeven)
        .errors.mismatch, 'Passwords do not match');
    });
  });
  describe('user upgrade eligibility', () => {
    it('should return silver update details', () => {
      assert.equal(autoUpgradeJudge(helperUser.firstUpgradeToken)
        .upgradeToken.levelName, 'silver');
      assert.equal(autoUpgradeJudge(helperUser.firstUpgradeToken)
        .upgradeToken.credit, 1);
    });
    it('should return gold update details', () => {
      assert.equal(autoUpgradeJudge(helperUser.secondUpgradeToken)
        .upgradeToken.levelName, 'gold');
      assert.equal(autoUpgradeJudge(helperUser.secondUpgradeToken)
        .upgradeToken.credit, 2);
    });
    it('should return unlimited update details', () => {
      assert.equal(autoUpgradeJudge(helperUser.thirdUpgradeToken)
        .upgradeToken.levelName, 'unlimited');
      assert.equal(autoUpgradeJudge(helperUser.thirdUpgradeToken)
        .upgradeToken.credit, 9000);
    });
  });
});

