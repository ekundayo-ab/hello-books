import express from 'express';
import usersController from '../controllers/users';
import booksController from '../controllers/books';
import borrowsController from '../controllers/borrows';
import authMiddleware from '../middlewares/auth';

const Router = express.Router();

Router.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the Todos API!',
}));

Router.post('/api/users/signup', usersController.create); // Route to sign up
Router.post('/api/users/signin', usersController.retrieve); // Route to sign in
Router.use(authMiddleware.authenticate); // Authentication middleware
Router.post('/api/books', booksController.create); // Route to add new book
Router.put('/api/books/:bookId', booksController.update); // Route to modify a book information
Router.delete('/api/books/:bookId', booksController.destroy); // Route to delete a book 
Router.get('/api/books', booksController.list); // Route to list all books in library
Router.post('/api/users/:userId/books', borrowsController.create); // Route to borrow a book
Router.put('/api/users/:userId/books', borrowsController.returnBook); // Route to return a book
Router.get('/api/users/:userId/books?returned=false', borrowsController.listNotReturned); // Route to list borrowed but not returned book

export default Router;
