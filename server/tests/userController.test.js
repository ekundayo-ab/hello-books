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
  describe('A typical User registration', () => {
    it('should allow admin user to be seeded', (done) => {
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
          expect(res.body.success).to.equal(true);
          expect(res.body.message)
            .to.equal('Hi ekundayo, registration successful!');
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should allow normal user to register', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'bootcamp@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message)
            .to.equal('Hi bootcamp, registration successful!');
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('should ensure all signup fields are required', (done) => {
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
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Check your username, email or password and try again!');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should ensure all signup fields are defined', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          usename: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Check your username, email or password and try again!');
          done();
        });
    });

    it('should ensure valid email is entered', (done) => {
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
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Invalid email address, try again');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should ensure email is unique', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'spartan',
          email: 'bootcamp@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User with that email exists');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should ensure username is unique', (done) => {
      server
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'bootcamp',
          email: 'spartan@gmail.com',
          password: '123456',
          passwordConfirmation: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Username already taken');
          expect(res.status).to.equal(409);
          done();
        });
    });
  });

  describe('A typical User Logging In', () => {
    it('should ensure all fields exists', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          idenfir: 'ekundayo',
          email: 'ekprogs@gmail.com',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Bad request!, Check your username or email.');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should require all fields', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identfier: 'ekundayo',
          email: 'ekprogs@gmail.com',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Bad request!, Check your username or email.');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should sign in and assign token to normal user', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'bootcamp',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Hi bootcamp, you are logged in');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should sign in and assign token to admin user', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayo',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Hi ekundayo, you are logged in');
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          adminUserToken = res.body.token;
          done();
        });
    });
    it('should disallow wrong password sign in', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayo',
          password: 'wrongpass',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Authentication failed. check password or email');
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should disallow unregistered user sign in', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayoguy',
          password: 'dayo',
        })
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Authentication failed. check password or email');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should register a user through google', (done) => {
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
          expect(res.body.success).to.equal(true);
          expect(res.body.message)
            .to.equal('Hi emmanuel, registration successful!');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('should sign in a registered user through google', (done) => {
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
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message)
            .to.equal('Hi emmanuel, you are logged in');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.body).to.have.property('token');
          normalUserToken = res.body.token;
          done();
        });
    });
    it('should raise error for bad request on google authentiation', (done) => {
      server
        .post('/api/v1/auth/google')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalUserToken)
        .send({
          username: '',
          email: 'ekundayo.abiona@andela.com',
          password: 'ekundayo',
          passwordConfirmation: 'ekundayo',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.be.an.instanceOf(Object);
          expect(res.body.errors.username).to.equal('This field is required');
          done();
        });
    });
  });

  describe('When searching for a single user', () => {
    it('should send a message if username has not been taken', (done) => {
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
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Username available');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should respond with user data if user exists', (done) => {
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
          expect(res.body.username).to.be.a('string');
          expect(res.body.password).to.be.a('string');
          expect(res.body.username).to.equal('emmanuel');
          done();
        });
    });
  });

  describe('Upon a user password change request', () => {
    it('should successfully update password', (done) => {
      server
        .post('/api/v1/users/pass')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          oldPass: '123456',
          newPass: 'dayo',
          newPassConfirm: 'dayo',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Object);
          expect(res.body.message).to.equal('Password successfully changed');
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('should respond with bad request for invalid input', (done) => {
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
          expect(res.body).to.have.property('errors');
          done();
        });
    });
    it('should respond with failure message if old password is incorrect',
      (done) => {
        server
          .post('/api/v1/users/pass')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminUserToken)
          .send({
            oldPass: 'ekundayo',
            newPass: 'dayo',
            newPassConfirm: 'dayo',
          })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.success).to.equal(false);
            expect(res.body).to.be.an.instanceof(Object);
            expect(res.body.message)
              .to.equal('Authentication failed, old password incorrect');
            done();
          });
      });
    it('should respond with failure message if user is not found', (done) => {
      process.env.TRIGGER_ENV = true;
      server
        .post('/api/v1/users/pass')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalUserToken)
        .send({
          oldPass: 'dayo',
          newPass: 'dayo',
          newPassConfirm: 'dayo',
          userId: 9825
        })
        .end((err, res) => {
          process.env.TRIGGER_ENV = false;
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
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
    it('should not upgrade if not eligible', (done) => {
      server
        .post('/api/v1/users/autoupgrade')
        .set('x-access-token', adminUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Not eligible');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should upgrade if eligible', (done) => {
      server
        .post('/api/v1/users/autoupgrade')
        .set('x-access-token', normalUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('You\'ve been upgraded to silver');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
  });

  describe('Token verification', () => {
    it('should ensure an authenticated user has a valid token', (done) => {
      server
        .post('/api/v1/verify-token')
        .set('x-access-token', adminUserToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user.username).to.equal('ekundayo');
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('decoded');
          expect(res.body).to.be.an.instanceof(Object);
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
          expect(res.body.success).to.equal(false);
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
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Internal Server Error');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
  });
});
