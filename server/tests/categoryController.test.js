import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import model from '../models';
import HelperBeforeHooks from './../helpers/HelperBeforeHooks';

const Category = model.Category;
const { expect } = chai;
let adminToken;

const server = supertest.agent(app);
describe('Library', () => {
  HelperBeforeHooks.makeDataAvailable();
  beforeEach((done) => {
    ({ adminToken } = process.env);
    done();
  });
  describe('Category route', () => {
    it('should return success message if category was successfully created',
      (done) => {
        server
          .post('/api/v1/category')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            title: 'Music',
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Music, successfully added');
            expect(res.body.category.title).to.equal('Music');
            done();
          });
      });
    it('should return error message if no title field exists', (done) => {
      server
        .post('/api/v1/category')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('All fields must exist');
          done();
        });
    });
    it('should return error message if new category title already exists',
      (done) => {
        server
          .post('/api/v1/category')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            title: 'Music',
          })
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body.message).to.equal('Conflict! Music exists already');
            expect(res.body.foundCat.title).to.equal('Music');
            done();
          });
      });
  });

  describe('Categories route', () => {
    it('should return all categories for an authenticated if all categories' +
      'are successfully gotten', (done) => {
      server
        .get('/api/v1/categories')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.categories).to.have.lengthOf(3);
          expect(res.body.categories[0].title).to.equal('Anything');
          expect(res.body.categories[1].title).to.equal('Music');
          expect(res.body.categories[2].title).to.equal('Sciences');
          done();
        });
    });
    it('should return (no-content) message if no category exist', (done) => {
      Category.destroy({ where: {} });
      server
        .get('/api/v1/categories')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(Object.keys(res.body)).to.have.lengthOf(0);
          expect(res.body).to.be.an.instanceOf(Object);
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
          expect(res.body.message).to.equal('Internal Server Error');
          done();
        });
    });
  });
});
