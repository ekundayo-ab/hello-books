module.exports = {
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
      .setValue('input[name=identifier]', 'tester')
      .setValue('input[name=password]', 'password')
      .click('.login-btn')
      .waitForElementVisible('.toast', 5000)
      .assert
      .containsText('.toast', 'Hi tester, you are logged in')
      .assert.urlEquals('http://localhost:3000/shelf?page=1')
      .waitForElementVisible('body', 5000)
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
  'User can view all books': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:3000/shelf?page=1')
      .assert.visible('.available-books')
      .assert.visible('.card-title')
      .assert.visible('.book')
      .assert.visible('.book:nth-of-type(1) .card-image img')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(1)',
        'Gilead02')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(2) .card-image img')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(1)',
        'Gilead03')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(3) .card-image img')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(1)',
        'Gilead04')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(2)',
        'Marilynne Robinson')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'Gilead05')
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
      .pause(1000)
      .assert.visible('.book:nth-of-type(1) .card-image img')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(1)',
        'Half of a Yellow Sun')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(2)',
        'Chimamanda N.A')
      .assert.visible('.book:nth-of-type(2) .card-image img')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(1)',
        'Kavalier & Clay')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(2)',
        'Michael Chabon')
      .assert.visible('.book:nth-of-type(3) .card-image img')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(1)',
        'The Corrections')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(2)',
        'Jonathan Franzen')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'The return of the bees')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Loma Grand')
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
        'Half of a Yellow Sun')
      .assert.containsText('.book:nth-of-type(1) .shelf-book p:nth-of-type(2)',
        'Chimamanda N.A')
      .assert.visible('.book:nth-of-type(2) .card-image img')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(1)',
        'Kavalier & Clay')
      .assert.containsText('.book:nth-of-type(2) .shelf-book p:nth-of-type(2)',
        'Michael Chabon')
      .assert.visible('.book:nth-of-type(3) .card-image img')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(1)',
        'The Corrections')
      .assert.containsText('.book:nth-of-type(3) .shelf-book p:nth-of-type(2)',
        'Jonathan Franzen')
      .assert.visible('.book:nth-of-type(4) .card-image img')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(1)',
        'The return of the bees')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Loma Grand')
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
        'White Teeth')
      .assert.containsText('.book:nth-of-type(4) .shelf-book p:nth-of-type(2)',
        'Zadie Smith')
      .assert.containsText('.book:nth-of-type(9) .shelf-book p:nth-of-type(1)',
        'Kavalier & Clay')
      .assert.containsText('.book:nth-of-type(9) .shelf-book p:nth-of-type(2)',
        'Michael Chabon')
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
      .pause(1000)
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(1)', '1')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Wolf Hall')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Hilary Mantel')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(6)',
        'Not Yet')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(1)', '2')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(3)', 'White Teeth')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(4)',
        'Zadie Smith')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(2) td:nth-of-type(6)',
        'Not Yet')
      .pause(1000);
  },
  'User can paginate through history of books with page links': (browser) => {
    browser
      .click('#page2')
      .waitForElementVisible('body', 5000)
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(1)', '1')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Half of a Yellow Sun')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Chimamanda N.A')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(6)',
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
        'Not Returned')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Gilead02')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Marilynne Robinson')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)',
        'November 24th 2017, 11:58 pm')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(6)',
        'Not Yet')
      .click('.prev')
      .pause(600)
      .assert.urlEquals('http://localhost:3000/history?page=2')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(1)', '1')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(2)',
        'Not Returned')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Half of a Yellow Sun')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Chimamanda N.A')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(5)',
        'November 24th 2017, 11:59 pm')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(6)',
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
      .containsText('.toast', 'Authentication failed, Old password incorrect')
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
      .assert.visible('tr:nth-of-type(1) td:nth-of-type(3)')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Kavalier & Clay')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Michael Chabon')
      .click('#return-btn0')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', `Kavalier & Clay succesfully
      ' returned but pending review by Administrator`)
      .assert.visible('tr:nth-of-type(1) td:nth-of-type(3)')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(3)',
        'Wolf Hall')
      .assert.containsText('tr:nth-of-type(1) td:nth-of-type(4)',
        'Hilary Mantel')
      .pause(1000)
      .end();
  }
};
