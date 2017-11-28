import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import model from '../models';
import helperBeforeHooks from './../helpers/helperBeforeHooks';

const Category = model.Category;
const { expect } = chai;
let adminToken;
let normalToken;

const server = supertest.agent(app);
describe('CATEGORY Operations', () => {
  helperBeforeHooks.makeDataAvailable();
  beforeEach((done) => {
    ({ adminToken, normalToken } = process.env);
    done();
  });
  describe('A typical category operation', () => {
    it('should show a descriptive message if no category exists', (done) => {
      server
        .get('/api/v1/categories')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.message)
            .to.equal('Categories not available, check back later.');
          expect(res.body).to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should allow admin user to create category', (done) => {
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'Music',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Music, successfully added');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.body).to.have.property('category');
          done();
        });
    });
    it('should disallow disallow non authenticated' +
    'user from creating a category', (done) => {
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          title: 'Music',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Unauthenticated, token not found');
          expect(res.body).to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should disallow normal user from creating a category', (done) => {
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', normalToken)
        .send({
          title: 'Music',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Permission Denied');
          expect(res.body).to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should ensure title field is required', (done) => {
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('All fields must exist');
          expect(res.body).to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should throw error when same category is added again', (done) => {
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'Music',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Conflict! Music exists already');
          expect(res.body).to.have.property('foundCat');
          expect(res.body).to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should allow an authenticated user see all categories', (done) => {
      server
        .get('/api/v1/categories')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('categories');
          expect(res.body).to.be.an.instanceOf(Object);
          expect(res.body.categories).to.be.an.instanceOf(Object);
          done();
        });
    });
    it('should return error message for unexpected outcome' +
    ' when adding a category',
    (done) => {
      Category.create = () => Promise.reject(1);
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'Motivationals',
        })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Internal Server Error');
          done();
        });
    });
    it('should return error message for unexpected outcome' +
    ' when listing categories',
    (done) => {
      Category.findAll = () => Promise.reject(1);
      server
        .get('/api/v1/categories')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Internal Server Error');
          done();
        });
    });
  });
});
