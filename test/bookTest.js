import chai from 'chai';
import supertest from 'supertest';

process.env.NODE_ENV = 'test';

const should = chai.should();
const expect = chai.expect();
const api = supertest('http://localhost:8000');

describe('API', () => {
  it('should return a 404 response with instructions', (done) => {
    api.get('/')
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
