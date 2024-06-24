'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example;
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'documents',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          title: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
          },
          content: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
          },
          user_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
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

      await queryInterface.addIndex('documents', ['title'], {
        transaction,
      });
      await queryInterface.addIndex('documents', ['user_id'], {
        transaction,
      });
      await queryInterface.addIndex('documents', ['created_at'], {
        transaction,
      });
      await queryInterface.addIndex('documents', ['deleted_at'], {
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
    await queryInterface.dropTable('documents');
  },
};
