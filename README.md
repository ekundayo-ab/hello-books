# HelloBooks Library Application
![HelloBooks Homepage](client/public/images/hellobooks_screenshot.png?raw=true "Landing Page")

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)
[![Build Status](https://travis-ci.org/ekundayo-ab/hello-books.svg?branch=develop)](https://travis-ci.org/ekundayo-ab/hello-books)
[![Code Climate](https://codeclimate.com/github/ekundayo-ab/hello-books/badges/gpa.svg?branch=develop)](https://codeclimate.com/github/ekundayo-ab/hello-books)
[![Test Coverage](https://codeclimate.com/github/ekundayo-ab/hello-books/badges/coverage.svg?branch=develop)](https://codeclimate.com/github/ekundayo-ab/hello-books/coverage)
[![Coverage Status](https://coveralls.io/repos/github/ekundayo-ab/hello-books/badge.svg?branch=develop)](https://coveralls.io/github/ekundayo-ab/hello-books?branch=develop)
[![Issue Count](https://codeclimate.com/github/ekundayo-ab/hello-books/badges/issue_count.svg?branch=develop)](https://codeclimate.com/github/ekundayo-ab/hello-books)
# HelloBooks

HelloBooks is an application that helps manage a library and its processes like stocking, tracking and renting of books.

With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc. Access here [HelloBooks](https://hellobooks-e.herokuapp.com/)

## Table of Contents

* [Features](#features)
* [Technologies](#technology)
* [Installation and Setup](#installation-and-setup)
* [Limitations](#limitations)
* [How to Contribute](#how-to-contribute)
* [Frequently Asked Questions](#faqs)
* [Support or New Features](#support-or-new-features)
* [License](#license)

## Features
HelloBooks consists of the following features:
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

## Technology
**hello-books** makes use of a host of modern technologies. The core ones are:

* REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about  See [this link](https://facebook.github.io/react/).
* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. For more information about Redux see [this link](http://redux.js.org/) for details.
* Materializecss is used to style the frontend. For more information about materializecss see [this link](http://materializecss.com/) for details.
* Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.
* Postgresql & Sequelize: Postgresql is an advanced open source Object-Relational Model (ORM) database.Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.

## Installation and Setup
1. Clone the repository:
```
https://github.com/ekundayo-ab/hello-books
```
2. Navigate into the cloned repository:
```
cd hello-books
```
3. Install dependencies:
```
npm install
```
4. Install sequelize-cli, Create Postgresql database, Navigate to server directory and run migrations:
```
npm install -g seqeulize-cli
cd server
sequelize db:migrate
```
5. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file looks like this
```
PRIVATE_KEY=myprivatekey
TEST_DATABASE_URL=postgres://127.0.0.1:5432/hello-books-test
```
6. Start the application:
**_Different Build Environment_**

**Production**
```
npm run build
npm run start
```
**Development**
```
npm run start:dev
npm run build:dev
```
7. Install **Postman** and use to test all endpoints

## Limitations
The limitations with this current version of Hello Books includes:
* The Administrator cannot upload books
* Users cannot rent and read books within the applications
* Users cannot contribute books to the application based on their location

## Testing
- To test run `npm test` or `npm run test`

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
GET	         | /api/v1/users/:userId/books?returned=false | Authenticated User borrowed books but not returned

## How to Contribute
Contributions to this project are welcomed, If you need to contribute to this project, kindly take steps below
* **Fork** the repository
* Follow [Installation and Setup](#installation-and-setup) as explained earlier
* Create a branch off **master** for the feature you wish to add
* Make neccessary changes, commit and raise a pull request against develop
**Note** when making contributions, please endevour to follow the [Airbnb](https://github.com/airbnb/javascript) javascript style guide. Also, check out the [wiki](https://github.com/ekundayo-ab/hello-books/wiki) for details on contributing.

## License
This project is authored by **Ekundayo Abiona** (ekundayo.abiona@andela.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license] © [ekundayo-ab][author]
<!-- Definitions -->
[license]: LICENSE
[author]: ekundayo-ab

### FAQs
For more details contact ekundayoabiona@gmail.com

### Support or New Features
Having new features you feel I can add to HelloBooks? Kindly contact as above, I'll look into it. Thanks.
