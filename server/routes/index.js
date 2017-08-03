const usersController = require('../controllers').users;
const booksController = require('../controllers').books;
const borrowsController = require('../controllers').borrows;
const usersMiddleware = require('../middlewares').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.retrieve);
  app.use(usersMiddleware.authenticate);
  app.get('/api/users', usersController.list);
  app.post('/api/books', booksController.create);
  app.put('/api/books/:bookId', booksController.update);
  app.get('/api/books', booksController.list);
  app.post('/api/users/:userId/books', borrowsController.create);
};
