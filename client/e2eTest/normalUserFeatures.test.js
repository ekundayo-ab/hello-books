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
      .setValue('input[name=email]', 'chieftester2@gmail.com')
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
      .setValue('input[name=username]', 'chiefoftesters')
      .setValue('input[name=email]', 'chieftester3@gmail.com')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.register-btn')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText(
        '.toast',
        'Hi chiefoftesters, registration successful! You\'re logged in'
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
      .setValue('input[name=identifier]', 'tester')
      .setValue('input[name=password]', 'password')
      .click('.login-btn')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Hi tester, you are logged in')
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
      .waitForElementVisible('#book1', 5000)
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
      .setValue('input[name=oldPass]', 'password')
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
      .click('#return-btn2')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'White Teeth succesfully returned ' +
      'but pending review by Administrator')
      .pause(2000)
      .end();
  }
};
