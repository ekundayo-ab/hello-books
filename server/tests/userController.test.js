import supertest from 'supertest';
import chai from 'chai';
import bcrypt from 'bcrypt';
import app from '../../app';
import model from '../models';
import helperBeforeHooks from './../helpers/helperBeforeHooks';

const User = model.User;
const expect = chai.expect;
let adminUserToken;
let normalUserToken;
let specificUserToken;

const server = supertest.agent(app);
describe('AUTHENTICATION & USER Operations', () => {
  helperBeforeHooks.clearDatabaseTables();
  describe('A Typical User registration', () => {
    it('should return seeded admin user', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'ekundayo',
          email: 'ekprogs@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
          role: 'admin',
        })
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Hi ekundayo, registration successful!');
          expect(res.status).to.equal(201);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.username).to.equal('ekundayo');
          expect(res.body.user.email).to.equal('ekprogs@gmail.com');
          expect(res.body.user.role).to.equal('admin');
          done();
        });
    });
    it('should return created user', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'bootcamp@gmail.com',
          password: '654321',
          passwordConfirmation: '654321',
        })
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Hi bootcamp, registration successful!');
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.username).to.equal('bootcamp');
          expect(res.body.user.email).to.equal('bootcamp@gmail.com');
          expect(res.body.user.role).to.equal('normal');
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should return error message for invalid required fields', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          usename: 'ekundayo',
          mail: 'ekprogs@gmail.com',
          pasword: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Check your username, email or password and try again!');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return error message for invalid email', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'testuser',
          email: 'testuser',
          password: 'testuser',
          passwordConfirmation: 'testuser',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message.email)
            .to.equal('Invalid email address, try again');
          done();
        });
    });

    it('should return error message if email exists', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'spartan',
          email: 'bootcamp@gmail.com',
          password: '654321',
          passwordConfirmation: '654321',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('User with this email exists');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should return error message if username exists', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'spartan@gmail.com',
          password: '654321',
          passwordConfirmation: '654321',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Username already taken');
          expect(res.status).to.equal(409);
          done();
        });
    });
  });

  describe('A typical User Logging In', () => {
    it('should return error message for no required fields', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          idenfir: 'ekundayo',
          email: 'ekprogs@gmail.com',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message)
            .to.equal('Check your username or email.');
          done();
        });
    });

    it('should return success message and token for normal user', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'bootcamp',
          password: '654321',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Hi bootcamp, you are logged in');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should return success message and token for admin user', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayo',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Hi ekundayo, you are logged in');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          adminUserToken = res.body.token;
          done();
        });
    });
    it('should return error message for wrong email or password', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayo',
          password: 'wrongpass',
        })
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Authentication failed, check password or email');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return error message if user does not exist', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayoguy',
          password: 'dayo',
        })
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Authentication failed. User does not exist');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return success message and token for google signup', (done) => {
      server
        .post('/api/v1/auth/google')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'emmanuel',
          email: 'ekundayo.abiona@andela.com',
          password: 'ekundayo',
          passwordConfirmation: 'ekundayo',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message)
            .to.equal('Hi emmanuel, registration successful!');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should return success and token for google signin', (done) => {
      server
        .post('/api/v1/auth/google')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'emmanuel',
          email: 'ekundayo.abiona@andela.com',
          password: 'ekundayo',
          passwordConfirmation: 'ekundayo',
        })
        .end((err, res) => {
          normalUserToken = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.message)
            .to.equal('Hi emmanuel, you are logged in');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.equal(normalUserToken);
          done();
        });
    });
    it('should return error for wrong inputs on google signin', (done) => {
      server
        .post('/api/v1/auth/google')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalUserToken)
        .send({
          username: '    ',
          email: 'ekundayo.abiona@andela.com',
          password: 'ekundayo',
          passwordConfirmation: 'ekundayo',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.have.property('username');
          expect(res.body.message.username).to.equal('This field is required');
          expect(res.body.message).to.be.an.instanceOf(Object);
          done();
        });
    });
  });

  describe('When searching for a single user', () => {
    it('should return success message if username is available', (done) => {
      server
        .post('/api/v1/users')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          username: 'errorguy',
          password: 'errorguy'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.message).to.equal('Username not taken');
          done();
        });
    });
    it('should return exists to be true if user exists', (done) => {
      server
        .post('/api/v1/users')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          username: 'emmanuel',
          password: 'ekundayo'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.exists).to.equal(true);
          done();
        });
    });
  });

  describe('Upon a user password change request', () => {
    it('should return success message if password was updated', (done) => {
      server
        .post('/api/v1/users/pass')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          oldPass: '123456',
          newPass: '1dayo2',
          newPassConfirm: '1dayo2',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.message).to.equal('Password successfully changed');
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('should return error message for password confirmation mismatch',
      (done) => {
        server
          .post('/api/v1/users/pass')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminUserToken)
          .send({
            oldPass: '123456',
            newPass: '1dayo',
            newPassConfirm: '1dayo2',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.be.an.instanceof(Object);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.have.property('mismatch');
            expect(res.body.message.mismatch)
              .to.equal('Passwords do not match');
            done();
          });
      });
    it('should return error message for invalid input', (done) => {
      server
        .post('/api/v1/users/pass')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          oldPass: '',
          newPass: '',
          newPassConfirm: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('All fields must exist');
          done();
        });
    });
    it('should return error message if old password is incorrect',
      (done) => {
        server
          .post('/api/v1/users/pass')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminUserToken)
          .send({
            oldPass: 'ekundayo',
            newPass: 'dayodayo',
            newPassConfirm: 'dayodayo',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message)
              .to.equal('Authentication failed, Old password incorrect');
            done();
          });
      });
    it('should return error message if user is not found', (done) => {
      process.env.TRIGGER_ENV = true;
      server
        .post('/api/v1/users/pass')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalUserToken)
        .send({
          oldPass: 'ekundayo',
          newPass: 'ekundayo',
          newPassConfirm: 'ekundayo',
          userId: 9825
        })
        .end((err, res) => {
          process.env.TRIGGER_ENV = false;
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.message)
            .to.equal('Password change failed, try again');
          done();
        });
    });
  });

  describe('Membership auto-upgrade', () => {
    before(() => {
      User.update({
        totalBorrow: 10,
        borrowLimit: 2
      }, {
        where: {
          username: 'emmanuel'
        }
      });
    });
    it('should return not-eligible message', (done) => {
      server
        .post('/api/v1/users/autoupgrade')
        .set('x-access-token', adminUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Not eligible');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should return upgrade details if eligible', (done) => {
      server
        .post('/api/v1/users/autoupgrade')
        .set('x-access-token', normalUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user.username).to.equal('emmanuel');
          expect(res.body.user.email).to.equal('ekundayo.abiona@andela.com');
          expect(res.body.user.role).to.equal('normal');
          expect(res.body.user.level).to.equal('silver');
          expect(res.body.user.borrowLimit).to.equal(3);
          expect(res.body.user.totalBorrow).to.equal(10);
          expect(res.body.message).to.equal('You\'ve been upgraded to silver');
          done();
        });
    });
  });

  describe('Token verification', () => {
    it('should ensure an authenticated user has a valid token', (done) => {
      server
        .post('/api/v1/verify-token')
        .set('x-access-token', adminUserToken)
        .send({ token: adminUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.decoded.role).to.equal('admin');
          expect(res.body.decoded.username).to.equal('ekundayo');
          expect(res.body.user.username).to.equal('ekundayo');
          expect(res.body.user.role).to.equal('admin');
          expect(res.body.user.level).to.equal('bronze');
          expect(res.body.user.borrowLimit).to.equal(2);
          expect(res.body.user.totalBorrow).to.equal(0);
          done();
        });
    });
  });

  describe('Autoupgrade unexpected outcome handling', () => {
    it('should raise error if all fails', (done) => {
      User.update = () => Promise.reject(1);
      server
        .post('/api/v1/users/autoupgrade')
        .set('x-access-token', normalUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Not eligible');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });

    before((done) => {
      User.create({
        username: 'chiefoftesters',
        email: 'chiefoftesters@mail.com',
        password: bcrypt.hashSync('mypassword', 10),
        role: 'normal',
        level: 'bronze',
        totalBorrow: 10
      }).then(() => {
        server
          .post('/api/v1/users/signin')
          .set('x-access-token', normalUserToken)
          .send({
            identifier: 'chiefoftesters',
            password: 'mypassword'
          })
          .end((err, res) => {
            specificUserToken = res.body.token;
            done();
          });
      });
    });

    it('should raise error if unexpected outcome happens', (done) => {
      User.update = () => Promise.reject(1);
      server
        .post('/api/v1/users/autoupgrade')
        .set('x-access-token', specificUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.message).to.equal('Internal Server Error');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
  });
});
