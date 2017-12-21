import chai from 'chai';
import models from '../models/';
import helperUser from '../helpers/helperUser';
import helperBook from '../helpers/helperBook';

// Makes User model available globally in this fil
const User = models.User;
// Makes Book model available globally in this file
const Book = models.Book;
// Makes Borrow model available globally in this file
const Borrow = models.Borrow;
// Provides interface to ascertain expected results are true
const expect = chai.expect;
let userId;
let bookId;
let borrowId;

describe('Models', () => {
  before((done) => {
    // Purges Data already in the table after testing
    User.destroy({ where: {} });
    // Purges Data already in the table after testing
    Book.destroy({ where: {} });
    // Purges Data already in the table after testing
    Borrow.destroy({ where: {} });
    User.create(helperUser.user9)
      .then((user) => { userId = user.id; });
    Book.create(helperBook.book11);
    Book.create(helperBook.book14)
      .then((book) => { bookId = book.id; });
    done();
  });
  describe('User Model Operations', () => {
    it('should create a user', (done) => {
      User.create(helperUser.user6)
        .then((user) => {
          expect(user.username).to.equal(helperUser.user6.username);
          done();
        });
    });
    it('should raise validation error for unique username', (done) => {
      User.create(helperUser.user6)
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeUniqueConstraintError');
          expect(err.errors[0].message).to.equal('Username already taken');
          done();
        });
    });
    it('should raise validation error for unique email', (done) => {
      User.create(helperUser.user7)
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeUniqueConstraintError');
          expect(err.errors[0].message).to.equal('User with this email exists');
          done();
        });
    });
    it('should raise validation error for null values', (done) => {
      User.create(helperUser.user002) // This value does not exist
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeValidationError');
          expect(err.errors[0].message).to.equal('username cannot be null');
          expect(err.errors[1].message).to.equal('password cannot be null');
          expect(err.errors[2].message).to.equal('email cannot be null');
          done();
        });
    });
    it('should raise validation error for empty username', (done) => {
      User.create(helperUser.user8) // This value does not exist
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeValidationError');
          expect(err.errors[0].message)
            .to.equal('Validation is on username failed');
          done();
        });
    });
    it('should find user', (done) => {
      User.findOne({
        where: {
          email: helperUser.user6.email,
        },
      })
        .then((user) => {
          expect(user.username).to.equal(helperUser.user6.username);
          expect(user.email).to.equal(helperUser.user6.email);
          done();
        });
    });
    it('should list all users', (done) => {
      User.findAll()
        .then((user) => {
          expect(user[0].dataValues.username)
            .to.equal(helperUser.user9.username);
          expect(user[1].dataValues.username)
            .to.equal(helperUser.user6.username);
          done();
        });
    });
  });
  describe('Book Model Operations', () => {
    it('should create a book', (done) => {
      Book.create(helperBook.book8)
        .then((book) => {
          expect(book.isbn).to.equal(helperBook.book8.isbn);
          done();
        });
    });
    it('should raise error for unique isbn of book', (done) => {
      Book.create(helperBook.book8)
        .then((book) => {
          expect(book.isbn).to.equal(helperBook.book8.isbn);
        }).catch((err) => {
          expect(err.name).to.equal('SequelizeUniqueConstraintError');
          expect(err.errors[0].message).to.equal('isbn must be unique');
          done();
        });
    });
    it('should raise validation error for null values', (done) => {
      Book.create(helperBook.book234) // This value does not exist
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
    it('should raise validation error for invalid value in isbn', (done) => {
      Book.create(helperBook.book9) // This value does not exist
        .then()
        .catch((err) => {
          expect(err.name)
            .to.equal('SequelizeDatabaseError');
          expect(err.message)
            .to.equal('invalid input syntax for integer: "number"');
          done();
        });
    });
    it('should raise validation error for invalid value in quantity',
      (done) => {
        Book.create(helperBook.book10) // This value does not exist
          .then()
          .catch((err) => {
            expect(err.name).to.equal('SequelizeDatabaseError');
            expect(err.message)
              .to.equal('invalid input syntax for integer: "number"');
            done();
          });
      });
    it('should find a book', (done) => {
      Book.findOne({
        where: {
          isbn: helperBook.book8.isbn,
        },
      })
        .then((book) => {
          expect(book.isbn).to.equal(helperBook.book8.isbn);
          done();
        });
    });
    it('should list all books', (done) => {
      Book.findAll()
        .then((book) => {
          expect(book[1].dataValues.isbn).to.equal(helperBook.book14.isbn);
          done();
        });
    });
    it('should update a book', (done) => {
      Book.update({
        isbn: 4,
        title: 'Learn Haskell Edition 2017',
        author: 'New Man',
        description: 'Learn Haskell and be happy',
        quantity: 90 }, { where: { isbn: helperBook.book8.isbn } })
        .then((book) => {
          expect(book[0]).to.equal(1);
          done();
        });
    });
    it('should raise error for unique isbn of book', (done) => {
      Book.update(helperBook.book11, { where: { isbn: 4 } })
        .then().catch((err) => {
          expect(err.name).to.equal('SequelizeUniqueConstraintError');
          expect(err.errors[0].message).to.equal('isbn must be unique');
          done();
        });
    });
    it('should raise validation error for null values', (done) => {
      Book.update(helperBook.book12, { where: { isbn: helperBook.book8.isbn } })
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
    it('should raise validation error for undefined values', (done) => {
      Book.update(helperBook.book13, { where: { isbn: helperBook.book8.isbn } })
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
    it('should raise validation error for invalid value in isbn', (done) => {
      Book.update(helperBook.book9, { where: { isbn: helperBook.book8.isbn } })
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeDatabaseError');
          expect(err.message)
            .to.equal('invalid input syntax for integer: "number"');
          done();
        });
    });
    it('should raise validation error for invalid value in isbn', (done) => {
      Book.update(helperBook.book10, { where: { isbn: helperBook.book8.isbn } })
        .then()
        .catch((err) => {
          expect(err.name).to.equal('SequelizeDatabaseError');
          expect(err.message)
            .to.equal('invalid input syntax for integer: "number"');
          done();
        });
    });
    it('should delete a book', (done) => {
      Book.destroy({ where: { isbn: helperBook.book11.isbn } })
        .then((book) => {
          expect(book).to.equal(1);
          done();
        });
    });
    it('should give zero rows if book not found', (done) => {
      Book.destroy({ where: { isbn: helperBook.book8.isbn } })
        .then((book) => {
          expect(book).to.equal(0);
          done();
        });
    });
  });
  describe('Borrow Model Operations', () => {
    it('should create a borrow record', (done) => {
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
    it('should raise error for no foreign key of book', (done) => {
      Borrow.create({
        userId,
        bookId: 76,
        returned: false,
        dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
        actualReturnDate: Date.now(),
      }).then().catch((err) => {
        expect(err.name).to.equal('SequelizeForeignKeyConstraintError');
        expect(err.message)
          .to.equal('insert or update on table "Borrows"' +
          ' violates foreign key constraint "Borrows_bookId_fkey"');
        done();
      });
    });
    it('should raise error for no foreign key of user', (done) => {
      Borrow.create({
        userId: 30,
        bookId,
        returned: false,
        dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)),
        actualReturnDate: Date.now(),
      }).then().catch((err) => {
        expect(err.name).to.equal('SequelizeForeignKeyConstraintError');
        expect(err.message)
          .to.equal('insert or update on table "Borrows"' +
          ' violates foreign key constraint "Borrows_userId_fkey"');
        done();
      });
    });
    it('should update a borrow record', (done) => {
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
    it('should find a borrow record', (done) => {
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
    it('should list all borrow records', (done) => {
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
