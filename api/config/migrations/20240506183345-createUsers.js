'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          email: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          first_name: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          last_name: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          status: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          deleted_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );

      await queryInterface.addIndex('users', ['email'], {
        transaction,
        type: 'UNIQUE',
      });
      await queryInterface.addIndex('users', ['status'], {
        transaction,
      });
      await queryInterface.addIndex('users', ['created_at'], {
        transaction,
      });
      await queryInterface.addIndex('users', ['deleted_at'], {
        transaction,
      });

      transaction.commit();
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    .*/
    await queryInterface.dropTable('users');
  },
};
