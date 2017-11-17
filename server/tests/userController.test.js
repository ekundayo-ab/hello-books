import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import helperBeforeHooks from './../helpers/helperBeforeHooks';

const expect = chai.expect;
let adminUserToken;
let normalUserToken;

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
    it('should disallow non-admin user from searching', (done) => {
      server
        .post('/api/v1/users')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalUserToken)
        .send({
          username: 'emmanuel',
          password: 'ekundayo'
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Permission Denied');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should raise error if supplied inputs are invalid', (done) => {
      server
        .post('/api/v1/users')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          username: '',
          password: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Bad request!, Check username or email.');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should raise error if User does not exists', (done) => {
      server
        .post('/api/v1/users')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminUserToken)
        .send({
          username: 'errorguy',
          password: 'errorguy'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User does not exist');
          expect(res.body).to.be.an.instanceof(Object);
          done();
        });
    });
    it('should respond with user data if all goes well', (done) => {
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
});
