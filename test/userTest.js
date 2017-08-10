import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import models from '../server/models/';

const expect = chai.expect;

const server = supertest.agent(app);

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('A typical User registration', () => {
  it('Should allow user to register', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        email: 'ekprogs@gmail.com',
        password: '123456',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Hi ekundayo, registration successful!');
        done();
      });
  });

  it('Should raise an error for registration property not available', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: 'ekundayo',
        mail: 'ekprogs@gmail.com',
        pasword: '123456',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Bad request data, enter valid inputs or valid key-value pairs.');
        done();
      });
  });

  it('Should raise an error for invalid inputs', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: '',
        email: '',
        password: '',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Bad request data, enter valid inputs or valid key-value pairs.');
        done();
      });
  });
});

describe('A typical User Logging In', () => {
  it('Should raise error for bad request data on signing in', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: 'ekundayo',
        email: 'ekprogs@gmail.com',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Bad request data, enter valid inputs or valid key-value pairs.');
        done();
      });
  });

  it('Should allow user to sign in and assign token', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        password: '123456',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Hi ekundayo, you are logged in');
        expect(res.body).to.have.property('token');
        expect(res.body).not.to.equal(null);
        done();
      });
  });

  it('Should prevent user from signing in with wrong password', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayo',
        password: 'dayo',
      })
      .expect(401)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed. Wrong password');
        done();
      });
  });

  it('Should prevent user not registered from signing in', (done) => {
    server
      .post('/api/v1/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'ekundayoguy',
        password: 'dayo',
      })
      .expect(404)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed. User not found');
        done();
      });
  });
});
