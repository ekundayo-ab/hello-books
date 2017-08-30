// import supertest from 'supertest';
// import chai from 'chai';
// import models from '../models/';
// import helperUser from '../helpers/helperUser';

// const User = models.User; // Makes User model available globally in this file
// const Book = models.Book; // Makes Book model available globally in this file
// const Borrow = models.Borrow; // Makes Borrow model available globally in this file
// const expect = chai.expect; // Provides interface to ascertain expected results are true

// describe('Models', () => {
//   after((done) => {
//     User.destroy({ where: {} }); // Purges Data already in the table after testing
//     Book.destroy({ where: {} }); // Purges Data already in the table after testing
//     Borrow.destroy({ where: {} }); // Purges Data already in the table after testing
//     done();
//   });
//   describe('User Model Operations', () => {
//     it('should create a user', (done) => {
//       User.create(helperUser.user5)
//         .then((user) => {
//           expect(user.username).to.equal(helperUser.user5.username);
//           done();
//         });
//     });
//     it('should create another user', (done, err) => {
//       User.create(helperUser.user6)
//         .then((user) => {
//           expect(user.username).to.equal(helperUser.user6.username);
//           done();
//         });
//     });
//     it('should raise validation error for unique username', (done) => {
//       User.create(helperUser.user6)
//         .then()
//         .catch((err) => {
//           expect(err.name).to.equal('SequelizeUniqueConstraintError');
//           expect(err.errors[0].message).to.equal('username must be unique');
//           done();
//         });
//     });
//     it('should raise validation error for unique email', (done) => {
//       User.create(helperUser.user7)
//         .then()
//         .catch((err) => {
//           expect(err.name).to.equal('SequelizeUniqueConstraintError');
//           expect(err.errors[0].message).to.equal('email must be unique');
//           done();
//         });
//     });
//     it('should raise validation error for null values', (done) => {
//       User.create(helperUser.user002) // This value does not exist
//         .then()
//         .catch((err) => {
//           expect(err.name).to.equal('SequelizeValidationError');
//           expect(err.errors[0].message).to.equal('username cannot be null');
//           expect(err.errors[1].message).to.equal('password cannot be null');
//           expect(err.errors[2].message).to.equal('email cannot be null');
//           done();
//         });
//     });
//     it('should raise validation error for empty username', (done) => {
//       User.create(helperUser.user8) // This value does not exist
//         .then()
//         .catch((err) => {
//           expect(err.name).to.equal('SequelizeValidationError');
//           expect(err.errors[0].message).to.equal('Validation is on username failed');
//           done();
//         });
//     });
//     it('should find user', (done) => {
//       User.findOne({
//         where: {
//           email: helperUser.user5.email,
//         },
//       })
//         .then((user) => {
//           expect(user.username).to.equal(helperUser.user5.username);
//           expect(user.email).to.equal(helperUser.user5.email);
//           done();
//         });
//     });
//     it('should list all users', (done) => {
//       User.findAll()
//         .then((user) => {
//           expect(user[0].dataValues.username).to.equal(helperUser.user5.username);
//           expect(user[1].dataValues.username).to.equal(helperUser.user6.username);
//           done();
//         });
//     });
//   });
// });
