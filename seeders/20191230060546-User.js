'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: 'ramadhan@gmail.com',
        password: bcrypt.hashSync('konohagakure',10),
        role: 'User'
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
