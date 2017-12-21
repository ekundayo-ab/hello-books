import express from 'express';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';
import BorrowController from '../controllers/BorrowController';
import CategoryController from '../controllers/CategoryController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import BookMiddleware from '../middlewares/BookMiddleware';
import BorrowMiddleware from '../middlewares/BorrowMiddleware';
import ValidationMiddleware from '../middlewares/ValidationMiddleware';

const { signup, googleAuth, changePassword, autoUpgrade } = UserController;
const { addBook, updateBook, deleteBook, listBooks, findBook, filterBooks }
  = BookController;
const { addCategory, listCategory } = CategoryController;
const { validateAndCheckIfBookExist } = BookMiddleware;
const { checkIfDefinedAndValid } = ValidationMiddleware;
const { hasAdminRights, checkOrSignInUser, authenticate } = AuthMiddleware;
const { borrowBook, returnBook,
  AllBorrowedOrNotReturnedBooks, getBorrowedBook } = BorrowController;
const { checkIfBorrowExist, sendMailAndResponse } = BorrowMiddleware;

const Router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Welcome to Hello Books
 *     summary:
 *       - Library API welcome message
 *     description: Displays the application API welcome message
 *     responses:
 *       200:
 *         description: Welcome to Hello Books Library
 */
Router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Hello Books Library',
}));

/**
 * @swagger
 * definitions:
 *   Register:
 *     properties:
 *       username:
 *         type: string
 *         default: chieftester
 *       email:
 *         type: string
 *         default: chieftester
 *       password:
 *         type: string
 *         default: chieftester
 *       passwordConfirmation:
 *         type: string
 *         default: chieftester
 *     example: {
 *       "username": chieftester,
 *       "email": chieftester@mail.com,
 *       "password": c1$#t0&slda__!,
 *       "passwordConfirmation": c1$#t0&slda__!
 *     }
 */

/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       identifier:
 *         type: string
 *         default: chieftester
 *       password:
 *         type: string
 *         default: chieftester
 *     example: {
 *       "identifier": chieftester,
 *       "password": c1$#t0&slda__!
 *     }
 */

/**
 * @swagger
 * definitions:
 *   Book:
 *     properties:
 *       isbn:
 *         type: integer
 *         default: 287
 *         example: 287
 *       title:
 *         type: string
 *         default: Learn JAVA in two months
 *         example: Learn JAVA in two months
 *       author:
 *         type: string
 *         default: JAVA Master
 *         example: JAVA Master
 *       description:
 *         type: string
 *         default: Learn and master the fundamentals of JAVA in two months
 *         example: Learn and master the fundamentals of JAVA in two months
 *       quantity:
 *         type: integer
 *         default: 10
 *         example: 10
 *       image:
 *         type: string
 *         default: learn_java_two_months.jpg
 *         example: learn_java_two_months.jpg
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     summary:
 *       - Register/Sign up a new User to the library
 *     description: Register / Sign up a new User to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object to add to the library
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *       201:
 *         description: Hi chieftester, registration successful!
 *       400:
 *         description: |
 *           Passwords do not match
 *           Check your username, email or password and try again!
 *           Invalid email address, try again
 *       409:
 *         description: |
 *           User with that email exists
 *           Username already taken
 *       500:
 *         description: Internal Server Error
 */
Router.post('/users/signup',
  checkIfDefinedAndValid, signup); // Route to sign up

/**
 * @swagger
 * definitions:
 *   SignInResponse:
 *     properties:
 *       success:
 *         type: boolean
 *         example: true
 *       message:
 *         type: string
 *         example: Hi chieftester, you are logged in
 *       token:
 *         type: string
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1Miwicm9sZSI6Im5vcm1hbCIsInVzZXJuYW1lIjoiY2hpZWZ0ZXN0ZXIifSwiaWF0IjoxNTA5OTQ0NjUzLCJleHAiOjE1MDk5NDgyNTN9.IvVYw1nB79PUyrBWpywwxJxvv6NRcMzXGXNEPKI9slI"
 */

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     summary:
 *       - Sign In a User to the library
 *     description: Signs in a User to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: Hi chieftester, you are logged in
 *         schema:
 *           $ref: '#/definitions/SignInResponse'
 *       400:
 *         description: Bad request!, Check your username or email.
 *       404:
 *         description: Authentication failed. check password or email
 *       401:
 *         description: Authentication failed. check password or email
 *       500:
 *         description: Internal Server Error
 */
// Route to sign in
Router.post('/users/signin', checkIfDefinedAndValid, checkOrSignInUser);

// Authentication for google signup and signin
Router.post('/auth/google',
  checkIfDefinedAndValid, checkOrSignInUser, googleAuth);

// Checks if a User exists in the database
Router.post('/users', checkOrSignInUser);

Router.use(authenticate); // Authentication middleware

/**
 * @swagger
 * definitions:
 *   BookCreationResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Learn JAVA in two months, successfully added
 *       book:
 *         type: object
 *         example:
 *           book: {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *              fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 */

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book Operations
 *     summary:
 *       - Add a new book to the library
 *     description: Add a new Book as an Admin User to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object to be added to the library
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Learn JAVA in two months successfully added
 *         schema:
 *           $ref: '#/definitions/BookCreationResponse'
 *       400:
 *         description: |
 *           All fields must exist
 *           All fields are required
 *       403:
 *         description: Permission Denied
 *       409:
 *         description: Conflict! Learn JAVA in two months exists already
 *       500:
 *         description: Internal Server Error
 */

// Route to add new book
Router.post('/books', hasAdminRights,
  checkIfDefinedAndValid, validateAndCheckIfBookExist, addBook);

/**
 * @swagger
 * definitions:
 *   BookUpdateResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Learn JAVA in two months, successfully updated to
 *           Learn JAVA in three months
 *       book:
 *         type: object
 *         example:
 *           old: {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *              fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *           book: {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in three months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the |
 *                fundamentals of JAVA in three months",
 *             "image": "learn_java_three_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T20:52:10.169Z"
 *           }
 */

/**
 * @swagger
 * /books/{bookId}:
 *   put:
 *     tags:
 *       - Book Operations
 *     summary:
 *       - Update a book in the library
 *     description: Modify an already added Book's information as an Admin User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book to update
 *         in: path
 *         required: true
 *         type: integer
 *       - name: book
 *         description: Book object with updated information to update a book
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Learn JAVA in two months, successfully updated to
 *           Learn JAVA in three months
 *         schema:
 *           $ref: '#/definitions/BookUpdateResponse'
 *       400:
 *         description: |
 *           All fields must exist
 *           All fields are required
 *       403:
 *         description: Permission Denied
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

// Route to modify a book information
Router.put('/books/:bookId', hasAdminRights,
  checkIfDefinedAndValid, validateAndCheckIfBookExist, updateBook);

/**
 * @swagger
 * definitions:
 *   BookDeletionResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Book successfully deleted
 *       book:
 *         type: object
 *         example:
 *           book: {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *                fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 */

/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     tags:
 *       - Book Operations
 *     summary:
 *       - Delete a book from the library
 *     description: Delete a specified Book as an Admin User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bookId
 *         description: ID of the Book to delete
 *         in: path
 *         required: true
 *         type: integer
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         schema:
 *           $ref: '#/definitions/BookDeletionResponse'
 *       400:
 *         description: Ensure book ID is present
 *       403:
 *         description: Permission Denied
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

// Route to delete a book
Router.delete('/books/:bookId',
  hasAdminRights, validateAndCheckIfBookExist, deleteBook);

/**
 * @swagger
 * definitions:
 *   BookListingResponse:
 *     properties:
 *       books:
 *         type: object
 *         example:
 *           - {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *                fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *           - {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn Kotlin in two months",
 *             "author": "Kotlin Master",
 *             "description": "Learn and master the
 *                fundamentals of Kotlin in two months",
 *             "image": "learn_kotlin_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *           - {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn CSharp in two months",
 *             "author": "CSharp Master",
 *             "description": "Learn and master the
 *                fundamentals of CSharp in two months",
 *             "image": "learn_csharp_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *           - {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn Android in two months",
 *             "author": "Android Master",
 *             "description": "Learn and master the
 *                fundamentals of Android in two months",
 *             "image": "learn_android_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *       numberOfPages:
 *         type: integer
 *         example: 3
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Book Operations
 *     summary:
 *       - List books in the library by pages
 *     description: Returns all Books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         description: Page number for listing books returned
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: An array of Books
 *         schema:
 *           $ref: '#/definitions/BookListingResponse'
 */

// Route to list all books in library
Router.get('/books', listBooks);

/**
 * @swagger
 * definitions:
 *   BookBorrowedResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Learn JAVA in two months successfully borrowed
 *       books:
 *         type: object
 *         example:
 *           - updatedBorrowedBook: {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *                fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 9,
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *       numberOfPages:
 *         type: integer
 *         example: 3
 */

/**
 * @swagger
 * /users/{userId}/books:
 *   post:
 *     tags:
 *       - Borrowing Operations
 *     summary:
 *       - Borrow a book from the library
 *     description: Borrow a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User borrowing a book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to Borrow
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: integer
 *           example: {
 *             "bookId": 4
 *           }
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Learn JAVA in two months successfully borrowed
 *         schema:
 *           $ref: '#/definitions/BookBorrowedResponse'
 *       400:
 *         description: Oops! something happened, [error message]
 *       404:
 *         description: |
 *           Book not found
 *           User does not exist
 *       409:
 *         description: Book borrowed already
 *       500:
 *         description: Internal Server Error
 */

// Route to borrow a book
Router.post('/users/:userId/books', checkOrSignInUser,
  validateAndCheckIfBookExist, checkIfBorrowExist, borrowBook,
  sendMailAndResponse);

/**
 * @swagger
 * definitions:
 *   BookReturnedResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Learn JAVA in two months successfully
 *           returned but pending review by Administrator
 *       updatedBook:
 *         type: object
 *         example:
 *           {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *                fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 9,
 *             "category": "Programming",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *       updatedBorrowedBook:
 *         type: object
 *         example:
 *           {
 *              "id": 157,
 *              "returned": true,
 *              "dueDate": "2017-11-09T21:55:10.947Z",
 *              "actualReturnDate": "2017-11-09T00:59:41.374Z",
 *              "createdAt": "2017-11-06T21:55:10.947Z",
 *              "updatedAt": "2017-11-09T00:59:41.375Z",
 *              "bookId": 61,
 *              "userId": 52,
 *              "book": {
 *                "id": 61,
 *                "isbn": 1,
 *                "title": "Learn JAVA in two months",
 *                "author": "JAVA Master",
 *                "description": "Learn and master the
 *                   fundamentals of JAVA in two months",
 *                "image": "learn_java_two_months.jpg",
 *                "status": true,
 *                "quantity": 44,
 *                "category": "Programming",
 *                "createdAt": "2017-11-04T11:52:28.207Z",
 *                "updatedAt": "2017-11-06T21:55:10.936Z"
 *              }
 *             }
 */

/**
 * @swagger
 * /users/{userId}/books:
 *   put:
 *     tags:
 *       - Borrowing Operations
 *     summary:
 *       - Return a book to the library
 *     description: Return a specific Book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User returning a book
 *         in: path
 *         required: true
 *         type: integer
 *       - name: bookId
 *         description: ID of Book to Return
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - bookId
 *           properties:
 *             bookId:
 *               type: integer
 *           example: {
 *             "bookId": 4
 *           }
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Learn JAVA in two months
 *           succesfully returned but pending review by Administrator
 *         schema:
 *           $ref: '#/definitions/BookReturnedResponse'
 *       400:
 *         description: |
 *           All fields are required
 *           Oops! something happenned [error message]
 *       404:
 *         description: |
 *           User does not exist
 *           You have not borrowed this book
 *           Book not found
 *       500:
 *         description: Internal Server Error
 */

// Route to return a book
Router.put('/users/:userId/books',
  checkOrSignInUser, validateAndCheckIfBookExist, returnBook,
  sendMailAndResponse);

/**
 * @swagger
 * definitions:
 *   BookNotReturnedListResponse:
 *     properties:
 *       borrow:
 *         type: object
 *         example:
 *           - {
 *              "id": 157,
 *              "returned": false,
 *              "dueDate": "2017-11-09T21:55:10.947Z",
 *              "actualReturnDate": "2017-11-09T00:59:41.374Z",
 *              "createdAt": "2017-11-06T21:55:10.947Z",
 *              "updatedAt": "2017-11-09T00:59:41.375Z",
 *              "bookId": 61,
 *              "userId": 52,
 *              "book": {
 *                "id": 61,
 *                "isbn": 1,
 *                "title": "The Amazing Adventures of Kavalier & Clay",
 *                "author": "Michael Chabon",
 *                "description": "The Amazing Adventures of Kavalier & Clay
 *                   is a 2000 novel by Jewish American author Michael Chabon
 *                   that won the Pulitzer Prize for Fiction in 2001.",
 *                "image": "https://res.cloudinary.com/dcl7tqhww/image
 *                  /upload/v1509138852/emfohjtwnjz1crabccy4.png",
 *                "status": true,
 *                "quantity": 45,
 *                "category": "Arts",
 *                "createdAt": "2017-11-04T11:52:28.207Z",
 *                "updatedAt": "2017-11-09T00:59:41.420Z"
 *                }
 *              }
 *           - {
 *              "id": 158,
 *              "returned": false,
 *              "dueDate": "2017-11-09T22:06:07.839Z",
 *              "actualReturnDate": "2017-11-09T01:22:13.032Z",
 *              "createdAt": "2017-11-06T22:06:07.839Z",
 *              "updatedAt": "2017-11-09T01:22:13.032Z",
 *              "bookId": 64,
 *              "userId": 52,
 *              "book": {
 *                 "id": 64,
 *                 "isbn": 4,
 *                 "title": "Wolf Hall",
 *                 "author": "Hilary Mantel",
 *                 "description": "Wolf Hall is a historical novel by
 *                  English author Hilary Mantel, published by Fourth
 *                  Estate, namedafter the Seymour family seat of Wolfhall or
 *                  Wulfhall in Wiltshire.",
 *                 "image": "http://res.cloudinary.com/dcl7tqhww/image
 *                    /upload/v1509139539/w9wpuonkyguo32i90mg8.png",
 *                 "status": true,
 *                 "quantity": 10,
 *                 "category": "Arts",
 *                 "createdAt": "2017-11-04T11:52:28.207Z",
 *                 "updatedAt": "2017-11-09T01:22:13.098Z"
 *                }
 *              }
 */

/**
 * @swagger
 * /users/{userId}/books:
 *   get:
 *     tags:
 *       - Borrowing Operations
 *     summary:
 *       - List a books borrowed by a user and not returned to the library
 *     description: List all Books borrowed but not returned by a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: returned
 *         in: query
 *         required: true
 *         type: boolean
 *         default: false
 *       - name: userId
 *         in: path
 *         description: ID of the User yet to return the books
 *         required: true
 *         type: integer
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of Books
 *         schema:
 *           $ref: '#/definitions/BookNotReturnedListResponse'
 */

// Route to list borrowed but not returned book
Router.get('/users/:userId/books', AllBorrowedOrNotReturnedBooks);

// Find a specific book and return it
Router.get('/books/:bookId', validateAndCheckIfBookExist, findBook);

// Filter books according to a category
Router.get('/category/books', filterBooks);

// Get a specific book that was borrowed
Router.get('/borrowed/:bookId', getBorrowedBook);
Router.get('/borrowed/:userId/books', AllBorrowedOrNotReturnedBooks);
Router.post('/users/pass', checkIfDefinedAndValid,
  checkOrSignInUser, changePassword);
Router.post('/users/autoupgrade', autoUpgrade);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category Operations
 *     summary:
 *       - Add a Book Category to the library
 *     description: Adds a category specification to the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: name of the category to add
 *         in: body
 *         required: true
 *         type: string
 *         default: "Sciences"
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Sciences successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               title: string
 *               example: Sciences
 *       400:
 *         description: All fields must exist
 *       403:
 *         description: Permission Denied
 *       409:
 *         description: Conflict! Sciences exists already
 *       500:
 *         description: Internal Server Error
 */
Router.post('/category', hasAdminRights, checkIfDefinedAndValid, addCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Category Operations
 *     summary:
 *       - List all Book Categories available in the library
 *     description: Lists all Book Categories available in the library
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of Categories
 *         schema:
 *           type: object
 *           properties:
 *             categories:
 *               type: array
 *               example:
 *                 - {
 *                  "id": 6,
 *                  "title": "Programming",
 *                  "createdAt": "2017-10-14T17:58:13.884Z",
 *                  "updatedAt": "2017-10-14T17:58:13.884Z",
 *                 }
 *                 - {
 *                  "id": 7,
 *                  "title": "Music",
 *                  "createdAt": "2017-10-14T17:58:18.937Z",
 *                  "updatedAt": "2017-10-14T17:58:18.937Z",
 *                 }
 *                 - {
 *                  "id": 8,
 *                  "title": "Sciences",
 *                  "createdAt": "2017-10-14T17:58:26.597Z",
 *                  "updatedAt": "2017-10-14T17:58:26.597Z",
 *                 }
 *                 - {
 *                  "id": 9,
 *                  "title": "Arts",
 *                  "createdAt": "2017-10-14T17:58:29.869Z",
 *                  "updatedAt": "2017-10-14T17:58:29.869Z",
 *                 }
 *       301:
 *         description: Categories not available, check back later.
 *       500:
 *         description: Internal Server Error
 */
Router.get('/categories', listCategory);

export default Router;
