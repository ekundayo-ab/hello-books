'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        title : 'Novels',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        title : 'Programming',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        title : 'Mechanical Engineering',
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
