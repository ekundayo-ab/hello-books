import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../server/models/book';
import seed from '../server/seeders/user';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

// const api = app();

describe('API Routes', () => {
  // start with a fresh DB 
  beforeEach((done) => {
    User.sequelize.sync({ force: true, match: /_test$/, logging: false })
      .then(() => {
        return seed(User);
      }).then(() => {
        done();
      });
  });
});

describe('GET /v1/users', (done) => {
  it('should get a list of users', (done) => {
    chai.request(app)
      .get('/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        done();
      });
  });
});

