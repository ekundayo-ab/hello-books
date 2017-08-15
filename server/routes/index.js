import express from 'express';
import usersController from '../controllers/users';
import booksController from '../controllers/books';
import borrowsController from '../controllers/borrows';
import authMiddleware from '../middlewares/auth';

const Router = express.Router();
Router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello Books Library',
}));

Router.post('/users/signup', usersController.signup); // Route to sign up
Router.post('/users/signin', usersController.signin); // Route to sign in
Router.use(authMiddleware.authenticate); // Authentication middleware
Router.get('/users', usersController.list); // Listing all users
Router.post('/books', booksController.create); // Route to add new book
Router.put('/books/:bookId', booksController.update); // Route to modify a book information
Router.delete('/books/:bookId', booksController.destroy); // Route to delete a book 
Router.get('/books', booksController.list); // Route to list all books in library
Router.post('/users/:userId/books', borrowsController.create); // Route to borrow a book
Router.put('/users/:userId/books', borrowsController.returnBook); // Route to return a book
Router.get('/users/:userId/books', borrowsController.listNotReturned); // Route to list borrowed but not returned book

export default Router;
