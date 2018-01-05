import express from 'express';
import UserController from '../controllers/UserController';
import BookController from '../controllers/BookController';
import BorrowController from '../controllers/BorrowController';
import CategoryController from '../controllers/CategoryController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import BookMiddleware from '../middlewares/BookMiddleware';
import BorrowMiddleware from '../middlewares/BorrowMiddleware';
import ValidationMiddleware from '../middlewares/ValidationMiddleware';

const { signUp, signIn, googleAuth, changePassword, autoUpgrade, isUserTaken } =
  UserController;
const { addBook, updateBook, deleteBook, listBooks, findBook, filterBooks }
  = BookController;
const { addCategory, listCategory } = CategoryController;
const { validateAndCheckIfBookExist } = BookMiddleware;
const { checkIfDefinedAndValid } = ValidationMiddleware;
const { hasAdminRights,
  checkUser, checkPassword, authenticate } = AuthMiddleware;
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
 *       category:
 *         type: string
 *         default: 5
 *         example: 5
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
 * definitions:
 *   UserCreationResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Hi chieftester, registration successful!
 *       user:
 *         type: object
 *         example:
 *           {
 *             "role": normal,
 *             "level": bronze,
 *             "borrowLimit": 2,
 *             "totalBorrow": 0,
 *             "id": 3,
 *             "username": "chieftester",
 *             "email": chieftester@mail.com,
 *             "password":
 *             $2a$10$4MCpVEkVpRfSUV0PWzhP4u6RCK567fp1z52wxTrChZFNwt4GuI4Oa,
 *             "updatedAt": "2018-01-02T16:43:34.261Z",
 *             "createdAt": "2018-01-02T16:43:34.261Z"
 *           }
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
 *         schema:
 *           $ref: '#/definitions/UserCreationResponse'
 *       400:
 *         description: |
 *           Passwords do not match
 *           Check your username, email or password and try again!
 *           Invalid email address, try again
 *           errors: {
 *             username: 'This field is required',
 *             email: 'This field is required',
 *             password: 'This field is required',
 *             passwordConfirmation: 'This field is required',
 *             username: 'One word, only letters or underscore',
 *             username: 'minimum of 2 characters word allowed',
 *             password: 'minimum of 6 characters word allowed',
 *             password: 'Passwords do not match',
 *             email: 'Invalid email address, try again',
 *           }
 *       409:
 *         description: |
 *           Username already taken
 *           User with this email exists
 *       500:
 *         description: Internal Server Error
 */
Router.post('/users/signup',
  checkIfDefinedAndValid, signUp); // Route to sign up

/**
 * @swagger
 * definitions:
 *   SignInResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Hi chieftester, you are logged in
 *       token:
 *         type: string
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1Miwicm9sZSI6Im5vcm1hbCIsInVzZXJuYW1lIjoiY2hpZWZ0ZXN0ZXIifSwiaWF0IjoxNTA5OTQ0NjUzLCJleHAiOjE1MDk5NDgyNTN9.IvVYw1nB79PUyrBWpywwxJxvv6NRcMzXGXNEPKI9slI"
 *       user:
 *         type: object
 *         example:
 *           {
 *             "role": normal,
 *             "level": bronze,
 *             "borrowLimit": 2,
 *             "totalBorrow": 0,
 *             "id": 3,
 *             "username": "chieftester",
 *             "email": chieftester@mail.com,
 *             "password":
 *             $2a$10$4MCpVEkVpRfSUV0PWzhP4u6RCK567fp1z52wxTrChZFNwt4GuI4Oa,
 *             "updatedAt": "2018-01-02T16:43:34.261Z",
 *             "createdAt": "2018-01-02T16:43:34.261Z"
 *           }
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
 *         description: Check your username or email.
 *       401:
 *         description: Authentication failed. Wrong password or email
 *       500:
 *         description: Internal Server Error
 */
Router.post('/users/signin',
  checkIfDefinedAndValid, checkUser, checkPassword, signIn);


// Authentication for google sign-up and sign-in
Router.post('/auth/google',
  checkIfDefinedAndValid, checkUser, googleAuth);

// Checks if a User exists in the database
Router.post('/users', checkUser, isUserTaken);

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
 *           {
 *             "id": 74,
 *             "isbn": 287,
 *             "title": "Learn JAVA in two months",
 *             "author": "JAVA Master",
 *             "description": "Learn and master the
 *              fundamentals of JAVA in two months",
 *             "image": "learn_java_two_months.jpg",
 *             "status": true,
 *             "quantity": 10,
 *             "category": 5,
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
 *           All required fields must exist
 *           errors: {
 *             isbn: 'This field is required',
 *             title: 'This field is required',
 *             author: 'This field is required',
 *             description: 'This field is required',
 *             category: 'This field is required',
 *             isbn: 'ISBN must be a number',
 *             quantity: 'quantity must be a number,
 *             category: 'categoryId must be a number'
 *           }
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
 *           All required fields must exist
 *           Ensure book ID is supplied
 *           errors: {
 *             isbn: 'This field is required',
 *             title: 'This field is required',
 *             author: 'This field is required',
 *             description: 'This field is required',
 *             category: 'This field is required',
 *             isbn: 'ISBN must be a number',
 *             quantity: 'quantity must be a number,
 *             category: 'categoryId must be a number'
 *           }
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
 *       400:
 *         description: Ooops! something happened, ensure page is specified
 *       500:
 *         description: Internal Server Error
 */

// Route to list all books in the library
Router.get('/books', listBooks);

/**
 * @swagger
 * definitions:
 *   BookBorrowedResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Learn JAVA in two months successfully borrowed
 *       updatedBorrowedBook:
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
 *             "category": "Unsorted",
 *             "updatedAt": "2017-11-06T06:15:58.583Z",
 *             "createdAt": "2017-11-06T06:15:58.583Z"
 *           }
 *       borrowingRecord:
 *          type: object
 *          example:
 *            {
 *              "id": 25,
 *              "returned": false,
 *              "userId": 3,
 *              "bookId": 6,
 *              "dueDate": 2018-01-05T20:20:22.360Z,
 *              "actualReturnDate": 2018-01-02T20:20:22.360Z,
 *              "updatedAt": 2018-01-02T20:20:22.361Z,
 *              "createdAt": 2018-01-02T20:20:22.361Z
 *            }
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
 *       - name: loan
 *         description: flag to signify if book is to be borrowed or returned
 *         in: query
 *         required: true
 *         type: string
 *         default: 'borrowOrReturn'
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
 *         description: |
 *           Oops! something happened, [error message]
 *           Ensure book ID is supplied
 *       401:
 *         description: Loan credit exhausted, upgrade or return borrowed book
 *       404:
 *         description: |
 *           Book not found
 *           User not found
 *       409:
 *         description: Book borrowed already please return
 *       500:
 *         description: Internal Server Error
 */

// Route to borrow a book
Router.post('/users/:userId/books', checkUser,
  validateAndCheckIfBookExist, checkIfBorrowExist, borrowBook,
  sendMailAndResponse);

/**
 * @swagger
 * definitions:
 *   BorrowingRecordToReturn:
 *     properties:
 *       bookId:
 *         type: integer
 *         default: 4
 *         example: 4
 *       borrowId:
 *         type: integer
 *         default: 25
 *         example: 25
 *       borrow:
 *         type: object
 *         example: {
 *           "id": 25,
 *           "returned": false,
 *           "userId": 3,
 *           "bookId": 6,
 *           "dueDate": 2018-01-05T20:20:22.360Z,
 *           "actualReturnDate": 2018-01-02T20:20:22.360Z,
 *           "updatedAt": 2018-01-02T20:20:22.361Z,
 *           "createdAt": 2018-01-02T20:20:22.361Z
 *         }
 */

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
 *       borrowUpdated:
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
 *       userToUpdateInStore:
 *         type: object
 *         example:
 *           {
 *              "id": 3,
 *              "username": chieftester,
 *              "email": chieftester@mail.com,
 *              "role": normal,
 *              "borrowLimit": 5,
 *              "totalBorrow": 30
 *           }
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
 *       - name: loan
 *         description: flag to notify if a book is to be borrowed or returned
 *         in: query
 *         required: true
 *         type: string
 *         default: 'borrowOrReturn'
 *       - name: userId
 *         description: ID of the User returning a book
 *         in: path
 *         required: true
 *         type: integer
 *         default: 5
 *       - name: borrow
 *         description: Book object with updated information to update a book
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BorrowingRecordToReturn'
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
 *           Ensure borrowId is present
 *           Ensure bookId is present
 *           Oops! something happenned [error message]
 *       404:
 *         description: |
 *           User not found
 *           Book not found
 *           You have not borrowed this book
 *       500:
 *         description: Internal Server Error
 */

// Route to return a book
Router.put('/users/:userId/books', checkUser,
  validateAndCheckIfBookExist, returnBook, sendMailAndResponse);

/**
 * @swagger
 * definitions:
 *   BookNotReturnedListResponse:
 *     properties:
 *       borrowedBooks:
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
 *       numberOfPages:
 *         type: integer
 *         default: 1
 *         example: 1
 */

/**
 * @swagger
 * /users/{userId}/books:
 *   get:
 *     tags:
 *       - Borrowing Operations
 *     summary:
 *       - List of books borrowed by a user and not returned to the library
 *     description: List all Books borrowed but not returned by a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: returned
 *         description: Shows if book has been returned or not
 *         in: query
 *         required: true
 *         type: boolean
 *         default: false
 *       - name: page
 *         description: Current shelf/page number
 *         in: query
 *         required: true
 *         type: integer
 *         default: 1
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
 *       204:
 *         description: "No content message"
 *       400:
 *         description: Supply page and userId
 *       500:
 *         description: Internal Server Error
 */
Router.get('/users/:userId/books', AllBorrowedOrNotReturnedBooks);

// Find a specific book and return it
Router.get('/books/:bookId', validateAndCheckIfBookExist, findBook);

// Filter books according to a category
Router.get('/category/books', filterBooks);

// Get a specific book that was borrowed
Router.get('/borrowed/:bookId', getBorrowedBook);

/**
 * @swagger
 * definitions:
 *   AllBorrowedBooks:
 *     properties:
 *       borrowedBooks:
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
 *              "returned": true,
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
 *       numberOfPages:
 *         type: integer
 *         default: 1
 *         example: 1
 */

/**
 * @swagger
 * /borrowed/{userId}/books:
 *   get:
 *     tags:
 *       - Borrowing Operations
 *     summary:
 *       - List of all books borrowed by a user
 *     description: List of all Books borrowed by a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the User whose borrowing records are to be listed
 *         required: true
 *         type: integer
 *       - name: page
 *         in: query
 *         description: Current page/shelf for borrow records
 *         required: true
 *         type: integer
 *         default: 1
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of Books
 *         schema:
 *           $ref: '#/definitions/AllBorrowedBooks'
 *       400:
 *         description: Supply page and userId
 *       500:
 *         description: Internal Server Error
 */
Router.get('/borrowed/:userId/books', AllBorrowedOrNotReturnedBooks);

/**
 * @swagger
 * definitions:
 *   userPasswordChangePayload:
 *     properties:
 *       userId:
 *         type: integer
 *         default: 2
 *         example: 2
 *       oldPass:
 *         type: string
 *         default: myOldP4s5
 *         example: myOldP4s5
 *       newPass:
 *         type: string
 *         example: myNewP4s5
 *         default: myNewP4s5
 *       newPassConfirm:
 *         type: string
 *         example: myNewP4s5
 *         default: myNewP4s5
 */
/**
 * @swagger
 * /users/pass:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     summary:
 *       - Ensures a user can change his/her password
 *     description: Ensures a user can change his/her password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: passwordData
 *         description: Data details of password to be changed
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/userPasswordChangePayload'
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Password successfully changed
 *       400:
 *         description: |
 *           All fields must exist
 *           Authentication failed, Old password incorrect
 *           message: {
 *             mismatch: "Passwords do not match"
 *             newpass: "6 or more characters allowed"
 *             oldPass: "field required"
 *             newPass: "field required"
 *             newPassConfirm: "field required"
 *           }
 *       404:
 *         description: User not found
 *       403:
 *         description: Permission Denied
 *       500:
 *         description: Internal Server Error
 */
Router.post('/users/pass', checkIfDefinedAndValid,
  checkUser, checkPassword, changePassword);

/**
 * Route is not available for public consumption
 */
Router.post('/users/autoupgrade', autoUpgrade);


/**
 * @swagger
 * definitions:
 *   newCategoryPayload:
 *     properties:
 *       title:
 *         type: string
 *         default: Sciences
 *         example: Sciences
 */
/**
 * @swagger
 * definitions:
 *   categoryResponse:
 *     properties:
 *       message:
 *         type: string
 *         example: Sciences, successfully added
 *       category:
 *         type: object
 *         example: {
 *           "id": 4,
 *           "title": Sciences,
 *           "updatedAt": 2018-01-04T01:31:13.920Z,
 *           "createdAt": 2018-01-04T01:31:13.920Z
 *         }
 */
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
 *         description: title of the category to add
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/newCategoryPayload'
 *       - name: x-access-token
 *         in: header
 *         description: An authentication header for secure library access
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Sciences successfully added
 *         schema:
 *           $ref: '#/definitions/categoryResponse'
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
 *       204:
 *         description: No Content
 *       500:
 *         description: Internal Server Error
 */
Router.get('/categories', listCategory);

export default Router;
