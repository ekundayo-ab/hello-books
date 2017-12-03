const bcrypt = require('bcrypt');
'use strict';
module.exports = {
  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   * @returns
   */
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username : 'ekundayo',
        password : bcrypt.hashSync('dayo', 10),
        email : 'ekprogs@gmail.com',
        role: 'admin',
        level: 'unlimited',
        borrowLimit: 9005,
        totalBorrow: 9,
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        username : 'tester',
        password : bcrypt.hashSync('password', 10),
        email : 'tester@gmail.com',
        role: 'normal',
        level: 'bronze',
        borrowLimit: 2,
        totalBorrow: 0,
        createdAt : new Date(),
        updatedAt : new Date(),
      }
  ], {});
  },

  /**
   *
   *
   * @param {any} queryInterface
   * @param {any} Sequelize
   */
  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      username :'ekundayo'
    }])
  }
};

