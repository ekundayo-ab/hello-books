/* eslint-disable no-unused-expressions */
const path = require('path');

module.exports = {
  'User can view sign in page': (browser) => {
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a')
      .assert.containsText('a:nth-of-type(1)', 'HelloBooks')
      .assert.containsText('ul li:nth-of-type(1) a', 'REGISTER')
      .assert.containsText('ul li:nth-of-type(2) a', 'LOGIN')
      .assert.containsText('ul li:nth-of-type(3) a', 'API Docs')
      .assert.containsText('ul li:nth-of-type(4) a', 'Github Repo')
      .assert.containsText('ul li:nth-of-type(5) a', 'Project Management Board')
      .assert.elementPresent('h1.white-text')
      .assert.containsText('h1.white-text', 'Read, think & Innovate')
      .assert.containsText('.login-btn', 'LOGIN');
  },
  'User cannot sign in with invalid credentials': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .setValue('input[name=identifier]', '')
      .setValue('input[name=password]', '')
      .click('.login-btn')
      .waitForElementVisible('span', 5000)
      .assert.visible('form div:nth-of-type(1) span.help-block')
      .assert.visible('form div:nth-of-type(2) span.help-block')
      .assert.containsText('.help-block', 'This field is required')
      .assert.containsText('.help-block:nth-of-type(1)',
        'This field is required')
      .assert.containsText('.login-btn', 'LOGIN')
      .pause(600);
  },
  'User cannot sign in with wrong credentials': (browser) => {
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=identifier]', 'jake')
      .setValue('input[name=password]', 'jaketheprogrammer')
      .click('.login-btn')
      .waitForElementVisible('.toast', 5000)
      .assert.visible('.toast')
      .assert
      .containsText('.toast', 'Authentication failed, Wrong password or email')
      .pause(600);
  },
  'User can view registration page': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.elementPresent('a')
      .assert.containsText('a:nth-of-type(1)', 'HelloBooks')
      .assert.containsText('ul li:nth-of-type(1) a', 'REGISTER')
      .assert.containsText('ul li:nth-of-type(2) a', 'LOGIN')
      .assert.containsText('ul li:nth-of-type(3) a', 'API Docs')
      .assert.containsText('ul li:nth-of-type(4) a', 'Github Repo')
      .assert.containsText('ul li:nth-of-type(5) a', 'Project Management Board')
      .assert.elementPresent('h1.white-text')
      .assert.containsText('h1.white-text', 'Read, think & Innovate')
      .assert.containsText('.register-btn', 'REGISTER');
  },
  'User cannot register with invalid credentials': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/register')
      .setValue('input[name=username]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=passwordConfirmation]', '')
      .click('.register-btn')
      .waitForElementVisible('span', 5000)
      .assert.visible('form .input-field:nth-of-type(2)')
      .assert.containsText('form .input-field:nth-of-type(2) span.help-block',
        'This field is required')
      .assert.visible('form .input-field:nth-of-type(3)')
      .assert.containsText('form .input-field:nth-of-type(3) span.help-block',
        'This field is required')
      .assert.visible('form .input-field:nth-of-type(4)')
      .assert.containsText('form .input-field:nth-of-type(4) span.help-block',
        'This field is required')
      .assert.visible('form .input-field:nth-of-type(5)')
      .assert.containsText('form .input-field:nth-of-type(5) span.help-block',
        'This field is required')
      .pause(600);
  },
  'User cannot register with existing username or email': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/register')
      .setValue('input[name=username]', 'ekundayo')
      .setValue('input[name=email]', 'ekprogs@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.register-btn')
      .waitForElementVisible('span', 5000)
      .assert.containsText('form .input-field:nth-of-type(2) span.help-block',
        'User exists with this username')
      .assert.containsText('form .input-field:nth-of-type(3) span.help-block',
        'User exists with this email')
      .assert.attributeEquals('.register-btn',
        'disabled', 'true')
      .pause(600);
  },
  'User cannot register with short password': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/register')
      .setValue('input[name=username]', 'ctester')
      .setValue('input[name=email]', 'chieftester@gmail.com')
      .setValue('input[name=password]', 'pass')
      .setValue('input[name=passwordConfirmation]', 'pass')
      .click('.register-btn')
      .waitForElementVisible('span', 5000)
      .assert
      .containsText('form .input-field:nth-of-type(4) .help-block',
        'minimum of 6 characters word allowed')
      .assert
      .containsText('form .input-field:nth-of-type(5) .help-block',
        'minimum of 6 characters word allowed')
      .pause(600);
  },
  'User can register with valid credentials and be logged in': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/register')
      .setValue('input[name=username]', 'chieftester')
      .setValue('input[name=email]', 'chieftester@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.register-btn')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText(
        '.toast',
        'Hi chieftester, registration successful! You\'re logged in'
      )
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/shelf')
      .assert.containsText('a h4', 'Hellobooks')
      .assert.containsText('#lib-shelf a', 'Shelf')
      .assert.containsText('#lib-history a', 'History')
      .assert.containsText('#lib-profile a', 'Profile')
      .assert.containsText('.logout', 'Logout')
      .assert.containsText('h3', 'Available Books')
      .assert.visible('.card-panel .row .book')
      .assert.visible('.card-panel .collection #cat3')
      .assert.containsText('.card-panel .collection #cat3',
        'Mechanical Engineering')
      .pause(600);
  },
  'User can sign out of the application': (browser) => {
    browser
      .waitForElementVisible('.logout', 5000)
      .click('.logout')
      .waitForElementVisible('.toast', 5000)
      .assert.urlEquals('http://localhost:3000/')
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Read, think & Innovate')
      .assert.visible('.intro-text')
      .assert.visible('.google-btn')
      .assert.visible('.or')
      .pause(600);
  },
  'User can sign in with correct and valid credentials': (browser) => {
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=identifier]', 'ekundayo')
      .setValue('input[name=password]', 'dayo')
      .click('.login-btn')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Hi ekundayo, you are logged in')
      .assert.urlEquals('http://localhost:3000/shelf?page=1')
      .waitForElementVisible('body', 5000)
      .assert.containsText('a h4', 'Hellobooks')
      .assert.containsText('#lib-shelf a', 'Shelf')
      .assert.containsText('#lib-history a', 'History')
      .assert.containsText('#lib-profile a', 'Profile')
      .assert.containsText('#lib-admin a', 'Admin Dashboard')
      .assert.containsText('.logout', 'Logout')
      .assert.containsText('h3', 'Available Books')
      .assert.visible('.card-panel .row .book')
      .assert.visible('.card-panel .collection #cat3')
      .assert.containsText('.card-panel .collection #cat3',
        'Mechanical Engineering')
      .pause(600);
  },
  'User can view all books': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/shelf?page=1')
      .assert.visible('.available-books')
      .assert.visible('.card-title')
      .assert.visible('.book')
      .assert.visible('.book:nth-of-type(1) .card-image img')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(1)',
        'Gilead01')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(2) .card-image img')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(1)',
        'Gilead02')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(3) .card-image img')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(1)',
        'Gilead03')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'Gilead04')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .pause(600);
  },
  'User can paginate through books with page links': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .execute('scrollTo(0, 150)')
      .waitForElementVisible('#page2', 5000)
      .click('#page2')
      .waitForElementVisible('.available-books', 5000)
      .assert.urlEquals('http://localhost:3000/shelf?page=2')
      .assert.visible('.available-books')
      .assert.visible('.card-title')
      .assert.visible('.book')
      .assert.visible('.book:nth-of-type(1) .card-image img')
      .pause(1000)
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(1)',
        'Gilead05')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(2) .card-image img')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(1)',
        'Half of a Yellow Sun')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(2)',
        'Chimamanda N.A')
      .assert.visible('.book:nth-of-type(3) .card-image img')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(1)',
        'Kavalier & Clay')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(2)',
        'Michael Chabon')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'The Corrections')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Jonathan Franzen')
      .pause(600);
  },
  'User can paginate through books with back or forward button': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .click('.next')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/shelf?page=3')
      .click('.prev')
      .pause(600)
      .assert.urlEquals('http://localhost:3000/shelf?page=2')
      .assert.visible('.available-books')
      .assert.visible('.card-title')
      .assert.visible('.book')
      .assert.visible('.book:nth-of-type(1) .card-image img')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(1)',
        'Gilead05')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(2) .card-image img')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(1)',
        'Half of a Yellow Sun')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(2)',
        'Chimamanda N.A')
      .assert.visible('.book:nth-of-type(3) .card-image img')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(1)',
        'Kavalier & Clay')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(2)',
        'Michael Chabon')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'The Corrections')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Jonathan Franzen')
      .pause(600);
  },
  'User can filter books by category': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .click('#cat1')
      .waitForElementVisible('small', 5000)
      .assert.containsText('small', 'Filtering by: Novels')
      .assert.visible('small.white-text')
      .assert.visible('.card-title')
      .assert.visible('.book')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'Wolf Hall')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Hilary Mantel')
      .assert.containsText('.book:nth-of-type(10) .shelf-book p:nth-of-type(1)',
        'Gilead05')
      .assert.containsText('.book:nth-of-type(10) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .pause(600);
  },
  'User can view history of all books borrowed': (browser) => {
    browser
      .execute('scrollTo(0, 0)')
      .waitForElementVisible('.nav-wrapper', 5000)
      .click('#lib-history')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3', 2000)
      .assert.containsText('h3', 'Borrowing History')
      .waitForElementVisible('.responsive-table', 5000)
      .assert.visible('.responsive-table')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(1)', '1')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)', 'Gilead01')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Marilynne Robinson')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)',
        'November 25th 2017, 12:07 am')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(6)', 'Not Yet')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(1)', '2')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(2)',
        'Returned')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(3)', 'Gilead01')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(4)',
        'Marilynne Robinson')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(5)',
        'November 25th 2017, 12:06 am')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(6)',
        'November 25th 2017, 12:07 am')
      .pause(1000);
  },
  'User can paginate through history of books with page links': (browser) => {
    browser
      .click('#page2')
      .waitForElementVisible('body', 5000)
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(1)', '2')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(3)', 'Wolf Hall')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(4)',
        'Hilary Mantel')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(6)',
        'Not Yet')
      .pause(600);
  },
  'User can paginate through history books with back or forward button':
  (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .click('.next')
      .pause(600)
      .assert.urlEquals('http://localhost:3000/history?page=3')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(1)', '1')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(2)',
        'Returned')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Kavalier & Clay')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Michael Chabon')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(6)',
        'November 24th 2017, 11:59 pm')
      .click('.prev')
      .pause(600)
      .assert.urlEquals('http://localhost:3000/history?page=2')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(1)', '2')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(3)', 'Wolf Hall')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(4)',
        'Hilary Mantel')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(6)',
        'Not Yet')
      .pause(600);
  },
  'User can borrow a book': (browser) => {
    browser
      .click('#lib-shelf')
      .waitForElementVisible('.available-books', 5000)
      .pause(600)
      .click('#page2')
      .waitForElementVisible('#book1', 10000)
      .execute('scrollTo(0, 150)')
      .waitForElementVisible('.card-panel', 5000)
      .click('#book1')
      .waitForElementVisible('h3', 5000)
      .assert.containsText('h3', 'Book Detail')
      .assert.urlEquals('http://localhost:3000/shelf/1')
      .pause(2000)
      .click('.btn')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Kavalier & Clay Successfully borrowed')
      .waitForElementVisible('small.borrow-notify', 5000)
      .assert.containsText('small.borrow-notify',
        'You borrowed this book, please return')
      .execute('scrollTo(0, 0)')
      .pause(2000);
  },
  'User can view Administrator Dashboard': (browser) => {
    browser
      .click('#lib-admin')
      .waitForElementVisible('body', 5000)
      .click('#page2')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/admin?page=2')
      .assert.containsText('#lib-shelf a', 'Shelf')
      .assert.containsText('#lib-history a', 'History')
      .assert.containsText('#lib-profile a', 'Profile')
      .assert.containsText('#lib-admin a', 'Admin Dashboard')
      .assert.containsText('.logout', 'Logout')
      .assert.visible('#book-form-btn')
      .assert.visible('#cat-form-btn')
      .assert.containsText('h6', 'SELECT A CATEGORY')
      .assert.containsText('#cat3', 'Mechanical Engineering')
      .assert.containsText('#cat1', 'Novels')
      .assert.containsText('#cat2', 'Programming')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(1)', '2')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(3)',
        'Half of a Yellow Sun')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(4)',
        'Chimamanda N.A')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(5)', '32')
      .assert.visible('#edit-btn2')
      .assert.visible('#delete-book-btn2')
      .assert.visible('.pagination')
      .pause(1000);
  },
  'User can only add category with valid input': (browser) => {
    browser
      .click('#lib-admin')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/admin?page=1')
      .pause(600)
      .useXpath()
      .waitForElementVisible('(//h3)[1]', 5000)
      .assert.containsText('(//h3)[1]', 'Admin Dashboard')
      .useCss()
      .assert.visible('.available-books')
      .click('#cat-form-btn')
      .waitForElementVisible('#category-form-modal', 1000)
      .setValue('#category-title', '')
      .click('#save-category')
      .waitForElementVisible('span.help-block', 5000)
      .assert.containsText('span.help-block', 'Field cannot be empty')
      .pause(2000)
      .setValue('#category-title', 'Motivationals')
      .click('#save-category')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Motivationals, successfully added')
      .assert.containsText('#cat3', 'Mechanical Engineering')
      .assert.containsText('#cat4', 'Motivationals')
      .assert.containsText('#cat1', 'Novels')
      .assert.containsText('#cat2', 'Programming')
      .pause(1000);
  },
  'User can only add book with valid inputs': (browser) => {
    browser
      .click('#lib-admin')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/admin?page=1')
      .pause(600)
      .useXpath()
      .waitForElementVisible('(//h3)[1]', 5000)
      .assert.containsText('(//h3)[1]', 'Admin Dashboard')
      .useCss()
      .assert.visible('.available-books')
      .click('#book-form-btn')
      .waitForElementVisible('#book-form-modal', 1000)
      .setValue('#isbn', '')
      .setValue('#title', '')
      .setValue('#author', '')
      .setValue('#quantity', '')
      .setValue('#description', '')
      .click('#save-book')
      .waitForElementVisible('.input-field span', 5000)
      .assert.containsText('.input-field span', 'Can\'t be empty')
      .pause(2000)
      .setValue('#isbn', '890')
      .setValue('#title', 'The return of the bees')
      .setValue('#author', 'Loma Grand')
      .setValue('#quantity', '56')
      .setValue('#description', 'This novel bees gives cue into insects life')
      .click('#category-list-area')
      .waitForElementVisible(
        '.dropdown-content.select-dropdown li:nth-child(2)', 5000
      )
      .click('.dropdown-content.select-dropdown li:nth-child(2)')
      .execute("document.querySelectorAll('input[type=file]')[0]" +
      ".style.display = 'block';")
      .pause(2000)
      .useXpath()
      .setValue('//input[@type="file"]', path.resolve(`${__dirname}/vwt.jpg`))
      .useCss()
      .pause(10000)
      .click('#save-book')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'The return of the bees, successfully added')
      .assert.containsText('tr:nth-of-type(5) td:nth-of-type(1)', '5')
      .assert.containsText('tr:nth-of-type(5) td:nth-of-type(3)',
        'The return of the bees')
      .assert.containsText('tr:nth-of-type(5) td:nth-of-type(4)',
        'Loma Grand')
      .assert.containsText('tr:nth-of-type(5) td:nth-of-type(5)', '56')
      .assert.visible('#edit-btn11')
      .assert.visible('#delete-book-btn11')
      .pause(2000);
  },
  'User can view all Notifications': (browser) => {
    browser
      .click('#lib-admin')
      .waitForElementVisible('body', 5000)
      .execute('scrollTo(0, 750)')
      .assert.containsText('.notify-section h3', 'All Notifications')
      .assert.containsText('b.notify-note',
        'Click below for more notifications')
      .assert.visible('.notify-section .collection .collection-item')
      .assert.visible('.notify-section button')
      .assert.containsText('.notify-section button', 'SEE MORE');
  },
  'User can edit book details': (browser) => {
    browser
      .click('#lib-admin')
      .waitForElementVisible('body', 5000)
      .click('#edit-btn6')
      .waitForElementVisible('#update-book-modal', 5000)
      .pause(1000)
      .clearValue('.title6')
      .setValue('.title6', 'Gilead New Revision')
      .clearValue('.quantity6')
      .setValue('.quantity6', '56')
      .click('.save-update6')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast',
        'Gilead New Revision')
      .assert.visible('tr:nth-of-type(1) td:nth-of-type(3)')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Gilead New Revision')
      .assert.visible('tr:nth-of-type(1) td:nth-of-type(5)')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)', '56')
      .pause(3000);
  },
  'User can delete book': (browser) => {
    let bookToDelete;
    let bookId;
    browser
      .url('http://localhost:3000/admin?page=1')
      .waitForElementVisible('body', 5000);
    browser.getAttribute('tbody tr:nth-of-type(1)', 'id', (book) => {
      bookToDelete = book.value;
      bookId = book.value.slice(-1);
      browser.expect.element(`#${bookToDelete}`).to.be.present;
      browser.assert.visible('tr:nth-of-type(1) td:nth-of-type(3)');
      browser.assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Gilead New Revision')
        .click(`#delete-book-btn${bookId}`)
        .waitForElementVisible('div.swal-modal', 5000)
        .pause(2000)
        .click('.swal-button--confirm')
        .pause(1000)
        .waitForElementVisible('.toast', 5000)
        .assert
        .containsText('.toast', 'Poof! Book successfully deleted')
        .assert.visible('tr:nth-of-type(1) td:nth-of-type(3)')
        .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
          'Gilead02');
      browser.expect.element(`#${bookToDelete}`).to.not.be.present;
      browser.pause(1000);
    });
  },
  'User cannot change password with invalid details': (browser) => {
    browser
      .click('#lib-profile')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/profile?page=1')
      .pause(600)
      .waitForElementVisible('h5', 5000)
      .useXpath()
      .assert.containsText('(//h5)[1]', 'Change Password')
      .useCss()
      .assert.visible('.profile-card')
      .assert.visible('.change-password-card')
      .setValue('input[name=oldPass]', '')
      .setValue('input[name=newPass]', '')
      .setValue('input[name=newPassConfirm]', '')
      .click('button')
      .waitForElementVisible('span.help-block', 5000)
      .assert.containsText('span.help-block', 'field required')
      .pause(1000);
  },
  'User cannot change password with wrong old password': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/profile?page=1')
      .pause(600)
      .waitForElementVisible('h5', 5000)
      .useXpath()
      .assert.containsText('(//h5)[1]', 'Change Password')
      .useCss()
      .assert.visible('.profile-card')
      .assert.visible('.change-password-card')
      .setValue('input[name=oldPass]', 'wrongpass')
      .setValue('input[name=newPass]', 'newpass')
      .setValue('input[name=newPassConfirm]', 'newpass')
      .click('button')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Authentication failed, Old password incorrect')
      .pause(2000);
  },
  'User can change password with correct old and new data': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/profile?page=1')
      .pause(600)
      .waitForElementVisible('h5', 5000)
      .useXpath()
      .assert.containsText('(//h5)[1]', 'Change Password')
      .useCss()
      .assert.visible('.profile-card')
      .assert.visible('.change-password-card')
      .setValue('input[name=oldPass]', 'dayo')
      .setValue('input[name=newPass]', 'newpass')
      .setValue('input[name=newPassConfirm]', 'newpass')
      .click('button')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Password successfully changed')
      .pause(3000);
  },
  'User can return a book': (browser) => {
    browser
      .execute('scrollTo(0, 800)')
      .waitForElementVisible('h3', 5000)
      .useXpath()
      .assert.containsText('(//h3)[3]', 'Unreturned Books')
      .useCss()
      .assert.visible('.responsive-table')
      .assert.visible('tr:nth-of-type(1) td:nth-of-type(3)')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Kavalier & Clay')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Michael Chabon')
      .click('#return-btn0')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Kavalier & Clay succesfully' +
      ' returned but pending review by Administrator')
      .assert.visible('tr:nth-of-type(1) td:nth-of-type(3)')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Wolf Hall')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Hilary Mantel')
      .pause(1000)
      .end();
  }
};
