'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Articles', [{
        title: 'Berita kemenangan timnas Indonesia melawan timnas Thailand di final AFF Suzuki Cup 2018',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        slug: 'berita_kemanangan_timnas',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Articles', null, {});
    
  }
};
