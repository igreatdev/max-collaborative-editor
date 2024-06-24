'use strict';

const defaultOptions = [
  {
    id: 1,
    option_name: 'siteName',
    option_value: 'Valued Trust Cooperative',
  },
  {
    id: 2,
    option_name: 'contactEmail',
    option_value: 'thevaluedtrust@gmail.com',
  },
  {
    id: 3,
    option_name: 'contactPhone',
    option_value: '',
  },
  {
    id: 4,
    option_name: 'address',
    option_value: '',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('cms_options', defaultOptions, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
