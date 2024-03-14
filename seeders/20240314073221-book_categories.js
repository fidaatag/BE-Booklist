'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('book_categories', [
      { id_book: 1, id_category: 1, createdAt: new Date(), updatedAt: new Date() },
      { id_book: 1, id_category: 2, createdAt: new Date(), updatedAt: new Date() },
      { id_book: 2, id_category: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('book_categories', null, {});
  }
};
