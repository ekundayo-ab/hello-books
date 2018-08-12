import supertest from 'supertest';
import chai from 'chai';
import bcrypt from 'bcryptjs';
import app from '../../app';
import model from '../models';
import HelperBeforeHooks from './../helpers/HelperBeforeHooks';

const User = model.User;
const expect = chai.expect;
let adminUserToken;
let normalUserToken;
let specificUserToken;

const server = supertest.agent(app);
describe('AUTHENTICATION & USER Operations', () => {
  HelperBeforeHooks.clearDatabaseTables();
  describe('Sign-Up route', () => {
    it('should return new user if registration inputs are valid', (done) => {
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

    it('should return error message if new user email already exists',
      (done) => {
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

    it('should return error message if new username already exists', (done) => {
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

  describe('Sign-In route', () => {
    it('should return error message if required fields are absent', (done) => {
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

    it('should return success message & token on successful login', (done) => {
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
    it('should return success message & token on successful login', (done) => {
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
    it('should return error message for wrong email or password on login',
      (done) => {
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
            expect(res.status).to.equal(401);
            done();
          });
      });

    it('should return error message for wrong username on login', (done) => {
      server
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          identifier: 'ekundayoguy',
          password: 'dayo',
        })
        .end((err, res) => {
          expect(res.body.message)
            .to.equal('Authentication failed, Wrong password or email');
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('/Google Sign-Up', () => {
    it('should return success message and token if google sign-up is successful',
      (done) => {
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
    it('should return success message and token if google sign-in is successful',
      (done) => {
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
    it('should return error messages for invalid inputs', (done) => {
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

  describe('Users route', () => {
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
    it('should return true if user exists', (done) => {
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

  describe('Password Changing route', () => {
    it('should return success message if password is successfully updated',
      (done) => {
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
    it('should return error message for invalid inputs', (done) => {
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
            expect(res.status).to.equal(401);
            expect(res.body.message)
              .to.equal('Authentication failed, Old password incorrect');
            done();
          });
      });
  });

  describe('User\'s Auto-upgrade route', () => {
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
    it('should return inegibility message if user does qualify for upgrade',
      (done) => {
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
    it('should return upgrade details if user qualifies for upgrade',
      (done) => {
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
            expect(res.body.message)
              .to.equal('You\'ve been upgraded to silver');
            done();
          });
      });
  });

  describe('Token verification route', () => {
    it('should return user token details if token is valid', (done) => {
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
          expect(res.body.user.borrowLimit).to.equal(9005);
          expect(res.body.user.totalBorrow).to.equal(0);
          done();
        });
    });
  });

  describe('Autoupgrade unexpected outcome handling', () => {
    it('should return error message for upgrade ineligibility', (done) => {
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

    it('should return error message for unexpected response', (done) => {
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
