import chai from 'chai';
import models from '../models/';
import helperUser from '../helpers/helperUser';
import helperBook from '../helpers/helperBook';

const User = models.User;
const Book = models.Book;
const Borrow = models.Borrow;
const expect = chai.expect;
let userId;
let bookId;
let borrowId;

describe('Models', () => {
  before((done) => {
    User.destroy({ where: {} });
    Book.destroy({ where: {} });
    Borrow.destroy({ where: {} });
    User.create(helperUser.ninthUser)
      .then((user) => { userId = user.id; });
    Book.create(helperBook.eleventhBook);
    Book.create(helperBook.fourteenthBook)
      .then((book) => { bookId = book.id; });
    done();
  });
  describe('User model', () => {
    it('should return new user if it was successfully created', (done) => {
      User.create(helperUser.sixthUser)
        .then((user) => {
          expect(user.username).to.equal(helperUser.sixthUser.username);
          done();
        });
    });
    it('should return validation error message if new username already exists',
      (done) => {
        User.create(helperUser.sixthUser)
          .then()
          .catch((err) => {
            expect(err.name).to.equal('SequelizeUniqueConstraintError');
            expect(err.errors[0].message).to.equal('Username already taken');
            done();
          });
      });
    it('should return validation error message if new email already exists',
      (done) => {
        User.create(helperUser.seventhUser)
          .then()
          .catch((err) => {
            expect(err.name).to.equal('SequelizeUniqueConstraintError');
            expect(err.errors[0].message)
              .to.equal('User with this email exists');
            done();
          });
      });
    it('should return validation error message for null inputed values',
      (done) => {
        User.create(helperUser.userNotExisting) // This value does not exist
          .then()
          .catch((err) => {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].message).to.equal('username cannot be null');
            expect(err.errors[1].message).to.equal('password cannot be null');
            expect(err.errors[2].message).to.equal('email cannot be null');
            done();
          });
      });
    it('should return validation error message if supplied username is empty',
      (done) => {
        User.create(helperUser.eighthUser) // This value does not exist
          .then()
          .catch((err) => {
            expect(err.name).to.equal('SequelizeValidationError');
            expect(err.errors[0].message)
              .to.equal('Validation is on username failed');
            done();
          });
      });
    it('should return found user if it was successfully found', (done) => {
      User.findOne({
        where: {
          email: helperUser.sixthUser.email,
        },
      })
        .then((user) => {
          expect(user.username).to.equal(helperUser.sixthUser.username);
          expect(user.email).to.equal(helperUser.sixthUser.email);
          done();
        });
    });
    it('should return list of all users', (done) => {
      User.findAll()
        .then((user) => {
          expect(user[0].dataValues.username)
            .to.equal(helperUser.ninthUser.username);
          expect(user[1].dataValues.username)
            .to.equal(helperUser.sixthUser.username);
          done();
        });
    });
  });
  describe('Book model methods', () => {
    it('should return new book if it was successfully created', (done) => {
      Book.create(helperBook.eightBook)
        .then((book) => {
          expect(book.isbn).to.equal(helperBook.eightBook.isbn);
          done();
        });
    });
    it('should return error message if new book isbn already exists',
      (done) => {
        Book.create(helperBook.eightBook)
          .then((book) => {
            expect(book.isbn).to.equal(helperBook.eightBook.isbn);
          }).catch((err) => {
            expect(err.name).to.equal('SequelizeUniqueConstraintError');
            expect(err.errors[0].message).to.equal('isbn must be unique');
            done();
          });
      });
    it('should return validation error if null values are supplied', (done) => {
      Book.create(helperBook.bookNotExisting) // This value does not exist
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeValidationError');
          expect(err.errors[0].message).to.equal('isbn cannot be null');
          expect(err.errors[1].message).to.equal('title cannot be null');
          expect(err.errors[2].message).to.equal('author cannot be null');
          expect(err.errors[3].message).to.equal('description cannot be null');
          expect(err.errors[4].message).to.equal('quantity cannot be null');
          done();
        });
    });
    it('should return validation error if inputted isbn is invalid', (done) => {
      Book.create(helperBook.ninthBook) // This value does not exist
        .then()
        .catch((err) => {
          expect(err.name)
            .to.equal('SequelizeDatabaseError');
          expect(err.message)
            .to.equal('invalid input syntax for integer: "number"');
          done();
        });
    });
    it('should return validation error if inputted quantity is invalid',
      (done) => {
        Book.create(helperBook.tenthBook) // This value does not exist
          .then()
          .catch((err) => {
            expect(err.name).to.equal('SequelizeDatabaseError');
            expect(err.message)
              .to.equal('invalid input syntax for integer: "number"');
            done();
          });
      });
    it('should return found book if it was successfully found', (done) => {
      Book.findOne({
        where: {
          isbn: helperBook.eightBook.isbn,
        },
      })
        .then((book) => {
          expect(book.isbn).to.equal(helperBook.eightBook.isbn);
          done();
        });
    });
    it('should return list of all books', (done) => {
      Book.findAll()
        .then((book) => {
          expect(book[1].dataValues.isbn)
            .to.equal(helperBook.fourteenthBook.isbn);
          done();
        });
    });
    it('should return updated book if book was successfully updated',
      (done) => {
        Book.update({
          isbn: 4,
          title: 'Learn Haskell Edition 2017',
          author: 'New Man',
          description: 'Learn Haskell and be happy',
          quantity: 90 }, { where: { isbn: helperBook.eightBook.isbn } })
          .then((book) => {
            expect(book[0]).to.equal(1);
            done();
          });
      });
    it('should return error if supplied isbn of book already exists',
      (done) => {
        Book.update(helperBook.eleventhBook, { where: { isbn: 4 } })
          .then().catch((err) => {
            expect(err.name).to.equal('SequelizeUniqueConstraintError');
            expect(err.errors[0].message).to.equal('isbn must be unique');
            done();
          });
      });
    it('should return validation error for null inputted values', (done) => {
      Book.update(helperBook.twelfthBook,
        { where: { isbn: helperBook.eightBook.isbn } })
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeValidationError');
          expect(err.errors[0].message).to.equal('isbn cannot be null');
          expect(err.errors[1].message).to.equal('title cannot be null');
          expect(err.errors[2].message).to.equal('author cannot be null');
          expect(err.errors[3].message).to.equal('description cannot be null');
          expect(err.errors[4].message).to.equal('quantity cannot be null');
          done();
        });
    });
    it('should return validation error for undefined input values', (done) => {
      Book.update(helperBook.thirteenthBook,
        { where: { isbn: helperBook.eightBook.isbn } })
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeValidationError');
          expect(err.errors[0].message).to.equal('isbn cannot be null');
          expect(err.errors[1].message).to.equal('title cannot be null');
          expect(err.errors[2].message).to.equal('author cannot be null');
          expect(err.errors[3].message).to.equal('description cannot be null');
          expect(err.errors[4].message).to.equal('quantity cannot be null');
          done();
        });
    });
    it('should return validation error if supplied isbn is invalid', (done) => {
      Book.update(helperBook.ninthBook,
        { where: { isbn: helperBook.eightBook.isbn } })
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeDatabaseError');
          expect(err.message)
            .to.equal('invalid input syntax for integer: "number"');
          done();
        });
    });
    it('should return validation error if supplied isbn is invalid', (done) => {
      Book.update(helperBook.tenthBook,
        { where: { isbn: helperBook.eightBook.isbn } })
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeDatabaseError');
          expect(err.message)
            .to.equal('invalid input syntax for integer: "number"');
          done();
        });
    });
    it('should return one on successful book deletion', (done) => {
      Book.destroy({ where: { isbn: helperBook.eleventhBook.isbn } })
        .then((book) => {
          expect(book).to.equal(1);
          done();
        });
    });
    it('should return zero rows if book is not found', (done) => {
      Book.destroy({ where: { isbn: helperBook.eightBook.isbn } })
        .then((book) => {
          expect(book).to.equal(0);
          done();
        });
    });
  });
  describe('Borrow model methods', () => {
    it('should return new borrow record if it was successfully created',
      (done) => {
        Borrow.create({
          userId,
          bookId,
          returned: false,
          dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
          actualReturnDate: Date.now(),
        }).then((borrow) => {
          expect(borrow.userId).to.equal(userId);
          expect(borrow.bookId).to.equal(bookId);
          borrowId = borrow.id;
          done();
        });
      });
    it('should return error if no foreign key of book exists', (done) => {
      Borrow.create({
        userId,
        bookId: 76,
        returned: false,
        dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
        actualReturnDate: Date.now(),
      }).then().catch((err) => {
        expect(err.name).to.equal('SequelizeForeignKeyConstraintError');
        expect(err.message)
          .to.equal('insert or update on table "Borrows" violates foreign key constraint "Borrows_bookId_fkey"');
        done();
      });
    });
    it('should return error if no foreign key of user exists', (done) => {
      Borrow.create({
        userId: 30,
        bookId,
        returned: false,
        dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
        actualReturnDate: Date.now(),
      }).then().catch((err) => {
        expect(err.name).to.equal('SequelizeForeignKeyConstraintError');
        expect(err.message)
          .to.equal('insert or update on table "Borrows" violates foreign key constraint "Borrows_userId_fkey"');
        done();
      });
    });
    it('should return updated borrowed record', (done) => {
      Borrow.update({
        returned: true,
        dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
        actualReturnDate: Date.now(),
      }, {
        where: {
          id: borrowId,
        },
      }).then((updated) => {
        expect(updated[0]).to.equal(1);
        done();
      });
    });
    it('should return one borrow record', (done) => {
      Borrow.findOne({
        where: {
          id: borrowId,
        },
      }).then((found) => {
        expect(found.userId).to.equal(userId);
        expect(found.bookId).to.equal(bookId);
        done();
      });
    });
    it('should return list of all borrow records', (done) => {
      Borrow.findAll({
        where: {
          userId,
        },
      }).then((found) => {
        expect(found[0].dataValues.userId).to.equal(userId);
        expect(found[0].dataValues.bookId).to.equal(bookId);
        done();
      });
    });
  });
});
