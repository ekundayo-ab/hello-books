/* eslint-disable */
const bcrypt = require('bcrypt');
'use strict';
module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username : 'ekundayo',
      password : bcrypt.hashSync('dayo', 10),
      email : 'ekprogs@gmail.com',
      role: 'admin',
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Users', [{
      username :'ekundayo'
    }])
  }
};

/* eslint-enable */
