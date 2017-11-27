const path = require('path');

module.exports = {
  'User cannot sign in with invalid credentials': (browser) => {
    browser
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=identifier]', '')
      .setValue('input[name=password]', '')
      .click('.login-btn')
      .waitForElementVisible('span', 5000)
      .assert.containsText('.help-block', 'This field is required')
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
      .assert
      .containsText('.toast', 'Authentication failed. check password or email')
      .pause(600);
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
      .assert.containsText('.help-block', 'This field is required')
      .pause(600);
  },
  'User cannot register with already registered username': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/register')
      .setValue('input[name=username]', 'ekundayo')
      .setValue('input[name=email]', 'ctester@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.register-btn')
      .waitForElementVisible('span', 5000)
      .assert.containsText('.help-block', 'User exists with this username')
      .pause(600);
  },
  'User cannot register with already registered email': (browser) => {
    browser
      .url('http://localhost:3000/register')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/register')
      .setValue('input[name=username]', 'ctester')
      .setValue('input[name=email]', 'ekprogs@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.register-btn')
      .waitForElementVisible('span', 5000)
      .assert.containsText('.help-block', 'User exists with this email')
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
      .containsText('.help-block', 'minimum of 6 characters word allowed')
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
      .pause(600);
  },
  'User can view all books': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/shelf?page=1')
      .assert.visible('.available-books')
      .assert.visible('.card-title')
      .assert.visible('.book')
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
      .pause(1000);
  },
  'User can paginate through history of books with page links': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .click('#page2')
      .assert.urlEquals('http://localhost:3000/history?page=2')
      .pause(600);
  },
  'User can paginate through history books with back or forward button':
  (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .click('.next')
      .pause(600)
      .assert.urlEquals('http://localhost:3000/history?page=3')
      .click('.prev')
      .pause(600)
      .assert.urlEquals('http://localhost:3000/history?page=2')
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
      .containsText('.toast', 'The Amazing Adventures of Kavalier & Clay')
      .waitForElementVisible('small.borrow-notify', 5000)
      .assert.containsText('small.borrow-notify',
        'You borrowed this book, please return')
      .execute('scrollTo(0, 0)')
      .pause(2000);
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
      .waitForElementVisible('.dropdown-content li:nth-child(2)', 5000)
      .click('.dropdown-content li:nth-child(2)')
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
      .pause(1000);
  },
  'User can edit book details': (browser) => {
    browser
      .click('#lib-admin')
      .waitForElementVisible('body', 5000)
      .click('#edit-btn6')
      .waitForElementVisible('#update-book-form6', 5000)
      .pause(1000)
      .clearValue('.title6')
      .setValue('.title6', 'Gilead (first book in the shelf arrangement)')
      .clearValue('.quantity6')
      .setValue('.quantity6', '56')
      .click('.save-update6')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast',
        'Gilead01 successfully updated to Gilead' +
      ' (first book in the shelf arrangement)')
      .pause(3000);
  },
  'User can delete book': (browser) => {
    browser
      .url('http://localhost:3000/admin?page=1')
      .waitForElementVisible('body', 5000)
      .click('#delete-book-btn6')
      .waitForElementVisible('div.swal-modal', 5000)
      .pause(2000)
      .click('.swal-button--confirm')
      .pause(1000)
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Poof! Book successfully deleted')
      .pause(1000);
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
      .containsText('.toast', 'Authentication failed, old password incorrect')
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
      .pause(2000);
  },
  'User can return a book': (browser) => {
    browser
      .execute('scrollTo(0, 800)')
      .waitForElementVisible('h3', 5000)
      .useXpath()
      .assert.containsText('(//h3)[3]', 'Unreturned Books')
      .useCss()
      .assert.visible('.responsive-table')
      .click('#return-btn0')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Half of a Yellow Sun succesfully' +
      ' returned but pending review by Administrator')
      .pause(1000)
      .end();
  }
};
