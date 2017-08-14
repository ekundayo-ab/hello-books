[![Build Status](https://travis-ci.org/ekundayo-ab/hello-books.svg?branch=master)](https://travis-ci.org/ekundayo-ab/hello-books)
[![Code Climate](https://codeclimate.com/github/ekundayo-ab/hello-books/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)
[![Coverage Status](https://coveralls.io/repos/github/ekundayo-ab/hello-books/badge.svg?branch=master)](https://coveralls.io/github/ekundayo-ab/hello-books?branch=master)
# HelloBooks

HelloBooks is an application that helps manage a library and its processes like stocking, tracking and renting books.

With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.

## Features
HelloBookds consists of the following features:

### Authentication
- It uses JSON Web Token (JWT) for authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- User is assigned normal role on registration
- Admin User is pre-seeded into the application with administrative priviledges

### Normal Users
- Users can register
- Users can log in
- Users can view all books in the library
- Users can borrow books
- Users can return books
- User can view borrowing history

### Admin Users
- Admin Users have all priviledges as Normal Users.
- Admin Users can log in
- Admin Users can Add, Modify & Delete Books
- Admin Users can manage application Users
- Admin Users sort & categorize books

## Installation
- Install NodeJs, Sequelize and Postgres on computer
- Clone this repository `git clone https://github.com/ekundayo-ab/hello-books`
- Change into cloned directory and run `npm install` to install all dependencies

## Testing 
- To test run `npm test` or `npm run test`

## Usage
- Run database migration with `npm run db:migrate`
- Start app development with `npm run start:dev` or `npm start`
- Install **Postman** and use to test all endpoints

## API Endpoints

**Do not forget to include token in header of all authenticated routes.**

Request type | Endpoint                                   | Action
-------------|--------------------------------------------|--------------------------------------------------
POST         | /api/v1/users/signup                       | Sign-up a new user
POST	     | /api/v1/users/signin                       | Sign-in a registered user
GET	         | /api/v1/books	                          | Authenticated user view all books
POST	     | /api/v1/books	                          | Admin user create/add book
PUT	         | /api/v1/books/:bookId	                  | Admin user modify book information
POST         | /api/v1/users/:userId/books                | Authenticated User Borrow book
PUT          | /api/v1/users/:userId/books                | Authenticated User Return book
GET	         | /api/v1/users/:userId/books?returned=false | Authenticated User borrowed books but not retured

## Others

### Technology Stack
**UI & Templates**
1. HTML & CSS
2. Materialize CSS Framework
3. Javascript

**Server Side**
1. NodeJs-Express
2. Express
3. Sequelize

**Client Side**
1. React(Redux)

_Project still in progress_

### Questions
For more details contact ekprogs@gmail.com

### Support or New Features
Having new features you feel I can add to HelloBooks? Kindly contact as above, I'll look into it. Thanks.
