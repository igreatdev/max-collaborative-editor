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
        'document_histories',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          document_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          title: {
            type: Sequelize.DataTypes.STRING(45),
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

      await queryInterface.addIndex('document_histories', ['document_id'], {
        transaction,
      });
      await queryInterface.addIndex('document_histories', ['user_id'], {
        transaction,
      });
      await queryInterface.addIndex('document_histories', ['created_at'], {
        transaction,
      });
      await queryInterface.addIndex('document_histories', ['deleted_at'], {
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
    */
    await queryInterface.dropTable('document_histories');
  }
};
