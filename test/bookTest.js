import supertest from 'supertest';
import chai from 'chai';
import faker from 'faker';
import app from '../app';
import models from '../server/models/';

const should = chai.should;
const expect = chai.expect;

// const user = {
//   username: faker.name.findName(),
//   email: faker.internet.email(),
//   password: '123456',
// };

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
        expect(res.body.message).to.equal('ekprogs@gmail.com');
        done();
      });
  });
});
