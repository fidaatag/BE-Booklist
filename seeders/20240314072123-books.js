'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [
      {
        title: 'The Lord of The Rings',
        author: 'J. R. R. Tolkien',
        pub_date: new Date(),
        publiser: 'IdontKnow',
        number_page: 1902,
        review: ' The Black Riders pursue Frodo into the Ford of Bruinen, where they are swept away by flood waters summoned by Elrond.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kosmos',
        author: 'Carl Sagan',
        pub_date: new Date(),
        publiser: 'Gramedia',
        number_page: 488,
        review: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('book_category', null, {});
  }
};
