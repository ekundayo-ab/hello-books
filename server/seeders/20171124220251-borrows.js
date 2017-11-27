'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Borrows', [
        {
          returned: false,
          dueDate: '2017-11-27T22:58:49.864Z',
          actualReturnDate: '2017-11-24T22:58:49.864Z',
          createdAt: '2017-11-24T22:58:49.865Z',
          updatedAt: '2017-11-24T22:58:49.865Z',
          bookId: 7,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:58:52.547Z',
          actualReturnDate: '2017-11-24T22:58:52.547Z',
          createdAt: '2017-11-24T22:58:52.548Z',
          updatedAt: '2017-11-24T22:58:52.548Z',
          bookId: 8,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:58:49.864Z',
          actualReturnDate: '2017-11-24T22:58:49.864Z',
          createdAt: '2017-11-24T22:58:49.865Z',
          updatedAt: '2017-11-24T22:58:49.865Z',
          bookId: 7,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:58:52.547Z',
          actualReturnDate: '2017-11-24T22:58:52.547Z',
          createdAt: '2017-11-24T22:58:52.548Z',
          updatedAt: '2017-11-24T22:58:52.548Z',
          bookId: 8,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:23.642Z',
          actualReturnDate: '2017-11-24T22:59:23.642Z',
          createdAt: '2017-11-24T22:59:23.642Z',
          updatedAt: '2017-11-24T22:59:23.642Z',
          bookId: 9,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:31.967Z',
          actualReturnDate: '2017-11-24T22:59:31.967Z',
          createdAt: '2017-11-24T22:59:31.967Z',
          updatedAt: '2017-11-24T22:59:31.967Z',
          bookId: 10,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:23.642Z',
          actualReturnDate: '2017-11-24T22:59:23.642Z',
          createdAt: '2017-11-24T22:59:23.642Z',
          updatedAt: '2017-11-24T22:59:23.642Z',
          bookId: 9,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:31.967Z',
          actualReturnDate: '2017-11-24T22:59:31.967Z',
          createdAt: '2017-11-24T22:59:31.967Z',
          updatedAt: '2017-11-24T22:59:31.967Z',
          bookId: 10,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:33.821Z',
          actualReturnDate: '2017-11-24T22:59:33.821Z',
          createdAt: '2017-11-24T22:59:33.821Z',
          updatedAt: '2017-11-24T22:59:33.821Z',
          bookId: 2,
          userId: 1
        },
        {
          returned: true,
          dueDate: '2017-11-27T22:59:35.947Z',
          actualReturnDate: '2017-11-24T22:59:35.947Z',
          createdAt: '2017-11-24T22:59:35.947Z',
          updatedAt: '2017-11-24T22:59:35.947Z',
          bookId: 1,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:33.821Z',
          actualReturnDate: '2017-11-24T22:59:33.821Z',
          createdAt: '2017-11-24T22:59:33.821Z',
          updatedAt: '2017-11-24T22:59:33.821Z',
          bookId: 2,
          userId: 2
        },
        {
          returned: true,
          dueDate: '2017-11-27T22:59:35.947Z',
          actualReturnDate: '2017-11-24T22:59:35.947Z',
          createdAt: '2017-11-24T22:59:35.947Z',
          updatedAt: '2017-11-24T22:59:35.947Z',
          bookId: 1,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:38.582Z',
          actualReturnDate: '2017-11-24T22:59:38.582Z',
          createdAt: '2017-11-24T22:59:38.582Z',
          updatedAt: '2017-11-24T22:59:38.582Z',
          bookId: 3,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:41.697Z',
          actualReturnDate: '2017-11-24T22:59:41.697Z',
          createdAt: '2017-11-24T22:59:41.697Z',
          updatedAt: '2017-11-24T22:59:41.697Z',
          bookId: 5,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:38.582Z',
          actualReturnDate: '2017-11-24T22:59:38.582Z',
          createdAt: '2017-11-24T22:59:38.582Z',
          updatedAt: '2017-11-24T22:59:38.582Z',
          bookId: 3,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:41.697Z',
          actualReturnDate: '2017-11-24T22:59:41.697Z',
          createdAt: '2017-11-24T22:59:41.697Z',
          updatedAt: '2017-11-24T22:59:41.697Z',
          bookId: 5,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:43.545Z',
          actualReturnDate: '2017-11-24T22:59:43.545Z',
          createdAt: '2017-11-24T22:59:43.545Z',
          updatedAt: '2017-11-24T22:59:43.545Z',
          bookId: 4,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T23:07:24.532Z',
          actualReturnDate: '2017-11-24T23:07:24.532Z',
          createdAt: '2017-11-24T23:07:24.532Z',
          updatedAt: '2017-11-24T23:07:24.532Z',
          bookId: 6,
          userId: 1
        },
        {
          returned: false,
          dueDate: '2017-11-27T22:59:43.545Z',
          actualReturnDate: '2017-11-24T22:59:43.545Z',
          createdAt: '2017-11-24T22:59:43.545Z',
          updatedAt: '2017-11-24T22:59:43.545Z',
          bookId: 4,
          userId: 2
        },
        {
          returned: false,
          dueDate: '2017-11-27T23:07:24.532Z',
          actualReturnDate: '2017-11-24T23:07:24.532Z',
          createdAt: '2017-11-24T23:07:24.532Z',
          updatedAt: '2017-11-24T23:07:24.532Z',
          bookId: 6,
          userId: 2
        },
        {
          returned: true,
          dueDate: '2017-11-27T23:06:17.457Z',
          actualReturnDate: '2017-11-24T23:07:18.510Z',
          createdAt: '2017-11-24T23:06:17.457Z',
          updatedAt: '2017-11-24T23:07:18.510Z',
          bookId: 6,
          userId: 1
        },
        {
          returned: true,
          dueDate: '2017-11-27T23:04:59.740Z',
          actualReturnDate: '2017-11-24T23:05:59.615Z',
          createdAt: '2017-11-24T23:04:59.741Z',
          updatedAt: '2017-11-24T23:05:59.615Z',
          bookId: 6,
          userId: 1
        },
        {
          returned: true,
          dueDate: '2017-11-27T23:02:56.203Z',
          actualReturnDate: '2017-11-24T23:04:41.999Z',
          createdAt: '2017-11-24T23:02:56.203Z',
          updatedAt: '2017-11-24T23:04:42.000Z',
          bookId: 6,
          userId: 1
        },
        {
          returned: true,
          dueDate: '2017-11-27T23:00:38.541Z',
          actualReturnDate: '2017-11-24T23:01:27.266Z',
          createdAt: '2017-11-24T23:00:38.542Z',
          updatedAt: '2017-11-24T23:01:27.266Z',
          bookId: 6,
          userId: 1
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('Borrows', null, {});
  }
};
